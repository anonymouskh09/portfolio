"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  projects,
  projectFilters,
  type ProjectCategory,
} from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div>
      <SectionHeading
        id="projects-heading"
        label="Projects"
        title="Featured Work"
        subtitle="Premium digital products built for real-world impact"
      />

      {/* Filters scroll sideways on small screens instead of wrapping into a wall of chips */}
      <div
        className="-mx-4 mb-10 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-sm">
          {projectFilters.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 ${
                filter === cat ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {filter === cat && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1400 }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, y: 60, rotateX: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
            >
              <GlassCard hover3d intensity={8} className="group h-full overflow-hidden !p-0">
                <div className={`relative h-44 overflow-hidden bg-gradient-to-br sm:h-52 ${project.gradient}`}>
                  <div className="cyber-grid absolute inset-0 opacity-60 transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div
                    aria-hidden
                    className="absolute -right-4 -top-6 font-display text-[8rem] font-bold leading-none text-white/[0.06] transition-transform duration-700 ease-out group-hover:-translate-x-4 group-hover:translate-y-2"
                  >
                    {String(projects.indexOf(project) + 1).padStart(2, "0")}
                  </div>
                  {/* Mini browser chrome */}
                  <div className="absolute left-6 right-6 top-14 rounded-t-lg border border-white/10 bg-black/30 backdrop-blur-sm transition-transform duration-700 ease-out group-hover:-translate-y-2 sm:top-16">
                    <div className="flex items-center gap-1.5 px-3 py-2">
                      <span className="h-2 w-2 rounded-full bg-white/30" />
                      <span className="h-2 w-2 rounded-full bg-white/30" />
                      <span className="h-2 w-2 rounded-full bg-white/30" />
                      <span className="ml-2 truncate rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/60">
                        {project.url.replace("https://", "")}
                      </span>
                    </div>
                    <div className="space-y-2 px-3 pb-8 pt-1">
                      <div className="h-2 w-3/4 rounded bg-white/20" />
                      <div className="h-2 w-1/2 rounded bg-white/10" />
                    </div>
                  </div>
                  <span className="absolute left-6 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-cyan-300 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-400/10"
                    >
                      Visit site
                      <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                        ↗
                      </span>
                    </a>
                    {"secondaryUrl" in project && project.secondaryUrl && (
                      <a
                        href={project.secondaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-300 hover:underline"
                      >
                        {project.secondaryUrl.replace("https://", "")} ↗
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
