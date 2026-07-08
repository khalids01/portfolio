import type { SeedScript } from "../types";
import { upsertOwner } from "../utils";

export const profileSeed: SeedScript = {
  id: "profile/default",
  label: "Profile: Abdullah Khalid",
  group: "profile",
  order: 0,
  async run({ prisma }) {
    await upsertOwner(prisma);
    console.log("  upserted owner profile");
  },
};
