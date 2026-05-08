import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 95],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ixzkuosmzqescxalkmbr.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
