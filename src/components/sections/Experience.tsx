"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Timeline line draws itself as you scroll, with a glowing head riding its tip
  useEffect(() => {
    const timeline = timelineRef.current;
    const line = lineRef.current;
    const dot = dotRef.current;
    const scroller = document.getElementById("scroll-container");
    if (!timeline || !line || !dot || !scroller) return;

    const ctx = gsap.context(() => {
      const st = {
        trigger: timeline,
        scroller,
        start: "top 70%",
        end: "bottom 60%",
        scrub: 0.8,
      };
      gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: st });
      gsap.fromTo(dot, { top: "0%" }, { top: "100%", ease: "none", scrollTrigger: st });
    }, timeline);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <SectionHeading
        id="experience-heading"
        label="Experience"
        title="Professional Journey"
        subtitle="Building products that scale across industries"
      />

      <div ref={timelineRef} className="relative pl-8 md:pl-14">
        <div className="absolute left-3 top-0 h-full w-px bg-white/10 md:left-5" aria-hidden />
        <div
          ref={lineRef}
          className="timeline-line absolute left-3 top-0 h-full w-px origin-top md:left-5"
          style={{ transform: "scaleY(0)" }}
          aria-hidden
        />
        <div
          ref={dotRef}
          className="absolute left-3 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_6px_rgba(34,211,238,0.6)] md:left-5"
          aria-hidden
        />

        <div className="space-y-10 md:space-y-14">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              className="relative"
              style={{ perspective: 1200 }}
              initial={{ opacity: 0, x: 80, rotateY: -20 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: i * 0.1, ease: EASE }}
            >
              <motion.div
                className="absolute -left-5 top-7 ml-px grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full border-2 border-cyan-400 bg-[#030712] md:-left-9"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
                aria-hidden
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </motion.div>

              <GlassCard hover3d glow intensity={5} className="md:!p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white sm:text-xl md:text-2xl">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm text-cyan-400 sm:text-base">
                      {exp.company} — {exp.location}
                    </p>
                  </div>
                  <span className="w-fit shrink-0 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-xs text-cyan-200 sm:text-sm">
                    {exp.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {exp.points.map((point, j) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.07, duration: 0.5, ease: EASE }}
                      className="flex gap-3 text-sm leading-relaxed text-slate-300 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:content-[''] sm:text-base"
                    >
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
