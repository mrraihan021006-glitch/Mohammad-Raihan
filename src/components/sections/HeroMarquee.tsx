"use client";

import { useState } from "react";
import { accents } from "@/data/site";
import { useContent } from "@/components/layout/ContentProvider";

/**
 * Animated showcase of portfolio images in TWO shapes:
 *  - Row 1: landscape cards scrolling LEFT
 *  - Row 2: portrait cards scrolling RIGHT
 * Continuously animated marquee, pauses on hover.
 */
function MarqueeImage({
  src,
  alt,
  color,
  category,
  shape,
}: {
  src: string;
  alt: string;
  color: string;
  category: string;
  shape: "landscape" | "portrait";
}) {
  const [err, setErr] = useState(false);
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl border border-border bg-white ${
        shape === "landscape" ? "h-32 w-44" : "h-44 w-32"
      }`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${color}22, ${color}55), #f4f4f1`,
        }}
      />
      {!err && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setErr(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <span
        className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white"
        style={{ backgroundColor: `${color}cc` }}
      >
        {category}
      </span>
    </div>
  );
}

export function HeroMarquee() {
  const { content } = useContent();
  const projects = content.projects;
  if (!projects || projects.length === 0) return null;
  // duplicate the set for a seamless loop
  const loop = [...projects, ...projects];
  const loop2 = [...projects.slice().reverse(), ...projects.slice().reverse()];

  return (
    <div className="marquee-pause flex flex-col gap-4">
      {/* Row 1 — landscape, scrolling left */}
      <div className="overflow-hidden mask-fade-x">
        <div className="marquee-track flex w-max gap-4 animate-marquee [--marquee-duration:34s]">
          {loop.map((p, i) => (
            <MarqueeImage
              key={`l-${i}`}
              src={p.image}
              alt={p.imageAlt}
              color={accents[p.accent]}
              category={p.category}
              shape="landscape"
            />
          ))}
        </div>
      </div>
      {/* Row 2 — portrait, scrolling right */}
      <div className="overflow-hidden mask-fade-x">
        <div className="marquee-track flex w-max gap-4 animate-marquee-reverse [--marquee-duration:40s]">
          {loop2.map((p, i) => (
            <MarqueeImage
              key={`p-${i}`}
              src={p.image}
              alt={p.imageAlt}
              color={accents[p.accent]}
              category={p.category}
              shape="portrait"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
