import type { SeedScript } from "../types";
import { EXPERIENCE_CATEGORY } from "../taxonomy";
import { upsertCategory } from "../utils";

const categories = [
  { ...EXPERIENCE_CATEGORY.FULL_TIME, order: 0 },
  { ...EXPERIENCE_CATEGORY.FREELANCE_CONTRACT, order: 1 },
];

export const experienceCategoriesSeed: SeedScript = {
  id: "categories/experience",
  label: "Categories: work history",
  group: "categories",
  order: 21,
  dependsOn: ["profile/default"],
  async run({ prisma }) {
    for (const category of categories) {
      await upsertCategory(prisma, { ...category, categoryType: "experience" });
    }
  },
};
