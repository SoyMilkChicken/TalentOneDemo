"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CUBIC = [0.22, 1, 0.36, 1] as const;

const STATS = [
  {
    value: "18.7",
    unit: "pts",
    label: "Semantic separation gap",
    sub: "Real engineers vs. troll resumes",
  },
  {
    value: "80 – 100",
    unit: "%",
    label: "ATS score — troll resumes",
    sub: "Chef Gordon Silicon · Semiconductor Wafer",
  },
  {
    value: "40.0",
    unit: "%",
    label: "TalentOne — same trolls",
    sub: "Correctly flagged, not forwarded",
  },
];

const BULLETS = [
  {
    number: "01",
    title: "The Keyword Illusion",
    text: "Legacy ATS relies on exact-match Boolean logic — mathematically blind to context. A chef who lists 'semiconductor' in a stunt gag gets routed to engineering.",
  },
  {
    number: "02",
    title: "The False Positive Penalty",
    text: "Evaluators waste hours screening candidates who simply copied buzzwords. The system rewards gamers and punishes honest writers.",
  },
  {
    number: "03",
    title: "The Discarded Alpha",
    text: "Highly qualified candidates with non-obvious but semantically proximate fit are auto-rejected before any human sees them.",
  },
];

const POWER_BI_PLOT = "/powerbi-scatter-plot-cropped.png";

export default function CaseStudy() {
  return (
    <section
      id="case-study"
      className="relative w-full bg-[#111111] text-[#F5F5F5] py-32 md:py-40"
    >
      <div className="w-full max-w-5xl mx-auto px-8 sm:px-16 md:px-24 flex flex-col gap-24 md:gap-32">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: CUBIC }}
          className="max-w-4xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#F5F5F5]/30 mb-6">
            Case Study 01
          </p>
          <div className="overflow-hidden pb-4">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: CUBIC }}
              className="text-[clamp(2rem,7vw,7.5rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#F5F5F5]"
            >
              What the ATS
              <br />
              <span className="text-[#F5F5F5]/25">Failed to Do</span>
            </motion.h2>
          </div>
          <p className="mt-8 text-lg md:text-xl leading-relaxed text-[#F5F5F5]/45 max-w-2xl">
            A benchmark of 41 candidates exposed the fundamental flaw in keyword-based hiring — and quantified exactly how wide the gap is.
          </p>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-28 border-y border-[#F5F5F5]/10 py-16 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: CUBIC }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center text-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: CUBIC }}
            >
              {/* Big number */}
              <div className="flex flex-col items-center justify-center gap-1 mb-5 w-full">
                <span className="text-[clamp(3rem,7vw,6.5rem)] font-black leading-none tracking-tighter text-[#F5F5F5] text-center w-full block">
                  {s.value}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#F5F5F5]/40 leading-none mb-2 text-center w-full block">
                  {s.unit}
                </span>
              </div>

              {/* Divider */}
              <div className="w-8 h-px bg-[#F5F5F5]/20 mb-5 mx-auto" />

              {/* Labels */}
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#F5F5F5]/60 mb-2 w-full text-center">
                {s.label}
              </p>
              <p className="text-sm text-[#F5F5F5]/30 leading-relaxed max-w-[200px] mx-auto text-center">
                {s.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main grid: bullets + scatter plot ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24 md:gap-32">

          {/* Left: Problem bullets */}
          <motion.div
            className="md:col-span-4 flex flex-col gap-14"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: CUBIC }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#F5F5F5]/25">
              The Cost of Brittle Parsing
            </p>
            {BULLETS.map((b, i) => (
              <motion.div
                key={b.number}
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: CUBIC }}
              >
                <span className="font-mono text-xs text-[#F5F5F5]/20 tracking-widest">
                  {b.number}
                </span>
                <h3 className="text-base font-bold uppercase tracking-[0.1em] text-[#F5F5F5]/55">
                  {b.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-[#F5F5F5]/40">
                  {b.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Scatter plot exhibit */}
          <motion.div
            className="md:col-span-8 flex flex-col gap-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.15, ease: CUBIC }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#F5F5F5]/25">
                ATS vs Semantic Scoring — Candidate Benchmark
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#F5F5F5]/20">
                41 data points
              </p>
            </div>

            <div className="border border-[#F5F5F5]/10 p-1.5">
              <div className="relative w-full overflow-hidden bg-[#F8F8F8]" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={POWER_BI_PLOT}
                  alt="ATS vs Semantic Scoring candidate benchmark scatter plot"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            </div>

            <p className="text-sm text-[#F5F5F5]/25 leading-relaxed max-w-2xl">
              Troll resumes scored 80–100% on legacy ATS (x-axis) while TalentOne placed them at 40–45% semantic match (y-axis) — cleanly separated from the real engineers clustered in the upper-right quadrant.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
