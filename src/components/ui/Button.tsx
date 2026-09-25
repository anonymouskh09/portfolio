"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    primary: "btn-primary text-white",
    outline: "btn-outline text-slate-200",
    ghost: "text-slate-300 hover:text-white hover:bg-white/5",
  };

  const classes = `${base} ${variants[variant]} ${className}`;
  const label = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;
  const tap = { scale: 0.96 };

  let el: React.ReactNode;

  if (href) {
    const isHash = href.startsWith("#");
    const isExternal = href.startsWith("http");
    const isPdf = href.endsWith(".pdf");

    if (isHash || isPdf) {
      el = (
        <motion.a
          href={href}
          className={classes}
          download={isPdf ? "" : undefined}
          target={isPdf ? "_blank" : undefined}
          rel={isPdf ? "noopener noreferrer" : undefined}
          whileTap={tap}
          data-cursor="hover"
        >
          {label}
        </motion.a>
      );
    } else {
      el = (
        <motion.div whileTap={tap}>
          <Link
            href={href}
            className={classes}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            data-cursor="hover"
          >
            {label}
          </Link>
        </motion.div>
      );
    }
  } else {
    el = (
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
        whileTap={disabled ? undefined : tap}
        data-cursor="hover"
      >
        {label}
      </motion.button>
    );
  }

  return <Magnetic className={className.includes("w-full") ? "w-full sm:w-auto" : ""}>{el}</Magnetic>;
}
