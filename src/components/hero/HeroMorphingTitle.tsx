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
  greetingLeft = "Hola I'm",
  greetingRight = "From India",
}: HeroMorphingTitleProps) {
  return (
    <div className={`w-full flex flex-col gap-3 sm:gap-4 ${className}`}>
      {/* Top Labels: Positioned at opposite ends */}
      <div className="flex items-center justify-between w-full select-none">
        <span className="font-sans text-base sm:text-lg md:text-xl font-light text-foreground tracking-normal">
          {greetingLeft}
        </span>
        <span className="font-sans text-base sm:text-lg md:text-xl font-light text-foreground tracking-normal">
          {greetingRight}
        </span>
      </div>

      {/* Main Headline: Dominant typography occupying the hero */}
      <div className="w-full flex flex-col justify-center select-none pt-1">
        <h1 className="w-full text-foreground font-sans font-regular tracking-tight uppercase leading-[0.92] text-[clamp(2.75rem,7.5vw,7.75rem)] flex flex-col md:flex-row md:items-baseline md:gap-x-[0.28em] gap-y-1">
          {/* Morphing Word Slot with Zero Layout Shift */}
          <span className="relative inline-block text-left align-baseline">
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

          {/* Static Second Word: DESIGNER remains completely static */}
          <span className="inline-block shrink-0 align-baseline text-foreground mr-20">
            {staticWord}
          </span>
        </h1>
      </div>
    </div>
  );
}
