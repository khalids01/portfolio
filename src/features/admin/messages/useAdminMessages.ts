"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/constants/endpoints";
import { queryKeys } from "@/constants/queryKeys";
import type { ContactMessage } from "@/features/messages/types";
import { toast } from "sonner";

export function useAdminMessages() {
  const qc = useQueryClient();

  const list = useQuery<{ data: ContactMessage[] }>({
    queryKey: queryKeys.messages.admin,
    queryFn: () => api(endpoints.admin.messages),
  });

  const markRead = useMutation({
    mutationFn: async ({ id, read }: { id: string; read: boolean }) =>
      api(endpoints.admin.messages, { method: "PATCH", data: { id, read } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.messages.admin });
    },
    onError: () => toast.error("Failed to update message"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) =>
      api(`${endpoints.admin.messages}?id=${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Message deleted");
      qc.invalidateQueries({ queryKey: queryKeys.messages.admin });
    },
    onError: () => toast.error("Failed to delete message"),
  });

  return { list, markRead, remove };
}
