"use client";

import { useRef, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "@/lib/hooks/useLenis";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navigation } from "@/components/layout/Navigation";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
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
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!loading && <ParticleBackground />}

      <Navigation />

      <div
        id="scroll-container"
        ref={scrollRef}
        className={`snap-container bg-premium cyber-grid relative ${loading ? "overflow-hidden" : ""}`}
      >
        <SectionWrapper id="hero" direction="none" className="!items-center">
          <Hero />
        </SectionWrapper>

        <SectionWrapper id="about" direction="right">
          <About />
        </SectionWrapper>

        <SectionWrapper id="skills" direction="left">
          <Skills />
        </SectionWrapper>

        <SectionWrapper id="experience" direction="right">
          <Experience />
        </SectionWrapper>

        <SectionWrapper
          id="projects"
          direction="left"
          className="!min-h-0 !py-28"
        >
          <Projects />
        </SectionWrapper>

        <SectionWrapper id="education" direction="right">
          <Education />
        </SectionWrapper>

        <SectionWrapper id="contact" direction="none">
          <Contact />
        </SectionWrapper>
      </div>
    </>
  );
}
