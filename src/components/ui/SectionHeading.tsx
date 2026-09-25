"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type SectionHeadingProps = {
  label: string;
  title: string;
  subtitle?: string;
  id?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  title,
  subtitle,
  id,
  align = "left",
}: SectionHeadingProps) {
  const words = title.split(" ");
  const centered = align === "center";

  return (
    <div className={`mb-10 md:mb-16 ${centered ? "text-center" : ""}`}>
      <motion.div
        className={`mb-4 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <motion.span
          className="h-px w-10 origin-left bg-gradient-to-r from-cyan-400 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        />
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {label}
        </span>
      </motion.div>

      {/* Observe the heading itself — the words start clipped by their masks,
          so they'd never register as in view on their own */}
      <motion.h2
        id={id}
        className="font-display text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-white"
        style={{ perspective: 800 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-top">
            <motion.span
              className="inline-block origin-bottom"
              variants={{
                hidden: { y: "110%", rotateX: -80, opacity: 0 },
                visible: {
                  y: "0%",
                  rotateX: 0,
                  opacity: 1,
                  transition: { duration: 0.9, ease: EASE },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={`mt-5 max-w-2xl text-base text-slate-400 md:text-lg ${centered ? "mx-auto" : ""}`}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
