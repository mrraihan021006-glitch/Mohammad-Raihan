import type { AccentColor } from "./site";

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
  accent: AccentColor;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discovery",
    description:
      "Understanding the brand, audience, project requirements, and objectives.",
    accent: "orange",
  },
  {
    index: "02",
    title: "Research & Strategy",
    description:
      "Exploring references, visual directions, competitors, and creative opportunities.",
    accent: "electric",
  },
  {
    index: "03",
    title: "Concept Development",
    description:
      "Developing creative ideas, moodboards, layouts, typography, and visual concepts.",
    accent: "grape",
  },
  {
    index: "04",
    title: "Design & Refinement",
    description:
      "Transforming concepts into polished designs through iterations and refinement.",
    accent: "lime",
  },
  {
    index: "05",
    title: "Final Delivery",
    description:
      "Preparing high-quality, production-ready design assets.",
    accent: "blush",
  },
];
