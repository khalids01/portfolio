import type { SeedScript } from "../types";
import { upsertResume } from "../utils";
import { createResume, fullStackSkills } from "./resume-data";

export const defaultResumeSeed: SeedScript = {
  id: "resume/default",
  label: "Resume: default",
  group: "resume",
  order: 50,
  dependsOn: ["profile/default"],
  async run({ prisma }) {
    await upsertResume(prisma, {
      slug: "default",
      title: "Default Resume",
      targetRole: "Full-Stack TypeScript Developer",
      isDefault: true,
      data: createResume({
        title: "Full-Stack TypeScript Developer",
        summary:
          "Full-stack TypeScript developer with 4+ years of experience building SaaS, HealthTech, FinTech, ecommerce, and production business systems. Strong in backend architecture, real-time data flows, dashboards, and shipping practical applications.",
        skills: fullStackSkills,
      }),
    });
  },
};
