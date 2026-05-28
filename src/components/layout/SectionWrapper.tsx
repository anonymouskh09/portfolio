"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionWrapperProps = {
  id: string;
  children: ReactNode;
  direction?: "left" | "right" | "none";
  className?: string;
};

export function SectionWrapper({
  id,
  children,
  direction = "left",
  className = "",
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.45 });

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const scroller = document.getElementById("scroll-container");
    if (!section || !content || !scroller || direction === "none") return;

    const xFrom = direction === "left" ? -120 : 120;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { x: xFrom, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            scroller,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [direction]);

  const initialX =
    direction === "left" ? -80 : direction === "right" ? 80 : 0;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`snap-section relative flex min-h-screen min-h-[100dvh] w-full items-center justify-center overflow-hidden px-6 py-24 md:px-10 lg:px-16 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <motion.div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl"
        initial={
          direction === "none"
            ? { opacity: 0 }
            : { opacity: 0, x: initialX }
        }
        animate={
          direction === "none"
            ? isInView
              ? { opacity: 1 }
              : { opacity: 0.3 }
            : isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0.4, x: initialX * 0.3 }
        }
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
