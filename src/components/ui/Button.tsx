"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400";
  const variants = {
    primary: "btn-primary text-white",
    outline: "btn-outline text-slate-200",
    ghost: "text-slate-300 hover:text-white hover:bg-white/5",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const isHash = href.startsWith("#");
    const isExternal = href.startsWith("http");
    const isPdf = href.endsWith(".pdf");

    if (isHash || isPdf) {
      return (
        <motion.a
          href={href}
          className={classes}
          download={isPdf ? "" : undefined}
          target={isPdf ? "_blank" : undefined}
          rel={isPdf ? "noopener noreferrer" : undefined}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={href}
          className={classes}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
