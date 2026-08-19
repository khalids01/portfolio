import type { SeedScript } from "../types";
import { EXPERIENCE_CATEGORY } from "../taxonomy";
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
      categorySlug: EXPERIENCE_CATEGORY.FULL_TIME.slug,
      description:
        "Building complex HealthTech and FinTech systems across enterprise laboratory workflows, real-time market infrastructure, automated trading, and financial-system R&D.",

      highlights: [
        "Owned approximately 85% of an enterprise Laboratory Information Management System over 2.5 years, building clinical and anatomical workflows, dynamic forms, reporting, role-based access, backend APIs, and database models.",

        "Built TypeScript-based crypto trading infrastructure integrating centralized exchanges and Solana liquidity venues, including Binance, KuCoin, Coinbase, dYdX, and Jupiter.",

        "Developed automated trading workflows with market monitoring, configurable opportunity detection, fee-aware profitability checks, trade lifecycle persistence, and Redis-backed asynchronous execution processing.",

        "Built real-time market-data and trading interfaces using WebSockets, Redis, React, Next.js, and charting infrastructure.",

        "Worked on algorithmic trading R&D covering market-data ingestion, arbitrage research, execution validation, simulation workflows, and risk-aware trading architecture.",

        "Contributed targeted frontend and API modernization to an OpenEMR-based healthcare platform while preserving workflows within a large legacy PHP and MySQL codebase.",

        "Built and maintained production infrastructure using AWS, Docker, Linux, CI/CD, Grafana, and cloud-hosted database services.",
      ],
    });
  },
};
