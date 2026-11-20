export type PlaygroundFilterId =
  | "all"
  | "interface"
  | "visuals"
  | "motion"
  | "3d-models";

export interface PlaygroundFilter {
  id: PlaygroundFilterId;
  label: string;
}

export interface PlaygroundItem {
  id: string;
  title: string;
  category: "visuals" | "3d-models" | "interface" | "motion";
  categoryLabel: string;
  image: string;
  video?: string;
  poster?: string;
  mediaType?: "image" | "video";
  width: number;
  height: number;
  aspectRatio: string;
  desktopColSpan?: "third" | "half"; // "third" = col-span-2 in 6-col grid (1/3 width), "half" = col-span-3 (1/2 width)
}

export const PLAYGROUND_FILTERS: PlaygroundFilter[] = [
  { id: "all", label: "ALL" },
  { id: "interface", label: "INTERFACES" },
  { id: "visuals", label: "VISUALS" },
  { id: "motion", label: "MOTION" },
  { id: "3d-models", label: "3D MODELS" },
];

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  // --- Interfaces ---
  {
    id: "ai-assisted-album",
    title: "Ai-Assisted Album",
    category: "interface",
    categoryLabel: "Interface",
    image: "/images/playground/Interfaces/pratice_ui.png",
    width: 440,
    height: 956,
    aspectRatio: "153 / 316",
    desktopColSpan: "third",
  },
  {
    id: "search-experience",
    title: "Search Experience",
    category: "interface",
    categoryLabel: "Interface",
    image: "/images/playground/Interfaces/Home-search.png",
    width: 402,
    height: 1017,
    aspectRatio: "153 / 316",
    desktopColSpan: "third",
  },
  {
    id: "card-prototype",
    title: "Card Prototype",
    category: "interface",
    categoryLabel: "Interface",
    mediaType: "video",
    video: "/images/playground/Interfaces/unipayCardPrototype.mp4",
    poster: "/images/playground/Interfaces/unipayCardPrototype-poster.webp",
    image: "/images/playground/Interfaces/unipayCardPrototype-poster.webp",
    width: 414,
    height: 964,
    aspectRatio: "153 / 316",
    desktopColSpan: "third",
  },
  {
    id: "story-preview-redesign",
    title: "Story Preview Redesign",
    category: "interface",
    categoryLabel: "Interface",
    image: "/images/playground/Interfaces/storyPreview.png",
    width: 1440,
    height: 824,
    aspectRatio: "1440 / 670",
    desktopColSpan: "half",
  },
  {
    id: "sign-up-card-prototype",
    title: "Card Prototype",
    category: "interface",
    categoryLabel: "Interface",
    image: "/images/playground/Interfaces/sign up.png",
    width: 402,
    height: 874,
    aspectRatio: "153 / 316",
    desktopColSpan: "third",
  },
  // --- Visuals (Row 1: 3 cards, 1/3 width each) ---
  {
    id: "music-album-exploration",
    title: "Music Album Exploration",
    category: "visuals",
    categoryLabel: "Visual",
    image: "/images/playground/visuals/music-album-exploration.webp",
    width: 873,
    height: 1062,
    aspectRatio: "873 / 1062",
    desktopColSpan: "third",
  },
  {
    id: "portrait-practice",
    title: "Face Portrait Practice",
    category: "visuals",
    categoryLabel: "Visual",
    image: "/images/playground/visuals/portrait-practice.webp",
    width: 873,
    height: 831,
    aspectRatio: "873 / 831",
    desktopColSpan: "third",
  },
  {
    id: "typography-style",
    title: "Typography-Masking",
    category: "visuals",
    categoryLabel: "Visual",
    image: "/images/playground/visuals/typography-style.webp",
    width: 873,
    height: 1062,
    aspectRatio: "873 / 1062",
    desktopColSpan: "third",
  },

  // --- Visuals (Row 2: 3 cards, 1/3 width each) ---
  {
    id: "subject-priority-space",
    title: "Blend",
    category: "visuals",
    categoryLabel: "Visual",
    image: "/images/playground/visuals/subject-priority-space.webp",
    width: 873,
    height: 1071,
    aspectRatio: "873 / 1071",
    desktopColSpan: "third",
  },
  {
    id: "subject-priority-red",
    title: "Subject Oriented",
    category: "visuals",
    categoryLabel: "Visual",
    image: "/images/playground/visuals/subject-priority-red.webp",
    width: 873,
    height: 1062,
    aspectRatio: "873 / 1062",
    desktopColSpan: "third",
  },
  {
    id: "typography-hero-image",
    title: "Typography & hero image",
    category: "visuals",
    categoryLabel: "Visual",
    image: "/images/playground/visuals/typography-hero-image.webp",
    width: 873,
    height: 1092,
    aspectRatio: "873 / 1092",
    desktopColSpan: "third",
  },

  // --- Visuals (Row 3: 2 wide cards, 1/2 width each) ---
  {
    id: "sketch",
    title: "Sketch",
    category: "visuals",
    categoryLabel: "Visual",
    image: "/images/playground/visuals/sketch.webp",
    width: 1293,
    height: 873,
    aspectRatio: "1293 / 873",
    desktopColSpan: "half",
  },
  {
    id: "dithered-effect",
    title: "Dithered Effect",
    category: "visuals",
    categoryLabel: "Visual",
    image: "/images/playground/visuals/dithered-effect.webp",
    width: 1374,
    height: 1131,
    aspectRatio: "1374 / 1131",
    desktopColSpan: "half",
  },

  // --- 3D Models (Row 1: 3 cards, 1/3 width each) ---
  {
    id: "topology-texture",
    title: "Topology & Texture",
    category: "3d-models",
    categoryLabel: "3D Model",
    image: "/images/playground/3d-models/topology-texture.webp",
    width: 873,
    height: 1062,
    aspectRatio: "873 / 1062",
    desktopColSpan: "third",
  },
  {
    id: "low-poly-sushi",
    title: "Low-poly Sushi - Lightning",
    category: "3d-models",
    categoryLabel: "3D Model",
    image: "/images/playground/3d-models/low-poly-sushi.webp",
    width: 873,
    height: 831,
    aspectRatio: "873 / 831",
    desktopColSpan: "third",
  },
  {
    id: "low-poly-well",
    title: "Low-Poly Well (game assets)",
    category: "3d-models",
    categoryLabel: "3D Model",
    image: "/images/playground/3d-models/low-poly-well.webp",
    width: 873,
    height: 624,
    aspectRatio: "873 / 624",
    desktopColSpan: "third",
  },
];

