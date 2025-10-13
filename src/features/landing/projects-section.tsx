import * as React from "react";
import type { ProjectData } from "@/features/landing/data";
import { ExternalLink, Github, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Dummy data to show when no projects exist
const dummyProjects: ProjectData[] = [
  {
    id: "dummy-1",
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    description: "A full-featured e-commerce platform with payment integration, inventory management, and analytics dashboard. Built with Next.js, Prisma, and Stripe.",
    coverImage: null,
    url: "https://example.com",
    repoUrl: "https://github.com/example/ecommerce",
    tags: [{ name: "Web App" }, { name: "E-Commerce" }],
    skills: [{ name: "Next.js" }, { name: "Prisma" }, { name: "Stripe" }],
  },
  {
    id: "dummy-2",
    title: "Task Management App",
    slug: "task-manager",
    description: "Real-time collaborative task management application with team features, notifications, and advanced filtering. Supports drag-and-drop and Kanban boards.",
    coverImage: null,
    url: null,
    repoUrl: "https://github.com/example/task-manager",
    tags: [{ name: "SaaS" }, { name: "Productivity" }],
    skills: [{ name: "React" }, { name: "Node.js" }, { name: "Socket.io" }],
  },
  {
    id: "dummy-3",
    title: "AI Content Generator",
    slug: "ai-content-generator",
    description: "AI-powered content generation tool leveraging GPT models for creating blog posts, social media content, and marketing copy with customizable tones and styles.",
    coverImage: null,
    url: "https://example.com/ai",
    repoUrl: null,
    tags: [{ name: "AI/ML" }, { name: "SaaS" }],
    skills: [{ name: "TypeScript" }, { name: "OpenAI" }, { name: "PostgreSQL" }],
  },
];

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="group relative rounded-2xl bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all overflow-hidden">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Cover image or placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <Code2 className="h-16 w-16 text-muted-foreground/30" />
        )}
      </div>

      <div className="relative p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold">{project.title}</h3>

        {/* Description */}
        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        )}

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Skills */}
        {project.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-md bg-muted/50 px-2 py-1 text-xs backdrop-blur-sm"
              >
                {skill.name}
              </span>
            ))}
            {project.skills.length > 4 && (
              <span className="inline-flex items-center rounded-md bg-muted/50 px-2 py-1 text-xs backdrop-blur-sm">
                +{project.skills.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-2 pt-2">
          {project.url && (
            <Button size="sm" variant="outline" asChild className="gap-2">
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button size="sm" variant="ghost" asChild className="gap-2">
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                Code
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection({ projects }: { projects: ProjectData[] }) {
  const displayProjects = projects.length > 0 ? projects : dummyProjects;

  return (
    <section id="projects" className="container mx-auto px-3 py-16 md:py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Section header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A selection of projects that showcase my skills and experience
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
