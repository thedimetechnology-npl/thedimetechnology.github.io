import type { NextConfig } from "next";

const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" as const } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
