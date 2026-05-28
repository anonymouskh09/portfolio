"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const scroller = document.getElementById("scroll-container");
    if (!grid || !scroller) return;

    const cards = grid.querySelectorAll("[data-skill-card]");
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          {
            x: fromLeft ? -100 : 100,
            opacity: 0,
            rotateY: fromLeft ? -15 : 15,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              scroller,
              start: "top 85%",
            },
          }
        );
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <SectionHeading
        label="Skills"
        title="Technical Arsenal"
        subtitle="Full-stack expertise across modern web ecosystems"
      />

      <div
        ref={gridRef}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        style={{ perspective: "1200px" }}
      >
        {skillCategories.map((category, i) => (
          <div key={category.title} data-skill-card className="opacity-0">
            <GlassCard hover3d glow className="h-full group">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-white">
                  {category.title}
                </h3>
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-cyan-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-sm text-slate-300 transition group-hover:border-cyan-500/30 group-hover:text-cyan-100"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
}
