"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/layout/MagneticButton";
import { HeroMarquee } from "./HeroMarquee";
import { useContent } from "@/components/layout/ContentProvider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const chipColors = ["#ff6b35", "#2d5bff", "#9b51e0"];

export function Hero() {
  const { content } = useContent();
  const { hero } = content;

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center px-5 pt-24 pb-16 sm:px-8 lg:pt-28"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid w-full max-w-[1400px] gap-10 lg:grid-cols-12 lg:gap-8"
      >
        {/* Left column — content */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
          <motion.div variants={item} className="flex items-center gap-2.5">
            <span className="inline-flex h-2 w-2 rounded-full bg-orange animate-soft-pulse" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {hero.label}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 max-w-[13ch] font-display text-[12vw] font-bold leading-[0.92] tracking-[-0.03em] sm:text-[9vw] lg:max-w-[12ch] lg:text-[6.6vw] xl:text-[6rem]"
          >
            {hero.headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < hero.headingLines.length - 1 ? <br /> : null}
                {i === hero.headingLines.length - 1 && hero.highlight ? (
                  <>
                    {" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 text-white">
                        {hero.highlight}
                      </span>
                      <span className="absolute inset-0 -rotate-1 rounded-[1.2rem] bg-orange" />
                    </span>
                  </>
                ) : null}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg"
          >
            {hero.paragraph}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href="#work"
              className="group items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background"
            >
              {hero.ctaPrimary}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              strength={0.25}
              className="group items-center gap-2 rounded-full border border-border bg-white/70 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-orange" />
              {hero.ctaSecondary}
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {hero.chips.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="inline-flex h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: chipColors[i % chipColors.length] }}
                />
                <span className="text-sm font-medium text-foreground">{c}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — animated portfolio image showcase (two shapes) */}
        <div className="mt-6 lg:col-span-5 lg:mt-0 xl:col-span-5">
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="lg:sticky lg:top-24"
          >
            <HeroMarquee />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.div>

      <Link
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 lg:hidden"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </Link>
    </section>
  );
}
