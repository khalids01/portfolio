"use client";

import { useMemo, useState } from "react";
import { Check, RefreshCw, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CoreImg } from "@/components/core/img";
import { cn } from "@/lib/utils";
import { useAdminImages } from "../useAdminImages";
import type { AdminImage, AdminImagesParams } from "../types";
import { UploadImagesDialog } from "./upload-images-dialog";

type ImagePickerDialogProps = {
  open: boolean;
  mode?: "single" | "multiple";
  value?: string | string[] | null;
  title?: string;
  description?: string;
  onOpenChange: (open: boolean) => void;
  onSelect: (value: string | string[]) => void;
};

const contentTypes = [
  { value: "all", label: "All types" },
  { value: "image/jpeg", label: "JPEG" },
  { value: "image/png", label: "PNG" },
  { value: "image/webp", label: "WebP" },
  { value: "image/svg+xml", label: "SVG" },
] as const;

const sortOptions = [
  { value: "createdAt:desc", label: "Newest" },
  { value: "createdAt:asc", label: "Oldest" },
  { value: "originalName:asc", label: "Name A-Z" },
  { value: "originalName:desc", label: "Name Z-A" },
] as const;

function splitSort(value: string) {
  const [sortBy, sortOrder] = value.split(":") as [
    AdminImagesParams["sortBy"],
    AdminImagesParams["sortOrder"],
  ];
  return { sortBy, sortOrder };
}

export function ImagePickerDialog({
  open,
  mode = "single",
  value,
  title = "Select image",
  description = "Choose an existing Serve image or upload a new one.",
  onOpenChange,
  onSelect,
}: ImagePickerDialogProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [contentType, setContentType] = useState("all");
  const [sort, setSort] = useState("createdAt:desc");
  const [uploadOpen, setUploadOpen] = useState(false);
  const initialSelected = useMemo(
    () => new Set(Array.isArray(value) ? value : value ? [value] : []),
    [value],
  );
  const [draftSelection, setDraftSelection] = useState<Set<string>>(initialSelected);
  const { sortBy, sortOrder } = splitSort(sort);

  const params = useMemo(
    () => ({
      page,
      limit: 12,
      search,
      contentType,
      sortBy,
      sortOrder,
    }),
    [contentType, page, search, sortBy, sortOrder],
  );
  const { list } = useAdminImages(params);
  const images = list.data?.data.images ?? [];
  const pagination = list.data?.data.pagination;

  const setFilter = (setter: (value: string) => void, nextValue: string) => {
    setter(nextValue);
    setPage(1);
  };

  const toggleImage = (image: AdminImage) => {
    if (mode === "single") {
      onSelect(image.publicUrl);
      onOpenChange(false);
      return;
    }

    setDraftSelection((current) => {
      const next = new Set(current);
      if (next.has(image.publicUrl)) {
        next.delete(image.publicUrl);
      } else {
        next.add(image.publicUrl);
      }
      return next;
    });
  };

  const confirmMultiple = () => {
    onSelect(Array.from(draftSelection));
    onOpenChange(false);
  };

  const handleUploaded = (uploaded: AdminImage[]) => {
    if (mode === "single" && uploaded[0]) {
      onSelect(uploaded[0].publicUrl);
      onOpenChange(false);
      return;
    }

    setDraftSelection((current) => {
      const next = new Set(current);
      uploaded.forEach((image) => next.add(image.publicUrl));
      return next;
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          onOpenChange(nextOpen);
          if (nextOpen) setDraftSelection(initialSelected);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setFilter(setSearch, event.target.value)}
                  placeholder="Search images"
                  className="pl-9"
                />
              </div>
              <Select
                value={contentType}
                onValueChange={(nextValue) => setFilter(setContentType, nextValue)}
              >
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sort} onValueChange={(nextValue) => setFilter(setSort, nextValue)}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => list.refetch()}
                disabled={list.isFetching}
              >
                <RefreshCw
                  className={cn("h-4 w-4", list.isFetching && "animate-spin")}
                />
              </Button>
              <Button type="button" onClick={() => setUploadOpen(true)}>
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Button>
            </div>

            {list.isLoading ? (
              <div className="rounded-lg border py-12 text-center text-muted-foreground">
                Loading images...
              </div>
            ) : list.isError ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 py-12 text-center text-destructive">
                Failed to load images.
              </div>
            ) : images.length === 0 ? (
              <div className="rounded-lg border py-12 text-center text-muted-foreground">
                No images found.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {images.map((image) => {
                  const selected = draftSelection.has(image.publicUrl);
                  return (
                    <button
                      type="button"
                      key={image.id}
                      className={cn(
                        "group overflow-hidden rounded-lg border bg-card text-left transition-colors",
                        selected && "border-primary ring-2 ring-primary/30",
                      )}
                      onClick={() => toggleImage(image)}
                    >
                      <div className="relative aspect-video">
                        <CoreImg
                          src={image.previewUrl}
                          placeholderSrc={image.placeholderUrl}
                          alt={image.originalName}
                        />
                        {selected ? (
                          <div className="absolute right-2 top-2 rounded-full bg-primary p-1 text-primary-foreground">
                            <Check className="h-4 w-4" />
                          </div>
                        ) : null}
                      </div>
                      <div className="space-y-1 p-3">
                        <div className="truncate text-sm font-medium">
                          {image.originalName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {image.width && image.height
                            ? `${image.width} x ${image.height}`
                            : image.contentType}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {pagination ? (
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.pages}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={!pagination.hasPrev}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={!pagination.hasNext}
                    onClick={() => setPage((current) => current + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : null}

            {mode === "multiple" ? (
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={confirmMultiple}>
                  Select {draftSelection.size} image
                  {draftSelection.size === 1 ? "" : "s"}
                </Button>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <UploadImagesDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUploaded={handleUploaded}
      />
    </>
  );
}
