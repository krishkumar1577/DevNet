import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // this allows production builds to successfully complete even if project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // allowing production builds to successfully complete even if project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.basehub.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Add other image domains you might use
    ],
  },
}


export default nextConfig;
