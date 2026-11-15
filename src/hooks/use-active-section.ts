"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "home",
  "about",
  "work",
  "services",
  "process",
  "tools",
  "why",
  "social",
  "contact",
];

/** Returns the id of the section currently in view. */
export function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visible.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          });
          // pick the section with the largest visible ratio
          let best = "";
          let bestRatio = 0;
          visible.forEach((ratio, sid) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = sid;
            }
          });
          if (bestRatio > 0) setActive(best);
        },
        {
          // section is "active" when its top passes ~40% of viewport
          rootMargin: "-40% 0px -50% 0px",
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}
