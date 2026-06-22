"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/constants/endpoints";
import { queryKeys } from "@/constants/queryKeys";
import type { Category, CategoryType } from "@/features/categories/types";
import { toast } from "sonner";

export function useAdminCategories(categoryType: CategoryType) {
  const qc = useQueryClient();
  const queryKey = queryKeys.categories.admin(categoryType);

  const list = useQuery<{ data: Category[] }>({
    queryKey,
    queryFn: () =>
      api(`${endpoints.admin.categories}?categoryType=${categoryType}`),
  });

  const create = useMutation({
    mutationFn: async (payload: {
      name: string;
      slug?: string;
      categoryType: CategoryType;
      order?: number;
    }) =>
      api(endpoints.admin.categories, { method: "POST", data: payload }),
    onSuccess: () => {
      toast.success("Category created");
      qc.invalidateQueries({ queryKey: queryKeys.categories.admin(categoryType) });
    },
    onError: () => toast.error("Failed to create category"),
  });

  const update = useMutation({
    mutationFn: async (payload: {
      id: string;
      name?: string;
      slug?: string;
      order?: number;
    }) =>
      api(endpoints.admin.categories, { method: "PATCH", data: payload }),
    onSuccess: () => {
      toast.success("Category updated");
      qc.invalidateQueries({ queryKey: queryKeys.categories.admin(categoryType) });
    },
    onError: () => toast.error("Failed to update category"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) =>
      api(`${endpoints.admin.categories}?id=${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Category deleted");
      qc.invalidateQueries({ queryKey: queryKeys.categories.admin(categoryType) });
    },
    onError: (err: unknown) => {
      const message =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "error" in err.response.data
          ? String((err.response.data as { error: string }).error)
          : "Failed to delete category";
      toast.error(message);
    },
  });

  const reorder = useMutation({
    mutationFn: async (orderedIds: string[]) =>
      api(endpoints.admin.categoriesReorder, {
        method: "PATCH",
        data: { categoryType, orderedIds },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.categories.admin(categoryType) });
    },
    onError: () => toast.error("Failed to reorder categories"),
  });

  return { list, create, update, remove, reorder };
}
