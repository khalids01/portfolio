import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { getAdminProfile } from "@/lib/admin-profile";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function resolveProfileProjectIds(profileId: string, value: string[] | null | undefined) {
  const ids = [...new Set((value ?? []).filter(Boolean))];
  if (!ids.length) return ids;
  const projects = await prisma.project.findMany({
    where: { id: { in: ids }, profileId },
    select: { id: true },
  });
  if (projects.length !== ids.length) {
    throw new Error("Invalid project IDs for the current profile");
  }
  return ids;
}

// GET: list skills for the current admin's profile
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok)
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );
  try {
    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile) return NextResponse.json({ data: [] });
    const skills = await prisma.skill.findMany({
      where: { profileId: profile.id },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      include: { projects: { select: { id: true, title: true, slug: true } } },
    });
    return NextResponse.json({ data: skills });
  } catch (e) {
    console.error("/api/admin/skills GET error", e);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 },
    );
  }
}

// POST: create a skill for current profile
export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok)
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );
  try {
    const body = await req.json();
    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile)
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const {
      name,
      slug,
      label,
      icon,
      category,
      level,
      order,
      experienceYears,
      experienceMonths,
      projectIds,
    } = body as {
      name: string;
      slug?: string | null;
      label?: string | null;
      icon?: string | null;
      category?: string | null;
      level?: number | null;
      order?: number | null;
      experienceYears?: number | null;
      experienceMonths?: number | null;
      projectIds?: string[] | null;
    };

    const resolvedSlug = (slug ?? "").trim() || slugify(name);
    if (!resolvedSlug) {
      return NextResponse.json(
        { error: "A valid skill slug is required" },
        { status: 400 },
      );
    }

    const existing = await prisma.skill.findUnique({
      where: {
        profileId_slug: { profileId: profile.id, slug: resolvedSlug },
      },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(
        { error: `A skill with slug "${resolvedSlug}" already exists` },
        { status: 409 },
      );
    }
    const resolvedProjectIds = await resolveProfileProjectIds(profile.id, projectIds);

    const created = await prisma.skill.create({
      data: {
        profileId: profile.id,
        slug: resolvedSlug,
        name,
        label: label ?? null,
        icon: icon ?? null,
        category: category ?? "",
        level: level ?? null,
        order: order ?? 0,
        experienceYears: experienceYears ?? 0,
        experienceMonths: experienceMonths ?? 0,
        projects: resolvedProjectIds.length
          ? { connect: resolvedProjectIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { projects: { select: { id: true, title: true, slug: true } } },
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (e) {
    console.error("/api/admin/skills POST error", e);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 },
    );
  }
}

// PATCH: update a skill by id
export async function PATCH(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok)
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );

  try {
    const body = await req.json();
    const { id, ...updates } = body as {
      id: string;
      slug?: string | null;
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

    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    const existingSkill = await prisma.skill.findFirst({
      where: { id, profileId: profile.id },
      select: { id: true },
    });
    if (!existingSkill) return NextResponse.json({ error: "Skill not found" }, { status: 404 });

    if (updates.slug !== undefined && updates.slug !== null) {
      const resolvedSlug = updates.slug.trim() || slugify(updates.name ?? "");
      if (!resolvedSlug) {
        return NextResponse.json(
          { error: "A valid skill slug is required" },
          { status: 400 },
        );
      }
      const duplicate = await prisma.skill.findFirst({
        where: {
          profileId: profile.id,
          slug: resolvedSlug,
          id: { not: id },
        },
        select: { id: true },
      });
      if (duplicate) {
        return NextResponse.json(
          { error: `A skill with slug "${resolvedSlug}" already exists` },
          { status: 409 },
        );
      }
      updates.slug = resolvedSlug;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { ...updates };

    if (Object.prototype.hasOwnProperty.call(updates, "projectIds")) {
      const projectIds = await resolveProfileProjectIds(profile.id, updates.projectIds);
      // Replace many-to-many set with provided projectIds
      updateData.projects = {
        set: projectIds.map((pid) => ({ id: pid })),
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
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 },
    );
  }
}

// DELETE: delete a skill by id (from query ?id=)
export async function DELETE(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok)
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    const skill = await prisma.skill.findFirst({
      where: { id, profileId: profile.id },
      select: { id: true },
    });
    if (!skill) return NextResponse.json({ error: "Skill not found" }, { status: 404 });

    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("/api/admin/skills DELETE error", e);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 },
    );
  }
}
