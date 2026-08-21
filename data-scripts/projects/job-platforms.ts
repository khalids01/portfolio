import type { SeedScript } from "../types";
import {
  PROJECT_CATEGORY,
  PROJECT_STATUS,
  PROJECT_TAG,
  SKILL,
} from "../portfolio-constants";
import { upsertProject } from "../utils";

export const jobPlatformsProjectSeed: SeedScript = {
  id: "projects/job-platforms",
  label: "Project: Job posting platforms",
  group: "projects",
  order: 44,
  dependsOn: ["profile/default", "skills/default", "categories/project"],
  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "Job Posting Platforms",
      slug: "job-posting-platforms",
      images: [],
      description:
        "Production job posting applications built for real business recruitment workflows, including public listings, administration, and deployment.",
      categorySlug: PROJECT_CATEGORY.SAAS_PLATFORMS.slug,
      statusBadges: [PROJECT_STATUS.PRODUCTION_USED, "Live Apps"],
      featuredRank: 7,
      impact:
        "Delivered commercially used applications with complete frontend, backend, administrative, and deployment workflows.",
      role: "Built full-stack job board features, dashboards, and deployment flows.",
      skillSlugs: [
        SKILL.TYPESCRIPT.slug,
        SKILL.NEXTJS.slug,
      ],

      tags: [
        PROJECT_TAG.JOBTECH,
        PROJECT_TAG.PRODUCTION,
        PROJECT_TAG.FULL_STACK,
      ],

      experienceSlug: null,
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
