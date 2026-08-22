import "server-only";
import { prisma } from "@/lib/prisma";

export async function getAgentTextData() {
  const profile = await prisma.profile.findFirst({
    orderBy: { updatedAt: "desc" },
    include: {
      skills: { orderBy: [{ category: "asc" }, { order: "asc" }] },
      experiences: {
        orderBy: { startDate: "desc" },
        include: {
          highlights: true,
          skills: { orderBy: { order: "asc" }, select: { name: true } },
          category: { select: { name: true } },
        },
      },
      educations: { orderBy: { endDate: "desc" } },
      projects: {
        orderBy: [{ featuredRank: "asc" }, { startDate: "desc" }],
        include: {
          tags: true,
          skills: { orderBy: { order: "asc" }, select: { name: true } },
          category: { select: { name: true } },
          experience: { select: { company: true, role: true } },
        },
      },
      socialLinks: { orderBy: { order: "asc" } },
    },
  });

  if (!profile) throw new Error("Profile not found");

  const resumes = await prisma.resume.findMany({
    orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }],
    select: {
      slug: true,
      title: true,
      targetRole: true,
      isDefault: true,
      data: true,
    },
  });

  return {
    generatedAt: new Date().toISOString(),
    profile: {
      name: profile.fullName,
      headline: profile.headline,
      bio: profile.bio,
      location: profile.location,
      email: profile.emailPublic,
      links: {
        website: profile.websiteUrl,
        github: profile.githubUrl,
        linkedin: profile.linkedinUrl,
      },
      tags: profile.tags,
    },
    skills: profile.skills,
    experience: profile.experiences,
    education: profile.educations,
    projects: profile.projects,
    socialLinks: profile.socialLinks,
    resumes,
  };
}

function bullets(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}
function date(value: Date | null | undefined) {
  return value ? value.toISOString().slice(0, 10) : "Present";
}

export function agentTextToMarkdown(
  data: Awaited<ReturnType<typeof getAgentTextData>>,
) {
  const { profile } = data;
  const skills = data.skills
    .map((skill) => `- ${skill.name} (${skill.category})`)
    .join("\n");
  const experience = data.experience
    .map((item) =>
      [
        `### ${item.role} — ${item.company}`,
        `**${date(item.startDate)} to ${item.current ? "Present" : date(item.endDate)}**${item.location ? ` · ${item.location}` : ""}`,
        item.description ?? "",
        item.category?.name ? `Category: ${item.category.name}` : "",
        bullets(item.highlights.map((highlight) => highlight.text)),
        item.skills.length
          ? `Skills: ${item.skills.map((skill) => skill.name).join(", ")}`
          : "",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");
  const projects = data.projects
    .map((item) =>
      [
        `### ${item.title}`,
        item.description ?? "",
        item.role ? `Role: ${item.role}` : "",
        item.impact ? `Impact: ${item.impact}` : "",
        item.category?.name ? `Category: ${item.category.name}` : "",
        item.skills.length
          ? `Skills: ${item.skills.map((skill) => skill.name).join(", ")}`
          : "",
        item.tags.length
          ? `Tags: ${item.tags.map((tag) => tag.name).join(", ")}`
          : "",
        item.url ? `Project URL: ${item.url}` : "",
        item.repoUrl ? `Repository: ${item.repoUrl}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");
  const education = data.education
    .map(
      (item) =>
        `- ${item.degree}${item.field ? ` in ${item.field}` : ""} — ${item.institution}${item.endDate ? ` (${date(item.endDate)})` : ""}`,
    )
    .join("\n");
  const resumes = data.resumes
    .map(
      (resume) =>
        `### ${resume.title}${resume.targetRole ? ` — ${resume.targetRole}` : ""}\n\n\`\`\`json\n${JSON.stringify(resume.data, null, 2)}\n\`\`\``,
    )
    .join("\n\n");
  return [
    `# ${profile.name}`,
    `> ${profile.headline}`,
    profile.bio ?? "",
    profile.location ? `Location: ${profile.location}` : "",
    profile.email ? `Email: ${profile.email}` : "",
    "",
    "## Skills",
    skills,
    "",
    "## Experience",
    experience,
    "",
    "## Education",
    education,
    "",
    "## Projects",
    projects,
    "",
    "## Links",
    ...data.socialLinks.map((link) => `- ${link.platform}: ${link.url}`),
    "",
    "## Resume variants",
    resumes,
  ]
    .filter(Boolean)
    .join("\n");
}
