import type { SeedScript } from "../types";
import {
  PROJECT_CATEGORY,
  PROJECT_STATUS,
  PROJECT_TAG,
  SKILL,
} from "../portfolio-constants";
import { upsertProject } from "../utils";

export const serveFileStorageProjectSeed: SeedScript = {
  id: "projects/serve-file-storage",
  label: "Project: Serve file storage",
  group: "projects",
  order: 46,
  dependsOn: ["profile/default", "skills/default", "categories/project"],
  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "Serve",
      slug: "serve-file-storage",
      coverImage: "/projects/file-server/landing.png",
      images: [
        "/projects/file-server/landing.png",
        "/projects/file-server/dashboard.png",
        "/projects/file-server/files-management.png",
        "/projects/file-server/tanent-applications-management.png",
        "/projects/file-server/file-optimization-cache-management.png",
        "/projects/file-server/data-backup-control.png",
      ],
      description:
        "Open-source, self-hosted file storage platform for applications that need secure uploads, media delivery, image optimization, and API-based file management without vendor lock-in.",
      categorySlug: PROJECT_CATEGORY.DEVELOPER_TOOLS.slug,
      statusBadges: [PROJECT_STATUS.ACTIVE_RND, PROJECT_TAG.OPEN_SOURCE, "Self-Hosted"],
      featuredRank: 3,
      role:
        "Designed and built the full-stack product, including multi-tenant application management, secure upload APIs, file management workflows, storage integrations, and the self-hosted deployment setup.",
      impact:
        "Gives developers a practical, self-hosted alternative for handling uploads and media assets across multiple applications, with ownership of both storage infrastructure and data.",
      skillSlugs: [
        SKILL.TYPESCRIPT.slug,
        SKILL.NEXTJS.slug,
        SKILL.REACT.slug,
        SKILL.PRISMA.slug,
        SKILL.DOCKER.slug,
      ],
      tags: [
        "File Storage",
        "Developer Tools",
        PROJECT_TAG.OPEN_SOURCE,
        "S3-Compatible Storage",
        "API Platform",
        "Multi-Tenant",
      ],
      experienceSlug: null,
      caseStudy: {
        problem:
          "Applications need dependable file uploads, media delivery, image transformations, access control, and storage visibility, but third-party storage platforms can create cost, vendor lock-in, and operational constraints.",
        role:
          "Designed and implemented the product architecture, dashboard experience, REST API, authentication, multi-tenant application model, storage layer, and self-hosted deployment workflow.",
        architecture: [
          "Next.js application and API routes",
          "Better Auth magic-link authentication",
          "Prisma data layer",
          "Multi-tenant applications and API keys",
          "Local filesystem or S3-compatible object storage",
          "Image processing and generated variants",
          "Docker-based self-hosted deployment",
        ],
        features: [
          "Secure file uploads through dashboard and REST API",
          "Application-scoped API keys",
          "Multi-tenant application management",
          "File browser with list and grid views",
          "File preview and safe deletion",
          "Image optimization and resize variants",
          "Storage-usage and file-count reporting",
          "Backup, restore, and storage recovery controls",
          "Optimization-cache visibility and clearing",
          "Search, sorting, and audit logs",
          "Interactive API documentation",
        ],
        challenges: [
          "Supporting local and S3-compatible storage while keeping the developer experience consistent.",
          "Making uploaded-file access secure across multiple applications and API keys.",
          "Managing generated image variants, storage usage, backups, and cache cleanup without making operations difficult for self-hosted users.",
        ],
        result:
          "An active open-source file storage platform that provides secure uploads, media management, image optimization, API access, and self-hosted storage control in one developer-focused product.",
      },
    });
  },
};
