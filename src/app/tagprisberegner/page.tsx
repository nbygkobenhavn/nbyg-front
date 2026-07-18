import TagCalculator from "@/components/calculatorTagPage/TagCalculator";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getPageMetadata } from "@/utils/getPageMetadata";
import { ROOF_CALCULATOR_PAGE_QUERY } from "@/lib/queries";
import { SchemaJson } from "@/components/shared/SchemaJson";
import { getPageSchemaJson } from "@/utils/getPageSchemaJson";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    query: ROOF_CALCULATOR_PAGE_QUERY,
    path: "/tagprisberegner",
  });
}

const crumbs = [
  { label: "Hjem", href: "/" },
  {
    label: "Tagprisberegner",
    href: "/tagprisberegner",
  },
];

// Schema.org для tagprisberegner (задача SEO №6)
const calculatorSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Online tagprisberegner",
    url: "https://xn--nbygkbenhavn-zjb.dk/tagprisberegner",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "da-DK",
    description:
      "Beregn vejledende pris på nyt tag online – gratis og uforpligtende.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "DKK",
    },
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://xn--nbygkbenhavn-zjb.dk/#organization",
      name: "Nbyg København",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hjem",
        item: "https://xn--nbygkbenhavn-zjb.dk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tagprisberegner",
        item: "https://xn--nbygkbenhavn-zjb.dk/tagprisberegner",
      },
    ],
  },
];

export default async function CalculatorTagPage() {
  const schemaJson = await getPageSchemaJson(ROOF_CALCULATOR_PAGE_QUERY);

  return (
    <>
      <SchemaJson schemaJson={schemaJson} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <Breadcrumbs crumbs={crumbs} className="pt-[108px] lg:pt-[139px]" />
      <TagCalculator />
    </>
  );
}
