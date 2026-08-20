"use client";

import * as React from "react";
import type { ProjectCategoryData, ProjectData } from "@/features/landing/data";
import { format } from "date-fns";
import { ExternalLink, Github, Code2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CoreImg } from "@/components/core/img";
import { normalizeSkillIcon } from "@/constants/icons";

const ALL_TAB = "all" as const;

function filterProjects(
  projects: ProjectData[],
  tab: string,
): ProjectData[] {
  if (tab === ALL_TAB) return projects;
  return projects.filter((p) => p.categoryId === tab);
}

function getProjectGallery(project: ProjectData): string[] {
  return Array.from(
    new Set([project.coverImage, ...project.images].filter(Boolean) as string[]),
  );
}

function formatProjectDateRange(project: ProjectData): string | null {
  if (!project.startDate && !project.endDate) return null;

  const start = project.startDate
    ? format(new Date(project.startDate), "MMM yyyy")
    : null;
  const end = project.endDate
    ? format(new Date(project.endDate), "MMM yyyy")
    : "Present";

  return start ? `${start} - ${end}` : end;
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectData;
  index: number;
  onOpen: (project: ProjectData) => void;
}) {
  const visibleSkills = project.skills.slice(0, 4);
  const remainingSkills = project.skills.length - visibleSkills.length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="h-full"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(project);
        }
      }}
    >
      <Card className="group h-full overflow-hidden rounded-md border-border/60 bg-card/70 py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-black/10">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          {project.coverImage ? (
            <CoreImg
              src={project.coverImage}
              alt={project.title}
              imgClassName="transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted">
              <div className="absolute inset-0 bg-primary/5" />
              <div className="relative flex size-16 items-center justify-center rounded-md border border-border/70 bg-background/50">
                <Code2 className="size-8 text-muted-foreground" />
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />

          {(project.url || project.repoUrl) && (
            <div className="absolute right-3 top-3 flex gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
              {project.url && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="size-9 rounded-md border border-border/70 bg-background/80 backdrop-blur"
                  asChild
                >
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <ExternalLink className="size-4" />
                  </Link>
                </Button>
              )}
              {project.repoUrl && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="size-9 rounded-md border border-border/70 bg-background/80 backdrop-blur"
                  asChild
                >
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Github className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col gap-5 p-5">
          <div className="flex flex-wrap gap-2">
            {project.category && (
              <Badge variant="secondary" className="rounded-md bg-primary/10 text-primary">
                {project.category.name}
              </Badge>
            )}
            {project.statusBadges.slice(0, 3).map((badge) => (
              <Badge
                key={badge}
                variant="outline"
                className="rounded-md border-border/70 bg-background/40 text-muted-foreground"
              >
                {badge}
              </Badge>
            ))}
            {project.tags.slice(0, Math.max(0, 4 - project.statusBadges.length)).map((tag) => (
              <Badge
                key={tag.name}
                variant="outline"
                className="rounded-md border-border/70 bg-background/40 text-muted-foreground"
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              {project.url && (
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              )}
            </div>

            {project.description && (
              <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>
            )}
            {project.impact ? (
              <p className="line-clamp-2 text-xs leading-5 text-foreground/80">
                {project.impact}
              </p>
            ) : null}
          </div>

          {project.skills.length > 0 && (
            <div className="mt-auto border-t border-border/60 pt-4">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                {visibleSkills.map((skill, idx) => (
                  <React.Fragment key={skill.id}>
                    <span className="inline-flex items-center gap-1">
                      {skill.icon ? (
                        <Image
                          src={normalizeSkillIcon(skill.icon) ?? ""}
                          alt=""
                          width={12}
                          height={12}
                          className="object-contain"
                        />
                      ) : null}
                      <span>{skill.name}</span>
                    </span>
                    {idx < visibleSkills.length - 1 && (
                      <span className="text-border">•</span>
                    )}
                  </React.Fragment>
                ))}
                {remainingSkills > 0 && (
                  <>
                    {visibleSkills.length > 0 && <span className="text-border">•</span>}
                    <span>+{remainingSkills} more</span>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.article>
  );
}

function ProjectsPanel({
  projects,
  emptyMessage,
  onOpenProject,
}: {
  projects: ProjectData[];
  emptyMessage: string;
  onOpenProject: (project: ProjectData) => void;
}) {
  return (
    <AnimatePresence mode="wait">
      {projects.length > 0 ? (
        <motion.div
          key={projects.map((project) => project.id).join("-")}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid gap-5 lg:grid-cols-2"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={onOpenProject}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex min-h-64 items-center justify-center rounded-md border border-dashed border-border/70 bg-muted/20 px-6 py-14 text-center"
        >
          <div className="max-w-sm space-y-2">
            <Code2 className="mx-auto size-8 text-muted-foreground/70" />
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getProjectCount(projects: ProjectData[], tab: string): number {
  return filterProjects(projects, tab).length;
}

function getEmptyMessage(
  activeTab: string,
  projectCategories: ProjectCategoryData[],
): string {
  if (activeTab === ALL_TAB) return "No projects to display yet.";
  const category = projectCategories.find((c) => c.id === activeTab);
  return category
    ? `No ${category.name.toLowerCase()} projects yet.`
    : "No projects in this category yet.";
}

function TabLabel({
  label,
  count,
}: {
  label: string;
  count: number;
}) {
  return (
    <>
      <span className="truncate">{label}</span>
      <span className="ml-auto rounded-md bg-background/60 px-1.5 py-0.5 text-[11px] text-muted-foreground transition-colors group-data-[state=active]:bg-primary/10 group-data-[state=active]:text-primary">
        {count}
      </span>
    </>
  );
}

function ProjectImage({
  src,
  title,
  className,
}: {
  src?: string | null;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {src ? (
        <CoreImg src={src} alt={title} imgClassName="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="relative flex size-16 items-center justify-center rounded-md border border-border/70 bg-background/50">
            <Code2 className="size-8 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectDetailModal({
  project,
  onOpenChange,
}: {
  project: ProjectData | null;
  onOpenChange: (open: boolean) => void;
}) {
  const gallery = React.useMemo(
    () => (project ? getProjectGallery(project) : []),
    [project],
  );
  const [activeImage, setActiveImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    setActiveImage(gallery[0] ?? null);
  }, [gallery, project?.id]);

  if (!project) return null;

  const dateRange = formatProjectDateRange(project);

  return (
    <Dialog open={!!project} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] overflow-y-auto rounded-md p-0 sm:w-[calc(100vw-2rem)] sm:max-w-[1280px]">
        <DialogHeader className="sr-only">
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>
            Detailed project information and gallery.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div className="border-b bg-muted/30 lg:border-b-0 lg:border-r">
            <ProjectImage
              src={activeImage}
              title={project.title}
              className="aspect-video lg:aspect-auto lg:min-h-[560px]"
            />

            {gallery.length > 1 ? (
              <div className="flex gap-2 overflow-x-auto border-t bg-background/80 p-3">
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={cn(
                      "relative h-16 w-24 shrink-0 overflow-hidden rounded-md border bg-muted transition-colors",
                      activeImage === image
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border/70 hover:border-primary/50",
                    )}
                    aria-label={`Show project image ${index + 1}`}
                  >
                    <CoreImg src={image} alt={`${project.title} image ${index + 1}`} />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-6 p-5 sm:p-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.category ? (
                  <Badge variant="secondary" className="rounded-md bg-primary/10 text-primary">
                    {project.category.name}
                  </Badge>
                ) : null}
                {dateRange ? (
                  <Badge variant="outline" className="rounded-md text-muted-foreground">
                    {dateRange}
                  </Badge>
                ) : null}
                {project.statusBadges.map((badge) => (
                  <Badge key={badge} variant="outline" className="rounded-md text-muted-foreground">
                    {badge}
                  </Badge>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {project.title}
                </h3>
                {project.description ? (
                  <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                    {project.description}
                  </p>
                ) : null}
                {project.role ? (
                  <p className="text-sm leading-6 text-foreground">
                    <span className="font-medium">My role:</span> {project.role}
                  </p>
                ) : null}
                {project.impact ? (
                  <p className="text-sm leading-6 text-foreground">
                    <span className="font-medium">Impact:</span> {project.impact}
                  </p>
                ) : null}
              </div>
            </div>

            {project.caseStudy ? (
              <div className="space-y-4 rounded-md border bg-muted/20 p-4">
                {project.caseStudy.problem ? (
                  <div className="space-y-1">
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Problem
                    </div>
                    <p className="text-sm leading-6">{project.caseStudy.problem}</p>
                  </div>
                ) : null}
                {project.caseStudy.features?.length ? (
                  <div className="space-y-2">
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Key Features
                    </div>
                    <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
                      {project.caseStudy.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {project.caseStudy.challenges?.length ? (
                  <div className="space-y-2">
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Challenges
                    </div>
                    <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
                      {project.caseStudy.challenges.map((challenge) => (
                        <li key={challenge}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {project.caseStudy.result ? (
                  <div className="space-y-1">
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Result
                    </div>
                    <p className="text-sm leading-6">{project.caseStudy.result}</p>
                  </div>
                ) : null}
              </div>
            ) : null}

            {project.tags.length > 0 ? (
              <div className="space-y-2">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag.name}
                      variant="outline"
                      className="rounded-md border-border/70 bg-background/40"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            {project.skills.length > 0 ? (
              <div className="space-y-2">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Skills
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="rounded-md bg-muted text-muted-foreground"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {skill.icon ? (
                          <Image
                            src={normalizeSkillIcon(skill.icon) ?? ""}
                            alt=""
                            width={14}
                            height={14}
                            className="object-contain"
                          />
                        ) : (
                          <Code2 className="size-3.5" />
                        )}
                        {skill.name}
                      </span>
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            {(project.url || project.repoUrl) && (
              <div className="mt-auto flex flex-wrap gap-2 border-t pt-5">
                {project.url ? (
                  <Button asChild>
                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 size-4" />
                      Live project
                    </Link>
                  </Button>
                ) : null}
                {project.repoUrl ? (
                  <Button variant="outline" asChild>
                    <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 size-4" />
                      Repository
                    </Link>
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
  const [selectedProject, setSelectedProject] = React.useState<ProjectData | null>(null);

  if (!projects.length) return null;

  return (
    <section id="projects" className="container mx-auto px-4 py-20 md:py-32">
      <div className="mx-auto max-w-7xl space-y-12">
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
          orientation="vertical"
          className="w-full"
        >
          <div className="sticky top-16 z-20 rounded-md border border-border/60 bg-background/95 p-1.5 backdrop-blur lg:hidden">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="h-11 w-full rounded-md">
                <SelectValue placeholder="Filter projects" />
              </SelectTrigger>
              <SelectContent>
                {tabs.map((tab) => (
                  <SelectItem key={tab.value} value={tab.value}>
                    {tab.label} ({getProjectCount(projects, tab.value)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-8">
            <TabsList
              className={cn(
                "hidden h-auto w-full justify-start gap-2 overflow-x-auto rounded-md border border-border/60 bg-muted/20 p-1.5",
                "lg:sticky lg:top-24 lg:flex-col lg:items-stretch lg:self-start lg:overflow-visible",
                "lg:flex",
              )}
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "group h-auto flex-none justify-start gap-3 rounded-md px-3 py-2.5 text-left text-sm",
                    "data-[state=active]:border-primary/30 data-[state=active]:bg-background data-[state=active]:text-foreground",
                    "lg:w-full lg:flex-none",
                  )}
                >
                  <TabLabel
                    label={tab.label}
                    count={getProjectCount(projects, tab.value)}
                  />
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="min-w-0">
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="mt-0 focus-visible:outline-none"
                >
                  <ProjectsPanel
                    projects={filterProjects(projects, tab.value)}
                    emptyMessage={getEmptyMessage(tab.value, projectCategories)}
                    onOpenProject={setSelectedProject}
                  />
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      />
    </section>
  );
}
