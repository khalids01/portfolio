import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public GET: return the single profile (including relations as needed)
export async function GET() {
  try {
    const profile = await prisma.profile.findFirst({
      include: {
        skills: true,
        experiences: {
          include: {
            highlights: true,
            category: { select: { id: true, name: true, slug: true } },
            skills: { orderBy: { order: "asc" }, select: { id: true, name: true, icon: true } },
            projects: { select: { id: true, title: true, slug: true } },
          },
        },
        educations: true,
        projects: {
          include: {
            tags: true,
            skills: {
              orderBy: { order: "asc" },
              select: { id: true, name: true, icon: true },
            },
            category: { select: { id: true, name: true, slug: true } },
            experience: { select: { id: true, slug: true, company: true, role: true } },
          },
        },
        socialLinks: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: profile });
  } catch (e) {
    console.error("/api/profile GET error", e);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
