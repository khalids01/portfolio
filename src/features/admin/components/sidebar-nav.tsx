"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { BriefcaseBusiness, FolderKanban, Home, Mail, Settings, User2, Wrench, Users, FileText, Activity, Tags, Images } from "lucide-react";

const items = [
  { title: "Dashboard", href: "/admin", icon: Home },
  { title: "Visitors", href: "/admin/visitors", icon: Activity },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Resume", href: "/admin/resume", icon: FileText },
  { title: "Profile", href: "/admin/profile", icon: User2 },
  { title: "Skills", href: "/admin/skills", icon: Wrench },
  { title: "Experience", href: "/admin/experience", icon: BriefcaseBusiness },
  { title: "Categories", href: "/admin/categories", icon: Tags },
  { title: "Projects", href: "/admin/projects", icon: FolderKanban },
  { title: "Images", href: "/admin/images", icon: Images },
  { title: "Messages", href: "/admin/messages", icon: Mail },
  { title: "Settings", href: "/admin/settings", icon: Settings },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-2 py-3">
        <Link href="/admin" className="flex items-center gap-2 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon.png"
            alt="Logo"
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-sm font-semibold truncate">Khalid</span>
            <span className="text-xs text-muted-foreground truncate">Admin Panel</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link href={item.href} className="flex items-center">
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export function AdminSidebarProvider({ children }: { children: React.ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
