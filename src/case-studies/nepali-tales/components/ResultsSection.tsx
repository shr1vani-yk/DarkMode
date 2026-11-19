export function ResultsSection() {
  return (
    <>
      {/* Section 07: Pausing to Reflect (Exact match to screenshot) */}
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

      {/* Section 08: What They Said (Exact Visa Email reproduction matching screenshot) */}
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
                <span className="px-2 py-1 rounded text-[11px] font-bold font-sans bg-[#1a1f71] text-white tracking-wider">
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
    </>
  );
}

export default ResultsSection;
