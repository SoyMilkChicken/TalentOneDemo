"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Technology", href: "#latent-space" },
  { label: "Architecture", href: "#architecture" },
  { label: "Case Study", href: "#case-study" },
  { label: "Process", href: "#matching-science" },
  { label: "Team", href: "#built-by" },
];

const CUBIC = [0.16, 1, 0.3, 1] as const;

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -56, opacity: 0 }}
          transition={{ duration: 0.5, ease: CUBIC }}
          className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-8 md:px-16 lg:px-24 xl:px-28 h-14 bg-white/95 backdrop-blur-sm border-b border-[#1A1A1A]/10"
        >
          {/* Wordmark */}
          <a
            href="#hero"
            className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A]"
          >
            TalentOne
          </a>

          {/* Section links — desktop only */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? "text-[#1A1A1A]"
                    : "text-[#1A1A1A]/35 hover:text-[#1A1A1A]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
