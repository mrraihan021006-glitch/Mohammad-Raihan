"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magnetic wrapper — applies a subtle translate toward the cursor.
 */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  };

  if (href) {
    return (
      <a
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        href={href}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={cn("magnetic inline-flex", className)}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      ref={ref as unknown as React.Ref<HTMLButtonElement>}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onClick={onClick}
      className={cn("magnetic inline-flex", className)}
    >
      {children}
    </button>
  );
}
