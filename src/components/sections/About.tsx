"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const aboutLines = [
  "Mazhar is a results-driven Full-Stack Web Developer who evolved from a front-end specialist into a complete full-stack engineer.",
  "He builds end-to-end digital solutions, including pixel-perfect React interfaces, backend APIs, MySQL database systems, Shopify stores, server migrations, and automation pipelines using n8n and 11Labs.",
];

const highlights = [
  { icon: "⚡", title: "Performance", text: "Core Web Vitals & Lighthouse tuned" },
  { icon: "🧩", title: "Full-Stack", text: "React · PHP · Node.js · MySQL" },
  { icon: "🛒", title: "E-Commerce", text: "Shopify & custom storefronts" },
  { icon: "🤖", title: "Automation", text: "n8n workflows & 11Labs APIs" },
];

const codeLines = [
  [{ c: "text-purple-400", t: "const " }, { c: "text-cyan-300", t: "developer" }, { c: "text-slate-400", t: " = {" }],
  [{ c: "text-slate-300", t: "  name: " }, { c: "text-emerald-300", t: "'Mazhar Rehman'" }, { c: "text-slate-400", t: "," }],
  [{ c: "text-slate-300", t: "  stack: [" }, { c: "text-emerald-300", t: "'React', 'Node', 'PHP'" }, { c: "text-slate-300", t: "]," }],
  [{ c: "text-slate-300", t: "  focus: " }, { c: "text-emerald-300", t: "'fast & scalable'" }, { c: "text-slate-400", t: "," }],
  [{ c: "text-slate-300", t: "  ship: " }, { c: "text-purple-400", t: "async " }, { c: "text-slate-400", t: "() => " }, { c: "text-cyan-300", t: "impact" }, { c: "text-slate-400", t: "," }],
  [{ c: "text-slate-400", t: "};" }],
];

export function About() {
  const textRef = useRef<HTMLDivElement>(null);

  // Words brighten one by one as the paragraph scrolls through the viewport
  useEffect(() => {
    const el = textRef.current;
    const scroller = document.getElementById("scroll-container");
    if (!el || !scroller) return;

    const words = el.querySelectorAll("[data-word]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <SectionHeading
        id="about-heading"
        label="About Me"
        title="Engineering Digital Excellence"
        subtitle="From front-end craft to full-stack mastery"
      />

      <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-3">
          <div ref={textRef} className="space-y-6">
            {aboutLines.map((line, i) => (
              <p
                key={i}
                className="text-xl leading-relaxed text-white sm:text-2xl md:text-[1.7rem] md:leading-snug"
              >
                {line.split(" ").map((w, j) => (
                  <span key={j} data-word className="inline">
                    {w}{" "}
                  </span>
                ))}
              </p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08} from="scale">
                <GlassCard hover3d intensity={8} className="h-full !p-4 sm:!p-5">
                  <div className="text-2xl" aria-hidden>
                    {h.icon}
                  </div>
                  <h3 className="mt-3 font-display text-sm font-semibold text-white sm:text-base">
                    {h.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">{h.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal from="right" className="lg:col-span-2">
          <GlassCard hover3d glow intensity={12} className="!p-0 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-mono text-xs text-slate-500">developer.ts</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-7 sm:text-[13px]">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  className="flex"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                >
                  <span className="mr-4 w-4 select-none text-right text-slate-600">{i + 1}</span>
                  <code>
                    {line.map((tok, j) => (
                      <span key={j} className={tok.c}>
                        {tok.t}
                      </span>
                    ))}
                  </code>
                </motion.div>
              ))}
              <motion.span
                className="ml-8 inline-block h-4 w-2 translate-y-0.5 bg-cyan-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </pre>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
}
