import * as React from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/features/admin/components/admin-shell";

import { skycanvas } from "@/lib/skycanvas";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await skycanvas.auth();
  if (!auth.isAuthenticated) redirect("/auth/sign-in");

  return <AdminShell>{children}</AdminShell>;
}
