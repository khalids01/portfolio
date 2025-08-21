import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public GET: return skills of the latest profile, including linked projects (basic fields)
export async function GET() {
  try {
    const profile = await prisma.profile.findFirst({ orderBy: { createdAt: "desc" } });
    if (!profile) return NextResponse.json({ data: [] });

    const skills = await prisma.skill.findMany({
      where: { profileId: profile.id },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      include: {
        projects: {
          select: { id: true, title: true, slug: true }
        },
      },
    });
    return NextResponse.json({ data: skills });
  } catch (e) {
    console.error("/api/skills GET error", e);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}
