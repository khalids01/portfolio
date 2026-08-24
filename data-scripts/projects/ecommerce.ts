import type { SeedScript } from "../types";
import {
  PROJECT_CATEGORY,
  PROJECT_STATUS,
  PROJECT_TAG,
  SKILL,
} from "../portfolio-constants";
import { upsertProject } from "../utils";

export const ecommerceProjectSeed: SeedScript = {
  id: "projects/ecommerce",
  label: "Project: Ecommerce apps",
  group: "projects",
  order: 45,
  dependsOn: [
    "profile/default",
    "skills/default",
    "categories/project",
    "experience/freelance-contract",
  ],
  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "Ecommerce Applications",
      slug: "ecommerce-applications",
      images: [],
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
      skillSlugs: [
        SKILL.TYPESCRIPT.slug,
        SKILL.NEXTJS.slug,
      ],

      tags: [
        PROJECT_TAG.ECOMMERCE,
        PROJECT_TAG.PAYMENTS,
        "Dashboard",
      ],

      experienceSlug: "freelance-contract-full-stack-web-developer",
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
