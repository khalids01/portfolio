import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { getAdminProfile } from "@/lib/admin-profile";
import {
  type CategoryType,
  isCategoryType,
  slugifyCategoryName,
} from "@/features/categories/types";

type CategoryWithUsage = Awaited<
  ReturnType<typeof prisma.category.findMany>
>[number] & {
  categoryType: CategoryType;
};

async function addUsageCounts(
  profileId: string,
  categories: CategoryWithUsage[],
) {
  return Promise.all(
    categories.map(async (category) => {
      const [projects, experiences, skills] = await Promise.all([
        prisma.project.count({ where: { categoryId: category.id } }),
        prisma.experience.count({ where: { categoryId: category.id } }),
        category.categoryType === "skills"
          ? prisma.skill.count({
              where: { profileId, category: category.name },
            })
          : Promise.resolve(0),
      ]);
      const educations = 0;

      return {
        ...category,
        usageCounts: {
          projects,
          experiences,
          educations,
          skills,
          total: projects + experiences + educations + skills,
        },
      };
    }),
  );
}

export async function GET(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );
  }

  try {
    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile) return NextResponse.json({ data: [] });

    const { searchParams } = new URL(req.url);
    const categoryType = searchParams.get("categoryType");
    const resolvedCategoryType = categoryType && isCategoryType(categoryType)
      ? categoryType
      : undefined;

    const categories = await prisma.category.findMany({
      where: {
        profileId: profile.id,
        ...(resolvedCategoryType
          ? { categoryType: resolvedCategoryType }
          : {}),
      },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({
      data: await addUsageCounts(
        profile.id,
        categories as CategoryWithUsage[],
      ),
    });
  } catch (e) {
    console.error("/api/admin/categories GET error", e);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );
  }

  try {
    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const body = await req.json();
    const { name, slug, categoryType, order } = body as {
      name: string;
      slug?: string;
      categoryType: string;
      order?: number;
    };

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!isCategoryType(categoryType)) {
      return NextResponse.json({ error: "Invalid category type" }, { status: 400 });
    }

    const resolvedSlug = (slug?.trim() || slugifyCategoryName(name)).toLowerCase();
    if (!resolvedSlug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    let resolvedOrder = order;
    if (resolvedOrder === undefined) {
      const max = await prisma.category.aggregate({
        where: { profileId: profile.id, categoryType },
        _max: { order: true },
      });
      resolvedOrder = (max._max.order ?? -1) + 1;
    }

    const created = await prisma.category.create({
      data: {
        profileId: profile.id,
        name: name.trim(),
        slug: resolvedSlug,
        categoryType,
        order: resolvedOrder,
      },
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (e) {
    console.error("/api/admin/categories POST error", e);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );
  }

  try {
    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const body = await req.json();
    const { id, name, slug, order } = body as {
      id: string;
      name?: string;
      slug?: string;
      order?: number;
    };

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const existing = await prisma.category.findFirst({
      where: { id, profileId: profile.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        ...(name !== undefined ? { name: name.trim() } : {}),
        ...(slug !== undefined
          ? { slug: slug.trim().toLowerCase() || slugifyCategoryName(name ?? existing.name) }
          : {}),
        ...(order !== undefined ? { order } : {}),
      },
    });

    return NextResponse.json({ data: updated });
  } catch (e) {
    console.error("/api/admin/categories PATCH error", e);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );
  }

  try {
    const profile = await getAdminProfile(guard.session.user.id as string);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const existing = await prisma.category.findFirst({
      where: { id, profileId: profile.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.project.updateMany({
        where: { profileId: profile.id, categoryId: id },
        data: { categoryId: null },
      }),
      prisma.experience.updateMany({
        where: { profileId: profile.id, categoryId: id },
        data: { categoryId: null },
      }),
      ...(existing.categoryType === "skills"
        ? [
            prisma.skill.updateMany({
              where: { profileId: profile.id, category: existing.name },
              data: { category: "" },
            }),
          ]
        : []),
      prisma.category.delete({ where: { id } }),
    ]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("/api/admin/categories DELETE error", e);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 },
    );
  }
}
