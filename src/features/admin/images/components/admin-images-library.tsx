"use client";

import { useMemo, useState } from "react";
import {
  Copy,
  ExternalLink,
  Grid2X2,
  ImageIcon,
  List,
  RefreshCw,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CoreImg } from "@/components/core/img";
import { cn } from "@/lib/utils";
import { useAdminImages } from "../useAdminImages";
import type { AdminImage, AdminImagesParams } from "../types";
import { UploadImagesDialog } from "./upload-images-dialog";

type ViewMode = "grid" | "list";

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
  { value: "sizeBytes:desc", label: "Largest" },
  { value: "sizeBytes:asc", label: "Smallest" },
] as const;

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function imageDimensions(image: AdminImage) {
  if (!image.width || !image.height) return "Unknown";
  return `${image.width} x ${image.height}`;
}

function imageDate(value: string) {
  if (!value) return "Unknown";
  return format(new Date(value), "MMM d, yyyy");
}

function splitSort(value: string) {
  const [sortBy, sortOrder] = value.split(":") as [
    AdminImagesParams["sortBy"],
    AdminImagesParams["sortOrder"],
  ];
  return { sortBy, sortOrder };
}

function ImageActions({
  image,
  onPreview,
  onDelete,
}: {
  image: AdminImage;
  onPreview: (image: AdminImage) => void;
  onDelete: (image: AdminImage) => void;
}) {
  const copyUrl = async () => {
    await navigator.clipboard.writeText(image.publicUrl);
    toast.success("Public URL copied");
  };

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" onClick={() => onPreview(image)}>
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={copyUrl}>
        <Copy className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href={image.publicUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive hover:text-destructive"
        onClick={() => onDelete(image)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

function ImageMetadataDialog({
  image,
  onOpenChange,
}: {
  image: AdminImage | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={Boolean(image)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{image?.originalName ?? "Image"}</DialogTitle>
        </DialogHeader>
        {image ? (
          <div className="grid gap-4 md:grid-cols-[240px_1fr]">
            <div className="aspect-square overflow-hidden rounded-md border">
              <CoreImg
                src={image.previewUrl}
                placeholderSrc={image.placeholderUrl}
                alt={image.originalName}
              />
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-muted-foreground">Public URL</div>
                <div className="break-all font-mono text-xs">{image.publicUrl}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-muted-foreground">Type</div>
                  <div>{image.contentType}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Size</div>
                  <div>{formatBytes(image.sizeBytes)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Dimensions</div>
                  <div>{imageDimensions(image)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Created</div>
                  <div>{imageDate(image.createdAt)}</div>
                </div>
              </div>
              {image.tags.length ? (
                <div className="flex flex-wrap gap-1">
                  {image.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export function AdminImagesLibrary() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [contentType, setContentType] = useState("all");
  const [sort, setSort] = useState("createdAt:desc");
  const [view, setView] = useState<ViewMode>("grid");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<AdminImage | null>(null);
  const [deleteImage, setDeleteImage] = useState<AdminImage | null>(null);
  const { sortBy, sortOrder } = splitSort(sort);

  const params = useMemo(
    () => ({
      page,
      limit: 20,
      search,
      contentType,
      sortBy,
      sortOrder,
    }),
    [contentType, page, search, sortBy, sortOrder],
  );

  const { list, remove } = useAdminImages(params);
  const images = list.data?.data.images ?? [];
  const pagination = list.data?.data.pagination;

  const resetPage = (setter: (value: string) => void, value: string) => {
    setter(value);
    setPage(1);
  };

  const confirmDelete = () => {
    if (!deleteImage) return;
    remove.mutate(deleteImage.id, {
      onSuccess: () => setDeleteImage(null),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => resetPage(setSearch, event.target.value)}
              placeholder="Search images"
              className="pl-9"
            />
          </div>
          <Select
            value={contentType}
            onValueChange={(value) => resetPage(setContentType, value)}
          >
            <SelectTrigger className="w-full sm:w-40">
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
          <Select value={sort} onValueChange={(value) => resetPage(setSort, value)}>
            <SelectTrigger className="w-full sm:w-40">
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
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => list.refetch()}
            disabled={list.isFetching}
          >
            <RefreshCw
              className={cn("h-4 w-4", list.isFetching && "animate-spin")}
            />
          </Button>
          <div className="flex rounded-md border p-1">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setView("grid")}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => setUploadOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
        </div>
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
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-video">
                <CoreImg
                  src={image.previewUrl}
                  placeholderSrc={image.placeholderUrl}
                  alt={image.originalName}
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="truncate text-sm">
                  {image.originalName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4 pt-0 text-xs text-muted-foreground">
                <div className="flex justify-between gap-2">
                  <span>{imageDimensions(image)}</span>
                  <span>{formatBytes(image.sizeBytes)}</span>
                </div>
                <div className="truncate">{image.contentType}</div>
                {image.tags.length ? (
                  <div className="flex flex-wrap gap-1">
                    {image.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </CardContent>
              <CardFooter className="justify-between p-2">
                <span className="px-2 text-xs text-muted-foreground">
                  {imageDate(image.createdAt)}
                </span>
                <ImageActions
                  image={image}
                  onPreview={setPreviewImage}
                  onDelete={setDeleteImage}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <div className="flex min-w-64 items-center gap-3">
                      <div className="h-12 w-16 overflow-hidden rounded border">
                        <CoreImg
                          src={image.previewUrl}
                          placeholderSrc={image.placeholderUrl}
                          alt={image.originalName}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium">
                          {image.originalName}
                        </div>
                        {image.tags.length ? (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {image.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-[10px]">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{image.contentType}</TableCell>
                  <TableCell>{imageDimensions(image)}</TableCell>
                  <TableCell>{formatBytes(image.sizeBytes)}</TableCell>
                  <TableCell>{imageDate(image.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <ImageActions
                        image={image}
                        onPreview={setPreviewImage}
                        onDelete={setDeleteImage}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {pagination ? (
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.pages} - {pagination.total} images
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={!pagination.hasPrev}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={!pagination.hasNext}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}

      <UploadImagesDialog open={uploadOpen} onOpenChange={setUploadOpen} />
      <ImageMetadataDialog
        image={previewImage}
        onOpenChange={(open) => !open && setPreviewImage(null)}
      />
      <AlertDialog
        open={Boolean(deleteImage)}
        onOpenChange={(open) => !open && setDeleteImage(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete image?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the image from Serve. Existing project URLs may stop
              loading if they point to this file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {remove.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
