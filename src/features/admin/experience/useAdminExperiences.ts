"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/constants/endpoints";
import { queryKeys } from "@/constants/queryKeys";
import type { Experience } from "@/features/experience/types";
import { toast } from "sonner";

export function useAdminExperiences() {
  const qc = useQueryClient();

  const list = useQuery<{ data: Experience[] }>({
    queryKey: queryKeys.experiences.admin,
    queryFn: () => api(endpoints.admin.experiences),
  });

  const create = useMutation({
    mutationFn: async (payload: unknown) =>
      api(endpoints.admin.experiences, { method: "POST", data: payload }),
    onSuccess: () => {
      toast.success("Experience created");
      qc.invalidateQueries({ queryKey: queryKeys.experiences.admin });
    },
    onError: () => toast.error("Failed to create experience"),
  });

  const update = useMutation({
    mutationFn: async (payload: unknown) =>
      api(endpoints.admin.experiences, { method: "PATCH", data: payload }),
    onSuccess: () => {
      toast.success("Experience updated");
      qc.invalidateQueries({ queryKey: queryKeys.experiences.admin });
    },
    onError: () => toast.error("Failed to update experience"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) =>
      api(`${endpoints.admin.experiences}?id=${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Experience deleted");
      qc.invalidateQueries({ queryKey: queryKeys.experiences.admin });
    },
    onError: () => toast.error("Failed to delete experience"),
  });

  return { list, create, update, remove };
}
