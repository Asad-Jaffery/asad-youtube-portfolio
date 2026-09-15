import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co", pathname: "/image/**" },
      {
        protocol: "https",
        hostname: "ischool.uw.edu",
        pathname: "/sites/default/files/**",
      },
    ],
  },
};

export default nextConfig;
