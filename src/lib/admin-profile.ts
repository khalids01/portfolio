import { prisma } from "@/lib/prisma";

export async function getAdminProfile(userId: string) {
  let profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile) profile = await prisma.profile.findFirst();
  return profile;
}
