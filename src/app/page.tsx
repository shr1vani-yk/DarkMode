import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { MobileNav } from "@/components/MobileNav";
import { WorkShowcase } from "@/components/WorkShowcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Mobile Top Navigation (< 768px) */}
      <MobileNav />

      {/* Desktop & Tablet Fixed Vertical Sidebar (>= 768px) */}
      <Sidebar />

      {/* Independent Main Content Canvas (Offset for Tablet & Desktop) */}
      <div className="flex-1 flex flex-col w-full md:pl-[var(--sidebar-width-md)] lg:pl-[var(--sidebar-width)] transition-all duration-300">
        {/* Top Navigation Bar Across Main Content */}
        <TopNav currentSection="Selected Work" />

        {/* Scrollable Content Area: Starts Directly With Selected Work */}
        <main className="flex-1 w-full max-w-[var(--content-max-width)] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10 flex flex-col gap-12 sm:gap-16">
          {/* Section: Selected Work */}
          <section id="work" className="w-full">
            <WorkShowcase />
          </section>

          {/* Footer Colophon in Main Area */}
          <footer className="pt-8 pb-16 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-subtle-foreground">
            <div>
              <span>Shravani Sutar Portfolio </span>
              <span className="mx-2">•</span>
              <span>2026</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#work" className="hover:text-foreground transition-colors">
                Back to top ↑
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
