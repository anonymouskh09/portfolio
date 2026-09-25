"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3" />
  </svg>
);

const socialLinks = [
  {
    label: "LinkedIn",
    href: personalInfo.linkedin,
    icon: <LinkedInIcon />,
  },
  {
    label: "GitHub",
    href: personalInfo.github,
    icon: <GitHubIcon />,
  },
];

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  // false during SSR, true once hydrated — keeps password-manager extensions
  // from injecting into server-rendered inputs and breaking hydration
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormState({ name: "", email: "", projectType: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to send. Please try again."
      );
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-slate-600 outline-none transition duration-300 hover:border-white/20 focus:border-cyan-400/60 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1)]";

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <SectionHeading
        id="contact-heading"
        label="Contact"
        title="Let's Build Something Great"
        subtitle="Ready to start your next project? Get in touch."
      />

      <div className="grid w-full items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left column — contact info */}
        <Reveal from="left" className="w-full lg:col-span-4">
          <GlassCard hover3d intensity={6} glow className="!p-6 sm:!p-8">
            <h3 className="font-display text-lg font-semibold text-white">
              Get in Touch
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Fill out the form and your message will be sent directly to my
              inbox.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Email
                </p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="break-all text-base text-slate-200 transition hover:text-cyan-400"
                >
                  {personalInfo.email}
                </a>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Phone
                </p>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                  className="text-base text-slate-200 transition hover:text-cyan-400"
                >
                  {personalInfo.phone}
                </a>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Location
                </p>
                <p className="text-base text-slate-200">{personalInfo.location}</p>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              {socialLinks.map((link, i) => (
                <Magnetic key={link.label} strength={0.4}>
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-cyan-400 transition hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  whileTap={{ scale: 0.92 }}
                >
                  {link.icon}
                </motion.a>
                </Magnetic>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        {/* Right column — form */}
        <motion.div
          className="w-full lg:col-span-8"
          initial={{ opacity: 0, y: 50, rotateX: 12, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1200 }}
        >
          <GlassCard glow className="!p-6 sm:!p-8">
            {!mounted ? (
              <div className="space-y-6" aria-hidden>
                <div className="h-12 rounded-xl bg-white/5" />
                <div className="h-12 rounded-xl bg-white/5" />
                <div className="h-32 rounded-xl bg-white/5" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm text-slate-400"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      className={inputClass}
                      placeholder="Your name"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm text-slate-400"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      data-lpignore="true"
                      data-1p-ignore
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      className={inputClass}
                      placeholder="you@email.com"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-project"
                    className="mb-2 block text-sm text-slate-400"
                  >
                    Project Type
                  </label>
                  <select
                    id="contact-project"
                    name="projectType"
                    value={formState.projectType}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        projectType: e.target.value,
                      }))
                    }
                    className={inputClass}
                    suppressHydrationWarning
                  >
                    <option value="" className="bg-slate-900">
                      Select a type
                    </option>
                    <option value="Web Application" className="bg-slate-900">
                      Web Application
                    </option>
                    <option value="E-Commerce" className="bg-slate-900">
                      E-Commerce
                    </option>
                    <option value="Shopify Store" className="bg-slate-900">
                      Shopify Store
                    </option>
                    <option value="Automation" className="bg-slate-900">
                      Automation
                    </option>
                    <option value="Other" className="bg-slate-900">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm text-slate-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    autoComplete="off"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    className={`${inputClass} resize-none`}
                    placeholder="Tell me about your project..."
                    suppressHydrationWarning
                  />
                </div>

                <AnimatePresence mode="wait">
                  {status === "error" && (
                    <motion.p
                      key="error"
                      className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                      role="alert"
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto", x: [0, -6, 6, -4, 4, 0] }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {errorMsg}
                    </motion.p>
                  )}

                  {status === "success" && (
                    <motion.p
                      key="success"
                      className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
                      role="status"
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      Message sent successfully! I&apos;ll get back to you soon.
                    </motion.p>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto"
                  disabled={status === "loading"}
                >
                  {status === "loading" && (
                    <motion.span
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      aria-hidden
                    />
                  )}
                  {status === "loading"
                    ? "Sending..."
                    : status === "success"
                      ? "Sent ✓"
                      : "Send Message →"}
                </Button>
              </form>
            )}
          </GlassCard>
        </motion.div>
      </div>

      <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center text-sm text-slate-500 sm:flex-row sm:text-left">
        <p>
          © {new Date().getFullYear()} Mazhar Rehman. Crafted with React,
          Next.js &amp; Three.js.
        </p>
        <Magnetic>
          <a
            href="#hero"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white"
          >
            Back to top
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
          </a>
        </Magnetic>
      </footer>
    </div>
  );
}
