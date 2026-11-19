"use client";

import { MorphingText } from "@/components/ui/morphing-text";

export interface HeroMorphingTitleProps {
  className?: string;
  words?: string[];
  staticWord?: string;
  greetingLeft?: string;
  greetingRight?: string;
}

const DEFAULT_WORDS = ["ORDINARY", "VISUAL", "PRODUCT"];

export function HeroMorphingTitle({
  className = "",
  words = DEFAULT_WORDS,
  staticWord = "DESIGNER",
  greetingLeft = "नमस्ते मी",
  greetingRight = "From भारत",
}: HeroMorphingTitleProps) {
  return (
    <div className={`w-full flex flex-col gap-3 sm:gap-4 ${className}`}>
      {/* Top Labels: Positioned at opposite ends (left and right) */}
      <div className="flex items-center justify-between w-full select-none">
        <span className="font-sans font-medium text-base sm:text-lg md:text-xl text-foreground tracking-normal">
          {greetingLeft}
        </span>
        <span className="font-sans text-base sm:text-lg md:text-xl font-light text-foreground tracking-normal">
          {greetingRight}
        </span>
      </div>

      {/* Main Headline: Dominant typography occupying the hero */}
      <div className="w-full flex flex-col justify-center select-none pt-1">
        <h1
          className="w-full text-foreground font-sans font-regular tracking-tight uppercase
          leading-[0.88] md:leading-[0.92]
          text-[clamp(2.85rem,12.5vw,4.5rem)]
          md:text-[clamp(2.4rem,4.2vw,5.25rem)]
          lg:text-[clamp(2.8rem,4.6vw,6rem)]
          xl:text-[clamp(3.2rem,4.8vw,6.5rem)]
          flex flex-col md:flex-row md:items-baseline md:justify-between
          gap-y-0.5 sm:gap-y-1"
        >
          {/* Morphing Word Slot with Zero Layout Shift (Occupies Left Position) */}
          <span className="relative inline-block text-left align-baseline shrink-0">
            {/* Invisible sizer using the widest word ('ORDINARY') to lock the bounding box */}
            <span
              aria-hidden="true"
              className="invisible select-none pointer-events-none block"
            >
              ORDINARY
            </span>

            {/* Magic UI MorphingText absolutely positioned over the locked slot */}
            <span className="absolute inset-0 block text-left">
              <MorphingText
                texts={words}
                morphTime={1.25}
                cooldownTime={1.25}
                className="h-full w-full max-w-none text-left m-0 p-0 font-inherit text-inherit tracking-inherit leading-inherit"
                textClassName="text-left font-inherit text-inherit tracking-inherit leading-inherit"
              />
            </span>
          </span>

          {/* Static Second Word: DESIGNER aligned to the far right on tablet/desktop */}
          <span className="inline-block shrink-0 align-baseline text-foreground text-left md:text-right">
            {staticWord}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default HeroMorphingTitle;
