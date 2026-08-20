import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { getAdminProfile } from "@/lib/admin-profile";

async function resolveExperienceCategoryId(
  profileId: string,
  categoryId: string | null | undefined,
) {
  if (!categoryId) return null;

  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      profileId,
      categoryType: "experience",
    },
    select: { id: true },
  });

  return category?.id ?? null;
}

function parseDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeHighlights(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0,
  );
}

function normalizeImages(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0,
  );
}

async function resolveProfileSkillIds(profileId: string, value: string[] | undefined) {
  const ids = [...new Set((value ?? []).filter(Boolean))];
  if (!ids.length) return ids;
  const skills = await prisma.skill.findMany({
    where: { id: { in: ids }, profileId },
    select: { id: true },
  });
  if (skills.length !== ids.length) {
    throw new Error("Invalid skill IDs for the current profile");
  }
  return ids;
}

const include = {
  highlights: true,
  category: { select: { id: true, name: true, slug: true } },
  skills: { select: { id: true, name: true } },
};

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.message }, { status: guard.status });
  }

  try {
    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile) return NextResponse.json({ data: [] });

    const experiences = await prisma.experience.findMany({
      where: { profileId: profile.id },
      orderBy: { startDate: "desc" },
      include,
    });

    return NextResponse.json({ data: experiences });
  } catch (error) {
    console.error("/api/admin/experiences GET error", error);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.message }, { status: guard.status });
  }

  try {
    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const body = await req.json() as {
      slug: string;
      company: string;
      role: string;
      location?: string | null;
      startDate: string;
      endDate?: string | null;
      current?: boolean;
      description?: string | null;
      coverImage?: string | null;
      images?: unknown;
      categoryId?: string | null;
      highlights?: unknown;
      skillIds?: string[];
    };

    const startDate = parseDate(body.startDate);
    if (!body.slug || !body.company || !body.role || !startDate) {
      return NextResponse.json(
        { error: "Slug, company, role, and valid start date are required" },
        { status: 400 },
      );
    }

    const categoryId = await resolveExperienceCategoryId(profile.id, body.categoryId);
    const skillIds = await resolveProfileSkillIds(profile.id, body.skillIds);
    const created = await prisma.experience.create({
      data: {
        profileId: profile.id,
        slug: body.slug,
        company: body.company,
        role: body.role,
        location: body.location || null,
        startDate,
        endDate: parseDate(body.endDate),
        current: Boolean(body.current),
        description: body.description || null,
        coverImage: body.coverImage || null,
        images: normalizeImages(body.images),
        categoryId,
        skills:
          skillIds.length
            ? { connect: skillIds.map((id) => ({ id })) }
            : undefined,
        highlights: {
          create: normalizeHighlights(body.highlights).map((text) => ({ text })),
        },
      },
      include,
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error("/api/admin/experiences POST error", error);
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.message }, { status: guard.status });
  }

  try {
    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const body = await req.json() as {
      id: string;
      slug?: string;
      company?: string;
      role?: string;
      location?: string | null;
      startDate?: string;
      endDate?: string | null;
      current?: boolean;
      description?: string | null;
      coverImage?: string | null;
      images?: unknown;
      categoryId?: string | null;
      highlights?: unknown;
      skillIds?: string[];
    };

    if (!body.id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const existingExperience = await prisma.experience.findFirst({
      where: { id: body.id, profileId: profile.id },
      select: { id: true },
    });
    if (!existingExperience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    const data: Record<string, unknown> = {};
    if (body.slug !== undefined) data.slug = body.slug;
    if (body.company !== undefined) data.company = body.company;
    if (body.role !== undefined) data.role = body.role;
    if (body.location !== undefined) data.location = body.location || null;
    if (body.startDate !== undefined) data.startDate = parseDate(body.startDate);
    if (body.endDate !== undefined) data.endDate = parseDate(body.endDate);
    if (body.current !== undefined) data.current = Boolean(body.current);
    if (body.description !== undefined) data.description = body.description || null;
    if (body.coverImage !== undefined) data.coverImage = body.coverImage || null;
    if (body.images !== undefined) data.images = normalizeImages(body.images);
    if (body.categoryId !== undefined) {
      data.categoryId = await resolveExperienceCategoryId(profile.id, body.categoryId);
    }
    if (body.skillIds !== undefined) {
      const skillIds = await resolveProfileSkillIds(profile.id, body.skillIds);
      data.skills = {
        set: skillIds.map((id) => ({ id })),
      };
    }

    const updated = await prisma.$transaction(async (tx) => {
      const experience = await tx.experience.update({
        where: { id: body.id },
        data,
      });

      if (body.highlights !== undefined) {
        await tx.experienceHighlight.deleteMany({
          where: { experienceId: experience.id },
        });
        const highlights = normalizeHighlights(body.highlights);
        if (highlights.length) {
          await tx.experienceHighlight.createMany({
            data: highlights.map((text) => ({
              experienceId: experience.id,
              text,
            })),
          });
        }
      }

      return tx.experience.findUniqueOrThrow({
        where: { id: experience.id },
        include,
      });
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("/api/admin/experiences PATCH error", error);
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ error: guard.message }, { status: guard.status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    const experience = await prisma.experience.findFirst({
      where: { id, profileId: profile.id },
      select: { id: true },
    });
    if (!experience) return NextResponse.json({ error: "Experience not found" }, { status: 404 });

    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("/api/admin/experiences DELETE error", error);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
