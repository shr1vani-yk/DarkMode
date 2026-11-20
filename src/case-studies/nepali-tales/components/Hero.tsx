import { NEPALI_TALES_METADATA } from "../data";

export function Hero() {
  return (
    <header className="flex flex-col">
      {/* Eyebrow: CASE STUDY · 4 MIN READ · Live with green dot */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
        <span>CASE STUDY</span>
        <span>&bull;</span>
        <span>{NEPALI_TALES_METADATA.readTime}</span>
      
        <span className="inline-flex items-center gap-1.5 text-foreground font-sans font-regular capitalize">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {NEPALI_TALES_METADATA.status}
        </span>
      </div>

      {/* Main Display Title */}
      <h1 className="font-sans font-regular text-2xl sm:text-4xl md:text-[2.65rem] text-foreground tracking-tight leading-[1.14] mb-8 sm:mb-10">
        {NEPALI_TALES_METADATA.displayTitle}
      </h1>

      {/* 4-Column Metadata Row matching Figma reference */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-10 border-b border-border-subtle/70">
        {/* Column 1: Platform */}
        <div className="flex flex-col gap-1.5">
          <span className="font-pixel font-light text-xs uppercase text-muted-foreground font-normal">
            Platform
          </span>
          <div className="font-sans font-light text-sm text-foreground leading-relaxed flex flex-col">
            {NEPALI_TALES_METADATA.platforms.map((p, i) => (
              <span key={i}>{p}</span>
            ))}
          </div>
        </div>

        {/* Column 2: Role */}
        <div className="flex flex-col gap-1.5">
          <span className="font-pixel font-light uppercase text-xs text-muted-foreground font-normal">
            Role
          </span>
          <div className="font-sans font-light text-sm text-foreground leading-relaxed flex flex-col">
            {NEPALI_TALES_METADATA.roles.map((r, i) => (
              <span key={i}>{r}</span>
            ))}
          </div>
        </div>

        {/* Column 3: Timeline */}
        <div className="flex flex-col gap-1.5">
          <span className="font-pixel font-light uppercase text-xs text-muted-foreground font-normal">
            Timeline
          </span>
          <span className="font-sans font-light text-sm text-foreground font-normal">
            {NEPALI_TALES_METADATA.timeline}
          </span>
        </div>

        {/* Column 4: Year & Team */}
        <div className="flex flex-col gap-1.5">
          <span className="font-pixel font-light uppercase text-xs text-muted-foreground font-normal">
            Year &amp; Team
          </span>
          <div className="font-sans font-light text-sm text-foreground leading-relaxed flex flex-col">
            <span className="font-medium text-foreground">
              {NEPALI_TALES_METADATA.yearAndTeam.heading}
            </span>
            {NEPALI_TALES_METADATA.yearAndTeam.members.map((m, i) => (
              <span key={i} className="text-muted-foreground text-xs">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
