export function MyRole() {
  return (
    <section
      id="my-role"
      aria-labelledby="heading-my-role"
      className="flex flex-col gap-6 pt-10 border-t border-border-subtle/70"
    >
      <div className="flex flex-col gap-1.5">
        <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground">
          MY ROLE
        </span>
        <h2
          id="heading-my-role"
          className="text-lg sm:text-xl font-regular text-foreground  leading-snug"
        >
          Part visual thinker, part problem solver, entirely design-led.
        </h2>
      </div>

      {/* 2-Column Cards Grid: MVP Design (Left) & Impact (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {/* Left Card: MVP Design */}
        <div className="rounded-2xl bg-surface border border-border-subtle p-6 sm:p-8 flex flex-col gap-4 shadow-xs">
          <span className="px-2.5 py-1 rounded bg-surface-hover text-xs font-pixel text-foreground border border-border-subtle w-fit">
            MVP Design
          </span>
          <div className="flex flex-col gap-3 text-sm text-foreground/85 leading-relaxed font-sans font-light">
            <p>
              Led the 0–1 design of the Nepali Tales MVP, translating business
              requirements into a structured digital ordering experience.
            </p>
            <p>
              Established the visual direction and designed the complete ordering
              experience
            </p>
          </div>
        </div>

        {/* Right Card: Impact */}
        <div className="rounded-2xl bg-surface border border-border-subtle p-6 sm:p-8 flex flex-col gap-4 shadow-xs">
          <span className="px-2.5 py-1 rounded bg-surface-hover text-xs font-pixel text-foreground border border-border-subtle w-fit">
            Impact
          </span>
          <div className="flex flex-col gap-3 text-sm text-foreground/85 leading-relaxed font-sans font-light">
            <p>
              Supported a platform handling 450+ orders and 12K+ visitors.
            </p>
            <p>
              Streamlined the ordering process, reducing manual coordination for
              the client by approximately 60%.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyRole;
