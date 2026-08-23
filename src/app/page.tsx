import { getLandingData } from "@/features/landing/data";
import { SiteHeader } from "@/components/core/site-header";
import { Hero } from "@/features/landing/hero";
import { SkillsSection } from "@/features/landing/skills-section";
import { ExperienceSection } from "@/features/landing/experience-section";
import { ProjectsSection } from "@/features/landing/projects-section";
import { ServicesSection } from "@/features/landing/services-section";
import { Footer } from "@/features/landing/footer";
import { Snowfall } from "@/components/core/snowfall";
import { MotionConfig } from "motion/react";

import { prisma } from "@/lib/prisma";

export default async function Home() {

  const [data, visitorCount] = await Promise.all([
    getLandingData(),
    prisma.visitor.count(),
  ]);

  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main>
        <Hero data={data} visitorCount={visitorCount} />
        {data.skills.length > 0 && <SkillsSection skills={data.skills} />}
        <ExperienceSection experiences={data.experiences} />
        <ProjectsSection
          projects={data.projects}
          projectCategories={data.projectCategories}
        />
        <ServicesSection />
      </main>
      <Footer data={data} />
      <Snowfall />
    </MotionConfig>
  );
}
