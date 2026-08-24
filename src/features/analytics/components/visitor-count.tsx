"use client";

import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";

import { queryKeys } from "@/constants/queryKeys";

async function getVisitorCount() {
  const response = await fetch("/api/visitors/count");

  if (!response.ok) {
    throw new Error("Failed to load visitor count");
  }

  const body = (await response.json()) as { count?: unknown };
  return typeof body.count === "number" ? body.count : null;
}

export function VisitorCount() {
  const visitorCount = useQuery({
    queryKey: queryKeys.visitors.count,
    queryFn: getVisitorCount,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const count = visitorCount.data ?? null;

  return (
    <div
      className="flex w-28 items-center gap-2"
      aria-live="polite"
      aria-busy={visitorCount.isPending}
    >
      <Users className="h-4 w-4" />
      <span className="tabular-nums">
        {count === null ? "—" : count.toLocaleString()} visitors
      </span>
    </div>
  );
}
