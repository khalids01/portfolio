import Link from "next/link";
import { ReactNode } from "react";
import { ModeToggle } from "@/components/core/mode-toggle";
import { RedirectGuard } from "./redirect-guard";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-semibold tracking-tight">
              Portfolio
            </Link>
            <span className="text-muted-foreground text-sm">· Auth</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/auth/sign-in" className="text-sm text-muted-foreground hover:text-foreground">
              Sign in
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/auth/sign-up" className="text-sm text-muted-foreground hover:text-foreground">
              Sign up
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 grid place-items-center px-4">
        {/* Redirect any disallowed /auth routes to magic link sign-in */}
        <RedirectGuard />
        {children}
      </main>
      <footer className="border-t">
        <div className="container h-12 flex items-center justify-between text-xs text-muted-foreground mx-auto">
          <span>© {new Date().getFullYear()} Portfolio</span>
          <Link href="/" className="hover:underline">Home</Link>
        </div>
      </footer>
    </div>
  );
}
