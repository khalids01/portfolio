import type { SeedScript } from "../types";
import { upsertCategory } from "../utils";

const categories = [
  { name: "Full-Time", slug: "full-time", order: 0 },
  { name: "Freelance / Contract", slug: "freelance-contract", order: 1 },
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
