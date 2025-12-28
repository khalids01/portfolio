import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

// GET: list projects for the current admin's profile
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });
  const userId = guard.session.user.id as string;

  try {
    const profile = await prisma.profile.findUnique({ where: { userId } });
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
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST: create a project for current profile
export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });
  const userId = guard.session.user.id as string;

  try {
    const body = await req.json();
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

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

    // Handle tags: find or create
    const tagsConnect = [];
    if (tagNames && tagNames.length > 0) {
      for (const tagName of tagNames) {
        // upsert doesn't return the id easily for connect in one go if we want to reuse existing tags by name
        // simpler approach: find existing, create missing
        // or use connectOrCreate
        tagsConnect.push({
          where: { name: tagName },
          create: { name: tagName },
        });
      }
    }

    const created = await prisma.project.create({
      data: {
        profileId: profile.id,
        title,
        slug,
        description: description ?? null,
        coverImage: coverImage ?? null,
        url: url ?? null,
        repoUrl: repoUrl ?? null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        tags: {
          connectOrCreate: tagsConnect,
        },
        skills: skillIds?.length
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
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

// PATCH: update a project by id
export async function PATCH(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    const body = await req.json();
    const { id, tagNames, skillIds, ...updates } = body as {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { ...updates };

    if (updates.startDate) updateData.startDate = new Date(updates.startDate);
    if (updates.endDate) updateData.endDate = new Date(updates.endDate);

    if (tagNames) {
      const tagsConnect = tagNames.map((tagName) => ({
        where: { name: tagName },
        create: { name: tagName },
      }));
      updateData.tags = {
        set: [], // clear existing connections? Or we might want to just set the new list. 
                 // Prisma 'set' on relations replaces all connections.
                 // But connectOrCreate inside set is not supported directly usually?
                 // Actually for many-to-many, 'set' expects a list of unique identifiers.
                 // Since we are creating tags on the fly, this is tricky.
                 // Strategy: disconnect all, then connectOrCreate.
      };
      // Better strategy for tags:
      // 1. Disconnect all tags
      // 2. ConnectOrCreate new list
      // But we can't do that easily in one update call if we want to use 'set'.
      // 'set' works with IDs.
      // So we might need to resolve IDs first or use a transaction.
      // Let's try a simpler approach: just use 'set' with IDs if we had them, but we have names.
      // So we will use deleteMany (on join table? no) -> set: [] to disconnect all.
      // Then connectOrCreate.
      
      // Actually, let's just use 'set' to empty, then 'connectOrCreate'.
      // But 'set' and 'connectOrCreate' in same update?
      // Prisma allows: tags: { set: [], connectOrCreate: [...] }
      
      updateData.tags = {
        set: [],
        connectOrCreate: tagsConnect,
      };
    }

    if (skillIds) {
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
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// DELETE: delete a project by id
export async function DELETE(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("/api/admin/projects DELETE error", e);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
