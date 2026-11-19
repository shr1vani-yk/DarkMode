import { TopicItem } from "@/components/case-study/CaseStudyTopicNav";

export const NEPALI_TALES_TOPICS: TopicItem[] = [
  { id: "summary", label: "Summary", shortLabel: "Summary" },
  {
    id: "requirement-context",
    label: "Requirement Context",
    shortLabel: "Context",
  },
  {
    id: "about-project",
    label: "About Nepali Tales",
    shortLabel: "About",
  },
  {
    id: "problem-statement",
    label: "Problem Statement",
    shortLabel: "Problem",
  },
  {
    id: "storyboard",
    label: "Storyboard",
    shortLabel: "Storyboard",
  },
  {
    id: "constraints",
    label: "Constraints, Tradeoff’s & Decision",
    shortLabel: "Constraints",
  },
  {
    id: "final-product",
    label: "Final Product",
    shortLabel: "Product",
  },
  {
    id: "reflection",
    label: "Pausing to Reflect",
    shortLabel: "Reflect",
  },
  {
    id: "testimonials",
    label: "What They Said",
    shortLabel: "Feedback",
  },
];

export const NEPALI_TALES_METADATA = {
  readTime: "3 min read",
  displayTitle: "Nepali Tales: Designing a Pre-Order System",
  timeline: "2 weeks",
  contributors: [
    "2 Co-Ordinators/Management",
    "1 Designer (me)",
    "1 Developers",
  ],
  contributions: ["Design Lead", "Brand Assets", "UX/UI Design"],
  liveUrl: "https://www.nepalitales.com/",
  figmaUrl:
    "https://www.figma.com/design/LToyJJhPoV5N1o849XoXVq/Nepali-Tales-Designs?node-id=0-1&t=zOpOflksZn7iZo4V-1",
  stats: {
    monthlyOrders: "450+",
    peakCapacity: "3.4x",
    orderAccuracy: "99.2%",
    checkoutTime: "< 1.2s",
  },
};
