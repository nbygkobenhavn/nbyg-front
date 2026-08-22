import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/lib/sanityClient";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** @deprecated Prefer `urlFor` — kept for gradual migration of older call sites. */
export const urlForSanityImage = urlFor;
