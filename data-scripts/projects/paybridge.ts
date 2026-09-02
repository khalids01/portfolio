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
      coverImage:
        "/projects/paybridge/partner/screen shots/partner dashboard overview.png",
      images: [
        "/projects/paybridge/partner/screen shots/partner dashboard overview.png",
        "/projects/paybridge/partner/screen shots/institutional settlement done.png",
        "/projects/paybridge/partner/screen shots/exception or fails settelments screen.png",
        "/projects/paybridge/partner/screen shots/demo funding.png",
        "/projects/paybridge/partner/screen shots/demo withdrawal.png",
        "/projects/paybridge/partner/screen shots/demo funding done.png",
        "/projects/paybridge/partner/screen shots/doing institutional settlement.png",
        "/projects/paybridge/partner/screen shots/Institutional settlement screen.png",
        "/projects/paybridge/partner/screen shots/single settlement batch full details .png",
        "/projects/paybridge/partner/screen shots/demo withdrawal done.png",
        "/projects/paybridge/partner/screen shots/settlement batches.png",
        "/projects/paybridge/partner/screen shots/institutional settlement details.png",
        "/projects/paybridge/user/screen shots/Dashboard overview.png",
        "/projects/paybridge/user/screen shots/Money Received Screen.png",
        "/projects/paybridge/user/screen shots/Transaction details screen after sending.png",
        "/projects/paybridge/user/screen shots/Completed Payment of requested payment.png",
        "/projects/paybridge/user/screen shots/Payment Request screen.png",
        "/projects/paybridge/user/screen shots/Pay Requested Payment.png",
        "/projects/paybridge/user/screen shots/Deposit Screen.png",
        "/projects/paybridge/user/screen shots/Demo Withdraw screen.png",
        "/projects/paybridge/user/screen shots/Send screen.png",
        "/projects/paybridge/user/screen shots/Did a demo deposit.png",
        "/projects/paybridge/user/screen shots/List of all transactions screen.png",
        "/projects/paybridge/user/screen shots/Creating Payment request Link Screen .png",
        "/projects/paybridge/user/screen shots/Payment Request Details screen.png",
        "/projects/paybridge/user/screen shots/Demo Withdraw done.png",
        "/projects/paybridge/user/screen shots/Received Transaction details screen.png",
        "/projects/paybridge/admin/screen shots/admin dashboard overview.png",
        "/projects/paybridge/admin/screen shots/recent activity.png",
        "/projects/paybridge/admin/screen shots/user control.png",
        "/projects/paybridge/admin/screen shots/monitoring all transactions.png",
        "/projects/paybridge/admin/screen shots/rbac role control.png",
        "/projects/paybridge/admin/screen shots/partner control.png",
      ],

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
