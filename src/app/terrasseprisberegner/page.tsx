import TerraceCalculator from "@/components/calculatorTerrasserPage/TerraceCalculator";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getPageMetadata } from "@/utils/getPageMetadata";
import { TERRACE_CALCULATOR_PAGE_QUERY } from "@/lib/queries";
import { SchemaJson } from "@/components/shared/SchemaJson";
import { getPageSchemaJson } from "@/utils/getPageSchemaJson";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    query: TERRACE_CALCULATOR_PAGE_QUERY,
    path: "/terrasseprisberegner",
  });
}

const crumbs = [
  { label: "Hjem", href: "/" },
  {
    label: "Terrasseprisberegner",
    href: "/terrasseprisberegner",
  },
];

// Schema.org для terrasseprisberegner (задача SEO №6)
const calculatorSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Online terrasseprisberegner",
    url: "https://xn--nbygkbenhavn-zjb.dk/terrasseprisberegner",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "da-DK",
    description:
      "Beregn vejledende pris på ny terrasse online – gratis og uforpligtende.",
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
        name: "Terrasseprisberegner",
        item: "https://xn--nbygkbenhavn-zjb.dk/terrasseprisberegner",
      },
    ],
  },
];

export default async function CalculatorTerrasserPage() {
  const schemaJson = await getPageSchemaJson(TERRACE_CALCULATOR_PAGE_QUERY);

  return (
    <>
      <SchemaJson schemaJson={schemaJson} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <Breadcrumbs crumbs={crumbs} className="pt-[108px] lg:pt-[139px]" />
      <TerraceCalculator />
    </>
  );
}
