import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await prisma.visitor.count();

    return Response.json(
      { count },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch {
    return Response.json(
      { count: null },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
