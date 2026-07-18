const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://xn--nbygkbenhavn-zjb.dk";

interface WebPageSchemaProps {
  title: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}

export default function WebPageSchema({
  title,
  url,
  datePublished,
  dateModified,
}: WebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: "Nbyg",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Nbyg",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
