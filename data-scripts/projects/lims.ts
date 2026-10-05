import type { SeedScript } from "../types";
import { PROJECT_CATEGORY, PROJECT_TAG, SKILL } from "../portfolio-constants";
import { upsertProject } from "../utils";

export const limsProjectSeed: SeedScript = {
  id: "projects/lims",
  label: "Project: LIMS",
  group: "projects",
  order: 40,
  dependsOn: [
    "profile/default",
    "skills/default",
    "categories/project",
    "experience/interspeed",
  ],
  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "Laboratory Information Management System (LIMS)",
      slug: "lims",
      images: [],
      description:
        "Enterprise LIMS for hospitals and diagnostic centers, supporting clinical and anatomical laboratory workflows with strict access control and automation.",
      categorySlug: PROJECT_CATEGORY.HEALTHTECH.slug,
      statusBadges: [
        "Private Enterprise Project",
        "Advanced Development",
        "Paused After Funding Ended",
      ],
      featuredRank: 3,
      role: "Primary full-stack developer over 2.5 years, responsible for requirements discussions, technical decisions, implementation, deployment, and support.",
      impact:
        "Built a feature-rich enterprise healthcare platform covering complex laboratory workflows before development paused after funding ended.",
      skillSlugs: [
        SKILL.TYPESCRIPT.slug,
        SKILL.NEXTJS.slug,
        SKILL.FASTIFY.slug,
        SKILL.MARIADB.slug,
      ],

      tags: [
        PROJECT_TAG.HEALTHTECH,
        PROJECT_TAG.ENTERPRISE_SAAS,
      ],

      experienceSlug: "interspeed-full-stack-typescript-developer",
      caseStudy: {
        problem:
          "Hospitals and diagnostic centers needed one system to manage patient registration, samples, lab workflows, reports, and internal access control.",
        role: "Personally handled requirements discussions, technical decisions, implementation, deployment, and support across laboratory workflows, backend APIs, data models, and interfaces.",
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
