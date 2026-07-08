import type { SeedScript } from "../types";
import { upsertExperience } from "../utils";

export const interspeedExperienceSeed: SeedScript = {
  id: "experience/interspeed",
  label: "Experience: Interspeed",
  group: "experience",
  order: 30,
  dependsOn: ["profile/default", "categories/experience"],
  async run({ prisma }) {
    await upsertExperience(prisma, {
      slug: "interspeed-full-stack-typescript-developer",
      company: "Interspeed",
      role: "Full-Stack TypeScript Developer",
      location: "Remote",
      startDate: "2023-01-01",
      endDate: null,
      current: true,
      categorySlug: "full-time",
      description:
        "Contributing to OrangeSphere (21s2mars), a production-grade crypto arbitrage and analytics platform, and Sofilite, a Laboratory Information Management System (LIMS) and EMR platform.",
      highlights: [
        "Engineered a TypeScript-first trading engine using Bun and Elysia.js, processing live market data from Binance, KuCoin, Coinbase, and Solana DEXs (Jupiter / Anchor).",
        "Built an automated cross-exchange arbitrage engine using Redis pub/sub and WebSocket streams, scanning live order books for micro-arbitrage opportunities.",
        "Implemented execution logic accounting for fees, slippage, and latency, enabling autonomous small-volume trades under strict thresholds.",
        "Integrated Grafana dashboards powered by AWS Athena for real-time monitoring and historical analytics.",
        "Developed Sofilite LIMS with a multi-role architecture and dynamic form generation using Next.js, Fastify, and MariaDB.",
        "Contributed to modernizing a large legacy EMR codebase (OpenEMR fork), improving clinician and patient workflows.",
      ],
    });
  },
};
