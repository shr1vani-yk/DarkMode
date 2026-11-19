"use client";

import { HeroMorphingTitle } from "./HeroMorphingTitle";
import { HeroSticker } from "./HeroSticker";
import { HeroNote } from "./HeroNote";
import { HeroEnterButton } from "./HeroEnterButton";

export interface HeroProps {
  className?: string;
  audioSrc?: string;
}

export function Hero({ className = "", audioSrc }: HeroProps) {
  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className={`relative isolate w-full flex flex-col gap-6 sm:gap-8 lg:gap-10 pt-1 sm:pt-3 pb-8 sm:pb-12 select-none ${className}`}
    >
      {/* 
        Parent-controlled CSS Grid:
        - Mobile & Tablet (< 1280px / < xl):
          2-column grid:
          Row 1: [title] spans both columns
          Row 2: [note] on col 1, [enter] on col 2 (spanning rows 2-3)
          Row 3: [sticker] directly below note on col 1, [enter] aligned to bottom on col 2
        - Desktop (>= 1280px / xl:):
          3-column grid:
          Row 1: [title] spans all 3 columns
          Row 2: [sticker] on col 1 (left), [note] on col 2 (center), [enter] on col 3 (right)
      */}
      <div
        className="grid w-full items-end gap-x-3 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4 xl:gap-y-6
          grid-cols-[minmax(0,1fr)_auto]
          [grid-template-areas:'title_title'_'note_enter'_'sticker_enter']
          xl:grid-cols-[auto_1fr_auto]
          xl:[grid-template-areas:'title_title_title'_'sticker_note_enter']"
      >
        {/* Child 1: Headline */}
        <div className="[grid-area:title] w-full">
          <HeroMorphingTitle />
        </div>

        {/* Child 2: Blue Personal Note */}
        <div className="[grid-area:note] w-full max-w-[170px] sm:max-w-[240px] md:max-w-[280px] xl:max-w-[420px] 2xl:max-w-[460px] xl:mx-auto">
          <HeroNote />
        </div>

        {/* Child 3: Interactive Sticker Folder */}
        {/* <div className="[grid-area:sticker] w-fit -mt-3 sm:-mt-5 md:-mt-6 xl:mt-0 xl:self-end">
          <HeroSticker />
        </div> */}

        {/* Child 4: ISO Keycap Enter Button */}
        <div className="[grid-area:enter] self-end justify-self-end pb-1 sm:pb-2 xl:pb-0">
          <HeroEnterButton audioSrc={audioSrc} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
