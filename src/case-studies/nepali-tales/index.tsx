"use client";

import Link from "next/link";
import { NEPALI_TALES_TOPICS } from "./data";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { SolutionSection } from "./components/SolutionSection";
import { ResultsSection } from "./components/ResultsSection";
import {
  CaseStudyDesktopSidebar,
  CaseStudyMobileBar,
} from "@/components/case-study/CaseStudyTopicNav";
import { NextProjectCard } from "@/components/case-study/NextProjectCard";
import { TopNav } from "@/components/layout/TopNav";
import { PROJECTS, ProjectItem } from "@/data/projects";

interface NepaliTalesCaseStudyProps {
  nextProject?: ProjectItem;
}

export function NepaliTalesCaseStudy({
  nextProject: customNextProject,
}: NepaliTalesCaseStudyProps) {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === "nepali-tales");
  const fallbackNext =
    currentIndex !== -1
      ? PROJECTS[(currentIndex + 1) % PROJECTS.length]
      : PROJECTS[1];
  const nextProject = customNextProject || fallbackNext;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-[#e8590c]/15">
      {/* Global Consistent Header */}
      <TopNav
        showOnMobile
        maxWidthClassName="max-w-[1240px] px-6 sm:px-10 md:px-14 lg:px-16"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Selected Work", href: "/#work" },
          { label: "Nepali Tales" },
        ]}
      />

      {/* Sticky top navigation bar for mobile / tablet screens (< 1024px) */}
      <CaseStudyMobileBar topics={NEPALI_TALES_TOPICS} />

      {/* Main Two-Column Case Study Layout matching the reference blueprint */}
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-8 sm:pt-14 lg:pt-16 pb-24 grid grid-cols-1 lg:grid-cols-[180px_1fr] xl:grid-cols-[210px_1fr] gap-10 lg:gap-16 xl:gap-20">
        {/* Sticky Left Sidebar with `← back` and topics matching blueprint */}
        <CaseStudyDesktopSidebar topics={NEPALI_TALES_TOPICS} />

        {/* Right Reading Canvas */}
        <main className="min-w-0 max-w-[760px] flex flex-col gap-14 sm:gap-20">
          <Hero />
          <ProblemSection />
          <SolutionSection />
          <ResultsSection />

          {/* Signature Sign-off matching screenshot: thanks for reading <3 ✿ */}
          <div className="pt-8 pb-4 flex items-center justify-center text-center">
            <p className="font-signature text-2xl sm:text-3xl text-foreground select-none font-normal">
              thanks for reading &lt;3 &#10047;
            </p>
          </div>

          {/* Next Project Section matching Image 2 & screenshot */}
          {nextProject && <NextProjectCard project={nextProject} />}

          {/* Minimalist Colophon Footer */}
          <footer className="pt-10 pb-12 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
            <div>
              <span>Shravani Sutar Portfolio &middot; 2026</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/#work"
                className="hover:text-foreground transition-colors"
              >
                &larr; Back to Selected Work
              </Link>
              <span>&bull;</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Back to Top &uarr;
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default NepaliTalesCaseStudy;
