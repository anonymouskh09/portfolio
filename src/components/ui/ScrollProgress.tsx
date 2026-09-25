"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Thin gradient bar at the top that tracks scroll position of the main container. */
export function ScrollProgress() {
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;
    const onScroll = () => {
      const max = container.scrollHeight - container.clientHeight;
      progress.set(max > 0 ? container.scrollTop / max : 0);
    };
    onScroll();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [progress]);

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400"
      style={{ scaleX }}
    />
  );
}
