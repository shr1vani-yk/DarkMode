import type { ComponentType, ReactNode } from "react";
import { createElement } from "react";
import type { ProjectItem } from "@/data/projects";
import { NepaliTalesCaseStudy } from "./nepali-tales";
import { PlixCaseStudy } from "./plix";
import { RedbusCaseStudy } from "./redbus";

export interface CaseStudyProps {
  nextProject?: ProjectItem;
}

export const CASE_STUDY_REGISTRY: Record<
  string,
  ComponentType<CaseStudyProps>
> = {
  "nepali-tales": NepaliTalesCaseStudy,
  plixlife: PlixCaseStudy,
  redbus: RedbusCaseStudy,
};

export function getCaseStudy(
  slug: string
): ComponentType<CaseStudyProps> | null {
  return CASE_STUDY_REGISTRY[slug] || null;
}

export function renderCaseStudy(
  slug: string,
  nextProject?: ProjectItem
): ReactNode {
  const Component = getCaseStudy(slug);
  if (!Component) return null;
  return createElement(Component, { nextProject });
}

// export { NepaliTalesCaseStudy } from "./nepali-tales";
export { PlixCaseStudy } from "./plix";
export { RedbusCaseStudy } from "./redbus";
