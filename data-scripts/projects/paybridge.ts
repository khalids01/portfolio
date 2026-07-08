import type { SeedScript } from "../types";
import { upsertProject } from "../utils";

export const paybridgeProjectSeed: SeedScript = {
  id: "projects/paybridge",
  label: "Project: PayBridge stablecoin payments",
  group: "projects",
  order: 43,
  dependsOn: ["profile/default", "categories/project"],
  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "PayBridge Stablecoin Payment App",
      slug: "paybridge-stablecoin-payments",
      description:
        "Testnet MVP for a PayPal-like stablecoin payment app built for the Circle Arc competition.",
      categorySlug: "fintech-blockchain",
      statusBadges: ["Testnet MVP", "Circle Arc Competition", "R&D"],
      featuredRank: 4,
      role: "Built MVP payment flows and testnet experience.",
      impact:
        "Explores consumer-friendly stablecoin payment UX and settlement workflows on testnet.",
      tags: ["TypeScript", "Stablecoin", "Circle Arc", "Payments", "FinTech"],
      caseStudy: {
        problem:
          "Stablecoin payments can be powerful, but payment UX needs to feel closer to familiar apps like PayPal.",
        role:
          "Built the MVP experience and core testnet payment flows for competition validation.",
        features: [
          "Stablecoin payment flow",
          "Testnet transaction experience",
          "PayPal-like product direction",
        ],
        result:
          "MVP currently positioned as testnet R&D for the Circle Arc competition.",
      },
    });
  },
};
