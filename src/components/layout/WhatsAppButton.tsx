"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/components/layout/ContentProvider";

/** WhatsApp glyph (brand mark). */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.41L3.2 28.8l6.55-1.72a12.74 12.74 0 0 0 6.25 1.59h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05A12.72 12.72 0 0 0 16.003 3.2zm0 23.04h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.06 1.07 1.08-3.96-.25-.4a10.58 10.58 0 0 1-1.62-5.64c0-5.86 4.77-10.62 10.64-10.62 2.84 0 5.51 1.11 7.52 3.12a10.55 10.55 0 0 1 3.11 7.51c0 5.86-4.77 10.62-10.62 10.62zm5.83-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55-.18-.01-.4-.01-.61-.01-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37z" />
    </svg>
  );
}

/** Normalize a local number to a wa.me link. */
function waLink(number: string) {
  const digits = (number || "").replace(/[^\d]/g, "");
  // Bangladesh: strip leading 0, prefix 880. Otherwise use as-is.
  const intl = digits.startsWith("0") ? "880" + digits.slice(1) : digits;
  return `https://wa.me/${intl}`;
}

export function WhatsAppButton() {
  const { content } = useContent();
  const number = content.site.whatsapp;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!number) return null;

  return (
    <AnimatePresence>
      <motion.a
        href={waLink(number)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp: ${number}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: show ? 1 : 0, opacity: show ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-shadow hover:shadow-[0_16px_36px_-8px_rgba(37,211,102,0.75)] sm:bottom-7 sm:right-7"
      >
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[160px] sm:inline">
          Chat with me
        </span>
        {/* ping ring */}
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-60 [animation:wa-ping_2s_ease-out_infinite]" />
        <style>{`@keyframes wa-ping{0%{transform:scale(1);opacity:.5}70%,100%{transform:scale(1.8);opacity:0}}`}</style>
      </motion.a>
    </AnimatePresence>
  );
}
