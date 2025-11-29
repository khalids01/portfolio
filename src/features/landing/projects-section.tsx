"use client";

import * as React from "react";
import type { ProjectData } from "@/features/landing/data";
import { ExternalLink, Github, Code2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col rounded-3xl bg-muted/30 border border-border/50 overflow-hidden hover:border-primary/50 transition-colors duration-500"
    >
      {/* Cover image or placeholder */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5">
            <Code2 className="h-16 w-16 text-primary/20" />
          </div>
        )}
        
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.url && (
            <Button size="icon" variant="secondary" className="rounded-full h-12 w-12" asChild>
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-5 w-5" />
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button size="icon" variant="secondary" className="rounded-full h-12 w-12" asChild>
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6 space-y-6">
        <div className="space-y-3">
          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            {project.url && (
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            )}
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        {/* Skills footer */}
        <div className="mt-auto pt-4 border-t border-border/50">
          {project.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs text-muted-foreground"
                >
                  {skill.name}
                  {idx < Math.min(project.skills.length, 4) - 1 && <span className="mx-1.5 text-border">•</span>}
                </span>
              ))}
              {project.skills.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  <span className="mx-1.5 text-border">•</span>
                  +{project.skills.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection({ projects }: { projects: ProjectData[] }) {
  if (!projects.length) return null;

  return (
    <section id="projects" className="container mx-auto px-3 py-20 md:py-32">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Section header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            A selection of projects that showcase my skills and experience
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
