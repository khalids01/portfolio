import type { SeedScript } from "../types";
import { SKILLS } from "../portfolio-constants";
import { upsertSkill } from "../utils";

export const skillsSeed: SeedScript = {
  id: "skills/default",
  label: "Skills: current portfolio stack",
  group: "skills",
  order: 10,
  dependsOn: ["profile/default"],
  async run({ prisma }) {
    for (const [order, skill] of SKILLS.entries()) {
      await upsertSkill(prisma, {
        ...skill,
        order,
      });
    }
    console.log(`  upserted skills: ${SKILLS.length}`);
  },
};
