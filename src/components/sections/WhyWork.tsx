"use client";

import { motion } from "framer-motion";
import { Reveal, SplitText } from "@/components/layout/Reveal";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { useContent } from "@/components/layout/ContentProvider";
import { accents } from "@/data/site";

export function WhyWork() {
  const { content } = useContent();
  const advantages = content.advantages;
  return (
    <section id="why" className="relative px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="06" accent="orange">
                The Difference
              </SectionLabel>
            </Reveal>
            <div className="mt-6 max-w-3xl">
              <SplitText
                as="h2"
                text="Good Design. Clear Thinking. Real Purpose."
                className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a, i) => {
            const color = accents[a.accent];
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: (i % 4) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.16)]"
              >
                <div
                  className="h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16"
                  style={{ backgroundColor: color }}
                />
                <div className="mt-5 flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold leading-snug tracking-tight">
                    {a.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {a.description}
                </p>
                <span className="mt-5 block font-display text-sm font-bold text-muted-foreground/40">
                  0{i + 1}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
