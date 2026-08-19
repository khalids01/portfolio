import type { SeedScript } from "../types";
import { SKILLS } from "../taxonomy";
import { getOwnerProfile } from "../utils";

export const skillsSeed: SeedScript = {
  id: "skills/default",
  label: "Skills: current portfolio stack",
  group: "skills",
  order: 10,
  dependsOn: ["profile/default"],
  async run({ prisma }) {
    const profile = await getOwnerProfile(prisma);
    await prisma.skill.deleteMany({ where: { profileId: profile.id } });
    await prisma.skill.createMany({
      data: SKILLS.map((skill, order) => ({
        profileId: profile.id,
        ...skill,
        order,
      })),
    });
    console.log(`  synced skills: ${SKILLS.length}`);
  },
};
