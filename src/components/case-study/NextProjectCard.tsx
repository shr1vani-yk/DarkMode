"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as PhosphorIcons from "@phosphor-icons/react/ssr";
import { PROJECTS, ProjectItem } from "@/data/projects";

export interface NextProjectCardProps {
  project?: ProjectItem;
  className?: string;
}

export function NextProjectCard({
  project,
  className = "",
}: NextProjectCardProps) {
  const pathname = usePathname();

  // Dynamically resolve the next project if not directly supplied
  const nextProject = useMemo(() => {
    if (project) return project;
    const currentSlug = pathname?.split("/").filter(Boolean).pop();
    const currentIndex = PROJECTS.findIndex((p) => p.slug === currentSlug);
    if (currentIndex !== -1) {
      return PROJECTS[(currentIndex + 1) % PROJECTS.length];
    }
    return PROJECTS[0];
  }, [project, pathname]);

  if (!nextProject) return null;

  // Title formatting: "Plix" for plixlife, "Nepali Tales" for nepali-tales, etc.
  const title =
    nextProject.shortTitle ||
    (nextProject.slug === "plixlife" ? "Plix" : nextProject.title);

  // Role formatting: "Product Designer" for nepali-tales, "Visual Designer" for plix, etc.
  const role =
    nextProject.roleLabel ||
    (nextProject.slug === "nepali-tales"
      ? "Product Designer"
      : nextProject.slug === "plixlife"
      ? "Visual Designer"
      : "Product Designer");

  const coverImage = nextProject.coverImage || nextProject.image;

  return (
    <section
      aria-label="Next Project"
      className={`w-full pt-10 sm:pt-14 border-t border-border-subtle/70 ${className}`}
    >
      <Link
        href={`/work/${nextProject.slug}`}
        className="group flex flex-col gap-3 sm:gap-3.5 w-full select-none cursor-pointer"
        aria-label={`Next Project: ${title} : ${role}`}
      >
        {/* Header row: Project Name & Role on the left, "Next Project" + Phosphor arrow on the right */}
        <div className="flex items-center justify-between gap-4 text-xs sm:text-sm font-sans text-muted-foreground">
          <span className="font-normal truncate group-hover:text-foreground transition-colors">
            {title} : {role}
          </span>

          <div className="inline-flex items-center gap-1.5 shrink-0 group-hover:text-foreground transition-colors">
            <span>Next Project</span>
            <PhosphorIcons.CaretRightIcon
              size={13}
              weight="bold"
              className="transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </div>
        </div>

        {/* Primary Visual: Cover Image with subtle rounded corners */}
        <div className="relative w-full aspect-[3.5/1] rounded-xl overflow-hidden bg-surface border border-border-subtle/40 shadow-xs">
          <Image
            src={coverImage}
            alt={`${title} : ${role}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 960px, 1200px"
            className="object-cover object-center w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        </div>
      </Link>
    </section>
  );
}

export default NextProjectCard;
