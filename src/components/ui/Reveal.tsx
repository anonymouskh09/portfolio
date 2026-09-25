"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Direction the element travels in from */
  from?: "up" | "left" | "right" | "scale";
  as?: "div" | "li" | "article";
};

const offsets = {
  up: { y: 48, x: 0, scale: 1, rotateX: 12 },
  left: { x: -60, y: 0, scale: 1, rotateX: 0 },
  right: { x: 60, y: 0, scale: 1, rotateX: 0 },
  scale: { x: 0, y: 24, scale: 0.92, rotateX: 0 },
};

/** Fades, de-blurs and lifts content into place once it scrolls into view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const o = offsets[from];
  const variants: Variants = {
    hidden: { opacity: 0, filter: "blur(8px)", ...o },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.9, delay, ease: EASE },
    },
  };
  const Component = motion[as];

  return (
    <Component
      className={className}
      style={{ transformPerspective: 1000 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      variants={variants}
    >
      {children}
    </Component>
  );
}
