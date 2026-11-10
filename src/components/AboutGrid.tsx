"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Image sets from aboutMe-Imagery folder (3 images per section)
const ME_IMAGES = [
  "/images/about/me/me-1.webp",
  "/images/about/me/me-2.webp",
  "/images/about/me/me-3.webp",
];

const ALBUM_IMAGES = [
  "/images/about/album/album-1.webp",
  "/images/about/album/album-2.webp",
  "/images/about/album/album-3.webp",
];

const SEE_IMAGES = [
  "/images/about/see/see-1.webp",
  "/images/about/see/see-2.webp",
  "/images/about/see/see-3.webp",
];

const FREN_IMAGES = [
  "/images/about/fren/fren-1.webp",
  "/images/about/fren/fren-2.webp",
  "/images/about/fren/fren-3.webp",
];

const QUOTE_IMAGES = [
  "/images/about/quote/quote-1.webp",
  "/images/about/quote/quote-2.webp",
  "/images/about/quote/quote-3.webp",
];

interface ImageCellProps {
  images: string[];
  alt: string;
  priority?: boolean;
}

function ImageCell({ images, alt, priority = false }: ImageCellProps) {
  const [index, setIndex] = useState(0);

  // Click / tap to advance image
  const handleAdvance = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  // Gentle auto-rotation every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div
      onClick={handleAdvance}
      className="relative aspect-square w-full h-full overflow-hidden bg-surface cursor-pointer group select-none"
      title="Click to advance image"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleAdvance();
        }
      }}
      aria-label={`${alt} - Click to cycle (${index + 1}/${images.length})`}
    >
      {images.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            idx === index ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
          }`}
        >
          <Image
            src={src}
            alt={`${alt} ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 320px"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
            priority={priority && idx === 0}
          />
        </div>
      ))}

      {/* Subtle indicator dots on hover */}
      <div className="absolute bottom-2 right-2 z-20 flex gap-1 opacity-0 group-hover:opacity-80 transition-opacity bg-background/60 backdrop-blur-xs px-1.5 py-0.5 rounded-full">
        {images.map((_, dotIdx) => (
          <span
            key={dotIdx}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              dotIdx === index ? "bg-foreground" : "bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function AboutGrid() {
  return (
    <div className="w-full flex flex-col text-foreground select-none">
      {/* 1. Header & Lead-in Paragraph matching screenshots exactly */}
      <section className="flex flex-col gap-3 max-w-2xl sm:max-w-3xl pb-8 sm:pb-12">
        <h1 className="font-mono text-sm sm:text-base text-foreground font-medium tracking-tight">
          /aboutMe
        </h1>
        <div className="flex flex-col gap-3 font-sans text-xs sm:text-sm text-foreground/90 leading-relaxed">
          <p>
            I&apos;m an engineer turned designer. My curiosity about design started during my
            engineering days, where I found myself drawn to the intersection of design and logic.
            From I2IT (PPCRC) to freelancing, early-stage startups, and Plix, I&apos;ve been
            exploring that intersection ever since.
          </p>
          <p>
            Looking ahead, I want to work with teams tackling genuinely complex problems, with a few
            crack designers in the room.
          </p>
        </div>
      </section>

      {/* 2. 4x5 Editorial Grid with Crisp Single 1px Grid Lines */}
      <section className="w-full border border-border-subtle bg-border-subtle grid grid-cols-2 lg:grid-cols-4 gap-[1px]">
        {/* =================================================================== */}
        {/* ROW 1: WHO (1) | ME (2) | Empty (3) | LISTENING (4)                */}
        {/* =================================================================== */}

        {/* 1. WHO */}
        <div className="aspect-square bg-background p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
          <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-foreground">
            WHO
          </span>
          <p className="font-sans text-xs sm:text-sm text-foreground leading-snug">
            Oh,
            <br />
            hey, I&apos;m Shravani.
          </p>
        </div>

        {/* 2. ME (Images) */}
        <ImageCell images={ME_IMAGES} alt="Shravani Sutar portrait" priority />

        {/* 3. Empty Spacer (Row 1, Col 3 on desktop) */}
        <div className="hidden lg:flex aspect-square bg-background" aria-hidden="true" />

        {/* 4. LISTENING */}
        <div className="aspect-square bg-background p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
          <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-foreground">
            LISTENING
          </span>
          <p className="font-sans text-xs sm:text-sm text-foreground leading-snug">
            Always humming something.
          </p>
        </div>

        {/* =================================================================== */}
        {/* ROW 2: Empty (5) | Empty (6) | Empty (7) | ALBUM (8)                */}
        {/* =================================================================== */}

        {/* 5, 6, 7. Empty Spacers (Row 2, Cols 1-3 on desktop) */}
        <div className="hidden lg:flex aspect-square bg-background" aria-hidden="true" />
        <div className="hidden lg:flex aspect-square bg-background" aria-hidden="true" />
        <div className="hidden lg:flex aspect-square bg-background" aria-hidden="true" />

        {/* 8. ALBUM (Images) */}
        <ImageCell images={ALBUM_IMAGES} alt="Album artwork" priority />

        {/* =================================================================== */}
        {/* ROW 3: CREATE (9) | SEE (10) | Empty (11) | WITH (12)               */}
        {/* =================================================================== */}

        {/* 9. CREATE */}
        <div className="aspect-square bg-background p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
          <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-foreground">
            CREATE
          </span>
          <p className="font-sans text-xs sm:text-sm text-foreground leading-snug">
            Beyond work, I find myself exploring all kinds of creative corners.
          </p>
        </div>

        {/* 10. SEE (Images) */}
        <ImageCell images={SEE_IMAGES} alt="Creative explorations" />

        {/* 11. Empty Spacer (Row 3, Col 3 on desktop) */}
        <div className="hidden lg:flex aspect-square bg-background" aria-hidden="true" />

        {/* 12. WITH */}
        <div className="aspect-square bg-background p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
          <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-foreground">
            WITH
          </span>
          <p className="font-sans text-xs sm:text-sm text-foreground leading-snug">
            Always surrounded by incredibly creative friends.
          </p>
        </div>

        {/* =================================================================== */}
        {/* ROW 4: Empty (13) | Empty (14) | FREN (15) | Empty (16)             */}
        {/* =================================================================== */}

        {/* 13, 14. Empty Spacers (Row 4, Cols 1-2 on desktop) */}
        <div className="hidden lg:flex aspect-square bg-background" aria-hidden="true" />
        <div className="hidden lg:flex aspect-square bg-background" aria-hidden="true" />

        {/* 15. FREN (Images) */}
        <ImageCell images={FREN_IMAGES} alt="Creative friends" />

        {/* 16. Empty Spacer (Row 4, Col 4 on desktop) */}
        <div className="hidden lg:flex aspect-square bg-background" aria-hidden="true" />

        {/* =================================================================== */}
        {/* ROW 5: QUOTE (17) | Empty (18) | CONTACT (19) | Empty (20)          */}
        {/* =================================================================== */}

        {/* 17. QUOTE (Images) */}
        <ImageCell images={QUOTE_IMAGES} alt="Quote inspiration" />

        {/* 18. Empty Spacer (Row 5, Col 2 on desktop) */}
        <div className="hidden lg:flex aspect-square bg-background" aria-hidden="true" />

        {/* 19. CONTACT */}
        <div className="aspect-square bg-background p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
          <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-foreground">
            CONTACT
          </span>
          <div className="flex flex-col gap-1 text-xs sm:text-sm font-sans">
            <a
              href="https://www.linkedin.com/in/shravanisutar"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1 group w-fit"
            >
              <span>LinkedIn</span>
              <span className="text-subtle-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </a>
            <a
              href="mailto:digital.shravanisutar@gmail.com"
              className="text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1 group w-fit"
            >
              <span>Email</span>
              <span className="text-subtle-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </a>
            <a
              href="https://substack.com/@sreedotee"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1 group w-fit"
            >
              <span>Substack</span>
              <span className="text-subtle-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </a>
            <a
              href="https://www.instagram.com/designft.shrav?mdxt=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1 group w-fit"
            >
              <span>Instagram</span>
              <span className="text-subtle-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* 20. Empty Spacer (Row 5, Col 4 on desktop) */}
        <div className="hidden lg:flex aspect-square bg-background" aria-hidden="true" />
      </section>
    </div>
  );
}
