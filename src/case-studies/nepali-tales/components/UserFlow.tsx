"use client";

import { useState } from "react";
import Image from "next/image";
import * as PhosphorIcons from "@phosphor-icons/react/ssr";

type FlowTab = "architecture" | "sitemap" | "user-flow";

interface FlowStep {
  id: FlowTab;
  label: string;
  imageSrc?: string;
  alt: string;
  bgColor: string;
}

const FLOW_STEPS: Record<FlowTab, FlowStep> = {
  architecture: {
    id: "architecture",
    label: "Information Architecture",
    imageSrc: "/images/case-studies/NepaliTales/Flowcharts/IA.png",
    alt: "Nepali Tales Information Architecture Diagram",
    bgColor: "bg-white",
  },
  sitemap: {
    id: "sitemap",
    label: "Sitemap",
    imageSrc: "/images/case-studies/NepaliTales/Flowcharts/sitemap.png",
    alt: "Nepali Tales Sitemap and Content Hierarchy",
    bgColor: "bg-[#F5F5F5]",
  },
  "user-flow": {
    id: "user-flow",
    label: "User Flow",
    alt: "Nepali Tales User Flow Diagram",
    bgColor: "bg-surface",
  },
};

const TAB_LIST: { id: FlowTab; label: string }[] = [
  { id: "architecture", label: "Information Architecture" },
  { id: "sitemap", label: "Sitemap" },
  { id: "user-flow", label: "User Flow" },
];

export function UserFlow() {
  const [activeTab, setActiveTab] = useState<FlowTab>("sitemap");
  const currentStep = FLOW_STEPS[activeTab];

  return (
    <section
      id="user-flow"
      aria-labelledby="heading-user-flow"
      className="flex flex-col gap-6 pt-10 border-t border-border-subtle/70"
    >
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium">
          SITEMAP, USER FLOW
        </span>
        <h2
          id="heading-user-flow"
          className="text-lg sm:text-xl font-light text-foreground leading-snug"
        >
          What research revealed : The ordering experience needed to work for both sides
        </h2>
      </div>

      {/* Interactive Frame with Top Navigation Bar matching Figma */}
      <div className="rounded bg-surface border border-border-subtle overflow-hidden shadow-xs my-2 flex flex-col">
        {/* Frame Top Bar */}
        <div className="px-4 sm:px-5 py-3 sm:py-3.5 border-b border-border-subtle/70 bg-surface-hover/30 flex items-center justify-between gap-3 select-none">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
            {TAB_LIST.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-sans text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background font-medium shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* /demo Badge matching Figma reference */}
          
        </div>

        {/* Diagram Image / Placeholder Container */}
        <div
          className={`relative w-full aspect-[919/449] transition-colors duration-200 overflow-hidden ${currentStep.bgColor} ${
            currentStep.imageSrc ? "p-3 sm:p-5" : "p-4 sm:p-8"
          }`}
        >
          {currentStep.imageSrc ? (
            <Image
              key={currentStep.id}
              src={currentStep.imageSrc}
              alt={currentStep.alt}
              fill
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 768px) calc(100vw - 64px), (max-width: 960px) calc(100vw - 96px), 864px"
              className="object-contain"
              priority
            />
          ) : (
            /* Clean, editorial placeholder for missing asset */
            <div className="w-full h-full rounded border border-dashed border-border-strong/40 bg-surface/60 flex flex-col items-center justify-center text-center p-4 sm:p-8 select-none">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-center text-muted-foreground shadow-2xs mb-2.5 sm:mb-3">
                <PhosphorIcons.TreeStructureIcon
                  size={22}
                  weight="regular"
                  className="text-foreground/80"
                />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-sans font-medium text-xs sm:text-sm text-foreground">
                  User Flow Diagram
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-hover text-subtle-foreground border border-border-subtle">
                  In Progress
                </span>
              </div>
              
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UserFlow;
