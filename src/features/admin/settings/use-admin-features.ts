"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/constants/endpoints";
import { queryKeys } from "@/constants/queryKeys";
import { toast } from "sonner";

export type FeatureFlag = { key: string; value: boolean };
export type OkRes<T> = { data: T };

export function useAdminFeatures() {
  const qc = useQueryClient();

  const list = useQuery<OkRes<FeatureFlag[]>>({
    queryKey: queryKeys.features.admin,
    queryFn: () => api(endpoints.admin.features),
  });

  const update = useMutation({
    mutationFn: async (payload: { key: string; value: boolean }) =>
      api(endpoints.admin.features, { method: "PATCH", data: payload }),
    onSuccess: () => {
      toast.success("Feature flag updated");
      qc.invalidateQueries({ queryKey: queryKeys.features.admin });
    },
    onError: () => toast.error("Failed to update feature flag"),
  });

  return { list, update };
}
