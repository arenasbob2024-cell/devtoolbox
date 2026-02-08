import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    unoptimized: true,
  },

  // Trailing slashes for better SEO
  trailingSlash: true,
};

export default nextConfig;
