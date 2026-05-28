"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  label: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-10 md:mb-14">
      <motion.span
        className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {label}
      </motion.span>
      <motion.h2
        className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-4 max-w-2xl text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
