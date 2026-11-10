import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CaseStudyDesktopSidebar,
  CaseStudyMobileBar,
  TopicItem,
} from "@/components/CaseStudyTopicNav";
import { NextProjectCard } from "@/components/NextProjectCard";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { CaseStudyThemeToggle } from "@/components/CaseStudyThemeToggle";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

function CaseStudySkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 animate-pulse flex flex-col gap-8">
        <div className="h-4 w-20 bg-surface-elevated rounded" />
        <div className="h-10 w-3/4 bg-surface-elevated rounded" />
        <div className="h-4 w-1/2 bg-surface-elevated rounded" />
      </div>
    </div>
  );
}

async function CaseStudyContent({ params }: Props) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project: ProjectItem = PROJECTS[projectIndex];
  const nextProject: ProjectItem = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  // Topics matching the exact sidebar blueprint from the attached reference screenshot
  const topics: TopicItem[] = [
    { id: "summary", label: "Summary", shortLabel: "Summary" },
    {
      id: "requirement-context",
      label: "Requirement Context",
      shortLabel: "Context",
    },
    {
      id: "about-project",
      label: `About ${project.title}`,
      shortLabel: "About",
    },
    {
      id: "problem-statement",
      label: "Problem Statement",
      shortLabel: "Problem",
    },
    {
      id: "storyboard",
      label: "Storyboard",
      shortLabel: "Storyboard",
    },
    {
      id: "constraints",
      label: "Constraints, Tradeoff’s & Decision",
      shortLabel: "Constraints",
    },
    {
      id: "final-product",
      label: "Final Product",
      shortLabel: "Product",
    },
    {
      id: "reflection",
      label: "Pausing to Reflect",
      shortLabel: "Reflect",
    },
    {
      id: "testimonials",
      label: "What They Said",
      shortLabel: "Feedback",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-[#e8590c]/15">
      {/* Fixed theme toggle for desktop */}
      <CaseStudyThemeToggle />

      {/* Sticky top navigation bar for mobile / tablet screens (< 1024px) */}
      <CaseStudyMobileBar topics={topics} />

      {/* Main Two-Column Case Study Layout matching the reference blueprint */}
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-8 sm:pt-14 lg:pt-16 pb-24 grid grid-cols-1 lg:grid-cols-[180px_1fr] xl:grid-cols-[210px_1fr] gap-10 lg:gap-16 xl:gap-20">
        {/* Sticky Left Sidebar with `← back` and topics matching blueprint */}
        <CaseStudyDesktopSidebar topics={topics} />

        {/* Right Reading Canvas */}
        <main className="min-w-0 max-w-[760px] flex flex-col gap-14 sm:gap-20">
          {/* Top Title & Metadata Header Block (Exact match to screenshot) */}
          <header className="flex flex-col">
            {/* Eyebrow: case study · 3 min read */}
            <span className="font-sans text-xs sm:text-sm text-muted-foreground font-normal mb-2.5">
              case study &middot; {project.readTime}
            </span>

            {/* Display Title in Stack Sans */}
            <h1 className="font-sans font-semibold text-3xl sm:text-4xl md:text-[2.65rem] text-foreground tracking-tight leading-[1.14] mb-8 sm:mb-10">
              {project.displayTitle}
            </h1>

            {/* 3-Column Metadata Row (Exact match to screenshot) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pb-8 border-b border-border-subtle/70">
              {/* Column 1: Timeline */}
              <div className="flex flex-col gap-1">
                <span className="font-sans text-xs text-muted-foreground font-normal">
                  Timeline
                </span>
                <span className="font-sans text-sm text-foreground font-normal">
                  2 weeks
                </span>
              </div>

              {/* Column 2: Contributors */}
              <div className="flex flex-col gap-1">
                <span className="font-sans text-xs text-muted-foreground font-normal">
                  Contributors
                </span>
                <div className="font-sans text-sm text-foreground font-normal leading-relaxed flex flex-col">
                  <span>2 Co-Ordinators/Management</span>
                  <span>1 Designer (me)</span>
                  <span>1 Developers</span>
                </div>
              </div>

              {/* Column 3: My Contribution */}
              <div className="flex flex-col gap-1">
                <span className="font-sans text-xs text-muted-foreground font-normal">
                  My Contribution
                </span>
                <div className="font-sans text-sm text-foreground font-normal leading-relaxed flex flex-col">
                  <span>Design Lead</span>
                  <span>Brand Assets</span>
                  <span>UX/UI Design</span>
                </div>
              </div>
            </div>
          </header>

          {/* Section 01: Summary / Long Story Short (Exact match to screenshot) */}
          <section id="summary" aria-labelledby="heading-summary" className="flex flex-col gap-3.5">
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
                  href="https://www.nepalitales.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-base font-light text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1 group w-fit"
                >
                  <span>Shipped</span>
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  
                  

            
                  </span>
                </a>
                <a
                  href="https://www.nepalitales.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-base font-light text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1 group w-fit"
                >
                <span>Overview in Figma</span>
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

          

          {/* Section 04: Problem Statement (Exact structured sentence breakdown matching screenshot) */}
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

          {/* Section 05: Storyboard (Discovery & Affinity Diagram matching screenshot) */}
          <section
            id="storyboard"
            aria-labelledby="heading-storyboard"
            className="flex flex-col gap-4 pt-10 border-t border-border-subtle/70"
          >
            <span className="font-sans text-xs text-muted-foreground font-normal">
              Storyboard
            </span>
            <h2
              id="heading-storyboard"
              className="text-lg sm:text-xl font-semibold text-foreground font-sans tracking-tight leading-snug"
            >
              We didn&apos;t start from a blank page. The client already had user data, so discovery was about reading
              it honestly.
            </h2>

            {/* Visual 1: Hand-drawn 3-panel sketch journey container matching screenshot */}
            <div className="w-full aspect-[2.4/1] sm:aspect-[2.8/1] rounded-2xl border border-border-subtle bg-surface/50 p-6 sm:p-8 flex items-center justify-around gap-4 my-2 overflow-hidden shadow-2xs">
              {/* Panel 1: Customer multi-tasking / ordering */}
              <div className="flex flex-col items-center text-center gap-2 max-w-[180px]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-16 h-16 text-foreground stroke-current fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round"
                >
                  <circle cx="50" cy="35" r="18" />
                  <path d="M25 85 C25 60 75 60 75 85" />
                  <rect x="58" y="45" width="24" height="40" rx="3" />
                  <line x1="64" y1="50" x2="76" y2="50" />
                </svg>
                <span className="font-mono text-[11px] text-muted-foreground">
                  1. Discovery on WhatsApp
                </span>
              </div>

              {/* Arrow */}
              <span className="text-muted-foreground font-mono text-lg">&rarr;</span>

              {/* Panel 2: Kitchen rush / steaming batch */}
              <div className="flex flex-col items-center text-center gap-2 max-w-[180px]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-16 h-16 text-foreground stroke-current fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round"
                >
                  <ellipse cx="50" cy="70" rx="36" ry="14" />
                  <path d="M14 70 L14 45 C14 30 86 30 86 45 L86 70" />
                  <path d="M40 25 C40 18 45 15 45 10" />
                  <path d="M50 25 C50 18 55 15 55 10" />
                  <path d="M60 25 C60 18 65 15 65 10" />
                </svg>
                <span className="font-mono text-[11px] text-muted-foreground">
                  2. Artisan Batch Steaming
                </span>
              </div>

              {/* Arrow */}
              <span className="text-muted-foreground font-mono text-lg">&rarr;</span>

              {/* Panel 3: Timed Slot Pickup */}
              <div className="flex flex-col items-center text-center gap-2 max-w-[180px]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-16 h-16 text-foreground stroke-current fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round"
                >
                  <circle cx="50" cy="50" r="32" />
                  <polyline points="50,28 50,50 68,50" />
                  <path d="M38 90 L62 90" />
                </svg>
                <span className="font-mono text-[11px] text-muted-foreground">
                  3. Slot-Synchronized Delivery
                </span>
              </div>
            </div>

            {/* Visual 2: Complete Research Affinity & Problem Tree Diagram matching screenshot */}
            <div className="w-full rounded-2xl border border-border-subtle bg-surface/70 p-5 sm:p-7 flex flex-col items-center gap-6 my-2 shadow-xs">
              {/* Top Goal Pill */}
              <div className="px-4 py-1.5 rounded-full border border-border-subtle bg-background text-xs sm:text-sm font-sans font-medium text-foreground text-center shadow-2xs">
                GOAL: Getting saved inspiration back to designers when they need it
              </div>

              {/* 4 Research Columns with Yellow Headers & Sticky Notes */}
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
                {/* Column 1: Broad research */}
                <div className="flex flex-col gap-2">
                  <div className="p-2 rounded bg-amber-200/80 dark:bg-amber-950/50 text-[11px] font-sans font-semibold text-amber-900 dark:text-amber-200 text-center border border-amber-300 dark:border-amber-800">
                    Broad research
                  </div>
                  <div className="p-2.5 rounded bg-amber-100/70 dark:bg-amber-900/30 text-[10px] text-foreground font-sans leading-tight border border-amber-200 dark:border-amber-800/50">
                    Background user interview quotes: for platforms and ease of adoption across kitchen staff.
                  </div>
                  <div className="p-2.5 rounded bg-amber-100/70 dark:bg-amber-900/30 text-[10px] text-foreground font-sans leading-tight border border-amber-200 dark:border-amber-800/50">
                    Users expressed difficulty in tracking slot status or real-time packing progress.
                  </div>
                </div>

                {/* Column 2: Desk research */}
                <div className="flex flex-col gap-2">
                  <div className="p-2 rounded bg-amber-200/80 dark:bg-amber-950/50 text-[11px] font-sans font-semibold text-amber-900 dark:text-amber-200 text-center border border-amber-300 dark:border-amber-800">
                    Desk research
                  </div>
                  <div className="p-2.5 rounded bg-amber-100/70 dark:bg-amber-900/30 text-[10px] text-foreground font-sans leading-tight border border-amber-200 dark:border-amber-800/50">
                    Desk review of 1,200+ WhatsApp chats: identify where order drop-offs peaked.
                  </div>
                  <div className="p-2.5 rounded bg-amber-100/70 dark:bg-amber-900/30 text-[10px] text-foreground font-sans leading-tight border border-amber-200 dark:border-amber-800/50">
                    Reviewing 30% aggregator commissions: unsustainable for artisanal cloud kitchens.
                  </div>
                </div>

                {/* Column 3: Primary research */}
                <div className="flex flex-col gap-2">
                  <div className="p-2 rounded bg-amber-200/80 dark:bg-amber-950/50 text-[11px] font-sans font-semibold text-amber-900 dark:text-amber-200 text-center border border-amber-300 dark:border-amber-800">
                    Primary research
                  </div>
                  <div className="p-2.5 rounded bg-amber-100/70 dark:bg-amber-900/30 text-[10px] text-foreground font-sans leading-tight border border-amber-200 dark:border-amber-800/50">
                    Customers multi-tasking: phone interactions must be complete within bottom thumb zones.
                  </div>
                  <div className="p-2.5 rounded bg-amber-100/70 dark:bg-amber-900/30 text-[10px] text-foreground font-sans leading-tight border border-amber-200 dark:border-amber-800/50">
                    Users repeatedly asking: &quot;Is my slot confirmed?&quot; &quot;When is it cooking?&quot;
                  </div>
                  <div className="p-2.5 rounded bg-amber-100/70 dark:bg-amber-900/30 text-[10px] text-foreground font-sans leading-tight border border-amber-200 dark:border-amber-800/50">
                    Kitchen operators: 70+ orders hitting within 45 minutes overload phone battery.
                  </div>
                </div>

                {/* Column 4: Competitor analysis */}
                <div className="flex flex-col gap-2">
                  <div className="p-2 rounded bg-amber-200/80 dark:bg-amber-950/50 text-[11px] font-sans font-semibold text-amber-900 dark:text-amber-200 text-center border border-amber-300 dark:border-amber-800">
                    Competitor analysis
                  </div>
                  <div className="p-2.5 rounded bg-amber-100/70 dark:bg-amber-900/30 text-[10px] text-foreground font-sans leading-tight border border-amber-200 dark:border-amber-800/50">
                    Standard food platforms prioritize endless browsing over real-time batch timing.
                  </div>
                  <div className="p-2.5 rounded bg-amber-100/70 dark:bg-amber-900/30 text-[10px] text-foreground font-sans leading-tight border border-amber-200 dark:border-amber-800/50">
                    Designers need to know what to cook right now without manual WhatsApp messaging.
                  </div>
                </div>
              </div>

              {/* Bottom Green Refined Statement Pill & Box */}
              <div className="w-full flex flex-col items-center gap-2 pt-2 border-t border-border-subtle/60">
                <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  The refined problem statement &darr;
                </span>
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-foreground font-sans leading-relaxed text-center max-w-xl">
                  Designers keep collecting inspiration, but no tool brings it back to context while they work.
                  So the inspiration they already saved stays unused, and they search the internet again instead.
                </div>
              </div>
            </div>
          </section>

          {/* Section 06: Constraints, Tradeoff’s & Decision (Exact match to screenshot) */}
          <section
            id="constraints"
            aria-labelledby="heading-constraints"
            className="flex flex-col gap-4 pt-10 border-t border-border-subtle/70"
          >
            <span className="font-sans text-xs text-muted-foreground font-normal">
              Constraints, Trade Off’s &amp; Decisions
            </span>
            <h2
              id="heading-constraints"
              className="text-lg sm:text-xl font-semibold text-foreground font-sans tracking-tight leading-snug"
            >
              The client needed to launch fast, so we scoped an MVP. That meant technical constraints and
              trade-offs:
            </h2>

            {/* Iteration-1 Card (Rejected) */}
            <div className="p-6 rounded-2xl bg-surface border border-border-subtle flex flex-col gap-2 shadow-2xs">
              <span className="font-sans text-xs text-muted-foreground font-normal">
                Iteration-1
              </span>
              <p className="text-[15px] sm:text-base text-foreground font-sans leading-relaxed">
                The Agent&apos;s thinking process was shown outside the chat area. But it failed to grab the
                attention when the text changed.
              </p>
              <span className="text-xs font-semibold text-rose-500 font-sans mt-2">
                Rejected
              </span>
            </div>

            {/* Iteration-2 Card (Accepted) */}
            <div className="p-6 rounded-2xl bg-surface border border-border-subtle flex flex-col gap-2 shadow-2xs">
              <span className="font-sans text-xs text-muted-foreground font-normal">
                Iteration-2
              </span>
              <p className="text-[15px] sm:text-base text-foreground font-sans leading-relaxed">
                Delivery slots inside the flow. CTAs disable when ordering is closed or a slot is full. Rules
                became interface states, not instructions
              </p>
              <span className="text-xs font-semibold text-emerald-500 font-sans mt-2">
                Accepted
              </span>
            </div>
          </section>

          {/* Section 07: Final Product / Final Outcome (Exact match to screenshot) */}
          <section
            id="final-product"
            aria-labelledby="heading-final"
            className="flex flex-col gap-4 pt-10 border-t border-border-subtle/70"
          >
            <span className="font-sans text-xs text-muted-foreground font-normal">
              Final Outcome
            </span>
            <h2
              id="heading-final"
              className="text-lg sm:text-xl font-semibold text-foreground font-sans tracking-tight leading-snug"
            >
              When the UX and the UI blend seamlessly
            </h2>

            {/* 4 Metrics Bar matching screenshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-border-subtle my-2">
              <div className="flex flex-col">
                <span className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  450+
                </span>
                <span className="font-sans text-xs font-semibold text-foreground mt-0.5">
                  Monthly Orders
                </span>
                <span className="font-mono text-[10px] text-muted-foreground mt-0.5">
                  Zero WhatsApp Dropoff
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  3.4x
                </span>
                <span className="font-sans text-xs font-semibold text-foreground mt-0.5">
                  Peak Capacity
                </span>
                <span className="font-mono text-[10px] text-muted-foreground mt-0.5">
                  Handled Seamlessly
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  99.2%
                </span>
                <span className="font-sans text-xs font-semibold text-foreground mt-0.5">
                  Order Accuracy
                </span>
                <span className="font-mono text-[10px] text-muted-foreground mt-0.5">
                  Up from 74%
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  &lt; 1.2s
                </span>
                <span className="font-sans text-xs font-semibold text-foreground mt-0.5">
                  Checkout Time
                </span>
                <span className="font-mono text-[10px] text-muted-foreground mt-0.5">
                  Thumb-First Mobile UX
                </span>
              </div>
            </div>

            {/* Visual Mockup 1: Timesaving + Laptop Split matching screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              {/* Left Timesaving Card */}
              <div className="aspect-[4/3] rounded-2xl bg-[#d92d20] flex items-center justify-center p-8 text-center shadow-xs">
                <span className="text-white font-sans font-bold text-2xl sm:text-3xl tracking-tight">
                  Timesaving
                </span>
              </div>

              {/* Right Laptop Mockup Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-xs">
                <Image
                  src="/images/projects/nepaliTalesThumbnail.jpg"
                  alt="Laptop Showcase Mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Visual Mockup 2: Spatial Canvas 'Where your time finally makes sense' matching screenshot */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-border-subtle bg-gradient-to-br from-[#f0f4ff] to-[#f8f9ff] dark:from-[#131620] dark:to-[#0f1118] p-6 sm:p-10 flex flex-col justify-between shadow-xs my-2">
              {/* Header inside canvas */}
              <div className="flex items-start justify-between gap-4">
                <span className="px-3 py-1 rounded-full bg-white dark:bg-surface-elevated text-xs font-mono font-medium text-foreground border border-border-subtle shadow-2xs">
                  May &middot; 2026
                </span>
                <span className="font-sans font-bold text-lg sm:text-2xl text-foreground text-right max-w-xs leading-tight">
                  Where your time finally makes sense
                </span>
              </div>

              {/* Floating mobile UI mockups inside canvas */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6">
                <div className="p-3 rounded-xl bg-white dark:bg-surface border border-border-subtle shadow-xs flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] text-muted-foreground uppercase">Slot 01</span>
                  <span className="font-sans text-xs font-semibold text-foreground">7:30 PM &ndash; 8:00 PM</span>
                  <span className="text-[10px] text-emerald-600 font-medium">Batch Available</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-surface border border-border-subtle shadow-xs flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] text-muted-foreground uppercase">Slot 02</span>
                  <span className="font-sans text-xs font-semibold text-foreground">8:00 PM &ndash; 8:30 PM</span>
                  <span className="text-[10px] text-amber-600 font-medium">Filling Fast (4 left)</span>
                </div>
                <div className="hidden sm:flex p-3 rounded-xl bg-white dark:bg-surface border border-border-subtle shadow-xs flex-col gap-1.5">
                  <span className="font-mono text-[10px] text-muted-foreground uppercase">Slot 03</span>
                  <span className="font-sans text-xs font-semibold text-foreground">8:30 PM &ndash; 9:00 PM</span>
                  <span className="text-[10px] text-rose-500 font-medium">Sold Out</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 08: Pausing to Reflect (Exact match to screenshot) */}
          <section
            id="reflection"
            aria-labelledby="heading-reflection"
            className="flex flex-col gap-4 pt-10 border-t border-border-subtle/70"
          >
            <span className="font-sans text-xs text-muted-foreground font-normal">
              Some Key Moments
            </span>
            <h2
              id="heading-reflection"
              className="text-lg sm:text-xl font-semibold text-foreground font-sans tracking-tight"
            >
              Pausing to Reflect
            </h2>

            <div className="flex flex-col gap-4 text-[15px] sm:text-base text-muted-foreground font-sans leading-[1.8]">
              <p>
                <strong className="text-foreground font-medium">01 /</strong> Operational empathy is the foundation of
                good interface design.
              </p>
              <p>
                <strong className="text-foreground font-medium">02 /</strong> Constraining choices creates user relief.
                By guiding customers to select delivery time slots before browsing the menu, we eliminated the anxiety
                of ordering food only to discover a 90 minute wait later at checkout.
              </p>
              <p>
                <strong className="text-foreground font-medium">03 /</strong> Sub second performance is a brand feature.
                When an e commerce page loads instantly on mobile, customers perceive the kitchen itself to be
                professional, dependable, and efficient.
              </p>
            </div>
          </section>

          {/* Section 09: What They Said (Exact Visa Email reproduction matching screenshot) */}
          <section
            id="testimonials"
            aria-labelledby="heading-testimonials"
            className="flex flex-col gap-4 pt-10 border-t border-border-subtle/70"
          >
            <span className="font-sans text-xs text-muted-foreground font-normal">
              Kind words from the team
            </span>
            <h2
              id="heading-testimonials"
              className="text-lg sm:text-xl font-semibold text-foreground font-sans tracking-tight"
            >
              What They Said
            </h2>

            {/* Email Testimonial Card matching screenshot */}
            <div className="p-6 sm:p-7 rounded-2xl bg-surface border border-border-subtle shadow-xs flex flex-col gap-4 my-2">
              {/* Email Client Header Row */}
              <div className="flex flex-col gap-2 pb-4 border-b border-border-subtle/70">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {/* Blue VISA badge matching screenshot */}
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold font-sans bg-[#1a1f71] text-white tracking-wider">
                      VISA
                    </span>
                    <span className="font-sans text-sm font-semibold text-foreground">
                      Thomas, Amal &lt;amthoos...&gt;
                    </span>
                  </div>

                  {/* Timestamp & action icons */}
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span>Jul 6, 2026, 12:38 PM</span>
                    <span>&star;</span>
                    <span>&bull;&bull;&bull;</span>
                  </div>
                </div>

                {/* Recipient list */}
                <div className="text-xs text-muted-foreground font-sans">
                  to aditya-thakur, Eliot, Raghunandhan, anur, s. dhananjai, Devika, jagoot.sidhu, me, Adi &blacktriangledown;
                </div>
              </div>

              {/* Email Body Text */}
              <div className="flex flex-col gap-3 text-xs sm:text-sm text-foreground/90 font-sans leading-relaxed">
                <p>Hello Team and Team,</p>
                <p>
                  A big thank you from the Visa team for your outstanding efforts on the agentic store showcase. Your
                  work made the showcase the focal point of the event, and thanks to your dedication, we delivered an
                  exceptionally smooth experience for merchandise distribution. The attention to detail and adaptability
                  in handling a large volume of clients did not go unnoticed.
                </p>
                <p>
                  I want to extend special recognition to Amal and Udit for their remarkable contributions on site. Thanks
                  much for your support, its truly appreciated.
                </p>
                <p>
                  Please find attached some photos capturing these moments. Once again, thank you to everyone involved
                  for putting this together and ensuring its success.
                </p>
              </div>
            </div>
          </section>

          {/* Signature Sign-off matching screenshot: thanks for reading <3 ✿ */}
          <div className="pt-8 pb-4 flex items-center justify-center text-center">
            <p className="font-signature text-2xl sm:text-3xl text-foreground select-none font-normal">
              thanks for reading &lt;3 &#10047;
            </p>
          </div>

          {/* Next Project Section matching Image 2 & screenshot: PlixLife : The Plant Fix ( 02 ) */}
          {nextProject && <NextProjectCard project={nextProject} />}

          {/* Minimalist Colophon Footer */}
          <footer className="pt-10 pb-12 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
            <div>
              <span>Shravani Sutar Portfolio &middot; 2026</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/#work" className="hover:text-foreground transition-colors">
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

export default function CaseStudyPage({ params }: Props) {
  return (
    <Suspense fallback={<CaseStudySkeleton />}>
      <CaseStudyContent params={params} />
    </Suspense>
  );
}
