import type { AccentColor } from "./site";

export interface Tool {
  name: string;
  category: string;
  accent: AccentColor;
  // Generic visual symbol key (no trademarked logos)
  glyph: string;
  // Optional custom icon image (uploads from admin). Falls back to glyph.
  icon?: string;
}

/**
 * Tools & creative technology.
 * Uses generic visual symbols rather than trademarked logos.
 */
export const tools: Tool[] = [
  { name: "Photoshop", category: "Adobe", accent: "electric", glyph: "Ps" },
  { name: "Illustrator", category: "Adobe", accent: "orange", glyph: "Ai" },
  { name: "Canva", category: "Design", accent: "grape", glyph: "Cv" },
  { name: "Figma", category: "Design", accent: "electric", glyph: "Fg" },
  { name: "ChatGPT", category: "AI", accent: "lime", glyph: "G" },
  { name: "Gemini", category: "AI", accent: "grape", glyph: "Gm" },
  {
    name: "AI Image Generation",
    category: "AI",
    accent: "blush",
    glyph: "Ai-Img",
  },
];
