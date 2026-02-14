import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";
import { env } from "@/env";
import { prisma } from "@/lib/prisma";
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

const CACHE_DIR = join(process.cwd(), "tmp", "resume-cache");
const CACHE_FILE = join(CACHE_DIR, "resume.pdf");

export async function GET(request: NextRequest) {
  // 1. Check DB for last update
  const resume = await prisma.resume.findUnique({
    where: { slug: "default" },
    select: { updatedAt: true },
  });

  if (!resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  // 2. Check cache
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }

  if (existsSync(CACHE_FILE)) {
    const stats = statSync(CACHE_FILE);
    if (stats.mtime >= resume.updatedAt) {
      console.log("Serving cached PDF");
      const cachedPdf = readFileSync(CACHE_FILE);
      return new Response(new Uint8Array(cachedPdf), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="Abdullah_Khalid_Resume.pdf"`,
          "X-Cache": "HIT",
        },
      });
    }
  }

  const host = request.headers.get("host");
  const protocol = request.nextUrl.protocol === "https:" ? "https" : "http";
  const baseUrl = env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
  const resumeUrl = `${baseUrl}/resume`;

  const startTime = Date.now();
  console.log("Generating fresh PDF from:", resumeUrl);

  let browser;
  try {
    browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const context = await browser.newContext({
      viewport: { width: 1200, height: 1600 }
    });
    
    const page = await context.newPage();
    
    // Explicitly emulate print media
    await page.emulateMedia({ media: 'print' });
    
    await page.goto(resumeUrl, { 
      waitUntil: "networkidle",
      timeout: 30000 
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));

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
    writeFileSync(CACHE_FILE, pdfBuffer);

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
  } catch (error: any) {
    console.error("PDF generation failed:", error);
    return NextResponse.json({ 
      error: "Failed to generate PDF", 
      details: error.message 
    }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
