"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, personalInfo } from "@/lib/data";
import { Magnetic } from "@/components/ui/Magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  // Shrink on scroll, hide while scrolling down, reveal when scrolling up
  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    let last = container.scrollTop;
    const onScroll = () => {
      const y = container.scrollTop;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is on screen
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Close the menu with Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-6"
        animate={{ y: hidden && !mobileOpen ? "-120%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500 md:px-6 ${
            scrolled || mobileOpen
              ? "border border-white/10 bg-[#030712]/70 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl"
              : "border border-transparent py-4"
          }`}
          aria-label="Main"
        >
          <a
            href="#hero"
            className="group relative z-10 flex items-center gap-2 font-display text-lg font-bold tracking-tight text-white"
            onClick={() => setMobileOpen(false)}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-sm shadow-lg shadow-blue-500/30 transition-transform duration-500 group-hover:rotate-[360deg]">
              MR
            </span>
            <span className="hidden sm:inline">
              Mazhar<span className="text-cyan-400">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={`relative z-10 block rounded-full px-4 py-2 text-sm transition-colors ${
                    active === link.href ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Magnetic>
              <a
                href="#contact"
                className="btn-primary inline-flex rounded-full px-5 py-2 text-sm font-medium text-white"
              >
                <span className="relative z-10">Hire Me</span>
              </a>
            </Magnetic>
          </div>

          <button
            type="button"
            className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className="h-0.5 w-5 rounded bg-white"
              animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="h-0.5 w-5 rounded bg-white"
              animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-[#030712]/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-purple-600/25 blur-[100px]"
            />
            <ul className="relative flex flex-1 flex-col justify-center gap-1" style={{ perspective: 800 }}>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 40, rotateX: -60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: EASE }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-baseline gap-4 py-2 font-display text-4xl font-bold tracking-tight transition-colors sm:text-5xl ${
                      active === link.href ? "text-white" : "text-slate-500 active:text-white"
                    }`}
                  >
                    <span className="text-xs font-normal text-cyan-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="relative border-t border-white/10 pt-6 text-sm text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a href={`mailto:${personalInfo.email}`} className="block text-slate-200">
                {personalInfo.email}
              </a>
              <div className="mt-3 flex gap-5">
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
