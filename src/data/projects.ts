export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  displayTitle: string;
  subtitle: string;
  category: "Product" | "Branding";
  categoryLabel: string;
  year: string;
  readTime: string;
  description: string;
  metric: string;
  metricSub: string;
  tags: string[];
  image: string;
  hasAsset: boolean;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    slug: "nepali-tales",
    title: "Nepali Tales",
    displayTitle: "Nepali Tales: Designing a Pre-Order System",
    subtitle: "Multi-platform design token architecture and tactile UI components",
    category: "Product",
    categoryLabel: "Design Systems / Engineering",
    year: "2026",
    readTime: "3 min read",
    description:
      "Nepali Tales is a well-known Thane cloud kitchen that had outgrown taking orders on WhatsApp. I redesigned ordering as a pre-order website built around time, with delivery slots & clear states for when ordering is closed or a slot is full, which reduced engineering rework, and we shipped an MVP in a few weeks.",
    metric: "5k+ Visitors",
    metricSub: "2026, FOODTECH",
    tags: ["Visuals", "NextJS", "Prototyped"],
    image: "/images/projects/nepaliTalesThumbnail.jpg",
    hasAsset: true,
  },
  {
    id: "02",
    slug: "plixlife",
    title: "PlixLife",
    displayTitle: "Plix: Performance Creative & Motion System",
    subtitle: "Marketive & Sales Creatives with UI/UX, Web & Motion Design",
    category: "Branding",
    categoryLabel: "Brand & Visual Design",
    year: "2026",
    readTime: "4 min read",
    description:
      "Directed marketive visual systems, high-converting digital storefront experiences, and tactile motion narratives for plant-based wellness brand Plix, elevating product adoption and brand recall across key consumer touchpoints.",
    metric: "40% CVR Uplift",
    metricSub: "2026, WELLNESS / D2C",
    tags: ["Generative UI", "Spatial Canvas", "TypeScript"],
    image: "/images/projects/plix.jpg",
    hasAsset: true,
  },
  {
    id: "03",
    slug: "digimedic",
    title: "Digimedic",
    displayTitle: "Digimedic: Clinical Telemetry & Patient Dispatch",
    subtitle: "Physics-based spring animation engine for tactile web interactions",
    category: "Product",
    categoryLabel: "UI/UX & Frontend Developer Intern",
    year: "2024",
    readTime: "3 min read",
    description:
      "Engineered responsive healthcare workflows, appointment dispatch systems, and diagnostic telemetry dashboards with sub-millisecond interaction feedback, improving triage speed and clinical data clarity.",
    metric: "12k+ Active Patients",
    metricSub: "2024, HEALTHTECH",
    tags: ["React", "Web Standards", "Prototyping"],
    image: "",
    hasAsset: false,
  },
  {
    id: "04",
    slug: "chronicle-journal",
    title: "Chronicle Journal",
    displayTitle: "Chronicle Journal: Editorial Typography Engine",
    subtitle: "High-density editorial writing platform with typography-first hierarchy",
    category: "Branding",
    categoryLabel: "Editorial Design",
    year: "2024",
    readTime: "5 min read",
    description:
      "A high-density publication layout system built around optical typography sizing, modular column geometry, and minimal distraction reading modes for long-form essays and architectural criticism.",
    metric: "99.8% Read Completion",
    metricSub: "2024, PUBLISHING",
    tags: ["Typography", "Grid Systems", "Accessibility"],
    image: "",
    hasAsset: false,
  },
];

