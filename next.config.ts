import type { NextConfig } from "next";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // <--- AGREGÁ ESTO

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/jitsi/:path*',
        destination: 'https://localhost:8443/:path*',
      },
    ];
  },
};

export default nextConfig;
