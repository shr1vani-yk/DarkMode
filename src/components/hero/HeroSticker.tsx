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
}

const APP_ICONS: AppIconConfig[] = [
  {
    id: "figma",
    name: "Figma",
    src: "/hero-assets/figma.png",
    targetX: -52,
    targetY: -45,
    rotate: -15,
    delayIndex: 0,
  },
  {
    id: "claude",
    name: "Claude",
    src: "/hero-assets/claude.png",
    targetX: -18,
    targetY: -82,
    rotate: -6,
    delayIndex: 1,
  },
  {
    id: "blender",
    name: "Blender",
    src: "/hero-assets/blender.png",
    targetX: 20,
    targetY: -82,
    rotate: 8,
    delayIndex: 2,
  },
  {
    id: "suite",
    name: "Adobe Creative Suite",
    src: "/hero-assets/suite.png",
    targetX: 54,
    targetY: -45,
    rotate: 16,
    delayIndex: 3,
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
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Interactive design skills avatar and tools"
    >
      {/* Outer bounding canvas for icons and folder */}
      <div className="relative w-[190px] h-[190px] sm:w-[210px] sm:h-[200px] flex items-end justify-center ">
        {/* Floating App Icons Layer (z-10, behind folder when collapsed) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none m-10">
          {APP_ICONS.map((icon) => {
            const delay = isOpen
              ? icon.delayIndex * 0.05
              : (3 - icon.delayIndex) * 0.03;

            return (
              <motion.div
                key={icon.id}
                className="absolute w-10 h-10 sm:w-11 sm:h-11 drop-shadow-md z-10"
                initial={false}
                animate={
                  prefersReducedMotion
                    ? {
                        x: isOpen ? icon.targetX : 0,
                        y: isOpen ? icon.targetY : 20,
                        opacity: isOpen ? 1 : 0,
                        rotate: isOpen ? icon.rotate : 0,
                      }
                    : {
                        x: isOpen ? icon.targetX : 0,
                        y: isOpen ? icon.targetY : 20,
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
                  width={44}
                  height={44}
                  className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none"
                  priority
                />
              </motion.div>
            );
          })}
        </div>

        {/* Avatar Folder Illustration Layer (z-20) */}
        <motion.div
          className="relative z-20 w-[99px] sm:w-[150px] cursor-pointer"
          whileHover={prefersReducedMotion ? {} : { scale: 1.04, rotate: -1.5 }}
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
            width={99}
            height={81}
            className="w-full h-auto object-contain drop-shadow-lg select-none pointer-events-none"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
