/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. MUST: Enable static export for GitHub Pages deployment.
  output: "export",

  // 2. CRITICAL: Sets the subdirectory for the deployment.
  //    This fixes the 404s for core files like JS/CSS chunks.
  basePath: "/aasaitech-site",

  // 3. CRITICAL: Disables the server-side Image Optimization API,
  //    which is incompatible with GitHub Pages.
  images: {
    unoptimized: true,
  },
  assetPrefix: "./",
  // 4. Recommended: Ensures all URLs end with a trailing slash.
  trailingSlash: true,
};

module.exports = nextConfig;
