import { z } from "zod";

export const resumeSchema = z.object({
  basics: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string().email(),
    location: z.string().optional(),
    links: z.array(z.object({
      name: z.string(),
      url: z.string().url(),
    })),
  }),
  summary: z.string(),
  skills: z.array(z.object({
    group: z.string(),
    items: z.array(z.string()),
  })),
  experience: z.array(z.object({
    company: z.string(),
    role: z.string(),
    start: z.string(),
    end: z.string(),
    bullets: z.array(z.string()),
  })),
  projects: z.array(z.object({
    name: z.string(),
    desc: z.string(),
    bullets: z.array(z.string()),
    links: z.array(z.object({
      name: z.string(),
      url: z.string().url(),
    })).default([]),
  })),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    start: z.string().optional(),
    end: z.string().optional(),
  })),
  languages: z.array(z.object({
    name: z.string(),
    level: z.string(),
  })),
});

export type ResumeData = z.infer<typeof resumeSchema>;
