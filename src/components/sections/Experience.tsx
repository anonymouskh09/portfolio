"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const line = lineRef.current;
    const scroller = document.getElementById("scroll-container");
    if (!timeline || !line || !scroller) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timeline,
            scroller,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );

      const cards = timeline.querySelectorAll("[data-exp-card]");
      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { x: fromLeft ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              scroller,
              start: "top 80%",
            },
          }
        );
      });
    }, timeline);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <SectionHeading
        label="Experience"
        title="Professional Journey"
        subtitle="Building products that scale across industries"
      />

      <div ref={timelineRef} className="relative pl-8 md:pl-12">
        <div
          ref={lineRef}
          className="timeline-line absolute left-3 top-0 h-full w-0.5 origin-top md:left-5"
          style={{ transform: "scaleY(0)" }}
        />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <div
              key={exp.role}
              data-exp-card
              className="relative opacity-0"
            >
              <div className="absolute -left-8 top-6 h-4 w-4 rounded-full border-2 border-cyan-400 bg-[#030712] shadow-[0_0_12px_rgba(34,211,238,0.6)] md:-left-12" />

              <GlassCard glow className="ml-4 md:ml-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-cyan-400">
                      {exp.company} — {exp.location}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-400">
                    {exp.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {exp.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-slate-300 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:content-['']"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
