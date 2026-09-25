"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionWrapperProps = {
  id: string;
  children: ReactNode;
  /** Side the ambient glow sits on */
  glow?: "left" | "right" | "none";
  className?: string;
};

export function SectionWrapper({
  id,
  children,
  glow = "left",
  className = "",
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-scrubbed depth: the glow drifts slower than content (parallax),
  // and content tilts in slightly from below as the section arrives.
  useEffect(() => {
    const section = sectionRef.current;
    const scroller = document.getElementById("scroll-container");
    if (!section || !scroller) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (orbRef.current) {
        gsap.fromTo(
          orbRef.current,
          { yPercent: -30 },
          {
            yPercent: 30,
            ease: "none",
            scrollTrigger: { trigger: section, scroller, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
      if (contentRef.current && id !== "hero") {
        gsap.fromTo(
          contentRef.current,
          { rotateX: 6, y: 40, transformPerspective: 1200, transformOrigin: "50% 0%" },
          {
            rotateX: 0,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: section, scroller, start: "top bottom", end: "top 35%", scrub: 0.6 },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [id]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-24 sm:px-6 md:px-10 md:py-32 lg:px-16 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      {glow !== "none" && (
        <div
          ref={orbRef}
          aria-hidden
          className={`pointer-events-none absolute top-1/4 h-[28rem] w-[28rem] rounded-full blur-[120px] ${
            glow === "left" ? "-left-40 bg-blue-600/15" : "-right-40 bg-purple-600/15"
          }`}
        />
      )}
      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-7xl">
        {children}
      </div>
    </section>
  );
}
