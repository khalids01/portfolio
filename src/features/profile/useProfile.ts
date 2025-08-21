"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/constants/endpoints";
import { queryKeys } from "@/constants/queryKeys";
import type { OkRes } from "@/features/admin/profile/types";
import type { ProfileDTO } from "@/features/admin/profile/types";

export function useProfile() {
  const profileQuery = useQuery<OkRes<ProfileDTO | null>>({
    queryKey: queryKeys.profile.public,
    queryFn: () => api(endpoints.profile),
  });
  return { profileQuery };
}
