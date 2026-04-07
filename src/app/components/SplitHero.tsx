"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ────────────────────────────────────────────────────
// Layout
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
  { label: "Contact Sales" },
];

const APPLICANT_MENU: MenuItem[] = [
  { label: "Upload Resume" },
  { label: "Vector Analysis" },
  { label: "FAQ" },
  { label: "Contact Us" },
];

// ────────────────────────────────────────────────────
// Massive bottom branding — bleeds off viewport
// ────────────────────────────────────────────────────
function BottomBranding() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 z-40 w-full overflow-hidden text-center">
      <h1 className="whitespace-nowrap text-[15vw] font-black uppercase leading-[0.75] tracking-tighter text-[#1A1A1A]">
        TalentOne
      </h1>
    </div>
  );
}

// ────────────────────────────────────────────────────
// Contextual subtext (bottom-left of left panel)
// ────────────────────────────────────────────────────
function Subtext() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="absolute bottom-32 left-12 z-10 max-w-xs"
    >
      <p className="text-sm font-semibold text-[#1A1A1A] leading-snug">
        Talent Intelligence
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-[#1A1A1A]/40">
        Quantifying Semantic Match.
        <br />
        We help enterprise HR eliminate false positives and capture alpha in
        global talent via 3,072-dimensional vector retrieval.
      </p>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────
// Small top-corner nav menu (revealed on hover)
// ────────────────────────────────────────────────────
function NavMenu({ items }: { items: MenuItem[] }) {
  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((item, i) => (
        <motion.a
          key={item.label}
          href="#"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{
            duration: 0.4,
            delay: i * 0.05,
            ease: CUBIC,
          }}
          className="group block cursor-pointer"
        >
          <span className="text-2xl font-bold leading-tight text-[#1A1A1A] transition-opacity duration-200 group-hover:opacity-35">
            {item.label}
            {item.sup && (
              <sup className="ml-0.5 text-[0.55em] font-normal text-[#1A1A1A]/40 align-super">
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
  const bg = isLeft ? "bg-white" : "bg-gray-100";

  return (
    <motion.div
      className={`relative flex flex-col overflow-hidden ${bg} cursor-pointer`}
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
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1A1A1A]/10" />
      )}

      {/* Left panel: subtext (always visible) */}
      {isLeft && !isMobile && <Subtext />}

      {/* ── Idle title (centered vertically) ── */}
      <AnimatePresence>
        {!active && (
          <motion.div
            key="idle"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: dimmed ? 0.12 : 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: CUBIC }}
          >
            <h2 className="pointer-events-none select-none text-center text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-[#1A1A1A]/80">
              {idleTitle.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Active: small nav in top-left corner ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="menu"
            className="absolute top-10 left-10 md:top-12 md:left-12 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.1 }}
          >
            <NavMenu items={menuItems} />
          </motion.div>
        )}
      </AnimatePresence>
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
    <main className="relative h-screen w-screen overflow-hidden bg-white">
      {/* Massive bottom bleed branding */}
      <BottomBranding />

      {/* ── Desktop: horizontal split ── */}
      <div className="hidden md:flex h-full w-full flex-row">
        <Panel
          side="left"
          active={hoveredSide === "left"}
          dimmed={hoveredSide === "right"}
          widthPct={leftWidth}
          idleTitle="Enterprise"
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
          idleTitle="Talent"
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
          idleTitle="Talent"
          menuItems={APPLICANT_MENU}
          onEnter={handleEnter("right")}
          onLeave={handleLeave}
          isMobile={true}
        />
      </div>
    </main>
  );
}
