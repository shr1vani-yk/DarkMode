"use client";

import { useState, useEffect } from "react";
import { TopNav, BreadcrumbSegment } from "@/components/layout/TopNav";
import { useTheme } from "@/context/ThemeContext";

export interface CaseStudyHeaderProps {
  projectName?: string;
  maxWidthClassName?: string;
  showOnMobile?: boolean;
}

export function CaseStudyHeader({
  projectName,
  maxWidthClassName = "max-w-[1240px] px-6 sm:px-10 md:px-14 lg:px-16",
  showOnMobile = true,
}: CaseStudyHeaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();

  // Smooth, accurate scroll progress calculation across the entire case study
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [theme]);

  const breadcrumbs: BreadcrumbSegment[] = [
    { label: "Home", href: "/" },
    { label: "Selected Work", href: "/#work" },
  ];

  if (projectName) {
    breadcrumbs.push({ label: projectName });
  }

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* Horizontal Reading-Progress Track at the very top: Solid theme fill beneath so there is no gap */}
      <div
        className="w-full h-[2.5px] bg-background overflow-hidden relative"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        {/* Advance bar: solid black in light theme, solid white in dark theme */}
        <div
          className="h-full bg-black dark:bg-white transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <TopNav
        showOnMobile={showOnMobile}
        maxWidthClassName={maxWidthClassName}
        breadcrumbs={breadcrumbs}
      />
    </div>
  );
}

export default CaseStudyHeader;
