"use client";

import { useForm } from "react-hook-form";
import { useAdminProjects } from "../useAdminProjects";
import { useAdminSkills } from "../../skills/useAdminSkills";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { SkillSelect } from "@/features/skills/components/skill-select";

type ProjectFormData = {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  url: string;
  repoUrl: string;
  startDate: string;
  endDate: string;
  tagNames: string; // comma separated
  skillIds: string[];
};

interface ProjectFormProps {
  projectId: string | null;
  onSuccess: () => void;
}

export function ProjectForm({ projectId, onSuccess }: ProjectFormProps) {
  const { create, update, list: projectsList } = useAdminProjects();
  const { list: skillsList } = useAdminSkills();
  
  const project = projectId
    ? projectsList.data?.data.find((p) => p.id === projectId)
    : null;

  const { register, handleSubmit, reset, setValue, watch } = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      coverImage: "",
      url: "",
      repoUrl: "",
      startDate: "",
      endDate: "",
      tagNames: "",
      skillIds: [],
    },
  });

  useEffect(() => {
    if (project) {
      setValue("title", project.title);
      setValue("slug", project.slug);
      setValue("description", project.description || "");
      setValue("coverImage", project.coverImage || "");
      setValue("url", project.url || "");
      setValue("repoUrl", project.repoUrl || "");
      setValue(
        "startDate",
        project.startDate
          ? new Date(project.startDate).toISOString().split("T")[0]
          : ""
      );
      setValue(
        "endDate",
        project.endDate
          ? new Date(project.endDate).toISOString().split("T")[0]
          : ""
      );
      setValue(
        "tagNames",
        project.tags.map((t) => t.name).join(", ")
      );
      setValue(
        "skillIds",
        project.skills.map((s) => s.id)
      );
    } else {
      reset({
        title: "",
        slug: "",
        description: "",
        coverImage: "",
        url: "",
        repoUrl: "",
        startDate: "",
        endDate: "",
        tagNames: "",
        skillIds: [],
      });
    }
  }, [project, setValue, reset]);

  const onSubmit = (data: ProjectFormData) => {
    const payload = {
      ...data,
      tagNames: data.tagNames
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (projectId) {
      update.mutate(
        { id: projectId, ...payload },
        {
          onSuccess: () => {
            onSuccess();
          },
        }
      );
    } else {
      create.mutate(payload, {
        onSuccess: () => {
          onSuccess();
        },
      });
    }
  };

  const selectedSkills = watch("skillIds") || [];


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title", { required: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" {...register("slug", { required: true })} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input id="coverImage" {...register("coverImage")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="url">Live URL</Label>
          <Input id="url" {...register("url")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="repoUrl">Repo URL</Label>
          <Input id="repoUrl" {...register("repoUrl")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input type="date" id="startDate" {...register("startDate")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input type="date" id="endDate" {...register("endDate")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagNames">Tags (comma separated)</Label>
        <Input
          id="tagNames"
          placeholder="Next.js, TypeScript, Tailwind"
          {...register("tagNames")}
        />
      </div>

      <div className="space-y-2">
        <Label>Skills</Label>
        <SkillSelect
          selectedSkillIds={selectedSkills}
          onChange={(ids: string[]) => setValue("skillIds", ids)}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={create.isPending || update.isPending}>
          {projectId ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
