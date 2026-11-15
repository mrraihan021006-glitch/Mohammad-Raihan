"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal, SplitText } from "@/components/layout/Reveal";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { useContent } from "@/components/layout/ContentProvider";
import { accents } from "@/data/site";

export function Tools() {
  const { content } = useContent();
  const tools = content.tools;
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="tools" className="relative py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="05" accent="lime">
                My Toolkit
              </SectionLabel>
            </Reveal>
            <div className="mt-6 max-w-2xl">
              <SplitText
                as="h2"
                text="Tools Behind the Creativity."
                className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]"
              />
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => scrollBy(-1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-foreground transition-colors hover:border-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => scrollBy(1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-foreground transition-colors hover:border-foreground"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Horizontal scroller — full bleed */}
      <Reveal delay={0.05}>
        <div
          ref={scroller}
          className="scroll-area-custom mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:px-8 no-scrollbar"
        >
          {/* spacer to align with max width */}
          <div className="hidden shrink-0 lg:block lg:w-[max(0px,calc((100vw-1400px)/2-0px))]" />
          {tools.map((t, i) => {
            const color = accents[t.accent];
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative flex h-64 w-72 shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.16)]"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ backgroundColor: color }}
                />
                <div className="relative flex items-start justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {t.category}
                  </span>
                  <span className="font-display text-sm font-bold text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <div className="relative">
                  <div
                    className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl font-display text-2xl font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {t.icon ? (
                      <img
                        src={t.icon}
                        alt={t.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      t.glyph
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">
                    {t.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
          <div className="hidden shrink-0 lg:block lg:w-[max(0px,calc((100vw-1400px)/2-0px))]" />
        </div>
      </Reveal>

      {/* Marquee strip */}
      <div className="mt-10 overflow-hidden border-y border-border py-4">
        <div className="flex w-max animate-marquee gap-8 [--marquee-duration:34s]">
          {[...tools, ...tools, ...tools].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-3 font-display text-xl font-semibold tracking-tight text-muted-foreground"
            >
              {t.name}
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accents[t.accent] }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
