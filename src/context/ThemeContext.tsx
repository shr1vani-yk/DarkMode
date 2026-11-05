"use client";

import React, {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
  useRef,
} from "react";

type Theme = "dark" | "light";

export type ThemeToggleEvent =
  | React.MouseEvent
  | React.KeyboardEvent
  | MouseEvent
  | HTMLElement
  | undefined;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event?: ThemeToggleEvent) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSnapshot(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  // MutationObserver to listen for class or data-theme changes on <html>
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.attributeName === "class" ||
        mutation.attributeName === "data-theme"
      ) {
        callback();
      }
    }
  });

  observer.observe(document.documentElement, { attributes: true });

  // System media query change listener
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMediaChange = (e: MediaQueryListEvent) => {
    const stored = localStorage.getItem("theme");
    if (!stored) {
      const nextTheme: Theme = e.matches ? "dark" : "light";
      applyThemeToDOM(nextTheme, false);
      callback();
    }
  };

  mediaQuery.addEventListener("change", handleMediaChange);

  return () => {
    observer.disconnect();
    mediaQuery.removeEventListener("change", handleMediaChange);
  };
}

function applyThemeToDOM(newTheme: Theme, persist = true) {
  if (typeof document === "undefined") return;

  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(newTheme);
  document.documentElement.setAttribute("data-theme", newTheme);
  document.documentElement.style.colorScheme = newTheme;

  if (persist) {
    try {
      localStorage.setItem("theme", newTheme);
    } catch {
      // LocalStorage might be restricted in private browsing
    }
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isTransitioningRef = useRef(false);

  const toggleTheme = useCallback((event?: ThemeToggleEvent) => {
    if (typeof window === "undefined") return;
    if (isTransitioningRef.current) return;

    const current = getSnapshot();
    const nextTheme: Theme = current === "dark" ? "light" : "dark";

    // 1. Calculate origin coordinate from the trigger element or pointer
    let x = window.innerWidth - 44;
    let y = 30;

    if (event) {
      let targetEl: HTMLElement | null = null;
      if (event instanceof HTMLElement) {
        targetEl = event;
      } else if (
        "currentTarget" in event &&
        event.currentTarget instanceof HTMLElement
      ) {
        targetEl = event.currentTarget;
      } else if ("target" in event && event.target instanceof HTMLElement) {
        targetEl = event.target.closest("button") || event.target;
      }

      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else if (
        "clientX" in event &&
        typeof event.clientX === "number" &&
        event.clientX > 0
      ) {
        x = event.clientX;
        y = event.clientY;
      }
    }

    // 2. Calculate maximum distance to the furthest corner to ensure full screen coverage
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Set CSS custom properties on documentElement for fallback/reference
    document.documentElement.style.setProperty("--circle-x", `${x}px`);
    document.documentElement.style.setProperty("--circle-y", `${y}px`);
    document.documentElement.style.setProperty("--circle-r", `${endRadius}px`);

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const doc = document as Document & {
      startViewTransition?: (callback: () => Promise<void> | void) => {
        ready: Promise<void>;
        finished: Promise<void>;
      };
    };

    // If View Transitions API is not supported or user prefers reduced motion
    if (!doc.startViewTransition || isReducedMotion) {
      document.documentElement.classList.add("theme-transition");
      applyThemeToDOM(nextTheme, true);
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 250);
      return;
    }

    // View Transitions API circular expansion (Snehatea reference)
    isTransitioningRef.current = true;

    try {
      const transition = doc.startViewTransition(() => {
        applyThemeToDOM(nextTheme, true);
      });

      transition.ready
        .then(() => {
          const animation = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 500,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );

          animation.onfinish = () => {
            isTransitioningRef.current = false;
          };
        })
        .catch(() => {
          isTransitioningRef.current = false;
        });

      transition.finished
        .then(() => {
          isTransitioningRef.current = false;
        })
        .catch(() => {
          isTransitioningRef.current = false;
        });
    } catch {
      applyThemeToDOM(nextTheme, true);
      isTransitioningRef.current = false;
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    applyThemeToDOM(newTheme, true);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

