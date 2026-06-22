import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { getAdminProfile } from "@/lib/admin-profile";
import { isCategoryType } from "@/features/categories/types";

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
    const { categoryType, orderedIds } = body as {
      categoryType: string;
      orderedIds: string[];
    };

    if (!isCategoryType(categoryType)) {
      return NextResponse.json({ error: "Invalid category type" }, { status: 400 });
    }
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json({ error: "orderedIds is required" }, { status: 400 });
    }

    const categories = await prisma.category.findMany({
      where: {
        profileId: profile.id,
        categoryType,
        id: { in: orderedIds },
      },
      select: { id: true },
    });

    if (categories.length !== orderedIds.length) {
      return NextResponse.json(
        { error: "One or more categories were not found" },
        { status: 400 },
      );
    }

    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.category.update({
          where: { id },
          data: { order: index },
        }),
      ),
    );

    const updated = await prisma.category.findMany({
      where: { profileId: profile.id, categoryType },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ data: updated });
  } catch (e) {
    console.error("/api/admin/categories/reorder PATCH error", e);
    return NextResponse.json(
      { error: "Failed to reorder categories" },
      { status: 500 },
    );
  }
}
