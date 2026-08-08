import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only turn on static export when building for production (e.g., Cloudflare Pages)
  // This stops the dev server from crashing on 404 pages locally
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  
  images: { unoptimized: true },

};

export default nextConfig;
