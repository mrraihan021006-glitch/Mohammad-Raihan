"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop custom cursor: a small dot + a larger ring that lags behind.
 * Hidden on touch devices via CSS.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotEl.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, input, textarea, select, [data-cursor]"
      );
      ringEl.style.width = interactive ? "56px" : "36px";
      ringEl.style.height = interactive ? "56px" : "36px";
      ringEl.style.background = interactive
        ? "rgba(23,23,23,0.06)"
        : "transparent";
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ringEl.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot hidden md:block" />
      <div ref={ring} className="cursor-ring hidden md:block" />
    </>
  );
}
