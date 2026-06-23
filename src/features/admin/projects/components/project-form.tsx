"use client";

import { useForm, Controller } from "react-hook-form";
import { useAdminProjects } from "../useAdminProjects";
import { useAdminCategories } from "@/features/admin/categories/useAdminCategories";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { SkillSelect } from "@/features/skills/components/skill-select";
import { ImagePickerDialog } from "@/features/admin/images/components/image-picker-dialog";
import { CoreImg } from "@/components/core/img";
import { ImageIcon, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
};

interface ProjectFormProps {
  projectId: string | null;
  onSuccess: () => void;
}

export function ProjectForm({ projectId, onSuccess }: ProjectFormProps) {
  const { create, update, list: projectsList } = useAdminProjects();
  const { list: categoriesList } = useAdminCategories("project");

  const project = projectId
    ? projectsList.data?.data.find((p) => p.id === projectId)
    : null;

  const firstCategoryId = categoriesList.data?.data[0]?.id ?? "";

  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [galleryPickerOpen, setGalleryPickerOpen] = useState(false);

  const { register, handleSubmit, reset, control, watch, setValue, formState: { isSubmitting } } =
    useForm<ProjectFormData>({ defaultValues: emptyDefaults });

  const coverImage = watch("coverImage");
  const galleryImages = watch("images") ?? [];

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        slug: project.slug,
        description: project.description || "",
        coverImage: project.coverImage || "",
        images: project.images || [],
        url: project.url || "",
        repoUrl: project.repoUrl || "",
        startDate: project.startDate
          ? new Date(project.startDate).toISOString().split("T")[0]
          : "",
        endDate: project.endDate
          ? new Date(project.endDate).toISOString().split("T")[0]
          : "",
        tagNames: project.tags.map((t) => t.name).join(", "),
        skillIds: project.skills.map((s) => s.id),
        categoryId: project.categoryId ?? project.category?.id ?? "",
      });
    } else {
      reset({
        ...emptyDefaults,
        categoryId: firstCategoryId,
      });
    }
  }, [project, projectId, reset, firstCategoryId]);

  const categories = categoriesList.data?.data ?? [];

  const onSubmit = (data: ProjectFormData) => {
    const tagNames = data.tagNames
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: data.title,
      slug: data.slug,
      description: data.description || null,
      coverImage: data.coverImage || null,
      images: data.images,
      url: data.url || null,
      repoUrl: data.repoUrl || null,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      tagNames,
      skillIds: data.skillIds,
      categoryId: data.categoryId || null,
    };

    if (projectId) {
      update.mutate({ id: projectId, ...payload }, { onSuccess });
    } else {
      create.mutate(payload, { onSuccess });
    }
  };

  const isPending = create.isPending || update.isPending || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
                    <CoreImg src={image} alt={`Project gallery image ${index + 1}`} />
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute right-2 top-2 h-7 w-7 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100"
                    onClick={() =>
                      setValue(
                        "images",
                        galleryImages.filter((_, imageIndex) => imageIndex !== index),
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
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
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

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? projectId
              ? "Updating..."
              : "Creating..."
            : projectId
              ? "Update Project"
              : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
