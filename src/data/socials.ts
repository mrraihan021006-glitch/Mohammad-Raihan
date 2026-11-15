import type { AccentColor } from "./site";

export interface SocialLink {
  name: string;
  handle: string;
  // Leave as empty string "" for unknown links — they'll render as editable placeholders.
  href: string;
  accent: AccentColor;
}

/**
 * Social connections.
 * Only confirmed links are filled in. Unknown links remain editable placeholders.
 */
export const socials: SocialLink[] = [
  {
    name: "Behance",
    handle: "mohammadraihan32",
    href: "https://www.behance.net/mohammadraihan32",
    accent: "electric",
  },
  {
    name: "LinkedIn",
    handle: "in/mohammadraihan",
    href: "", // [ADD LINK]
    accent: "electric",
  },
  {
    name: "Instagram",
    handle: "@raihan.design",
    href: "", // [ADD LINK]
    accent: "orange",
  },
  {
    name: "Facebook",
    handle: "raihan.design",
    href: "", // [ADD LINK]
    accent: "electric",
  },
  {
    name: "Fiverr",
    handle: "raihan_design",
    href: "", // [ADD LINK]
    accent: "lime",
  },
  {
    name: "Email",
    handle: "hello@raihan.design",
    href: "mailto:hello@raihan.design",
    accent: "grape",
  },
];
