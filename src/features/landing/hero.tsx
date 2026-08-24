import type { LandingData } from "@/features/landing/data";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Github, Linkedin, ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSkillIcon, normalizeSkillIcon } from "@/constants/icons";

export function Hero({ data, visitorCount }: { data: LandingData; visitorCount?: number }) {
  const { name, title, bio, location, emailPublic, githubUrl, linkedinUrl, skills } = data;
  const loopingSkills = skills.length > 0 ? skills : [];

  return (
    <section className="relative px-4 pb-16 pt-12 sm:pt-14 md:pb-20 md:pt-16 lg:py-20">
      <div className="mx-auto grid min-h-[calc(82svh-3.5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.88fr)] lg:gap-16">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new projects
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-[-0.05em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {name}
            </h1>
            <p className="text-2xl font-semibold tracking-[-0.025em] text-primary sm:text-3xl md:text-[2rem] md:leading-tight">
              {title}
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {bio}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}
            {emailPublic && (
              <a href={`mailto:${emailPublic}`} className="flex items-center gap-2 transition-colors hover:text-foreground">
                <Mail className="h-4 w-4" />
                <span>{emailPublic}</span>
              </a>
            )}
            {visitorCount !== undefined && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{visitorCount.toLocaleString()} visitors</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            <Button size="lg" className="group h-12 rounded-full px-8 text-base" asChild>
              <a href="#projects">
                View Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-full px-8 text-base" asChild>
              <Link href="/resume">
                View Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex gap-4 pt-2">
            {githubUrl && (
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-muted/50 p-3 text-muted-foreground transition-all hover:scale-110 hover:bg-foreground hover:text-background">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            )}
            {linkedinUrl && (
              <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-muted/50 p-3 text-muted-foreground transition-all hover:scale-110 hover:bg-[#0077b5] hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            )}
          </div>
        </div>

        {loopingSkills.length > 0 && (
          <aside className="hero-skills-window relative mx-auto h-44 w-full max-w-sm overflow-hidden sm:h-52 lg:mx-0 lg:h-60 lg:max-w-md" aria-label="Technical skills">
            <div className="hero-skills-track space-y-5 py-3">
              {loopingSkills.map((skill) => (
                <SkillRow key={skill.id} name={skill.name} icon={skill.icon} />
              ))}
              <div aria-hidden="true" className="space-y-5">
                {loopingSkills.map((skill) => (
                  <SkillRow key={`${skill.id}-duplicate`} name={skill.name} icon={skill.icon} />
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}

function SkillRow({ name, icon }: { name: string; icon?: string | null }) {
  const iconPath = normalizeSkillIcon(icon) ?? getSkillIcon(name);
  const shouldInvert = ["next.js", "express", "fastify", "prisma", "typeorm", "vercel", "rust", "kubernetes"].some((skill) => name.toLowerCase().includes(skill));

  return (
    <div className="flex items-center justify-start gap-3 text-sm font-medium tracking-[-0.01em] text-muted-foreground sm:text-base">
      <div className="relative h-7 w-7 shrink-0">
        {iconPath ? <Image src={iconPath} alt="" fill sizes="28px" className={`object-contain ${shouldInvert ? "dark:invert" : ""}`} /> : <span className="grid h-full w-full place-items-center font-mono text-xs text-muted-foreground">&lt;/&gt;</span>}
      </div>
      <span className="transition-colors duration-300 hover:text-foreground">{name}</span>
    </div>
  );
}
