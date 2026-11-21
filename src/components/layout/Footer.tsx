"use client";

import { useState, useRef, useCallback } from "react";
import * as PhosphorIcons from "@phosphor-icons/react";

interface FooterProps {
  backToTopHref?: string;
  className?: string;
}


/**
 * Stepped pixel topography inspired by hammadjavaid.com/playground
 * Features layered orthogonal contour steps in soft lavender / violet tints.
 */
function PixelTopography({ mouseOffset }: { mouseOffset: { x: number; y: number } }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none transition-transform duration-500 ease-out"
      style={{
        transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 380"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="pixelFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7C5CE9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7C5CE9" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* 1. Main Central Stepped Island (Layer 1: Outer soft contour) */}
        <path
          d="
            M 520 40 
            H 600 V 65 
            H 630 V 90 
            H 660 V 130 
            H 650 V 175 
            H 630 V 210 
            H 615 V 245 
            H 590 V 280 
            H 550 V 290 
            H 515 V 265 
            H 495 V 225 
            H 475 V 170 
            H 485 V 115 
            H 510 V 75 
            H 520 Z
          "
          className="fill-[#7C5CE9]/[0.08] dark:fill-[#A78BFA]/[0.09]"
        />

        {/* 1. Main Central Stepped Island (Layer 2: Middle elevation) */}
        <path
          d="
            M 535 75 
            H 585 V 100 
            H 615 V 130 
            H 605 V 170 
            H 585 V 210 
            H 560 V 235 
            H 530 V 220 
            H 510 V 175 
            H 520 V 125 
            H 535 Z
          "
          className="fill-[#7C5CE9]/[0.14] dark:fill-[#A78BFA]/[0.15]"
        />

        {/* 1. Main Central Stepped Island (Layer 3: Inner core nucleus) */}
        <path
          d="
            M 545 110 
            H 575 V 135 
            H 565 V 165 
            H 540 V 150 
            H 530 V 125 
            H 545 Z
          "
          className="fill-[#7C5CE9]/[0.22] dark:fill-[#A78BFA]/[0.22]"
        />

        {/* 2. Top-Center Stepped Satellite Nub */}
        <path
          d="M 575 35 H 615 V 55 H 600 V 70 H 580 V 55 H 575 Z"
          className="fill-[#7C5CE9]/[0.10] dark:fill-[#A78BFA]/[0.11]"
        />
        <rect
          x="585"
          y="42"
          width="18"
          height="14"
          className="fill-[#7C5CE9]/[0.18] dark:fill-[#A78BFA]/[0.18]"
        />

        {/* 3. Right Stepped Island (Behind / around Navigation) */}
        <path
          d="
            M 780 65 
            H 835 V 85 
            H 865 V 125 
            H 885 V 180 
            H 865 V 225 
            H 830 V 245 
            H 790 V 225 
            H 765 V 175 
            H 755 V 115 
            H 780 Z
          "
          className="fill-[#7C5CE9]/[0.08] dark:fill-[#A78BFA]/[0.09]"
        />
        <path
          d="
            M 800 95 
            H 840 V 125 
            H 850 V 160 
            H 830 V 195 
            H 800 V 180 
            H 780 V 135 
            H 800 Z
          "
          className="fill-[#7C5CE9]/[0.13] dark:fill-[#A78BFA]/[0.14]"
        />
        <rect
          x="810"
          y="120"
          width="24"
          height="28"
          className="fill-[#7C5CE9]/[0.20] dark:fill-[#A78BFA]/[0.20]"
        />

        {/* 4. Scattered Floating Pixel Voxel Blocks matching the reference */}
        {/* Floating Block 1 (Top Left) */}
        <rect
          x="235"
          y="22"
          width="36"
          height="14"
          className="fill-[#7C5CE9]/[0.11] dark:fill-[#A78BFA]/[0.12]"
        />

        {/* Floating Block 2 (Far Left Edge) */}
        <path
          d="M 0 115 H 24 V 140 H 0 Z"
          className="fill-[#7C5CE9]/[0.11] dark:fill-[#A78BFA]/[0.12]"
        />

        {/* Floating Block 3 (Bottom Left stepped clouds) */}
        <path
          d="M 85 260 H 135 V 285 H 95 V 275 H 85 Z"
          className="fill-[#7C5CE9]/[0.11] dark:fill-[#A78BFA]/[0.12]"
        />
        <rect
          x="100"
          y="245"
          width="30"
          height="16"
          className="fill-[#7C5CE9]/[0.16] dark:fill-[#A78BFA]/[0.16]"
        />

        {/* Floating Block 4 (Center Bottom float) */}
        <rect
          x="680"
          y="280"
          width="38"
          height="14"
          className="fill-[#7C5CE9]/[0.12] dark:fill-[#A78BFA]/[0.12]"
        />

        {/* Floating Block 5 (Right Bottom horizontal bar) */}
        <rect
          x="755"
          y="265"
          width="54"
          height="16"
          className="fill-[#7C5CE9]/[0.10] dark:fill-[#A78BFA]/[0.11]"
        />
        <rect
          x="770"
          y="270"
          width="24"
          height="8"
          className="fill-[#7C5CE9]/[0.18] dark:fill-[#A78BFA]/[0.18]"
        />
      </svg>
    </div>
  );
}

export function Footer({
  backToTopHref = "#",
  className = "",
}: FooterProps) {
  const [copied, setCopied] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLElement>(null);

  // Smooth mouse parallax for background pixel terrain
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({
      x: Math.round(relX * -12),
      y: Math.round(relY * -8),
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  const handleCopyEmail = useCallback(async () => {
    const email = "digital.shravanisutar@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative pt-16 sm:pt-24 pb-12 sm:pb-16 border-t border-border-subtle overflow-hidden flex flex-col gap-12 sm:gap-16 ${className}`}
    >
      {/* Playful Pixel-Art Stepped Topography Decorations (Background) */}
      <PixelTopography mouseOffset={mouseOffset} />

      {/* Main Spacious Editorial Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        {/* Left Column: Primary Invitation & Interactive Email Pill */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">
          <h2 className="text-2xl sm:text-xl md:text-xl lg:text-[2.25rem] font-sans font-regular tracking-tight text-foreground leading-[1.12]">
            Let&apos;s build<br /> something together.
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-lg">
            Open to full-time product design roles . If you&apos;re building something interesting, say hello.{" "}
            <span className="italic opacity-85">(I reply fast)</span>
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 py-2 sm:py-2.5 rounded-full border border-border-subtle bg-surface/90 backdrop-blur-xs hover:border-border-strong/50 transition-all duration-200 shadow-2xs group w-fit">
              <a
                href="mailto:digital.shravanisutar@gmail.com"
                className="text-xs sm:text-sm font-sans text-foreground hover:text-muted-foreground transition-colors font-light select-all"
              >
                digital.shravanisutar@gmail.com
              </a>
              <span
                className="text-border-subtle/80 select-none text-xs"
                aria-hidden="true"
              >
                |
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-xs font-sans lowercase tracking-wider text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 active:scale-95"
                aria-label="Copy email address to clipboard"
              >
                {copied ? (
                  <>
                    <PhosphorIcons.CheckIcon
                      size={12}
                      weight="bold"
                      className="text-accent"
                    />
                    <span className="text-accent font-medium">copied!</span>
                  </>
                ) : (
                  <span>copy</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Navigation Links + Top-Right Pixel Glyph + Mascot */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-between sm:items-start lg:items-end gap-8 relative">  
          {/* Interactive Pixel Mascot sitting gracefully near bottom-right */}
          {/* <div className="hidden md:flex lg:pt-2">
            <PixelMascot />
          </div> */}
        </div>
      </div>

      {/* Bottom Colophon: Portfolio Tag & Back to Top Navigation */}
      <div className="relative z-10 pt-6 sm:pt-8 border-t border-border-subtle/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-subtle-foreground">
        <div>
          <span>Shravani Sutar Portfolio</span>
          <span className="mx-2">&bull;</span>
          <span>2026</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={backToTopHref}
            className="hover:text-foreground transition-colors inline-flex items-center gap-1 group"
          >
            <span>Back to top</span>
            <span
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5"
            >
              &uarr;
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
