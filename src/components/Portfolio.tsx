"use client";

import { useRef, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "@/lib/hooks/useLenis";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navigation } from "@/components/layout/Navigation";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export function Portfolio() {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLenis(scrollRef);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!loading && <ParticleBackground />}
      <div aria-hidden className="noise-overlay pointer-events-none fixed inset-0 z-[1]" />

      <ScrollProgress />
      <CustomCursor />
      <Navigation />

      <main
        id="scroll-container"
        ref={scrollRef}
        className={`scroll-container bg-premium relative ${loading ? "overflow-hidden" : ""}`}
      >
        <div aria-hidden className="cyber-grid pointer-events-none fixed inset-0" />

        <SectionWrapper id="hero" glow="none">
          <Hero ready={!loading} />
        </SectionWrapper>

        <SectionWrapper id="about" glow="right">
          <About />
        </SectionWrapper>

        <SectionWrapper id="skills" glow="left">
          <Skills />
        </SectionWrapper>

        <SectionWrapper id="experience" glow="right">
          <Experience />
        </SectionWrapper>

        <SectionWrapper id="projects" glow="left">
          <Projects />
        </SectionWrapper>

        <SectionWrapper id="education" glow="right">
          <Education />
        </SectionWrapper>

        <SectionWrapper id="contact" glow="none" className="!min-h-0 !pb-10">
          <Contact />
        </SectionWrapper>
      </main>
    </>
  );
}
