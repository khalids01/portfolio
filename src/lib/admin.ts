import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "khalid.code03@gmail.com";

export async function requireAdmin() {
  const hdrs = await headers();
  const session = await auth.api.getSession({ headers: hdrs });
  if (!session) {
    return { ok: false as const, status: 401, message: "Unauthorized" };
  }
  const isAdmin = session.user?.email === ADMIN_EMAIL;
  if (!isAdmin) {
    return { ok: false as const, status: 403, message: "Forbidden" };
  }
  return { ok: true as const, session };
}
