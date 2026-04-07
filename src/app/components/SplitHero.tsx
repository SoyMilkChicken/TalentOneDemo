"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Upload,
  Building2,
  User,
  Sparkles,
  ChevronDown,
} from "lucide-react";

// ────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────
const EXPANDED = 65;
const COLLAPSED = 35;
const RESTING = 50;

const SPRING = { type: "spring", stiffness: 200, damping: 30, mass: 0.8 };
const EASE_OUT = { duration: 0.5, ease: [0.16, 1, 0.3, 1] };

type Side = "left" | "right" | null;

// ────────────────────────────────────────────────────
// Logo
// ────────────────────────────────────────────────────
function Logo() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center gap-1">
        {/* Mark */}
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20" />
          <Sparkles className="relative z-10 h-6 w-6 text-[var(--color-accent)]" />
        </div>
        {/* Wordmark */}
        <h1 className="mt-2 text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-[-0.04em] uppercase leading-none">
          <span className="text-white">Talent</span>
          <span className="text-[var(--color-accent)]">One</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium">
          Talent Intelligence
        </p>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────
// Scan-line decoration
// ────────────────────────────────────────────────────
function Scanlines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.03]">
      <div
        className="h-full w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)",
        }}
      />
    </div>
  );
}

// ────────────────────────────────────────────────────
// CTA button
// ────────────────────────────────────────────────────
function CTAButton({
  children,
  icon,
  variant,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  variant: "dark" | "light";
}) {
  const isDark = variant === "dark";
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={EASE_OUT}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] transition-colors ${
        isDark
          ? "bg-white text-[var(--color-void)] hover:bg-[var(--color-accent)]"
          : "bg-[var(--color-void)] text-white hover:bg-[var(--color-accent)] hover:text-[var(--color-void)]"
      }`}
    >
      {icon}
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}

// ────────────────────────────────────────────────────
// Panel
// ────────────────────────────────────────────────────
function Panel({
  side,
  active,
  widthPct,
  headline,
  subtext,
  ctaLabel,
  ctaIcon,
  onEnter,
  onLeave,
  isMobile,
}: {
  side: "left" | "right";
  active: boolean;
  widthPct: number;
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaIcon: React.ReactNode;
  onEnter: () => void;
  onLeave: () => void;
  isMobile: boolean;
}) {
  const isLeft = side === "left";
  const bg = isLeft ? "bg-[var(--color-void)]" : "bg-[var(--color-paper)]";
  const text = isLeft ? "text-white" : "text-[var(--color-void)]";
  const mutedText = isLeft ? "text-white/50" : "text-[var(--color-void)]/50";
  const borderColor = isLeft ? "border-white/[0.06]" : "border-black/[0.06]";
  const variant = isLeft ? "dark" : "light";
  const iconComponent = isLeft ? (
    <Building2 className="h-5 w-5" />
  ) : (
    <User className="h-5 w-5" />
  );

  return (
    <motion.div
      className={`relative flex flex-col items-center justify-center overflow-hidden ${bg} ${text}`}
      style={
        isMobile
          ? { width: "100%", height: active ? "65vh" : "35vh" }
          : { height: "100vh" }
      }
      animate={
        isMobile
          ? { height: active ? "65vh" : "35vh" }
          : { width: `${widthPct}%` }
      }
      transition={SPRING}
      onMouseEnter={isMobile ? undefined : onEnter}
      onMouseLeave={isMobile ? undefined : onLeave}
      onClick={isMobile ? onEnter : undefined}
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${isLeft ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px), linear-gradient(90deg, ${isLeft ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Edge line */}
      {!isMobile && (
        <div
          className={`absolute ${isLeft ? "right-0" : "left-0"} top-0 h-full w-px ${borderColor} bg-current opacity-10`}
        />
      )}

      {/* Content */}
      <div
        className={`relative z-10 flex max-w-md flex-col ${isLeft ? "items-start text-left" : "items-end text-right"} gap-6 px-8 md:px-12 lg:px-16`}
      >
        {/* Icon badge */}
        <motion.div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            isLeft
              ? "bg-white/10 text-white/60"
              : "bg-black/5 text-black/40"
          }`}
          animate={{ opacity: active ? 1 : 0.5, scale: active ? 1 : 0.9 }}
          transition={EASE_OUT}
        >
          {iconComponent}
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-[clamp(1.2rem,2.5vw,2rem)] font-black uppercase tracking-[-0.02em] leading-[1.1]"
          animate={{ opacity: active ? 1 : 0.7 }}
          transition={EASE_OUT}
        >
          {headline}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className={`max-w-xs text-sm leading-relaxed font-medium ${mutedText}`}
          animate={{
            opacity: active ? 0.9 : 0.4,
            y: active ? 0 : 4,
          }}
          transition={EASE_OUT}
        >
          {subtext}
        </motion.p>

        {/* CTA */}
        <AnimatePresence>
          {active && (
            <CTAButton icon={ctaIcon} variant={variant}>
              {ctaLabel}
            </CTAButton>
          )}
        </AnimatePresence>
      </div>

      {/* Corner label */}
      <div
        className={`absolute ${isLeft ? "bottom-6 left-8" : "bottom-6 right-8"} flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] ${mutedText}`}
      >
        <span>{isLeft ? "Enterprise" : "Candidates"}</span>
        <div className={`h-px w-6 ${isLeft ? "bg-white/20" : "bg-black/20"}`} />
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────
// Bottom subtle prompt (desktop)
// ────────────────────────────────────────────────────
function HoverPrompt({ hoveredSide }: { hoveredSide: Side }) {
  return (
    <motion.div
      className="pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: hoveredSide ? 0 : 1 }}
      transition={{ delay: hoveredSide ? 0 : 1.2, duration: 0.6 }}
    >
      <div className="flex flex-col items-center gap-2 text-white/25">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
          Hover to explore
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────
export default function SplitHero() {
  const [hoveredSide, setHoveredSide] = useState<Side>(null);

  const handleEnter = useCallback(
    (side: Side) => () => setHoveredSide(side),
    []
  );
  const handleLeave = useCallback(() => setHoveredSide(null), []);

  const leftWidth =
    hoveredSide === "left"
      ? EXPANDED
      : hoveredSide === "right"
        ? COLLAPSED
        : RESTING;
  const rightWidth =
    hoveredSide === "right"
      ? EXPANDED
      : hoveredSide === "left"
        ? COLLAPSED
        : RESTING;

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <Scanlines />
      <Logo />
      <HoverPrompt hoveredSide={hoveredSide} />

      {/* ── Desktop: horizontal split ── */}
      <div className="hidden md:flex h-full w-full flex-row">
        <Panel
          side="left"
          active={hoveredSide === "left"}
          widthPct={leftWidth}
          headline="For Enterprise"
          subtext="Quantify Semantic Match. Eliminate False Positives. Capture Alpha in Global Talent."
          ctaLabel="Book an Audit"
          ctaIcon={<Building2 className="h-4 w-4" />}
          onEnter={handleEnter("left")}
          onLeave={handleLeave}
          isMobile={false}
        />
        <Panel
          side="right"
          active={hoveredSide === "right"}
          widthPct={rightWidth}
          headline="For Applicants"
          subtext="Bypass Brittle ATS Filters. Let Your True Vectors Speak."
          ctaLabel="Upload Resume"
          ctaIcon={<Upload className="h-4 w-4" />}
          onEnter={handleEnter("right")}
          onLeave={handleLeave}
          isMobile={false}
        />
      </div>

      {/* ── Mobile: vertical split ── */}
      <div className="flex md:hidden h-full w-full flex-col">
        <Panel
          side="left"
          active={hoveredSide === "left"}
          widthPct={50}
          headline="For Enterprise"
          subtext="Quantify Semantic Match. Eliminate False Positives. Capture Alpha in Global Talent."
          ctaLabel="Book an Audit"
          ctaIcon={<Building2 className="h-4 w-4" />}
          onEnter={handleEnter("left")}
          onLeave={handleLeave}
          isMobile={true}
        />
        <Panel
          side="right"
          active={hoveredSide === "right"}
          widthPct={50}
          headline="For Applicants"
          subtext="Bypass Brittle ATS Filters. Let Your True Vectors Speak."
          ctaLabel="Upload Resume"
          ctaIcon={<Upload className="h-4 w-4" />}
          onEnter={handleEnter("right")}
          onLeave={handleLeave}
          isMobile={true}
        />
      </div>
    </main>
  );
}
