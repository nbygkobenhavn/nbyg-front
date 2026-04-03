import {
  SanityImage,
  SanityReference,
  SanityImageCrop,
  SanityImageHotspot,
  FaqSection,
  PageSeo,
} from "./page";

export type BlogPostContentBlock = {
  _key: string;
  _type: "block";
  style?: "h2" | "h3" | "normal";
  children: Array<{
    _key: string;
    _type: "span";
    text: string;
    marks?: string[];
    link?: {
      href: string;
      blank?: boolean;
    };
  }>;
  markDefs?: Array<{
    _key: string;
    _type: "link";
    href: string;
    blank?: boolean;
  }>;
};

export type BlogPostContentImage = {
  _key?: string;
  _type: "image";
  asset: SanityReference;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  alt?: string;
  /** From GROQ: asset->metadata.dimensions (intrinsic size for next/image) */
  dimensions?: { width: number; height: number } | null;
};

export type BlogPostContentTable = {
  _key: string;
  _type: "table";
  rows?: Array<{
    cells?: string[];
  }>;
};

export type BlogPostContentGalleryItem = {
  _key: string;
  _type: "galleryItem";
  image?: BlogPostContentImage;
};

export type BlogPostContentGallerySection = {
  _key: string;
  _type: "gallerySection";
  items?: BlogPostContentGalleryItem[];
};

export type BlogPostContent =
  | BlogPostContentBlock
  | BlogPostContentImage
  | BlogPostContentTable
  | BlogPostContentGallerySection;

export type BlogPost = {
  heroTitle: string;
  heroDescription: string;
  heroDesktopImage: SanityImage;
  heroMobileImage: SanityImage;
  slug: string;
  content: BlogPostContent[];
  faq?: FaqSection | null;
  seo?: PageSeo | null;
};

export type BlogPostPreview = {
  heroTitle: string;
  heroDescription: string;
  heroMobileImage: SanityImage;
  slug: string;
  _createdAt?: string;
};

