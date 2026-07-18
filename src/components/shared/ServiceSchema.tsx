interface OfferItem {
  name: string;
  price?: string;
  priceCurrency?: string;
}

interface ServiceSchemaProps {
  /** Назва послуги (динамічно з title сторінки) */
  title: string;
  /** Регіон обслуговування */
  areaServed?: string;
  /**
   * Опційний перелік пропозицій для hasOfferCatalog.
   * Наразі в CMS немає поля offers, тому каталог рендериться лише,
   * якщо дані передані явно.
   */
  offers?: OfferItem[];
}

/**
 * Service schema.org для сторінок послуг (задача SEO №8).
 * provider посилається на глобальну сутність #organization з defaultSchema.
 */
export default function ServiceSchema({
  title,
  areaServed = "København",
  offers,
}: ServiceSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    provider: {
      "@id": "https://xn--nbygkbenhavn-zjb.dk/#organization",
    },
    areaServed,
  };

  if (offers && offers.length > 0) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      itemListElement: offers.map((offer) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offer.name,
        },
        ...(offer.price && { price: offer.price }),
        ...(offer.priceCurrency && { priceCurrency: offer.priceCurrency }),
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
