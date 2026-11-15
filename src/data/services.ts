import type { AccentColor } from "./site";

export type ServiceCategory =
  | "Brand Identity Design"
  | "Social Media Design"
  | "YouTube Thumbnail Design"
  | "Advertising & Marketing Creatives"
  | "Product & E-commerce Design"
  | "Print & Promotional Design";

export interface Service {
  index: string;
  title: string;
  description: string;
  accent: AccentColor;
  shape: "circle" | "square" | "triangle" | "ring" | "blob" | "diamond";
  items: string[];
}

export const services: Service[] = [
  {
    index: "01",
    title: "Brand Identity Design",
    description:
      "Creating memorable visual identities that communicate a brand's personality and values.",
    accent: "orange",
    shape: "circle",
    items: [
      "Logo Design",
      "Brand Guidelines",
      "Typography Systems",
      "Color Systems",
      "Visual Identity",
    ],
  },
  {
    index: "02",
    title: "Social Media Design",
    description:
      "Designing engaging social media visuals that help businesses communicate effectively.",
    accent: "electric",
    shape: "square",
    items: [
      "Instagram Posts",
      "Facebook Creatives",
      "Social Media Campaigns",
      "Carousels",
      "Promotional Graphics",
    ],
  },
  {
    index: "03",
    title: "YouTube Thumbnail Design",
    description:
      "Creating attention-grabbing thumbnails that communicate video ideas through strong visual storytelling.",
    accent: "blush",
    shape: "triangle",
    items: [
      "YouTube Thumbnails",
      "Thumbnail Concepts",
      "Typography",
      "Composition",
      "Visual Storytelling",
    ],
  },
  {
    index: "04",
    title: "Advertising & Marketing Creatives",
    description:
      "Developing professional visual assets for digital advertising and marketing campaigns.",
    accent: "grape",
    shape: "ring",
    items: [
      "Facebook Ads",
      "Instagram Ads",
      "Static Ad Creatives",
      "Promotional Campaigns",
      "E-commerce Ads",
    ],
  },
  {
    index: "05",
    title: "Product & E-commerce Design",
    description:
      "Presenting products through clean, attractive, conversion-focused visual content.",
    accent: "lime",
    shape: "blob",
    items: [
      "Product Graphics",
      "Product Advertising",
      "E-commerce Banners",
      "Promotional Visuals",
      "Product Campaigns",
    ],
  },
  {
    index: "06",
    title: "Print & Promotional Design",
    description:
      "Designing professional marketing and promotional materials for businesses.",
    accent: "orange",
    shape: "diamond",
    items: [
      "Flyers",
      "Posters",
      "Brochures",
      "Banners",
      "Marketing Materials",
    ],
  },
];
