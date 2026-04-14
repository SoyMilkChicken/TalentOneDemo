"use client";

import { motion } from "framer-motion";

const CUBIC = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0A0A0A] text-[#F5F5F5] py-24 sm:py-32">
      <div className="w-[90%] sm:w-[85%] mx-auto max-w-7xl">

        {/* ── Wordmark + tagline ── */}
        <motion.div
          className="pb-24 border-b border-[#F5F5F5]/10"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: CUBIC }}
        >
          <a
            href="#hero"
            className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#F5F5F5]"
          >
            TalentOne
          </a>
          <p className="mt-3 text-xs text-[#F5F5F5]/30 max-w-[22rem] leading-relaxed">
            Semantic matching infrastructure for enterprises that can&apos;t
            afford to miss the right person.
          </p>
        </motion.div>

        {/* ── Copyright ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#F5F5F5]/20">
            © {year} TalentOne. All rights reserved.
          </p>
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#F5F5F5]/20">
            Built on 3,072-dimensional semantic retrieval
          </p>
        </div>

      </div>
    </footer>
  );
}
