"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo, projects } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";

const HeroScene = dynamic(
  () =>
    import("@/components/three/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => null }
);

const EASE = [0.16, 1, 0.3, 1] as const;

const roles = [
  "Full-Stack Web Developer",
  "React & Node.js Engineer",
  "Shopify & E-Commerce Expert",
  "Automation Builder",
];

// Derived from data.ts so the numbers stay honest as the portfolio grows
const stats = [
  { value: `${Math.max(1, new Date().getFullYear() - 2023)}+`, label: "Years building" },
  { value: `${projects.length + 1}+`, label: "Sites shipped" },
  { value: "3+", label: "Countries served" },
];

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          className="inline-block whitespace-nowrap"
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* 2D only: Chrome paints nothing for background-clip:text under a 3D transform */}
          <span className="text-gradient">{roles[index]}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero({ ready = true }: { ready?: boolean }) {
  const isMobile = useIsMobile();
  const [first, ...rest] = personalInfo.name.split(" ");
  const last = rest.join(" ");

  const letters = (word: string, offset: number) =>
    word.split("").map((char, i) => (
      <motion.span
        key={`${word}-${i}`}
        className="inline-block origin-bottom"
        initial={{ y: "110%", rotateX: -90, opacity: 0 }}
        animate={{ y: "0%", rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.25 + (offset + i) * 0.045, ease: EASE }}
      >
        {char}
      </motion.span>
    ));

  return (
    <div className="relative grid w-full items-center gap-6 pt-6 lg:min-h-[80vh] lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pt-0">
      {/* 3D perspective floor */}
      <div
        aria-hidden
        className="perspective-grid pointer-events-none absolute -bottom-40 left-1/2 h-[60vh] w-[200vw] -translate-x-1/2 opacity-40"
      />

      {/* 3D scene — sits on top on phones, to the right on desktop */}
      <motion.div
        className="relative order-first mx-auto aspect-square w-full max-w-[340px] sm:max-w-[420px] lg:order-last lg:max-w-none lg:aspect-auto lg:h-[min(640px,75vh)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
        aria-hidden
      >
        <HeroScene compact={isMobile} />
      </motion.div>

      {/* Keyed on `ready` so the intro choreography plays after the loader, not behind it */}
      <div key={ready ? "ready" : "loading"} className="relative z-10 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1.5 text-xs text-emerald-300 backdrop-blur-sm sm:text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for work · {personalInfo.location}
        </motion.div>

        <h1 id="hero-heading" className="sr-only">
          {personalInfo.name} — {personalInfo.title}
        </h1>

        <div
          aria-hidden
          className="font-display text-[clamp(2.75rem,11vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          style={{ perspective: 800 }}
        >
          <span className="block overflow-hidden pb-2">{letters(first, 0)}</span>
          <span className="block overflow-hidden pb-2">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
              {letters(last, first.length)}
            </span>
          </span>
        </div>

        <motion.p
          className="mt-4 font-display text-lg text-slate-300 sm:text-2xl md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
        >
          <RotatingRole />
        </motion.p>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg lg:mx-0"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
        >
          <Button href="#projects" variant="primary" className="w-full sm:w-auto">
            View Projects <span aria-hidden>→</span>
          </Button>
          <Button href="#contact" variant="outline" className="w-full sm:w-auto">
            Contact Me
          </Button>
          <Button href={personalInfo.cvUrl} variant="ghost" className="w-full sm:w-auto">
            Download CV ↓
          </Button>
        </motion.div>

        <motion.dl
          className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6 lg:mx-0"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 1.4 } } }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</dd>
              <dd className="mt-1 text-[11px] uppercase tracking-wider text-slate-500 sm:text-xs">
                {s.label}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        className="absolute -bottom-16 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-500 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        aria-label="Scroll to About section"
      >
        Scroll
        <span className="flex h-9 w-5 justify-center rounded-full border border-slate-600 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-cyan-400"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </div>
  );
}
