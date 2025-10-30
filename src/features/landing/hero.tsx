"use client";

import * as React from "react";
import type { LandingData } from "@/features/landing/data";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export function Hero({ data }: { data: LandingData }) {
  const { name, title, bio, location, emailPublic, githubUrl, linkedinUrl, skills } = data;

  const firstName = React.useMemo(() => name.split(" ")[0], [name]);
  const topSkills = React.useMemo(() => skills.slice(0, 14), [skills]);
  const pillColors = [
    "bg-primary/10 text-primary",
    "bg-purple-500/10 text-purple-400",
    "bg-blue-500/10 text-blue-400",
    "bg-emerald-500/10 text-emerald-400",
    "bg-amber-500/10 text-amber-400",
  ];

  return (
    <section className="relative mx-auto px-3 py-20 md:py-28 lg:py-36">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 md:gap-16 lg:gap-20 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 px-4 py-1.5 text-xs font-medium border">
              <span>👋</span>
              <span>Hi, I&apos;m {firstName}</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                {title}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              {bio}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
              )}
              {emailPublic && (
                <a href={`mailto:${emailPublic}`} className="flex items-center gap-2 hover:text-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{emailPublic}</span>
                </a>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button size="lg" asChild>
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#projects">View Projects</a>
              </Button>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {githubUrl && (
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-muted/60 p-3 hover:bg-muted transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
              {linkedinUrl && (
                <Link
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-muted/60 p-3 hover:bg-muted transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl border bg-background/60 backdrop-blur-sm p-6 md:p-8 shadow-lg">
              <div className="mb-4 text-sm font-medium text-muted-foreground">Key Skills</div>
              <div className="flex flex-wrap gap-2">
                {topSkills.map((s, idx) => (
                  <motion.span
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.02 * idx }}
                    className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm border ${pillColors[idx % pillColors.length]}`}
                  >
                    {s.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
