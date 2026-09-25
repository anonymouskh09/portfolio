"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type LoadingScreenProps = {
  onComplete: () => void;
};

const EASE = [0.76, 0, 0.24, 1] as const;
const FACES = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(-90deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const name = "Mazhar Rehman";

  useEffect(() => {
    const duration = 1700;
    const start = performance.now();
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out so the counter decelerates near 100
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else timeout = setTimeout(onComplete, 300);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#030712]"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.9, ease: EASE }}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-purple-500/15 blur-[100px]" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 px-6"
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* Spinning wireframe cube */}
        <div className="h-16 w-16" style={{ perspective: 400 }} aria-hidden>
          <motion.div
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            {FACES.map((f, i) => (
              <div
                key={i}
                className="absolute inset-0 grid place-items-center border border-cyan-400/60 bg-blue-500/10 font-display text-sm font-bold text-cyan-300"
                style={{ transform: `${f} translateZ(32px)` }}
              >
                {i === 0 ? "MR" : ""}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex overflow-hidden" style={{ perspective: 600 }}>
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block font-display text-3xl font-bold text-white md:text-5xl"
              initial={{ y: "100%", rotateX: -90, opacity: 0 }}
              animate={{ y: "0%", rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="text-xs uppercase tracking-[0.35em] text-cyan-400/80 sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Full-Stack Web Developer
        </motion.p>

        <div className="flex w-56 items-center gap-4">
          <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full origin-left rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <span className="w-10 text-right font-mono text-xs tabular-nums text-slate-400">
            {progress}%
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
