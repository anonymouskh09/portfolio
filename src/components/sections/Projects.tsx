"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  projects,
  projectFilters,
  type ProjectCategory,
} from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const grid = gridRef.current;
    const scroller = document.getElementById("scroll-container");
    if (!grid || !scroller) return;

    const cards = grid.querySelectorAll("[data-project-card]");
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              scroller,
              start: "top 88%",
            },
          }
        );
      });
    }, grid);

    return () => ctx.revert();
  }, [filter]);

  return (
    <div>
      <SectionHeading
        label="Projects"
        title="Featured Work"
        subtitle="Premium digital products built for real-world impact"
      />

      <div className="mb-10 flex flex-wrap gap-3">
        {projectFilters.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              filter === cat
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                : "border border-white/10 bg-white/5 text-slate-400 hover:border-cyan-500/30 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        ref={gridRef}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.title}
              data-project-card
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 opacity-0 backdrop-blur-sm"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className={`relative h-48 bg-gradient-to-br ${project.gradient} p-6`}
              >
                <div className="absolute inset-0 cyber-grid opacity-50" />
                <div className="relative flex h-full flex-col justify-between">
                  <span className="w-fit rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-cyan-300 backdrop-blur-sm">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl transition hover:scale-105"
                  >
                    View Project →
                  </a>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-400 hover:underline"
                  >
                    {project.url.replace("https://", "")}
                  </a>
                  {"secondaryUrl" in project && project.secondaryUrl && (
                    <a
                      href={project.secondaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-400 hover:underline"
                    >
                      aurumnode.com
                    </a>
                  )}
                </div>
              </div>

              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.2)]" />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
