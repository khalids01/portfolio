import { Prisma, type PrismaClient } from "../prisma/generated/client";
import type { ProjectCaseStudy } from "./types";

export const owner = {
  name: "Abdullah Khalid",
  username: "khalids01",
  email: "khalid.code03@gmail.com",
  image: null as string | null,
};

export const profileData = {
  fullName: "Abdullah Khalid",
  headline: "Full-Stack TypeScript Developer",
  bio: "Results-driven Full-Stack TypeScript Developer specializing in building scalable SaaS, HealthTech, and FinTech platforms. Experienced in architecting microservices, designing real-time data pipelines, and developing secure, production-grade systems. Strong background in crypto arbitrage engines, WebSocket-based market data ingestion, and cloud-native infrastructure.",
  avatarUrl: null as string | null,
  location: "Dhaka, Bangladesh",
  phone: "+88 01604-152737",
  emailPublic: "khalid.code03@gmail.com",
  resumeUrl: null as string | null,
  linkedinUrl: "https://linkedin.com/in/khalid87",
  githubUrl: "https://github.com/khalids01",
  websiteUrl: null as string | null,
};

export function parseDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function toLines(value?: string[] | null) {
  return Array.isArray(value)
    ? value.map((item) => item.trim()).filter(Boolean)
    : [];
}

export async function upsertOwner(prisma: PrismaClient) {
  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email: owner.email }, { username: owner.username }],
    },
    select: { id: true },
  });

  const user = existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: {
          name: owner.name,
          username: owner.username,
          email: owner.email,
          image: owner.image,
          role: "ADMIN",
        },
      })
    : await prisma.user.create({
        data: {
          name: owner.name,
          username: owner.username,
          email: owner.email,
          image: owner.image,
          role: "ADMIN",
        },
      });

  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: {
      ...profileData,
      tags: Prisma.JsonNull,
    },
    create: {
      userId: user.id,
      ...profileData,
      tags: Prisma.JsonNull,
    },
  });

  return { user, profile };
}

export async function getOwnerProfile(prisma: PrismaClient) {
  const profile = await prisma.profile.findFirst({
    where: { user: { email: owner.email } },
    orderBy: { updatedAt: "desc" },
  });

  if (profile) return profile;
  return (await upsertOwner(prisma)).profile;
}

export async function upsertCategory(
  prisma: PrismaClient,
  input: {
    name: string;
    slug: string;
    categoryType: string;
    order?: number;
  },
) {
  const profile = await getOwnerProfile(prisma);
  const category = await prisma.category.upsert({
    where: {
      profileId_categoryType_slug: {
        profileId: profile.id,
        categoryType: input.categoryType,
        slug: input.slug,
      },
    },
    update: {
      name: input.name,
      order: input.order ?? 0,
    },
    create: {
      profileId: profile.id,
      name: input.name,
      slug: input.slug,
      categoryType: input.categoryType,
      order: input.order ?? 0,
    },
  });
  console.log(`  upserted category: ${input.categoryType}/${input.slug}`);
  return category;
}

export async function resolveCategoryId(
  prisma: PrismaClient,
  categoryType: string,
  slug?: string | null,
) {
  if (!slug) return null;
  const profile = await getOwnerProfile(prisma);
  const category = await prisma.category.findUnique({
    where: {
      profileId_categoryType_slug: {
        profileId: profile.id,
        categoryType,
        slug,
      },
    },
    select: { id: true },
  });
  return category?.id ?? null;
}

export async function upsertExperience(
  prisma: PrismaClient,
  input: {
    slug: string;
    company: string;
    role: string;
    location?: string | null;
    startDate: string;
    endDate?: string | null;
    current?: boolean;
    description?: string | null;
    highlights?: string[];
    categorySlug?: string | null;
    coverImage?: string | null;
    images?: string[];
  },
) {
  const profile = await getOwnerProfile(prisma);
  const startDate = parseDate(input.startDate);
  if (!startDate) throw new Error(`Invalid startDate for experience ${input.slug}`);
  const categoryId = await resolveCategoryId(prisma, "experience", input.categorySlug);

  const experience = await prisma.experience.upsert({
    where: {
      profileId_slug: {
        profileId: profile.id,
        slug: input.slug,
      },
    },
    update: {
      company: input.company,
      role: input.role,
      location: input.location ?? null,
      startDate,
      endDate: parseDate(input.endDate),
      current: Boolean(input.current),
      description: input.description ?? null,
      categoryId,
      coverImage: input.coverImage ?? null,
      images: input.images ?? [],
    },
    create: {
      profileId: profile.id,
      slug: input.slug,
      company: input.company,
      role: input.role,
      location: input.location ?? null,
      startDate,
      endDate: parseDate(input.endDate),
      current: Boolean(input.current),
      description: input.description ?? null,
      categoryId,
      coverImage: input.coverImage ?? null,
      images: input.images ?? [],
    },
  });

  await prisma.experienceHighlight.deleteMany({
    where: { experienceId: experience.id },
  });

  const highlights = toLines(input.highlights);
  if (highlights.length) {
    await prisma.experienceHighlight.createMany({
      data: highlights.map((text) => ({ experienceId: experience.id, text })),
    });
  }

  console.log(`  upserted experience: ${input.slug}`);
}

async function ensureTags(prisma: PrismaClient, tagNames: string[]) {
  const names = [...new Set(toLines(tagNames))];
  const tags = [];
  for (const name of names) {
    tags.push(
      await prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    );
  }
  return tags;
}

export async function upsertProject(
  prisma: PrismaClient,
  input: {
    title: string;
    slug: string;
    description?: string | null;
    coverImage?: string | null;
    images?: string[];
    url?: string | null;
    repoUrl?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    tags?: string[];
    categorySlug?: string | null;
    statusBadges?: string[];
    featuredRank?: number | null;
    role?: string | null;
    impact?: string | null;
    caseStudy?: ProjectCaseStudy | null;
  },
) {
  const profile = await getOwnerProfile(prisma);
  const categoryId = await resolveCategoryId(prisma, "project", input.categorySlug);
  const tagRecords = await ensureTags(prisma, input.tags ?? []);
  const data = {
    profileId: profile.id,
    title: input.title,
    description: input.description ?? null,
    coverImage: input.coverImage ?? null,
    images: input.images ?? [],
    url: input.url ?? null,
    repoUrl: input.repoUrl ?? null,
    startDate: parseDate(input.startDate),
    endDate: parseDate(input.endDate),
    categoryId,
    statusBadges: input.statusBadges ?? [],
    featuredRank: input.featuredRank ?? null,
    role: input.role ?? null,
    impact: input.impact ?? null,
    caseStudy: input.caseStudy ?? Prisma.JsonNull,
  };

  await prisma.project.upsert({
    where: { slug: input.slug },
    update: {
      ...data,
      tags: { set: [], connect: tagRecords.map((tag) => ({ id: tag.id })) },
    },
    create: {
      ...data,
      slug: input.slug,
      tags: { connect: tagRecords.map((tag) => ({ id: tag.id })) },
    },
  });

  console.log(`  upserted project: ${input.slug}`);
}

export async function upsertResume(
  prisma: PrismaClient,
  input: {
    slug: string;
    title: string;
    targetRole?: string | null;
    isDefault?: boolean;
    defaultLayout?: string;
    data: unknown;
  },
) {
  if (input.isDefault) {
    await prisma.resume.updateMany({
      where: { slug: { not: input.slug } },
      data: { isDefault: false },
    });
  }

  await prisma.resume.upsert({
    where: { slug: input.slug },
    update: {
      title: input.title,
      targetRole: input.targetRole ?? null,
      isDefault: Boolean(input.isDefault),
      defaultLayout: input.defaultLayout ?? "classic",
      data: input.data as Prisma.InputJsonValue,
    },
    create: {
      slug: input.slug,
      title: input.title,
      targetRole: input.targetRole ?? null,
      isDefault: Boolean(input.isDefault),
      defaultLayout: input.defaultLayout ?? "classic",
      data: input.data as Prisma.InputJsonValue,
    },
  });

  console.log(`  upserted resume: ${input.slug}`);
}
