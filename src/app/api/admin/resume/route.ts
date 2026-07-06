import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { resumeSchema } from "@/features/resume/schema";
import { clearResumePdfCache } from "@/features/resume/pdf-cache";

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  const resume = await prisma.resume.findUnique({
    where: { slug: "default" },
  });

  return NextResponse.json({ data: resume });
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    const body = await req.json();
    
    // Validate data if it's a full update
    if (body.data) {
      resumeSchema.parse(body.data);
    }

    const resume = await prisma.resume.upsert({
      where: { slug: "default" },
      update: { data: body.data || {} },
      create: { slug: "default", data: body.data || {} },
    });

    const cleared = clearResumePdfCache();
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
    if (cleared > 0) {
      return NextResponse.json({ message: "Cache cleared" });
    }
    return NextResponse.json({ message: "No cache found" });
  } catch {
    return NextResponse.json({ error: "Failed to clear cache" }, { status: 500 });
  }
}
