import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { resumeSchema } from "@/features/resume/schema";
import { clearResumePdfCache } from "@/features/resume/pdf-cache";
import { invalidateResumePdfServiceCache } from "@/features/resume/pdf-service";

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  const resumes = await prisma.resume.findMany({
    orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }],
  });

  return NextResponse.json({ data: resumes });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    const body = await req.json() as {
      slug?: string;
      title?: string;
      targetRole?: string | null;
      isDefault?: boolean;
      defaultLayout?: string;
      data?: unknown;
    };
    const slug = body.slug?.trim() || "default";
    const title = body.title?.trim() || "Untitled Resume";
    
    // Validate data if it's a full update
    if (body.data) {
      resumeSchema.parse(body.data);
    }

    if (body.isDefault) {
      await prisma.resume.updateMany({
        where: { slug: { not: slug } },
        data: { isDefault: false },
      });
    }

    const resume = await prisma.resume.upsert({
      where: { slug },
      update: {
        title,
        targetRole: body.targetRole ?? null,
        isDefault: Boolean(body.isDefault),
        defaultLayout: body.defaultLayout ?? "ats-standard",
        data: body.data || {},
      },
      create: {
        slug,
        title,
        targetRole: body.targetRole ?? null,
        isDefault: Boolean(body.isDefault),
        defaultLayout: body.defaultLayout ?? "ats-standard",
        data: body.data || {},
      },
    });

    const cleared = clearResumePdfCache();
    await invalidateResumePdfServiceCache(slug);
    if (cleared > 0) {
      console.log("Resume PDF cache invalidated due to data update");
    }

    return NextResponse.json({ data: resume });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to update resume";
    console.error("/api/admin/resume POST error", e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    const cleared = clearResumePdfCache();
    await invalidateResumePdfServiceCache();
    if (cleared > 0) {
      return NextResponse.json({ message: "Cache cleared" });
    }
    return NextResponse.json({ message: "No cache found" });
  } catch {
    return NextResponse.json({ error: "Failed to clear cache" }, { status: 500 });
  }
}
