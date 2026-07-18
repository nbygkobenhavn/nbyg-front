import { Suspense } from "react";
import { Metadata } from "next";
import Hero from "@/components/projectsPage/hero/Hero";
import BlogList from "@/components/blogPage/blogList/BlogList";
import Loader from "@/components/shared/loader/Loader";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { ALL_PROJECT_PAGES_QUERY } from "@/lib/queries";
import { BlogPostPreview } from "@/types/blogPost";
import { getCanonicalUrl } from "@/utils/getCanonicalUrl";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = getCanonicalUrl("/projects");

  return {
    title: "Projekter | Nbyg København",
    description:
      "Se udvalgte projekter udført af Nbyg – tag, terrasse og renovering i København og på Bornholm.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const crumbs = [
  { label: "Hjem", href: "/" },
  {
    label: "Projekter",
    href: "/projects",
  },
];

export default async function ProjectsPage() {
  // Каталог проєктів працює 1-в-1 як блог: та ж сітка карток (BlogList),
  // але з посиланнями на /projects. Дані карток тягнуться з першої heroSection
  // кожного проєкту (див. ALL_PROJECT_PAGES_QUERY).
  const projects =
    (await fetchSanityData<BlogPostPreview[]>(ALL_PROJECT_PAGES_QUERY)) ?? [];

  return (
    <>
      <Hero />
      <Breadcrumbs crumbs={crumbs} />
      <Suspense fallback={<Loader />}>
        <BlogList blogPosts={projects} hrefBase="/projects" />
      </Suspense>
    </>
  );
}
