"use client";

import { useState } from "react";

export function EditorialHero() {
  const [activeTab, setActiveTab] = useState<"system" | "motion" | "craft">("system");
  const [sliderVal, setSliderVal] = useState(72);

  return (
    <section className="relative w-full pt-8 pb-16 md:py-16 lg:py-20 flex flex-col gap-12 lg:gap-16 border-b border-border-subtle">
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 -z-10 bg-grid-subtle opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]"
        aria-hidden="true"
      />

      {/* Top Tagline & Status Pill */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-surface/80 text-[0.6875rem] font-mono text-muted-foreground backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>Product Design &amp; Interface Engineering</span>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-[0.6875rem] font-mono text-subtle-foreground">
          <span>LAT 37.7749° N</span>
          <span>•</span>
          <span>LONG 122.4194° W</span>
          <span>•</span>
          <span>INDEX &apos;26</span>
        </div>
      </div>

      {/* Asymmetrical Editorial Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column (7 cols): Large Typography & Statement */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h1 className="font-sans font-semibold tracking-[-0.035em] text-[var(--font-size-hero)] leading-[1.04] text-foreground text-balance">
            Crafting tactile interfaces,{" "}
            <span className="italic font-normal text-muted-foreground">
              design systems
            </span>
            , &amp; thoughtful digital tools.
          </h1>

          <p className="max-w-2xl text-[var(--font-size-body)] leading-relaxed text-muted-foreground font-sans">
            I am a product designer and frontend design engineer specializing in high-craft
            interaction design, web platforms, and design tools. Focusing on the space
            where design sensibility meets robust code execution.
          </p>

          {/* Quick Action Badges / CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-sans font-medium hover:opacity-90 transition-all hover:translate-y-[-1px]"
            >
              <span>Explore Selected Work</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-strong hover:bg-surface-hover text-xs font-sans font-medium text-foreground transition-all"
            >
              <span>Read About &amp; Craft</span>
            </a>
          </div>
        </div>

        {/* Right Column (5 cols): Asymmetrical Floating Visual / Specimen Card */}
        <div className="lg:col-span-5 relative">
          {/* Decorative Corner Pluses */}
          <div className="relative rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm flex flex-col gap-5 corner-cross corner-cross-tl corner-cross-br">
            {/* Specimen Header */}
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-border-strong/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-border-strong/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-border-strong/40" />
                </div>
                <span className="text-[0.6875rem] font-mono text-muted-foreground pl-2">
                  interface-specimen.tsx
                </span>
              </div>
              <span className="text-[0.625rem] font-mono px-2 py-0.5 rounded bg-accent-subtle text-accent-foreground font-medium">
                INTERACTIVE
              </span>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="rounded-xl border border-border-subtle bg-background p-4 flex flex-col gap-4">
              {/* Pill Segmented Controls */}
              <div className="flex p-1 rounded-lg bg-surface border border-border-subtle">
                {(["system", "motion", "craft"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-1 text-[0.6875rem] font-mono uppercase tracking-wider rounded-md transition-all ${
                      activeTab === tab
                        ? "bg-foreground text-background font-medium shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Dynamic Interactive Panel */}
              <div className="h-28 rounded-lg bg-surface-elevated border border-border-subtle p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[0.6875rem] font-mono text-muted-foreground">
                  <span>Fluid Tension</span>
                  <span className="text-foreground font-semibold">{sliderVal}%</span>
                </div>

                {/* Range Slider for Tactile Feel */}
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number(e.target.value))}
                  className="w-full accent-foreground cursor-pointer"
                />

                <div className="flex items-center justify-between text-[0.625rem] font-mono text-subtle-foreground pt-1">
                  <span>Spring: 260</span>
                  <span>Damping: {sliderVal}</span>
                  <span>Precision: 0.001</span>
                </div>
              </div>
            </div>

            {/* Floating Visual Accent Ribbon */}
            <div className="flex items-center justify-between text-xs font-sans text-muted-foreground pt-1">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Micro-interactions &amp; systems</span>
              </span>
              <span className="font-mono text-[0.6875rem] text-subtle-foreground">
                ggkim-inspired layout
              </span>
            </div>
          </div>

          {/* Overlapping Floating Element */}
          <div className="hidden sm:flex absolute -bottom-5 -left-6 rounded-lg border border-border-strong bg-background/95 backdrop-blur-md px-3.5 py-2 shadow-lg items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <div className="flex flex-col">
              <span className="text-[0.6875rem] font-mono uppercase tracking-wide text-foreground font-medium">
                Design Engineering
              </span>
              <span className="text-[0.625rem] font-sans text-muted-foreground">
                Zero abstraction waste
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Metadata Grid Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border-subtle">
        <div className="flex flex-col gap-1">
          <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-subtle-foreground">
            Discipline
          </span>
          <span className="text-xs font-sans font-medium text-foreground">
            Product &amp; Systems Design
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-subtle-foreground">
            Engineering
          </span>
          <span className="text-xs font-sans font-medium text-foreground">
            Next.js, TypeScript, Tailwind
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-subtle-foreground">
            Focus
          </span>
          <span className="text-xs font-sans font-medium text-foreground">
            Tactile Web &amp; AI Tools
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-subtle-foreground">
            Location
          </span>
          <span className="text-xs font-sans font-medium text-foreground">
            San Francisco, CA (Remote)
          </span>
        </div>
      </div>
    </section>
  );
}
