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

// Keep database-managed portfolio content fresh without paying the full remote
// database round trip on every public request.
export const revalidate = 60;

export default async function Home() {
  const data = await getLandingData();

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute right-[-8rem] top-[35%] h-[24rem] w-[24rem] rounded-full bg-blue-500/10 blur-[140px]" />
          <div className="absolute bottom-[8%] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-teal-500/10 blur-[150px]" />
        </div>
        <SiteHeader />
        <main>
          <Hero data={data} />
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
      </div>
    </MotionConfig>
  );
}
