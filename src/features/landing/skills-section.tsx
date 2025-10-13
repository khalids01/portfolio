import * as React from "react";
import type { SkillData } from "@/features/landing/data";
import { Code2, Boxes, Database, Cloud, Terminal, Braces } from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  "Programming Languages": Code2,
  "Frameworks": Boxes,
  "Databases": Database,
  "Cloud": Cloud,
  "Tools": Terminal,
  "Frontend": Braces,
};

export function SkillsSection({ skills }: { skills: SkillData[] }) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillData[]>);

  return (
    <section id="skills" className="container mx-auto px-3 py-16 md:py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Section header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Skills & Expertise
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Technologies and tools I work with to build exceptional products
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const Icon = categoryIcons[category] || Code2;
            return (
              <div
                key={category}
                className="group relative rounded-2xl bg-gradient-to-br from-background to-muted/30 p-6 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative space-y-4">
                  {/* Category header */}
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{category}</h3>
                  </div>

                  {/* Skills list */}
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-sm backdrop-blur-sm"
                      >
                        <span>{skill.name}</span>
                        {skill.level && (
                          <span className="text-xs text-muted-foreground">
                            {Array(skill.level).fill("•").join("")}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
