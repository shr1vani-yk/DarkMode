"use client";

import Link from "next/link";

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
      className={`relative rounded-xl bg-[#3252d6] text-white p-2 sm:p-6 lg:p-7 shadow-xl shadow-[#3252d6]/20 border border-white/10 flex flex-col justify-between select-none ${className}`}
      role="region"
      aria-label="Personal introduction note"
    >
      {/* Top Hanging Notebook Details: 5 Circular Punched Holes with Slits */}
      <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 sm:gap-4 pointer-events-none">
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Cut-in slit at the top border */}
            <div className="w-[3px] h-2 bg-[#151515] -mb-[2px] z-10" />
            {/* Punched circular hole */}
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#151515] shadow-inner" />
          </div>
        ))}
      </div>

      {/* Note Content */}
      <div className="flex flex-col gap-4 sm:gap-5 pt-3">
        {/* Intro Microcopy */}
        <div className="font-pixel text-[16px] sm:text-xs text-white/50 leading-relaxed tracking-normal">
          <p>{greeting}</p>
          <p>{subGreeting}</p>
        </div>

        {/* Main Focus Statement */}
        <p className="font-sans font-light text-lg sm:text-xl lg:text-[1.62rem] text-white leading-[106%] tracking-[0.02em]">
          {statement}
        </p>

        {/* LinkedIn Link */}
        <div className="pt-1">
          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-mono text-xs sm:text-[13px] text-white/80 hover:text-white transition-colors"
            aria-label="Connect on LinkedIn (opens in a new tab)"
          >
            <span className="underline underline-offset-4 decoration-white/40 group-hover:decoration-white transition-colors">
              LinkedIn
            </span>
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
