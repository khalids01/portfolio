import type { SeedScript } from "../types";
import { upsertResume } from "../utils";
import {
  createResume,
  ecommerceProject,
  fullStackExperience,
  fullStackSkills,
  jobPlatformsProject,
  limsProject,
} from "./resume-data";

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
      defaultLayout: "ats-plain",
      data: createResume({
        title: "Full Stack Developer",
        summary:
          "Full stack developer with 6+ years of experience taking web products from requirements through UI, APIs, databases, integrations, deployment, and production support. Delivered 100+ highly rated client projects and substantial enterprise HealthTech work, with additional experience across ecommerce, job platforms, SaaS, and real-time applications.",
        skills: fullStackSkills,
        experience: fullStackExperience,
        projects: [limsProject, jobPlatformsProject, ecommerceProject],
      }),
    });
  },
};
