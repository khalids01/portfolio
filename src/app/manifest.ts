import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abdullah Khalid Portfolio",
    short_name: "Abdullah Khalid",
    description:
      "Portfolio of Abdullah Khalid, a Full-Stack TypeScript Developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
