import { getLandingData } from "@/features/landing/data";
import { SiteHeader } from "@/components/core/site-header";
import { Hero } from "@/features/landing/hero";
import { SkillsSection } from "@/features/landing/skills-section";
import { ExperienceSection } from "@/features/landing/experience-section";
import { ProjectsSection } from "@/features/landing/projects-section";
import { ServicesSection } from "@/features/landing/services-section";
import { Footer } from "@/features/landing/footer";
import { Snowfall } from "@/components/core/snowfall";

export default async function Home() {
  const data = await getLandingData();
  return (
    <>
      <SiteHeader name={data.name} session={data.session} />
      <main>
        <Hero data={data} />
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
