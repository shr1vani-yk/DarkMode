"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectItem } from "@/data/projects";

interface NextProjectCardProps {
  project: ProjectItem;
}

export function NextProjectCard({ project }: NextProjectCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPixelatedReady, setIsPixelatedReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = project.image || "/images/projects/nepaliTalesThumbnail.jpg";

    img.onload = () => {
      // Downscale to very low resolution to produce the authentic chunky mosaic pixels from Image 2
      const pixelWidth = 64;
      const pixelHeight = 22;

      canvas.width = pixelWidth;
      canvas.height = pixelHeight;

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, pixelWidth, pixelHeight);
      setIsPixelatedReady(true);
    };

    img.onerror = () => {
      // Fallback procedural mosaic pattern if image is missing
      const pixelWidth = 64;
      const pixelHeight = 22;
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;

      const colors = ["#2a2a2e", "#3a3a40", "#4f4f58", "#1c1c20", "#e8590c"];
      for (let x = 0; x < pixelWidth; x++) {
        for (let y = 0; y < pixelHeight; y++) {
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      setIsPixelatedReady(true);
    };
  }, [project.image]);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block w-full pt-16 sm:pt-24 border-t border-border-subtle select-none"
    >
      {/* Header Row matching Image 2 */}
      <div className="flex items-baseline justify-between gap-4 mb-4 sm:mb-6">
        <span className="font-sans text-xs sm:text-sm text-foreground/80 shrink-0">
          ( Next Project )
        </span>

        <h3 className="font-sans font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight text-center truncate group-hover:text-muted-foreground transition-colors px-2">
          {project.slug === "plixlife" ? "PlixLife : The Plant Fix" : project.title}
        </h3>

        <span className="font-mono text-xs sm:text-sm text-foreground/80 shrink-0">
          ( {project.id} )
        </span>
      </div>

      {/* Wide Banner Image Container matching Image 2 */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[24/8] md:aspect-[32/10] overflow-hidden rounded-xl sm:rounded-2xl bg-surface border border-border-subtle shadow-xs">
        {/* Pixelated Canvas (Visible on Idle, Fades on Hover) */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover [image-rendering:pixelated] transition-opacity duration-500 ease-out ${
            isPixelatedReady ? "opacity-100 group-hover:opacity-0" : "opacity-0"
          }`}
        />

        {/* Clear High-Res Image (Hidden on Idle, Fades in on Hover) */}
        {project.hasAsset ? (
          <Image
            src={project.image}
            alt={project.displayTitle}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-surface-elevated opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              {project.displayTitle}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

