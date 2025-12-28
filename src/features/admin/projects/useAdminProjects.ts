"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/constants/endpoints";
import { queryKeys } from "@/constants/queryKeys";
import type { Project } from "@/features/projects/types";
import { toast } from "sonner";

export function useAdminProjects() {
  const qc = useQueryClient();

  const list = useQuery<{ data: Project[] }>({
    queryKey: queryKeys.projects.admin,
    queryFn: () => api(endpoints.admin.projects),
  });

  const create = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (payload: any) =>
      api(endpoints.admin.projects, { method: "POST", data: payload }),
    onSuccess: () => {
      toast.success("Project created");
      qc.invalidateQueries({ queryKey: queryKeys.projects.admin });
      qc.invalidateQueries({ queryKey: queryKeys.projects.public });
    },
    onError: () => toast.error("Failed to create project"),
  });

  const update = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (payload: any) =>
      api(endpoints.admin.projects, { method: "PATCH", data: payload }),
    onSuccess: () => {
      toast.success("Project updated");
      qc.invalidateQueries({ queryKey: queryKeys.projects.admin });
      qc.invalidateQueries({ queryKey: queryKeys.projects.public });
    },
    onError: () => toast.error("Failed to update project"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) =>
      api(`${endpoints.admin.projects}?id=${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Project deleted");
      qc.invalidateQueries({ queryKey: queryKeys.projects.admin });
      qc.invalidateQueries({ queryKey: queryKeys.projects.public });
    },
    onError: () => toast.error("Failed to delete project"),
  });

  return { list, create, update, remove };
}
