import * as React from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/features/admin/components/admin-shell";

import { skycanvas } from "@/lib/skycanvas";
import { SkyCanvasProvider } from "@skycanvasstudio/sso/react";
import { QueryProvider } from "@/components/core/query-provider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bootstrap = await skycanvas.getBootstrap();
  if (!bootstrap.session) redirect("/auth/sign-in");

  return (
    <SkyCanvasProvider bootstrap={bootstrap}>
      <QueryProvider>
        <AdminShell>{children}</AdminShell>
      </QueryProvider>
    </SkyCanvasProvider>
  );
}
