"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

const socialLinks = [
  {
    label: "LinkedIn",
    href: personalInfo.linkedin,
    icon: "in",
  },
  {
    label: "GitHub",
    href: personalInfo.github,
    icon: "gh",
  },
];

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

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
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30";

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
        label="Contact"
        title="Let's Build Something Great"
        subtitle="Ready to start your next project? Get in touch."
      />

      <div className="grid w-full items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left column — contact info */}
        <div className="w-full lg:col-span-4">
          <GlassCard glow className="!p-8">
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
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-cyan-400 transition hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.08 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right column — form */}
        <motion.div
          className="w-full lg:col-span-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <GlassCard glow className="!p-8">
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

                {status === "error" && (
                  <p className="text-sm text-red-400" role="alert">
                    {errorMsg}
                  </p>
                )}

                {status === "success" && (
                  <p className="text-sm text-emerald-400" role="status">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  {status === "loading"
                    ? "Sending..."
                    : status === "success"
                      ? "Sent ✓"
                      : "Send Message"}
                </Button>
              </form>
            )}
          </GlassCard>
        </motion.div>
      </div>

      <footer className="mt-20 border-t border-white/5 pt-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Mazhar Rehman. Crafted with React, Next.js
        &amp; Three.js.
      </footer>
    </div>
  );
}
