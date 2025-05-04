import type { NextConfig } from "next";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/jitsi/:path*',
        destination: process.env.NEXT_PUBLIC_JITSI_SERVER as string + '/:path*',
      },
    ];
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
