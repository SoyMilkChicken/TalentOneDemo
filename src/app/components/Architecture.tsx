"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHASES = 4;
const CUBIC = [0.22, 1, 0.36, 1] as const;

// Each column gets its own independent cycle speed
function usePhaseMs(cycleMs: number) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % PHASES);
    }, cycleMs / PHASES);
    return () => clearInterval(id);
  }, [cycleMs]);
  return phase;
}

// ────────────────────────────────────────────────────
// Scrambling number display
// ────────────────────────────────────────────────────
function useScrambleNumbers(active: boolean, target: number[], duration = 600) {
  const [display, setDisplay] = useState<number[]>(target);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    const start = Date.now();

    const scramble = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(
        target.map((t) => {
          const noise = (1 - progress) * (Math.random() * 2 - 1);
          return +(t + noise).toFixed(3);
        }),
      );
      if (progress < 1) {
        frame = requestAnimationFrame(scramble);
      } else {
        setDisplay(target);
      }
    };

    frame = requestAnimationFrame(scramble);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return display;
}

// ────────────────────────────────────────────────────
// Blinking cursor
// ────────────────────────────────────────────────────
function Cursor() {
  return (
    <motion.span
      className="inline-block w-[2px] h-[1em] bg-[#F5F5F5]/40 ml-0.5 align-middle"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
  );
}

// ────────────────────────────────────────────────────
// Keyword rows
// ────────────────────────────────────────────────────
const KEYWORDS = [
  { term: "Python", note: "pet snake — team mascot" },
  { term: "Semiconductor", note: "silicon wafer stunt" },
  { term: "AI / Neural Net", note: "skyscraper jump calc" },
  { term: "LLM", note: "NOS injection system" },
];

function KeywordRow({
  kw,
  delay,
  visible,
}: {
  kw: (typeof KEYWORDS)[0];
  delay: number;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={kw.term}
          className="flex items-baseline justify-between gap-3"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, delay }}
        >
          <span className="text-amber-400/90 text-sm font-bold">{kw.term}</span>
          <span className="flex-1 border-b border-dotted border-[#F5F5F5]/10 mb-[3px]" />
          <span className="text-[#F5F5F5]/35 text-xs italic">{kw.note}</span>
          <span className="text-amber-400 text-sm font-bold">✓</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ────────────────────────────────────────────────────
// Left column: ATS false positive — slower (1600ms/phase)
// ────────────────────────────────────────────────────
function LegacyColumn({ phase }: { phase: number }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30">
        Legacy ATS — The False Positive
      </p>

      <div className="bg-[#111111] rounded-sm p-5 sm:p-8 md:p-10 font-mono text-sm leading-relaxed min-h-[420px] sm:min-h-[480px] flex flex-col gap-5 sm:gap-6">
        {/* Input */}
        <div className="space-y-2">
          <p className="text-[#F5F5F5]/30 text-xs uppercase tracking-[0.2em]">
            Input
          </p>
          <div>
            <span className="text-[#F5F5F5]/40">JOB </span>
            <span className="text-[#F5F5F5]/80">Backend Software Engineer</span>
          </div>
          <div>
            <span className="text-[#F5F5F5]/40">CAND </span>
            <span className="text-[#F5F5F5]/80">Chef Gordon Silicon</span>
          </div>
          <div className="text-[#F5F5F5]/30 pl-5 text-xs leading-relaxed">
            Principal Stunt Engineer &amp; Yield Consultant
            <br />
            Fast &amp; Furious Franchise · Luigi&apos;s Pizza &amp; Pasta
          </div>
        </div>

        {/* Keyword scan */}
        <div className="flex-1 space-y-2">
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                key="scan-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[#F5F5F5]/30 text-xs uppercase tracking-[0.2em] mb-3">
                  Keyword scan
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1,
                      repeat: phase === 1 ? Infinity : 0,
                    }}
                  >
                    ...
                  </motion.span>
                  {phase >= 2 && <Cursor />}
                </p>
                <div className="space-y-2.5">
                  {KEYWORDS.map((kw, i) => (
                    <KeywordRow
                      key={kw.term}
                      kw={kw}
                      delay={i * 0.1}
                      visible={phase >= 1}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Result + verdict */}
        <div className="space-y-3 border-t border-[#F5F5F5]/8 pt-4">
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                key="score"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: CUBIC }}
                className="flex items-center justify-between"
              >
                <span className="text-[#F5F5F5]/40 text-xs uppercase tracking-[0.2em]">
                  Keyword hits
                </span>
                <span className="text-amber-400 font-bold">4 / 4 FOUND</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                key="ats-score"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1, ease: CUBIC }}
                className="flex items-center justify-between"
              >
                <span className="text-[#F5F5F5]/40 text-xs uppercase tracking-[0.2em]">
                  ATS Score
                </span>
                <span className="text-amber-400 font-bold text-xl">80%</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                key="verdict"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: CUBIC }}
                className="border border-amber-400/30 bg-amber-400/5 px-4 py-3"
              >
                <p className="text-amber-400 text-sm font-bold uppercase tracking-[0.15em]">
                  ✓ Top Match — Forwarded to Recruiter
                </p>
                <p className="text-[#F5F5F5]/30 text-xs mt-1">
                  False positive. Stunt coordinator approved for engineering
                  role.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────
// Vector values — JD vs troll (wide semantic distance)
// ────────────────────────────────────────────────────
const VEC_JD = [0.823, -0.341, 0.612, -0.089, 0.774, 0.231];
const VEC_TROLL = [-0.512, 0.678, -0.234, 0.891, -0.445, 0.123];

// ────────────────────────────────────────────────────
// Right column: TalentOne — faster (900ms/phase)
// ────────────────────────────────────────────────────
function EngineColumn({ phase }: { phase: number }) {
  const jdNums = useScrambleNumbers(phase >= 1, VEC_JD);
  const trollNums = useScrambleNumbers(phase >= 1, VEC_TROLL);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30">
        TalentOne — Semantic Retrieval
      </p>

      <div className="bg-[#111111] rounded-sm p-5 sm:p-8 md:p-10 font-mono text-sm leading-relaxed min-h-[420px] sm:min-h-[480px] flex flex-col gap-5 sm:gap-6">
        {/* Input */}
        <div className="space-y-2">
          <p className="text-[#F5F5F5]/30 text-xs uppercase tracking-[0.2em]">
            Input
          </p>
          <div>
            <span className="text-[#F5F5F5]/40">JOB </span>
            <span className="text-[#F5F5F5]/80">Backend Software Engineer</span>
          </div>
          <div>
            <span className="text-[#F5F5F5]/40">CAND </span>
            <span className="text-[#F5F5F5]/80">Chef Gordon Silicon</span>
          </div>
          <div className="text-[#F5F5F5]/30 pl-5 text-xs leading-relaxed">
            Principal Stunt Engineer &amp; Yield Consultant
            <br />
            Fast &amp; Furious Franchise · Luigi&apos;s Pizza &amp; Pasta
          </div>
        </div>

        {/* Embedding */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {phase >= 1 && phase < 3 && (
              <motion.div
                key="vectors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div>
                  <p className="text-[#F5F5F5]/30 text-xs uppercase tracking-[0.2em] mb-1.5">
                    JD Embedding ℝ³⁰⁷²
                  </p>
                  <p className="text-emerald-400/80 text-xs break-all leading-relaxed">
                    [
                    {jdNums.map((n, i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.05,
                          repeat: phase === 1 ? Infinity : 0,
                        }}
                      >
                        {i > 0 && ", "}
                        {n.toFixed(3)}
                      </motion.span>
                    ))}
                    , …]
                  </p>
                </div>

                <motion.div
                  className="relative h-px w-full overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: CUBIC }}
                  style={{ transformOrigin: "left" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5F5F5]/15 to-transparent" />
                </motion.div>

                <div>
                  <p className="text-[#F5F5F5]/30 text-xs uppercase tracking-[0.2em] mb-1.5">
                    Candidate Embedding ℝ³⁰⁷²
                  </p>
                  <p className="text-red-400/80 text-xs break-all leading-relaxed">
                    [
                    {trollNums.map((n, i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.05 + 0.15,
                          repeat: phase === 1 ? Infinity : 0,
                        }}
                      >
                        {i > 0 && ", "}
                        {n.toFixed(3)}
                      </motion.span>
                    ))}
                    , …]
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Result + verdict */}
        <div className="space-y-3 border-t border-[#F5F5F5]/8 pt-4">
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                key="cosine"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: CUBIC }}
                className="flex items-center justify-between"
              >
                <span className="text-[#F5F5F5]/40 text-xs uppercase tracking-[0.2em]">
                  Cosine distance
                </span>
                <span className="text-[#F5F5F5]/70 font-bold">0.600</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                key="semantic-score"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.08, ease: CUBIC }}
                className="flex items-center justify-between"
              >
                <span className="text-[#F5F5F5]/40 text-xs uppercase tracking-[0.2em]">
                  Semantic match
                </span>
                <span className="text-emerald-400 font-bold text-xl">
                  40.0%
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                key="flagged"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: CUBIC }}
                className="border border-emerald-400/30 bg-emerald-400/5 px-4 py-3"
              >
                <p className="text-emerald-400 text-sm font-bold uppercase tracking-[0.15em]">
                  ✗ Flagged — Context Mismatch
                </p>
                <p className="text-[#F5F5F5]/30 text-xs mt-1">
                  Domain: stunt work · culinary · automotive. Not software
                  engineering.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────
// Main export
// ────────────────────────────────────────────────────
export default function Architecture() {
  const atsPhase = usePhaseMs(6400); // 1600ms per phase — slow, let users read the scan
  const enginePhase = usePhaseMs(3600); // 900ms per phase  — fast, result appears quickly

  return (
    <section
      id="architecture"
      className="w-full bg-[#F5F5F5] text-[#1A1A1A] py-32 md:py-40 flex flex-col items-center"
    >
      <div className="max-w-5xl mx-auto px-8 sm:px-16 md:px-24 w-full flex flex-col items-center">
        <motion.div
          className="text-center w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.7, ease: CUBIC }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#1A1A1A]/30 mb-6">
            How It Breaks
          </p>

          <div className="pb-4 inline-block">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 1.2, ease: CUBIC }}
              className="text-[clamp(2rem,7vw,6.5rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#1A1A1A]"
            >
              The Architecture
              <br />
              <span className="text-[#1A1A1A]/25">of Arbitrage.</span>
            </motion.h2>
          </div>

          <p className="mt-8 text-lg md:text-xl leading-relaxed text-[#1A1A1A]/45 max-w-2xl mx-auto">
            Same resume. Two systems. One approves a stunt coordinator for a
            software role. The other catches it in under a second.
          </p>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/25">
            [ Bypassing Boolean Logic via 3,072-Dimensional Retrieval ]
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32 w-full max-w-5xl mx-auto mt-32 md:mt-56"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: CUBIC }}
        >
          <LegacyColumn phase={atsPhase} />
          <EngineColumn phase={enginePhase} />
        </motion.div>
      </div>
    </section>
  );
}
