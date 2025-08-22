"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function RedirectGuard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!pathname) return;
    // Allow only the magic link sign-in page under /auth
    const allowed = ["/auth/sign-in"];
    const isAllowed = allowed.includes(pathname);
    const isAuthSection = pathname.startsWith("/auth");

    if (isAuthSection && !isAllowed) {
      router.replace("/auth/sign-in");
    }
  }, [pathname, router]);

  return null;
}
