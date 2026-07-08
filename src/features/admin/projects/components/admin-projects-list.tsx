"use client";

import { useState } from "react";
import { useAdminProjects } from "../useAdminProjects";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Pencil, Trash2, ExternalLink, Github } from "lucide-react";
import { CoreImg } from "@/components/core/img";
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
import { format } from "date-fns";
import Link from "next/link";

export function AdminProjectsList() {
  const { list, remove } = useAdminProjects();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleConfirmDelete = () => {
    if (deletingId) {
      remove.mutate(deletingId, {
        onSettled: () => setDeletingId(null),
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Link>
        </Button>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={!!deletingId}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The project will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {remove.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.isLoading && <div>Loading projects...</div>}
        {list.data?.data.map((project) => (
          <Card key={project.id} className="flex flex-col">
            {project.coverImage ? (
              <div className="aspect-video overflow-hidden rounded-t-xl border-b">
                <CoreImg src={project.coverImage} alt={project.title} />
              </div>
            ) : null}
            <CardHeader>
              <CardTitle className="line-clamp-1">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="text-sm text-muted-foreground">
                {project.category ? `${project.category.name} · ` : ""}
                {project.startDate &&
                  format(new Date(project.startDate), "MMM yyyy")}
                {" – "}
                {project.endDate
                  ? format(new Date(project.endDate), "MMM yyyy")
                  : "Present"}
              </div>

              {/* Tags */}
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((t) => (
                    <span
                      key={t.id}
                      className="text-xs bg-secondary px-2 py-1 rounded-md"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Skills */}
              {project.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.skills.map((s) => (
                    <span
                      key={s.id}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex gap-2">
                  {project.url && (
                    <Link
                      href={project.url}
                      target="_blank"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                  {project.repoUrl && (
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                    </Link>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      aria-label={`Edit ${project.title}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeletingId(project.id)}
                    disabled={remove.isPending && deletingId === project.id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {!list.isLoading && list.data?.data.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-8">
            No projects found. Add one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
