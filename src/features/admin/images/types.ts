export type AdminImage = {
  id: string;
  filename: string;
  originalName: string;
  contentType: string;
  sizeBytes: number;
  width: number | null;
  height: number | null;
  hash: string | null;
  publicUrl: string;
  previewUrl: string;
  placeholderUrl: string | null;
  variants: Array<{
    id?: string;
    label?: string;
    filename?: string;
    url?: string;
    publicUrl?: string;
  }>;
  tags: string[];
  linkedApplications: Array<{ id: string; name: string; slug?: string }>;
  createdAt: string;
  updatedAt: string;
};

export type AdminImagesPagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type AdminImagesParams = {
  page?: number;
  limit?: number;
  search?: string;
  contentType?: string;
  sortBy?: "createdAt" | "originalName" | "sizeBytes";
  sortOrder?: "asc" | "desc";
};

export type AdminImagesResponse = {
  images: AdminImage[];
  pagination: AdminImagesPagination;
};

export type UploadImagesResult = {
  image: AdminImage | null;
  images: AdminImage[];
  errors: unknown[];
};
