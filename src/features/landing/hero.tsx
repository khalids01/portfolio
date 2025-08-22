import * as React from "react";
import type { LandingData } from "@/features/landing/data";
import { SkillSphere } from "@/components/core/skill-sphere";

export function Hero({ data }: { data: LandingData }) {
  const { name, title, bio, skills } = data;
  return (
    <section className="container mx-auto grid gap-8 px-3 py-10 md:grid-cols-2 md:gap-10 md:py-16 lg:py-20">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Hi, I’m</p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{name}</h1>
        <h2 className="text-lg font-medium text-muted-foreground md:text-xl">{title}</h2>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">{bio}</p>
      </div>
      <div className="relative">
        <SkillSphere skills={skills} />
      </div>
    </section>
  );
}
