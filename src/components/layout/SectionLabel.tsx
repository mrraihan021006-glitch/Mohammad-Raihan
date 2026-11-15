"use client";

import { accents, type AccentColor } from "@/data/site";
import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  children,
  accent = "orange",
  className,
}: {
  index: string;
  children: React.ReactNode;
  accent?: AccentColor;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
        className
      )}
    >
      <span
        className="inline-flex h-7 items-center rounded-full px-3 font-display text-[11px] font-semibold tracking-wider text-white"
        style={{ backgroundColor: accents[accent] }}
      >
        {index}
      </span>
      <span>{children}</span>
    </div>
  );
}
