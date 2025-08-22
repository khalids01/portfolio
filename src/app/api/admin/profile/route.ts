import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });
  const userId = guard.session.user.id as string;

  try {
    const body = await req.json();
    const data = {
      userId,
      fullName: String(body.fullName ?? ""),
      headline: String(body.headline ?? ""),
      tags: Array.isArray(body.tags)
        ? (body.tags as unknown[]).map((t) => String(t))
        : null,
      bio: body.bio ?? null,
      avatarUrl: body.avatarUrl ?? null,
      location: body.location ?? null,
      phone: body.phone ?? null,
      emailPublic: body.emailPublic ?? null,
      resumeUrl: body.resumeUrl ?? null,
      linkedinUrl: body.linkedinUrl ?? null,
      githubUrl: body.githubUrl ?? null,
      websiteUrl: body.websiteUrl ?? null,
    } as const;

    // Upsert by userId
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: data,
      create: data,
    });
    return NextResponse.json({ data: profile }, { status: 201 });
  } catch (e) {
    console.error("/api/admin/profile POST error", e);
    return NextResponse.json({ error: "Failed to create/update profile" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });
  const userId = guard.session.user.id as string;

  try {
    const body = await req.json();
    const existing = await prisma.profile.findUnique({ where: { userId } });
    if (!existing) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const updateData: Record<string, unknown> = {
      fullName: body.fullName ?? existing.fullName,
      headline: body.headline ?? existing.headline,
      bio: body.bio ?? existing.bio,
      avatarUrl: body.avatarUrl ?? existing.avatarUrl,
      location: body.location ?? existing.location,
      phone: body.phone ?? existing.phone,
      emailPublic: body.emailPublic ?? existing.emailPublic,
      resumeUrl: body.resumeUrl ?? existing.resumeUrl,
      linkedinUrl: body.linkedinUrl ?? existing.linkedinUrl,
      githubUrl: body.githubUrl ?? existing.githubUrl,
      websiteUrl: body.websiteUrl ?? existing.websiteUrl,
    };

    if (Array.isArray(body.tags)) {
      updateData.tags = (body.tags as unknown[]).map((t) => String(t));
    }

    const profile = await prisma.profile.update({
      where: { userId },
      data: updateData,
    });
    return NextResponse.json({ data: profile });
  } catch (e) {
    console.error("/api/admin/profile PATCH error", e);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
