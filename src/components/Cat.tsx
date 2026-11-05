"use client";

import { useEffect, useId, useRef, useState } from "react";

export interface CatProps {
  /** Fur color of the cat. Defaults to "currentColor" to adapt to dark/light theme, or pass a hex like "#111014" */
  furColor?: string;
  /** Whether the pupils follow the mouse cursor */
  followCursor?: boolean;
  /** Whether the cat blinks naturally */
  blink?: boolean;
  /** Whether tapping/clicking the cat triggers the squint animation */
  squintOnClick?: boolean;
  /** Whether to tilt slightly on scroll */
  tiltOnScroll?: boolean;
  /** Custom class name */
  className?: string;
}

const SPEECH_MESSAGES = [
  "Meow! Nice to meet you.",
  "Glad our paths crossed.",
  "Psst… I'm open to opportunities.",
  "Stay a little, have a look around.",
];

export function Cat({
  furColor = "currentColor",
  followCursor = true,
  blink = true,
  squintOnClick = true,
  tiltOnScroll = true,
  className = "",
}: CatProps) {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const maskId = `neko-mask-${id}`;
  const clipId = `neko-clip-${id}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const catGroupRef = useRef<SVGGElement>(null);
  const tailRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);
  const maskFaceRef = useRef<SVGGElement>(null);
  const leftPupilRef = useRef<SVGGElement>(null);
  const rightPupilRef = useRef<SVGGElement>(null);
  const openEyesRef = useRef<SVGGElement>(null);

  const pokeRef = useRef(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const sidebarQuery = window.matchMedia("(min-width: 768px)");
    const updateSidebarVisibility = () => setIsSidebarVisible(sidebarQuery.matches);
    updateSidebarVisibility();

    sidebarQuery.addEventListener("change", updateSidebarVisibility);
    return () => sidebarQuery.removeEventListener("change", updateSidebarVisibility);
  }, []);

  const handleMouseEnter = () => {
    if (!isSidebarVisible) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isSidebarVisible) return;
    setIsHovered(false);
    setMessageIndex((prev) => (prev + 1) % SPEECH_MESSAGES.length);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isSidebarVisible) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = motionQuery.matches;

    const onMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    motionQuery.addEventListener("change", onMotionChange);

    // Internal animation state matching the exact Framer implementation
    const state = {
      t: 0,
      pupilX: 0,
      pupilY: 0,
      targetPupilX: 0,
      targetPupilY: 0,
      lid: 1,
      blinkAt: 1.2,
      blinkPhase: -1,
      cover: 0,
      tilt: 0,
      tiltTarget: 0,
      appear: 1,
      shake: 0,
      poke: 0,
      onScreen: true,
    };

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const clamp = (val: number, min: number, max: number) =>
      Math.min(max, Math.max(min, val));

    // Pointer move listener for cursor tracking
    const handlePointerMove = (e: PointerEvent) => {
      if (!followCursor || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const r =
        (e.clientX - (rect.left + rect.width / 2)) / Math.max(rect.width, 1);
      const a =
        (e.clientY - (rect.top + rect.height * 0.78)) / Math.max(rect.height, 1);

      state.targetPupilX = clamp(r * 12, -4, 4);
      state.targetPupilY = clamp(a * 10, -3, 3.5);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Scroll listener for subtle organic tilt
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (!tiltOnScroll) return;
      const deltaY = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      state.tiltTarget = clamp(state.tiltTarget - deltaY * 0.3, -9, 9);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId: number;
    let lastTime = performance.now();

    // The exact animation loop from the Framer component
    const loop = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(loop);
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      if (!state.onScreen) return;

      state.t += isReducedMotion ? 0 : dt;

      // Squint / Poke decay
      if (pokeRef.current > 0) {
        state.poke = 1;
        pokeRef.current = 0;
      }
      if (state.poke > 0) {
        state.poke = Math.max(0, state.poke - dt / 0.85);
      }
      const pokeProgress = 1 - state.poke;
      const pokeCurve =
        state.poke > 0
          ? Math.pow(Math.sin(Math.PI * Math.min(1, pokeProgress / 0.95)), 0.6)
          : 0;

      // Breathing cycle
      const breatheScale = isReducedMotion ? 0 : Math.sin(state.t * 1.7) * 0.018;
      const breatheY = isReducedMotion ? 0 : Math.sin(state.t * 1.7) * 1.4;

      // Tilt dampening
      state.tiltTarget = lerp(state.tiltTarget, 0, 1 - Math.pow(0.02, dt));
      state.tilt = lerp(state.tilt, state.tiltTarget, 1 - Math.pow(0.01, dt));

      // Update cat body transform
      if (catGroupRef.current) {
        catGroupRef.current.style.transform = `translate(0px, ${
          breatheY + pokeCurve * 4
        }px) rotate(${state.tilt}deg) scale(${
          1 + breatheScale * 0.5 + pokeCurve * 0.05
        }, ${1 + breatheScale - pokeCurve * 0.05})`;
      }

      // Update shadow transform
      if (shadowRef.current) {
        shadowRef.current.style.transform = `scale(${1 + breatheScale * 1.4}, 1)`;
      }

      // Tail organic sway
      if (tailRef.current) {
        const tailAngle = isReducedMotion
          ? 0
          : Math.sin(state.t * 1.2) * 6.5;
        tailRef.current.style.transform = `rotate(${tailAngle}deg)`;
      }

      // Pupil cursor tracking with exponential smoothing
      const shouldTrack = followCursor && !isReducedMotion;
      state.pupilX = lerp(
        state.pupilX,
        shouldTrack ? state.targetPupilX : 0,
        1 - Math.pow(0.0008, dt)
      );
      state.pupilY = lerp(
        state.pupilY,
        shouldTrack ? state.targetPupilY : 0,
        1 - Math.pow(0.0008, dt)
      );

      // Natural Blinking
      if (blink && !isReducedMotion) {
        state.blinkAt -= dt;
        if (state.blinkAt <= 0 && state.blinkPhase < 0) {
          state.blinkPhase = 0;
          state.blinkAt = 2.2 + Math.random() * 3.6;
        }
      }
      if (state.blinkPhase >= 0) {
        state.blinkPhase += dt / 0.14;
        state.lid = Math.abs(Math.cos(state.blinkPhase * Math.PI));
        if (state.blinkPhase >= 1) {
          state.blinkPhase = -1;
          state.lid = 1;
        }
      }

      // Apply squint and pupil positions
      const squintAmount = pokeCurve * 0.92;
      if (maskFaceRef.current) {
        maskFaceRef.current.style.transform = `scale(1, ${1 - squintAmount})`;
      }

      const pupilFactor = Math.max(0, 1 - squintAmount / 0.92);
      const pupilTransform = `translate(${state.pupilX * pupilFactor}px, ${
        state.pupilY * pupilFactor
      }px) scale(1, ${Math.max(0.06, state.lid)})`;

      if (leftPupilRef.current) {
        leftPupilRef.current.style.transform = pupilTransform;
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.style.transform = pupilTransform;
      }
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [followCursor, blink, tiltOnScroll, isSidebarVisible]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none flex flex-col items-start justify-end ${className}`}
      style={{ overflow: "visible" }}
    >
      {/* Speech Bubble - Positioned to the right of the cat at eye level */}
      {isSidebarVisible && (
        <div
          aria-hidden={!isHovered}
          className={`absolute left-[calc(100%+6px)] lg:left-[calc(100%+8px)] top-[58%] -translate-y-1/2 z-40 pointer-events-none transition-all duration-200 ease-out origin-[left_center] motion-reduce:transition-none ${
            isHovered
              ? "opacity-100 scale-100 translate-x-0"
              : "opacity-0 scale-90 -translate-x-2"
          }`}
        >
          {/* Left-pointing tiny speech pointer */}
          <svg
            viewBox="0 0 20 20"
            className="absolute right-full top-1/2 -translate-y-1/2 pointer-events-none z-0 w-3.5 h-3 lg:w-[18px] lg:h-4"
            style={{
              marginRight: -2.5,
              filter: "drop-shadow(-2px 1px 2px rgba(0,0,0,0.06))",
            }}
          >
            <path
              d="M 16 5 L 6 10 L 16 15 Z"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>

          {/* White rounded pill body */}
          <div
            className="relative z-10 w-max max-w-[106px] lg:max-w-[111px] rounded-xl lg:rounded-2xl bg-[#FFFFFF] px-2.5 py-1 lg:px-3 lg:py-1.5 text-center font-sans text-[9.5px] lg:text-[10px] font-medium leading-[1.25] lg:leading-[1.3] text-[#111014] select-none text-balance"
            style={{
              boxShadow:
                "0 6px 18px rgba(0, 0, 0, 0.08), 0 2px 5px rgba(0, 0, 0, 0.04)",
            }}
          >
            {SPEECH_MESSAGES[messageIndex]}
          </div>
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox="0 0 268 214"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        onPointerDown={() => {
          if (squintOnClick) pokeRef.current = 1;
        }}
        onKeyDown={(e) => {
          if (squintOnClick && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            pokeRef.current = 1;
          }
        }}
        tabIndex={squintOnClick ? 0 : undefined}
        style={{
          flex: "0 1 auto",
          overflow: "visible",
          cursor: squintOnClick ? "pointer" : "default",
        }}
        role={squintOnClick ? "button" : "img"}
        aria-label="Cat character, tap to squint"
      >
        <defs>
          {/* Mask that cuts out eyes and whiskers from the solid fur body */}
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="268"
            height="214"
          >
            {/* White base = fully visible fur */}
            <rect x="0" y="0" width="268" height="214" fill="#fff" />

            {/* Black strokes = whiskers cut through the fur */}
            <g stroke="#000" strokeWidth="3.6" strokeLinecap="round">
              <path d="M32 136 L56 142" />
              <path d="M32 160 L56 156" />
              <path d="M184 136 L160 142" />
              <path d="M184 160 L160 156" />
            </g>

            {/* Face group with eyes */}
            <g ref={maskFaceRef} style={{ transformOrigin: "108px 146px" }}>
              <g ref={openEyesRef} opacity="1">
                {/* Left Pupil (78px, 146px) */}
                <g ref={leftPupilRef} style={{ transformOrigin: "78px 146px" }}>
                  <ellipse cx="78" cy="146" rx="8.5" ry="11.5" fill="#000" />
                </g>
                {/* Right Pupil (140px, 146px) */}
                <g ref={rightPupilRef} style={{ transformOrigin: "140px 146px" }}>
                  <ellipse cx="140" cy="146" rx="8.5" ry="11.5" fill="#000" />
                </g>
              </g>
            </g>
          </mask>

          <clipPath id={clipId}>
            <rect x="-60" y="-140" width="400" height="332" />
          </clipPath>
        </defs>

        {/* Ambient Floor Shadow */}
        <ellipse
          ref={shadowRef}
          cx="108"
          cy="192"
          rx="72"
          ry="9"
          fill={furColor}
          opacity="0.14"
          style={{ transformOrigin: "108px 192px" }}
        />

        {/* Cat Group */}
        <g clipPath={`url(#${clipId})`}>
          <g
            ref={catGroupRef}
            opacity="1"
            style={{ transformOrigin: "108px 186px" }}
          >
            {/* Tail */}
            <g ref={tailRef} style={{ transformOrigin: "179px 118px" }}>
              <path
                d="M 194.9 112.6 L 193.6 109.9 L 192.6 107.2 L 192.0 104.6 L 191.7 102.0 L 191.7 99.4 L 192.0 96.8 L 192.5 94.3 L 193.4 92.0 L 194.5 89.8 L 195.8 87.7 L 197.3 85.9 L 199.0 84.2 L 200.8 82.8 L 202.8 81.7 L 204.9 80.7 L 207.0 80.1 L 209.1 79.7 L 211.3 79.5 L 213.4 79.6 L 215.5 79.9 L 217.5 80.4 L 219.4 81.2 L 221.1 82.2 L 222.8 83.3 L 224.2 84.6 L 225.5 86.0 L 226.5 87.6 L 227.4 89.2 L 228.1 90.9 L 228.5 92.6 L 228.8 94.4 L 228.9 96.1 L 228.7 97.8 L 228.4 99.4 L 227.9 101.0 L 227.2 102.4 L 226.4 103.8 L 225.5 105.0 L 224.4 106.1 L 223.3 107.0 L 222.0 107.8 L 220.8 108.4 L 219.4 108.9 L 216.9 109.2 L 214.2 109.8 L 211.8 111.1 L 209.8 112.9 L 208.3 115.2 L 207.5 117.9 L 207.4 120.6 L 208.0 123.3 L 209.2 125.7 L 211.1 127.7 L 213.4 129.2 L 216.0 130.0 L 218.8 130.1 L 221.3 130.0 L 225.1 129.4 L 228.9 128.3 L 232.6 126.8 L 236.1 124.8 L 239.4 122.4 L 242.4 119.6 L 245.2 116.5 L 247.5 112.9 L 249.5 109.1 L 251.0 105.0 L 252.1 100.8 L 252.7 96.3 L 252.7 91.8 L 252.2 87.2 L 251.2 82.7 L 249.6 78.3 L 247.5 74.0 L 244.9 70.0 L 241.8 66.2 L 238.2 62.8 L 234.3 59.8 L 229.9 57.2 L 225.3 55.1 L 220.3 53.6 L 215.2 52.6 L 209.9 52.3 L 204.6 52.5 L 199.2 53.4 L 193.9 54.9 L 188.8 57.0 L 183.9 59.7 L 179.3 63.1 L 175.1 66.9 L 171.3 71.3 L 168.0 76.1 L 165.2 81.3 L 163.0 86.9 L 161.5 92.8 L 160.6 98.8 L 160.4 105.0 L 160.9 111.3 L 162.1 117.5 L 163.8 123.4 Z"
                fill={furColor}
              />
            </g>

            {/* Cat Ears and Body through the Mask */}
            <g mask={`url(#${maskId})`} fill={furColor}>
              {/* Left Ear */}
              <path d="M34 106 C30 78 38 50 50 34 Q56 27 61 36 C74 52 84 72 88 96 Z" />
              {/* Right Ear */}
              <path d="M182 106 C186 78 178 50 166 34 Q160 27 155 36 C142 52 132 72 128 96 Z" />
              {/* Body */}
              <path d="M108 56 C166 56 202 96 202 140 C202 172 180 186 146 186 L70 186 C36 186 14 172 14 140 C14 96 50 56 108 56 Z" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
