import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { WorkShowcase } from "@/components/work/WorkShowcase";
import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Mobile & Tablet Collapsed Navigation (< 1024px) */}
      <MobileNav />

      {/* Desktop Fixed Vertical Sidebar (>= 1024px) */}
      <Sidebar />

      {/* Independent Main Content Canvas (Offset for Desktop) */}
      <div className="flex-1 flex flex-col w-full lg:pl-[var(--sidebar-width)] transition-all duration-300">
        {/* Top Navigation Bar Across Main Content */}
        <TopNav />

        {/* Scrollable Content Area */}
        <main className="flex-1 w-full max-w-[var(--content-max-width)] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-6 flex flex-col gap-12 sm:gap-16">
          {/* Portfolio Hero Section: Morphing Title, Sticker, Note, & Enter Keycap */}
          <Hero />

          {/* Section: Selected Work */}
          <section id="work" className="w-full">
            <WorkShowcase />
          </section>

          {/* Extracted Footer Colophon in Main Area */}
          <Footer backToTopHref="#work" />
        </main>
      </div>
    </div>
  );
}
