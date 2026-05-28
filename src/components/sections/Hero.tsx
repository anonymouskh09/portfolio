"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";

const HeroScene = dynamic(
  () =>
    import("@/components/three/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => null }
);

export function Hero() {
  const isMobile = useIsMobile();
  const name = personalInfo.name;

  return (
    <div className="relative grid min-h-[70vh] items-center gap-12 lg:grid-cols-2 lg:gap-8">
      {!isMobile && (
        <div className="pointer-events-none absolute right-0 top-1/2 z-0 hidden h-[min(520px,55vh)] w-[min(580px,52vw)] -translate-y-1/2 lg:block">
          <HeroScene />
        </div>
      )}

      {isMobile && (
        <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />
      )}

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 flex items-center gap-2 text-sm text-cyan-400"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          {personalInfo.location}
        </motion.div>

        <h1 id="hero-heading" className="sr-only">
          {personalInfo.name} — {personalInfo.title}
        </h1>

        <div className="mb-4 overflow-hidden">
          <div className="flex flex-wrap">
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p
          className="font-display text-xl text-gradient sm:text-2xl md:text-3xl"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
        >
          {personalInfo.title}
        </motion.p>

        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <Button href="#projects" variant="primary">
            View Projects
          </Button>
          <Button href="#contact" variant="outline">
            Contact Me
          </Button>
          <Button href={personalInfo.cvUrl} variant="outline">
            Download CV
          </Button>
        </motion.div>
      </div>

      <div className="relative hidden h-[400px] lg:block" aria-hidden />
    </div>
  );
}
