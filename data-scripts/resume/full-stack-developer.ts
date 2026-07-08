import type { SeedScript } from "../types";
import { upsertResume } from "../utils";
import { createResume, fullStackSkills } from "./resume-data";

export const fullStackDeveloperResumeSeed: SeedScript = {
  id: "resume/full-stack-developer",
  label: "Resume: Full Stack Developer",
  group: "resume",
  order: 51,
  dependsOn: ["profile/default"],
  async run({ prisma }) {
    await upsertResume(prisma, {
      slug: "full-stack-developer",
      title: "Full Stack Developer Resume",
      targetRole: "Full Stack Developer",
      data: createResume({
        title: "Full Stack Developer",
        summary:
          "Full stack developer experienced in delivering production web apps, dashboards, ecommerce systems, healthcare platforms, and fintech R&D products from frontend to backend.",
        skills: fullStackSkills,
      }),
    });
  },
};
