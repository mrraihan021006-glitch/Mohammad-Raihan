import type { AccentColor } from "./site";

export type ProjectCategory =
  | "Branding"
  | "Social Media"
  | "YouTube Thumbnails"
  | "Advertising"
  | "E-commerce"
  | "Product Design"
  | "Print Design";

export interface ProjectDetail {
  overview: string;
  objective: string;
  creativeDirection: string;
  process: string[];
  finalDesign: string;
  mockups: string[];
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  accent: AccentColor;
  // Replaceable image — swap with your real design work
  image: string;
  imageAlt: string;
  size: "lg" | "md" | "sm";
  detail: ProjectDetail;
}

export const projectFilters: { label: string; value: ProjectCategory | "All" }[] =
  [
    { label: "All Projects", value: "All" },
    { label: "Branding", value: "Branding" },
    { label: "Social Media", value: "Social Media" },
    { label: "YouTube Thumbnails", value: "YouTube Thumbnails" },
    { label: "Advertising", value: "Advertising" },
    { label: "E-commerce", value: "E-commerce" },
    { label: "Product Design", value: "Product Design" },
    { label: "Print Design", value: "Print Design" },
  ];

/**
 * Portfolio projects.
 * Replace `image` paths with your real design files in /public/projects.
 * Add / remove projects freely.
 * IMPORTANT: Do not invent fake client names or testimonials.
 */
export const projects: Project[] = [
  {
    id: "studio-coffee",
    title: "Aroma Coffee — Brand Identity",
    category: "Branding",
    year: "2025",
    description:
      "A warm, modern identity system built around a hand-drawn wordmark and a flexible typographic lockup.",
    accent: "orange",
    image: "/projects/project-01.jpg",
    imageAlt: "Aroma Coffee brand identity presentation",
    size: "lg",
    detail: {
      overview:
        "A complete visual identity exploration for a specialty coffee concept, exploring warmth, craft, and approachability.",
      objective:
        "Build a recognizable identity that communicates craft and warmth while staying flexible across packaging and digital.",
      creativeDirection:
        "Earthy orange paired with deep charcoal, a custom wordmark, and an editorial layout system.",
      process: [
        "Discovery and brand positioning workshop",
        "Wordmark sketching and refinement",
        "Color and typography system definition",
        "Application across packaging and digital touchpoints",
      ],
      finalDesign:
        "A flexible identity with a custom wordmark, supporting monogram, and a complete application guideline set.",
      mockups: [
        "Business card application",
        "Packaging label system",
        "Social media template set",
      ],
    },
  },
  {
    id: "festival-campaign",
    title: "Pulse Festival — Social Campaign",
    category: "Social Media",
    year: "2025",
    description:
      "An energetic social media campaign system with modular layouts and a bold chromatic palette.",
    accent: "electric",
    image: "/projects/project-02.jpg",
    imageAlt: "Pulse Festival social media campaign designs",
    size: "md",
    detail: {
      overview:
        "A modular social campaign system designed for high-energy event promotion across platforms.",
      objective:
        "Create scroll-stopping social content that stays consistent across a multi-week campaign.",
      creativeDirection:
        "Electric blue accents, oversized type, and rhythmic grid variations.",
      process: [
        "Campaign concept and content pillars",
        "Modular template design",
        "Animated and static variants",
        "Scheduling-ready export system",
      ],
      finalDesign:
        "A full set of static and animated social templates with a reusable color system.",
      mockups: ["Instagram feed grid", "Story format set", "Carousel layouts"],
    },
  },
  {
    id: "tech-thumbnail",
    title: "Tech Talk — YouTube Thumbnail Series",
    category: "YouTube Thumbnails",
    year: "2024",
    description:
      "High-contrast thumbnail series engineered for clarity and click-through.",
    accent: "blush",
    image: "/projects/project-03.jpg",
    imageAlt: "YouTube thumbnail design series",
    size: "md",
    detail: {
      overview:
        "A series of YouTube thumbnails designed for a tech commentary channel.",
      objective:
        "Maximize clarity and curiosity while staying readable at small sizes.",
      creativeDirection:
        "Bold portrait crops, expressive type, and a consistent color signature.",
      process: [
        "Thumbnail concept framework",
        "Typography and contrast study",
        "Series consistency system",
        "Export presets for multiple resolutions",
      ],
      finalDesign:
        "A repeatable thumbnail system with strong hierarchy and brand consistency.",
      mockups: ["Thumbnail grid", "Detail crops", "Channel banner"],
    },
  },
  {
    id: "fashion-ad",
    title: "Lumen — Ad Creative Set",
    category: "Advertising",
    year: "2025",
    description:
      "Static ad creatives designed for performance and brand consistency.",
    accent: "grape",
    image: "/projects/project-04.jpg",
    imageAlt: "Lumen advertising ad creative set",
    size: "lg",
    detail: {
      overview:
        "A set of static ad creatives exploring product-led and lifestyle-led directions.",
      objective:
        "Produce a flexible ad set that performs across placements while staying on-brand.",
      creativeDirection:
        "Clean product framing, grape accent system, and confident typography.",
      process: [
        "Placement audit and messaging map",
        "Creative direction exploration",
        "Layout system for multiple ratios",
        "Export and variant labeling",
      ],
      finalDesign:
        "A complete ad creative set covering square, portrait, and landscape ratios.",
      mockups: ["Square ad", "Story ad", "Landscape banner"],
    },
  },
  {
    id: "skincare-ecom",
    title: "Bloom — E-commerce Visuals",
    category: "E-commerce",
    year: "2024",
    description:
      "Clean, conversion-focused product visuals for a skincare storefront.",
    accent: "lime",
    image: "/projects/project-05.jpg",
    imageAlt: "Bloom skincare e-commerce product visuals",
    size: "md",
    detail: {
      overview:
        "E-commerce product visuals and banners for a skincare brand storefront.",
      objective:
        "Lift product presentation quality while keeping the page fast and clean.",
      creativeDirection:
        "Soft natural tones with a fresh lime accent for energy.",
      process: [
        "Storefront visual audit",
        "Product card and banner system",
        "Category landing layouts",
        "Promotional visual set",
      ],
      finalDesign:
        "A cohesive storefront visual system with reusable banner templates.",
      mockups: ["Product card", "Category banner", "Homepage hero"],
    },
  },
  {
    id: "device-render",
    title: "Nimbus — Product Design Mockup",
    category: "Product Design",
    year: "2025",
    description:
      "Photoreal-style product mockups and key visuals for a device launch.",
    accent: "electric",
    image: "/projects/project-06.jpg",
    imageAlt: "Nimbus product design mockups",
    size: "md",
    detail: {
      overview:
        "Product design visuals and key art for a consumer device launch.",
      objective:
        "Present the product cleanly across launch materials and press kits.",
      creativeDirection:
        "Minimal stage lighting with an electric-blue signature accent.",
      process: [
        "Key visual direction",
        "Device framing and lighting study",
        "Feature callout system",
        "Press-ready export set",
      ],
      finalDesign:
        "A complete launch visual kit including hero, feature callouts, and press art.",
      mockups: ["Hero key visual", "Feature callouts", "Press kit cover"],
    },
  },
  {
    id: "event-print",
    title: "Volume — Print & Poster Series",
    category: "Print Design",
    year: "2024",
    description:
      "A bold poster and flyer series for a cultural event program.",
    accent: "orange",
    image: "/projects/project-07.jpg",
    imageAlt: "Volume print and poster series",
    size: "lg",
    detail: {
      overview:
        "A print design series for a cultural event program spanning posters, flyers, and banners.",
      objective:
        "Create a strong visual rhythm across the full event communication set.",
      creativeDirection:
        "Oversized display type, orange accent rhythm, and a structured grid.",
      process: [
        "Event visual concept",
        "Grid and typographic system",
        "Poster and flyer layouts",
        "Print-ready production files",
      ],
      finalDesign:
        "A complete print set with consistent rhythm across formats.",
      mockups: ["Poster series", "Flyer set", "Stage banner"],
    },
  },
  {
    id: "fitness-brand",
    title: "Stride — Fitness Brand System",
    category: "Branding",
    year: "2024",
    description:
      "An energetic brand system with a flexible logo family and motion-ready marks.",
    accent: "lime",
    image: "/projects/project-08.jpg",
    imageAlt: "Stride fitness brand identity system",
    size: "md",
    detail: {
      overview:
        "A fitness brand identity system built for energy and adaptability.",
      objective:
        "Deliver a flexible brand system that works across apparel, digital, and signage.",
      creativeDirection:
        "Bold geometric marks, lime accent energy, and a confident type pairing.",
      process: [
        "Brand positioning and naming support",
        "Logo family exploration",
        "Motion-ready mark system",
        "Application guidelines",
      ],
      finalDesign:
        "A flexible brand system with a logo family and complete application guide.",
      mockups: ["Apparel application", "Digital lockup", "Signage system"],
    },
  },
];
