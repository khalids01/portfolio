import { skycanvas } from "@/lib/skycanvas";
import { prisma } from "@/lib/prisma";

export async function requireAdmin() {
  const auth = await skycanvas.auth();
  const session = auth.session;
  if (!session) {
    return { ok: false as const, status: 401, message: "Unauthorized" };
  }

  // Ensure the current user's role is ADMIN
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    return { ok: false as const, status: 403, message: "Forbidden" };
  }

  return { ok: true as const, session };
}
