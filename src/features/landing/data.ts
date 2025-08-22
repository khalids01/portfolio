import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export type LandingData = {
  name: string;
  title: string;
  bio: string;
  skills: Array<{ name: string }>;
  session: { userId: string; name?: string | null; role?: "ADMIN" | "USER" } | null;
};

export async function getLandingData(): Promise<LandingData> {
  // Get session (for header right-side logic)
  const hdrs = await headers();
  const session = await auth.api.getSession({ headers: hdrs });

  // Choose the portfolio owner profile. For now, pick the most recently updated.
  const profile = await prisma.profile.findFirst({
    orderBy: { updatedAt: "desc" },
    include: { user: true, skills: true },
  });

  const name = profile?.fullName || profile?.user?.name || "Your Name";
  const title = profile?.headline || "Software Engineer";
  const bio = profile?.bio || "I build modern, reliable web applications with an eye for performance and UX.";
  const skills = (profile?.skills || []).map((s) => ({ name: s.name }))
    .slice(0, 20);

  let sessionData: LandingData["session"] = null;
  if (session) {
    const u = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, name: true },
    });
    sessionData = { userId: session.user.id, name: u?.name ?? null, role: u?.role };
  }

  return { name, title, bio, skills, session: sessionData };
}
