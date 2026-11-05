"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme, toggleTheme } = useTheme();

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
        </Link>

        {/* Right: Theme Toggle & Menu Button */}
        <div className="flex items-center gap-1">
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
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-x-0 top-14 bottom-0 bg-background/98 backdrop-blur-xl z-50 flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[0.6875rem] font-mono uppercase tracking-widest text-subtle-foreground">
                Mobile Nav
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

            <div className="flex flex-col gap-2 pt-4">
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
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border-subtle bg-surface text-xs font-sans text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors"
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

          <div className="pt-6 border-t border-border-subtle flex items-center justify-between text-[0.6875rem] font-mono text-subtle-foreground">
            <span>&copy; 2026 Shravani Sutar</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      )}
    </div>
  );
}
