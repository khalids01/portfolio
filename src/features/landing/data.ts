import { prisma } from "@/lib/prisma";
import seedData from "../../../prisma/data.json";

export type SkillData = {
  id: string;
  name: string;
  category: string;
  icon?: string | null;
  level?: number | null;
  experienceYears?: number | null;
  experienceMonths?: number | null;
};

export type ExperienceData = {
  id: string;
  company: string;
  role: string;
  location?: string | null;
  startDate: Date;
  endDate?: Date | null;
  current: boolean;
  description?: string | null;
  coverImage?: string | null;
  images: string[];
  category: { id: string; name: string; slug: string } | null;
  highlights: Array<{ text: string }>;
  skills: Array<{ id: string; name: string; icon: string | null }>;
  projects: Array<{ id: string; title: string; slug: string }>;
};

export type ProjectCategoryData = {
  id: string;
  name: string;
  slug: string;
  order: number;
};

export type ProjectData = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  coverImage?: string | null;
  images: string[];
  url?: string | null;
  repoUrl?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  categoryId: string | null;
  category: { id: string; name: string; slug: string } | null;
  tags: Array<{ name: string }>;
  skills: Array<{
    id: string;
    name: string;
    icon: string | null;
    category: string;
  }>;
  statusBadges: string[];
  featuredRank?: number | null;
  role?: string | null;
  impact?: string | null;
  caseStudy?: {
    problem?: string;
    role?: string;
    architecture?: string[];
    features?: string[];
    challenges?: string[];
    result?: string;
  } | null;
};

function normalizeProjectImages(images: unknown): string[] {
  if (!Array.isArray(images)) return [];
  return images.filter(
    (image): image is string =>
      typeof image === "string" && image.trim().length > 0,
  );
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0,
  );
}

function normalizeCaseStudy(value: unknown): ProjectData["caseStudy"] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as ProjectData["caseStudy"];
}

export type LandingData = {
  name: string;
  title: string;
  bio: string;
  location?: string | null;
  emailPublic?: string | null;
  resumeUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  skills: SkillData[];
  experiences: ExperienceData[];
  projects: ProjectData[];
  projectCategories: ProjectCategoryData[];
  socialLinks: Array<{ platform: string; url: string }>;
};

function getBuildFallbackLandingData(): LandingData {
  const projectCategories = seedData.categories
    .filter((category) => category.categoryType === "project")
    .map((category) => ({
      id: `build-category-${category.slug}`,
      name: category.name,
      slug: category.slug,
      order: category.order,
    }));
  const categoryBySlug = new Map(
    projectCategories.map((category) => [category.slug, category]),
  );

  return {
    name: seedData.profile.fullName,
    title: seedData.profile.headline,
    bio: seedData.profile.bio,
    location: seedData.profile.location,
    emailPublic: seedData.profile.emailPublic,
    resumeUrl: seedData.profile.resumeUrl,
    githubUrl: seedData.profile.githubUrl,
    linkedinUrl: seedData.profile.linkedinUrl,
    skills: seedData.skills.map((skill, index) => ({
      id: `build-skill-${index}`,
      name: skill.name,
      category: skill.category,
      icon: null,
      level: null,
      experienceYears: null,
      experienceMonths: null,
    })),
    experiences: seedData.experiences.map((experience, index) => ({
      id: `build-experience-${index}`,
      company: experience.company,
      role: experience.role,
      location: experience.location,
      startDate: new Date(experience.startDate),
      endDate: experience.endDate ? new Date(experience.endDate) : null,
      current: experience.current,
      description: experience.description,
      coverImage: null,
      images: [],
      category: null,
      highlights: experience.highlights.map((text) => ({ text })),
      skills: [],
      projects: [],
    })),
    projects: seedData.projects.map((project, index) => {
      const category = categoryBySlug.get(project.categorySlug) ?? null;

      return {
        id: `build-project-${index}`,
        title: project.title,
        slug: project.slug,
        description: project.description,
        coverImage: project.coverImage,
        images: [],
        url: project.url,
        repoUrl: project.repoUrl,
        startDate: project.startDate ? new Date(project.startDate) : null,
        endDate: project.endDate ? new Date(project.endDate) : null,
        categoryId: category?.id ?? null,
        category,
        tags: project.tags.map((name) => ({ name })),
        skills: [],
        statusBadges: [],
        featuredRank: null,
        role: null,
        impact: null,
        caseStudy: null,
      };
    }),
    projectCategories,
    socialLinks: seedData.socialLinks.map((link) => ({
      platform: link.platform,
      url: link.url,
    })),
  };
}

export async function getLandingData(): Promise<LandingData> {
  // Docker builders do not share the runtime database network. Seed-backed
  // content produces the initial static page; ISR replaces it from Prisma
  // after deployment, where DATABASE_URL points at the private database.
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return getBuildFallbackLandingData();
  }

  // Choose the portfolio owner profile. For now, pick the most recently updated.
  const profile = await prisma.profile.findFirst({
    orderBy: { updatedAt: "desc" },
    include: {
      user: true,
      skills: { orderBy: { order: "asc" } },
      experiences: {
        orderBy: { startDate: "desc" },
        include: {
          highlights: true,
          category: { select: { id: true, name: true, slug: true } },
          skills: { orderBy: { order: "asc" }, select: { id: true, name: true, icon: true } },
          projects: { select: { id: true, title: true, slug: true } },
        },
      },
      projects: {
        orderBy: [{ featuredRank: "asc" }, { startDate: "desc" }],
        include: {
          tags: true,
          skills: {
            orderBy: { order: "asc" },
            select: { id: true, name: true, icon: true, category: true },
          },
          category: { select: { id: true, name: true, slug: true } },
          experience: { select: { id: true, slug: true, company: true, role: true } },
        },
      },
      categories: {
        where: { categoryType: "project" },
        orderBy: { order: "asc" },
      },
      socialLinks: { orderBy: { order: "asc" } },
    },
  });

  const name = profile?.fullName || profile?.user?.name || "Your Name";
  const title = profile?.headline || "Full Stack Developer";
  const bio = profile?.bio || "I build modern, reliable web applications with an eye for performance and UX.";
  const location = profile?.location;
  const emailPublic = profile?.emailPublic;
  const githubUrl = profile?.githubUrl;
  const linkedinUrl = profile?.linkedinUrl;

  const skills: SkillData[] = (profile?.skills || []).map((s) => ({
    id: s.id,
    name: s.name,
    category: s.category,
    icon: s.icon,
    level: s.level,
    experienceYears: s.experienceYears,
    experienceMonths: s.experienceMonths,
  }));

  const experiences: ExperienceData[] = (profile?.experiences || []).map((e) => ({
    id: e.id,
    company: e.company,
    role: e.role,
    location: e.location,
    startDate: e.startDate,
    endDate: e.endDate,
    current: e.current,
    description: e.description,
    coverImage: e.coverImage,
    images: normalizeProjectImages(e.images),
    category: e.category,
    highlights: e.highlights.map((h) => ({ text: h.text })),
    skills: e.skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      icon: skill.icon,
    })),
    projects: e.projects.map((project) => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
    })),
  }));

  const projectCategories: ProjectCategoryData[] = (profile?.categories || []).map(
    (c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      order: c.order,
    }),
  );

  const projects: ProjectData[] = (profile?.projects || []).map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    coverImage: p.coverImage,
    images: normalizeProjectImages(p.images),
    url: p.url,
    repoUrl: p.repoUrl,
    startDate: p.startDate,
    endDate: p.endDate,
    categoryId: p.categoryId,
    category: p.category,
    tags: p.tags.map((t) => ({ name: t.name })),
    skills: p.skills.map((s) => ({
      id: s.id,
      name: s.name,
      icon: s.icon,
      category: s.category,
    })),
    statusBadges: normalizeStringArray(p.statusBadges),
    featuredRank: p.featuredRank,
    role: p.role,
    impact: p.impact,
    caseStudy: normalizeCaseStudy(p.caseStudy),
  }));

  const socialLinks = (profile?.socialLinks || []).map((s) => ({
    platform: s.platform,
    url: s.url,
  }));

  return {
    name,
    title,
    bio,
    location,
    emailPublic,
    githubUrl,
    linkedinUrl,
    skills,
    experiences,
    projects,
    projectCategories,
    socialLinks,
  };
}
