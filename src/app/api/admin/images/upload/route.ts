import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import {
  getServeConfig,
  normalizeServeImagePayload,
  readUpstreamJson,
  serveAuthHeaders,
  ServeConfigError,
} from "@/lib/serve/images";

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.message },
      { status: guard.status },
    );
  }

  try {
    const { apiUrl, apiKey } = getServeConfig();
    const incoming = await req.formData();
    const upstream = new FormData();

    for (const [key, value] of incoming.entries()) {
      upstream.append(key, value);
    }

    const response = await fetch(`${apiUrl}/upload`, {
      method: "POST",
      headers: serveAuthHeaders(apiKey),
      body: upstream,
    });
    const body = await readUpstreamJson(response);

    if (!response.ok) {
      return NextResponse.json(
        { error: (body as { error?: string }).error ?? "Upload failed" },
        { status: response.status },
      );
    }

    const result = body as {
      image?: unknown;
      images?: unknown[];
      errors?: unknown[];
    };

    return NextResponse.json({
      data: {
        image: result.image ? normalizeServeImagePayload(result.image) : null,
        images: (result.images ?? []).map((image) =>
          normalizeServeImagePayload(image),
        ),
        errors: result.errors ?? [],
      },
    });
  } catch (error) {
    if (error instanceof ServeConfigError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("/api/admin/images/upload POST error", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
