"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────
const EXPANDED = 65;
const COLLAPSED = 35;
const RESTING = 50;

const SPRING = { type: "spring", stiffness: 180, damping: 28, mass: 0.9 };
const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
const STAGGER = 0.07;

type Side = "left" | "right" | null;

// ────────────────────────────────────────────────────
// Menu data
// ────────────────────────────────────────────────────
const ENTERPRISE_MENU = [
  "Audit Engine",
  "Architecture",
  "SYSTEX Case Study",
  "Contact Sales",
];

const APPLICANT_MENU = [
  "Upload Resume",
  "Vector Analysis",
  "FAQ",
  "Contact Us",
];

// ────────────────────────────────────────────────────
// Center Logo
// ────────────────────────────────────────────────────
function Logo() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center gap-0">
        <h1 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-black tracking-[-0.05em] uppercase leading-none">
          <span className="text-[#1a1a1a]">Talent</span>
          <span className="text-[#1a1a1a]/40">One</span>
        </h1>
        <div className="mt-1.5 h-px w-12 bg-[#1a1a1a]/15" />
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────
// Bottom branding bar
// ────────────────────────────────────────────────────
function BottomBranding() {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-center border-t border-[#1a1a1a]/[0.06] bg-[#fafaf8]/80 backdrop-blur-sm py-4">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/35">
        TalentOne — Quantifying Semantic Match
      </span>
    </div>
  );
}

// ────────────────────────────────────────────────────
// Typographic menu (revealed on hover)
// ────────────────────────────────────────────────────
function TypeMenu({
  items,
  align,
}: {
  items: string[];
  align: "left" | "right";
}) {
  return (
    <nav
      className={`flex flex-col gap-2 md:gap-3 ${align === "left" ? "items-start text-left" : "items-end text-right"}`}
    >
      {items.map((label, i) => (
        <motion.a
          key={label}
          href="#"
          variants={FADE_UP}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.45,
            delay: i * STAGGER,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group relative block cursor-pointer"
        >
          <span className="block text-[clamp(1.8rem,5.5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#1a1a1a]/40">
            {label}
          </span>
          {/* Underline on item hover */}
          <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#1a1a1a] transition-all duration-300 ease-out group-hover:w-full" />
        </motion.a>
      ))}
    </nav>
  );
}

// ────────────────────────────────────────────────────
// Panel
// ────────────────────────────────────────────────────
function Panel({
  side,
  active,
  dimmed,
  widthPct,
  idleTitle,
  menuItems,
  onEnter,
  onLeave,
  isMobile,
}: {
  side: "left" | "right";
  active: boolean;
  dimmed: boolean;
  widthPct: number;
  idleTitle: string;
  menuItems: string[];
  onEnter: () => void;
  onLeave: () => void;
  isMobile: boolean;
}) {
  const isLeft = side === "left";

  // Subtle tonal difference between left and right
  const bg = isLeft ? "bg-[#f0efeb]" : "bg-[#fafaf8]";

  return (
    <motion.div
      className={`relative flex flex-col items-center justify-center overflow-hidden ${bg} cursor-pointer`}
      style={
        isMobile
          ? { width: "100%", height: active ? "65vh" : dimmed ? "35vh" : "50vh" }
          : { height: "100vh" }
      }
      animate={
        isMobile
          ? { height: active ? "65vh" : dimmed ? "35vh" : "50vh" }
          : { width: `${widthPct}%` }
      }
      transition={SPRING}
      onMouseEnter={isMobile ? undefined : onEnter}
      onMouseLeave={isMobile ? undefined : onLeave}
      onClick={isMobile ? (active ? onLeave : onEnter) : undefined}
    >
      {/* Divider edge */}
      {!isMobile && (
        <div
          className={`absolute ${isLeft ? "right-0" : "left-0"} top-0 h-full w-px bg-[#1a1a1a]/[0.06]`}
        />
      )}
      {isMobile && (
        <div className="absolute bottom-0 left-0 h-px w-full bg-[#1a1a1a]/[0.06]" />
      )}

      {/* Content container */}
      <div
        className={`relative z-10 flex w-full max-w-2xl flex-col px-8 md:px-14 lg:px-20 ${
          isLeft ? "items-start text-left" : "items-end text-right"
        }`}
      >
        <AnimatePresence mode="wait">
          {!active ? (
            /* ── Idle: massive title ── */
            <motion.h2
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: dimmed ? 0.25 : 0.85, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.2rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#1a1a1a]"
            >
              {idleTitle.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </motion.h2>
          ) : (
            /* ── Active: typographic menu ── */
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TypeMenu items={menuItems} align={isLeft ? "left" : "right"} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner index */}
      <div
        className={`absolute ${isLeft ? "top-6 left-8 md:top-8 md:left-10" : "top-6 right-8 md:top-8 md:right-10"}`}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1a1a1a]/25">
          {isLeft ? "01" : "02"}
        </span>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────
// Main
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
    <main className="relative h-screen w-screen overflow-hidden bg-[#f5f4f0]">
      <Logo />
      <BottomBranding />

      {/* ── Desktop: horizontal split ── */}
      <div className="hidden md:flex h-full w-full flex-row">
        <Panel
          side="left"
          active={hoveredSide === "left"}
          dimmed={hoveredSide === "right"}
          widthPct={leftWidth}
          idleTitle="For Enterprise"
          menuItems={ENTERPRISE_MENU}
          onEnter={handleEnter("left")}
          onLeave={handleLeave}
          isMobile={false}
        />
        <Panel
          side="right"
          active={hoveredSide === "right"}
          dimmed={hoveredSide === "left"}
          widthPct={rightWidth}
          idleTitle="For Applicants"
          menuItems={APPLICANT_MENU}
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
          dimmed={hoveredSide === "right"}
          widthPct={50}
          idleTitle="For Enterprise"
          menuItems={ENTERPRISE_MENU}
          onEnter={handleEnter("left")}
          onLeave={handleLeave}
          isMobile={true}
        />
        <Panel
          side="right"
          active={hoveredSide === "right"}
          dimmed={hoveredSide === "left"}
          widthPct={50}
          idleTitle="For Applicants"
          menuItems={APPLICANT_MENU}
          onEnter={handleEnter("right")}
          onLeave={handleLeave}
          isMobile={true}
        />
      </div>
    </main>
  );
}
