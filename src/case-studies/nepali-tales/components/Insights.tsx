"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import * as PhosphorIcons from "@phosphor-icons/react/ssr";

type InsightCategory =
  | "discovery"
  | "research"
  | "ordering"
  | "cultural";

interface InsightTab {
  id: InsightCategory;
  label: string;
  images: string[];
}

const INSIGHT_TABS: InsightTab[] = [
  {
    id: "discovery",
    label: "Discovery Approach",
    images: [
      "/images/case-studies/NepaliTales/Insights/discovery/discovery-1.png",
      "/images/case-studies/NepaliTales/Insights/discovery/discovery-2.png",
    ],
  },
  {
    id: "research",
    label: "Research Synthesis",
    images: [
      "/images/case-studies/NepaliTales/Insights/research/research-1.png",
      "/images/case-studies/NepaliTales/Insights/research/research-2.png",
      "/images/case-studies/NepaliTales/Insights/research/research-3.png",
    ],
  },
  {
    id: "ordering",
    label: "Ordering Pattern Research",
    images: [
      "/images/case-studies/NepaliTales/Insights/ordering/ordering-1.png",
      "/images/case-studies/NepaliTales/Insights/ordering/ordering-2.png",
    ],
  },
  {
    id: "cultural",
    label: "Cultural Research",
    images: [
      "/images/case-studies/NepaliTales/Insights/cultural/cultural-1.png",
      "/images/case-studies/NepaliTales/Insights/cultural/cultural-2.png",
      "/images/case-studies/NepaliTales/Insights/cultural/cultural-3.png",
    ],
  },
];

export function Insights() {
  const [activeTab, setActiveTab] = useState<InsightCategory>("discovery");
  const [expandedNote, setExpandedNote] = useState<string | null>(null);

  const currentTab =
    INSIGHT_TABS.find((t) => t.id === activeTab) || INSIGHT_TABS[0];

  // Close expanded note on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedNote(null);
      }
    };
    if (expandedNote) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedNote]);

  return (
    <section
      id="insights"
      aria-labelledby="heading-insights"
      className="flex flex-col gap-5 sm:gap-6 pt-10 border-t border-border-subtle/70"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium">
          INSIGHTS
        </span>
        <h2
          id="heading-insights"
          className="text-base sm:text-xl font-light text-foreground leading-snug"
        >
          What insights revealed : The ordering experience needed to work for both sides
        </h2>
      </div>

      {/* Interactive Tabs Row */}
      <div
        role="tablist"
        aria-label="Insight categories"
        className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1 select-none"
      >
        {INSIGHT_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`font-sans font-light text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-surface-elevated text-foreground border border-border-strong font-medium shadow-xs"
                  : "bg-transparent text-muted-foreground hover:text-foreground border border-border-subtle hover:border-border-strong/40"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Corresponding Notes Cards directly below tabs (compact & proportionate on mobile) */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 pt-2.5 sm:pt-3">
        {currentTab.images.map((src, idx) => (
          <div
            key={`${activeTab}-${idx}`}
            onClick={() => setExpandedNote(src)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setExpandedNote(src);
              }
            }}
            aria-label={`${currentTab.label} note ${idx + 1} (click to expand)`}
            className="group relative w-full aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-white shadow-xs hover:shadow-lg hover:scale-[1.015] border border-border-subtle/50 transition-all duration-200 cursor-pointer"
          >
            <Image
              src={src}
              alt={`${currentTab.label} note ${idx + 1}`}
              fill
              sizes="(max-width: 640px) calc(50vw - 26px), (max-width: 1024px) 50vw, 320px"
              className="object-contain"
              priority={idx < 2}
            />
          </div>
        ))}
      </div>

      {/* Generous Whitespace + Concluding How Might We Statement */}
      <div className="mt-12 sm:mt-28 md:mt-32 mb-6 text-center select-none">
        <p className="text-lg sm:text-2xl md:text-[1.95rem] lg:text-[2.15rem] font-light text-foreground tracking-tight max-w-3xl mx-auto leading-snug sm:leading-[1.28]">
          How might{" "}
          <span className="text-[#657700] dark:text-[#ebf195] font-regular">
            we make pre-ordering feel as familiar
          </span>{" "}
          and effortless as everyday e-commerce?
        </p>
      </div>

      {/* Expanded Note Modal on Desktop/Tablet Click */}
      {expandedNote && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded Note"
          onClick={() => setExpandedNote(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm sm:max-w-lg aspect-square rounded-xl overflow-hidden bg-white shadow-2xl border border-white/20 animate-in zoom-in-95 duration-150"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setExpandedNote(null)}
              aria-label="Close note preview"
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <PhosphorIcons.XIcon size={18} weight="bold" />
            </button>

            <Image
              src={expandedNote}
              alt="Expanded note"
              fill
              sizes="(max-width: 768px) 90vw, 600px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Insights;
