import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { MobileNav } from "@/components/MobileNav";
import { EditorialHero } from "@/components/EditorialHero";

const FEATURED_PROJECTS = [
  {
    id: "01",
    title: "Nepali Tales",
    subtitle: "Multi-platform design token architecture and tactile UI components",
    category: "Design Systems / Engineering",
    year: "2026",
    tags: ["Visuals", "NextJS", "Prototyped"],
    featured: true,
  },
  {
    id: "02",
    title: "PlixLife",
    subtitle: "Marketive & Sales Creatives with UI/UX, Web & Motion Design",
    category: "Brand & Visual Design",
    year: "2026",
    tags: ["Generative UI", "Spatial Canvas", "TypeScript"],
    featured: false,
  },
  {
    id: "03",
    title: "Digimedic",
    subtitle: "Physics-based spring animation engine for tactile web interactions",
    category: "UI/UX & Frontend Developer Intern",
    year: "2024",
    tags: ["React", "Web Standards", "Prototyping"],
    featured: false,
  },
  {
    id: "04",
    title: "Chronicle Journal",
    subtitle: "High-density editorial writing platform with typography-first hierarchy",
    category: "Editorial Design",
    year: "2024",
    tags: ["Typography", "Grid Systems", "Accessibility"],
    featured: true,
  },
];

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

        {/* Scrollable Content Area with Responsive Gutters */}
        <main className="flex-1 w-full max-w-[var(--content-max-width)] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col gap-16 md:gap-20">
          {/* Asymmetrical Editorial Hero */}
          <EditorialHero />

          {/* Section: Selected Work (Demonstrating Asymmetrical Grid & Flexbox Foundation) */}
          <section id="work" className="flex flex-col gap-8 pb-20">
            {/* Section Header with Monospace Index */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border-subtle pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-subtle-foreground">01</span>
                <span className="font-mono text-xs uppercase tracking-widest text-subtle-foreground">/</span>
                <h2 className="text-sm font-mono uppercase tracking-widest text-foreground font-medium">
                  Selected Work
                </h2>
              </div>
              <span className="text-xs font-mono text-subtle-foreground">
                [04 Projects]
              </span>
            </div>

            {/* Asymmetrical Work Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {FEATURED_PROJECTS.map((project, idx) => (
                <article
                  key={project.id}
                  className={`group relative rounded-2xl border border-border-subtle bg-surface p-6 sm:p-8 flex flex-col justify-between gap-8 transition-all duration-200 hover:border-border-strong hover:bg-surface-hover/50 ${
                    idx === 0 ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  {/* Card Header & Metadata */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between text-[0.6875rem] font-mono text-subtle-foreground">
                      <span>[{project.id}] {project.category}</span>
                      <span>{project.year}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-sans font-semibold text-lg sm:text-xl text-foreground group-hover:text-muted-foreground transition-colors">
                          {project.title}
                        </h3>
                        <svg
                          className="w-4 h-4 text-subtle-foreground group-hover:text-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Visual Specimen Area with Floating Badges */}
                  <div
                    className={`relative w-full rounded-xl border border-border-subtle bg-background overflow-hidden p-6 flex flex-col justify-end ${
                      idx === 0 ? "h-64 sm:h-80" : "h-48 sm:h-60"
                    }`}
                  >
                    {/* Background Subtle Wireframe Grid */}
                    <div className="absolute inset-0 bg-grid-subtle opacity-30" />

                    {/* Architectural Crosshair Details */}
                    <div className="absolute top-3 left-3 font-mono text-[0.625rem] text-subtle-foreground">
                      GRID.NODE.{project.id}
                    </div>

                    <div className="relative z-10 flex flex-wrap items-center gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[0.6875rem] font-mono bg-surface border border-border-subtle text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Footer Colophon in Main Area */}
          <footer className="pt-8 pb-16 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-subtle-foreground">
            <div>
              <span>Shravani Sutar Portfolio </span>
              <span className="mx-2">•</span>
              <span>2026</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#top" className="hover:text-foreground transition-colors">
                Back to top ↑
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
