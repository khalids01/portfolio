import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Keep Turbopack and standalone output scoped to this app. Without these,
  // Next.js can select a parent lockfile as the workspace root and nest the
  // generated server under .next/standalone/<relative-project-path>.
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        hostname: "file-server.alkhidmaati.com",
      },
    ],
  },
};

export default nextConfig;
