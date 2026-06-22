"use client";

import * as React from "react";
import type { ProjectCategoryData, ProjectData } from "@/features/landing/data";
import { ExternalLink, Github, Code2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CoreImg } from "@/components/core/img";

const ALL_TAB = "all" as const;

function filterProjects(
  projects: ProjectData[],
  tab: string,
): ProjectData[] {
  if (tab === ALL_TAB) return projects;
  return projects.filter((p) => p.categoryId === tab);
}

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group relative flex flex-col rounded-3xl bg-muted/30 border border-border/50 overflow-hidden hover:border-primary/50 transition-colors duration-500"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {project.coverImage ? (
          <CoreImg
            src={project.coverImage}
            alt={project.title}
            imgClassName="transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5">
            <Code2 className="h-16 w-16 text-primary/20" />
          </div>
        )}

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

          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            {project.url && (
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            )}
          </div>

          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-border/50">
          {project.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.skills.slice(0, 4).map((skill, idx) => (
                <span key={idx} className="text-xs text-muted-foreground">
                  {skill.name}
                  {idx < Math.min(project.skills.length, 4) - 1 && (
                    <span className="mx-1.5 text-border">•</span>
                  )}
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

export function ProjectsSection({
  projects,
  projectCategories,
}: {
  projects: ProjectData[];
  projectCategories: ProjectCategoryData[];
}) {
  const tabs = React.useMemo(
    () => [
      { value: ALL_TAB, label: "All" },
      ...projectCategories.map((c) => ({ value: c.id, label: c.name })),
    ],
    [projectCategories],
  );

  const [activeTab, setActiveTab] = React.useState<string>(ALL_TAB);

  const filteredProjects = React.useMemo(
    () => filterProjects(projects, activeTab),
    [projects, activeTab],
  );

  const emptyMessage = React.useMemo(() => {
    if (activeTab === ALL_TAB) return "No projects to display yet.";
    const category = projectCategories.find((c) => c.id === activeTab);
    return category
      ? `No ${category.name.toLowerCase()} projects yet.`
      : "No projects in this category yet.";
  }, [activeTab, projectCategories]);

  if (!projects.length) return null;

  return (
    <section id="projects" className="container mx-auto px-3 py-20 md:py-32">
      <div className="mx-auto max-w-7xl space-y-16">
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

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full gap-8"
        >
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <TabsList
              className={cn(
                "h-auto w-full shrink-0 justify-start gap-1 overflow-x-auto p-1",
                "md:w-48 md:flex-col md:items-stretch md:overflow-visible",
              )}
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "shrink-0 px-4",
                    "md:w-full md:flex-none md:justify-start",
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait">
                {filteredProjects.length > 0 ? (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-8"
                  >
                    {filteredProjects.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.p
                    key={`empty-${activeTab}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-dashed border-border/60 bg-muted/20 px-6 py-16 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
