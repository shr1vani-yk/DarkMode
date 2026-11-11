"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import * as PhosphorIcons from "@phosphor-icons/react";
import {
  PLAYGROUND_FILTERS,
  PLAYGROUND_ITEMS,
  PlaygroundFilterId,
  PlaygroundItem,
} from "@/data/playground";

export function PlaygroundGallery() {
  const [activeFilter, setActiveFilter] = useState<PlaygroundFilterId>("all");
  const [selectedItem, setSelectedItem] = useState<PlaygroundItem | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    if (selectedItem) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedItem]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return PLAYGROUND_ITEMS;
    return PLAYGROUND_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const isPlaceholderCategory =
    (activeFilter === "interface" || activeFilter === "motion") &&
    filteredItems.length === 0;

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-10 text-foreground">
      {/* 1. Header & Lead-in Paragraph matching screenshots */}
      <section className="flex flex-col gap-6 max-w-2xl sm:max-w-3xl">
        <p className="font-sans font-light text-xs sm:text-sm text-foreground leading-relaxed">
          A space for everything beyond the usual design work. Experiments,
          random ideas, happy accidents and things I make simply because I&apos;m
          curious. Find more on my{" "}
          <a
            href="https://www.instagram.com/shr1vani?rpxt=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#DC6803] underline-offset-4 hover:decoration-foreground hover:text-foreground transition-colors"
          >
            socials
          </a>
        </p>

        {/* 2. Category Filter Pills */}
        <div
          role="tablist"
          aria-label="Filter playground categories"
          className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 pt-1 select-none"
        >
          {PLAYGROUND_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`font-sans font-light text-[0.6875rem] sm:text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-[#d97706] dark:bg-[#ea580c] text-white font-regular px-2.5 py-1  shadow-xs"
                    : "text-muted-foreground hover:text-foreground px-2 py-1"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Gallery Grid or Minimal Placeholder State */}
      {isPlaceholderCategory ? (
        <div className="w-full py-16 sm:py-24 border border-dashed border-border-subtle rounded-xl flex flex-col items-center justify-center text-center p-6 sm:p-8 bg-surface-hover/20">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
            [{activeFilter === "interface" ? "Interfaces" : "Motion"} &bull; In
            Progress]
          </span>
          <p className="font-sans text-xs sm:text-sm text-foreground/75 max-w-md leading-relaxed">
            {activeFilter === "interface"
              ? "Curating interface explorations, micro-interactions, and design systems. Check back soon."
              : "Motion studies, interaction choreography, and animation experiments currently in the render queue."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-7 sm:gap-x-5 sm:gap-y-9 w-full">
          {filteredItems.map((item, index) => {
            const isHalf = item.desktopColSpan === "half";

            return (
              <article
                key={item.id}
                className={`group flex flex-col gap-2 cursor-pointer ${
                  isHalf ? "lg:col-span-3" : "lg:col-span-2"
                } sm:col-span-1 col-span-1`}
                onClick={() => setSelectedItem(item)}
              >
                {/* Image Card Container with Defined Aspect Ratio */}
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-surface-hover/60 border border-border-subtle/30 transition-shadow duration-200 group-hover:border-border-strong/50"
                  style={{ aspectRatio: item.aspectRatio }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    priority={index < 3}
                    loading={index < 3 ? undefined : "lazy"}
                  />
                </div>

                {/* Microcopy & Hierarchy matching screenshots */}
                <div className="flex flex-col gap-0.5 pt-0.5">
                  <h3 className="font-sans font-regular text-xs sm:text-sm text-foreground tracking-tight group-hover:text-muted-foreground transition-colors">
                    {item.title}
                  </h3>
                  <p className="cd ">
                    {item.categoryLabel}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 4. Subtle, Lightweight Modal / Lightbox for viewing high-res assets */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center bg-background border border-border-subtle rounded-2xl overflow-hidden shadow-2xl p-3 sm:p-5"
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-border-subtle text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  {selectedItem.title}
                </span>
                <span className="text-muted-foreground">&bull;</span>
                <span className="text-muted-foreground">
                  {selectedItem.categoryLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close preview"
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors cursor-pointer"
              >
                <PhosphorIcons.XIcon size={18} />
              </button>
            </div>

            {/* Modal Image Display */}
            <div
              className="relative w-full max-h-[75vh] flex items-center justify-center my-3 overflow-hidden rounded-lg bg-surface-hover/40"
              style={{
                aspectRatio: selectedItem.aspectRatio,
                maxHeight: "75vh",
              }}
            >
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 90vw, 1000px"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

