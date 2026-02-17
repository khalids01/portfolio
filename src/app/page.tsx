import { getLandingData } from "@/features/landing/data";
import { SiteHeader } from "@/components/core/site-header";
import { Hero } from "@/features/landing/hero";
import { SkillsSection } from "@/features/landing/skills-section";
import { ExperienceSection } from "@/features/landing/experience-section";
import { ProjectsSection } from "@/features/landing/projects-section";
import { ServicesSection } from "@/features/landing/services-section";
import { Footer } from "@/features/landing/footer";
import { Snowfall } from "@/components/core/snowfall";

import { prisma } from "@/lib/prisma";

export default async function Home() {
  const data = await getLandingData();
  const visitorCount = await prisma.visitor.count();
  
  return (
    <>
      <SiteHeader name={data.name} session={data.session} />
      <main>
        <Hero data={data} visitorCount={visitorCount} />
        {data.skills.length > 0 && <SkillsSection skills={data.skills} />}
        <ExperienceSection experiences={data.experiences} />
        <ProjectsSection projects={data.projects} />
        <ServicesSection />
      </main>
      <Footer data={data} />
      <Snowfall />
    </>
  );
}
