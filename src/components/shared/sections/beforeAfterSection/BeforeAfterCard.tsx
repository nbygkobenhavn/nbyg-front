import { SanityImage } from "@/components/shared/SanityImage";
import {
  resolveImageAlt,
  resolveImageSrc,
  type ImageSource,
} from "@/utils/resolveImageSrc";

interface BeforeAfterCardProps {
  slide: {
    _key?: string;
    beforeImage: ImageSource;
    afterImage: ImageSource;
  };
}

export default function BeforeAfterCard({ slide }: BeforeAfterCardProps) {
  const { beforeImage, afterImage } = slide;

  return (
    <div className="rounded-[8px] overflow-hidden">
      <div className="relative w-full h-[140px] lg:h-[148px] mb-5 lg:mb-1">
        <SanityImage
          src={resolveImageSrc(beforeImage)}
          fill
          alt={resolveImageAlt(beforeImage, "Før billede")}
          sizes="(max-width: 1024px) 85vw, 400px"
          className="object-cover"
        />
        <div
          className="absolute left-2 bottom-3 px-3.5 py-3 font-find-sans-pro text-[16px] font-light leading-[120%] uppercase rounded-[8px]
        bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px]"
        >
          før
        </div>
      </div>
      <div className="relative w-full h-[140px] lg:h-[148px]">
        <SanityImage
          src={resolveImageSrc(afterImage)}
          fill
          alt={resolveImageAlt(afterImage, "Efter billede")}
          sizes="(max-width: 1024px) 85vw, 400px"
          className="object-cover"
        />
        <div
          className="absolute left-2 bottom-3 px-3.5 py-3 font-find-sans-pro text-[16px] font-light leading-[120%] uppercase rounded-[8px]
        bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px]"
        >
          efter
        </div>
      </div>
    </div>
  );
}
