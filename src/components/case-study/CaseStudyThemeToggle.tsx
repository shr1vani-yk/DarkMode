"use client";

import { useTheme } from "@/context/ThemeContext";

export function CaseStudyThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="hidden lg:flex fixed top-8 right-8 xl:right-12 z-40">
      <button
        type="button"
        suppressHydrationWarning
        onClick={(e) => toggleTheme(e)}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        className="p-2 text-muted-foreground hover:text-foreground transition-all duration-200 rounded-lg cursor-pointer hover:bg-surface-hover/80 active:scale-95 border border-border-subtle/50 bg-background/70 backdrop-blur-xs shadow-2xs"
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
  );
}

