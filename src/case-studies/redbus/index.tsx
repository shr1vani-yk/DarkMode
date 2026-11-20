"use client";

import Link from "next/link";
import { REDBUS_TOPICS, REDBUS_METADATA } from "./data";
import {
  CaseStudyDesktopSidebar,
  CaseStudyMobileBar,
} from "@/components/case-study/CaseStudyTopicNav";
import { TopNav } from "@/components/layout/TopNav";
import { NextProjectCard } from "@/components/case-study/NextProjectCard";
import { ProjectItem } from "@/data/projects";

interface RedbusCaseStudyProps {
  nextProject?: ProjectItem;
}

export function RedbusCaseStudy({ nextProject }: RedbusCaseStudyProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-[#e8590c]/15">
      <TopNav
        showOnMobile
        maxWidthClassName="max-w-[1240px] px-6 sm:px-10 md:px-14 lg:px-16"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Selected Work", href: "/#work" },
          { label: "RedBus" },
        ]}
      />

      <CaseStudyMobileBar topics={REDBUS_TOPICS} />

      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-8 sm:pt-14 lg:pt-16 pb-24 grid grid-cols-1 lg:grid-cols-[180px_1fr] xl:grid-cols-[210px_1fr] gap-10 lg:gap-16 xl:gap-20">
        <CaseStudyDesktopSidebar topics={REDBUS_TOPICS} />

        <main className="min-w-0 max-w-[760px] flex flex-col gap-14 sm:gap-20">
          <header className="flex flex-col">
            <span className="font-sans text-xs sm:text-sm text-muted-foreground font-normal mb-2.5">
              case study &middot; {REDBUS_METADATA.readTime}
            </span>
            <h1 className="font-sans font-semibold text-3xl sm:text-4xl md:text-[2.65rem] text-foreground tracking-tight leading-[1.14] mb-8 sm:mb-10">
              {REDBUS_METADATA.displayTitle}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pb-8 border-b border-border-subtle/70">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-xs text-muted-foreground font-normal">
                  Timeline
                </span>
                <span className="font-sans text-sm text-foreground font-normal">
                  {REDBUS_METADATA.timeline}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-xs text-muted-foreground font-normal">
                  Role
                </span>
                <span className="font-sans text-sm text-foreground font-normal">
                  {REDBUS_METADATA.role}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-xs text-muted-foreground font-normal">
                  Deliverables
                </span>
                <div className="font-sans text-sm text-foreground font-normal leading-relaxed flex flex-col">
                  {REDBUS_METADATA.deliverables.map((item, i) => (
                    <span key={i}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <section id="overview" className="flex flex-col gap-4">
            <span className="font-sans text-xs text-muted-foreground font-normal">
              Overview
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground font-sans tracking-tight">
              Re-imagining bus ticketing for next-generation commuters
            </h2>
            <p className="text-[15px] sm:text-base text-muted-foreground font-sans leading-[1.8]">
              Coming soon. A complete case study detailing user interviews, edge-case routing, and high-conversion checkout flows.
            </p>
          </section>

          <NextProjectCard project={nextProject} />

          <footer className="pt-10 pb-12 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
            <div>
              <span>Shravani Sutar Portfolio &middot; 2026</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/#work" className="hover:text-foreground transition-colors">
                &larr; Back to Selected Work
              </Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default RedbusCaseStudy;
