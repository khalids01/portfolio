"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ImageIcon, Plus, Pencil, Trash2, X } from "lucide-react";
import { useAdminCategories } from "@/features/admin/categories/useAdminCategories";
import type { Experience } from "@/features/experience/types";
import { useAdminExperiences } from "../useAdminExperiences";

type ExperienceFormState = {
  slug: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  coverImage: string;
  images: string[];
  categoryId: string;
  highlights: string;
};

const emptyForm: ExperienceFormState = {
  slug: "",
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  coverImage: "",
  images: [],
  categoryId: "none",
  highlights: "",
};

function toDateInput(value?: string | Date | null) {
  if (!value) return "";
  return new Date(value).toISOString().split("T")[0];
}

function toForm(experience: Experience): ExperienceFormState {
  return {
    slug: experience.slug,
    company: experience.company,
    role: experience.role,
    location: experience.location ?? "",
    startDate: toDateInput(experience.startDate),
    endDate: toDateInput(experience.endDate),
    current: experience.current,
    description: experience.description ?? "",
    coverImage: experience.coverImage ?? "",
    images: experience.images ?? [],
    categoryId: experience.categoryId ?? "none",
    highlights: experience.highlights.map((highlight) => highlight.text).join("\n"),
  };
}

function fromLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminExperienceList() {
  const { list, create, update, remove } = useAdminExperiences();
  const { list: categoriesList } = useAdminCategories("experience");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState<ExperienceFormState>(emptyForm);
  const [coverPickerOpen, setCoverPickerOpen] = useState(false);
  const [galleryPickerOpen, setGalleryPickerOpen] = useState(false);

  const categories = categoriesList.data?.data ?? [];
  const experiences = list.data?.data ?? [];
  const isPending = create.isPending || update.isPending;

  useEffect(() => {
    if (editing) setForm(toForm(editing));
    else setForm(emptyForm);
  }, [editing]);

  function setField<K extends keyof ExperienceFormState>(
    key: K,
    value: ExperienceFormState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit() {
    const payload = {
      slug: form.slug,
      company: form.company,
      role: form.role,
      location: form.location || null,
      startDate: form.startDate,
      endDate: form.current ? null : form.endDate || null,
      current: form.current,
      description: form.description || null,
      coverImage: form.coverImage || null,
      images: form.images,
      categoryId: form.categoryId === "none" ? null : form.categoryId,
      highlights: fromLines(form.highlights),
    };

    const options = {
      onSuccess: () => {
        setOpen(false);
        setEditing(null);
      },
    };

    if (editing) update.mutate({ id: editing.id, ...payload }, options);
    else create.mutate(payload, options);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground">
            Maintain homepage work history from the dashboard or code seeds.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      <div className="grid gap-4">
        {experiences.map((experience) => (
          <Card key={experience.id}>
            {experience.coverImage ? (
              <div className="aspect-video overflow-hidden rounded-t-xl border-b">
                <CoreImg src={experience.coverImage} alt={experience.company} />
              </div>
            ) : null}
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>{experience.role}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {experience.company}
                  {experience.category ? ` · ${experience.category.name}` : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setEditing(experience);
                    setOpen(true);
                  }}
                  aria-label={`Edit ${experience.company}`}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => remove.mutate(experience.id)}
                  aria-label={`Delete ${experience.company}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{experience.description}</p>
              <p className="font-mono text-xs">{experience.slug}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Experience" : "Add Experience"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={form.company} onChange={(e) => setField("company", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={form.role} onChange={(e) => setField("role", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setField("slug", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={form.location} onChange={(e) => setField("location", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setField("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={form.endDate}
                  disabled={form.current}
                  onChange={(e) => setField("endDate", e.target.value)}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={form.current}
                onCheckedChange={(checked) => setField("current", checked === true)}
              />
              Current position
            </label>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.categoryId}
                onValueChange={(value) => setField("categoryId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No category</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="rounded-lg border p-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="h-28 w-full overflow-hidden rounded-md border bg-muted sm:w-44">
                    {form.coverImage ? (
                      <CoreImg src={form.coverImage} alt="Experience cover preview" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-7 w-7" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <Input
                      value={form.coverImage}
                      placeholder="Select from media library or paste a URL"
                      onChange={(e) => setField("coverImage", e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCoverPickerOpen(true)}
                      >
                        Select image
                      </Button>
                      {form.coverImage ? (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setField("coverImage", "")}
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
                open={coverPickerOpen}
                value={form.coverImage}
                title="Select experience cover"
                description="Choose a Serve image for this work history item."
                onOpenChange={setCoverPickerOpen}
                onSelect={(value) => {
                  if (typeof value === "string") setField("coverImage", value);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Gallery Images</Label>
              <div className="rounded-lg border p-3">
                {form.images.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {form.images.map((image, index) => (
                      <div key={`${image}-${index}`} className="relative overflow-hidden rounded-md border bg-muted">
                        <div className="aspect-video">
                          <CoreImg src={image} alt={`Experience gallery image ${index + 1}`} />
                        </div>
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute right-2 top-2 h-7 w-7"
                          onClick={() =>
                            setField(
                              "images",
                              form.images.filter((_, imageIndex) => imageIndex !== index),
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
                  <div className="flex min-h-24 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
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
                  {form.images.length > 0 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setField("images", [])}
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
                value={form.images}
                title="Select experience gallery images"
                description="Choose one or more images for this work history item."
                onOpenChange={setGalleryPickerOpen}
                onSelect={(value) => {
                  if (Array.isArray(value)) setField("images", value);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Highlights (one per line)</Label>
              <Textarea
                rows={6}
                className="font-mono text-sm"
                value={form.highlights}
                onChange={(e) => setField("highlights", e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={submit} disabled={isPending}>
                {isPending ? "Saving..." : "Save Experience"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
