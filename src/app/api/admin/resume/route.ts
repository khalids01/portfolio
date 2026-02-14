import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { resumeSchema } from "@/features/resume/schema";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";

const CACHE_FILE = join(process.cwd(), "tmp", "resume-cache", "resume.pdf");

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

    // Invalidate cache
    if (existsSync(CACHE_FILE)) {
      unlinkSync(CACHE_FILE);
      console.log("Resume PDF cache invalidated due to data update");
    }

    return NextResponse.json({ data: resume });
  } catch (e: any) {
    console.error("/api/admin/resume POST error", e);
    return NextResponse.json({ error: e.message || "Failed to update resume" }, { status: 500 });
  }
}

export async function DELETE() {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    if (existsSync(CACHE_FILE)) {
      unlinkSync(CACHE_FILE);
      return NextResponse.json({ message: "Cache cleared" });
    }
    return NextResponse.json({ message: "No cache found" });
  } catch (e: any) {
    return NextResponse.json({ error: "Failed to clear cache" }, { status: 500 });
  }
}
