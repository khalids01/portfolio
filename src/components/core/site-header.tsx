import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/core/mode-toggle";
import type { ReactNode } from "react";

export function SiteHeader({
  brandAddon,
  actions,
}: {
  brandAddon?: ReactNode;
  actions?: ReactNode;
}) {

  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center gap-2 px-3 md:px-4">
        <Link href={"/"} className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg border bg-muted">
            <Image
              src="/icon.png"
              alt="Logo"
              fill
              sizes="32px"
              className="object-cover"
              priority
            />
          </div>
          {brandAddon}
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <ModeToggle />

          {actions}

        </div>
      </div>
      <Separator />
    </header>
  );
}
