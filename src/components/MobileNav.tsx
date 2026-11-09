"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Cat } from "./Cat";

interface MobileNavProps {
  currentSection?: string;
}

const NAV_ITEMS = [
  { id: "work", label: "Selected Work", count: "04", href: "/#work" },
  { id: "about", label: "About & Craft", count: "", href: "/#about" },
  { id: "lab", label: "Interface Lab", count: "12", href: "/#lab" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shravanisutar",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/designft.shrav?mdxt=ZDNlZDc0MzIxNw==",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:digital.shravanisutar@gmail.com",
    external: true,
  },
];

export function MobileNav({ currentSection = "Selected Work" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("work");
  const { theme, toggleTheme } = useTheme();

  // Close navigation on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  return (
    <div className="md:hidden sticky top-0 z-30 w-full bg-background border-b border-border-subtle select-none">
      {/* 1. Mobile Top Bar */}
      <div className="h-14 px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 group min-w-0"
        >
          <span className="font-sans font-semibold tracking-tight text-sm text-foreground group-hover:text-muted-foreground transition-colors shrink-0">
            Shravani Sutar
          </span>
          <span className="font-mono text-[0.625rem] px-1.5 py-0.5 rounded bg-surface-hover text-subtle-foreground border border-border-subtle shrink-0">
            ’26
          </span>
          {currentSection && currentSection !== "Selected Work" && (
            <span className="hidden min-[480px]:inline font-mono text-xs text-muted-foreground truncate">
              / {currentSection}
            </span>
          )}
        </Link>

        {/* Right: Theme Toggle (Cup Icon) & Animated Hamburger / Close Button */}
        <div className="flex items-center gap-1 shrink-0">
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

          {/* Menu Toggle: Animates between ☰ (Hamburger) and ✕ (Close) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Collapse navigation menu" : "Expand navigation menu"}
            className="p-2 rounded-md text-foreground hover:bg-surface-hover transition-colors cursor-pointer"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-foreground transition-transform duration-200 origin-left ${
                  isOpen ? "rotate-45 translate-x-0.5" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-foreground transition-opacity duration-200 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-0.5 w-full bg-foreground transition-transform duration-200 origin-left ${
                  isOpen ? "-rotate-45 translate-x-0.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* 2. In-flow Vertically Stacked Navigation (Replicating ggkim.com's stacking behaviour) */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr] border-t border-border-subtle" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Expanded Mobile Navigation"
            className="p-5 sm:p-6 flex flex-col gap-6 bg-background"
          >
            {/* Profile / Intro with Cat Mascot */}
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-sans font-semibold tracking-tight text-sm text-foreground">
                    Shravani Sutar
                  </span>
                  <span className="font-mono text-[0.625rem] px-1.5 py-0.5 rounded bg-surface-hover text-subtle-foreground border border-border-subtle">
                    ’26
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-sans">
                  Product Designer &amp; Design Engineer
                </p>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <Cat forceActive className="w-[60px] h-[50px]" />
              </div>
            </div>

            {/* Navigation Index */}
            <div className="flex flex-col gap-1">
              <span className="px-2 pb-2 text-[0.6875rem] font-mono uppercase tracking-widest text-subtle-foreground">
                Index
              </span>
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsOpen(false);
                    }}
                    className={`group flex items-center justify-between px-2.5 py-2.5 rounded-md text-xs sm:text-sm font-sans transition-all duration-150 ${
                      isActive
                        ? "bg-surface-hover text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[0.6875rem] text-subtle-foreground group-hover:text-foreground transition-colors">
                        0{index + 1}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="font-mono text-[0.6875rem] text-subtle-foreground opacity-75">
                        [{item.count}]
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Connect & Socials */}
            <div className="flex flex-col gap-1 pt-6 border-t border-border-subtle">
              <span className="px-2 pb-2 text-[0.6875rem] font-mono uppercase tracking-widest text-subtle-foreground">
                Connect
              </span>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-2.5 py-2 rounded text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-surface-hover/60 transition-colors"
                >
                  <span>{link.label}</span>
                  {link.external && (
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
                  )}
                </a>
              ))}
            </div>

            {/* Footer Colophon */}
            <div className="pt-6 border-t border-border-subtle flex flex-col gap-1.5 text-[0.6875rem] font-mono text-subtle-foreground">
              <div className="flex items-center justify-between">
                <span>&copy; 2026 · Made with Caffeine &amp; Antigravity All Rights Reserved</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
