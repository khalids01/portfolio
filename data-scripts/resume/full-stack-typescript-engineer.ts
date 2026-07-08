import type { SeedScript } from "../types";
import { upsertResume } from "../utils";
import { createResume, fullStackSkills } from "./resume-data";

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
      data: createResume({
        title: "Full-Stack TypeScript Engineer",
        summary:
          "TypeScript-focused full-stack engineer with strong backend, React/Next.js, database, realtime systems, and production deployment experience across SaaS, HealthTech, FinTech, and ecommerce products.",
        skills: fullStackSkills,
      }),
    });
  },
};
