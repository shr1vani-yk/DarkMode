import Image from "next/image";
import * as PhosphorIcons from "@phosphor-icons/react/ssr";
import { NEPALI_TALES_METADATA } from "../data";

export function Outcome() {
  return (
    <section
      id="outcome"
      aria-labelledby="heading-outcome"
      className="flex flex-col gap-8 pt-10 border-t border-border-subtle/70"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium">
          FINAL OUTCOME
        </span>
        <h2
          id="heading-outcome"
          className="text-lg sm:text-xl font-semibold text-foreground tracking-tight leading-snug"
        >
          The platform is live and operational, bringing together a customer friendly ordering experience
        </h2>
      </div>

      {/* Row 1: 2-Column Grid (Timesaving Red Card + Outcome Photo) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {/* Left: Red Brand Card */}
        <div className="rounded-2xl bg-[#DA2122] p-8 sm:p-12 flex items-center justify-center min-h-[220px] sm:min-h-[260px] shadow-xs">
          <span className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight text-center">
            Timesaving
          </span>
        </div>

        {/* Right: Rectangle 207 Image Card */}
        <div className="relative w-full aspect-[1584/1068] rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-xs">
          <Image
            src="/images/case-studies/NepaliTales/Outcome/Rectangle 207.png"
            alt="Nepali Tales live outcome showcase"
            fill
            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 768px) calc(100vw - 64px), 450px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Row 2: Full Width Website Showcase Banner (Rectangle 208) */}
      <div className="relative w-full aspect-[2757/1536] rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-xs my-1">
        <Image
          src="/images/case-studies/NepaliTales/Outcome/Rectangle 208.png"
          alt="Nepali Tales live website experience"
          fill
          sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 768px) calc(100vw - 64px), (max-width: 960px) calc(100vw - 96px), 864px"
          className="object-cover"
        />
      </div>

      {/* Row 3: Centered Action Button */}
      <div className="flex justify-center pt-2">
        <a
          href={NEPALI_TALES_METADATA.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3 rounded-full bg-[#DA2122] hover:bg-[#b91c1c] text-white font-sans font-medium text-xs sm:text-sm transition-all duration-200 shadow-md inline-flex items-center gap-2 active:scale-95 group"
        >
          <span>View Website</span>
          <PhosphorIcons.ArrowUpRightIcon
            size={14}
            weight="bold"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </section>
  );
}

export default Outcome;
