"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminProject } from "../useAdminProjects";
import { ProjectForm } from "./project-form";

interface EditProjectPageProps {
  projectId: string;
}

export function EditProjectPage({ projectId }: EditProjectPageProps) {
  const projectQuery = useAdminProject(projectId);
  const project = projectQuery.data?.data;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to projects
        </Link>
      </Button>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">
          Update project details, media, skills, and public case study content.
        </p>
      </div>

      {projectQuery.isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-56 w-full" />
        </div>
      ) : null}

      {projectQuery.isError ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Project not found</AlertTitle>
          <AlertDescription>
            This project may have been deleted, or you may not have access to
            it.
          </AlertDescription>
        </Alert>
      ) : null}

      {!projectQuery.isLoading && !projectQuery.isError && !project ? (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Project not found</AlertTitle>
          <AlertDescription>
            We could not find a project with this id.
          </AlertDescription>
        </Alert>
      ) : null}

      {project ? (
        <ProjectForm mode="edit" projectId={projectId} project={project} />
      ) : null}
    </div>
  );
}
