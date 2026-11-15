import type { AccentColor } from "./site";

export interface Advantage {
  title: string;
  description: string;
  accent: AccentColor;
}

export const advantages: Advantage[] = [
  {
    title: "5+ Years of Creative Experience",
    description:
      "Half a decade of crafting visual identities, marketing creatives, and digital experiences for brands.",
    accent: "orange",
  },
  {
    title: "Attention to Detail",
    description:
      "Pixel-level precision in spacing, alignment, hierarchy, and visual rhythm across every deliverable.",
    accent: "electric",
  },
  {
    title: "Strong Visual Communication",
    description:
      "Translating ideas into clear, compelling visuals that connect with the right audience.",
    accent: "grape",
  },
  {
    title: "Brand Consistency",
    description:
      "Maintaining cohesive visual systems across every touchpoint, format, and platform.",
    accent: "lime",
  },
  {
    title: "Creative Problem Solving",
    description:
      "Finding imaginative, effective design solutions for real brand and marketing challenges.",
    accent: "blush",
  },
  {
    title: "Professional Delivery",
    description:
      "Clean, production-ready files and organized handoffs delivered on schedule.",
    accent: "orange",
  },
  {
    title: "Reliable Communication",
    description:
      "Clear, responsive communication throughout every stage of the project.",
    accent: "electric",
  },
  {
    title: "Remote Collaboration",
    description:
      "Smooth async and remote collaboration with teams and clients across time zones.",
    accent: "grape",
  },
];

/** About info cards */
export const aboutCards = [
  "5+ Years of Experience",
  "Branding & Visual Identity",
  "Digital Marketing Creatives",
  "Social Media Design",
  "Creative Problem Solving",
];

/** Animated statistics — only factual, no fabricated metrics */
export const stats = [
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 6, suffix: "", label: "Creative Service Areas" },
  { value: 7, suffix: "", label: "Project Categories" },
  { value: 100, suffix: "%", label: "Focus on Craft" },
];
