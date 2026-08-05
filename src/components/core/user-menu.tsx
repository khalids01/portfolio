"use client";
import "@skycanvasstudio/sso/styles.css"
import { SsoSignInButton, SsoUserMenu } from "@skycanvasstudio/sso/react"
import { useSso } from "@/lib/auth-client"

export function UserMenu() {
  const { user, isPending, signIn, signOut } = useSso()

  if (isPending) return <span>Loading…</span>

  return user ? (
    <SsoUserMenu
      user={user}
      items={[
        { label: "Dashboard", href: "/admin", },
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/settings" },
      ]}
      onLogout={() => signOut({ returnTo: "/" })}

    />
  ) : (
    <SsoSignInButton onSignIn={() => signIn("/admin")} />
  )
}
