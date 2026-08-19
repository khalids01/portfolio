import type { SeedScript } from "../types";
import { PROJECT_CATEGORY, SKILL } from "../taxonomy";
import { upsertProject } from "../utils";

export const multiExchangeTradingProjectSeed: SeedScript = {
  id: "projects/multi-exchange-trading",
  label: "Project: Multi-Exchange Solana Trading Platform",
  group: "projects",
  order: 42,
  dependsOn: ["profile/default", "categories/project"],

  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "Multi-Exchange Solana Trading Platform",
      slug: "multi-exchange-solana-trading",

      description:
        "Automated crypto trading platform for monitoring and executing Solana trading workflows across centralized and decentralized exchanges.",

      categorySlug: PROJECT_CATEGORY.FINTECH_BLOCKCHAIN.slug,

      statusBadges: ["Active Development", "Automated Trading", "CEX / DEX"],

      featuredRank: 5,

      role: "Built full-stack trading infrastructure covering exchange integrations, automated execution workflows, real-time market monitoring, portfolio balances, and operational interfaces.",

      impact:
        "Unified multiple exchange and liquidity integrations behind a TypeScript trading system capable of monitoring opportunities and coordinating automated buy/sell workflows.",

      tags: [
        SKILL.TYPESCRIPT.name,
        SKILL.BUN.name,
        SKILL.ELYSIA.name,
        SKILL.NEXTJS.name,
        SKILL.REACT.name,
        SKILL.POSTGRESQL.name,
        SKILL.PRISMA.name,
        SKILL.REDIS.name,
        SKILL.WEBSOCKETS.name,
        SKILL.SOLANA.name,
        SKILL.JUPITER.name,
        SKILL.BINANCE.name,
        SKILL.KUCOIN.name,
        SKILL.COINBASE.name,
        SKILL.DYDX.name,
      ],

      caseStudy: {
        problem:
          "Trading Solana across multiple centralized and decentralized venues requires fragmented exchange APIs, market-data normalization, balance management, asynchronous execution, and reliable trade-state tracking.",

        role: "Built backend trading services and frontend operational interfaces for market monitoring, trading automation, exchange integrations, and trade lifecycle management.",

        architecture: [
          "Bun and Elysia TypeScript backend",
          "Next.js trading dashboard",
          "PostgreSQL and Prisma persistence",
          "Redis-backed asynchronous trade processing",
          "Centralized and decentralized exchange adapters",
          "Automated trading workers and scheduled opportunity checks",
        ],

        features: [
          "Binance integration",
          "KuCoin integration",
          "Coinbase integration",
          "dYdX integration",
          "Jupiter / Solana DEX integration",
          "Real-time ticker and market monitoring",
          "Exchange balance tracking",
          "Asset transfer workflows",
          "Automated opportunity detection",
          "Configurable trading thresholds",
          "Fee-aware profitability calculations",
          "Automated sell and buy workflows",
          "Persistent trade lifecycle tracking",
          "Redis-backed pending execution processing",
          "Price-history and trading dashboards",
        ],

        challenges: [
          "Normalizing trading behavior across exchange-specific APIs.",
          "Coordinating asynchronous execution without losing transaction state.",
          "Managing market timing, thresholds, fees, and execution sequencing.",
          "Keeping frontend operational data synchronized with automated backend trading processes.",
        ],

        result:
          "Built a multi-exchange trading system combining real-time monitoring, exchange integrations, automated trade execution, state persistence, and operational dashboards.",
      },
    });
  },
};
