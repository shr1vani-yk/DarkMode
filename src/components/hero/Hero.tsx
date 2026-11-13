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
      className={`w-full flex flex-col gap-8 sm:gap-10 lg:gap-12 pt-2 sm:pt-4 pb-10 sm:pb-14 select-none ${className}`}
    >
      {/* Morphing Headline & Top Greeting Labels */}
      <HeroMorphingTitle />

      {/* Desktop & Tablet Composition (>= 768px) */}
      <div className="hidden md:flex items-end justify-between w-full pt-2 lg:pt-6 gap-4 lg:gap-8">
        {/* Left: Floating App-Icon Sticker */}
        <div className="w-[180px] lg:w-[210px] shrink-0 flex justify-start">
          <HeroSticker />
        </div>

        {/* Center: Blue Personal Note with Hanging Notebook Punched Holes */}
        <div className="flex-1 max-w-[380px] lg:max-w-[440px] mx-auto">
          <HeroNote />
        </div>

        {/* Right: Irregular ISO Enter Keycap Button */}
        <div className="w-[140px] lg:w-[170px] shrink-0 flex justify-end">
          <HeroEnterButton audioSrc={audioSrc} />
        </div>
      </div>

      {/* Mobile Composition (< 768px) */}
      <div className="flex md:hidden flex-col gap-6 w-full pt-1">
        {/* Blue Personal Note positioned directly below the wrapped headline */}
        <div className="w-full">
          <HeroNote />
        </div>

        {/* Lower Row: Sticker on Left, Enter Button on Right */}
        <div className="flex items-end justify-between w-full pt-1">
          <div className="shrink-0 -ml-2">
            <HeroSticker forceExpanded />
          </div>
          <div className="shrink-0">
            <HeroEnterButton audioSrc={audioSrc} />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
