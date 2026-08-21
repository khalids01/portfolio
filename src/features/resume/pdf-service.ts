import { env } from "@/env";
import type { ResumeLayoutId } from "./layouts";

function configured() {
  return Boolean(env.PDF_SERVICE_URL && env.PDF_SERVICE_SECRET_KEY);
}

function endpoint(path: string) {
  return `${env.PDF_SERVICE_URL!.replace(/\/$/, "")}${path}`;
}

function headers() {
  return {
    Authorization: `Bearer ${env.PDF_SERVICE_SECRET_KEY!}`,
    "Content-Type": "application/json",
  };
}

export function isPdfServiceConfigured() {
  return configured();
}

export async function generateResumePdfFromService(input: {
  variant: string;
  layout: ResumeLayoutId;
  version: string;
}) {
  if (!configured()) throw new Error("PDF service is not configured");

  const response = await fetch(endpoint("/internal/resume/pdf"), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(45_000),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`PDF service failed (${response.status}): ${await response.text()}`);
  }

  if (!response.headers.get("content-type")?.includes("application/pdf")) {
    throw new Error("PDF service returned an unexpected response");
  }

  return {
    bytes: new Uint8Array(await response.arrayBuffer()),
    cache: response.headers.get("x-cache") ?? "UNKNOWN",
  };
}

export async function invalidateResumePdfServiceCache(variant?: string) {
  if (!configured()) return;

  try {
    const response = await fetch(endpoint("/internal/resume/cache/invalidate"), {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(variant ? { variant } : {}),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`PDF service cache invalidation failed (${response.status})`);
    }
  } catch (error) {
    // Cache keys include resume updatedAt, so a failed cleanup never serves stale content.
    console.error("PDF service cache invalidation request failed", error);
  }
}
