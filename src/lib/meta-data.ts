import type { Metadata } from "next";

const myDomain = "https://khalid.skycanvasstudio.com"

export const metadata: Metadata = {
  metadataBase: new URL(myDomain),

  title: {
    default: "Abdullah Khalid | Full-Stack TypeScript Developer",
    template: "%s | Abdullah Khalid",
  },

  description:
    "Full-Stack TypeScript Developer specializing in React, Next.js, Node.js, Bun, real-time systems, APIs, PostgreSQL, Redis, cloud infrastructure, and FinTech applications.",

  applicationName: "Abdullah Khalid Portfolio",

  authors: [
    {
      name: "Abdullah Khalid",
      url: myDomain,
    },
  ],

  creator: "Abdullah Khalid",
  publisher: "Abdullah Khalid",

  keywords: [
    "Abdullah Khalid",
    "Khalid Developer",
    "Software Engineer",
    "Full Stack Developer",
    "Full-Stack TypeScript Developer",
    "Senior JavaScript Developer",
    "Senior TypeScript Developer",
    "Senior Frontend Developer",
    "Senior React Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Backend Developer",
    "Full Stack Web Developer",
    "JavaScript Developer",
    "TypeScript Developer",

    // Frontend
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "TanStack",
    "Tailwind CSS",
    "React Query",
    "Zustand",

    // Backend
    "Node.js",
    "Bun",
    "Elysia",
    "Fastify",
    "NestJS",
    "Express.js",
    "REST API",
    "WebSocket",
    "Real-time Systems",

    // Database
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "MongoDB",
    "Redis",
    "Prisma",
    "Drizzle ORM",

    // DevOps
    "Docker",
    "AWS",
    "Linux",
    "CI/CD",
    "Cloud Infrastructure",

    // FinTech
    "FinTech Developer",
    "Blockchain Developer",
    "Crypto Trading Systems",
    "Algorithmic Trading",
    "Solana",
    "Web3",
    "Stablecoin Infrastructure",

    // Location / work
    "Bangladesh Software Engineer",
    "Bangladesh Web Developer",
    "Remote Software Engineer",
    "Remote TypeScript Developer",
    "Remote Full Stack Developer",
  ],

  category: "technology",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Abdullah Khalid",
    title: "Abdullah Khalid | Full-Stack TypeScript Developer",
    description:
      "Full-Stack TypeScript Developer building complex web applications, APIs, real-time systems, cloud infrastructure, and FinTech platforms.",
    images: [
      {
        url: "/meta/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdullah Khalid - Full-Stack TypeScript Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Abdullah Khalid | Full-Stack TypeScript Developer",
    description:
      "Full-Stack TypeScript Developer specializing in React, Next.js, Node.js, Bun, real-time systems, infrastructure, and FinTech.",
    images: ["/meta/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  manifest: "/manifest.webmanifest",

  verification: {
    // Add after registering the site with Google Search Console.
    // google: "YOUR_GOOGLE_SITE_VERIFICATION",
  },

//   other: {
//     "google-site-verification": "YOUR_GOOGLE_SITE_VERIFICATION",
//   },
};
