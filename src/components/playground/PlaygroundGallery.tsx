"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import * as PhosphorIcons from "@phosphor-icons/react";
import {
  PLAYGROUND_FILTERS,
  PLAYGROUND_ITEMS,
  PlaygroundFilterId,
  PlaygroundItem,
} from "@/data/playground";

interface PlaygroundVideoCardProps {
  src: string;
  poster?: string;
  title: string;
}

function PlaygroundVideoCard({
  src,
  poster,
  title,
}: PlaygroundVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // IntersectionObserver: Only allow playback when within or close to viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: "50px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Manage playback:
  // On desktop: plays on hover when in view.
  // On touch/mobile: plays when in view.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isInView) {
      video.pause();
      return;
    }

    const isTouchDevice =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;

    if (isHovered || isTouchDevice) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented by browser policy
        });
      }
    } else {
      video.pause();
    }
  }, [isInView, isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={title}
        className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.02]"
      />
    </div>
  );
}

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

  // Curated sequence for the Pinterest-style "ALL" masonry grid to balance category mix,
  // column heights, and orientation variation across Desktop (3 cols), Tablet (2 cols), and Mobile (1 col).
  const allMixedItems = useMemo(() => {
    const CURATED_ALL_ORDER = [
      // Column 1 track (Desktop): Interface -> 3D -> Interface -> Visuals
      "ai-assisted-album",
      "low-poly-well",
      "story-preview-redesign",
      "portrait-practice",
      "typography-style",
      "subject-priority-space",

      // Column 2 track (Desktop): Visual -> Interface Video -> Visual -> Interface -> Visual
      "music-album-exploration",
      "card-prototype",
      "sketch",
      "search-experience",
      "dithered-effect",

      // Column 3 track (Desktop): 3D -> Interface -> 3D -> Visuals
      "topology-texture",
      "sign-up-card-prototype",
      "low-poly-sushi",
      "typography-hero-image",
      "subject-priority-red",
    ];

    const itemMap = new Map(PLAYGROUND_ITEMS.map((item) => [item.id, item]));
    const ordered: PlaygroundItem[] = [];

    for (const id of CURATED_ALL_ORDER) {
      const item = itemMap.get(id);
      if (item) {
        ordered.push(item);
        itemMap.delete(id);
      }
    }

    // Append any extra or future items not explicitly in the curated list
    for (const remaining of itemMap.values()) {
      ordered.push(remaining);
    }

    return ordered;
  }, []);

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
      ) : activeFilter === "all" ? (
        /* Pinterest-Style Masonry Mixed Grid for "ALL" filter */
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-7 w-full [column-fill:_balance]">
          {allMixedItems.map((item, index) => (
            <article
              key={item.id}
              className="break-inside-avoid inline-block w-full mb-6 sm:mb-8 group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="flex flex-col gap-2 w-full">
                {/* Image or Video Card Container with Defined Aspect Ratio */}
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-surface-hover/60 border border-border-subtle/30 transition-shadow duration-200 group-hover:border-border-strong/50"
                  style={{ aspectRatio: item.aspectRatio }}
                >
                  {item.mediaType === "video" && item.video ? (
                    <PlaygroundVideoCard
                      src={item.video}
                      poster={item.poster || item.image}
                      title={item.title}
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover ${
                        item.id === "story-preview-redesign" ? "object-top" : ""
                      } w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.02]`}
                      priority={index < 3}
                      loading={index < 3 ? undefined : "lazy"}
                    />
                  )}
                </div>

                {/* Microcopy & Hierarchy */}
                <div className="flex flex-col gap-0.5 pt-0.5">
                  <h3 className="font-sans font-regular text-xs sm:text-sm text-foreground tracking-tight transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans font-light text-xs sm:text-sm text-subtle-foreground">
                    {item.categoryLabel}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : activeFilter === "interface" ? (
        /* Category-specific Layout for Interfaces matching Figma Reference */
        <div className="w-full max-w-4xl xl:max-w-[920px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-7 sm:gap-y-9">
          {/* Row 1: The first three project cards in a 3-column grid */}
          {filteredItems.slice(0, 3).map((item, index) => (
            <article
              key={item.id}
              className="group flex flex-col gap-2 cursor-pointer col-span-1"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image or Video Card Container with Defined Aspect Ratio */}
              <div
                className="relative w-full overflow-hidden rounded-xl bg-surface-hover/60 border border-border-subtle/30 transition-shadow duration-200 group-hover:border-border-strong/50"
                style={{ aspectRatio: item.aspectRatio }}
              >
                {item.mediaType === "video" && item.video ? (
                  <PlaygroundVideoCard
                    src={item.video}
                    poster={item.poster || item.image}
                    title={item.title}
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    priority={index < 3}
                    loading={index < 3 ? undefined : "lazy"}
                  />
                )}
              </div>

              {/* Microcopy & Hierarchy */}
              <div className="flex flex-col gap-0.5 pt-0.5">
                <h3 className="font-sans font-regular text-xs sm:text-sm text-foreground tracking-tight transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans font-light text-xs sm:text-sm text-subtle-foreground">
                  {item.categoryLabel}
                </p>
              </div>
            </article>
          ))}

          {/* Row 2: The fourth project on the next row, aligned left and spanning approximately 2 column widths */}
          {filteredItems[3] && (
            <article
              key={filteredItems[3].id}
              className="group flex flex-col gap-2 cursor-pointer col-span-1 sm:col-span-2 lg:col-span-2"
              onClick={() => setSelectedItem(filteredItems[3])}
            >
              {/* Image Card Container with Defined Aspect Ratio */}
              <div
                className="relative w-full overflow-hidden rounded-xl bg-surface-hover/60 border border-border-subtle/30 transition-shadow duration-200 group-hover:border-border-strong/50"
                style={{ aspectRatio: filteredItems[3].aspectRatio }}
              >
                <Image
                  src={filteredItems[3].image}
                  alt={filteredItems[3].title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-top w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>

              {/* Microcopy & Hierarchy */}
              <div className="flex flex-col gap-0.5 pt-0.5">
                <h3 className="font-sans font-regular text-xs sm:text-sm text-foreground tracking-tight transition-colors">
                  {filteredItems[3].title}
                </h3>
                <p className="font-sans font-light text-xs sm:text-sm text-subtle-foreground">
                  {filteredItems[3].categoryLabel}
                </p>
              </div>
            </article>
          )}

          {/* Row 2 (Column 3): The fifth project in the 3rd column */}
          {filteredItems[4] && (
            <article
              key={filteredItems[4].id}
              className="group flex flex-col gap-2 cursor-pointer col-span-1"
              onClick={() => setSelectedItem(filteredItems[4])}
            >
              {/* Image or Video Card Container with Defined Aspect Ratio */}
              <div
                className="relative w-full overflow-hidden rounded-xl bg-surface-hover/60 border border-border-subtle/30 transition-shadow duration-200 group-hover:border-border-strong/50"
                style={{ aspectRatio: filteredItems[4].aspectRatio }}
              >
                {filteredItems[4].mediaType === "video" && filteredItems[4].video ? (
                  <PlaygroundVideoCard
                    src={filteredItems[4].video}
                    poster={filteredItems[4].poster || filteredItems[4].image}
                    title={filteredItems[4].title}
                  />
                ) : (
                  <Image
                    src={filteredItems[4].image}
                    alt={filteredItems[4].title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Microcopy & Hierarchy */}
              <div className="flex flex-col gap-0.5 pt-0.5">
                <h3 className="font-sans font-regular text-xs sm:text-sm text-foreground tracking-tight transition-colors">
                  {filteredItems[4].title}
                </h3>
                <p className="font-sans font-light text-xs sm:text-sm text-subtle-foreground">
                  {filteredItems[4].categoryLabel}
                </p>
              </div>
            </article>
          )}
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
                {/* Image or Video Card Container with Defined Aspect Ratio */}
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-surface-hover/60 border border-border-subtle/30 transition-shadow duration-200 group-hover:border-border-strong/50"
                  style={{ aspectRatio: item.aspectRatio }}
                >
                  {item.mediaType === "video" && item.video ? (
                    <PlaygroundVideoCard
                      src={item.video}
                      poster={item.poster || item.image}
                      title={item.title}
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover ${
                        item.id === "story-preview-redesign" ? "object-top" : ""
                      } w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.02]`}
                      priority={index < 3}
                      loading={index < 3 ? undefined : "lazy"}
                    />
                  )}
                </div>

                {/* Microcopy & Hierarchy matching screenshots */}
                <div className="flex flex-col gap-0.5 pt-0.5">
                  <h3 className="font-sans font-regular text-xs sm:text-sm text-foreground tracking-tight  transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans font-light text-xs sm:text-sm text-subtle-foreground">
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

            {/* Modal Media Display */}
            <div
              className="relative w-full max-h-[75vh] flex items-center justify-center my-3 overflow-hidden rounded-lg bg-surface-hover/40"
              style={{
                aspectRatio: selectedItem.aspectRatio,
                maxHeight: "75vh",
              }}
            >
              {selectedItem.mediaType === "video" && selectedItem.video ? (
                <video
                  src={selectedItem.video}
                  poster={selectedItem.poster || selectedItem.image}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="max-h-[75vh] w-auto h-auto object-contain rounded-lg"
                />
              ) : (
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 90vw, 1000px"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

