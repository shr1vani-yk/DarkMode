"use client";

import { useEffect, useState, useRef } from "react";

export interface TopicItem {
  id: string;
  label: string;
  shortLabel: string;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    const yOffset = isMobile ? -96 : -48;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

export function useActiveSection(topics: TopicItem[]) {
  const [activeId, setActiveId] = useState<string>(topics[0].id);
  const isManualLockRef = useRef(false);
  const lockTimerRef = useRef<NodeJS.Timeout | null>(null);

  const setManualActiveId = (id: string) => {
    setActiveId(id);
    isManualLockRef.current = true;
    if (lockTimerRef.current) {
      clearTimeout(lockTimerRef.current);
    }
    lockTimerRef.current = setTimeout(() => {
      isManualLockRef.current = false;
    }, 700);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isManualLockRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (isManualLockRef.current) {
            ticking = false;
            return;
          }
          const isMobile = window.innerWidth < 1024;
          const scrollPosition = window.scrollY + (isMobile ? 120 : 160);
          let current = topics[0].id;

          for (const topic of topics) {
            const el = document.getElementById(topic.id);
            if (el) {
              const top = el.offsetTop;
              if (top <= scrollPosition) {
                current = topic.id;
              }
            }
          }

          setActiveId(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, [topics]);

  return [activeId, setManualActiveId] as const;
}

/**
 * Mobile / Tablet Sticky Top Bar (< 1024px)
 * Sticks to the top, provides back link, cup theme toggle, and scrollable horizontal topic tags
 * Features a hardware-accelerated fluid gliding active pill indicator.
 */
export function CaseStudyMobileBar({ topics }: { topics: TopicItem[] }) {
  const [activeId, setManualActiveId] = useActiveSection(topics);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Sliding pill indicator position state
  const [indicator, setIndicator] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    ready: boolean;
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    ready: false,
  });

  const [hasMounted, setHasMounted] = useState(false);

  // Synchronize indicator pill coordinates and auto-center scroll container whenever activeId changes
  useEffect(() => {
    const updatePill = () => {
      const el = pillRefs.current[activeId];
      if (el) {
        setIndicator({
          left: el.offsetLeft,
          top: el.offsetTop,
          width: el.offsetWidth,
          height: el.offsetHeight,
          ready: true,
        });

        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
          const targetScrollLeft =
            el.offsetLeft -
            scrollContainer.offsetLeft -
            scrollContainer.clientWidth / 2 +
            el.clientWidth / 2;

          scrollContainer.scrollTo({
            left: Math.max(0, targetScrollLeft),
            behavior: "smooth",
          });
        }
      }
    };

    updatePill();

    // Enable smooth transitions right after the initial placement to prevent initial snap from (0,0)
    if (!hasMounted) {
      const raf = requestAnimationFrame(() => setHasMounted(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [activeId, hasMounted]);

  // Re-measure indicator when window resizes or when web fonts finish rendering
  useEffect(() => {
    const handleResize = () => {
      const el = pillRefs.current[activeId];
      if (el) {
        setIndicator((prev) => ({
          ...prev,
          left: el.offsetLeft,
          top: el.offsetTop,
          width: el.offsetWidth,
          height: el.offsetHeight,
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(handleResize);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [activeId]);

  return (
    <div className="lg:hidden sticky top-[var(--topbar-height)] z-30 w-full bg-background/95 backdrop-blur-md border-b border-border-subtle select-none">
      {/* Horizontal Scroll Container for topic tags */}
      <div
        ref={scrollContainerRef}
        className="w-full max-w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch] overscroll-x-contain no-scrollbar py-2.5 px-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div ref={trackRef} className="relative flex items-center gap-1.5 w-max">
          {/* Hardware-accelerated sliding active pill indicator */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none rounded-md bg-foreground shadow-xs will-change-transform"
            style={{
              transform: `translate3d(${indicator.left}px, ${indicator.top}px, 0)`,
              width: `${indicator.width}px`,
              height: `${indicator.height}px`,
              opacity: indicator.ready ? 1 : 0,
              transition: hasMounted
                ? "transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1), width 320ms cubic-bezier(0.2, 0.8, 0.2, 1), height 320ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 150ms ease-out"
                : "none",
            }}
          />

          {/* Topic Buttons */}
          {topics.map((t) => {
            const isActive = activeId === t.id;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  pillRefs.current[t.id] = el;
                }}
                type="button"
                onClick={() => {
                  setManualActiveId(t.id);
                  scrollToSection(t.id);
                }}
                className={`relative z-10 shrink-0 whitespace-nowrap px-2.5 py-1 rounded-md text-xs font-sans transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? indicator.ready
                      ? "text-background font-medium"
                      : "bg-foreground text-background font-medium shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
                }`}
              >
                {t.shortLabel || t.label}
              </button>
            );
          })}
          {/* Right end breathing room spacer so the last topic is 100% reachable */}
          <div className="w-4 shrink-0 pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/**
 * Desktop Sticky Topic Sidebar (>= 1024px)
 * Matches Image 1: `← back` at top, directly followed by clean vertical topic list.
 * Active topic is bold & dark; inactive topics are muted grey.
 */
export function CaseStudyDesktopSidebar({ topics }: { topics: TopicItem[] }) {
  const [activeId, setManualActiveId] = useActiveSection(topics);

  return (
    <aside
      aria-label="Case Study Topics Navigation"
      className="hidden lg:block w-48 xl:w-56 shrink-0 select-none"
    >
      <div className="sticky top-20 flex flex-col gap-6">
        {/* Vertical Topic Links */}
        <nav className="flex flex-col gap-2">
          {topics.map((topic) => {
            const isActive = activeId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  setManualActiveId(topic.id);
                  scrollToSection(topic.id);
                }}
                className={`text-left text-[13px] font-sans transition-colors duration-150 cursor-pointer leading-snug py-0.5 ${
                  isActive
                    ? "font-semibold text-foreground"
                    : "font-normal text-muted-foreground/80 hover:text-foreground"
                }`}
              >
                {topic.label}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
