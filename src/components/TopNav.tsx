"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface TopNavProps {
  currentSection?: string;
}

export function TopNav({ currentSection = "Selected Work" }: TopNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 h-[var(--topbar-height)] w-full border-b transition-all duration-200 ${
        isScrolled
          ? "bg-background/70 backdrop-blur-md border-border-subtle shadow-xs"
          : "bg-background border-border-subtle"
      }`}
    >
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

        {/* Right: Actions - Phosphor Cup Icon Theme Toggle with Circular Reveal */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            suppressHydrationWarning
            onClick={(e) => toggleTheme(e)}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
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
