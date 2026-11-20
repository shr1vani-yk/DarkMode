import Image from "next/image";
import * as PhosphorIcons from "@phosphor-icons/react/ssr";

export function Learnings() {
  return (
    <>
      {/* Section J: Learnings */}
      <section
        id="learnings"
        aria-labelledby="heading-learnings"
        className="flex flex-col gap-6 pt-10 border-t border-border-subtle/70"
      >
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium">
            LEARNINGS
          </span>
          <h2
            id="heading-learnings"
            className="text-lg sm:text-xl font-semibold text-foreground tracking-tight leading-snug"
          >
            Pausing to reflect
          </h2>
        </div>

        <div className="flex flex-col gap-4 text-sm sm:text-base text-foreground/85 leading-relaxed font-sans max-w-3xl">
          <p>
            The biggest challenge was delivering the experience within a tight
            timeline. The one day ahead ordering model required careful planning
            around timing and user behavior, with multiple rounds of iteration to
            get it right.
          </p>
          <p>
            Working at a larger scale meant adapting to a faster pace, multiple
            priorities and constant iterations. I learnt that even when things move
            quickly, breaking the process down and taking one step at a time makes
            it easier to find your footing.
          </p>
        </div>
      </section>

      {/* Section K: Kind Words From Client */}
      <section
        id="client-words"
        aria-labelledby="heading-client-words"
        className="flex flex-col gap-6 pt-10 border-t border-border-subtle/70"
      >
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium">
            KIND WORDS FROM CLIENT
          </span>
          <h2
            id="heading-client-words"
            className="text-lg sm:text-xl font-semibold text-foreground tracking-tight leading-snug"
          >
            What They Said
          </h2>
        </div>

        {/* Testimonial Card Container */}
        <div className="rounded-2xl bg-surface border border-border-subtle p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[1.1fr_1.3fr] gap-6 sm:gap-8 items-center shadow-xs">
          {/* Left: Instagram Post Mockup Card */}
          <div className="rounded-xl bg-background border border-border-subtle overflow-hidden shadow-2xs p-3.5 sm:p-4 flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 p-[1.5px] shrink-0">
                <div className="w-full h-full rounded-full bg-background overflow-hidden relative">
                  <Image
                    src="/images/case-studies/NepaliTales/Outcome/Rectangle 207.png"
                    alt="Nepali Tales Profile"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-sans font-semibold text-xs text-foreground truncate">
                  cook_with_aishi, dipesh and nepali_tales
                </span>
                <span className="font-sans text-[11px] text-muted-foreground truncate">
                  Little Olive &middot; The Maker is...
                </span>
              </div>
            </div>

            {/* Post Photo */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface">
              <Image
                src="/images/case-studies/NepaliTales/Outcome/Rectangle 207.png"
                alt="Founders of Nepali Tales"
                fill
                sizes="(max-width: 640px) calc(100vw - 116px), (max-width: 768px) calc(100vw - 140px), 360px"
                className="object-cover"
              />
            </div>

            {/* Social Action Bar */}
            <div className="flex items-center justify-between text-muted-foreground pt-1">
              <div className="flex items-center gap-3">
                <PhosphorIcons.HeartIcon
                  size={18}
                  weight="bold"
                  className="hover:text-rose-500 cursor-pointer transition-colors"
                />
                <PhosphorIcons.ChatCircleIcon
                  size={18}
                  weight="bold"
                  className="hover:text-foreground cursor-pointer transition-colors"
                />
                <PhosphorIcons.PaperPlaneTiltIcon
                  size={18}
                  weight="bold"
                  className="hover:text-foreground cursor-pointer transition-colors"
                />
              </div>
              <PhosphorIcons.BookmarkSimpleIcon
                size={18}
                weight="bold"
                className="hover:text-foreground cursor-pointer transition-colors"
              />
            </div>
          </div>

          {/* Right: Founder Quote Card */}
          <div className="flex flex-col justify-center gap-3 sm:gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Founders of nepali tales
              </span>
              <h3 className="font-sans font-semibold text-base sm:text-lg text-foreground">
                Ashika &amp; Dipesh
              </h3>
            </div>
            <blockquote className="font-sans text-xs sm:text-sm text-foreground/80 leading-relaxed italic border-l-2 border-[#DA2122] pl-4">
              &ldquo;A huge thankyou to the brilliant team behind our website for
              making this possible. Your hard work, patience and expertise have
              helped us create a better experience for everyone&rdquo;
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}

export default Learnings;
