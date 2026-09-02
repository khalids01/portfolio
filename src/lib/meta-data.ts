import type { Metadata } from "next";

export const siteUrl = "https://khalid.skycanvasstudio.com";

const personName = "Abdullah Khalid";
const professionalTitle = "Full-Stack TypeScript Developer";
const description =
  "Abdullah Khalid is a Full-Stack TypeScript Developer in Bangladesh building production SaaS, HealthTech, FinTech, APIs, real-time systems, and cloud infrastructure with TypeScript, React, Next.js, Node.js, and Bun.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${personName} | ${professionalTitle}`,
    template: `%s | ${personName}`,
  },

  description,

  applicationName: `${personName} Portfolio`,

  authors: [
    {
      name: personName,
      url: siteUrl,
    },
  ],

  creator: personName,
  publisher: personName,

  category: "technology",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${personName} — Developer Portfolio`,
    title: `${personName} | ${professionalTitle}`,
    description,
    images: [
      {
        url: "/meta/og-image.png",
        width: 1200,
        height: 630,
        alt: `${personName} - ${professionalTitle}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${personName} | ${professionalTitle}`,
    description,
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
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};
