import type { SeedScript } from "../types";
import { upsertProject } from "../utils";

export const algorithmicCryptoProjectSeed: SeedScript = {
  id: "projects/algorithmic-crypto",
  label: "Project: Algorithmic Crypto Trading Platform",
  group: "projects",
  order: 41,
  dependsOn: ["profile/default", "categories/project"],
  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "Algorithmic Crypto Trading Platform",
      slug: "crypto-trading-platform",
      description:
        "Non-custodial algorithmic trading and market intelligence platform supporting automated and manual swaps across centralized and decentralized exchanges.",
      categorySlug: "fintech-blockchain",
      statusBadges: ["R&D Platform", "Market Intelligence"],
      featuredRank: 2,
      role:
        "Built core real-time market ingestion, arbitrage scanning, and execution logic.",
      impact:
        "Explored practical cross-exchange arbitrage workflows, latency constraints, and trading automation architecture.",
      tags: ["TypeScript", "Bun", "Fastify", "PostgreSQL", "Redis", "Web3", "DEX"],
      caseStudy: {
        problem:
          "Crypto prices move across centralized and decentralized venues, creating short-lived opportunities that require fast ingestion and decision logic.",
        role:
          "Designed and implemented the TypeScript trading engine, exchange integrations, and real-time event flow.",
        features: [
          "Live order book ingestion",
          "Redis pub/sub data flow",
          "Cross-exchange arbitrage detection",
          "Manual and automated swap support",
          "Fee, slippage, and latency-aware execution checks",
        ],
        challenges: [
          "Keeping real-time streams reliable across multiple exchanges.",
          "Filtering theoretical opportunities into realistic, executable signals.",
        ],
        result:
          "R&D platform validating market intelligence and automated trading architecture.",
      },
    });
  },
};
