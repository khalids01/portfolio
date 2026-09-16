import type { SeedScript } from "../types";
import {
  PROJECT_CATEGORY,
  PROJECT_STATUS,
  PROJECT_TAG,
  SKILL,
} from "../portfolio-constants";
import { upsertProject } from "../utils";

export const diskVacuumProjectSeed: SeedScript = {
  id: "projects/disk-vacuum",
  label: "Project: DiskVacuum",
  group: "projects",
  order: 47,
  dependsOn: ["profile/default", "skills/default", "categories/project"],
  async run({ prisma }) {
    await upsertProject(prisma, {
      title: "DiskVacuum",
      slug: "disk-vacuum",
      coverImage: "/projects/disk-vacuum/overview.png",
      images: [
        "/projects/disk-vacuum/overview.png",
        "/projects/disk-vacuum/storage-overview-map.png",
        "/projects/disk-vacuum/storage-by-category.png",
        "/projects/disk-vacuum/storage-directories-in-map.png",
        "/projects/disk-vacuum/file-explorer.png",
        "/projects/disk-vacuum/inspect-and-add-to-cleanup-queue.png",
        "/projects/disk-vacuum/cleanup.png",
        "/projects/disk-vacuum/review-and-finally-cleanup.png",
      ],
      url: "https://diskvacuum.skycanvasstudio.com/",
      repoUrl: "https://github.com/khalids01/disk-vacuum",
      description:
        "Open-source, local-first native desktop application for understanding disk usage, exploring storage visually, finding safe cleanup opportunities, and reclaiming space through review-first workflows.",
      categorySlug: PROJECT_CATEGORY.NATIVE_APPLICATIONS.slug,
      statusBadges: [
        PROJECT_STATUS.ACTIVE_RND,
        PROJECT_TAG.OPEN_SOURCE,
        "Local-First",
        "Native Desktop",
      ],
      featuredRank: 8,
      role:
        "Designed and built the native desktop product end to end: the React and TypeScript interface, filesystem-analysis workflows, persistent scan experience, cleanup review and validation flows, release automation, and in-app update experience.",
      impact:
        "Turns disk cleanup from a risky delete-first task into an understandable, reviewable workflow. Users can inspect what consumes storage, compare cleanup candidates, and remove only explicitly selected files after final validation.",
      skillSlugs: [
        SKILL.TYPESCRIPT.slug,
        SKILL.REACT.slug,
        SKILL.BUN.slug,
        SKILL.TANSTACK_QUERY.slug,
        SKILL.TANSTACK_ROUTER.slug,
        SKILL.TAILWIND_CSS.slug,
        SKILL.CI_CD.slug,
        SKILL.SYSTEM_DESIGN.slug,
        SKILL.PERFORMANCE_OPTIMIZATION.slug,
      ],
      tags: [
        "Native Desktop",
        "Disk Analyzer",
        "Storage Management",
        "Local-First",
        "Filesystem Safety",
        "Data Visualization",
        "Tauri",
        PROJECT_TAG.OPEN_SOURCE,
      ],
      experienceSlug: null,
      caseStudy: {
        problem:
          "Disk cleanup tools can make it difficult to understand what is consuming storage and can encourage irreversible deletion without enough context. Personal files, operating-system paths, symbolic links, changed files, and duplicate groups all require different safety decisions.",
        role:
          "Built the application experience and product architecture, including filesystem scan flows, durable scan results, visual exploration, duplicate analysis, cleanup review, platform-aware safety rules, and release/update infrastructure.",
        architecture: [
          "Native desktop shell connecting a React and TypeScript interface to local filesystem capabilities",
          "Local filesystem traversal, file classification, storage-capacity calculation, hashing, validation, and cleanup policy",
          "Compact durable scan repository that preserves completed scan data across application restarts",
          "TanStack Router file-based navigation and TanStack Query data synchronization",
          "Zustand stores for cross-screen interface state, scan state, cleanup selection, and theme preferences",
          "Interactive proportional treemap data pipeline for directory and storage visualization",
          "Signed updater configuration with GitHub Releases distribution",
        ],
        features: [
          "Scan the full system, home directory, or a selected folder",
          "Live scan progress with phases, file and folder counters, processed size, cancellation, and completion feedback",
          "Persistent scan index that remains available after restarting the application",
          "Storage capacity reporting that distinguishes total, used, physically free, user-available, and system-reserved space",
          "Interactive storage treemap and directory exploration",
          "Global indexed search across scanned files and folders",
          "Large-file discovery with conservative safety classification",
          "Duplicate detection using metadata, partial hashes, and full content confirmation",
          "Developer artifact, AI storage, and removed-application leftover discovery",
          "Shared cleanup queue with non-overlapping reclaimable-size calculation",
          "Final cleanup review grouped by source and consequence",
          "Immediate revalidation before moving supported files to the operating-system Trash",
          "System, light, and dark theme support",
          "In-app update checks, download progress, install, and restart support",
        ],
        challenges: [
          "Scanning large filesystems without blocking the native interface while still giving users useful progress and cancellation feedback.",
          "Persisting enough scan data for responsive exploration, search, treemap rendering, and analysis without retaining an unnecessarily expensive recursive structure.",
          "Making duplicate detection trustworthy by filtering candidates with metadata and partial hashes before confirming equal content.",
          "Preventing unsafe cleanup through protected-path rules, symbolic-link rejection, changed-file validation, scan-scope checks, and mandatory final review.",
          "Avoiding misleading storage claims by separating physically free space, user-available space, system-reserved space, and non-overlapping cleanup candidates.",
          "Designing releases and updates for Linux, macOS, and Windows desktop targets while keeping Android as a future platform.",
        ],
        result:
          "An active open-source native storage-management application that keeps scanning and analysis local, makes disk usage visual and explorable, and guides users through conservative, review-first cleanup. DiskVacuum targets Linux, macOS, and Windows desktops; Android support is planned for a later release.",
      },
    });
  },
};
