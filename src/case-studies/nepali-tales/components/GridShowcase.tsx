import Image from "next/image";
import * as PhosphorIcons from "@phosphor-icons/react/ssr";
import { NEPALI_TALES_METADATA } from "../data";

export function GridShowcase() {
  return (
    <section
      id="background-context"
      aria-labelledby="heading-context"
      className="flex flex-col gap-10 pt-6"
    >
      {/* Background Context Header */}
      <div className="flex flex-col gap-3">
        <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground font-medium">
          Background Context
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-start">
          <h2
            id="heading-context"
            className="text-xl sm:text-2xl font-regular text-foreground tracking-tight leading-snug"
          >
            From WhatsApp orders to a digital ordering platform.
          </h2>
          <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed font-sans">
            Nepali Tales is a cloud kitchen serving freshly prepared food through a
            preorder based model. As demand grew, the founders needed a better
            way to manage orders, customizations, etc while keeping the
            experience simpler for customers.
          </p>
        </div>
      </div>

      {/* Editorial Architectural Grid Showcase */}
      <div className="flex flex-col gap-6 sm:gap-8 pt-2">
        {/* Main Grid: Empty Spacing + Text Panel + Spacer + Image Panel */}
        <div className="relative w-full">
          {/* Desktop & Tablet: Multi-column architectural grid with extending lines */}
          <div className="hidden md:grid grid-cols-[1.5fr_3fr_0.5fr_5fr] items-stretch relative">
            {/* Top continuous horizontal line extending past grid */}
            <div
              className="absolute -top-px -left-4 -right-4 h-px bg-border-subtle pointer-events-none"
              aria-hidden="true"
            />
            {/* Bottom continuous horizontal line extending past grid */}
            <div
              className="absolute -bottom-px -left-4 -right-4 h-px bg-border-subtle pointer-events-none"
              aria-hidden="true"
            />

            {/* Column 1: Left empty column acting as visual spacing */}
            <div className="relative h-full" aria-hidden="true">
              {/* Optional subtle inner grid watermark or empty space */}
            </div>

            {/* Column 2: Text Panel (Problem Scenario) */}
            <div className="relative bg-surface p-6 sm:p-7 md:p-8 flex flex-col justify-between h-full min-h-[290px] border-t border-b border-border-subtle">
              {/* Left vertical border extending above & below */}
              <div
                className="absolute -top-4 -bottom-6 left-0 w-px bg-border-subtle pointer-events-none"
                aria-hidden="true"
              />
              {/* Right vertical border extending above & below */}
              <div
                className="absolute -top-4 -bottom-6 right-0 w-px bg-border-subtle pointer-events-none"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-2.5">
                <span className="font-pixel text-xs text-muted-foreground uppercase tracking-wider">
                  Problem Scenario
                </span>
                <h3 className="text-lg sm:text-xl md:text-[1.35rem] font-light text-foreground  leading-snug">
                  When growth started outpacing operations.
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-6 font-light">
                As orders grew, managing them through WhatsApp became harder to
                track and confusing time slots made it difficult to co-ordinate
              </p>
            </div>

            {/* Column 3: Spacer / gutter between text and image panel */}
            <div className="relative h-full" aria-hidden="true" />

            {/* Column 4: Large Image Panel */}
            <div className="relative h-full min-h-[290px]  overflow-hidden border-t border-b border-border-subtle">
              {/* Left vertical border extending above & below */}
              <div
                className="absolute -top-4 -bottom-6 left-0 w-px bg-border-subtle pointer-events-none z-10"
                aria-hidden="true"
              />
              {/* Right vertical border extending above & below */}
              <div
                className="absolute -top-4 -bottom-6 right-0 w-px bg-border-subtle pointer-events-none z-10"
                aria-hidden="true"
              />

              <Image
                src="/images/projects/thumbnails/nepaliTalesThumbnail.jpg"
                alt="Nepali Tales Pre-Order System Mobile Mockup"
                fill
                priority
                sizes="(max-width: 960px) calc(50vw - 48px), 440px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Mobile Stacking Layout (< 768px) */}
          <div className="flex md:hidden flex-col border border-border-subtle bg-surface">
            {/* Text Panel */}
            <div className="p-6 flex flex-col gap-4 border-b border-border-subtle">
              <span className="font-pixel text-xs text-muted-foreground uppercase">
           
               
                Problem Scenario
              </span>
              <h3 className="text-lg font-medium text-foreground tracking-tight leading-snug">
                When growth started outpacing operations.
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                As orders grew, managing them through WhatsApp became harder to
                track and confusing time slots made it difficult to co-ordinate
              </p>
            </div>

            {/* Image Panel */}
            <div className="relative w-full aspect-[4/3] bg-white overflow-hidden">
              <Image
                src="/images/projects/thumbnails/nepaliTalesThumbnail.jpg"
                alt="Nepali Tales Pre-Order System Mobile Mockup"
                fill
                priority
                sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 768px) calc(100vw - 64px), 480px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Three Metric Cards Directly Below */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 pt-1">
          {/* Card 1: Live */}
          <div className="bg-surface border border-border-subtle p-5 sm:p-6 flex flex-col justify-between min-h-[170px] sm:min-h-[185px]">
            <span className="font-pixel text-xs text-muted-foreground uppercase">Live</span>
            <div className="flex flex-col gap-2 mt-auto pt-6">
              <a
                href={NEPALI_TALES_METADATA.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm sm:text-sm font-regular text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1.5 group w-fit"
              >
                <span>Shipped</span>
                <PhosphorIcons.ArrowUpRightIcon
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={NEPALI_TALES_METADATA.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-regular text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group w-fit"
              >
                <span>Overview in figma</span>
                <PhosphorIcons.ArrowUpRightIcon
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>

          {/* Card 2: Menu Engagement */}
          <div className="bg-surface border border-border-subtle p-5 sm:p-6 flex flex-col justify-between min-h-[170px] sm:min-h-[185px]">
            <span className="font-pixel text-xs text-muted-foreground uppercase">
              Menu Engagement
            </span>
            <div className="flex flex-col mt-auto pt-4">
              <span className="font-sans text-2xl sm:text-4xl font-regular text-foreground leading-none mb-3">
                {NEPALI_TALES_METADATA.stats.menuEngagement}
              </span>
              <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed">
                {NEPALI_TALES_METADATA.stats.menuEngagementDesc}
              </p>
            </div>
          </div>

          {/* Card 3: Active Users */}
          <div className="bg-surface border border-border-subtle p-5 sm:p-6 flex flex-col justify-between min-h-[170px] sm:min-h-[185px]">
            <span className="font-pixel uppercase text-xs text-muted-foreground">
              Active Users
            </span>
            <div className="flex flex-col mt-auto pt-4">
              <span className="font-sans text-3xl sm:text-4xl font-regular text-foreground leading-none mb-3">
                {NEPALI_TALES_METADATA.stats.activeUsers}
              </span>
              <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed">
                {NEPALI_TALES_METADATA.stats.activeUsersDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GridShowcase;
