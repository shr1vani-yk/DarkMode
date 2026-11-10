"use client";
import * as PhosphorIcons from "@phosphor-icons/react";
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
  className?: string;
}

function ImageCell({ images, alt, priority = false, className = "" }: ImageCellProps) {
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
      className={`relative aspect-square w-full h-full overflow-hidden bg-surface cursor-pointer group select-none ${className}`}
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
        <h1 className="font-mono text-sm sm:text-base text-foreground font-regular tracking-tight ">
          /aboutMe <span> <PhosphorIcons.LegoIcon size={24} /> </span>
          
        </h1>
        <div className="flex flex-col gap-3 font-sans text-xs sm:text-sm text-foreground/90 leading-relaxed">
          <p>
            I&apos;m an engineer turned designer. My curiosity about design started during my engineering days, where I found myself drawn to the intersection of design and logic.
            From I2IT (PPCRC) to freelancing, early-stage startups, and Plix, I&apos;ve been
            exploring that intersection ever since.
          </p>
          <p>
            Looking ahead, I want to work with teams tackling genuinely complex problems, with a few
            crack designers in the room.
          </p>
        </div>
      </section>

      {/* 2. Editorial Grid:
          - Desktop (lg:): 4x5 grid matching screenshots exactly with negative-space cells.
          - Tablet & Mobile (< lg): 2-column layout alternating image positions (Right -> Left -> Right -> Left -> Right)
            to preserve the Sree Designs staggered zigzag rhythm. */}
      <section className="w-full border border-border-subtle bg-border-subtle grid grid-cols-2 lg:grid-cols-4 gap-[1px]">
        {/* =================================================================== */}
        {/* ROW 1: WHO (Text) | ME (Image)                                      */}
        {/* Desktop: Row 1, Cols 1-2 | Mobile: Row 1, Cols 1-2 (Image on Right) */}
        {/* =================================================================== */}

        {/* 1. WHO */}
        <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1 aspect-square bg-background p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
          <span className="font-pixel text-[11px] sm:text-xs font-regular uppercase tracking-wider text-foreground/80">
            WHO
          </span>
          <p className="font-sans text-xs sm:text-sm text-foreground leading-snug">
            Oh,
            <br />
            hey, I&apos;m Shravani.
          </p>
        </div>

        {/* 2. ME (Image - Right on mobile) */}
        <ImageCell
          images={ME_IMAGES}
          alt="Shravani Sutar portrait"
          priority
          className="order-2 lg:order-none lg:col-start-2 lg:row-start-1"
        />

        {/* 3. Spacer (Desktop: Row 1, Col 3) */}
        <div
          className="hidden lg:flex lg:col-start-3 lg:row-start-1 aspect-square bg-background"
          aria-hidden="true"
        />

        {/* 4. LISTENING */}
        <div className="order-4 lg:order-none lg:col-start-4 lg:row-start-1 aspect-square bg-background p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
          <span className="font-pixel text-[11px] sm:text-xs font-regular uppercase tracking-wider text-foreground/80">
            LISTENING
          </span>
          <p className="font-sans text-xs sm:text-sm text-foreground leading-snug">
            Always humming something.
          </p>
        </div>

        {/* =================================================================== */}
        {/* ROW 2: ALBUM (Image) | Empty Spacers                                */}
        {/* Desktop: Row 2, Col 4 | Mobile: Row 2, Col 1 (Image on Left)        */}
        {/* =================================================================== */}

        {/* 5, 6, 7. Spacers (Desktop: Row 2, Cols 1-3) */}
        <div
          className="hidden lg:flex lg:col-start-1 lg:row-start-2 aspect-square bg-background"
          aria-hidden="true"
        />
        <div
          className="hidden lg:flex lg:col-start-2 lg:row-start-2 aspect-square bg-background"
          aria-hidden="true"
        />
        <div
          className="hidden lg:flex lg:col-start-3 lg:row-start-2 aspect-square bg-background"
          aria-hidden="true"
        />

        {/* 8. ALBUM (Image - Left on mobile, creating the zigzag!) */}
        <ImageCell
          images={ALBUM_IMAGES}
          alt="Album artwork"
          priority
          className="order-3 lg:order-none lg:col-start-4 lg:row-start-2"
        />

        {/* =================================================================== */}
        {/* ROW 3: CREATE (Text) | SEE (Image) | WITH (Text)                   */}
        {/* Desktop: Row 3, Cols 1, 2, 4 | Mobile: Row 3 (Image on Right)       */}
        {/* =================================================================== */}

        {/* 9. CREATE */}
        <div className="order-5 lg:order-none lg:col-start-1 lg:row-start-3 aspect-square bg-background p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
          <span className="font-pixel text-[11px] sm:text-xs font-regular uppercase tracking-wider text-foreground/80">
            CREATE
          </span>
          <p className="font-sans text-xs sm:text-sm text-foreground leading-snug">
            Beyond work, I find myself exploring all kinds of creative corners.
          </p>
        </div>

        {/* 10. SEE (Image - Right on mobile) */}
        <ImageCell
          images={SEE_IMAGES}
          alt="Creative explorations"
          className="order-6 lg:order-none lg:col-start-2 lg:row-start-3"
        />

        {/* 11. Spacer (Desktop: Row 3, Col 3) */}
        <div
          className="hidden lg:flex lg:col-start-3 lg:row-start-3 aspect-square bg-background"
          aria-hidden="true"
        />

        {/* 12. WITH */}
        <div className="order-8 lg:order-none lg:col-start-4 lg:row-start-3 aspect-square bg-background p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
          <span className="font-pixel text-[11px] sm:text-xs font-regular uppercase tracking-wider text-foreground/80">
            WITH
          </span>
          <p className="font-sans text-xs sm:text-sm text-foreground leading-snug">
            Always surrounded by incredibly creative friends.
          </p>
        </div>

        {/* =================================================================== */}
        {/* ROW 4: FREN (Image) | Empty Spacers                                 */}
        {/* Desktop: Row 4, Col 3 | Mobile: Row 4, Col 1 (Image on Left)        */}
        {/* =================================================================== */}

        {/* 13, 14. Spacers (Desktop: Row 4, Cols 1-2) */}
        <div
          className="hidden lg:flex lg:col-start-1 lg:row-start-4 aspect-square bg-background"
          aria-hidden="true"
        />
        <div
          className="hidden lg:flex lg:col-start-2 lg:row-start-4 aspect-square bg-background"
          aria-hidden="true"
        />

        {/* 15. FREN (Image - Left on mobile, continuing zigzag!) */}
        <ImageCell
          images={FREN_IMAGES}
          alt="Creative friends"
          className="order-7 lg:order-none lg:col-start-3 lg:row-start-4"
        />

        {/* 16. Spacer (Desktop: Row 4, Col 4) */}
        <div
          className="hidden lg:flex lg:col-start-4 lg:row-start-4 aspect-square bg-background"
          aria-hidden="true"
        />

        {/* =================================================================== */}
        {/* ROW 5: QUOTE (Image) | CONTACT (Text)                               */}
        {/* Desktop: Row 5, Cols 1, 3 | Mobile: Row 5 (Image on Right)          */}
        {/* =================================================================== */}

        {/* 17. QUOTE (Image - Right on mobile, desktop: Row 5, Col 1) */}
        <ImageCell
          images={QUOTE_IMAGES}
          alt="Quote inspiration"
          className="order-10 lg:order-none lg:col-start-1 lg:row-start-5"
        />

        {/* 18. Spacer (Desktop: Row 5, Col 2) */}
        <div
          className="hidden lg:flex lg:col-start-2 lg:row-start-5 aspect-square bg-background"
          aria-hidden="true"
        />

        {/* 19. CONTACT */}
        <div className="order-9 lg:order-none lg:col-start-3 lg:row-start-5 aspect-square bg-background p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
          <span className="font-pixel text-[11px] sm:text-xs font-regular uppercase tracking-wider text-foreground/80">
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
              <PhosphorIcons.ArrowUpRightIcon size={14} />
              </span>
            </a>
            

            <a
              href="mailto:digital.shravanisutar@gmail.com"
              className="text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1 group w-fit"
            >
              <span>Email</span>
              <span className="text-subtle-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <PhosphorIcons.ArrowUpRightIcon size={14} />
              </span>
            </a>
            <a
              href="https://substack.com/@shr1vani"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1 group w-fit"
            >
              <span>Substack</span>
              <span className="text-subtle-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <PhosphorIcons.ArrowUpRightIcon size={14} />
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
              <PhosphorIcons.ArrowUpRightIcon size={14} />
              </span>
            </a>
          </div>
        </div>

        {/* 20. Spacer (Desktop: Row 5, Col 4) */}
        <div
          className="hidden lg:flex lg:col-start-4 lg:row-start-5 aspect-square bg-background"
          aria-hidden="true"
        />
      </section>
    </div>
  );
}
