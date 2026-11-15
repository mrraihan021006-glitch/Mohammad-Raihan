/**
 * Default site content — assembled from the static data files.
 * This is the single source of truth used when the database has no overrides.
 * The admin panel writes overrides into the database; getContent() merges them
 * over these defaults.
 */
import { site, nav } from "./site";
import { services, type Service } from "./services";
import { projects, type Project } from "./projects";
import { tools, type Tool } from "./tools";
import { socials, type SocialLink } from "./socials";
import { processSteps, type ProcessStep } from "./process";
import { advantages, type Advantage } from "./advantages";
import { projectTypes, budgetRanges } from "./contact";

export interface SiteConfig {
  name: string;
  brand: string;
  profession: string;
  experience: string;
  tagline: string;
  location: string;
  email: string;
  availability: string;
  behance: string;
  personalImage: string;
  whatsapp: string;
}

export interface HeroContent {
  label: string;
  headingLines: string[];
  highlight: string;
  paragraph: string;
  ctaPrimary: string;
  ctaSecondary: string;
  chips: string[];
}

export interface AboutContent {
  label: string;
  heading: string;
  paragraphs: string[];
  cards: string[];
  stats: { value: number; suffix: string; label: string }[];
}

export interface Content {
  site: SiteConfig;
  hero: HeroContent;
  about: AboutContent;
  services: Service[];
  projects: Project[];
  tools: Tool[];
  socials: SocialLink[];
  process: ProcessStep[];
  advantages: Advantage[];
  contactOptions: { projectTypes: string[]; budgetRanges: string[] };
}

export const defaultContent: Content = {
  site: site as SiteConfig,
  hero: {
    label: "Independent Graphic Designer",
    headingLines: ["Designing things", "that make you", "look"],
    highlight: "twice.",
    paragraph: `I'm ${site.name}, a graphic designer with ${site.experience} of experience creating impactful visual identities, digital experiences, and marketing creatives for brands and businesses.`,
    ctaPrimary: "Explore My Work",
    ctaSecondary: "Let's Talk",
    chips: [site.experience, "Creative Design", "Available for Projects"],
  },
  about: {
    label: "Who I Am",
    heading: "More Than Just Making Things Look Good.",
    paragraphs: [
      `I'm Mohammad Raihan, a graphic designer passionate about turning ideas into meaningful visual experiences.`,
      `With over 5 years of experience, I work across branding, social media design, advertising creatives, thumbnails, product visuals, and digital marketing materials.`,
      `I believe great design is not just about appearance. It's about communication, consistency, creativity, and making the right impression.`,
    ],
    cards: [
      "5+ Years of Experience",
      "Branding & Visual Identity",
      "Digital Marketing Creatives",
      "Social Media Design",
      "Creative Problem Solving",
    ],
    stats: [
      { value: 5, suffix: "+", label: "Years of Experience" },
      { value: 6, suffix: "", label: "Creative Service Areas" },
      { value: 7, suffix: "", label: "Project Categories" },
      { value: 100, suffix: "%", label: "Focus on Craft" },
    ],
  },
  services,
  projects,
  tools,
  socials,
  process: processSteps,
  advantages,
  contactOptions: { projectTypes, budgetRanges },
};

/** The set of top-level content keys persisted in the database. */
export const CONTENT_KEYS = [
  "site",
  "hero",
  "about",
  "services",
  "projects",
  "tools",
  "socials",
  "process",
  "advantages",
  "contactOptions",
] as const;

export type ContentKey = (typeof CONTENT_KEYS)[number];

export { nav };
