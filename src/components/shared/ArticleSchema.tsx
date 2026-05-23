const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.xn--nbygkbenhavn-zjb.dk";

interface ArticleSchemaProps {
  headline: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
}

export default function ArticleSchema({
  headline,
  url,
  datePublished,
  dateModified,
  imageUrl,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
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
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
