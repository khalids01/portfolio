import type { SeedScript } from "../types";
import {
  PROJECT_CATEGORY,
  PROJECT_STATUS,
  PROJECT_TAG,
  SKILL,
} from "../taxonomy";
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
        "R&D platform for algorithmic crypto trading infrastructure, real-time market intelligence, arbitrage research, strategy validation, and automated execution architecture.",

      categorySlug: PROJECT_CATEGORY.FINTECH_BLOCKCHAIN.slug,

      statusBadges: [
        PROJECT_STATUS.ACTIVE_RND,
        "Algorithmic Trading",
        "Market Intelligence",
      ],

      featuredRank: 1,

      role: "Built core market-data infrastructure, arbitrage research workflows, strategy validation systems, and execution architecture.",

      impact:
        "Created an experimentation platform for evaluating trading strategies and execution workflows using real-time data, simulation, and cost-aware opportunity validation.",

      tags: [
        SKILL.TYPESCRIPT.name,
        SKILL.BUN.name,
        SKILL.ELYSIA.name,
        SKILL.REDIS.name,
        SKILL.POSTGRESQL.name,
        SKILL.PRISMA.name,
        SKILL.REACT.name,
        "TanStack",
        SKILL.WEBSOCKETS.name,
        SKILL.SOLIDITY.name,
        SKILL.FOUNDRY.name,
        "EVM",
        PROJECT_TAG.FINTECH,
      ],

      caseStudy: {
        problem:
          "Algorithmic trading opportunities are highly sensitive to stale market data, liquidity, fees, slippage, execution timing, and operational risk.",

        role: "Designed and implemented market-data pipelines, arbitrage research systems, strategy validation workflows, and execution-oriented infrastructure.",

        architecture: [
          "Real-time market-data ingestion and synchronization",
          "Redis-backed event-driven processing",
          "Separation between analysis, strategy, simulation, and execution layers",
          "Persistent trade and strategy evaluation records",
          "Blockchain execution research using local test environments",
        ],

        features: [
          "Live order-book and ticker ingestion",
          "Cross-exchange opportunity detection",
          "DEX liquidity and route analysis",
          "Fee-aware profitability calculations",
          "Slippage and liquidity-impact validation",
          "Strategy signal generation",
          "Trade lifecycle tracking",
          "Simulation-first execution workflows",
          "Historical strategy and decision review",
          "EVM and DeFi execution research",
        ],

        challenges: [
          "Filtering theoretical price differences into realistically executable opportunities.",
          "Maintaining fresh and synchronized market state across fast-moving venues.",
          "Separating research and simulation from real-capital execution.",
          "Accounting for fees, liquidity, slippage, latency, and execution risk.",
        ],

        result:
          "Active R&D environment for exploring market intelligence, algorithmic strategy validation, arbitrage systems, and risk-aware automated trading architecture.",
      },
    });
  },
};
