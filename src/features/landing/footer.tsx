import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import type { LandingData } from "@/features/landing/data";

export function Footer({ data }: { data: Pick<LandingData, "name" | "emailPublic" | "githubUrl" | "linkedinUrl" | "socialLinks"> }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-3 py-12 md:py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Main footer content */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* About */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{data.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Building exceptional digital experiences with modern technologies and best practices.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-3">
                {data.githubUrl && (
                  <Link
                    href={data.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-muted p-2 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                )}
                {data.linkedinUrl && (
                  <Link
                    href={data.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-muted p-2 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                )}
                {data.emailPublic && (
                  <a
                    href={`mailto:${data.emailPublic}`}
                    className="rounded-lg bg-muted p-2 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <nav className="flex flex-col gap-2">
                <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Skills
                </a>
                <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Experience
                </a>
                <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </a>
                <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </a>
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Get In Touch</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Have a project in mind or want to collaborate? Feel free to reach out!
              </p>
              {data.emailPublic && (
                <a
                  href={`mailto:${data.emailPublic}`}
                  className="inline-block text-sm font-medium text-primary hover:underline"
                >
                  {data.emailPublic}
                </a>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
              <p>
                © {currentYear} {data.name}. All rights reserved.
              </p>
              <p className="flex items-center gap-1">
                Made with <Heart className="h-4 w-4 text-red-500 fill-current" /> using Next.js
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
