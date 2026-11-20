import Image from "next/image";

export function Storyboard() {
  return (
    <>
      {/* Section D: Storyboard */}
      <section
        id="storyboard"
        aria-labelledby="heading-storyboard"
        className="flex flex-col gap-6 pt-10 border-t border-border-subtle/70"
      >
        <div className="flex flex-col gap-1.5">
          <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground font-medium">
            STORYBOARD : GETTING TO WORK
          </span>
          <h2
            id="heading-storyboard"
            className="text-lg sm:text-xl font-light text-foreground leading-snug"
          >
            Understanding the business before designing the experience.
          </h2>
        </div>

        {/* 3 Storyboard Cards in a 3-Column Grid - Equal Aspect Ratios */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 my-2">
          {/* Card 1 */}
          <div className="flex flex-col gap-2.5">
            <div className="relative w-full aspect-square overflow-hidden border border-border-subtle bg-white shadow-2xs">
              <Image
                src="/images/case-studies/NepaliTales/Moodboard/story-1.png"
                alt="Keeping up with manual logs"
                fill
                sizes="(max-width: 640px) 100vw, 320px"
                className="object-contain p-4"
              />
            </div>
            <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
              KEEPING UP WITH MANUAL LOGS
            </span>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col gap-2.5">
            <div className="relative w-full aspect-square  overflow-hidden border border-border-subtle bg-white shadow-2xs">
              <Image
                src="/images/case-studies/NepaliTales/Moodboard/story-2.png"
                alt="Customization overload"
                fill
                sizes="(max-width: 640px) 100vw, 320px"
                className="object-contain p-4"
              />
            </div>
            <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
              CUSTOMIZATION OVERLOAD.
            </span>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col gap-2.5">
            <div className="relative w-full aspect-square  overflow-hidden border border-border-subtle bg-white shadow-2xs">
              <Image
                src="/images/case-studies/NepaliTales/Moodboard/story-3.png"
                alt="Groceries to prep to packing"
                fill
                sizes="(max-width: 640px) 100vw, 320px"
                className="object-contain p-4"
              />
            </div>
            <span className="font-pixel text-[11px] text-muted-foreground uppercase tracking-wider">
              GROCERIES &rarr; PREP &rarr; PACKING
            </span>
          </div>
        </div>
      </section>

      {/* Section E: Problem Statement */}
      <section
        id="problem-statement"
        aria-labelledby="heading-problem-statement"
        className="flex flex-col gap-5 pt-10 border-t border-border-subtle/70"
      >
        <div className="flex flex-col gap-1.5">
          <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground">
            PROBLEM STATEMENT
          </span>
          <h2
            id="heading-problem-statement"
            className="text-base sm:text-xl font-light text-foreground leading-snug"
          >
            As demand increased for business this leads to a critical gap
          </h2>
        </div>

        {/* Problem Statement Visual Display matching Figma */}
        <div className="relative w-full aspect-[2757/1600] rounded-xl overflow-hidden border border-border-subtle bg-white shadow-xs my-2">
          <Image
            src="/images/case-studies/NepaliTales/problem statement.png"
            alt="Problem Statement: Anshikha and Dipesh wanted to scale Nepali Tales beyond WhatsApp Business"
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default Storyboard;
