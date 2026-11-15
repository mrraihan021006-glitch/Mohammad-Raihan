"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SplitText } from "@/components/layout/Reveal";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { useContent } from "@/components/layout/ContentProvider";
import { accents } from "@/data/site";

export function Social() {
  const { content } = useContent();
  const socials = content.socials;
  const site = content.site;
  return (
    <section id="social" className="relative px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="07" accent="electric">
                Let&apos;s Connect
              </SectionLabel>
            </Reveal>
            <div className="mt-6 max-w-2xl">
              <SplitText
                as="h2"
                text="Find Me Around the Internet."
                className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]"
              />
            </div>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Whether it&apos;s a project, a collaboration, or just a hello — my
              inbox and feeds are always open.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((s, i) => {
            const color = accents[s.accent];
            const disabled = !s.href;
            const Tag = disabled ? "div" : "a";
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: (i % 3) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Tag
                  {...(disabled ? {} : { href: s.href, target: "_blank", rel: "noopener noreferrer" })}
                  className={`group flex items-center justify-between rounded-2xl border border-border bg-white p-5 transition-all duration-300 ${
                    disabled
                      ? "cursor-default opacity-60"
                      : "hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.16)]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-full font-display text-sm font-bold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {s.name.charAt(0)}
                    </span>
                    <div>
                      <div className="font-display text-base font-bold tracking-tight">
                        {s.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {disabled ? "Link coming soon" : s.handle}
                      </div>
                    </div>
                  </div>
                  {!disabled && (
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--c)] group-hover:text-white"
                      style={{ ["--c" as string]: color }}
                    >
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  )}
                </Tag>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>Primary portfolio:</span>
            <a
              href={site.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              behance.net/mohammadraihan32
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
