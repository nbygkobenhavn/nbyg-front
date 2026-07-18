/**
 * Глобальний AggregateRating для організації (задача SEO №8a).
 *
 * Це вузол-збагачення: він посилається за @id на сутність #organization,
 * визначену в defaultSchema/Sanity, і додає до неї рейтинг. Рендериться в
 * layout, тому присутній глобально на всіх сторінках (включно з головною),
 * незалежно від того, чи сторінка використовує дефолтну чи Sanity-схему.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://xn--nbygkbenhavn-zjb.dk/#organization",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "8",
    bestRating: "5",
  },
};

export default function OrganizationRatingSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
