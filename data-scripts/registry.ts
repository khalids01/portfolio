import type { SeedScript } from "./types";
import { profileSeed } from "./profile/default";
import { skillsSeed } from "./skills/default";
import { projectCategoriesSeed } from "./categories/project-categories";
import { experienceCategoriesSeed } from "./categories/experience-categories";
import { interspeedExperienceSeed } from "./experience/interspeed";
import { freelanceExperienceSeed } from "./experience/freelance-contract";
import { limsProjectSeed } from "./projects/lims";
import { algorithmicCryptoProjectSeed } from "./projects/algorithmic-crypto";
import { multiExchangeTradingProjectSeed } from "./projects/multi-exchange-trading";
import { emrProjectSeed } from "./projects/emr";
import { paybridgeProjectSeed } from "./projects/paybridge";
import { jobPlatformsProjectSeed } from "./projects/job-platforms";
import { ecommerceProjectSeed } from "./projects/ecommerce";
import { resumeSeeds } from "./resume";

export const seedScripts: SeedScript[] = [
  profileSeed,
  skillsSeed,
  projectCategoriesSeed,
  experienceCategoriesSeed,
  interspeedExperienceSeed,
  freelanceExperienceSeed,
  limsProjectSeed,
  algorithmicCryptoProjectSeed,
  multiExchangeTradingProjectSeed,
  emrProjectSeed,
  paybridgeProjectSeed,
  jobPlatformsProjectSeed,
  ecommerceProjectSeed,
  ...resumeSeeds,
].sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));

export function resolveScripts(ids: string[]) {
  const byId = new Map(seedScripts.map((script) => [script.id, script]));
  const selected = new Map<string, SeedScript>();

  function addWithDependencies(id: string) {
    const script = byId.get(id);
    if (!script) throw new Error(`Unknown seed script: ${id}`);
    for (const dependency of script.dependsOn ?? []) addWithDependencies(dependency);
    selected.set(script.id, script);
  }

  for (const id of ids) addWithDependencies(id);
  return [...selected.values()].sort(
    (a, b) => a.order - b.order || a.id.localeCompare(b.id),
  );
}
