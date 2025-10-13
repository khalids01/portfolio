import * as React from "react";
import type { ExperienceData } from "@/features/landing/data";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";

// Dummy data to show when no experiences exist
const dummyExperiences: ExperienceData[] = [
  {
    id: "dummy-1",
    company: "Tech Innovations Inc.",
    role: "Senior Full Stack Developer",
    location: "San Francisco, CA",
    startDate: new Date("2022-01-01"),
    endDate: null,
    current: true,
    description: "Leading development of scalable web applications using modern technologies.",
    highlights: [
      { text: "Architected and built microservices handling 1M+ daily requests" },
      { text: "Reduced page load times by 60% through optimization techniques" },
      { text: "Mentored 5 junior developers and conducted code reviews" },
    ],
  },
  {
    id: "dummy-2",
    company: "Digital Solutions Ltd.",
    role: "Full Stack Developer",
    location: "Remote",
    startDate: new Date("2020-03-01"),
    endDate: new Date("2021-12-31"),
    current: false,
    description: "Developed and maintained multiple client-facing applications.",
    highlights: [
      { text: "Built responsive web apps using React and Node.js" },
      { text: "Integrated third-party APIs and payment gateways" },
      { text: "Improved test coverage from 40% to 85%" },
    ],
  },
];

function ExperienceCard({ experience }: { experience: ExperienceData }) {
  const formatDate = (date: Date | null | undefined, current: boolean) => {
    if (!date) return "Present";
    if (current) return "Present";
    return format(date, "MMM yyyy");
  };

  return (
    <div className="group relative rounded-2xl bg-gradient-to-br from-background to-muted/30 p-6 md:p-8 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">{experience.role}</h3>
              <div className="flex items-center gap-2 text-lg text-primary font-semibold mt-1">
                <Briefcase className="h-4 w-4" />
                <span>{experience.company}</span>
              </div>
            </div>
            {experience.current && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Current
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                {formatDate(experience.startDate, false)} - {formatDate(experience.endDate, experience.current)}
              </span>
            </div>
            {experience.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{experience.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {experience.description && (
          <p className="text-muted-foreground leading-relaxed">
            {experience.description}
          </p>
        )}

        {/* Highlights */}
        {experience.highlights.length > 0 && (
          <ul className="space-y-2">
            {experience.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">▹</span>
                <span>{highlight.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function ExperienceSection({ experiences }: { experiences: ExperienceData[] }) {
  const displayExperiences = experiences.length > 0 ? experiences : dummyExperiences;

  return (
    <section id="experience" className="container mx-auto px-3 py-16 md:py-24">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Section header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Work Experience
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            My professional journey and key accomplishments
          </p>
        </div>

        {/* Experience timeline */}
        <div className="space-y-6">
          {displayExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}
