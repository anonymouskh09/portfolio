"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useHasFinePointer } from "@/lib/hooks/useMediaQuery";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  /** Pointer-tracked 3D tilt with a light spotlight (mouse devices only) */
  hover3d?: boolean;
  /** Max tilt angle in degrees */
  intensity?: number;
};

export function GlassCard({
  children,
  className = "",
  glow = false,
  hover3d = false,
  intensity = 10,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useHasFinePointer();
  const tilt = hover3d && finePointer;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [intensity, -intensity]),
    spring
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-intensity, intensity]),
    spring
  );
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(96,165,250,0.16), transparent 45%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`glass-card gradient-border group/card relative rounded-2xl p-6 ${glow ? "glass-card-glow" : ""} ${className}`}
      style={
        tilt
          ? { rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }
          : undefined
      }
      whileTap={hover3d && !finePointer ? { scale: 0.98 } : undefined}
    >
      {tilt && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ background: glare }}
        />
      )}
      <div className="relative" style={tilt ? { transform: "translateZ(30px)" } : undefined}>
        {children}
      </div>
    </motion.div>
  );
}
