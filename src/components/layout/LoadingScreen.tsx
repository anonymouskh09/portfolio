"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type LoadingScreenProps = {
  onComplete: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const name = "Mazhar Rehman";

  useEffect(() => {
    const duration = 2200;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);
      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 400);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-purple-500/15 blur-[100px]" />
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex overflow-hidden">
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                className="font-display text-3xl font-bold text-white md:text-5xl"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          <motion.p
            className="text-sm uppercase tracking-[0.3em] text-cyan-400/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Full-Stack Web Developer
          </motion.p>

          <div className="h-1 w-48 overflow-hidden rounded-full bg-slate-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
