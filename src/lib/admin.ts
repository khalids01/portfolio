import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function requireAdmin() {
  const hdrs = await headers();
  const session = await auth.api.getSession({ headers: hdrs });
  if (!session) {
    return { ok: false as const, status: 401, message: "Unauthorized" };
  }

  // Ensure the current user's role is ADMIN
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    return { ok: false as const, status: 403, message: "Forbidden" };
  }

  return { ok: true as const, session };
}
