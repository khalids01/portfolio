"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/constants/endpoints";
import { queryKeys } from "@/constants/queryKeys";
import type { OkRes } from "./types";
import type { ProfileDTO } from "./types";
import { toast } from "sonner";

export function useAdminProfile() {
  const qc = useQueryClient();

  const profileQuery = useQuery<OkRes<ProfileDTO | null>>({
    queryKey: queryKeys.profile.admin,
    queryFn: () => api(endpoints.profile),
  });

  const createOrUpdate = useMutation({
    mutationFn: async (payload: ProfileDTO) => {
      const method = profileQuery.data?.data ? "PATCH" : "POST";
      return api<OkRes<ProfileDTO>>(endpoints.admin.profile, {
        method,
        data: payload,
      });
    },
    onSuccess: async () => {
      toast.success("Profile saved");
      await qc.invalidateQueries({ queryKey: queryKeys.profile.admin });
      await qc.invalidateQueries({ queryKey: queryKeys.profile.public });
    },
    onError: () => toast.error("Failed to save profile"),
  });

  return { profileQuery, createOrUpdate };
}
