"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "h2" | "h3" | "p";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/** Split-text line reveal for headings. */
export function SplitText({
  text,
  className,
  delay = 0,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h2" | "h3" | "h1" | "p" | "div";
}) {
  const words = text.split(" ");
  const Tag = as;
  return (
    <Tag className={className} style={{ display: "block" }}>
      {words.map((word, i) => (
        <span
          key={i}
          className="reveal-line align-bottom"
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.05,
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
