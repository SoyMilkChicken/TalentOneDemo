"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ────────────────────────────────────────────────────
// Animation timing
// ────────────────────────────────────────────────────
const CYCLE_MS = 5000;
const PHASES = 4; // 0: input, 1: processing, 2: result, 3: verdict

function usePhase() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % PHASES);
    }, CYCLE_MS / PHASES);
    return () => clearInterval(id);
  }, []);
  return phase;
}

// ────────────────────────────────────────────────────
// Scrambling number display
// ────────────────────────────────────────────────────
function useScrambleNumbers(active: boolean, target: number[], duration = 800) {
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
        })
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
function Cursor({ color = "bg-red-500" }: { color?: string }) {
  return (
    <motion.span
      className={`inline-block w-[2px] h-[1.1em] ${color} ml-0.5 align-middle`}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
  );
}

// ────────────────────────────────────────────────────
// Left column: Legacy ATS failure loop
// ────────────────────────────────────────────────────
const CUBIC = [0.16, 1, 0.3, 1] as const;

function LegacyColumn({ phase }: { phase: number }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30 mb-2">
        The Legacy Bottleneck
      </p>

      {/* Terminal window */}
      <div className="bg-[#1A1A1A] rounded-sm p-6 md:p-8 font-mono text-sm leading-relaxed min-h-[320px] flex flex-col justify-between">
        {/* Input lines */}
        <div className="space-y-3">
          <div>
            <span className="text-[#F5F5F5]/40">REQ: </span>
            <span className="text-[#F5F5F5]/80">&quot;Artificial Intelligence&quot;</span>
          </div>
          <div>
            <span className="text-[#F5F5F5]/40">CAND: </span>
            <span className="text-[#F5F5F5]/80">&quot;機器學習&quot;</span>
          </div>

          {/* Processing line */}
          <AnimatePresence mode="wait">
            {phase >= 1 && (
              <motion.div
                key="scan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 text-[#F5F5F5]/30"
              >
                <span>SCANNING</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  ...
                </motion.span>
                <Cursor />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Result */}
        <div className="mt-6 space-y-2">
          <AnimatePresence mode="wait">
            {phase >= 2 && (
              <motion.div
                key="error"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: CUBIC }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400 font-bold">
                    ERROR: 0% MATCH
                  </span>
                </div>
                <p className="text-[#F5F5F5]/25 text-xs mt-1 pl-4">
                  KEYWORD NOT FOUND IN CORPUS
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {phase >= 3 && (
              <motion.div
                key="rejected"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: CUBIC }}
                className="mt-3 border border-red-500/30 px-4 py-2 inline-block"
              >
                <span className="text-red-400 text-xs font-bold uppercase tracking-[0.2em]">
                  Candidate Rejected
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────
// Right column: TalentOne engine success loop
// ────────────────────────────────────────────────────
const VEC_A = [0.012, -0.441, 0.893, 0.234, -0.112, 0.667];
const VEC_B = [0.011, -0.422, 0.912, 0.228, -0.098, 0.671];

function EngineColumn({ phase }: { phase: number }) {
  const numsA = useScrambleNumbers(phase >= 1, VEC_A);
  const numsB = useScrambleNumbers(phase >= 1, VEC_B);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30 mb-2">
        The TalentOne Engine
      </p>

      {/* Engine window */}
      <div className="bg-[#1A1A1A] rounded-sm p-6 md:p-8 font-mono text-sm leading-relaxed min-h-[320px] flex flex-col justify-between">
        {/* Input → Vector transformation */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.div
                key="text-input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div>
                  <span className="text-[#F5F5F5]/40">REQ: </span>
                  <span className="text-[#F5F5F5]/80">
                    &quot;Artificial Intelligence&quot;
                  </span>
                </div>
                <div>
                  <span className="text-[#F5F5F5]/40">CAND: </span>
                  <span className="text-[#F5F5F5]/80">&quot;機器學習&quot;</span>
                </div>
              </motion.div>
            )}

            {phase >= 1 && phase < 3 && (
              <motion.div
                key="vectors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <p className="text-[#F5F5F5]/25 text-[10px] uppercase tracking-[0.2em] mb-1">
                    Embedding ℝ³⁰⁷²
                  </p>
                  <p className="text-emerald-400/80 text-xs break-all leading-relaxed">
                    [{numsA.map((n, i) => (
                      <span key={i}>
                        {i > 0 && ", "}
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 0.4,
                            delay: i * 0.05,
                            repeat: phase === 1 ? Infinity : 0,
                          }}
                        >
                          {n.toFixed(3)}
                        </motion.span>
                      </span>
                    ))}, …]
                  </p>
                </div>

                {/* Connecting gradient line */}
                <motion.div
                  className="relative h-px w-full overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: CUBIC }}
                  style={{ transformOrigin: "left" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/60 via-emerald-400/20 to-emerald-400/60" />
                </motion.div>

                <div>
                  <p className="text-[#F5F5F5]/25 text-[10px] uppercase tracking-[0.2em] mb-1">
                    Embedding ℝ³⁰⁷²
                  </p>
                  <p className="text-emerald-400/80 text-xs break-all leading-relaxed">
                    [{numsB.map((n, i) => (
                      <span key={i}>
                        {i > 0 && ", "}
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 0.4,
                            delay: i * 0.05 + 0.15,
                            repeat: phase === 1 ? Infinity : 0,
                          }}
                        >
                          {n.toFixed(3)}
                        </motion.span>
                      </span>
                    ))}, …]
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Result */}
        <div className="mt-6 space-y-2">
          <AnimatePresence mode="wait">
            {phase >= 2 && (
              <motion.div
                key="distance"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: CUBIC }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-bold">
                    COSINE DISTANCE: 0.042
                  </span>
                </div>
                <p className="text-[#F5F5F5]/30 text-xs mt-1 pl-4">
                  SEMANTIC MATCH: 95.8%
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {phase >= 3 && (
              <motion.div
                key="secured"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: CUBIC }}
                className="mt-3 border border-emerald-400/30 px-4 py-2 inline-block"
              >
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em]">
                  Hidden Gem Secured
                </span>
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
  const phase = usePhase();

  return (
    <section
      id="architecture"
      className="min-h-screen w-full bg-[#F5F5F5] text-[#1A1A1A] py-24 md:py-32 px-8 md:px-12 flex flex-col items-center"
    >
      {/* Header */}
      <div className="text-center max-w-4xl">
        <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-black uppercase leading-[0.8] tracking-tighter text-[#1A1A1A]">
          The Architecture
          <br />
          <span className="text-[#1A1A1A]/30">of Arbitrage.</span>
        </h2>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30">
          [ Bypassing Boolean Logic via 3,072-Dimensional Retrieval ]
        </p>
      </div>

      {/* Animated comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 w-full max-w-6xl mt-16 md:mt-32">
        <LegacyColumn phase={phase} />
        <EngineColumn phase={phase} />
      </div>
    </section>
  );
}
