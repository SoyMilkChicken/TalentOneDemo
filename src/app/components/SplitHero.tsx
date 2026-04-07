"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ────────────────────────────────────────────────────
// Layout constants
// ────────────────────────────────────────────────────
const EXPANDED = 65;
const COLLAPSED = 35;
const RESTING = 50;

const SPRING = { type: "spring" as const, stiffness: 160, damping: 26, mass: 1 };
const CUBIC = [0.16, 1, 0.3, 1] as const;

type Side = "left" | "right" | null;

// ────────────────────────────────────────────────────
// Menu data
// ────────────────────────────────────────────────────
type MenuItem = { label: string; sup?: string };

const ENTERPRISE_MENU: MenuItem[] = [
  { label: "Audit Engine" },
  { label: "Architecture" },
  { label: "Case Study", sup: "01" },
  { label: "Contact" },
];

const APPLICANT_MENU: MenuItem[] = [
  { label: "Upload Resume" },
  { label: "Vector Analysis" },
  { label: "FAQ" },
  { label: "Contact Us" },
];

// ────────────────────────────────────────────────────
// Fixed footer branding
// ────────────────────────────────────────────────────
function Footer() {
  return (
    <div className="pointer-events-none fixed bottom-8 left-8 right-8 z-50 flex items-center justify-between">
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30">
        TalentOne
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30">
        Quantifying Semantic Match
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
  items: MenuItem[];
  align: "left" | "right";
}) {
  return (
    <nav
      className={`flex flex-col gap-1 ${
        align === "left" ? "items-start text-left" : "items-end text-right"
      }`}
    >
      {items.map((item, i) => (
        <motion.a
          key={item.label}
          href="#"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            delay: i * 0.06,
            ease: CUBIC,
          }}
          className="group relative block cursor-pointer"
        >
          <span className="block text-[clamp(2.4rem,7vw,6.5rem)] font-bold uppercase leading-[0.85] tracking-[-0.03em] text-[#1A1A1A] transition-opacity duration-300 group-hover:opacity-35">
            {item.label}
            {item.sup && (
              <sup className="ml-2 inline-block align-top text-[clamp(0.6rem,1.2vw,1rem)] font-normal tracking-[0.05em] text-[#1A1A1A]/40">
                ({item.sup})
              </sup>
            )}
          </span>
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
  menuItems: MenuItem[];
  onEnter: () => void;
  onLeave: () => void;
  isMobile: boolean;
}) {
  const isLeft = side === "left";

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[#F5F5F5] cursor-pointer"
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
      {/* Hair-thin divider */}
      {!isMobile && (
        <div
          className={`absolute ${isLeft ? "right-0" : "left-0"} top-0 h-full w-px bg-[#1A1A1A]/10`}
        />
      )}
      {isMobile && !active && (
        <div className="absolute bottom-0 left-8 right-8 h-px bg-[#1A1A1A]/10" />
      )}

      {/* Content */}
      <div
        className={`relative z-10 flex w-full max-w-3xl flex-col px-8 md:px-14 lg:px-20 ${
          isLeft ? "items-start text-left" : "items-end text-right"
        }`}
      >
        <AnimatePresence mode="wait">
          {!active ? (
            /* ── Idle: massive title ── */
            <motion.h2
              key="idle-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: dimmed ? 0.15 : 0.8, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45, ease: CUBIC }}
              className="select-none text-[clamp(2.5rem,8vw,7rem)] font-bold uppercase leading-[0.85] tracking-[-0.04em] text-[#1A1A1A]"
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
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.15 }}
            >
              <TypeMenu items={menuItems} align={isLeft ? "left" : "right"} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────
// Main export
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
    <main className="relative h-screen w-screen overflow-hidden bg-[#F5F5F5]">
      <Footer />

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
