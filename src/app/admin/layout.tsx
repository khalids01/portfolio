import * as React from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/features/admin/components/admin-shell";

import { skycanvas } from "@/lib/skycanvas";
import { SkyCanvasProvider } from "@skycanvasstudio/sso/react";
import { QueryProvider } from "@/components/core/query-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Admin pages are authenticated and database-backed. Never execute their
// queries during static generation; only the public landing page uses ISR.
export const dynamic = "force-dynamic";

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
