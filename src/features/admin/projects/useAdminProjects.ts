"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/constants/endpoints";
import { queryKeys } from "@/constants/queryKeys";
import type { Project } from "@/features/projects/types";
import { toast } from "sonner";

export type ProjectMutationPayload = {
  title: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  images: string[];
  url: string | null;
  repoUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  tagNames: string[];
  skillIds: string[];
  categoryId: string | null;
  experienceId: string | null;
  statusBadges: string[];
  featuredRank: number | null;
  role: string | null;
  impact: string | null;
  caseStudy: {
    problem?: string;
    role?: string;
    features: string[];
    challenges: string[];
    result?: string;
  };
};

export function useAdminProject(id: string) {
  return useQuery<{ data: Project }>({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => api(`${endpoints.admin.projects}?id=${encodeURIComponent(id)}`),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useAdminProjects() {
  const qc = useQueryClient();

  const list = useQuery<{ data: Project[] }>({
    queryKey: queryKeys.projects.admin,
    queryFn: () => api(endpoints.admin.projects),
  });

  const create = useMutation({
    mutationFn: async (payload: ProjectMutationPayload) =>
      api(endpoints.admin.projects, { method: "POST", data: payload }),
    onSuccess: () => {
      toast.success("Project created");
      qc.invalidateQueries({ queryKey: queryKeys.projects.admin });
      qc.invalidateQueries({ queryKey: queryKeys.projects.public });
    },
    onError: () => toast.error("Failed to create project"),
  });

  const update = useMutation({
    mutationFn: async (payload: ProjectMutationPayload & { id: string }) =>
      api(endpoints.admin.projects, { method: "PATCH", data: payload }),
    onSuccess: (_data, payload) => {
      toast.success("Project updated");
      qc.invalidateQueries({ queryKey: queryKeys.projects.admin });
      qc.invalidateQueries({ queryKey: queryKeys.projects.detail(payload.id) });
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
