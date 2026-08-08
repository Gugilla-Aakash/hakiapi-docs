import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // ONLY add basePath if deploying to username.github.io/HakiAPI
  // basePath: "/HakiAPI", 
};

export default nextConfig;
