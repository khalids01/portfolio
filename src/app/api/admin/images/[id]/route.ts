import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import {
  getServeConfig,
  normalizeServeImagePayload,
  readUpstreamJson,
  serveAuthHeaders,
  ServeConfigError,
} from "@/lib/serve/images";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, context: RouteContext) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );
  }

  try {
    const { id } = await context.params;
    const { apiUrl, apiKey } = getServeConfig();
    const response = await fetch(`${apiUrl}/images/${encodeURIComponent(id)}`, {
      headers: serveAuthHeaders(apiKey),
      cache: "no-store",
    });
    const body = await readUpstreamJson(response);

    if (!response.ok) {
      return NextResponse.json(
        { error: (body as { error?: string }).error ?? "Failed to fetch image" },
        { status: response.status },
      );
    }

    const raw = (body as { image?: unknown }).image ?? body;
    return NextResponse.json({ data: normalizeServeImagePayload(raw) });
  } catch (error) {
    if (error instanceof ServeConfigError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("/api/admin/images/[id] GET error", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );
  }

  try {
    const { id } = await context.params;
    const { apiUrl, apiKey } = getServeConfig();
    const response = await fetch(`${apiUrl}/images/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: serveAuthHeaders(apiKey),
    });
    const body = await readUpstreamJson(response);

    if (!response.ok) {
      return NextResponse.json(
        { error: (body as { error?: string }).error ?? "Failed to delete image" },
        { status: response.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ServeConfigError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("/api/admin/images/[id] DELETE error", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 },
    );
  }
}
