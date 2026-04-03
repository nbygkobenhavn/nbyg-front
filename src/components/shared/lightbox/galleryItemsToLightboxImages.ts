import type { SanityImage } from "@/types/page";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";

export type LightboxGalleryItem = {
  _key?: string;
  image?: SanityImage | { link: string; alt?: string };
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
        alt: im.alt ?? `Galleri billede ${out.length + 1}`,
      });
      continue;
    }

    const si = im as SanityImage;
    if (!si?.asset) continue;

    out.push({
      src: urlForSanityImage(si).width(2400).fit("max").auto("format").url(),
      alt: si.alt ?? `Galleri billede ${out.length + 1}`,
    });
  }

  return out;
}
