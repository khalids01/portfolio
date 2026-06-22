import { env } from "@/env";

export type ServeVariant = {
  id?: string;
  label?: string;
  filename?: string;
  url?: string;
  publicUrl?: string;
};

export type ServeImage = {
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
  variants: ServeVariant[];
  tags: string[];
  linkedApplications: Array<{ id: string; name: string; slug?: string }>;
  createdAt: string;
  updatedAt: string;
};

export type ServeImagesPagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type ServeImageList = {
  images: ServeImage[];
  pagination: ServeImagesPagination;
};

export type RawServeImage = {
  id?: string;
  filename?: string;
  originalName?: string;
  contentType?: string;
  sizeBytes?: number;
  width?: number | null;
  height?: number | null;
  hash?: string | null;
  url?: string;
  variants?: ServeVariant[];
  tags?: string[];
  linkedApplications?: Array<{ id: string; name: string; slug?: string }>;
  createdAt?: string;
  updatedAt?: string;
};

export class ServeConfigError extends Error {
  constructor(message = "Serve file storage is not configured") {
    super(message);
    this.name = "ServeConfigError";
  }
}

function stripTrailingSlashes(value: string) {
  return value.replace(/\/+$/, "");
}

function stripTrailingApi(value: string) {
  return value.replace(/\/api\/?$/, "");
}

export function normalizeServeApiUrl(value: string) {
  const clean = stripTrailingSlashes(value.trim());
  return clean.endsWith("/api") ? clean : `${clean}/api`;
}

export function normalizeServePublicUrl(value: string) {
  return stripTrailingApi(stripTrailingSlashes(value.trim()));
}

export function getServeConfig() {
  const apiUrl = env.FILE_SERVER_URL;
  const publicUrl = env.FILE_SERVER_PUBLIC_URL ?? env.FILE_SERVER_URL;
  const apiKey = env.FILE_SERVER_API_KEY;

  if (!apiUrl || !publicUrl || !apiKey) {
    throw new ServeConfigError();
  }

  return {
    apiUrl: normalizeServeApiUrl(apiUrl),
    publicUrl: normalizeServePublicUrl(publicUrl),
    apiKey,
  };
}

export function buildServePublicUrl(pathOrUrl?: string | null) {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  const { publicUrl } = getServeConfig();
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${publicUrl}${path}`;
}

function pickVariant(image: RawServeImage, label: string) {
  return image.variants?.find((variant) => variant.label === label);
}

export function normalizeServeImage(raw: RawServeImage): ServeImage {
  const publicUrl = buildServePublicUrl(raw.url);
  const variants = (raw.variants ?? []).map((variant) => ({
    ...variant,
    publicUrl: buildServePublicUrl(variant.url),
  }));
  const webp = pickVariant(raw, "webp");
  const placeholder = pickVariant(raw, "placeholder");

  return {
    id: raw.id ?? "",
    filename: raw.filename ?? "",
    originalName: raw.originalName ?? raw.filename ?? "Untitled image",
    contentType: raw.contentType ?? "application/octet-stream",
    sizeBytes: raw.sizeBytes ?? 0,
    width: raw.width ?? null,
    height: raw.height ?? null,
    hash: raw.hash ?? null,
    publicUrl,
    previewUrl: buildServePublicUrl(webp?.url) || publicUrl,
    placeholderUrl: buildServePublicUrl(placeholder?.url) || null,
    variants,
    tags: raw.tags ?? [],
    linkedApplications: raw.linkedApplications ?? [],
    createdAt: raw.createdAt ?? "",
    updatedAt: raw.updatedAt ?? "",
  };
}

export function normalizeServeImagePayload(raw: unknown): ServeImage {
  return normalizeServeImage(raw as RawServeImage);
}

export function normalizeServeImagesResponse(body: unknown): ServeImageList {
  const data = body as {
    images?: RawServeImage[];
    pagination?: Partial<ServeImagesPagination>;
  };

  return {
    images: (data.images ?? []).map(normalizeServeImage),
    pagination: {
      page: data.pagination?.page ?? 1,
      limit: data.pagination?.limit ?? 20,
      total: data.pagination?.total ?? 0,
      pages: data.pagination?.pages ?? 1,
      hasNext: data.pagination?.hasNext ?? false,
      hasPrev: data.pagination?.hasPrev ?? false,
    },
  };
}

export async function readUpstreamJson(response: Response) {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { error: text };
  }
}

export function serveAuthHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    "x-api-key": apiKey,
  };
}
