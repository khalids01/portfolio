"use client";
import "@skycanvasstudio/sso/styles.css";
import { SsoUserMenu, useSkycanvas } from "@skycanvasstudio/sso/react";
import { Button } from "../ui/button";
import Link from "next/link";

export function UserMenu() {
  const { session, status, logout } = useSkycanvas();
  const user = session?.user;

  if (status === "loading") return <span>Loading…</span>;

  return user ? (
    <SsoUserMenu
      user={user}
      items={[
        { label: "Dashboard", href: "/admin" },
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/settings" },
      ]}
      onLogout={() => logout({ returnTo: "/" })}
    />
  ) : (
    <Button asChild>
      <Link href={"/auth/sign-in"}>Signin</Link>
    </Button>
  );
}
