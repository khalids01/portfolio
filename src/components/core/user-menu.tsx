"use client";
import "@skycanvasstudio/sso/styles.css";
import { SsoUserMenu, useSkycanvas } from "@skycanvasstudio/sso/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LayoutDashboard, Settings, User, User2 } from "lucide-react";

export function UserMenu() {
  const { session, status, logout } = useSkycanvas();
  const user = session?.user;

  if (status === "loading") return <span>Loading…</span>;

  return user ? (
    <SsoUserMenu
      user={user}
      items={[
        {
          label: "Dashboard",
          href: "/admin",
          icon: <LayoutDashboard className="size-8" />,
        },
        {
          label: "Site Profile",
          href: "/profile",
          icon: <User2 className="size-8" />,
        },
        {
          label: "Settings",
          href: "/settings",
          icon: <Settings className="size-8" />,
        },
      ]}
      onLogout={() => logout({ returnTo: "/" })}
    />
  ) : (
    <Button asChild>
      <Link href={"/auth/sign-in"}>Signin</Link>
    </Button>
  );
}
