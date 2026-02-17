"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackVisit } from "../actions/track";

export function VisitorTracker() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (lastPathRef.current === pathname) return;
    
    // Fire and forget
    trackVisit(pathname).catch(console.error);
    lastPathRef.current = pathname;
  }, [pathname]);

  return null;
}
