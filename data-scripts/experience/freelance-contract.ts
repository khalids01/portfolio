import type { SeedScript } from "../types";
import { upsertExperience } from "../utils";

export const freelanceExperienceSeed: SeedScript = {
  id: "experience/freelance-contract",
  label: "Experience: Freelance / Contract",
  group: "experience",
  order: 31,
  dependsOn: ["profile/default", "categories/experience"],
  async run({ prisma }) {
    await upsertExperience(prisma, {
      slug: "freelance-contract-full-stack-web-developer",
      company: "Freelance / Contract",
      role: "Full-Stack Web Developer",
      location: "Remote",
      startDate: "2020-01-01",
      endDate: "2023-01-01",
      current: false,
      categorySlug: "freelance-contract",
      description:
        "Delivered end-to-end web, SaaS, and e-commerce solutions for clients in tech and retail.",
      highlights: [
        "Completed 100+ client projects with consistent 5-star ratings.",
        "Built custom CMS dashboards and multi-vendor e-commerce platforms using Next.js and NestJS.",
        "Integrated payment gateways and third-party APIs.",
        "Deployed and maintained applications on AWS and Vercel.",
      ],
    });
  },
};
