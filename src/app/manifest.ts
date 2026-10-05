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
    { src: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { src: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { src: "/assets/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    { src: "/assets/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/assets/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
],
  };
}
