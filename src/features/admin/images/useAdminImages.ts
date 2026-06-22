"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endpoints } from "@/constants/endpoints";
import { queryKeys } from "@/constants/queryKeys";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { AdminImagesParams, AdminImagesResponse, UploadImagesResult } from "./types";

type OkRes<T> = { data: T };

function buildQuery(params: AdminImagesParams) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "" || value === "all") {
      return;
    }
    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export function useAdminImages(params: AdminImagesParams = {}) {
  const qc = useQueryClient();

  const list = useQuery<OkRes<AdminImagesResponse>>({
    queryKey: queryKeys.images.admin(params),
    queryFn: () => api(`${endpoints.admin.images}${buildQuery(params)}`),
  });

  const upload = useMutation({
    mutationFn: async ({
      files,
      tags,
    }: {
      files: File[];
      tags?: string[];
    }) => {
      const form = new FormData();

      if (files.length === 1) {
        form.append("file", files[0]);
        if (tags?.length) form.append("tags", JSON.stringify(tags));
      } else {
        const descriptors = files.map((_, index) => ({
          file: `file_${index}`,
          tags: tags ?? [],
        }));
        form.append("files", JSON.stringify(descriptors));
        files.forEach((file, index) => form.append(`file_${index}`, file));
      }

      const response = await fetch(endpoints.admin.imagesUpload, {
        method: "POST",
        body: form,
        credentials: "include",
      });
      const body = (await response.json()) as {
        data?: UploadImagesResult;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(body.error ?? "Upload failed");
      }

      return body.data as UploadImagesResult;
    },
    onSuccess: () => {
      toast.success("Image uploaded");
      qc.invalidateQueries({ queryKey: ["images", "admin"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) =>
      api(`${endpoints.admin.images}/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Image deleted");
      qc.invalidateQueries({ queryKey: ["images", "admin"] });
    },
    onError: () => toast.error("Failed to delete image"),
  });

  return { list, upload, remove };
}
