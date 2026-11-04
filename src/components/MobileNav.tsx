"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const MOBILE_NAV_ITEMS = [
  { id: "work", label: "Selected Work", count: "04", href: "#work" },
  { id: "about", label: "About & Craft", count: "", href: "#about" },
  { id: "lab", label: "Interface Lab", count: "12", href: "#lab" },
  { id: "archive", label: "Writing & Notes", count: "", href: "#archive" },
];

const MOBILE_SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X / Twitter", href: "https://x.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Email", href: "mailto:hello@shravani.design" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden sticky top-0 z-40 w-full border-b border-border-subtle bg-background/90 backdrop-blur-md">
      {/* Top Bar for Mobile */}
      <div className="h-14 px-4 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2"
        >
          <span className="font-sans font-semibold tracking-tight text-sm text-foreground">
            Shravani Sutar
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
        </Link>

        {/* Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="p-2 rounded-md text-foreground hover:bg-surface-hover transition-colors"
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

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-x-0 top-14 bottom-0 bg-background/98 backdrop-blur-xl z-50 flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[0.6875rem] font-mono uppercase tracking-widest text-subtle-foreground">
                Navigation
              </span>
              <nav className="flex flex-col gap-1">
                {MOBILE_NAV_ITEMS.map((item, index) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-3 text-lg font-sans font-medium text-foreground border-b border-border-subtle"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-subtle-foreground">
                        0{index + 1}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="font-mono text-xs text-subtle-foreground">
                        [{item.count}]
                      </span>
                    )}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <span className="text-[0.6875rem] font-mono uppercase tracking-widest text-subtle-foreground">
                Connect
              </span>
              <div className="grid grid-cols-2 gap-2">
                {MOBILE_SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border-subtle text-xs text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                  >
                    <span>{social.label}</span>
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
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Footer Status */}
          <div className="pt-6 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-subtle-foreground">
            <span>San Francisco, CA</span>
            <span className="text-accent">Available for work</span>
          </div>
        </div>
      )}
    </div>
  );
}

