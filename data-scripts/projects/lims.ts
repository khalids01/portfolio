import type { SeedScript } from "../types";
import { upsertProject } from "../utils";

export const limsProjectSeed: SeedScript = {
  id: "projects/lims",
  label: "Project: LIMS",
  group: "projects",
  order: 40,
  dependsOn: ["profile/default", "categories/project"],
  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "Laboratory Information Management System (LIMS)",
      slug: "lims",
      description:
        "Enterprise LIMS for hospitals and diagnostic centers, supporting clinical and anatomical laboratory workflows with strict access control and automation.",
      categorySlug: "enterprise-healthtech",
      statusBadges: [
        "Private Enterprise Project",
        "Production-ready",
        "Paused after funding ended",
      ],
      featuredRank: 1,
      role: "Built around 85% of the system over 2.5 years.",
      impact:
        "Feature-rich healthcare platform prepared for real laboratory and hospital workflows before funding paused.",
      tags: ["TypeScript", "Next.js", "Fastify", "MariaDB", "HealthTech", "Enterprise SaaS"],
      caseStudy: {
        problem:
          "Hospitals and diagnostic centers needed one system to manage patient registration, samples, lab workflows, reports, and internal access control.",
        role:
          "Primary full-stack developer responsible for most product workflows, backend APIs, data modeling, and UI flows.",
        features: [
          "Patient and sample workflows",
          "Clinical and anatomical laboratory processes",
          "Role-based access control",
          "Dynamic forms and reporting flows",
          "Operational automation for diagnostic workflows",
        ],
        challenges: [
          "Modeling complex healthcare workflows without making the UI hard for operators.",
          "Keeping permissions strict across multiple user roles and departments.",
        ],
        result:
          "The project was paused after funding stopped, but the system reached a feature-rich state close to real deployment.",
      },
    });
  },
};
