"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasFinePointer } from "@/lib/hooks/useMediaQuery";

type MagneticProps = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
};

/** Pulls its child toward the cursor while hovered. No-op on touch devices. */
export function Magnetic({ children, strength = 0.3, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useHasFinePointer();
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: 0.2 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: 0.2 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!finePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
