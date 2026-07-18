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
  // Канонікалізація хоста (www → non-www, задача SEO №1) виконується на рівні
  // хостинг-платформи: встановіть основним доменом xn--nbygkbenhavn-zjb.dk (non-www),
  // і платформа сама редіректить www → non-www.
  // НЕ дублюйте цей редірект тут: разом із редіректом платформи він утворює
  // нескінченний цикл (ERR_TOO_MANY_REDIRECTS).
};

export default nextConfig;
