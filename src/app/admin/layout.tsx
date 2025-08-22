import * as React from "react";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/features/admin/components/admin-shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const result = await requireAdmin();
  if (!result.ok) {
    redirect("/");
  }
  return <AdminShell>{children}</AdminShell>;
}
