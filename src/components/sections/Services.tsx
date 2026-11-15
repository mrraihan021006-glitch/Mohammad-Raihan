"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Reveal, SplitText } from "@/components/layout/Reveal";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { useContent } from "@/components/layout/ContentProvider";
import { type Service } from "@/data/services";
import { accents } from "@/data/site";

function ServiceShape({ shape, color }: { shape: Service["shape"]; color: string }) {
  const common = "h-12 w-12";
  switch (shape) {
    case "circle":
      return <div className={`${common} rounded-full`} style={{ backgroundColor: color }} />;
    case "square":
      return <div className={`${common} rounded-xl rotate-12`} style={{ backgroundColor: color }} />;
    case "triangle":
      return (
        <div
          className={common}
          style={{
            width: 0,
            height: 0,
            borderLeft: "24px solid transparent",
            borderRight: "24px solid transparent",
            borderBottom: `42px solid ${color}`,
          }}
        />
      );
    case "ring":
      return <div className={`${common} rounded-full border-4`} style={{ borderColor: color }} />;
    case "blob":
      return (
        <div
          className={`${common}`}
          style={{
            backgroundColor: color,
            borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
          }}
        />
      );
    case "diamond":
      return <div className={`${common} rotate-45 rounded-md`} style={{ backgroundColor: color }} />;
    default:
      return null;
  }
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const color = accents[service.accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)]"
    >
      {/* accent wash on hover */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: color }}
      />
      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
            <ServiceShape shape={service.shape} color={color} />
          </div>
          <span className="font-display text-sm font-bold text-muted-foreground">
            {service.index}
          </span>
        </div>
        <span className="font-display text-sm font-bold text-muted-foreground transition-colors group-hover:text-foreground">
          0{index + 1}
        </span>
      </div>

      <h3 className="relative mt-7 font-display text-2xl font-bold tracking-tight">
        {service.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      {/* items list — revealed on hover */}
      <div className="relative mt-6 grid max-h-0 grid-cols-1 gap-2 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-64 group-hover:opacity-100">
        {service.items.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-foreground">
            <span
              className="inline-flex h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            {item}
          </div>
        ))}
      </div>

      <div className="relative mt-7 flex items-center justify-between border-t border-border pt-5">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Service {service.index}
        </span>
        <div className="flex items-center gap-2">
          <span
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--c)] group-hover:text-white"
            style={{ ["--c" as string]: color }}
          >
            <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
          <span
            className="grid h-9 w-9 place-items-center rounded-full text-white transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: color }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const { content } = useContent();
  const services = content.services;
  return (
    <section id="services" className="relative px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="02" accent="electric">
                What I Do
              </SectionLabel>
            </Reveal>
            <div className="mt-6 max-w-2xl">
              <SplitText
                as="h2"
                text="Creative Solutions for Growing Brands."
                className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]"
              />
            </div>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              A full range of design services covering identity, social,
              advertising, product, and print — built to help brands grow with
              clarity and consistency.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.index} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
