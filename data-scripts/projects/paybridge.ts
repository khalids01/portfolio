import type { SeedScript } from "../types";
import {
  PROJECT_CATEGORY,
  PROJECT_STATUS,
  PROJECT_TAG,
  SKILL,
} from "../portfolio-constants";
import { upsertProject } from "../utils";

export const paybridgeProjectSeed: SeedScript = {
  id: "projects/paybridge",
  label: "Project: PayBridge stablecoin payments",
  group: "projects",
  order: 43,
  dependsOn: ["profile/default", "skills/default", "categories/project"],
  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "PayBridge",
      slug: "paybridge",

      description:
        "Institutional cross-border settlement orchestration platform exploring how regulated payment providers can use stablecoin infrastructure for treasury settlement, liquidity management, payout coordination, and reconciliation.",

      categorySlug: PROJECT_CATEGORY.FINTECH_BLOCKCHAIN.slug,

      statusBadges: [
        PROJECT_STATUS.ACTIVE_RND,
        "Product Development",
        "Circle USDC / Arc",
      ],

      featuredRank: 2,

      role: "Designed and built settlement workflows spanning customer payments, internal ledger obligations, treasury operations, USDC settlement, destination liquidity, payout tracking, and reconciliation.",

      impact:
        "Explores how stablecoin infrastructure can improve institutional cross-border settlement while keeping blockchain complexity invisible to end customers.",

      skillSlugs: [
        SKILL.TYPESCRIPT.slug,
        SKILL.CIRCLE.slug,
      ],

      tags: [
        PROJECT_TAG.FINTECH,
        PROJECT_TAG.PAYMENTS,
        "USDC",
        PROJECT_TAG.STABLECOINS,
        PROJECT_TAG.TREASURY,
        PROJECT_TAG.RECONCILIATION,
      ],

      experienceSlug: null,

      caseStudy: {
        problem:
          "Cross-border payment providers must coordinate treasury liquidity, settlement obligations, prefunding, payout partners, reconciliation, and multiple operational states behind seemingly simple customer transactions.",

        role: "Designed and implemented the product architecture, settlement operations workflows, treasury concepts, transaction-state modeling, and testnet settlement experience.",

        architecture: [
          "Customer fiat payment layer",
          "Internal settlement ledger",
          "Treasury and liquidity management",
          "Settlement batching and netting",
          "USDC settlement through Circle and Arc",
          "Destination liquidity and payout tracking",
          "Reconciliation and audit trail",
        ],

        features: [
          "Customer payment tracking",
          "Settlement obligations",
          "Settlement batches",
          "Treasury balances",
          "Fee reserve management",
          "Destination liquidity tracking",
          "USDC settlement evidence",
          "Recipient payout state tracking",
          "Reconciliation workflows",
          "Failed and blocked settlement handling",
          "Operational exception management",
          "Audit and transaction history",
        ],

        challenges: [
          "Separating customer payment, institutional settlement, recipient payout, and reconciliation into independently traceable states.",
          "Modeling treasury balances and settlement obligations without presenting simulated fiat integrations as production infrastructure.",
          "Maintaining deterministic financial calculations and auditable transaction state transitions.",
        ],

        result:
          "Active R&D prototype demonstrating institutional settlement orchestration, treasury workflows, reconciliation, and genuine Circle/Arc testnet settlement while clearly separating simulated fiat activity from real blockchain activity.",
      },
    });
  },
};
