"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

gsap.registerPlugin(ScrollTrigger);

const aboutLines = [
  "Mazhar is a results-driven Full-Stack Web Developer who evolved from a front-end specialist into a complete full-stack engineer.",
  "He builds end-to-end digital solutions, including pixel-perfect React interfaces, backend APIs, MySQL database systems, Shopify stores, server migrations, and automation pipelines using n8n and 11Labs.",
];

const codeSnippets = [
  { lang: "React", code: "const App = () => <Build />;" },
  { lang: "PHP", code: "<?php // scalable API" },
  { lang: "Node", code: "export default server;" },
];

export function About() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    const scroller = document.getElementById("scroll-container");
    if (!el || !scroller) return;

    const lines = el.querySelectorAll("[data-line]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 70%",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <SectionHeading
        label="About Me"
        title="Engineering Digital Excellence"
        subtitle="From front-end craft to full-stack mastery"
      />

      <div className="grid gap-10 lg:grid-cols-5">
        <div ref={textRef} className="space-y-6 lg:col-span-3">
          {aboutLines.map((line, i) => (
            <p
              key={i}
              data-line
              className="text-lg leading-relaxed text-slate-300 opacity-0"
            >
              {line}
            </p>
          ))}
        </div>

        <div className="relative lg:col-span-2">
          {codeSnippets.map((snippet, i) => (
            <motion.div
              key={snippet.lang}
              className="absolute"
              style={{
                top: `${i * 28}%`,
                right: `${i * 8}%`,
                zIndex: 3 - i,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 0.2 + i * 0.15 },
                y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <GlassCard className="!p-4 font-mono text-xs" glow>
                <span className="text-cyan-400">{snippet.lang}</span>
                <pre className="mt-2 text-slate-400">{snippet.code}</pre>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
