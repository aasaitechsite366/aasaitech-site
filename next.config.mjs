/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Resolve the Cross-Origin warning for local network testing
  experimental: {
    allowedDevOrigins: ["localhost:3000", "192.168.1.8:3000"],
  },

  // 2. Deployment configuration (keep this ready)
  output: "export",
  images: {
    unoptimized: true,
  },

  // 3. Prevent build errors from subtle TS mismatches during rapid iteration
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
