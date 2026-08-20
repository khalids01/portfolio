import { prisma } from "@/lib/prisma";
import { skycanvas } from "@/lib/skycanvas";

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
  session: {
    userId: string;
    name?: string | null;
    image?: string | null;
    role?: "ADMIN" | "USER";
  } | null;
};

export async function getLandingData(): Promise<LandingData> {
  // Get session (for header right-side logic)
  const session = (await skycanvas.auth()).session;

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

  let sessionData: LandingData["session"] = null;
  if (session) {
    const u = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true, name: true, image: true },
    });
    sessionData = {
      userId: session.user.id,
      name: u?.name ?? session.user.name,
      image: u?.image ?? session.user.image,
      role: u?.role,
    };
  }

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
    session: sessionData,
  };
}
