/**
 * Central site configuration for Mohammad Raihan's portfolio.
 * Edit these values to update the website globally.
 */

export const site = {
  name: "Mohammad Raihan",
  brand: "RAIHAN.",
  profession: "Graphic Designer & Visual Creative",
  experience: "5+ Years",
  tagline: "Turning Ideas Into Visual Experiences.",
  location: "Bangladesh",
  // Editable contact fields — replace placeholders with real values
  email: "mrraihan021006@gmail.com", // contact email
  availability: "Available for Projects", // [EDITABLE STATUS]
  behance: "https://www.behance.net/mohammadraihan32",
  // Personal photo for the About section — replace with your real photo
  personalImage: "/personal/raihan-portrait.jpg",
  // WhatsApp number (floating button). Local format, e.g. "01344657930".
  whatsapp: "01344657930",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export type AccentColor = "electric" | "orange" | "grape" | "lime" | "blush";

export const accents: Record<AccentColor, string> = {
  electric: "#2d5bff",
  orange: "#ff6b35",
  grape: "#9b51e0",
  lime: "#c6f432",
  blush: "#ff8fb1",
};
