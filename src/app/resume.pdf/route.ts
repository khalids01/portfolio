import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";
import type { Browser } from "playwright";
import nodeChromium from "chromium";
import { env } from "@/env";
import { prisma } from "@/lib/prisma";
import {
  ensureResumePdfCacheDir,
  getResumePdfCacheFile,
  isResumePdfCacheFresh,
} from "@/features/resume/pdf-cache";
import { normalizeResumeLayoutId } from "@/features/resume/layouts";
import { accessSync, constants, readFileSync, writeFileSync } from "fs";

export const dynamic = "force-dynamic";

function isExecutable(path: string) {
  try {
    accessSync(path, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function getChromiumExecutablePath() {
  if (env.CHROMIUM_EXECUTABLE_PATH && isExecutable(env.CHROMIUM_EXECUTABLE_PATH)) {
    return env.CHROMIUM_EXECUTABLE_PATH;
  }

  const systemChromiumPaths = [
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ];

  for (const path of systemChromiumPaths) {
    if (isExecutable(path)) return path;
  }

  if (nodeChromium.path && isExecutable(nodeChromium.path)) {
    return nodeChromium.path;
  }

  return undefined;
}

function getPdfErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Failed to generate PDF";

  if (message.includes("Executable doesn't exist")) {
    return `${message}\n\nNo usable Chromium executable was found. Set CHROMIUM_EXECUTABLE_PATH to an installed Chromium binary, or run npx playwright install chromium for local Playwright browsers.`;
  }

  return message;
}

export async function GET(request: NextRequest) {
  const variant = request.nextUrl.searchParams.get("variant") || "default";
  const requestedLayout = request.nextUrl.searchParams.get("layout");
  // 1. Check DB for last update
  const resume = await prisma.resume.findUnique({
    where: { slug: variant },
    select: { updatedAt: true, defaultLayout: true },
  });

  if (!resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  // 2. Check cache
  ensureResumePdfCacheDir();
  const layout = normalizeResumeLayoutId(requestedLayout, normalizeResumeLayoutId(resume.defaultLayout));

  const cacheFile = getResumePdfCacheFile(variant, layout);

  if (isResumePdfCacheFresh(resume.updatedAt, variant, layout)) {
    console.log("Serving cached PDF");
    const cachedPdf = readFileSync(cacheFile);
    return new Response(new Uint8Array(cachedPdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Abdullah_Khalid_Resume.pdf"`,
        "X-Cache": "HIT",
      },
    });
  }

  const host = request.headers.get("host");
  const protocol = request.nextUrl.protocol === "https:" ? "https" : "http";
  const baseUrl = env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
  const resumeUrl =
    variant === "default"
      ? `${baseUrl}/resume?layout=${layout}`
      : `${baseUrl}/resume/${variant}?layout=${layout}`;

  const startTime = Date.now();
  console.log("Generating fresh PDF from:", resumeUrl);

  let browser: Browser | undefined;
  try {
    const executablePath = getChromiumExecutablePath();

    browser = await chromium.launch({
      ...(executablePath ? { executablePath } : {}),
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const context = await browser.newContext({
      viewport: { width: 1200, height: 1600 },
    });

    const page = await context.newPage();

    // Explicitly emulate print media
    await page.emulateMedia({ media: "print" });

    await page.goto(resumeUrl, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
      displayHeaderFooter: false,
    });

    // 3. Save to cache
    writeFileSync(cacheFile, pdfBuffer);

    const generationTime = Date.now() - startTime;
    console.log(`PDF generated in ${generationTime}ms`);

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Abdullah_Khalid_Resume.pdf"`,
        "X-Cache": "MISS",
        "X-Generation-Time": `${generationTime}ms`,
      },
    });
  } catch (error: unknown) {
    const message = getPdfErrorMessage(error);
    console.error("PDF generation failed:", error);
    return NextResponse.json({
      error: "Failed to generate PDF",
      details: message,
    }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
