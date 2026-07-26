import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent browsers from MIME-sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Disallow embedding in iframes (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // XSS filter (legacy browsers)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Don't leak referrer to other origins
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy: restrict powerful APIs
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

