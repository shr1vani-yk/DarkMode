"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { PROJECTS } from "@/data/projects";
import { useActiveSection } from "@/hooks/useActiveSection";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

export interface TopNavProps {
  currentSection?: string;
  breadcrumbs?: BreadcrumbSegment[];
  maxWidthClassName?: string;
  className?: string;
  showOnMobile?: boolean;
}

export function TopNav({
  currentSection,
  breadcrumbs: customBreadcrumbs,
  maxWidthClassName = "max-w-[var(--content-max-width)] px-4 sm:px-6 md:px-8 lg:px-12",
  className = "",
  showOnMobile = false,
}: TopNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrolledToWork } = useActiveSection();
  const pathname = usePathname();
  const { toggleTheme } = useTheme();

  // Scroll detection for header background blur/shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute active breadcrumbs
  const breadcrumbs: BreadcrumbSegment[] = (() => {
    if (customBreadcrumbs && customBreadcrumbs.length > 0) {
      return customBreadcrumbs;
    }

    // Explicit currentSection override if provided
    if (currentSection) {
      if (currentSection === "Home") {
        return [{ label: "Home" }];
      }
      return [{ label: "Home", href: "/" }, { label: currentSection }];
    }

    // Pathname-based resolution
    if (pathname === "/about") {
      return [{ label: "Home", href: "/" }, { label: "About & Craft" }];
    }

    if (pathname === "/playground") {
      return [{ label: "Home", href: "/" }, { label: "Playground" }];
    }

    if (pathname?.startsWith("/work/")) {
      const slug = pathname.replace(/^\/work\//, "").replace(/\/$/, "");
      const project = PROJECTS.find((p) => p.slug === slug);
      const projectTitle =
        slug === "plixlife"
          ? "Plix"
          : project
          ? project.title
          : "Case Study";

      return [
        { label: "Home", href: "/" },
        { label: "Selected Work", href: "/#work" },
        { label: projectTitle },
      ];
    }

    // Default: Homepage ("/")
    if (scrolledToWork) {
      return [{ label: "Home", href: "/" }, { label: "Selected Work" }];
    }

    return [{ label: "Home" }];
  })();

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", "/");
      }
    }
  };

  const displayClass = showOnMobile ? "block" : "hidden lg:block";

  return (
    <header
      className={`${displayClass} sticky top-0 z-40 h-[var(--topbar-height)] w-full border-b transition-all duration-200 select-none ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border-subtle shadow-xs"
          : "bg-background border-border-subtle"
      } ${className}`}
    >
      <div
        className={`h-full w-full mx-auto flex items-center justify-between ${maxWidthClassName}`}
      >
        {/* Left: Dynamic Breadcrumbs Navigation */}
        <nav
          aria-label="Breadcrumb navigation"
          className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono text-muted-foreground overflow-x-auto no-scrollbar"
        >
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <span
                key={`${crumb.label}-${idx}`}
                className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
              >
                {idx > 0 && (
                  <span className="text-subtle-foreground" aria-hidden="true">
                    /
                  </span>
                )}
                {isLast ? (
                  <span className="text-foreground font-medium">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href || "/"}
                    onClick={
                      crumb.href === "/" || crumb.href === "#hero"
                        ? handleHomeClick
                        : undefined
                    }
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        {/* Right: Actions - Phosphor Cup Icon Theme Toggle with Circular Reveal */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={(e) => toggleTheme(e)}
            aria-label="Toggle theme"
            title="Toggle theme"
            className="p-2 text-muted-foreground hover:text-foreground transition-all duration-200 rounded-md cursor-pointer hover:bg-surface-hover active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 256 256"
              fill="currentColor"
              className="transition-transform duration-200 hover:rotate-6"
            >
              <path d="M80,56V32a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm32,0V32a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm32,0V32a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0ZM232,96v8a16,16,0,0,1-16,16h-8v8a64.07,64.07,0,0,1-64,64H96a64.07,64.07,0,0,1-64-64V80a8,8,0,0,1,8-8H200a8,8,0,0,1,8,8v8h8A16,16,0,0,1,232,96Zm-40,8V96H176v16a48.05,48.05,0,0,1,0,8h16A8,8,0,0,0,192,104Zm-32,32a48.05,48.05,0,0,0,48-48V88H48v48a48.05,48.05,0,0,0,48,48h64ZM224,208a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16H216A8,8,0,0,1,224,208Z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
