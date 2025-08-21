"use client";

import * as React from "react";
import { motion } from "motion/react";
import { AdminSidebar, AdminSidebarProvider } from "@/features/admin/components/sidebar-nav";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/core/mode-toggle";
import { UserMenu } from "@/components/core/user-menu";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center gap-2 px-3 md:px-4">
            <SidebarTrigger className="md:hidden" />
            <motion.h1
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="font-semibold tracking-tight"
            >
              Admin
            </motion.h1>
            <div className="ml-auto flex items-center gap-1">
              <ModeToggle />
              <UserMenu />
            </div>
          </div>
          <Separator />
        </header>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </AdminSidebarProvider>
  );
}
