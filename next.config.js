/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. MUST: Enable static export for GitHub Pages deployment.
  output: "export",

  // 2. NOW ROOT: No subdirectory, so basePath is empty (fixes 404s for custom domain).
  basePath: "", // Empty for root domain like abcai.com

  // 3. CRITICAL: Disables the server-side Image Optimization API,
  //    which is incompatible with GitHub Pages.
  images: {
    unoptimized: true,
  },
  // 4. Recommended: Ensures all URLs end with a trailing slash.
  trailingSlash: true,
};

module.exports = nextConfig;
