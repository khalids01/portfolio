"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/constants/endpoints";
import { queryKeys } from "@/constants/queryKeys";
import type { OkRes } from "./types";
import type { Skill } from "./types";

export function useSkills() {
  const skillsQuery = useQuery<OkRes<Skill[]>>({
    queryKey: queryKeys.skills.public,
    queryFn: () => api(endpoints.skills),
  });
  return { skillsQuery };
}
