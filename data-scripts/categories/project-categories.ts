import type { SeedScript } from "../types";
import { upsertCategory } from "../utils";

const categories = [
  { name: "Production Apps", slug: "production-apps", order: 0 },
  { name: "Enterprise HealthTech", slug: "enterprise-healthtech", order: 1 },
  { name: "FinTech / Blockchain", slug: "fintech-blockchain", order: 2 },
  { name: "SaaS / Internal Tools", slug: "saas-internal-tools", order: 3 },
  { name: "Ecommerce", slug: "ecommerce", order: 4 },
  { name: "Open Source", slug: "open-source", order: 5 },
];

export const projectCategoriesSeed: SeedScript = {
  id: "categories/project",
  label: "Categories: project filters",
  group: "categories",
  order: 20,
  dependsOn: ["profile/default"],
  async run({ prisma }) {
    for (const category of categories) {
      await upsertCategory(prisma, { ...category, categoryType: "project" });
    }
  },
};
