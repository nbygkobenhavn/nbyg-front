import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        // 301: www → non-www (задача SEO №1)
        source: "/:path*",
        has: [{ type: "host", value: "www.xn--nbygkbenhavn-zjb.dk" }],
        destination: "https://xn--nbygkbenhavn-zjb.dk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
