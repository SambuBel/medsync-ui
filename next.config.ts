import type { NextConfig } from "next";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // <--- AGREGÁ ESTO

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/jitsi/:path*',
        destination: process.env.NEXT_PUBLIC_JITSI_SERVER as string + '/:path*',
      },
    ];
  },
};

export default nextConfig;
