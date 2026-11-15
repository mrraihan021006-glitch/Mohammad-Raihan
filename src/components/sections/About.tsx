"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal, SplitText } from "@/components/layout/Reveal";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { useContent } from "@/components/layout/ContentProvider";

function Stat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="border-t border-border pt-5"
    >
      <div className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {n}
        <span className="text-orange">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export function About() {
  const { content } = useContent();
  const { about, site } = content;

  return (
    <section id="about" className="relative px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <SectionLabel index="01" accent="orange">
            {about.label}
          </SectionLabel>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left — heading + text */}
          <div className="lg:col-span-7">
            <SplitText
              as="h2"
              className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]"
              text={about.heading}
            />
            <Reveal delay={0.15}>
              <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — personal image */}
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative mx-auto max-w-sm">
                {/* decorative accent shapes behind */}
                <div className="absolute -right-4 -top-4 h-full w-full rounded-3xl bg-orange/10 -rotate-2" />
                <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-electric/10 blur-2xl" />
                {/* image frame */}
                <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)]">
                  <img
                    src={site.personalImage}
                    alt={`${site.name} — ${site.profession}`}
                    className="aspect-[4/5] w-full object-cover"
                  />
                  {/* gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                  {/* name label */}
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                    <div>
                      <div className="font-display text-xl font-bold text-white">
                        {site.name}
                      </div>
                      <div className="text-sm text-white/80">
                        {site.profession}
                      </div>
                    </div>
                    <span className="rounded-full bg-lime px-3 py-1 text-[11px] font-semibold text-black">
                      {site.experience}
                    </span>
                  </div>
                </div>
                {/* floating availability badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-5 top-1/3 rounded-2xl border border-border bg-white px-4 py-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-lime animate-soft-pulse" />
                    <span className="text-xs font-semibold">Available</span>
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    For Projects
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Info cards — full width row */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {about.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex items-center justify-between rounded-2xl border border-border bg-white p-4 transition-colors hover:border-foreground/20"
            >
              <span className="font-display text-sm font-semibold tracking-tight">
                {card}
              </span>
              <span className="font-display text-xs font-bold text-muted-foreground transition-colors group-hover:text-orange">
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {about.stats.map((s, i) => (
            <Stat
              key={i}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
