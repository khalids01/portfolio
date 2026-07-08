import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../../../prisma/generated/client";
import { requireAdmin } from "@/lib/admin";
import { getAdminProfile } from "@/lib/admin-profile";

async function resolveProjectCategoryId(
  profileId: string,
  categoryId: string | null | undefined,
): Promise<string | null> {
  if (!categoryId) return null;

  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      profileId,
      categoryType: "project",
    },
    select: { id: true },
  });

  return category?.id ?? null;
}

function normalizeProjectImages(images: unknown): string[] {
  if (!Array.isArray(images)) return [];
  return images.filter(
    (image): image is string =>
      typeof image === "string" && image.trim().length > 0,
  );
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0,
  );
}

function normalizeCaseStudy(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return Prisma.JsonNull;
  return value;
}

function serializeProject<T extends { images: unknown; statusBadges?: unknown }>(project: T) {
  return {
    ...project,
    images: normalizeProjectImages(project.images),
    statusBadges: normalizeStringArray(project.statusBadges),
  };
}

const projectInclude = {
  tags: true,
  skills: { select: { id: true, name: true } },
  category: { select: { id: true, name: true, slug: true } },
};

// GET: list projects, or fetch one project by id, for the current admin's profile
export async function GET(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok)
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );

  try {
    const profile = await getAdminProfile(guard.session.user.id as string);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!profile) {
      return id
        ? NextResponse.json({ error: "Project not found" }, { status: 404 })
        : NextResponse.json({ data: [] });
    }

    if (id) {
      const project = await prisma.project.findFirst({
        where: { id, profileId: profile.id },
        include: projectInclude,
      });

      if (!project) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ data: serializeProject(project) });
    }

    const projects = await prisma.project.findMany({
      where: { profileId: profile.id },
      orderBy: [{ featuredRank: "asc" }, { startDate: "desc" }],
      include: projectInclude,
    });
    return NextResponse.json({ data: projects.map(serializeProject) });
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

  try {
    const body = await req.json();
    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile)
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const {
      title,
      slug,
      description,
      coverImage,
      images,
      url,
      repoUrl,
      startDate,
      endDate,
      tagNames,
      skillIds,
      categoryId,
      statusBadges,
      featuredRank,
      role,
      impact,
      caseStudy,
    } = body as {
      title: string;
      slug: string;
      description?: string | null;
      coverImage?: string | null;
      images?: unknown;
      url?: string | null;
      repoUrl?: string | null;
      startDate?: string | null;
      endDate?: string | null;
      tagNames?: string[];
      skillIds?: string[];
      categoryId?: string | null;
      statusBadges?: unknown;
      featuredRank?: number | null;
      role?: string | null;
      impact?: string | null;
      caseStudy?: unknown;
    };

    const resolvedCategoryId = await resolveProjectCategoryId(
      profile.id,
      categoryId,
    );

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
        images: normalizeProjectImages(images),
        url: url || null,
        repoUrl: repoUrl || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        categoryId: resolvedCategoryId,
        statusBadges: normalizeStringArray(statusBadges),
        featuredRank: featuredRank ?? null,
        role: role || null,
        impact: impact || null,
        caseStudy: normalizeCaseStudy(caseStudy),
        tags: tagsConnectOrCreate.length
          ? { connectOrCreate: tagsConnectOrCreate }
          : undefined,
        skills:
          Array.isArray(skillIds) && skillIds.length
            ? { connect: skillIds.map((id) => ({ id })) }
            : undefined,
      },
      include: projectInclude,
    });
    return NextResponse.json({ data: serializeProject(created) }, { status: 201 });
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
    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile)
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const {
      id,
      tagNames,
      skillIds,
      title,
      slug,
      description,
      coverImage,
      images,
      url,
      repoUrl,
      startDate,
      endDate,
      categoryId,
      statusBadges,
      featuredRank,
      role,
      impact,
      caseStudy,
    } = body as {
      id: string;
      title?: string;
      slug?: string;
      description?: string | null;
      coverImage?: string | null;
      images?: unknown;
      url?: string | null;
      repoUrl?: string | null;
      startDate?: string | null;
      endDate?: string | null;
      tagNames?: string[];
      skillIds?: string[];
      categoryId?: string | null;
      statusBadges?: unknown;
      featuredRank?: number | null;
      role?: string | null;
      impact?: string | null;
      caseStudy?: unknown;
    };

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description || null;
    if (coverImage !== undefined) updateData.coverImage = coverImage || null;
    if (images !== undefined) updateData.images = normalizeProjectImages(images);
    if (url !== undefined) updateData.url = url || null;
    if (repoUrl !== undefined) updateData.repoUrl = repoUrl || null;
    if (statusBadges !== undefined)
      updateData.statusBadges = normalizeStringArray(statusBadges);
    if (featuredRank !== undefined) updateData.featuredRank = featuredRank ?? null;
    if (role !== undefined) updateData.role = role || null;
    if (impact !== undefined) updateData.impact = impact || null;
    if (caseStudy !== undefined) updateData.caseStudy = normalizeCaseStudy(caseStudy);

    if (categoryId !== undefined) {
      updateData.categoryId = await resolveProjectCategoryId(
        profile.id,
        categoryId,
      );
    }

    if (startDate !== undefined)
      updateData.startDate = startDate ? new Date(startDate) : null;
    if (endDate !== undefined)
      updateData.endDate = endDate ? new Date(endDate) : null;

    if (tagNames !== undefined) {
      const validTags = tagNames.filter(Boolean);
      updateData.tags = {
        set: [],
        connectOrCreate: validTags.map((tagName) => ({
          where: { name: tagName },
          create: { name: tagName },
        })),
      };
    }

    if (skillIds !== undefined) {
      updateData.skills = {
        set: skillIds.map((sid) => ({ id: sid })),
      };
    }

    const updated = await prisma.project.update({
      where: { id },
      data: updateData,
      include: projectInclude,
    });
    return NextResponse.json({ data: serializeProject(updated) });
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
