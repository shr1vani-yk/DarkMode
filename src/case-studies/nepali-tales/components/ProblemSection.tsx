import Image from "next/image";
import * as PhosphorIcons from "@phosphor-icons/react/ssr";
import { NEPALI_TALES_METADATA } from "../data";

export function ProblemSection() {
  return (
    <>
      {/* Section 01: Summary / Long Story Short (Exact match to screenshot) */}
      <section
        id="summary"
        aria-labelledby="heading-summary"
        className="flex flex-col gap-3.5"
      >
        <span className="font-sans text-xs text-muted-foreground font-normal">
          Long Story Short
        </span>
        <h2
          id="heading-summary"
          className="text-lg sm:text-xl font-semibold text-foreground font-sans tracking-tight leading-snug"
        >
          I led the vision for a new way to support small businesses in tracking their finances
        </h2>
        <p className="text-[15px] sm:text-base text-muted-foreground font-sans leading-[1.8] mb-2">
          Nepali Tales is a well-known Thane cloud kitchen that had outgrown taking orders on WhatsApp. I
          redesigned ordering as a pre-order website, which reduced engineering rework, and we shipped an MVP
          in a few weeks.
        </p>

        {/* In-content UI Mockup (Red chili / momo phone mockup matching screenshot) */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-xs my-2">
          <Image
            src="/images/projects/nepaliTalesThumbnail.jpg"
            alt="Nepali Tales Pre-Order System Mobile Mockup"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 760px"
            className="object-cover object-center"
          />
        </div>

        {/* 3 Metric Cards directly below image matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          {/* Metric 1: Live */}
          <div className="flex flex-col">
            <span className="font-sans text-xs text-muted-foreground mb-1">Live</span>
            <a
              href={NEPALI_TALES_METADATA.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-base font-light text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-4 group w-fit underline decoration-solid underline-offset-6 decoration-foreground/70 mb-2"
            >
              <span>Shipped</span>
              <PhosphorIcons.ArrowUpRightIcon size={18} weight="bold" />
            </a>
            <a
              href={NEPALI_TALES_METADATA.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-base font-light text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-4 group w-fit"
            >
              <span>Overview in Figma</span>
              <PhosphorIcons.ArrowUpRightIcon size={18} weight="bold" />
            </a>
          </div>

          {/* Metric 2: NPS points */}
          <div className="flex flex-col">
            <span className="font-sans text-xs text-muted-foreground mb-0.5">NPS points</span>
            <span className="font-sans text-3xl font-semibold text-foreground tracking-tight">
              ~18%
            </span>
            <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">
              Led a team through 40+ user interviews, designing 4 platform
            </p>
          </div>

          {/* Metric 3: Adoption Intent */}
          <div className="flex flex-col">
            <span className="font-sans text-xs text-muted-foreground mb-0.5">Adoption Intent</span>
            <span className="font-sans text-3xl font-semibold text-foreground tracking-tight">
              ~87%
            </span>
            <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">
              Testing participants indicated they would consider using at least one feature.
            </p>
          </div>
        </div>
      </section>

      {/* Section 02: Requirement Context */}
      <section
        id="requirement-context"
        aria-labelledby="heading-context"
        className="flex flex-col gap-4 pt-10 border-t border-border-subtle/70"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium">
          Some Overview
        </span>
        <h2
          id="heading-context"
          className="text-xl sm:text-2xl font-semibold text-foreground font-sans tracking-tight"
        >
          Requirement Context
        </h2>
        <div className="flex flex-col gap-4 text-[15px] sm:text-base text-muted-foreground font-sans leading-[1.8]">
          <p>
            Nepali Tales had built a loyal cult following in Thane entirely through Instagram and direct WhatsApp
            conversations. What began as an intimate chat-based catering service quickly scaled to hundreds of
            orders per evening.
          </p>

          <p>
            WhatsApp gave customers zero visibility into kitchen capacity. The resulting
            manual messaging loop caused lost orders and kitchen confusion.
          </p>
        </div>
      </section>

      {/* Section 03: Problem Statement (Exact structured sentence breakdown matching screenshot) */}
      <section
        id="problem-statement"
        aria-labelledby="heading-problem"
        className="flex flex-col gap-4 pt-10 border-t border-border-subtle/70"
      >
        <span className="font-sans text-xs text-muted-foreground font-normal">
          Problem Statement
        </span>
        <h2
          id="heading-problem"
          className="text-lg sm:text-xl font-semibold text-foreground font-sans tracking-tight leading-snug"
        >
          I led the vision for a new way to support small businesses in tracking their finances
        </h2>

        {/* Sentence Breakdown with red/orange tags matching the screenshot blueprint */}
        <div className="flex flex-col gap-6 my-4 p-6 sm:p-7 rounded-2xl bg-surface border border-border-subtle">
          {/* Line 1: Client & Distribution Channel */}
          <div className="text-[15px] sm:text-base font-sans text-foreground leading-[2.2]">
            <span className="inline-block relative mr-1">
              <span className="border-b-2 border-[#e8590c] font-medium pb-0.5">
                Anshikha and Dipesh
              </span>
              <span className="absolute left-0 -bottom-5 font-mono text-[10px] text-[#e8590c] dark:text-[#f97316] uppercase tracking-wider font-semibold">
                Client
              </span>
            </span>
            wanted to scale{" "}
            <span className="inline-block relative ml-1">
              <span className="border-b-2 border-[#e8590c] font-medium pb-0.5">
                Nepali Tales beyond WhatsApp Business.
              </span>
              <span className="absolute left-0 -bottom-5 font-mono text-[10px] text-[#e8590c] dark:text-[#f97316] uppercase tracking-wider font-semibold">
                Distribution Channel
              </span>
            </span>
          </div>

          {/* Line 2: Client Need */}
          <div className="text-[15px] sm:text-base font-sans text-foreground leading-[2.2] pt-2">
            They intended to{" "}
            <span className="inline-block relative">
              <span className="border-b-2 border-[#e8590c] font-medium pb-0.5">
                transition to a dedicated website to expand their digital reach and improve accessibility.
              </span>
              <span className="absolute right-0 -bottom-5 font-mono text-[10px] text-[#e8590c] dark:text-[#f97316] uppercase tracking-wider font-semibold">
                Client Need
              </span>
            </span>
          </div>

          {/* Line 3: Client Goal */}
          <div className="text-[15px] sm:text-base font-sans text-foreground leading-[2.2] pt-2">
            So they could{" "}
            <span className="inline-block relative">
              <span className="border-b-2 border-[#e8590c] font-medium pb-0.5">
                reduce manual order management, streamline operations, and focus more on growing their business.
              </span>
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-5 font-mono text-[10px] text-[#e8590c] dark:text-[#f97316] uppercase tracking-wider font-semibold">
                Client Goal
              </span>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProblemSection;
