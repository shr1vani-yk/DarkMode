"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "@/context/ThemeContext";

export interface HeroEnterButtonProps {
  className?: string;
  targetId?: string;
  audioSrc?: string;
  onVoiceClick?: () => void;
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
  audioSrc = "/hero-assets/voice-interaction.mp3",
  onVoiceClick,
}: HeroEnterButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const isAnimatingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleClick = useCallback(() => {
    // Prevent overlapping click animations
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsPressed(true);

    // 1. Play voice interaction audio (with fallback to synthetic mechanical click)
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => playSyntheticClick());
    } else {
      playSyntheticClick();
    }

    // 2. Pluggable voice interaction handler callback
    if (onVoiceClick) {
      try {
        onVoiceClick();
      } catch {
        // Safe guard for custom handler
      }
    }

    // 3. Smooth scroll to Selected Work target
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
  }, [targetId, onVoiceClick, prefersReducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`relative inline-flex flex-col items-end select-none ${className}`}
      role="region"
      aria-label="Enter button navigation"
    >
      {/* Audio asset element for voice interaction */}
      {audioSrc && (
        <audio ref={audioRef} src={audioSrc} preload="auto" aria-hidden="true" />
      )}

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
            ? {
                y: 4,
                scale: 0.975,
                filter: isDark
                  ? "brightness(0.92) contrast(1.05)"
                  : "brightness(1.15) contrast(1.05)",
              }
            : { y: 0, scale: 1, filter: "brightness(1) contrast(1)" }
        }
        whileHover={
          prefersReducedMotion || isPressed
            ? {}
            : {
                scale: 1.025,
                filter: isDark
                  ? "brightness(0.96) contrast(1.03)"
                  : "brightness(1.08) contrast(1.03)",
                transition: { duration: 0.15 },
              }
        }
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        {/* Responsive Keycap Artwork Frame preserving exact 180x210 aspect ratio */}
        <div className="relative w-[138px] sm:w-[165px] md:w-[200px] xl:w-[165px] 2xl:w-[175px] aspect-[180/210] flex items-center justify-center">
          {/* Dark Mode Keycap Artwork (Image 1) */}
          <div className="w-full h-full hidden dark:block">
            <Image
              src="/hero-assets/enter-dark.svg"
              alt="think outside the box — Enter"
              width={180}
              height={210}
              priority
              className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-md"
              draggable={false}
            />
          </div>

          {/* Light Mode Keycap Artwork (Image 2) */}
          <div className="w-full h-full block dark:hidden">
            <Image
              src="/hero-assets/enter-light.svg"
              alt="think outside the box — Enter"
              width={180}
              height={210}
              priority
              className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-md"
              draggable={false}
            />
          </div>
        </div>
      </motion.button>
    </div>
  );
}

export default HeroEnterButton;
