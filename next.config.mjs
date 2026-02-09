/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Required for GitHub Pages (Static Site Generation)
  images: {
    unoptimized: true, // Required because GitHub Pages doesn't have an Image Optimization server
  },
};

export default nextConfig;