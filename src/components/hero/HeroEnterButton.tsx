"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface HeroEnterButtonProps {
  className?: string;
  targetId?: string;
  audioSrc?: string;
}

/**
 * Realistic tactile mechanical switch click sound synthesized using Web Audio API.
 * Combines high-frequency click transient with low-frequency acoustic housing resonance.
 */
function playSyntheticClick() {
  if (typeof window === "undefined") return;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const t = ctx.currentTime;

    // 1. High-frequency click leaf snap (~2400Hz -> 600Hz in 12ms)
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "sine";
    clickOsc.frequency.setValueAtTime(2400, t);
    clickOsc.frequency.exponentialRampToValueAtTime(600, t + 0.012);
    clickGain.gain.setValueAtTime(0.3, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(t);
    clickOsc.stop(t + 0.018);

    // 2. Low-frequency housing thock resonance (~220Hz -> 90Hz in 35ms)
    const thockOsc = ctx.createOscillator();
    const thockGain = ctx.createGain();
    thockOsc.type = "triangle";
    thockOsc.frequency.setValueAtTime(220, t);
    thockOsc.frequency.exponentialRampToValueAtTime(90, t + 0.035);
    thockGain.gain.setValueAtTime(0.4, t);
    thockGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    thockOsc.connect(thockGain);
    thockGain.connect(ctx.destination);
    thockOsc.start(t);
    thockOsc.stop(t + 0.045);

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 120);
  } catch {
    // Audio playback fallback safely ignored if blocked by browser policy
  }
}

export function HeroEnterButton({
  className = "",
  targetId = "work",
  audioSrc,
}: HeroEnterButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const isAnimatingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = useCallback(() => {
    // Prevent overlapping click animations
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsPressed(true);

    // Play tactile sound
    if (audioSrc && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => playSyntheticClick());
    } else {
      playSyntheticClick();
    }

    // Scroll to Selected Work target
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", `#${targetId}`);
      }
    }

    // Spring release animation
    const timeout = setTimeout(() => {
      setIsPressed(false);
      isAnimatingRef.current = false;
    }, 220);

    return () => clearTimeout(timeout);
  }, [audioSrc, targetId, prefersReducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  // SVG dimensions for the classic ISO Enter Keycap
  // Total viewBox: 122 x 146
  // Top narrow column: x: 44 to 120, y: 0 to 76
  // Bottom wide bar: x: 0 to 120, y: 76 to 140
  const keycapPath =
    "M 58 0 L 106 0 A 14 14 0 0 1 120 14 L 120 126 A 14 14 0 0 1 106 140 L 14 140 A 14 14 0 0 1 0 126 L 0 90 A 14 14 0 0 1 14 76 L 36 76 A 8 8 0 0 0 44 68 L 44 14 A 14 14 0 0 1 58 0 Z";

  const keycapShadowPath =
    "M 58 6 L 106 6 A 14 14 0 0 1 120 20 L 120 132 A 14 14 0 0 1 106 146 L 14 146 A 14 14 0 0 1 0 132 L 0 96 A 14 14 0 0 1 14 82 L 36 82 A 8 8 0 0 0 44 74 L 44 20 A 14 14 0 0 1 58 6 Z";

  return (
    <div
      className={`relative inline-flex flex-col items-end select-none ${className}`}
      role="region"
      aria-label="Enter button navigation"
    >
      {/* Optional audio asset element */}
      {audioSrc && (
        <audio ref={audioRef} src={audioSrc} preload="auto" aria-hidden="true" />
      )}

      {/* Label above the button aligned with the upper section */}
      <span className="font-sans text-xs sm:text-sm text-foreground/80 pb-1.5 pr-6 tracking-normal select-none">
        think
      </span>

      {/* Interactive Keycap Trigger */}
      <motion.button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label="think outside the box — Enter to explore Selected Work"
        title="Explore Selected Work"
        tabIndex={0}
        className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-2xl"
        animate={
          prefersReducedMotion
            ? {}
            : isPressed
            ? { y: 4, scale: 0.985 }
            : { y: 0, scale: 1 }
        }
        whileHover={
          prefersReducedMotion || isPressed
            ? {}
            : { scale: 1.025, transition: { duration: 0.15 } }
        }
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        {/* ISO Keycap Container */}
        <div className="relative w-[112px] h-[134px] sm:w-[124px] sm:h-[148px]">
          {/* Keycap 3D Bevel/Shadow Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md"
            viewBox="0 0 120 146"
            fill="none"
            aria-hidden="true"
          >
            <path d={keycapShadowPath} fill="#c8c8cc" />
          </svg>

          {/* Keycap Face Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none transition-colors duration-150"
            viewBox="0 0 120 146"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={keycapPath}
              fill="#ffffff"
              stroke="#e4e4e8"
              strokeWidth="1.25"
              className="group-hover:fill-neutral-50"
            />
          </svg>

          {/* Keycap Content: "outside the box" & "Enter ↵" */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {/* Upper Section: "outside the box" positioned inside the top column */}
            <div className="w-[62%] self-end pt-3 sm:pt-4 pr-1 flex flex-col items-center justify-center font-mono text-[9px] sm:text-[10.5px] leading-tight text-neutral-400">
              <span>outside</span>
              <span>the box</span>
            </div>

            {/* Lower Section: "Enter ↵" centered horizontally on the lower bar */}
            <div className="w-full pb-3 sm:pb-4 pl-3.5 pr-2 flex items-center justify-center gap-1.5 text-neutral-900">
              <span className="font-sans font-bold text-base sm:text-[1.15rem] tracking-tight">
                Enter
              </span>
              {/* Return Arrow Icon */}
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current stroke-[2.2] transition-transform duration-150 group-hover:-translate-x-0.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7v6a2 2 0 0 1-2 2H5m0 0 4-4m-4 4 4 4"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
