"use client";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../../swiper/SwiperWrapper";
import { SanityImage } from "@/types/page";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import Image from "next/image";
import { useState, useMemo, useRef } from "react";
import AppLightbox from "@/components/shared/lightbox/AppLightbox";
import { galleryItemsToLightboxImages } from "@/components/shared/lightbox/galleryItemsToLightboxImages";
import ShevronIcon from "@/components/shared/icons/ShevronIcon";
import * as motion from "motion/react-client";
import type { Swiper as SwiperType } from "swiper";

interface GallerySliderProps {
  items: Array<{
    _key?: string;
    image?: SanityImage | { link: string; alt: string };
  }>;
  uniqueKey?: string;
}

export default function GallerySlider({
  items,
  uniqueKey,
}: GallerySliderProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const lightboxSlides = useMemo(
    () => galleryItemsToLightboxImages(items),
    [items]
  );

  if (!items || !items.length) return null;

  let lightboxPosition = 0;

  const handleImageClick = (
    e: React.MouseEvent<HTMLDivElement>,
    clickedLightboxIndex: number
  ) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-gallery-preview-nav]")) {
      e.stopPropagation();
      return;
    }

    setLightboxIndex(clickedLightboxIndex);
    setLightboxOpen(true);
  };

  const galleryReveal = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.45,
        delay: 0.05,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <>
      <motion.div
        key={`${uniqueKey}-gallery-slider`}
        initial="hidden"
        whileInView="visible"
        exit={{ opacity: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        variants={galleryReveal}
        className="relative w-full min-w-0 overflow-visible"
      >
        <SwiperWrapper
          uniqueKey={uniqueKey}
          loop={true}
          centeredSlides={true}
          breakpoints={{
            360: {
              slidesPerView: "auto",
              spaceBetween: 24,
              coverflowEffect: { scale: 0.94, stretch: 180 },
            },
            640: {
              slidesPerView: "auto",
              spaceBetween: 24,
              coverflowEffect: { scale: 0.9, stretch: 328 },
            },
            768: {
              slidesPerView: "auto",
              spaceBetween: 24,
              coverflowEffect: { scale: 0.9, stretch: 399 },
            },
            1024: {
              slidesPerView: "auto",
              spaceBetween: 24,
              coverflowEffect: { scale: 0.91, stretch: 580 },
            },
            1280: {
              slidesPerView: "auto",
              spaceBetween: 24,
              coverflowEffect: { scale: 0.91, stretch: 508 },
            },
          }}
          additionalOptions={{}}
          swiperClassName="gallery-slider"
          showNavigation={false}
          showCoverflowEffect={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {items.map((item, idx) => {
            if (!item.image) return null;

            const clickedLightboxIndex = lightboxPosition++;

            return (
              <SwiperSlide key={item._key || idx}>
                <div
                  className="relative h-full w-full min-w-0 overflow-hidden rounded-[14px] cursor-pointer"
                  onClick={(e) => handleImageClick(e, clickedLightboxIndex)}
                >
                  <Image
                    src={
                      typeof item.image === "object" && "link" in item.image
                        ? item.image.link
                        : urlForSanityImage(item.image).url()
                    }
                    alt={
                      typeof item.image === "object" && "link" in item.image
                        ? item.image.alt || `Galleri billede ${idx + 1}`
                        : item.image?.alt || `Galleri billede ${idx + 1}`
                    }
                    fill
                    className="object-cover rounded-[14px]"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 727px"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperWrapper>

        {/* Samme placering som oprindelig SwiperWrapper (onSlides): centreret bånd = slide-bredde, ikke hele kolonnen */}
        <div
          data-gallery-preview-nav
          className="pointer-events-none absolute z-50 top-[calc(50%-27px)] left-[calc(50%-143px)] sm:left-[calc(50%-240.5px)] md:left-[calc(50%-285.5px)] lg:left-[calc(50%-390.5px)] flex w-[286px] sm:w-[481px] md:w-[571px] lg:w-[781px] items-center justify-between sm:gap-3"
          aria-hidden="false"
        >
          <button
            type="button"
            className="pointer-events-auto flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white bg-white text-black shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-[54px]"
            aria-label="Forrige slide"
            onClick={(e) => {
              e.stopPropagation();
              swiperRef.current?.slidePrev();
            }}
          >
            <ShevronIcon className="size-6 -rotate-90 text-black sm:size-7" />
          </button>
          <button
            type="button"
            className="pointer-events-auto flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white bg-white text-black shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-[54px]"
            aria-label="Næste slide"
            onClick={(e) => {
              e.stopPropagation();
              swiperRef.current?.slideNext();
            }}
          >
            <ShevronIcon className="size-6 rotate-90 text-black sm:size-7" />
          </button>
        </div>
      </motion.div>

      <AppLightbox
        open={lightboxOpen && lightboxSlides.length > 0}
        index={lightboxIndex}
        slides={lightboxSlides}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
