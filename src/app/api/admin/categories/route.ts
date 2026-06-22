import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { getAdminProfile } from "@/lib/admin-profile";
import {
  isCategoryType,
  slugifyCategoryName,
} from "@/features/categories/types";

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

    const categories = await prisma.category.findMany({
      where: {
        profileId: profile.id,
        ...(categoryType && isCategoryType(categoryType)
          ? { categoryType }
          : {}),
      },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ data: categories });
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

    const projectCount = await prisma.project.count({
      where: { categoryId: id },
    });
    if (projectCount > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete: ${projectCount} project(s) still use this category`,
        },
        { status: 409 },
      );
    }

    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("/api/admin/categories DELETE error", e);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 },
    );
  }
}
