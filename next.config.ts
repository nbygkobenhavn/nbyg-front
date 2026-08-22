import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    // Quality values passed via the `quality` prop must be allow-listed here.
    qualities: [75, 80, 85, 90],
    // Sanity CDN photography renders through `SanityImage` (plain `<img>` +
    // Sanity's own resize API), never through `/_next/image`. Remaining
    // `next/image` usage is local/static assets only.
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value: "<https://cdn.sanity.io>; rel=preconnect; crossorigin",
          },
        ],
      },
    ];
  },
  // Канонікалізація хоста (www → non-www, задача SEO №1) виконується на рівні
  // хостинг-платформи: встановіть основним доменом xn--nbygkbenhavn-zjb.dk (non-www),
  // і платформа сама редіректить www → non-www.
  // НЕ дублюйте цей редірект тут: разом із редіректом платформи він утворює
  // нескінченний цикл (ERR_TOO_MANY_REDIRECTS).
};

export default nextConfig;
