"use client";

import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { NextProjectCard } from "@/components/case-study/NextProjectCard";
import { PROJECTS, ProjectItem } from "@/data/projects";

import { Hero } from "./components/Hero";
import { GridShowcase } from "./components/GridShowcase";
import { MyRole } from "./components/MyRole";
import { Storyboard } from "./components/Storyboard";
import { Insights } from "./components/Insights";
import { UserFlow } from "./components/UserFlow";
import { Iterations } from "./components/Iterations";
import { Outcome } from "./components/Outcome";
import { Learnings } from "./components/Learnings";

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
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-[#DA2122]/15">
      {/* Retained CaseStudyHeader with Solid White Scroll-Progress Indicator */}
      <CaseStudyHeader
        projectName="Nepali Tales"
        maxWidthClassName="max-w-[960px] px-5 sm:px-8 md:px-12"
      />

      {/* Centered Single-Column Case Study Canvas matching Figma single source of truth */}
      <main className="w-full max-w-[960px] mx-auto px-5 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-24 flex flex-col gap-14 sm:gap-20">
        {/* Section A: Hero & Metadata */}
        <Hero />

        {/* Section B: Background Context & Grid Showcase */}
        <GridShowcase />

        {/* Section C: My Role */}
        <MyRole />

        {/* Section D & E: Storyboard & Problem Statement */}
        <Storyboard />

        {/* Section F: Insights Tabs & Sticky Notes */}
        <Insights />

        {/* Section G: User Flow & Sitemap */}
        <UserFlow />

        {/* Section H: Iterations & Tradeoffs */}
        <Iterations />

        {/* Section I: Final Outcome Showcase */}
        <Outcome />

        {/* Section J & K: Learnings & Kind Words From Client */}
        <Learnings />

        {/* Colophon Section matching Figma design */}
        <div className="pt-12 border-t border-border-subtle/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-[11px] text-muted-foreground uppercase leading-relaxed">
          <div>
            <p className="font-semibold text-foreground/90">&copy;SHRAVANI SUTAR</p>
            <p>MULTIDISCIPLINARY ARTIST</p>
          </div>
          <div className="max-w-md sm:text-right">
            <p>STILL MAKING THINGS, STILL LOOKING FOR THINGS TO MAKE.</p>
            <p>
              IF SOMETHING HERE CAUGHT YOUR ATTENTION, SAY HELLO. [
              <a
                href="mailto:shravanisutar.99@gmail.com"
                className="text-foreground hover:underline ml-1"
              >
                SHRAVANISUTAR.99@GMAIL.COM
              </a>
              ]
            </p>
          </div>
        </div>

        {/* Next Project Card (Plix) */}
        {nextProject && <NextProjectCard project={nextProject} />}
      </main>
    </div>
  );
}

export default NepaliTalesCaseStudy;
