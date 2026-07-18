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

interface ProjectPageProps {
  params: Promise<{ project: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { project } = await params;

  return getDynamicPageMetadata({
    query: PROJECT_BY_SLUG_QUERY,
    queryParams: {
      slug: project,
    },
    path: `/projects/${project}`,
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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { project } = await params;

  const currentProject = await fetchSanityData<SanityPage>(
    PROJECT_BY_SLUG_QUERY,
    {
      slug: project,
    }
  );

  if (!currentProject) {
    return null;
  }

  const { title, slug } = currentProject;

  const schemaJson = await getDynamicPageSchemaJson(PROJECT_BY_SLUG_QUERY, {
    slug: project,
  });

  const crumbs = [
    { label: "Hjem", href: "/" },
    {
      label: "Projekter",
      href: "/projects",
    },
    {
      label: title,
      href: `/projects/${slug}`,
    },
  ];

  return (
    <>
      <SchemaJson schemaJson={schemaJson} />
      {currentProject._createdAt && (
        <WebPageSchema
          title={title}
          url={getCanonicalUrl(`/projects/${slug}`)}
          datePublished={currentProject._createdAt}
          dateModified={currentProject._updatedAt}
        />
      )}
      <Suspense fallback={<Loader />}>
        {currentProject.sections?.map((section, index) => {
          const { _type } = section;

          const SectionComponent = sectionComponentMap[_type];
          if (!SectionComponent) return null;

          const key =
            (section as { _key?: string })._key ??
            `${project}-${section._type}-${index}`;

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
