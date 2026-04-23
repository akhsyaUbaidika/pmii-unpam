import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mpwjmwrybukmjvbpqufm.supabase.co",
      },
    ],
  }
};

export default nextConfig;