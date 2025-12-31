import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "file-server.alkhidmaati.com",
      },
    ],
  },
};

export default nextConfig;
