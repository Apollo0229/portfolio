import type { NextConfig } from "next";

// GitHub Pages serves this site from /portfolio. The deploy workflow sets
// PAGES_BASE_PATH; locally it is empty so the dev server runs at "/".
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Plain <img> paths don't get the base path added, so pages read it from here.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
