import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import {
  getServeConfig,
  normalizeServeImagesResponse,
  readUpstreamJson,
  serveAuthHeaders,
  ServeConfigError,
} from "@/lib/serve/images";

export async function GET(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );
  }

  try {
    const { apiUrl, apiKey } = getServeConfig();
    const sourceUrl = new URL(req.url);
    const upstreamUrl = new URL(`${apiUrl}/images`);

    for (const key of [
      "page",
      "limit",
      "search",
      "contentType",
      "sortBy",
      "sortOrder",
    ]) {
      const value = sourceUrl.searchParams.get(key);
      if (value) upstreamUrl.searchParams.set(key, value);
    }

    const response = await fetch(upstreamUrl, {
      headers: serveAuthHeaders(apiKey),
      cache: "no-store",
    });
    const body = await readUpstreamJson(response);

    if (!response.ok) {
      return NextResponse.json(
        { error: (body as { error?: string }).error ?? "Failed to fetch images" },
        { status: response.status },
      );
    }

    return NextResponse.json({ data: normalizeServeImagesResponse(body) });
  } catch (error) {
    if (error instanceof ServeConfigError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("/api/admin/images GET error", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 },
    );
  }
}
