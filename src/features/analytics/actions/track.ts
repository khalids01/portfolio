"use server";

import { headers } from "next/headers";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function trackVisit(path: string) {
  const headersList = await headers();
  const c = await cookies();

  // Rate limiting with cookies (2 mins)
  const lastVisit = c.get("last_visit_time")?.value;
  if (lastVisit && Date.now() - parseInt(lastVisit) < 2 * 60 * 1000) {
    return;
  }

  // Update cookie
  c.set("last_visit_time", Date.now().toString(), {
    maxAge: 2 * 60, // 2 minutes
    httpOnly: true,
  });

  const ip =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";

  const city = headersList.get("x-vercel-ip-city") || "unknown";
  const country = headersList.get("x-vercel-ip-country") || "unknown";
  const region = headersList.get("x-vercel-ip-country-region") || "unknown";
  const timezone = headersList.get("x-vercel-ip-timezone") || "unknown";

  const osHeader = headersList.get("sec-ch-ua-platform");
  const os = osHeader ? osHeader.replace(/"/g, "") : "unknown";

  const browserHeader = headersList.get("sec-ch-ua");
  let browser = "unknown";
  if (browserHeader) {
    const match = browserHeader.match(/"([^"]+)".*?v="([^"]+)"/);
    if (match) browser = `${match[1]} ${match[2]}`;
  } else {
    if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Edge";
  }

  const device =
    headersList.get("sec-ch-ua-mobile") === "?1" ? "Mobile" : "Desktop";

  // DB rate limit fallback just in case cookies are blocked
  const recentVisit = await prisma.visitor.findFirst({
    where: {
      ip,
      path,
      createdAt: {
        gte: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes
      },
    },
  });

  if (!recentVisit) {
    await prisma.visitor.create({
      data: {
        ip,
        userAgent,
        path,
        city,
        country,
        region,
        timezone,
        os,
        browser,
        device,
      },
    });
  }
}
