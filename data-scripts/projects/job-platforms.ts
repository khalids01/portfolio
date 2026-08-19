import type { SeedScript } from "../types";
import {
  PROJECT_CATEGORY,
  PROJECT_STATUS,
  SKILL,
} from "../taxonomy";
import { upsertProject } from "../utils";

export const jobPlatformsProjectSeed: SeedScript = {
  id: "projects/job-platforms",
  label: "Project: Job posting platforms",
  group: "projects",
  order: 44,
  dependsOn: ["profile/default", "categories/project"],
  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "Job Posting Platforms",
      slug: "job-posting-platforms",
      description:
        "Production job posting applications built for real business recruitment workflows, including public listings, administration, and deployment.",
      categorySlug: PROJECT_CATEGORY.PRODUCTION_APPS.slug,
      statusBadges: [PROJECT_STATUS.PRODUCTION_USED, "Live Apps"],
      featuredRank: 7,
      impact:
        "Delivered commercially used applications with complete frontend, backend, administrative, and deployment workflows.",
      role: "Built full-stack job board features, dashboards, and deployment flows.",
      tags: [
        SKILL.TYPESCRIPT.name,
        SKILL.NEXTJS.name,
        "JobTech",
        "Production",
        "Full Stack",
      ],
      caseStudy: {
        problem:
          "Businesses needed practical job posting workflows with admin control and public listings.",
        role: "Built production application features from frontend to backend and deployment.",
        features: [
          "Job listing management",
          "Public job browsing",
          "Admin/dashboard workflows",
          "Production deployment",
        ],
        result:
          "Multiple job posting apps shipped with live links available to add.",
      },
    });
  },
};
