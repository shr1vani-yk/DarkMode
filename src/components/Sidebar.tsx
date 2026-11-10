"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cat } from "./Cat";

const NAV_ITEMS = [
  { id: "work", label: "Selected Work", count: "04", href: "/#work" },
  { id: "about", label: "About & Craft", count: "", href: "/about" },
  { id: "lab", label: "Interface Lab", count: "12", href: "/#lab" },
  // { id: "archive", label: "Writing & Notes", count: "", href: "#archive" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shravanisutar", external: true },
  // { label: "X / Twitter", href: "https://x.com/chaosNchai", external: true },
  { label: "Instagram", href: "https://www.instagram.com/designft.shrav?mdxt=ZDNlZDc0MzIxNw==", external: true },
  { label: "Email", href: "mailto:digital.shravanisutar@gmail.com", external: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const activeSection = pathname?.startsWith("/about") ? "about" : "work";

  return (
    <aside
      aria-label="Sidebar Navigation"
      className="hidden md:flex flex-col fixed inset-y-0 left-0 z-30 w-[var(--sidebar-width-md)] lg:w-[var(--sidebar-width)] border-r border-border-subtle bg-background/90 backdrop-blur-md select-none transition-all duration-300"
    >
      {/* Top Identity Block */}
      <div className="p-5 lg:p-8 border-b border-border-subtle flex flex-col gap-3">
        <Link href="/" className="group flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-sans font-semibold tracking-tight text-[1.05rem] text-foreground group-hover:text-muted-foreground transition-colors">
              Shravani Sutar
            </span>
            <span className="font-mono text-[0.6875rem] px-1.5 py-0.5 rounded bg-surface-hover text-subtle-foreground border border-border-subtle">
              ’26
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-sans tracking-normal">
            Product Designer &amp; Design Engineer
          </p>
        </Link>

        {/* Animated Cat Mascot from Framer reference */}
        <div className="hidden md:flex items-center pt-1">
          <Cat className="w-[70px] h-[58px] lg:w-24 lg:h-20" />
        </div>
      </div>

      {/* Navigation Index */}
      <nav className="flex-1 px-4 lg:px-6 py-6 flex flex-col justify-between overflow-y-auto">
        <div className="flex flex-col gap-1">
          <span className="px-2 pb-2 text-[0.6875rem] font-mono uppercase tracking-widest text-subtle-foreground">
            Index
          </span>
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-sans transition-all duration-150 ${
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
              </Link>
            );
          })}
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
              className="flex items-center justify-between px-2.5 py-1.5 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-surface-hover/60 transition-colors"
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
        </div>

       
      </nav>

      {/* Footer Colophon */}
      <div className="p-4 lg:p-6 border-t border-border-subtle flex flex-col gap-1.5 text-[0.6875rem] font-mono text-subtle-foreground">
        <div className="flex items-center justify-between">
          <span>&copy; 2026 · Made with Caffeine & Antigravity All Rights Reserved</span>
        </div>
      </div>
    </aside>
  );
}

