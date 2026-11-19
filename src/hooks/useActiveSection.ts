"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export type ActiveSection = "home" | "work" | "about" | "playground";

export function useActiveSection() {
  const pathname = usePathname();
  const [scrolledToWork, setScrolledToWork] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    let ticking = false;
    const checkSection = () => {
      const workEl = document.getElementById("work");
      if (!workEl) {
        setScrolledToWork(false);
        return;
      }
      const rect = workEl.getBoundingClientRect();
      const threshold = window.innerHeight * 0.35;
      setScrolledToWork(rect.top <= threshold && rect.bottom > 80);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", checkSection, { passive: true });
    checkSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", checkSection);
    };
  }, [pathname]);

  const activeSection: ActiveSection = pathname?.startsWith("/about")
    ? "about"
    : pathname?.startsWith("/playground")
    ? "playground"
    : pathname === "/" && scrolledToWork
    ? "work"
    : "home";

  return { activeSection, scrolledToWork: pathname === "/" ? scrolledToWork : false };
}
