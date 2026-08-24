"use client";
import "@skycanvasstudio/sso/styles.css";
import { SsoUserMenu, useSkycanvas } from "@skycanvasstudio/sso/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LayoutDashboard, Settings, User2 } from "lucide-react";

export function UserMenu({ showSignIn = true }: { showSignIn?: boolean }) {
  const { session, status, logout } = useSkycanvas();
  const user = session?.user;

  if (status === "loading") return null;

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
  ) : showSignIn ? (
    <Button asChild>
      <Link href={"/auth/sign-in"}>Signin</Link>
    </Button>
  ) : null;
}

export function SignInButton() {
  const { session, status } = useSkycanvas();

  if (status === "loading" || session?.user) return null;

  return (
    <Button variant="outline" size="sm" asChild>
      <Link href="/auth/sign-in">Sign in</Link>
    </Button>
  );
}
