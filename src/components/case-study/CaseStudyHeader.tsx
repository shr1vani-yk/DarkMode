"use client";

import { TopNav, BreadcrumbSegment } from "@/components/layout/TopNav";

export interface CaseStudyHeaderProps {
  projectName?: string;
  maxWidthClassName?: string;
  showOnMobile?: boolean;
}

export function CaseStudyHeader({
  projectName,
  maxWidthClassName = "max-w-[1240px] px-6 sm:px-10 md:px-14 lg:px-16",
  showOnMobile = true,
}: CaseStudyHeaderProps) {
  const breadcrumbs: BreadcrumbSegment[] = [
    { label: "Home", href: "/" },
    { label: "Selected Work", href: "/#work" },
  ];

  if (projectName) {
    breadcrumbs.push({ label: projectName });
  }

  return (
    <TopNav
      showOnMobile={showOnMobile}
      maxWidthClassName={maxWidthClassName}
      breadcrumbs={breadcrumbs}
    />
  );
}

export default CaseStudyHeader;
