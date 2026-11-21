"use client";

import { HeroMorphingTitle } from "./HeroMorphingTitle";
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
      {/* Morphing Headline */}
      <div className="w-full">
        <HeroMorphingTitle />
      </div>

      {/* Visual Elements Row: Blue Note on Left, Enter Graphic on Right */}
      <div className="w-full flex items-end justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
        {/* Left: Blue Personal Intro Card */}
        <div className="flex-1 min-w-0 max-w-[200px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[380px] xl:max-w-[420px] 2xl:max-w-[460px]">
          <HeroNote />
        </div>

        {/* Right: ISO Keycap Enter Button */}
        <div className="shrink-0 self-end">
          <HeroEnterButton audioSrc={audioSrc} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
