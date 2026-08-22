import type { SanityImage } from "@/types/page";
import { urlFor } from "@/lib/sanity/image";
import {
  resolveImageAlt,
  resolveImageSrc,
  type ImageSource,
} from "@/utils/resolveImageSrc";

export type LightboxGalleryItem = {
  _key?: string;
  image?: ImageSource;
};

export type LightboxImage = {
  src: string;
  alt: string;
};

export function galleryItemsToLightboxImages(
  items: LightboxGalleryItem[]
): LightboxImage[] {
  const out: LightboxImage[] = [];

  for (const item of items) {
    if (!item.image) continue;

    const im = item.image;

    if (typeof im === "object" && "link" in im && im.link) {
      out.push({
        src: im.link,
        alt: resolveImageAlt(im, `Galleri billede ${out.length + 1}`),
      });
      continue;
    }

    if (typeof im === "string") {
      out.push({
        src: resolveImageSrc(im),
        alt: `Galleri billede ${out.length + 1}`,
      });
      continue;
    }

    const si = im as SanityImage;
    if (!si?.asset) continue;

    out.push({
      src: urlFor(si).width(2400).fit("max").auto("format").url(),
      alt: resolveImageAlt(si, `Galleri billede ${out.length + 1}`),
    });
  }

  return out;
}
