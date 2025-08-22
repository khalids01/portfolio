import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/core/mode-toggle";
import { UserMenu } from "@/components/core/user-menu";
import { AnimatedName } from "@/components/core/animated-name";
import type { LandingData } from "@/features/landing/data";

export function SiteHeader({
  name,
  session,
}: {
  name: string;
  session: LandingData["session"];
}) {
  const isAuthed = Boolean(session);
  const isAdmin = session?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center gap-2 px-3 md:px-4">
        <Link href={"/"}>
          <AnimatedName name={name} />
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <ModeToggle />
          {isAuthed ? (
            <UserMenu
              name={session?.name ?? undefined}
              isAuthenticated
              isAdmin={isAdmin}
            />
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
      <Separator />
    </header>
  );
}
