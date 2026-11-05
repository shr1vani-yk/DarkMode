import { notFound } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { MobileNav } from "@/components/MobileNav";
import { PROJECTS } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Mobile Top Navigation (< 768px) */}
      <MobileNav />

      {/* Desktop & Tablet Fixed Vertical Sidebar (>= 768px) */}
      <Sidebar />

      {/* Independent Main Content Canvas */}
      <div className="flex-1 flex flex-col w-full md:pl-[var(--sidebar-width-md)] lg:pl-[var(--sidebar-width)] transition-all duration-300">
        <TopNav currentSection={project.title} />

        <main className="flex-1 w-full max-w-[var(--content-max-width)] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-12 flex flex-col gap-12">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Back to Selected Work</span>
          </Link>

          {/* Placeholder Case Study Header */}
          <div className="flex flex-col gap-4 border-b border-border-subtle pb-8">
            <div className="flex items-center gap-3 text-xs font-mono text-subtle-foreground">
              <span>[{project.id}]</span>
              <span>/</span>
              <span>{project.categoryLabel}</span>
              <span>/</span>
              <span>{project.year}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground font-sans">
              {project.displayTitle}
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground font-sans max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Minimal Placeholder Content */}
          <div className="rounded-2xl border border-dashed border-border-subtle bg-surface/50 p-12 sm:p-20 flex flex-col items-center justify-center text-center gap-3 my-8">
            <span className="font-mono text-xs uppercase tracking-widest text-subtle-foreground">
              Case Study Documentation
            </span>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans">
              Detailed case study documentation and design artifact breakdown in progress.
            </p>
          </div>

          {/* Footer Colophon */}
          <footer className="pt-8 pb-16 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-subtle-foreground">
            <div>
              <span>Shravani Sutar Portfolio </span>
              <span className="mx-2">&bull;</span>
              <span>2026</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-foreground transition-colors">
                Back to Selected Work &uarr;
              </Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

