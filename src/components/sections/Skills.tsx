"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const EASE = [0.16, 1, 0.3, 1] as const;

const accents = [
  "from-cyan-400 to-blue-500",
  "from-purple-400 to-fuchsia-500",
  "from-emerald-400 to-teal-500",
  "from-pink-400 to-rose-500",
  "from-amber-400 to-orange-500",
  "from-blue-400 to-indigo-500",
];

const allSkills = skillCategories.flatMap((c) => c.skills);

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? [...allSkills].reverse() : allSkills;
  return (
    <div className="marquee overflow-hidden py-2">
      <div
        className="marquee-track flex w-max gap-3"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {[...items, ...items].map((skill, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <div>
      <SectionHeading
        id="skills-heading"
        label="Skills"
        title="Technical Arsenal"
        subtitle="Full-stack expertise across modern web ecosystems"
      />

      <div
        className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        style={{ perspective: 1400 }}
      >
        {skillCategories.map((category, i) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 60, rotateY: i % 2 ? 25 : -25, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: (i % 3) * 0.1, ease: EASE }}
          >
            <GlassCard hover3d glow className="h-full">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`h-8 w-1.5 rounded-full bg-gradient-to-b ${accents[i % accents.length]}`}
                    aria-hidden
                  />
                  <h3 className="font-display text-lg font-semibold text-white">
                    {category.title}
                  </h3>
                </div>
                <span className="font-display text-3xl font-bold text-white/10 transition-colors duration-500 group-hover/card:text-cyan-400/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + j * 0.05, duration: 0.4 }}
                    className="rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-sm text-slate-300 transition-colors duration-300 group-hover/card:border-cyan-500/30 group-hover/card:text-cyan-100"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="-mx-4 mt-14 space-y-3 sm:-mx-6 md:-mx-10 lg:mx-0" aria-hidden>
        <Marquee />
        <Marquee reverse />
      </div>
    </div>
  );
}
