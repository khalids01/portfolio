import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

// GET: list projects for the current admin's profile
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok)
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );
  const userId = guard.session.user.id as string;

  try {
    // Try to find the admin's own profile; fall back to the first profile (single-owner portfolio)
    let profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) profile = await prisma.profile.findFirst();
    if (!profile) return NextResponse.json({ data: [] });
    const projects = await prisma.project.findMany({
      where: { profileId: profile.id },
      orderBy: { startDate: "desc" },
      include: {
        tags: true,
        skills: { select: { id: true, name: true } },
      },
    });
    return NextResponse.json({ data: projects });
  } catch (e) {
    console.error("/api/admin/projects GET error", e);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

// POST: create a project for current profile
export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok)
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );
  const userId = guard.session.user.id as string;

  try {
    const body = await req.json();
    // Try to find the admin's own profile; fall back to the first profile (single-owner portfolio)
    let profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) profile = await prisma.profile.findFirst();
    if (!profile)
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const {
      title,
      slug,
      description,
      coverImage,
      url,
      repoUrl,
      startDate,
      endDate,
      tagNames,
      skillIds,
    } = body as {
      title: string;
      slug: string;
      description?: string | null;
      coverImage?: string | null;
      url?: string | null;
      repoUrl?: string | null;
      startDate?: string | null;
      endDate?: string | null;
      tagNames?: string[];
      skillIds?: string[];
    };

    const tagsConnectOrCreate = (tagNames ?? [])
      .filter(Boolean)
      .map((tagName) => ({
        where: { name: tagName },
        create: { name: tagName },
      }));

    const created = await prisma.project.create({
      data: {
        profileId: profile.id,
        title,
        slug,
        description: description || null,
        coverImage: coverImage || null,
        url: url || null,
        repoUrl: repoUrl || null,
        // Convert empty strings to null for date fields
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        tags: tagsConnectOrCreate.length
          ? { connectOrCreate: tagsConnectOrCreate }
          : undefined,
        skills:
          Array.isArray(skillIds) && skillIds.length
            ? { connect: skillIds.map((id) => ({ id })) }
            : undefined,
      },
      include: {
        tags: true,
        skills: { select: { id: true, name: true } },
      },
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (e) {
    console.error("/api/admin/projects POST error", e);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}

// PATCH: update a project by id
export async function PATCH(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok)
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );

  try {
    const body = await req.json();
    const {
      id,
      tagNames,
      skillIds,
      title,
      slug,
      description,
      coverImage,
      url,
      repoUrl,
      startDate,
      endDate,
    } = body as {
      id: string;
      title?: string;
      slug?: string;
      description?: string | null;
      coverImage?: string | null;
      url?: string | null;
      repoUrl?: string | null;
      startDate?: string | null;
      endDate?: string | null;
      tagNames?: string[];
      skillIds?: string[];
    };

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    // Build update payload only with fields that were explicitly sent
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description || null;
    if (coverImage !== undefined) updateData.coverImage = coverImage || null;
    if (url !== undefined) updateData.url = url || null;
    if (repoUrl !== undefined) updateData.repoUrl = repoUrl || null;

    // Always convert date strings properly — empty string -> null
    if (startDate !== undefined)
      updateData.startDate = startDate ? new Date(startDate) : null;
    if (endDate !== undefined)
      updateData.endDate = endDate ? new Date(endDate) : null;

    // Tags: replace entire list
    if (tagNames !== undefined) {
      const validTags = tagNames.filter(Boolean);
      updateData.tags = {
        set: [], // disconnect all existing tags
        connectOrCreate: validTags.map((tagName) => ({
          where: { name: tagName },
          create: { name: tagName },
        })),
      };
    }

    // Skills: replace entire list (set to exact provided IDs)
    if (skillIds !== undefined) {
      updateData.skills = {
        set: skillIds.map((sid) => ({ id: sid })),
      };
    }

    const updated = await prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        tags: true,
        skills: { select: { id: true, name: true } },
      },
    });
    return NextResponse.json({ data: updated });
  } catch (e) {
    console.error("/api/admin/projects PATCH error", e);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

// DELETE: delete a project by id
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

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("/api/admin/projects DELETE error", e);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
