"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteUser } from "@/features/users/actions/users";
import { toast } from "sonner";
import { useState } from "react";

interface DeleteUserAlertProps {
  userId: string;
  userName: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteUserAlert({ userId, userName, open, onOpenChange }: DeleteUserAlertProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const result = await deleteUser(userId);
      if (result.success) {
        toast.success("User deleted successfully");
        onOpenChange(false);
      } else {
        toast.error(result.error || "Failed to delete user");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            <strong> {userName || "Unknown"}</strong> and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={(e) => {
            e.preventDefault();
            handleDelete();
          }} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
