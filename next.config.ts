import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Während der Produktion nicht prüfen
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;