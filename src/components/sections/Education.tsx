"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

gsap.registerPlugin(ScrollTrigger);

export function Education() {
  const cardRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const pills = pillsRef.current;
    const scroller = document.getElementById("scroll-container");
    if (!card || !scroller) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            scroller,
            start: "top 75%",
          },
        }
      );

      if (pills) {
        const pillEls = pills.querySelectorAll("[data-pill]");
        gsap.fromTo(
          pillEls,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: pills,
              scroller,
              start: "top 80%",
            },
          }
        );
      }
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <SectionHeading
        label="Education"
        title="Academic Foundation"
        subtitle="Computer science fundamentals powering modern engineering"
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div ref={cardRef} className="opacity-0">
          <GlassCard
            glow
            className="relative overflow-hidden border-cyan-500/20 !p-8"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
            <motion.div
              className="absolute inset-0 rounded-2xl border border-cyan-400/30"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34,211,238,0.1)",
                  "0 0 40px rgba(34,211,238,0.25)",
                  "0 0 20px rgba(34,211,238,0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
              {education.degree}
            </h3>
            <p className="mt-3 text-lg text-cyan-400">
              {education.university}
            </p>
            <p className="text-slate-400">{education.location}</p>
            <p className="mt-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {education.period}
            </p>
          </GlassCard>
        </div>

        <div>
          <h4 className="mb-6 font-display text-lg font-semibold text-white">
            Relevant Coursework
          </h4>
          <div ref={pillsRef} className="flex flex-wrap gap-3">
            {education.coursework.map((course) => (
              <span
                key={course}
                data-pill
                className="rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2.5 text-sm text-purple-200 opacity-0"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
