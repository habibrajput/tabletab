import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so tracing stays local.
  outputFileTracingRoot: __dirname,
  // Emit a self-contained server bundle (.next/standalone) for a tiny prod image.
  output: "standalone",
};

export default nextConfig;
