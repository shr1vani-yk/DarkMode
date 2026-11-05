"use client";

import Link from "next/link";

interface TopNavProps {
  currentSection?: string;
}

export function TopNav({ currentSection = "Overview" }: TopNavProps) {
  return (
    <header className="sticky top-0 z-20 h-[var(--topbar-height)] w-full border-b border-border-subtle bg-background/80 backdrop-blur-md transition-colors">
      <div className="h-full w-full max-w-[var(--content-max-width)] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: Breadcrumbs / Section Label */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link
            href="/"
            className="hover:text-foreground transition-colors hidden sm:inline"
          >
            Portfolio
          </Link>
          <span className="text-subtle-foreground hidden sm:inline">/</span>
          <span className="text-foreground font-medium">{currentSection}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-sans text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full border border-border-subtle hover:border-border-strong bg-surface/50"
          >
            <span>Resume</span>
            <svg
              className="w-3 h-3 text-subtle-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>

          {/* <a
            href="mailto:hello@shravani.design"
            className="inline-flex items-center gap-2 text-xs font-sans font-medium px-3.5 py-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            <span>Get in touch</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </a> */}
        </div>
      </div>
    </header>
  );
}

