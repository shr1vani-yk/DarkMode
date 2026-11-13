"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface MorphingTextProps {
  className?: string;
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  textClassName?: string;
}

export const useMorphingText = (
  texts: string[],
  morphTime = 1.25,
  cooldownTime = 1.25
) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(cooldownTime);
  const timeRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      if (containerRef.current) {
        containerRef.current.style.filter = "url(#threshold) blur(0.6px)";
      }

      const safeFraction = Math.max(Math.min(fraction, 1), 0.001);
      const safeInverted = Math.max(Math.min(1 - fraction, 1), 0.001);

      current2.style.filter = `blur(${Math.min(8 / safeFraction - 8, 100)}px)`;
      current2.style.opacity = `${Math.pow(safeFraction, 0.4) * 100}%`;

      current1.style.filter = `blur(${Math.min(8 / safeInverted - 8, 100)}px)`;
      current1.style.opacity = `${Math.pow(safeInverted, 0.4) * 100}%`;

      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts]
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current = (textIndexRef.current + 1) % texts.length;
    }
  }, [setStyles, morphTime, cooldownTime, texts.length]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    if (containerRef.current) {
      containerRef.current.style.filter = "none";
    }
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (containerRef.current) {
      containerRef.current.style.filter = "none";
    }

    // Prefers-reduced-motion check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      if (text1Ref.current) {
        text1Ref.current.textContent = texts[0];
        text1Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "none";
      }
      if (text2Ref.current) {
        text2Ref.current.textContent = "";
        text2Ref.current.style.opacity = "0%";
        text2Ref.current.style.filter = "none";
      }
      return;
    }

    // Set initial text
    if (text1Ref.current) {
      text1Ref.current.textContent = texts[0];
      text1Ref.current.style.opacity = "100%";
      text1Ref.current.style.filter = "none";
    }
    if (text2Ref.current) {
      text2Ref.current.textContent = texts[1 % texts.length];
      text2Ref.current.style.opacity = "0%";
      text2Ref.current.style.filter = "none";
    }

    let animationFrameId: number;
    timeRef.current = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const prevTime = timeRef.current ?? currentTime;
      const dt = (currentTime - prevTime) / 1000;
      timeRef.current = currentTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown, texts]);

  return { containerRef, text1Ref, text2Ref };
};

export const SvgFilters: React.FC<{ id?: string }> = ({ id = "threshold" }) => (
  <svg
    id="morphing-filters"
    className="fixed -top-[9999px] -left-[9999px] h-0 w-0 pointer-events-none"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <filter id={id}>
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
  morphTime = 1.25,
  cooldownTime = 1.25,
  textClassName,
}) => {
  const { containerRef, text1Ref, text2Ref } = useMorphingText(
    texts,
    morphTime,
    cooldownTime
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-block w-full leading-none font-bold select-none",
        className
      )}
      style={{ filter: "none" }}
    >
      <span
        ref={text1Ref}
        className={cn(
          "absolute inset-0 inline-block w-full select-none",
          textClassName
        )}
      >
        {texts[0]}
      </span>
      <span
        ref={text2Ref}
        className={cn(
          "absolute inset-0 inline-block w-full select-none opacity-0",
          textClassName
        )}
      />
      <SvgFilters id="threshold" />
    </div>
  );
};
