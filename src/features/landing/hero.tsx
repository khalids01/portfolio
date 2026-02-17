"use client";

import * as React from "react";
import type { LandingData } from "@/features/landing/data";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Github, Linkedin, ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export function Hero({ data, visitorCount }: { data: LandingData; visitorCount?: number }) {
  const { title, bio, location, emailPublic, githubUrl, linkedinUrl } = data;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-4 py-20 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
        <div className="absolute right-10 bottom-10 -z-10 h-[200px] w-[200px] rounded-full bg-blue-500/20 opacity-20 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl text-center space-y-8">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new projects
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground leading-relaxed">
            {bio}
          </p>
        </motion.div>

        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"
        >
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          {emailPublic && (
            <a href={`mailto:${emailPublic}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" />
              <span>{emailPublic}</span>
            </a>
          )}
          {visitorCount !== undefined && (
             <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{visitorCount.toLocaleString()} visitors</span>
             </div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 pt-4"
        >
          <Button size="lg" className="h-12 px-8 text-base rounded-full group" asChild>
            <a href="#projects">
              View Work
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full" asChild>
            <Link href="/resume">
              View Resume
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center gap-4 pt-8"
        >
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-muted/50 p-3 text-muted-foreground hover:bg-foreground hover:text-background transition-all hover:scale-110"
            >
              <Github className="h-6 w-6" />
            </Link>
          )}
          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-muted/50 p-3 text-muted-foreground hover:bg-[#0077b5] hover:text-white transition-all hover:scale-110"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
