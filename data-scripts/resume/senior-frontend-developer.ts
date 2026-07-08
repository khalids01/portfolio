import type { SeedScript } from "../types";
import { upsertResume } from "../utils";
import { createResume, frontendSkills } from "./resume-data";

export const seniorFrontendDeveloperResumeSeed: SeedScript = {
  id: "resume/senior-frontend-developer",
  label: "Resume: Senior Frontend Developer",
  group: "resume",
  order: 53,
  dependsOn: ["profile/default"],
  async run({ prisma }) {
    await upsertResume(prisma, {
      slug: "senior-frontend-developer",
      title: "Senior Frontend Developer Resume",
      targetRole: "Senior Frontend Developer",
      data: createResume({
        title: "Senior Frontend Developer",
        summary:
          "Frontend-leaning TypeScript developer experienced in building polished React/Next.js dashboards, complex forms, production business workflows, and full-stack features with strong backend collaboration.",
        skills: frontendSkills,
      }),
    });
  },
};
