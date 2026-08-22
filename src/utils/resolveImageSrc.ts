import type { SanityImage } from "@/types/page";
import { urlFor } from "@/lib/sanity/image";

export type ImageSource =
  | string
  | SanityImage
  | { link: string; alt?: string };

export function resolveImageSrc(image: ImageSource): string {
  if (typeof image === "string") return image;
  if ("link" in image && typeof image.link === "string") return image.link;
  if (!image.asset?._ref) return "";
  return urlFor(image).url();
}

export function resolveImageAlt(image: ImageSource, fallback: string): string {
  if (typeof image === "string") return fallback;
  return image.alt?.trim() || fallback;
}
