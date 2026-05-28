"use client";

import { motion } from "framer-motion";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover3d?: boolean;
};

export function GlassCard({
  children,
  className = "",
  glow = false,
  hover3d = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card rounded-2xl p-6 ${glow ? "glass-card-glow" : ""} ${className}`}
      whileHover={
        hover3d
          ? {
              rotateX: 4,
              rotateY: -4,
              scale: 1.02,
              boxShadow: "0 0 40px rgba(59, 130, 246, 0.15)",
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
