import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

// GET: list feature flags (for now, only disableSignUp is used)
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    const rows = await prisma.featureFlag.findMany();
    // Ensure disableSignUp is always present with a default false, even if not stored yet
    const map = new Map(rows.map((r) => [r.key, r.value]));
    if (!map.has("disableSignUp")) {
      map.set("disableSignUp", false);
    }
    const data = Array.from(map.entries()).map(([key, value]) => ({ key, value }));
    return NextResponse.json({ data });
  } catch (e) {
    console.error("/api/admin/features GET error", e);
    return NextResponse.json({ error: "Failed to fetch feature flags" }, { status: 500 });
  }
}

// PATCH: update a feature flag { key: string, value: boolean }
export async function PATCH(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    const body = await req.json();
    const { key, value } = body as { key?: string; value?: boolean };
    if (!key || typeof value !== "boolean") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const updated = await prisma.featureFlag.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return NextResponse.json({ data: { key: updated.key, value: updated.value } });
  } catch (e) {
    console.error("/api/admin/features PATCH error", e);
    return NextResponse.json({ error: "Failed to update feature flag" }, { status: 500 });
  }
}
