"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CoreImg } from "@/components/core/img";
import { ImagePickerDialog } from "@/features/admin/images/components/image-picker-dialog";
import { useAdminCategories } from "@/features/admin/categories/useAdminCategories";
import { useAdminExperiences } from "@/features/admin/experience/useAdminExperiences";
import { SkillSelect } from "@/features/skills/components/skill-select";
import type { Project } from "@/features/projects/types";
import { ImageIcon, X } from "lucide-react";
import {
  type ProjectMutationPayload,
  useAdminProjects,
} from "../useAdminProjects";

type ProjectFormData = {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  images: string[];
  url: string;
  repoUrl: string;
  startDate: string;
  endDate: string;
  tagNames: string;
  skillIds: string[];
  categoryId: string;
  experienceId: string;
  statusBadges: string;
  featuredRank: string;
  role: string;
  impact: string;
  caseStudyProblem: string;
  caseStudyRole: string;
  caseStudyFeatures: string;
  caseStudyChallenges: string;
  caseStudyResult: string;
};

type ProjectFormProps =
  | {
      mode: "create";
      onSuccess?: () => void;
      project?: never;
      projectId?: never;
    }
  | {
      mode: "edit";
      project: Project;
      projectId: string;
      onSuccess?: () => void;
    };

const emptyDefaults: ProjectFormData = {
  title: "",
  slug: "",
  description: "",
  coverImage: "",
  images: [],
  url: "",
  repoUrl: "",
  startDate: "",
  endDate: "",
  tagNames: "",
  skillIds: [],
  categoryId: "",
  experienceId: "none",
  statusBadges: "",
  featuredRank: "",
  role: "",
  impact: "",
  caseStudyProblem: "",
  caseStudyRole: "",
  caseStudyFeatures: "",
  caseStudyChallenges: "",
  caseStudyResult: "",
};

function fromCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function fromLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toDateInputValue(value: Project["startDate"]) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
}

function getProjectDefaults(project: Project): ProjectFormData {
  return {
    title: project.title,
    slug: project.slug,
    description: project.description || "",
    coverImage: project.coverImage || "",
    images: project.images || [],
    url: project.url || "",
    repoUrl: project.repoUrl || "",
    startDate: toDateInputValue(project.startDate),
    endDate: toDateInputValue(project.endDate),
    tagNames: project.tags.map((tag) => tag.name).join(", "),
    skillIds: project.skills.map((skill) => skill.id),
    categoryId: project.categoryId ?? project.category?.id ?? "",
    experienceId: project.experienceId ?? "none",
    statusBadges: project.statusBadges?.join(", ") ?? "",
    featuredRank:
      project.featuredRank == null ? "" : String(project.featuredRank),
    role: project.role ?? "",
    impact: project.impact ?? "",
    caseStudyProblem: project.caseStudy?.problem ?? "",
    caseStudyRole: project.caseStudy?.role ?? "",
    caseStudyFeatures: project.caseStudy?.features?.join("\n") ?? "",
    caseStudyChallenges: project.caseStudy?.challenges?.join("\n") ?? "",
    caseStudyResult: project.caseStudy?.result ?? "",
  };
}

function getCreateDefaults(categoryId: string): ProjectFormData {
  return {
    ...emptyDefaults,
    categoryId,
  };
}

export function ProjectForm(props: ProjectFormProps) {
  const router = useRouter();
  const { create, update } = useAdminProjects();
  const { list: categoriesList } = useAdminCategories("project");
  const { list: experiencesList } = useAdminExperiences();
  const firstCategoryId = categoriesList.data?.data[0]?.id ?? "";
  const categories = categoriesList.data?.data ?? [];
  const experiences = experiencesList.data?.data ?? [];
  const isEdit = props.mode === "edit";
  const onSuccess = props.onSuccess;
  const project = isEdit ? props.project : undefined;
  const projectId = isEdit ? props.projectId : undefined;

  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [galleryPickerOpen, setGalleryPickerOpen] = useState(false);

  const {
    control,
    formState: { isSubmitting },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    defaultValues: project
      ? getProjectDefaults(project)
      : getCreateDefaults(firstCategoryId),
  });

  const coverImage = watch("coverImage");
  const galleryImages = watch("images") ?? [];

  useEffect(() => {
    if (project) {
      reset(getProjectDefaults(project));
      return;
    }

    if (firstCategoryId && !getValues("categoryId")) {
      setValue("categoryId", firstCategoryId);
    }
  }, [firstCategoryId, getValues, project, reset, setValue]);

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
      return;
    }

    router.push("/admin/projects");
  };

  const onSubmit = (data: ProjectFormData) => {
    const payload: ProjectMutationPayload = {
      title: data.title,
      slug: data.slug,
      description: data.description || null,
      coverImage: data.coverImage || null,
      images: data.images,
      url: data.url || null,
      repoUrl: data.repoUrl || null,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      tagNames: fromCommaList(data.tagNames),
      skillIds: data.skillIds,
      categoryId: data.categoryId || null,
      experienceId: data.experienceId === "none" ? null : data.experienceId,
      statusBadges: fromCommaList(data.statusBadges),
      featuredRank:
        data.featuredRank === "" ? null : Number(data.featuredRank),
      role: data.role || null,
      impact: data.impact || null,
      caseStudy: {
        problem: data.caseStudyProblem || undefined,
        role: data.caseStudyRole || undefined,
        features: fromLines(data.caseStudyFeatures),
        challenges: fromLines(data.caseStudyChallenges),
        result: data.caseStudyResult || undefined,
      },
    };

    if (isEdit && projectId) {
      update.mutate(
        { id: projectId, ...payload },
        { onSuccess: handleSuccess },
      );
      return;
    }

    create.mutate(payload, { onSuccess: handleSuccess });
  };

  const isPending = create.isPending || update.isPending || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" {...register("title", { required: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" {...register("slug", { required: true })} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={3} {...register("description")} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="statusBadges">Status Badges</Label>
          <Input
            id="statusBadges"
            placeholder="Private Project, Paused, Case Study"
            {...register("statusBadges")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="featuredRank">Featured Rank</Label>
          <Input
            id="featuredRank"
            type="number"
            placeholder="1"
            {...register("featuredRank")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">My Role</Label>
        <Textarea id="role" rows={2} {...register("role")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="impact">Impact</Label>
        <Textarea id="impact" rows={2} {...register("impact")} />
      </div>

      <div className="space-y-2">
        <Label>Cover Image</Label>
        <div className="rounded-lg border p-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="h-32 w-full overflow-hidden rounded-md border bg-muted sm:w-48">
              {coverImage ? (
                <CoreImg src={coverImage} alt="Project cover preview" />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-8 w-8" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-3">
              <Input
                id="coverImage"
                placeholder="Select from media library or paste a URL"
                {...register("coverImage")}
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setImagePickerOpen(true)}
                >
                  Select image
                </Button>
                {coverImage ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setValue("coverImage", "")}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <ImagePickerDialog
          open={imagePickerOpen}
          value={coverImage}
          title="Select project cover"
          description="Choose a Serve image for this project's cover."
          onOpenChange={setImagePickerOpen}
          onSelect={(value) => {
            if (typeof value === "string") {
              setValue("coverImage", value, { shouldDirty: true });
            }
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Gallery Images</Label>
        <div className="rounded-lg border p-3">
          {galleryImages.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="group relative overflow-hidden rounded-md border bg-muted"
                >
                  <div className="aspect-video">
                    <CoreImg
                      src={image}
                      alt={`Project gallery image ${index + 1}`}
                    />
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute right-2 top-2 h-7 w-7 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100"
                    onClick={() =>
                      setValue(
                        "images",
                        galleryImages.filter(
                          (_, imageIndex) => imageIndex !== index,
                        ),
                        { shouldDirty: true },
                      )
                    }
                    aria-label={`Remove gallery image ${index + 1}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-28 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
              No gallery images selected.
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setGalleryPickerOpen(true)}
            >
              Select images
            </Button>
            {galleryImages.length > 0 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setValue("images", [], { shouldDirty: true })}
              >
                <X className="mr-2 h-4 w-4" />
                Clear all
              </Button>
            ) : null}
          </div>
        </div>
        <ImagePickerDialog
          open={galleryPickerOpen}
          mode="multiple"
          value={galleryImages}
          title="Select project gallery images"
          description="Choose one or more images for this project's detail gallery."
          onOpenChange={setGalleryPickerOpen}
          onSelect={(value) => {
            if (Array.isArray(value)) {
              setValue("images", value, { shouldDirty: true });
            }
          }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="url">Live URL</Label>
          <Input id="url" {...register("url")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="repoUrl">Repo URL</Label>
          <Input id="repoUrl" {...register("repoUrl")} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
        <Label>Category</Label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label>Experience (optional)</Label>
        <Controller
          name="experienceId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="No experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No experience</SelectItem>
                {experiences.map((experience) => (
                  <SelectItem key={experience.id} value={experience.id}>
                    {experience.company} — {experience.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
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
        <Controller
          name="skillIds"
          control={control}
          render={({ field }) => (
            <SkillSelect
              selectedSkillIds={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <div>
          <h3 className="text-sm font-medium">Case Study</h3>
          <p className="text-xs text-muted-foreground">
            Optional details shown in the public project modal.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="caseStudyProblem">Problem</Label>
          <Textarea
            id="caseStudyProblem"
            rows={3}
            {...register("caseStudyProblem")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="caseStudyRole">Case Study Role</Label>
          <Textarea
            id="caseStudyRole"
            rows={2}
            {...register("caseStudyRole")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="caseStudyFeatures">Features (one per line)</Label>
          <Textarea
            id="caseStudyFeatures"
            rows={4}
            className="font-mono text-sm"
            {...register("caseStudyFeatures")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="caseStudyChallenges">Challenges (one per line)</Label>
          <Textarea
            id="caseStudyChallenges"
            rows={4}
            className="font-mono text-sm"
            {...register("caseStudyChallenges")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="caseStudyResult">Result</Label>
          <Textarea
            id="caseStudyResult"
            rows={3}
            {...register("caseStudyResult")}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t pt-6 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/projects">Cancel</Link>
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
              ? "Update Project"
              : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
