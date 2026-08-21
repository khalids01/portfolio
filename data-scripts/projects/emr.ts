import type { SeedScript } from "../types";
import { PROJECT_CATEGORY, PROJECT_TAG, SKILL } from "../portfolio-constants";
import { upsertProject } from "../utils";

export const emrProjectSeed: SeedScript = {
  id: "projects/emr",
  label: "Project: EMR OpenEMR fork",
  group: "projects",
  order: 42,
  dependsOn: [
    "profile/default",
    "skills/default",
    "categories/project",
    "experience/interspeed",
  ],
  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "Electronic Medical Record (EMR)",
      slug: "emr-system",
      images: [],
      description:
        "Customization and modernization work on a fork of OpenEMR, improving selected clinician and patient workflows with new UI and APIs.",
      categorySlug: PROJECT_CATEGORY.HEALTHTECH.slug,
      statusBadges: ["OpenEMR Fork", "Customization", "Paused"],
      featuredRank: 6,
      role: "Contributed smaller focused improvements compared with the LIMS ownership.",
      impact:
        "Improved selected workflows in a mature healthcare codebase while learning legacy modernization constraints.",
      skillSlugs: [
        SKILL.PHP.slug,
        SKILL.TYPESCRIPT.slug,
        SKILL.REACT.slug,
        SKILL.MYSQL.slug,
        SKILL.REST_APIS.slug,
      ],

      tags: [
        PROJECT_TAG.OPEN_SOURCE,
      ],

      experienceSlug: "interspeed-full-stack-typescript-developer",
      caseStudy: {
        problem:
          "A mature OpenEMR-based system needed selected workflow and UI modernization without rewriting the whole product.",
        role: "Contributed targeted module improvements, API work, and frontend modernization.",
        features: [
          "Legacy module modernization",
          "Patient and clinician workflow improvements",
          "REST API integration",
        ],
        challenges: [
          "Working carefully inside a large long-lived PHP codebase.",
          "Modernizing selected flows without breaking existing EMR behavior.",
        ],
        result:
          "Useful healthcare modernization experience, with the project later paused.",
      },
    });
  },
};
