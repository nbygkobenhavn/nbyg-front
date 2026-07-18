import { Suspense, type ComponentType } from "react";
import HeroSection from "@/components/shared/sections/heroSection/HeroSection";
import CtaSection from "@/components/shared/sections/ctaSection/CtaSection";
import TableSection from "@/components/shared/sections/tableSection/TableSection";
import MaterialSliderSection from "@/components/shared/sections/materialSliderSection/MaterialSliderSection";
import GallerySection from "@/components/shared/sections/gallerySection/GallerySection";
import BeforeAfterSection from "@/components/shared/sections/beforeAfterSection/BeforeAfterSection";
import ImageTextButtonSection from "@/components/shared/sections/imageTextButtonSection/ImageTextButtonSection";
import FaqSection from "@/components/shared/sections/faqSection/FaqSection";
import TableWithImageSection from "@/components/shared/sections/tableWithImageSection/TableWithImageSection";
import TextRevealCardsSliderSection from "@/components/shared/sections/textRevealCardsSliderSection/TextRevealCardsSliderSection";
import RoofTypesSection from "@/components/shared/sections/roofTypesSection/RoofTypesSection";
import LargeTableSection from "@/components/shared/sections/largeTableSection/LargeTableSection";
import Container from "@/components/shared/container/Container";
import { PROJECT_BY_SLUG_QUERY } from "@/lib/queries";
import { fetchSanityData } from "@/utils/fetchSanityData";
import type { PageSection, SanityPage } from "@/types/page";
import Loader from "@/components/shared/loader/Loader";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getDynamicPageMetadata } from "@/utils/getDynamicPageMetadata";
import { SchemaJson } from "@/components/shared/SchemaJson";
import WebPageSchema from "@/components/shared/WebPageSchema";
import { getDynamicPageSchemaJson } from "@/utils/getDynamicPageSchemaJson";
import { getCanonicalUrl } from "@/utils/getCanonicalUrl";

interface SubprojectPageProps {
  params: Promise<{ project: string; subproject: string }>;
}

export async function generateMetadata({
  params,
}: SubprojectPageProps): Promise<Metadata> {
  const { project, subproject } = await params;

  return getDynamicPageMetadata({
    query: PROJECT_BY_SLUG_QUERY,
    queryParams: {
      slug: subproject,
      parentSlug: project,
    },
    path: `/projects/${project}/${subproject}`,
  });
}

const sectionComponentMap: Partial<
  Record<PageSection["_type"], ComponentType<PageSection>>
> = {
  heroSection: HeroSection as ComponentType<PageSection>,
  ctaSection: CtaSection as ComponentType<PageSection>,
  tableSection: TableSection as ComponentType<PageSection>,
  materialSliderSection: MaterialSliderSection as ComponentType<PageSection>,
  gallerySection: GallerySection as ComponentType<PageSection>,
  beforeAfterSection: BeforeAfterSection as ComponentType<PageSection>,
  imageTextButtonSection: ImageTextButtonSection as ComponentType<PageSection>,
  faqSection: FaqSection as ComponentType<PageSection>,
  tableWithImageSection: TableWithImageSection as ComponentType<PageSection>,
  textReavealCardsSliderSection:
    TextRevealCardsSliderSection as ComponentType<PageSection>,
  roofTypesSection: RoofTypesSection as ComponentType<PageSection>,
  largeTableSection: LargeTableSection as ComponentType<PageSection>,
};

export default async function SubprojectPage({ params }: SubprojectPageProps) {
  const { project, subproject } = await params;

  const currentSubproject = await fetchSanityData<SanityPage>(
    PROJECT_BY_SLUG_QUERY,
    {
      slug: subproject,
      parentSlug: project,
    }
  );

  if (!currentSubproject) {
    return null;
  }

  const { title, slug, parent } = currentSubproject;

  const schemaJson = await getDynamicPageSchemaJson(PROJECT_BY_SLUG_QUERY, {
    slug: subproject,
    parentSlug: project,
  });

  const crumbs = [
    { label: "Hjem", href: "/" },
    {
      label: "Projekter",
      href: "/projects",
    },
    {
      label: parent?.title || "",
      href: `/projects/${parent?.slug}` || "",
    },
    {
      label: title,
      href: `/projects/${parent?.slug}/${slug}`,
    },
  ];

  return (
    <>
      <SchemaJson schemaJson={schemaJson} />
      {currentSubproject._createdAt && (
        <WebPageSchema
          title={title}
          url={getCanonicalUrl(`/projects/${parent?.slug}/${slug}`)}
          datePublished={currentSubproject._createdAt}
          dateModified={currentSubproject._updatedAt}
        />
      )}
      <Suspense fallback={<Loader />}>
        {currentSubproject.sections?.map((section, index) => {
          const { _type } = section;

          const SectionComponent = sectionComponentMap[_type];
          if (!SectionComponent) return null;

          const sectionKey =
            (section as { _key?: string })._key ?? `${section._type}-${index}`;
          const key = `${project}-${subproject}-${sectionKey}`;

          const element =
            _type === "faqSection" ? (
              <Container key={key}>
                <SectionComponent {...section} uniqueKey={key} />
              </Container>
            ) : (
              <SectionComponent key={key} {...section} uniqueKey={key} />
            );

          if (_type === "heroSection") {
            return (
              <div key={key}>
                {element}
                <Breadcrumbs crumbs={crumbs} />
              </div>
            );
          }

          return element;
        })}
      </Suspense>
    </>
  );
}
