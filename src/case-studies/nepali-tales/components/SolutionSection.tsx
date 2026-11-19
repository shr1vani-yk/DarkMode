import Image from "next/image";
import { NEPALI_TALES_METADATA } from "../data";

export function SolutionSection() {
  return (
    <>
      {/* Section 04: Storyboard (Discovery & Affinity Diagram matching screenshot) */}
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

      {/* Section 05: Constraints, Tradeoff’s & Decision (Exact match to screenshot) */}
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

      {/* Section 06: Final Product / Final Outcome (Exact match to screenshot) */}
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
              {NEPALI_TALES_METADATA.stats.monthlyOrders}
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
              {NEPALI_TALES_METADATA.stats.peakCapacity}
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
              {NEPALI_TALES_METADATA.stats.orderAccuracy}
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
              {NEPALI_TALES_METADATA.stats.checkoutTime}
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
    </>
  );
}

export default SolutionSection;
