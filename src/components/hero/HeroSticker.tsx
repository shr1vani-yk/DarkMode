"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export interface HeroStickerProps {
  className?: string;
  forceExpanded?: boolean;
}

interface AppIconConfig {
  id: string;
  name: string;
  src: string;
  targetX: number;
  targetY: number;
  rotate: number;
  delayIndex: number;
  sizeClassName: string;
  width: number;
  height: number;
}

const APP_ICONS: AppIconConfig[] = [
  {
    id: "figma",
    name: "Figma",
    src: "/hero-assets/figma.png",
    targetX: -52,
    targetY: -36,
    rotate: -13,
    delayIndex: 0,
    sizeClassName: "w-[27px] h-[27px] sm:w-[31px] sm:h-[31px]",
    width: 31,
    height: 31,
  },
  {
    id: "claude",
    name: "Claude",
    src: "/hero-assets/claude.png",
    targetX: -17,
    targetY: -54,
    rotate: -6,
    delayIndex: 1,
    sizeClassName: "w-[31px] h-[31px] sm:w-[35px] sm:h-[35px]",
    width: 35,
    height: 35,
  },
  {
    id: "blender",
    name: "Blender",
    src: "/hero-assets/blender.png",
    targetX: 17,
    targetY: -52,
    rotate: 6,
    delayIndex: 2,
    sizeClassName: "w-[31px] h-[31px] sm:w-[35px] sm:h-[35px]",
    width: 35,
    height: 35,
  },
  {
    id: "suite",
    name: "Adobe Creative Suite",
    src: "/hero-assets/suite.png",
    targetX: 52,
    targetY: -34,
    rotate: 16,
    delayIndex: 3,
    sizeClassName: "w-[29px] h-[29px] sm:w-[33px] sm:h-[33px]",
    width: 33,
    height: 33,
  },
];

export function HeroSticker({ className = "", forceExpanded }: HeroStickerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect tablet/mobile screen (< 1280px / xl) to show complete composition by default
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkBreakpoint = () => {
      setIsMobileOrTablet(window.innerWidth < 1280);
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint, { passive: true });
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  // Show popped-out icons: forced, or by default on tablet/mobile (< 1280px), or on hover on desktop (>= 1280px)
  const isOpen = forceExpanded ?? (isMobileOrTablet || isHovered);

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Interactive design skills avatar and tools"
    >
      {/* Outer bounding canvas for icons and folder */}
      <div className="relative w-[136px] h-[122px] sm:w-[150px] sm:h-[135px] md:w-[165px] md:h-[148px] flex items-end justify-center pb-1 sm:pb-2">
        {/* Relative anchor centered at folder top */}
        <div className="relative flex flex-col items-center">
          {/* Floating App Icons Layer (z-10, behind folder when collapsed) */}
          <div className="absolute top-0 left-1/2 pointer-events-none">
            {APP_ICONS.map((icon) => {
              const delay = isOpen
                ? icon.delayIndex * 0.05
                : (3 - icon.delayIndex) * 0.03;

              return (
                <div
                  key={icon.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <motion.div
                    className={`${icon.sizeClassName} drop-shadow-md z-10`}
                    initial={false}
                    animate={
                      prefersReducedMotion
                        ? {
                            x: isOpen ? icon.targetX : 0,
                            y: isOpen ? icon.targetY : 16,
                            opacity: isOpen ? 1 : 0,
                            rotate: isOpen ? icon.rotate : 0,
                          }
                        : {
                            x: isOpen ? icon.targetX : 0,
                            y: isOpen ? icon.targetY : 16,
                            scale: isOpen ? 1 : 0.35,
                            opacity: isOpen ? 1 : 0,
                            rotate: isOpen ? icon.rotate : 0,
                          }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.1 }
                        : {
                            type: "spring",
                            stiffness: 280,
                            damping: 18,
                            mass: 0.8,
                            delay,
                          }
                    }
                  >
                    <Image
                      src={icon.src}
                      alt={icon.name}
                      width={icon.width}
                      height={icon.height}
                      className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none"
                      priority
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Avatar Folder Illustration Layer (z-20) */}
          <motion.div
            className="relative z-20 w-[88px] sm:w-[96px] md:w-[102px] lg:w-[106px] cursor-pointer"
            animate={{
              rotate: -4,
              x: 0,
              y: 0,
            }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.04, rotate: -7 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            onClick={() => {
              // Allow tap toggle on touch devices
              if (isMobileOrTablet) {
                setIsHovered((prev) => !prev);
              }
            }}
          >
            <Image
              src="/hero-assets/folder.png"
              alt="Shravani creative tools folder"
              width={106}
              height={86}
              className="w-full h-auto object-contain drop-shadow-lg select-none pointer-events-none"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeroSticker;
