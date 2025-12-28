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
import { ProjectForm } from "./project-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import Link from "next/link";

export function AdminProjectsList() {
  const { list, remove } = useAdminProjects();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>
          <ProjectForm
            projectId={editingId}
            onSuccess={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.isLoading && <div>Loading projects...</div>}
        {list.data?.data.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-1">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="text-sm text-muted-foreground">
                {project.startDate && format(new Date(project.startDate), "MMM yyyy")}
                {" - "}
                {project.endDate
                  ? format(new Date(project.endDate), "MMM yyyy")
                  : "Present"}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map(t => (
                  <span key={t.id} className="text-xs bg-secondary px-2 py-1 rounded-md">
                    {t.name}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex gap-2">
                  {project.url && (
                    <Link href={project.url} target="_blank" className="text-muted-foreground hover:text-primary">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                  {project.repoUrl && (
                    <Link href={project.repoUrl} target="_blank" className="text-muted-foreground hover:text-primary">
                      <Github className="h-4 w-4" />
                    </Link>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(project.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      if (confirm("Are you sure?")) remove.mutate(project.id);
                    }}
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
