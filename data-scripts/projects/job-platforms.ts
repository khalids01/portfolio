import type { SeedScript } from "../types";
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
        "A set of production job posting applications with live deployments for real business use cases.",
      categorySlug: "production-apps",
      statusBadges: ["Production Used", "Live Apps"],
      featuredRank: 3,
      role: "Built full-stack job board features, dashboards, and deployment flows.",
      impact:
        "Demonstrates commercially shipped apps beyond R&D and private enterprise work.",
      tags: ["TypeScript", "Next.js", "SaaS", "JobTech", "Production"],
      caseStudy: {
        problem:
          "Businesses needed practical job posting workflows with admin control and public listings.",
        role:
          "Built production application features from frontend to backend and deployment.",
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
