import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

// GET: list skills for the current admin's profile
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });
  const userId = guard.session.user.id as string;

  try {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) return NextResponse.json({ data: [] });
    const skills = await prisma.skill.findMany({
      where: { profileId: profile.id },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      include: { projects: { select: { id: true, title: true, slug: true } } },
    });
    return NextResponse.json({ data: skills });
  } catch (e) {
    console.error("/api/admin/skills GET error", e);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

// POST: create a skill for current profile
export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });
  const userId = guard.session.user.id as string;

  try {
    const body = await req.json();
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const { name, label, icon, category, level, order, experienceYears, experienceMonths, projectIds } = body as {
      name: string;
      label?: string | null;
      icon?: string | null;
      category?: string | null;
      level?: number | null;
      order?: number | null;
      experienceYears?: number | null;
      experienceMonths?: number | null;
      projectIds?: string[] | null;
    };

    const created = await prisma.skill.create({
      data: {
        profileId: profile.id,
        name,
        label: label ?? null,
        icon: icon ?? null,
        category: category ?? "",
        level: level ?? null,
        order: order ?? 0,
        experienceYears: experienceYears ?? 0,
        experienceMonths: experienceMonths ?? 0,
        projects: projectIds?.length
          ? { connect: projectIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { projects: { select: { id: true, title: true, slug: true } } },
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (e) {
    console.error("/api/admin/skills POST error", e);
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}

// PATCH: update a skill by id
export async function PATCH(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    const body = await req.json();
    const { id, ...updates } = body as {
      id: string;
      name?: string;
      label?: string | null;
      icon?: string | null;
      category?: string | null;
      level?: number | null;
      order?: number | null;
      experienceYears?: number | null;
      experienceMonths?: number | null;
      projectIds?: string[] | null;
    };

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const updateData: any = { ...updates };

    if (Object.prototype.hasOwnProperty.call(updates, "projectIds")) {
      // Replace many-to-many set with provided projectIds
      updateData.projects = {
        set: (updates.projectIds ?? []).map((pid) => ({ id: pid })),
      };
      delete updateData.projectIds;
    }

    const updated = await prisma.skill.update({
      where: { id },
      data: updateData,
      include: { projects: { select: { id: true, title: true, slug: true } } },
    });
    return NextResponse.json({ data: updated });
  } catch (e) {
    console.error("/api/admin/skills PATCH error", e);
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

// DELETE: delete a skill by id (from query ?id=)
export async function DELETE(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("/api/admin/skills DELETE error", e);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}
