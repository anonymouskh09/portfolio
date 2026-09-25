"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

// Progress through the degree, based on the "YYYY – YYYY" period string
function degreeProgress(period: string) {
  const [start, end] = period.match(/\d{4}/g)?.map(Number) ?? [];
  if (!start || !end) return 0;
  const now = new Date();
  const elapsed = now.getFullYear() + now.getMonth() / 12 - start;
  return Math.max(0, Math.min(1, elapsed / (end - start)));
}

export function Education() {
  const progress = degreeProgress(education.period);

  return (
    <div>
      <SectionHeading
        id="education-heading"
        label="Education"
        title="Academic Foundation"
        subtitle="Computer science fundamentals powering modern engineering"
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal from="left">
          <GlassCard hover3d glow intensity={10} className="relative overflow-hidden border-cyan-500/20 !p-6 sm:!p-8">
            <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/15 blur-3xl" />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-400/30"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34,211,238,0.08)",
                  "0 0 40px rgba(34,211,238,0.22)",
                  "0 0 20px rgba(34,211,238,0.08)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-2xl shadow-lg shadow-cyan-500/30"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              aria-hidden
            >
              🎓
            </motion.div>
            <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
              {education.degree}
            </h3>
            <p className="mt-3 text-lg text-cyan-400">{education.university}</p>
            <p className="text-slate-400">{education.location}</p>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs uppercase tracking-wider text-slate-500">
                <span>{education.period}</span>
                <span suppressHydrationWarning>{Math.round(progress * 100)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: progress }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
                />
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <div>
          <Reveal>
            <h4 className="mb-6 font-display text-lg font-semibold text-white">
              Relevant Coursework
            </h4>
          </Reveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {education.coursework.map((course, i) => (
              <motion.li
                key={course}
                initial={{ opacity: 0, y: 30, rotateX: -40 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EASE }}
                style={{ transformPerspective: 800 }}
                whileHover={{ y: -4 }}
                className="group flex items-center gap-4 rounded-2xl border border-purple-500/20 bg-purple-500/[0.06] p-4 transition-colors hover:border-purple-400/40 hover:bg-purple-500/10"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-500/15 font-display text-sm font-bold text-purple-300 transition-transform duration-500 group-hover:rotate-12">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-purple-100 sm:text-base">{course}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
