import { headers } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://xn--nbygkbenhavn-zjb.dk";

function humanizeSegment(segment: string): string {
  const decoded = decodeURIComponent(segment).replace(/-/g, " ");
  return decoded.charAt(0).toUpperCase() + decoded.slice(1);
}

export default async function BreadcrumbSchema() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const base = BASE_URL.replace(/\/+$/, "");

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hjem",
        item: `${base}/`,
      },
      ...segments.map((seg, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: humanizeSegment(seg),
        item: `${base}/${segments.slice(0, i + 1).join("/")}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
