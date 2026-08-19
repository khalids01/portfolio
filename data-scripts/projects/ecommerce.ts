import type { SeedScript } from "../types";
import {
  PROJECT_CATEGORY,
  PROJECT_STATUS,
  PROJECT_TAG,
  SKILL,
} from "../taxonomy";
import { upsertProject } from "../utils";

export const ecommerceProjectSeed: SeedScript = {
  id: "projects/ecommerce",
  label: "Project: Ecommerce apps",
  group: "projects",
  order: 45,
  dependsOn: ["profile/default", "categories/project"],
  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "Ecommerce Applications",
      slug: "ecommerce-applications",
      description:
        "Production ecommerce applications built for client and business-owned retail workflows, including systems used to generate real sales.",
      categorySlug: PROJECT_CATEGORY.ECOMMERCE.slug,
      statusBadges: [
        PROJECT_STATUS.PRODUCTION_USED,
        "Real Sales",
        "Relaunch Planned",
      ],
      featuredRank: 4,
      role: "Built full-stack storefront, product, order, dashboard, payment, and integration workflows.",
      impact:
        "Delivered commerce systems used for real customer purchases and business operations.",
      tags: [
        SKILL.TYPESCRIPT.name,
        SKILL.NEXTJS.name,
        "Ecommerce",
        PROJECT_TAG.PAYMENTS,
        "Dashboard",
      ],
      caseStudy: {
        problem:
          "Retail and business users needed ecommerce flows that could manage products, orders, and customer-facing purchase paths.",
        role: "Built full-stack ecommerce features and business-facing management flows.",
        features: [
          "Product and order workflows",
          "Business dashboard features",
          "Payment and third-party integrations",
          "Customer-facing storefront flows",
        ],
        result:
          "Includes ecommerce work with successful sales history; one business app is planned to go live again.",
      },
    });
  },
};
