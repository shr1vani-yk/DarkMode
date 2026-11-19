"use client";

import Link from "next/link";
import * as PhosphorIcons from "@phosphor-icons/react";

export interface HeroNoteProps {
  className?: string;
  greeting?: string;
  subGreeting?: string;
  statement?: string;
  linkedinUrl?: string;
}

export function HeroNote({
  className = "",
  greeting = "Hey, Shrav here.",
  subGreeting = "Shravani, if we're being formal.",
  statement = "I'm a 0–1 Product Designer who designs for impact at startups.",
  linkedinUrl = "https://www.linkedin.com/in/shravanisutar",
}: HeroNoteProps) {
  return (
    <div
      className={`relative w-full rounded-2xl bg-[#3252d6] text-white p-3.5 sm:p-5 md:p-5 xl:p-6 2xl:p-7 shadow-xl shadow-[#3252d6]/20 border border-white/10 flex flex-col justify-between select-none ${className}`}
      role="region"
      aria-label="Personal introduction note"
    >
      {/* Top Hanging Notebook Details: 5 Circular Punched Holes with Slits */}
      <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 pointer-events-none">
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Cut-in slit at the top border */}
            <div className="w-[2.5px] sm:w-[3px] h-1.5 sm:h-2 bg-background -mb-[2px] z-10" />
            {/* Punched circular hole */}
            <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-background shadow-inner" />
          </div>
        ))}
      </div>

      {/* Note Content */}
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 pt-2 sm:pt-3">
        {/* Intro Microcopy */}
        <div className="font-pixel text-[10px] sm:text-[11px] md:text-xs text-white/60 leading-tight">
          <p>{greeting}</p>
          <p>{subGreeting}</p>
        </div>

        {/* Main Focus Statement */}
        <p className="font-sans font-light text-[13px] sm:text-[15px] md:text-base lg:text-[1.18rem] xl:text-[1.38rem] text-white leading-[114%] sm:leading-[110%] tracking-[0.01em]">
          {statement}
        </p>

        {/* LinkedIn Link */}
        <div className="pt-0.5 sm:pt-1">
          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-pixel text-[10px] sm:text-xs text-white/80 hover:text-white transition-colors"
            aria-label="Connect on LinkedIn (opens in a new tab)"
          >
            <span className="underline underline-offset-4 decoration-white/40 group-hover:decoration-white transition-colors">
              LinkedIn
            </span>
            <PhosphorIcons.ArrowUpRightIcon size={13} className="shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroNote;
