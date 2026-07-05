import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/ai', destination: '/gallery', permanent: true },
      { source: '/ai/:path*', destination: '/gallery', permanent: true },
      { source: '/trainers', destination: '/about', permanent: true },
    ]
  },
};

export default nextConfig;
