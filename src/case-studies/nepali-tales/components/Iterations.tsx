"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import * as PhosphorIcons from "@phosphor-icons/react/ssr";

interface IterationSlide {
  direction: string;
  name: string;
  image: string;
  aspectRatio: string;
  status: "Rejected" | "Accepted";
  description: string;
  reason: string;
}

const ITERATIONS: IterationSlide[] = [
  {
    direction: "DIRECTION 1",
    name: "Cultural Fusion",
    image: "/images/case-studies/NepaliTales/Iteration/iteration-rejected.png",
    aspectRatio: "600 / 340",
    status: "Rejected",
    description:
      "Created a custom illustrated pattern strip & blended traditional visuals with contemporary",
    reason: "Dropped the direction due to technical constraints and MVP timelines.",
  },
  {
    direction: "DIRECTION 2",
    name: "Bold & Playful",
    image: "/images/case-studies/NepaliTales/Iteration/iteration-selected.png",
    aspectRatio: "1142 / 680",
    status: "Accepted",
    description:
      "A bold, food-focused visual direction using playful elements to make the product feel more appetising",
    reason: "Stronger alignment between food, brand identity and user appeal.",
  },
];

export function Iterations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sync active indicator based on scroll position (supporting touch swipe & drag)
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;

    const cardWidth = card.clientWidth;
    // Gap between items (gap-5 = 20px, gap-6 = 24px)
    const gap = 24;
    const itemTotalWidth = cardWidth + gap;

    const newIndex = Math.min(
      ITERATIONS.length - 1,
      Math.max(0, Math.round(scrollLeft / itemTotalWidth))
    );
    setCurrentIndex(newIndex);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Smooth scroll to target slide
  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;

    const targetChild = el.children[index] as HTMLElement | undefined;
    if (targetChild) {
      el.scrollTo({
        left: targetChild.offsetLeft,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const prevSlide = () => {
    const prevIdx = (currentIndex - 1 + ITERATIONS.length) % ITERATIONS.length;
    scrollToIndex(prevIdx);
  };

  const nextSlide = () => {
    const nextIdx = (currentIndex + 1) % ITERATIONS.length;
    scrollToIndex(nextIdx);
  };

  return (
    <section
      id="iterations"
      aria-labelledby="heading-iterations"
      className="flex flex-col gap-6 pt-10 border-t border-border-subtle/70"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground ">
          TRADEOFF
        </span>
        <h2
          id="heading-iterations"
          className="text-lg sm:text-xl font-light text-foreground leading-snug"
        >
          Then I explored directions
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl font-sans font-light">
          I learned this the hard way to
          understand the problem and dig deeper before any ideation.
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative w-full my-4">
        {/* Navigation Arrows: Desktop & Tablet only (Hidden on mobile) */}
        <div className="hidden md:flex items-center justify-between absolute -left-3 lg:-left-5 -right-3 lg:-right-5 top-[32%] sm:top-[35%] -translate-y-1/2 z-20 pointer-events-none">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous iteration direction"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface/90 backdrop-blur-md border border-border-subtle text-foreground flex items-center justify-center shadow-md hover:bg-surface-hover pointer-events-auto transition-transform active:scale-95 cursor-pointer"
          >
            <PhosphorIcons.CaretLeft size={16} weight="bold" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next iteration direction"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface/90 backdrop-blur-md border border-border-subtle text-foreground flex items-center justify-center shadow-md hover:bg-surface-hover pointer-events-auto transition-transform active:scale-95 cursor-pointer"
          >
            <PhosphorIcons.CaretRightIcon size={16} weight="bold" />
          </button>
        </div>
       

        {/* Horizontal Scrollable Track */}
        <div
          ref={containerRef}
          className="w-full flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-1"
        >
          {ITERATIONS.map((item, idx) => (
            <article
              key={item.direction}
              onClick={() => scrollToIndex(idx)}
              className="w-[82%] sm:w-[72%] md:w-[65%] shrink-0 snap-start flex flex-col gap-4 select-none cursor-pointer"
            >
              {/* Visual Preview Box */}
              <div className="relative w-full aspect-[16/9] rounded overflow-hidden border border-border-subtle/80 bg-[#E7E7E7] shadow-xs">
                <Image
                  src={item.image}
                  alt={`${item.direction}: ${item.name}`}
                  fill
                  sizes="(max-width: 768px) 85vw, 650px"
                  className="object-contain p-2 sm:p-3"
                  priority={idx === 0}
                />
              </div>

              {/* Content & Metadata */}
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground">
                  {item.direction}
                </span>

                <h3 className="font-sans font-medium sm:font-regulaar text-lg sm:text-xl text-foreground ">
                  {item.name}
                </h3>

                <p className="font-sans font-light text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Decision Status Section */}
                <div className="flex flex-col gap-0.5 mt-4 sm:mt-5">
                  <span className="font-sans font-medium text-xs sm:text-sm text-foreground">
                    {item.status}
                  </span>
                  <p className="font-sans font-light text-xs text-muted-foreground leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Pagination Capsule */}
        <div className="flex items-center justify-center pt-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border-subtle/80 shadow-xs">
            {ITERATIONS.map((_, i) => {
              const isActive = i === currentIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? "w-3.5 h-1.5 bg-foreground"
                      : "w-1.5 h-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Iterations;
