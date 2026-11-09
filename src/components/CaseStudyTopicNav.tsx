"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme, toggleTheme } = useTheme();

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
    <div className="lg:hidden sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border-subtle select-none">
      {/* Top action row */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-border-subtle/60">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>&larr;</span>
          <span>back</span>
        </Link>

        {/* Cup Icon Theme Toggle with Circular Reveal */}
        <button
          type="button"
          suppressHydrationWarning
          onClick={(e) => toggleTheme(e)}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          className="p-1.5 text-muted-foreground hover:text-foreground transition-all duration-200 rounded-md cursor-pointer hover:bg-surface-hover active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <path d="M80,56V32a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm32,0V32a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm32,0V32a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0ZM232,96v8a16,16,0,0,1-16,16h-8v8a64.07,64.07,0,0,1-64,64H96a64.07,64.07,0,0,1-64-64V80a8,8,0,0,1,8-8H200a8,8,0,0,1,8,8v8h8A16,16,0,0,1,232,96Zm-40,8V96H176v16a48.05,48.05,0,0,1,0,8h16A8,8,0,0,0,192,104Zm-32,32a48.05,48.05,0,0,0,48-48V88H48v48a48.05,48.05,0,0,0,48,48h64ZM224,208a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16H216A8,8,0,0,1,224,208Z" />
          </svg>
        </button>
      </div>

      {/* Horizontal Scroll Container for topic tags */}
      <div
        ref={scrollContainerRef}
        className="w-full max-w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch] overscroll-x-contain no-scrollbar py-2 px-4"
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
      <div className="sticky top-12 flex flex-col gap-8">
        {/* Top `← back` link matching Image 1 */}
        <Link
          href="/#work"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          >
            &larr;
          </span>
          <span>back</span>
        </Link>

        {/* Vertical Topic Links matching Image 1 */}
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
