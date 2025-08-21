"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/constants/endpoints";
import { queryKeys } from "@/constants/queryKeys";
import type { OkRes } from "@/features/skills/types";
import type { Skill } from "@/features/skills/types";
import { toast } from "sonner";

export function useAdminSkills() {
  const qc = useQueryClient();

  const list = useQuery<OkRes<Skill[]>>({
    queryKey: queryKeys.skills.admin,
    queryFn: () => api(endpoints.admin.skills),
  });

  const create = useMutation({
    mutationFn: async (payload: Partial<Skill> & { name: string; projectIds?: string[] }) =>
      api(endpoints.admin.skills, { method: "POST", data: payload }),
    onSuccess: () => {
      toast.success("Skill created");
      qc.invalidateQueries({ queryKey: queryKeys.skills.admin });
      qc.invalidateQueries({ queryKey: queryKeys.skills.public });
    },
    onError: () => toast.error("Failed to create skill"),
  });

  const update = useMutation({
    mutationFn: async (payload: Partial<Skill> & { id: string; projectIds?: string[] }) =>
      api(endpoints.admin.skills, { method: "PATCH", data: payload }),
    onSuccess: () => {
      toast.success("Skill updated");
      qc.invalidateQueries({ queryKey: queryKeys.skills.admin });
      qc.invalidateQueries({ queryKey: queryKeys.skills.public });
    },
    onError: () => toast.error("Failed to update skill"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => api(`${endpoints.admin.skills}?id=${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Skill deleted");
      qc.invalidateQueries({ queryKey: queryKeys.skills.admin });
      qc.invalidateQueries({ queryKey: queryKeys.skills.public });
    },
    onError: () => toast.error("Failed to delete skill"),
  });

  return { list, create, update, remove };
}
