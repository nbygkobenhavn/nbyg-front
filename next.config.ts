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
        source: "/:path*",
        has: [{ type: "host", value: "xn--nbygkbenhavn-zjb.dk" }],
        destination: "https://www.xn--nbygkbenhavn-zjb.dk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
