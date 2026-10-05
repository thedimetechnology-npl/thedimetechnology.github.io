import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Dime Technology",
    short_name: "The Dime",
    description:
      "Your Freelance Tech Partner. From concept to completion, we turn ideas into production-ready web, mobile and cloud projects with an elite engineering team.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#0a0a0f",
    icons: [
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
