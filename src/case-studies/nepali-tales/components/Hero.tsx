import { NEPALI_TALES_METADATA } from "../data";

interface HeroProps {
  readTime?: string;
  displayTitle?: string;
}

export function Hero({
  readTime = NEPALI_TALES_METADATA.readTime,
  displayTitle = NEPALI_TALES_METADATA.displayTitle,
}: HeroProps) {
  return (
    <header className="flex flex-col">
      {/* Eyebrow: case study · 3 min read */}
      <span className="font-sans text-xs sm:text-sm text-muted-foreground font-normal mb-2.5">
        case study &middot; {readTime}
      </span>

      {/* Display Title in Stack Sans */}
      <h1 className="font-sans font-semibold text-3xl sm:text-4xl md:text-[2.65rem] text-foreground tracking-tight leading-[1.14] mb-8 sm:mb-10">
        {displayTitle}
      </h1>

      {/* 3-Column Metadata Row (Exact match to screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pb-8 border-b border-border-subtle/70">
        {/* Column 1: Timeline */}
        <div className="flex flex-col gap-1">
          <span className="font-sans text-xs text-muted-foreground font-normal">
            Timeline
          </span>
          <span className="font-sans text-sm text-foreground font-normal">
            {NEPALI_TALES_METADATA.timeline}
          </span>
        </div>

        {/* Column 2: Contributors */}
        <div className="flex flex-col gap-1">
          <span className="font-sans text-xs text-muted-foreground font-normal">
            Contributors
          </span>
          <div className="font-sans text-sm text-foreground font-normal leading-relaxed flex flex-col">
            {NEPALI_TALES_METADATA.contributors.map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>

        {/* Column 3: My Contribution */}
        <div className="flex flex-col gap-1">
          <span className="font-sans text-xs text-muted-foreground font-normal">
            My Contribution
          </span>
          <div className="font-sans text-sm text-foreground font-normal leading-relaxed flex flex-col">
            {NEPALI_TALES_METADATA.contributions.map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
