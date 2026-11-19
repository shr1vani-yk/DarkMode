import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { AboutGrid } from "@/components/about/AboutGrid";

export const metadata = {
  title: "About · Shravani Sutar",
  description:
    "Product designer & design engineer — personal editorial grid, music, observations, and values.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-mono selection:bg-[#e8590c]/15">
      {/* Mobile Top Navigation (< 768px) */}
      <MobileNav currentSection="About & Craft" />

      {/* Desktop & Tablet Fixed Vertical Sidebar (>= 768px) */}
      <Sidebar />

      {/* Independent Main Content Canvas (Offset for Tablet & Desktop) */}
      <div className="flex-1 flex flex-col w-full md:pl-[var(--sidebar-width-md)] lg:pl-[var(--sidebar-width)] transition-all duration-300">
        {/* Top Navigation Bar Across Main Content */}
        <TopNav currentSection="About & Craft" />

        {/* Scrollable Content Area */}
        <main className="flex-1 w-full max-w-[var(--content-max-width)] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10 pb-24 flex flex-col gap-12 sm:gap-16">
          <AboutGrid />

          {/* Footer Colophon */}
          <Footer />
        </main>
      </div>
    </div>
  );
}
