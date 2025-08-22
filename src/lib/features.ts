import { prisma } from "./prisma";

export type FeatureKey = "disableSignUp";

export type FeatureFlag = {
  key: FeatureKey | string;
  value: boolean;
};

export async function getFeatureFlag(key: FeatureKey | string): Promise<boolean> {
  const flag = await prisma.featureFlag.findUnique({ where: { key } });
  return flag?.value ?? false;
}

export async function setFeatureFlag(key: FeatureKey | string, value: boolean) {
  return prisma.featureFlag.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function listFeatureFlags(keys?: (FeatureKey | string)[]) {
  if (keys && keys.length) {
    const rows = await prisma.featureFlag.findMany({ where: { key: { in: keys } } });
    // populate defaults for missing keys as false
    const present = new Map(rows.map((r) => [r.key, r.value]));
    return keys.map((k) => ({ key: k, value: present.get(k) ?? false }));
  }
  const rows = await prisma.featureFlag.findMany({});
  return rows.map((r) => ({ key: r.key, value: r.value }));
}
