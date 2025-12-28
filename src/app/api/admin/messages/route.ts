import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

// GET: list all contact messages
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: messages });
  } catch (e) {
    console.error("/api/admin/messages GET error", e);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// PATCH: update a message (e.g. mark as read)
export async function PATCH(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    const body = await req.json();
    const { id, read } = body as { id: string; read: boolean };

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { read },
    });
    return NextResponse.json({ data: updated });
  } catch (e) {
    console.error("/api/admin/messages PATCH error", e);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

// DELETE: delete a message
export async function DELETE(req: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) return NextResponse.json({ error: guard.message }, { status: guard.status });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("/api/admin/messages DELETE error", e);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
