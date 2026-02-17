"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function trackVisit(path: string) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";

  // Check if IP visited recently (within 5 min)
  const recentVisit = await prisma.visitor.findFirst({
    where: {
      ip,
      path,
      createdAt: {
        gte: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes
      },
    },
  });

  if (!recentVisit) {
    await prisma.visitor.create({
      data: {
        ip,
        userAgent,
        path,
      },
    });
  }
}
