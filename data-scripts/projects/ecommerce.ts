import type { SeedScript } from "../types";
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
        "Production ecommerce work including client commerce systems and a business-owned ecommerce app that generated real sales.",
      categorySlug: "ecommerce",
      statusBadges: ["Production Used", "Real Sales", "Relaunch Planned"],
      featuredRank: 5,
      role:
        "Built ecommerce functionality, dashboards, product flows, and integrations.",
      impact:
        "Shows direct business value through commerce applications and real sales experience.",
      tags: ["TypeScript", "Next.js", "Ecommerce", "Payments", "Dashboard"],
      caseStudy: {
        problem:
          "Retail and business users needed ecommerce flows that could manage products, orders, and customer-facing purchase paths.",
        role:
          "Built full-stack ecommerce features and business-facing management flows.",
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
