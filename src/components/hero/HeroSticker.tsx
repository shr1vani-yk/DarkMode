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
    targetX: -100,
    targetY: -22,
    rotate: -13,
    delayIndex: 0,
    sizeClassName: "w-[29px] h-[29px] sm:w-[31px] sm:h-[31px]",
    width: 31,
    height: 31,
  },
  {
    id: "claude",
    name: "Claude",
    src: "/hero-assets/claude.png",
    targetX: -63,
    targetY: -45,
    rotate: -6,
    delayIndex: 1,
    sizeClassName: "w-[33px] h-[33px] sm:w-[35px] sm:h-[35px]",
    width: 35,
    height: 35,
  },
  {
    id: "blender",
    name: "Blender",
    src: "/hero-assets/blender.png",
    targetX: -20,
    targetY: -45,
    rotate: 7,
    delayIndex: 2,
    sizeClassName: "w-[33px] h-[33px] sm:w-[35px] sm:h-[35px]",
    width: 35,
    height: 35,
  },
  {
    id: "suite",
    name: "Adobe Creative Suite",
    src: "/hero-assets/suite.png",
    targetX: 18,
    targetY: -30,
    rotate: 16,
    delayIndex: 3,
    sizeClassName: "w-[31px] h-[31px] sm:w-[33px] sm:h-[33px]",
    width: 33,
    height: 33,
  },
];

export function HeroSticker({ className = "", forceExpanded }: HeroStickerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile screen to show complete composition by default on touch devices
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show popped-out icons if forceExpanded is set, or automatically on mobile, or on hover
  const isOpen = forceExpanded ?? (isMobileScreen || isHovered);

  return (
    <div
      className={`relative inline-flex flex-col items-center md:items-end justify-end select-none w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Interactive design skills avatar and tools"
    >
      {/* Outer bounding canvas for icons and folder */}
      <div className="relative w-[160px] h-[145px] sm:w-[170px] sm:h-[152px] flex items-end justify-center pb-2.5 sm:pb-3.5">
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
            className="relative z-20 w-[96px] sm:w-[100px] lg:w-[106px] cursor-pointer"
            animate={{
              rotate: -4,
              x: -28,
              y: -2,
            }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.04, rotate: -8 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            onClick={() => {
              // Allow tap toggle on touch devices
              if (isMobileScreen) {
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
