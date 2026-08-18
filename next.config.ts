import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so tracing stays local.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
