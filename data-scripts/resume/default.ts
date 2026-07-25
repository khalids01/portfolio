import type { SeedScript } from "../types";
import { upsertResume } from "../utils";
import {
  createResume,
  cryptoProject,
  fullStackSkills,
  jobPlatformsProject,
  limsProject,
} from "./resume-data";

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
      defaultLayout: "ats-plain",
      data: createResume({
        title: "Full-Stack TypeScript Developer",
        summary:
          "Full-stack TypeScript developer with 6+ years of experience delivering HealthTech, FinTech R&D, SaaS, ecommerce, and business applications for remote teams and clients. Experienced in owning complex product workflows, designing backend services and real-time data flows, and shipping maintainable React and Next.js applications from database to deployment.",
        skills: fullStackSkills,
        projects: [limsProject, cryptoProject, jobPlatformsProject],
      }),
    });
  },
};
