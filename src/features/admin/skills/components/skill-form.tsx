"use client";

import { useForm } from "react-hook-form";
import { useAdminSkills } from "../useAdminSkills";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { ProjectSelect } from "@/features/projects/components/project-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkillIconSelect } from "@/features/skills/components/skill-icon-select";

type SkillFormData = {
  name: string;
  slug: string;
  label: string;
  icon: string;
  category: string;
  level: number;
  order: number;
  experienceYears: number;
  experienceMonths: number;
  projectIds: string[];
};

interface SkillFormProps {
  skillId: string | null;
  onSuccess: () => void;
}

const CATEGORIES = [
  "Languages",
  "Frontend",
  "Backend",
  "Database & Data",
  "DevOps & Cloud",
  "FinTech / Blockchain",
  "Engineering",
];

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function SkillForm({ skillId, onSuccess }: SkillFormProps) {
  const { create, update, list: skillsList } = useAdminSkills();
  const skill = skillId
    ? skillsList.data?.data.find((s) => s.id === skillId)
    : null;

  const { register, handleSubmit, reset, setValue, watch } = useForm<SkillFormData>({
    defaultValues: {
      name: "",
      slug: "",
      label: "",
      icon: "",
      category: "Languages",
      level: 5,
      order: 0,
      experienceYears: 0,
      experienceMonths: 0,
      projectIds: [],
    },
  });

  useEffect(() => {
    if (skill) {
      setValue("name", skill.name);
      setValue("slug", skill.slug);
      setValue("label", skill.label || "");
      setValue("icon", skill.icon || "");
      setValue("category", skill.category || "Languages");
      setValue("level", skill.level || 5);
      setValue("order", skill.order || 0);
      setValue("experienceYears", skill.experienceYears || 0);
      setValue("experienceMonths", skill.experienceMonths || 0);
      setValue(
        "projectIds",
        skill.projects.map((p) => p.id)
      );
    } else {
      reset();
    }
  }, [skill, setValue, reset]);

  const onSubmit = (data: SkillFormData) => {
    const payload = {
      ...data,
      slug: data.slug.trim() || slugify(data.name),
    };
    if (skillId) {
      update.mutate(
        { id: skillId, ...payload },
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

  const selectedProjects = watch("projectIds") || [];


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name", { required: true })} placeholder="e.g. React" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="label">Display Label</Label>
          <Input id="label" {...register("label")} placeholder="e.g. React.js" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          {...register("slug")}
          placeholder="e.g. typescript (auto-generated from name)"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            onValueChange={(v) => setValue("category", v)} 
            value={watch("category")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <SkillIconSelect 
            value={watch("icon")} 
            onChange={(v: string) => setValue("icon", v)} 
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="level">Level (1-10)</Label>
          <Input 
            type="number" 
            id="level" 
            {...register("level", { valueAsNumber: true })} 
            min={1} 
            max={10} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">Display Order</Label>
          <Input 
            type="number" 
            id="order" 
            {...register("order", { valueAsNumber: true })} 
          />
        </div>
         <div className="space-y-2">
          <Label htmlFor="experienceYears">Years Exp.</Label>
          <Input 
            type="number" 
            id="experienceYears" 
            {...register("experienceYears", { valueAsNumber: true })} 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Associated Projects</Label>
        <ProjectSelect
          selectedProjectIds={selectedProjects}
          onChange={(ids: string[]) => setValue("projectIds", ids)}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={create.isPending || update.isPending}>
          {skillId ? "Update Skill" : "Create Skill"}
        </Button>
      </div>
    </form>
  );
}
