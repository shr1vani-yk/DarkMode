import Link from "next/link";
import Image from "next/image";
import { PLIX_CASE_STUDY, PlixAsset } from "@/data/plixCaseStudy";
import {
  CaseStudyDesktopSidebar,
  CaseStudyMobileBar,
  TopicItem,
} from "@/components/CaseStudyTopicNav";
import { CaseStudyThemeToggle } from "@/components/CaseStudyThemeToggle";

const PLIX_TOPICS: TopicItem[] = [
  { id: "overview", label: "Overview", shortLabel: "Overview" },
  { id: "concept", label: "Concept", shortLabel: "Concept" },
  {
    id: "product-spotlight",
    label: "Product Spotlight",
    shortLabel: "Spotlight",
  },
  {
    id: "product-narrative",
    label: "Product Narrative",
    shortLabel: "Narrative",
  },
  {
    id: "b1g1-creatives",
    label: "B1G1 Creatives",
    shortLabel: "B1G1",
  },
  {
    id: "reflection",
    label: "Pausing to Reflect",
    shortLabel: "Reflect",
  },
  {
    id: "testimonials",
    label: "What They Said",
    shortLabel: "Kind Words",
  },
];

interface PlixFigureProps {
  asset: PlixAsset;
  sizes: string;
  priority?: boolean;
  hasLightEdgeShadow?: boolean;
  className?: string;
}

/**
 * Renders a supplied Plix showcase asset at its exact intrinsic aspect ratio
 * to eliminate layout shift (CLS = 0) while preserving rounded alpha corners.
 */
function PlixFigure({
  asset,
  sizes,
  priority = false,
  hasLightEdgeShadow = false,
  className = "",
}: PlixFigureProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl lg:rounded-[30px] ${className}`}
      style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={`w-full h-auto block object-cover ${
          hasLightEdgeShadow
            ? "drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)] dark:drop-shadow-none"
            : ""
        }`}
      />
    </div>
  );
}

export function PlixCaseStudy() {
  const {
    heroImage,
    overview,
    concept,
    productSpotlight,
    productNarrative,
    b1g1,
    reflection,
    testimonials,
    signoff,
    nextWork,
  } = PLIX_CASE_STUDY;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-[#e8590c]/15">
      {/* Desktop theme toggle matching existing case study chrome */}
      <CaseStudyThemeToggle />

      {/* Mobile / tablet sticky horizontal topic bar */}
      <CaseStudyMobileBar topics={PLIX_TOPICS} />

      {/* Two-Column Case Study Frame */}
      <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-14 pt-6 sm:pt-10 lg:pt-14 pb-20 grid grid-cols-1 lg:grid-cols-[160px_1fr] xl:grid-cols-[180px_1fr] gap-8 lg:gap-12 xl:gap-16">
        {/* Sticky Left Navigation Rail */}
        <CaseStudyDesktopSidebar topics={PLIX_TOPICS} />

        {/* Right Showcase & Narrative Column */}
        <main className="min-w-0 w-full max-w-[920px] flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {/* 1. Hero Visual + Overview + 4-Column Metadata */}
          <section
            id="overview"
            aria-labelledby="heading-overview"
            className="scroll-mt-24 flex flex-col gap-8 sm:gap-10"
          >
            {/* Top Hero Artwork */}
            <PlixFigure
              asset={heroImage}
              priority
              hasLightEdgeShadow
              sizes="(max-width: 1024px) 100vw, 920px"
            />

            {/* Header Block */}
            <div className="flex flex-col gap-3 sm:gap-4 lg:max-w-[78%]">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs text-muted-foreground tracking-wider uppercase">
                <span>{overview.brand}</span>
                <span aria-hidden="true">/</span>
                <span>{overview.discipline}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{overview.readTime}</span>
              </div>

              <h1
                id="heading-overview"
                className="font-sans font-semibold text-[1.85rem] sm:text-4xl lg:text-[2.65rem] text-foreground tracking-tight leading-[1.12]"
              >
                {overview.title}
              </h1>

              <p className="font-sans text-[15px] sm:text-base text-muted-foreground leading-[1.65] max-w-2xl">
                {overview.description}
              </p>
            </div>

            {/* 4-Column Metadata Strip Matching Figma Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-6 border-y border-border-subtle/70">
              {/* Column 1: Deliverables Pills */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-2.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Deliverables
                </span>
                <div className="flex flex-wrap md:flex-col items-start gap-1.5">
                  {overview.deliverables.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-sans bg-surface-hover text-foreground/90 border border-border-subtle"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Column 2: Role */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Role
                </span>
                <span className="font-sans text-xs sm:text-sm text-foreground leading-snug">
                  {overview.role}
                </span>
              </div>

              {/* Column 3: Timeline */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Timeline
                </span>
                <span className="font-sans text-xs sm:text-sm text-foreground leading-snug">
                  {overview.timeline}
                </span>
              </div>

              {/* Column 4: Year & Team */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Year &amp; Team
                </span>
                <span className="font-sans text-xs sm:text-sm text-foreground font-medium">
                  {overview.year}
                </span>
                <span className="font-sans text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                  {overview.teamCollaboration}
                </span>
              </div>
            </div>
          </section>

          {/* 2. Section: CONCEPT — The Plix ecosystem */}
          <section
            id="concept"
            aria-labelledby="heading-concept"
            className="scroll-mt-24 flex flex-col gap-6 sm:gap-8"
          >
            <div className="flex flex-col gap-2 lg:max-w-[78%]">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {concept.eyebrow}
              </span>
              <h2
                id="heading-concept"
                className="font-sans font-semibold text-xl sm:text-2xl lg:text-[1.75rem] text-foreground tracking-tight leading-snug"
              >
                {concept.title}
              </h2>
              <p className="font-sans text-sm sm:text-[15px] text-muted-foreground leading-[1.7] pt-1">
                {concept.body}
              </p>
            </div>

            {/* 2-Up Portrait Image Pair */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
              {concept.images.map((img) => (
                <PlixFigure
                  key={img.src}
                  asset={img}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
                />
              ))}
            </div>
          </section>

          {/* 3. Section: PRODUCT SPOTLIGHT — From product benefits to visual language. */}
          <section
            id="product-spotlight"
            aria-labelledby="heading-spotlight"
            className="scroll-mt-24 flex flex-col gap-6 sm:gap-8"
          >
            <div className="flex flex-col gap-1 lg:max-w-[78%]">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {productSpotlight.eyebrow}
              </span>
              <h2
                id="heading-spotlight"
                className="font-sans font-semibold text-xl sm:text-2xl lg:text-[1.75rem] text-foreground tracking-tight leading-snug"
              >
                {productSpotlight.title}
              </h2>
            </div>

            {/* 2-Up Pair + Full-Width Banner */}
            <div className="flex flex-col gap-4 sm:gap-5 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
                {productSpotlight.pair.map((img) => (
                  <PlixFigure
                    key={img.src}
                    asset={img}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
                  />
                ))}
              </div>
              <PlixFigure
                asset={productSpotlight.wide}
                hasLightEdgeShadow
                sizes="(max-width: 1024px) 100vw, 920px"
              />
            </div>
          </section>

          {/* 4. Section: PRODUCT NARRATIVE — Products, with a little more personality. */}
          <section
            id="product-narrative"
            aria-labelledby="heading-narrative"
            className="scroll-mt-24 flex flex-col gap-6 sm:gap-8"
          >
            <div className="flex flex-col gap-1 lg:max-w-[78%]">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {productNarrative.eyebrow}
              </span>
              <h2
                id="heading-narrative"
                className="font-sans font-semibold text-xl sm:text-2xl lg:text-[1.75rem] text-foreground tracking-tight leading-snug"
              >
                {productNarrative.title}
              </h2>
            </div>

            {/* Full-Width Wide Banner + 2-Up Pair */}
            <div className="flex flex-col gap-4 sm:gap-5 w-full">
              <PlixFigure
                asset={productNarrative.wide}
                sizes="(max-width: 1024px) 100vw, 920px"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
                {productNarrative.pair.map((img) => (
                  <PlixFigure
                    key={img.src}
                    asset={img}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* 5. Section: PROMOTIONAL CAMPAIGNS / B1G1 — Making a good deal look better. */}
          <section
            id="b1g1-creatives"
            aria-labelledby="heading-b1g1"
            className="scroll-mt-24 flex flex-col gap-6 sm:gap-8"
          >
            <div className="flex flex-col gap-3 lg:max-w-[78%]">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {b1g1.eyebrow}
                </span>
                <h2
                  id="heading-b1g1"
                  className="font-sans font-semibold text-xl sm:text-2xl lg:text-[1.75rem] text-foreground tracking-tight leading-snug"
                >
                  {b1g1.title}
                </h2>
              </div>

              {/* Vertical Orange Line Callout */}
              <p className="pl-4 border-l-2 border-[#e8590c] dark:border-[#f97316] font-sans text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                {b1g1.callout}
              </p>
            </div>

            {/* Full-Width Hero Banner + 2-Up Pair */}
            <div className="flex flex-col gap-4 sm:gap-5 w-full">
              <PlixFigure
                asset={b1g1.wide}
                sizes="(max-width: 1024px) 100vw, 920px"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
                {b1g1.pair.map((img) => (
                  <PlixFigure
                    key={img.src}
                    asset={img}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* 6. Section: LEARNINGS & REFLECTION — Pausing to Reflect */}
          <section
            id="reflection"
            aria-labelledby="heading-reflection"
            className="scroll-mt-24 flex flex-col gap-4 lg:max-w-[78%] pt-2"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {reflection.eyebrow}
              </span>
              <h2
                id="heading-reflection"
                className="font-sans font-semibold text-xl sm:text-2xl lg:text-[1.75rem] text-foreground tracking-tight leading-snug"
              >
                {reflection.title}
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-sm sm:text-[15px] text-muted-foreground font-sans leading-[1.75] pt-1">
              {reflection.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* 7. Section: KIND WORDS / PLIX — The people I got to create with. */}
          <section
            id="testimonials"
            aria-labelledby="heading-testimonials"
            className="scroll-mt-24 flex flex-col gap-6 sm:gap-8"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {testimonials.eyebrow}
              </span>
              <h2
                id="heading-testimonials"
                className="font-sans font-semibold text-xl sm:text-2xl lg:text-[1.75rem] text-foreground tracking-tight leading-snug"
              >
                {testimonials.title}
              </h2>
            </div>

            {/* Team Photo + Tilted Orange Tag */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-5">
              <div className="w-56 sm:w-64 lg:w-[270px] shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-border-subtle">
                <Image
                  src={testimonials.teamImage.src}
                  alt={testimonials.teamImage.alt}
                  width={testimonials.teamImage.width}
                  height={testimonials.teamImage.height}
                  loading="lazy"
                  sizes="(max-width: 640px) 224px, 270px"
                  className="w-full h-auto block object-cover"
                />
              </div>

              <span className="inline-block w-fit mb-2 sm:mb-7 px-3.5 py-1.5 rounded-xs bg-[#e8590c] dark:bg-[#ea580c] text-white font-sans text-xs font-medium tracking-tight shadow-sm -rotate-6 select-none">
                {testimonials.teamBadge}
              </span>
            </div>

            {/* 2-Column Peer Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-2">
              {testimonials.quotes.map((item) => (
                <div
                  key={item.author}
                  className="flex flex-col justify-between gap-4"
                >
                  <p className="font-sans text-xs sm:text-[13.5px] text-muted-foreground leading-[1.7]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex flex-col">
                    <span className="font-sans text-xs sm:text-sm font-semibold text-foreground">
                      {item.author}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {item.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Minimal Mono Sign-Off & Direct Email Band */}
          <div className="py-10 sm:py-12 border-t border-b border-border-subtle/70 grid grid-cols-1 md:grid-cols-[auto_auto_1fr] gap-4 md:gap-10 items-start font-mono text-[11px] uppercase tracking-wider">
            <span className="text-muted-foreground">{signoff.copyright}</span>
            <span className="text-muted-foreground">{signoff.discipline}</span>
            <div className="flex flex-col gap-1.5 md:ml-auto md:max-w-sm text-foreground/85 leading-relaxed">
              <p>{signoff.note}</p>
              <a
                href={signoff.emailHref}
                className="text-foreground hover:text-[#e8590c] dark:hover:text-[#f97316] transition-colors w-fit"
              >
                [ {signoff.email} ]
              </a>
            </div>
          </div>

          {/* 9. Next Work Card (`Kora | Branding` / `( 02 )`) */}
          <Link
            href="/#work"
            aria-label="Back to Selected Work — Next Work: Kora Branding"
            className="group block w-full pt-2 select-none"
          >
            <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground mb-3 sm:mb-4">
              <span>{nextWork.leftLabel}</span>
              <span>{nextWork.rightLabel}</span>
            </div>

            <div
              className="relative w-full overflow-hidden rounded-2xl lg:rounded-[28px]"
              style={{
                aspectRatio: `${nextWork.image.width} / ${nextWork.image.height}`,
              }}
            >
              <Image
                src={nextWork.image.src}
                alt={nextWork.image.alt}
                width={nextWork.image.width}
                height={nextWork.image.height}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 920px"
                className="w-full h-auto block object-cover transition-transform duration-300 ease-out group-hover:scale-[1.01]"
              />
            </div>
          </Link>

          {/* 10. Minimalist Colophon Footer */}
          <footer className="pt-8 pb-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
            <div>
              <span>Shravani Sutar Portfolio &middot; 2026</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/#work"
                className="hover:text-foreground transition-colors"
              >
                &larr; Back to Selected Work
              </Link>
              <span>&bull;</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Back to Top &uarr;
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
