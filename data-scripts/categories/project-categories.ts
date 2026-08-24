import type { SeedScript } from "../types";
import { PROJECT_CATEGORY } from "../portfolio-constants";
import { getOwnerProfile, upsertCategory } from "../utils";

const categories = [
  { ...PROJECT_CATEGORY.HEALTHTECH, order: 0 },
  { ...PROJECT_CATEGORY.FINTECH_BLOCKCHAIN, order: 1 },
  { ...PROJECT_CATEGORY.SAAS_PLATFORMS, order: 2 },
  { ...PROJECT_CATEGORY.ECOMMERCE, order: 3 },
  { ...PROJECT_CATEGORY.BUSINESS_APPS, order: 4 },
  { ...PROJECT_CATEGORY.DEVELOPER_TOOLS, order: 5 },
];

const obsoleteSeededCategorySlugs = [
  "production-apps",
  "enterprise-healthtech",
  "saas-internal-tools",
  "open-source",
];

export const projectCategoriesSeed: SeedScript = {
  id: "categories/project",
  label: "Categories: project filters",
  group: "categories",
  order: 20,
  dependsOn: ["profile/default"],
  async run({ prisma }) {
    const profile = await getOwnerProfile(prisma);

    // Delete only explicitly retired canonical categories for this portfolio.
    // Admin-created project categories are never targeted.
    await prisma.category.deleteMany({
      where: {
        profileId: profile.id,
        categoryType: "project",
        slug: { in: obsoleteSeededCategorySlugs },
      },
    });

    for (const category of categories) {
      await upsertCategory(prisma, { ...category, categoryType: "project" });
    }
  },
};
