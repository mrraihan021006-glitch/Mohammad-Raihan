"use client";

import { motion } from "framer-motion";
import { Reveal, SplitText } from "@/components/layout/Reveal";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { useContent } from "@/components/layout/ContentProvider";
import { accents } from "@/data/site";

export function Process() {
  const { content } = useContent();
  const processSteps = content.process;
  return (
    <section id="process" className="relative px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="04" accent="grape">
                How I Work
              </SectionLabel>
            </Reveal>
            <div className="mt-6 max-w-2xl">
              <SplitText
                as="h2"
                text="From First Idea to Final Design."
                className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]"
              />
            </div>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              A clear, structured process that turns raw ideas into polished,
              production-ready design — every step intentional.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="relative mt-10">
          {/* vertical line */}
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-3 md:space-y-0">
            {processSteps.map((step, i) => {
              const color = accents[step.accent];
              const isRight = i % 2 === 1;
              return (
                <motion.div
                  key={step.index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isRight ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* node */}
                  <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <div
                      className="grid h-14 w-14 place-items-center rounded-full border-4 border-white font-display text-sm font-bold text-white shadow-sm"
                      style={{ backgroundColor: color }}
                    >
                      {step.index}
                    </div>
                  </div>
                  {/* card */}
                  <div
                    className={`flex-1 md:w-1/2 ${
                      isRight ? "md:pl-12" : "md:pr-12 md:text-right"
                    }`}
                  >
                    <div className="group rounded-2xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.18)]">
                      <h3 className="font-display text-xl font-bold tracking-tight">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
