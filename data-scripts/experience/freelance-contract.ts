import type { SeedScript } from "../types";
import { EXPERIENCE_CATEGORY } from "../taxonomy";
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
      role: "Web Designer & Web Developer",
      location: "Remote",
      startDate: "2020-01-01",
      endDate: "2023-01-01",
      current: false,
      categorySlug: EXPERIENCE_CATEGORY.FREELANCE_CONTRACT.slug,

      description:
        "Worked across freelance development, team-based web design, and contract ecommerce projects, progressing from web design into frontend and full-stack development.",

      highlights: [
        "Delivered 100+ website designs as part of a remote web design team after an initial Fiverr engagement developed into a longer-term collaboration.",
        "Worked with several clients through Fiverr and received 5-star reviews from both clients who left public feedback.",
        "Built responsive business websites and client-facing interfaces across a wide range of design requirements and industries.",
        "Worked on contract ecommerce projects, building storefront, product, dashboard, and business workflow features.",
        "Progressed from web design into frontend and full-stack development using JavaScript, React, Next.js, Node.js, and related web technologies.",
        "Handled client requirements, revisions, integrations, deployment, maintenance, and production troubleshooting across freelance and contract work.",
      ],
    });
  },
};
