"use client";

import { ChangeEvent, DragEvent, useMemo, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAdminImages } from "../useAdminImages";
import type { AdminImage } from "../types";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type UploadImagesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploaded?: (images: AdminImage[]) => void;
};

function parseTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function UploadImagesDialog({
  open,
  onOpenChange,
  onUploaded,
}: UploadImagesDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const { upload } = useAdminImages();

  const totalSize = useMemo(
    () => files.reduce((sum, file) => sum + file.size, 0),
    [files],
  );

  const addFiles = (incoming: FileList | File[]) => {
    const accepted: File[] = [];
    const skipped: string[] = [];

    Array.from(incoming).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        skipped.push(`${file.name}: only image files are supported`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        skipped.push(`${file.name}: file is larger than 50 MB`);
        return;
      }

      accepted.push(file);
    });

    setFiles((current) => [...current, ...accepted]);
    setErrors(skipped);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) addFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  };

  const reset = () => {
    setFiles([]);
    setTags("");
    setErrors([]);
  };

  const handleUpload = () => {
    upload.mutate(
      { files, tags: parseTags(tags) },
      {
        onSuccess: (result) => {
          const uploaded = result.images.length
            ? result.images
            : result.image
              ? [result.image]
              : [];
          onUploaded?.(uploaded);
          reset();
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen);
        if (!nextOpen) reset();
      }}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload images</DialogTitle>
          <DialogDescription>
            Add project screenshots, covers, and other portfolio media.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={cn(
              "flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition-colors",
              dragging ? "border-primary bg-primary/5" : "border-border",
            )}
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
            <div className="text-sm font-medium">Drop images here</div>
            <div className="text-xs text-muted-foreground">
              or click to choose files
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {files.length ? (
            <div className="space-y-2">
              <div className="text-sm font-medium">
                {files.length} file{files.length === 1 ? "" : "s"} selected
                <span className="ml-2 text-xs text-muted-foreground">
                  {(totalSize / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
              <div className="max-h-36 space-y-1 overflow-y-auto rounded-md border p-2">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <span className="truncate">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                      onClick={() =>
                        setFiles((current) =>
                          current.filter((_, fileIndex) => fileIndex !== index),
                        )
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {errors.length ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {errors.map((error) => (
                <div key={error}>{error}</div>
              ))}
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="image-tags">Tags</Label>
            <Input
              id="image-tags"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="project, cover, portfolio"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!files.length || upload.isPending}
              onClick={handleUpload}
            >
              {upload.isPending ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
