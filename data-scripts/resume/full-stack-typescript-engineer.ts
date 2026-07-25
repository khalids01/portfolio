import type { SeedScript } from "../types";
import { upsertResume } from "../utils";
import {
  createResume,
  cryptoProject,
  jobPlatformsProject,
  limsProject,
  typescriptExperience,
  typescriptSkills,
} from "./resume-data";

export const fullStackTypescriptEngineerResumeSeed: SeedScript = {
  id: "resume/full-stack-typescript-engineer",
  label: "Resume: Full-Stack TypeScript Engineer",
  group: "resume",
  order: 52,
  dependsOn: ["profile/default"],
  async run({ prisma }) {
    await upsertResume(prisma, {
      slug: "full-stack-typescript-engineer",
      title: "Full-Stack TypeScript Engineer Resume",
      targetRole: "Full-Stack TypeScript Engineer",
      defaultLayout: "ats-plain",
      data: createResume({
        title: "Full-Stack TypeScript Engineer",
        summary:
          "Full-stack TypeScript engineer with 6+ years of experience building maintainable web applications, backend services, data models, and real-time systems. Combines React and Next.js product delivery with Node.js and Bun services, relational databases, Redis, WebSockets, and cloud deployment across HealthTech, FinTech R&D, SaaS, and production business platforms.",
        skills: typescriptSkills,
        experience: typescriptExperience,
        projects: [limsProject, cryptoProject, jobPlatformsProject],
      }),
    });
  },
};
