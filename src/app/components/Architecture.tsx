"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ────────────────────────────────────────────────────
// Animation timing — 2s per phase so text is readable
// ────────────────────────────────────────────────────
const CYCLE_MS = 8000;
const PHASES = 4; // 0: inputs, 1: scanning/embedding, 2: result, 3: verdict

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
function Cursor({ color = "bg-amber-400" }: { color?: string }) {
  return (
    <motion.span
      className={`inline-block w-[2px] h-[1.1em] ${color} ml-0.5 align-middle`}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
  );
}

const CUBIC = [0.16, 1, 0.3, 1] as const;

// ────────────────────────────────────────────────────
// Keyword highlight — pulses amber when scanning active
// ────────────────────────────────────────────────────
function Kw({ children, active }: { children: React.ReactNode; active: boolean }) {
  if (!active) return <span>{children}</span>;
  return (
    <motion.span
      className="text-amber-400 font-bold"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 0.9, repeat: Infinity }}
    >
      {children}
    </motion.span>
  );
}

// ────────────────────────────────────────────────────
// Left column: Legacy ATS — fooled by keyword stuffing
// ────────────────────────────────────────────────────
function LegacyColumn({ phase }: { phase: number }) {
  const scanning = phase >= 1;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30 mb-2">
        Legacy ATS
      </p>

      <div className="bg-[#1A1A1A] rounded-sm p-6 md:p-8 font-mono text-xs leading-relaxed min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4">
          {/* Job requirement */}
          <div>
            <p className="text-[#F5F5F5]/25 text-[10px] uppercase tracking-[0.2em] mb-1">
              Job Req
            </p>
            <p className="text-[#F5F5F5]/80">
              &quot;<Kw active={scanning}>Process Integration</Kw> Engineer&quot;
            </p>
          </div>

          {/* Keyword-stuffed resume */}
          <div>
            <p className="text-[#F5F5F5]/25 text-[10px] uppercase tracking-[0.2em] mb-1">
              Candidate
            </p>
            <p className="text-[#F5F5F5]/60">John Doe — Head Chef, Napoli&apos;s Pizzeria</p>
            <div className="mt-2 space-y-1.5 text-[#F5F5F5]/40 pl-3 border-l border-[#F5F5F5]/10">
              <p>
                › Led <Kw active={scanning}>process integration</Kw> of new pizza flavor pipeline
              </p>
              <p>
                › Managed flavor <Kw active={scanning}>integration</Kw> workflows across 3 kitchens
              </p>
              <p>
                › Cross-functional <Kw active={scanning}>process integration</Kw> reporting
              </p>
            </div>
          </div>

          {/* Scanning animation */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                key="scan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#F5F5F5]/30"
              >
                <span>SCANNING KEYWORDS</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  ...
                </motion.span>
                <Cursor color="bg-amber-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results */}
        <div className="mt-4 space-y-2">
          <AnimatePresence mode="wait">
            {phase >= 2 && (
              <motion.div
                key="hits"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: CUBIC }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-amber-400 font-bold">
                    KEYWORD HIT: &quot;PROCESS INTEGRATION&quot; × 4
                  </span>
                </div>
                <p className="text-[#F5F5F5]/25 text-[10px] mt-1 pl-4">
                  MATCH SCORE: 94% — STRONG CANDIDATE
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {phase >= 3 && (
              <motion.div
                key="shortlisted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: CUBIC }}
                className="mt-3 border border-amber-400/40 px-4 py-2 inline-block"
              >
                <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">
                  ✓ Candidate Shortlisted
                </p>
                <p className="text-amber-400/40 text-[9px] mt-0.5 uppercase tracking-wider">
                  Pizza chef passed as engineer
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
// Right column: TalentOne — sees through the manipulation
// ────────────────────────────────────────────────────
// Vectors deliberately divergent: JD lives in engineering cluster,
// resume lives in culinary cluster → large cosine distance
const VEC_JD  = [0.823, -0.341,  0.156, -0.512,  0.734,  0.289];
const VEC_RES = [-0.612,  0.847, -0.423,  0.334, -0.556,  0.712];

function EngineColumn({ phase }: { phase: number }) {
  const numsJD  = useScrambleNumbers(phase >= 1, VEC_JD);
  const numsRes = useScrambleNumbers(phase >= 1, VEC_RES);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30 mb-2">
        The TalentOne Engine
      </p>

      <div className="bg-[#1A1A1A] rounded-sm p-6 md:p-8 font-mono text-xs leading-relaxed min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {/* Phase 0: show raw inputs */}
            {phase === 0 && (
              <motion.div
                key="inputs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <p className="text-[#F5F5F5]/25 text-[10px] uppercase tracking-[0.2em] mb-1">
                    Job Req
                  </p>
                  <p className="text-[#F5F5F5]/80">
                    &quot;Process Integration Engineer&quot;
                  </p>
                </div>
                <div>
                  <p className="text-[#F5F5F5]/25 text-[10px] uppercase tracking-[0.2em] mb-1">
                    Candidate
                  </p>
                  <p className="text-[#F5F5F5]/60">
                    John Doe — Head Chef, Napoli&apos;s Pizzeria
                  </p>
                </div>
              </motion.div>
            )}

            {/* Phase 1–2: diverging semantic embeddings */}
            {phase >= 1 && phase < 3 && (
              <motion.div
                key="embeddings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* JD embedding — engineering cluster */}
                <div>
                  <p className="text-[#F5F5F5]/25 text-[10px] uppercase tracking-[0.2em] mb-1">
                    JD Embedding ℝ³⁰⁷² → [engineering, systems, technical…]
                  </p>
                  <p className="text-emerald-400/80 text-[10px] break-all leading-relaxed">
                    [{numsJD.map((n, i) => (
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

                {/* Diverging separator — green→red signals mismatch */}
                <motion.div
                  className="relative h-px w-full overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: CUBIC }}
                  style={{ transformOrigin: "left" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/60 via-[#F5F5F5]/10 to-red-500/60" />
                </motion.div>

                {/* Resume embedding — culinary cluster */}
                <div>
                  <p className="text-[#F5F5F5]/25 text-[10px] uppercase tracking-[0.2em] mb-1">
                    Resume Embedding ℝ³⁰⁷² → [culinary, pizza, chef…]
                  </p>
                  <p className="text-red-400/80 text-[10px] break-all leading-relaxed">
                    [{numsRes.map((n, i) => (
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

        {/* Results */}
        <div className="mt-4 space-y-2">
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
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400 font-bold">
                    COSINE DISTANCE: 0.847 — SEMANTIC MISMATCH
                  </span>
                </div>
                <p className="text-[#F5F5F5]/25 text-[10px] mt-1 pl-4">
                  ACTUAL FIELD: CULINARY / FOOD SERVICE
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
                className="mt-3 border border-emerald-400/30 px-4 py-2 inline-block"
              >
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em]">
                  ✗ Manipulation Detected — Rejected
                </p>
                <p className="text-emerald-400/40 text-[9px] mt-0.5 uppercase tracking-wider">
                  Pizza chef correctly filtered out
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
  const phase = usePhase();

  return (
    <section
      id="architecture"
      className="min-h-screen w-full bg-[#F5F5F5] text-[#1A1A1A] py-24 md:py-32 px-8 md:px-12 flex flex-col items-center"
    >
      {/* Header */}
      <div className="text-center max-w-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30 mb-6">
          The Proof
        </p>
        <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-black uppercase leading-[0.8] tracking-tighter text-[#1A1A1A]">
          Keywords Lie.
          <br />
          <span className="text-[#1A1A1A]/30">Semantics Don&apos;t.</span>
        </h2>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30">
          [ Keyword Manipulation Cannot Fool 3,072-Dimensional Semantic Retrieval ]
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
