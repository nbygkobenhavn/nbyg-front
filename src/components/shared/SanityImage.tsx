import type { CSSProperties } from "react";
import { preload } from "react-dom";
import Image from "next/image";

/**
 * Renders Sanity CDN photography as a plain `<img>`, bypassing Next's
 * `/_next/image` pipeline so these requests never touch Vercel's (metered)
 * Image Optimization — Sanity's CDN already resizes/transcodes via query
 * params (`w`, `h`, `q`, `auto=format`).
 *
 * Callers may pass a local/static `src` (fallback or hard-coded asset). For
 * those, this component uses `next/image` so local assets still get Next's
 * optimization pipeline. The CDN-vs-local decision lives here, not at every
 * call site.
 */

const CDN_HOSTS = ["cdn.sanity.io"];

function isCdnTransformable(src: string): boolean {
  return CDN_HOSTS.some((host) => src.includes(host));
}

function readAspectRatio(src: string): number | null {
  try {
    const url = new URL(src);
    const w = Number(url.searchParams.get("w"));
    const h = Number(url.searchParams.get("h"));
    return w > 0 && h > 0 ? w / h : null;
  } catch {
    return null;
  }
}

function transformUrl(
  src: string,
  targetWidth: number,
  quality: number,
  aspect: number | null,
): string {
  try {
    const url = new URL(src);
    url.searchParams.set("w", String(Math.round(targetWidth)));
    if (aspect) {
      url.searchParams.set("h", String(Math.round(targetWidth / aspect)));
    } else {
      url.searchParams.delete("h");
    }
    if (!url.searchParams.has("fit")) {
      url.searchParams.set("fit", aspect ? "crop" : "max");
    }
    if (!url.searchParams.has("auto")) {
      url.searchParams.set("auto", "format");
    }
    url.searchParams.set("q", String(quality));
    return url.toString();
  } catch {
    return src;
  }
}

const FILL_WIDTHS = [420, 640, 768, 1024, 1280, 1536, 1920, 2560];

function fixedWidths(base: number): number[] {
  return Array.from(new Set([base, Math.round(base * 1.5), base * 2, base * 3]));
}

interface SanityImageProps {
  src: string;
  alt: string;
  quality?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  style?: CSSProperties;
}

export function SanityImage({
  src,
  alt,
  quality = 75,
  priority = false,
  className,
  sizes,
  fill = false,
  width,
  height,
  style,
}: SanityImageProps) {
  const transformable = isCdnTransformable(src);
  const effectiveSizes = sizes ?? (fill ? "100vw" : undefined);

  if (!transformable) {
    return fill ? (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={effectiveSizes}
        quality={quality}
        priority={priority}
        className={className}
        style={style}
      />
    ) : (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={effectiveSizes}
        quality={quality}
        priority={priority}
        className={className}
        style={style}
      />
    );
  }

  const aspect = (width && height ? width / height : null) ?? readAspectRatio(src);
  const widths = effectiveSizes ? FILL_WIDTHS : width ? fixedWidths(width) : FILL_WIDTHS;
  const srcSet = widths
    .map((w) => `${transformUrl(src, w, quality, aspect)} ${w}w`)
    .join(", ");
  const displaySrc = transformUrl(src, width ?? widths[widths.length - 1], quality, aspect);

  if (priority) {
    preload(displaySrc, {
      as: "image",
      fetchPriority: "high",
      imageSrcSet: srcSet,
      imageSizes: effectiveSizes,
    });
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentional: bypasses Next Image Optimization for Sanity CDN
    <img
      src={displaySrc}
      srcSet={srcSet}
      sizes={effectiveSizes}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      className={className}
      style={
        fill
          ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
          : style
      }
    />
  );
}

export default SanityImage;
