import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import { getCaseStudy, renderCaseStudy } from "@/case-studies";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Case Study · Shravani Sutar",
    };
  }

  return {
    title: `${project.displayTitle || project.title} · Shravani Sutar`,
    description: project.description,
  };
}

function CaseStudySkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 animate-pulse flex flex-col gap-8">
        <div className="h-4 w-20 bg-surface-elevated rounded" />
        <div className="h-10 w-3/4 bg-surface-elevated rounded" />
        <div className="h-4 w-1/2 bg-surface-elevated rounded" />
      </div>
    </div>
  );
}

async function CaseStudyContent({ params }: Props) {
  const { slug } = await params;

  if (!getCaseStudy(slug)) {
    notFound();
  }

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject =
    projectIndex !== -1
      ? PROJECTS[(projectIndex + 1) % PROJECTS.length]
      : undefined;

  return <>{renderCaseStudy(slug, nextProject)}</>;
}

export default function CaseStudyPage({ params }: Props) {
  return (
    <Suspense fallback={<CaseStudySkeleton />}>
      <CaseStudyContent params={params} />
    </Suspense>
  );
}
