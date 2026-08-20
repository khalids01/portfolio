import type { SeedScript } from "../types";
import { PROJECT_CATEGORY } from "../portfolio-constants";
import { upsertCategory } from "../utils";

const categories = [
  { ...PROJECT_CATEGORY.PRODUCTION_APPS, order: 0 },
  { ...PROJECT_CATEGORY.ENTERPRISE_HEALTHTECH, order: 1 },
  { ...PROJECT_CATEGORY.FINTECH_BLOCKCHAIN, order: 2 },
  { ...PROJECT_CATEGORY.SAAS_INTERNAL_TOOLS, order: 3 },
  { ...PROJECT_CATEGORY.ECOMMERCE, order: 4 },
  { ...PROJECT_CATEGORY.OPEN_SOURCE, order: 5 },
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
