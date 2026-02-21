import { redirect } from "next/navigation";

/**
 * Standalone layout for /admin/setup — intentionally bypasses the
 * AdminLayout auth guard so unauthenticated users can reach it.
 *
 * We still block access server-side if setup is already done.
 */
export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side: if an admin already exists, setup is done — block the page.
  // We hit the DB directly via a lightweight fetch to our own API.
  // (Can't use prisma directly here due to edge compatibility, but since
  //  this is Node runtime, we can import directly.)
  const { prisma } = await import("@/lib/prisma");
  const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
  if (adminCount > 0) {
    redirect("/");
  }

  return <>{children}</>;
}
