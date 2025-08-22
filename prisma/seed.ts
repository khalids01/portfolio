import { readFile } from "fs/promises";
import { join } from "path";
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

// Types describing the JSON structure in prisma/data.json
type SeedUser = {
  name?: string;
  username?: string;
  email?: string;
  image?: string;
};

type SeedProfile = {
  fullName: string;
  headline: string;
  tags?: string[];
  bio?: string | null;
  avatarUrl?: string | null;
  location?: string | null;
  phone?: string | null;
  emailPublic?: string | null;
  resumeUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  websiteUrl?: string | null;
};

type SeedSkill = {
  name: string;
  category: string;
  level?: number | null;
  order?: number;
};

type SeedExperience = {
  company: string;
  role: string;
  location?: string | null;
  startDate: string; // required
  endDate?: string | null;
  current?: boolean;
  description?: string | null;
  highlights?: string[];
};

type SeedEducation = {
  institution: string;
  degree: string;
  field?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  grade?: string | null;
};

type SeedProject = {
  title: string;
  slug: string;
  description?: string | null;
  coverImage?: string | null;
  url?: string | null;
  repoUrl?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  tags?: string[];
};

type SeedSocialLink = {
  platform: string;
  url: string;
  order?: number;
};

type SeedData = {
  user: SeedUser;
  profile: SeedProfile;
  skills?: SeedSkill[];
  experiences?: SeedExperience[];
  educations?: SeedEducation[];
  projects?: SeedProject[];
  socialLinks?: SeedSocialLink[];
};

function parseDate(value?: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function upsertUser(user: SeedUser) {
  const where = user?.email
    ? { email: user.email as string }
    : user?.username
    ? { username: user.username as string }
    : null;
  if (!where) throw new Error("data.user requires email or username for upsert");

  const data = {
    name: user.name ?? null,
    username: user.username ?? null,
    email: user.email ?? null,
    image: user.image ?? null,
  };

  return prisma.user.upsert({ where, update: data, create: data });
}

async function upsertProfile(userId: string, profile: SeedProfile) {
  const toSave = {
    userId,
    fullName: profile.fullName as string,
    headline: profile.headline as string,
    tags: Array.isArray(profile.tags) ? profile.tags.map(String) : null,
    bio: (profile.bio ?? null) as string | null,
    avatarUrl: (profile.avatarUrl ?? null) as string | null,
    location: (profile.location ?? null) as string | null,
    phone: (profile.phone ?? null) as string | null,
    emailPublic: (profile.emailPublic ?? null) as string | null,
    resumeUrl: (profile.resumeUrl ?? null) as string | null,
    linkedinUrl: (profile.linkedinUrl ?? null) as string | null,
    githubUrl: (profile.githubUrl ?? null) as string | null,
    websiteUrl: (profile.websiteUrl ?? null) as string | null,
  };

  return prisma.profile.upsert({
    where: { userId },
    update: toSave,
    create: toSave,
  });
}

async function replaceSkills(profileId: string, skills: SeedSkill[] = []) {
  await prisma.skill.deleteMany({ where: { profileId } });
  if (!skills.length) return;
  await prisma.skill.createMany({
    data: skills.map((s, idx) => ({
      profileId,
      name: s.name as string,
      category: s.category as string,
      level: (s.level ?? null) as number | null,
      order: (s.order ?? idx) as number,
    })),
  });
}

async function replaceExperiences(profileId: string, experiences: SeedExperience[] = []) {
  const existing = await prisma.experience.findMany({ where: { profileId }, select: { id: true } });
  if (existing.length) {
    await prisma.experienceHighlight.deleteMany({ where: { experienceId: { in: existing.map(e => e.id) } } });
    await prisma.experience.deleteMany({ where: { profileId } });
  }

  for (const exp of experiences) {
    const start = parseDate(exp.startDate);
    if (!start) throw new Error(`Experience.startDate is required and must be a valid date for company: ${exp.company}`);
    const experience = await prisma.experience.create({
      data: {
        profileId,
        company: exp.company as string,
        role: exp.role as string,
        location: (exp.location ?? null) as string | null,
        startDate: start,
        endDate: parseDate(exp.endDate) as Date | null,
        current: !!exp.current,
        description: (exp.description ?? null) as string | null,
      },
    });

    if (Array.isArray(exp.highlights) && exp.highlights.length) {
      await prisma.experienceHighlight.createMany({
        data: (exp.highlights as string[]).map(text => ({
          experienceId: experience.id,
          text: String(text),
        })),
      });
    }
  }
}

async function ensureTags(tagNames: string[] = []) {
  const names = [...new Set(tagNames.filter(Boolean).map(String))];
  const tags = [] as { id: string; name: string }[];
  for (const name of names) {
    const tag = await prisma.tag.upsert({ where: { name }, update: {}, create: { name } });
    tags.push(tag);
  }
  return tags;
}

async function replaceProjects(profileId: string, projects: SeedProject[] = []) {
  const slugs = projects.map(p => p.slug).filter(Boolean) as string[];
  if (slugs.length) {
    await prisma.project.deleteMany({ where: { profileId, slug: { notIn: slugs } } });
  } else {
    await prisma.project.deleteMany({ where: { profileId } });
  }

  for (const proj of projects) {
    const tagRecords = await ensureTags((proj.tags as string[]) || []);
    await prisma.project.upsert({
      where: { slug: proj.slug as string },
      update: {
        profileId,
        title: proj.title as string,
        description: (proj.description ?? null) as string | null,
        coverImage: (proj.coverImage ?? null) as string | null,
        url: (proj.url ?? null) as string | null,
        repoUrl: (proj.repoUrl ?? null) as string | null,
        startDate: parseDate(proj.startDate) as Date | null,
        endDate: parseDate(proj.endDate) as Date | null,
        tags: { set: [], connect: tagRecords.map(t => ({ id: t.id })) },
      },
      create: {
        profileId,
        title: proj.title as string,
        slug: proj.slug as string,
        description: (proj.description ?? null) as string | null,
        coverImage: (proj.coverImage ?? null) as string | null,
        url: (proj.url ?? null) as string | null,
        repoUrl: (proj.repoUrl ?? null) as string | null,
        startDate: parseDate(proj.startDate) as Date | null,
        endDate: parseDate(proj.endDate) as Date | null,
        tags: { connect: tagRecords.map(t => ({ id: t.id })) },
      },
    });
  }
}

async function replaceSocialLinks(profileId: string, socialLinks: SeedSocialLink[] = []) {
  await prisma.socialLink.deleteMany({ where: { profileId } });
  if (!socialLinks.length) return;
  await prisma.socialLink.createMany({
    data: socialLinks.map((s, idx) => ({
      profileId,
      platform: s.platform as string,
      url: s.url as string,
      order: (s.order ?? idx) as number,
    })),
  });
}

async function replaceEducations(profileId: string, educations: SeedEducation[] = []) {
  await prisma.education.deleteMany({ where: { profileId } });
  if (!educations.length) return;
  await prisma.education.createMany({
    data: educations.map((e) => ({
      profileId,
      institution: e.institution as string,
      degree: e.degree as string,
      field: (e.field ?? null) as string | null,
      startDate: parseDate(e.startDate) as Date | null,
      endDate: parseDate(e.endDate) as Date | null,
      grade: (e.grade ?? null) as string | null,
    })),
  });
}

async function main() {
  const filePath = join(__dirname, "data.json");
  const raw = await readFile(filePath, "utf8");
  const json = JSON.parse(raw) as SeedData;

  const user = await upsertUser(json.user || {} as SeedUser);
  console.log("Upserted user:", { id: user.id, email: user.email, username: user.username });

  const profile = await upsertProfile(user.id, json.profile || ({} as SeedProfile));
  console.log("Upserted profile:", { id: profile.id, fullName: profile.fullName });

  await replaceSkills(profile.id, json.skills || []);
  console.log("Synced skills:", (json.skills || []).length);

  await replaceExperiences(profile.id, json.experiences || []);
  console.log("Synced experiences:", (json.experiences || []).length);

  await replaceEducations(profile.id, json.educations || []);
  console.log("Synced educations:", (json.educations || []).length);

  await replaceProjects(profile.id, json.projects || []);
  console.log("Synced projects:", (json.projects || []).length);

  await replaceSocialLinks(profile.id, json.socialLinks || []);
  console.log("Synced socialLinks:", (json.socialLinks || []).length);
}

main()
  .then(() => {
    console.log("Seed completed successfully.");
  })
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
