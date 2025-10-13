import * as React from "react";
import type { LandingData } from "@/features/landing/data";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Github, Linkedin, ArrowDown } from "lucide-react";
import Link from "next/link";

export function Hero({ data }: { data: LandingData }) {
  const { name, title, bio, location, emailPublic, githubUrl, linkedinUrl } = data;
  return (
    <section className="relative mx-auto px-3 py-16 md:py-24 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="mx-auto max-w-4xl text-center space-y-8">
        {/* Greeting */}
        <div className="inline-block rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 px-4 py-2 text-sm font-medium backdrop-blur-sm border border-primary/20">
          👋 Hi, I&apos;m {name.split(" ")[0]}
        </div>

        {/* Main heading */}
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Bio */}
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {bio}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          {emailPublic && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${emailPublic}`} className="hover:text-foreground transition-colors">
                {emailPublic}
              </a>
            </div>
          )}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild className="gap-2">
            <a href="#contact">
              Get In Touch
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="gap-2">
            <a href="#projects">
              View Projects
            </a>
          </Button>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-muted/50 p-3 hover:bg-muted transition-colors backdrop-blur-sm"
            >
              <Github className="h-5 w-5" />
            </Link>
          )}
          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-muted/50 p-3 hover:bg-muted transition-colors backdrop-blur-sm"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="pt-8">
          <a href="#skills" className="inline-block animate-bounce">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </a>
        </div>
      </div>
    </section>
  );
}
