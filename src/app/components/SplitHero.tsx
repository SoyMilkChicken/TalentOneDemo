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
// z-0: Massive bottom branding — background layer
// ────────────────────────────────────────────────────
function BottomBranding() {
  return (
    <div className="pointer-events-none absolute bottom-[-2vh] left-0 z-0 w-full text-center overflow-hidden">
      <span className="inline-block text-[15vw] font-black leading-[0.75] tracking-tighter text-[#1A1A1A]">
        TalentOne
      </span>
    </div>
  );
}

// ────────────────────────────────────────────────────
// z-10: Contextual subtext — bottom-left corner only
// ────────────────────────────────────────────────────
function Subtext() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="absolute bottom-12 left-12 z-10 max-w-xs"
    >
      <p className="text-sm leading-relaxed text-[#1A1A1A]/35">
        Quantifying Semantic Match.
        <br />
        We help enterprise HR eliminate false positives and capture alpha in
        global talent via 3,072-dimensional vector retrieval.
      </p>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────
// z-20: Centered nav menu (revealed on hover)
// ────────────────────────────────────────────────────
function NavMenu({ items }: { items: MenuItem[] }) {
  return (
    <nav className="flex flex-col items-center gap-1">
      {items.map((item, i) => (
        <motion.a
          key={item.label}
          href="#"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{
            duration: 0.45,
            delay: i * 0.05,
            ease: CUBIC,
          }}
          className="group block cursor-pointer text-center"
        >
          <span className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-[#1A1A1A] transition-opacity duration-200 group-hover:opacity-30">
            {item.label}
            {item.sup && (
              <sup className="ml-1 text-[0.35em] font-normal text-[#1A1A1A]/40 align-super">
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
      className={`relative overflow-hidden ${bg} cursor-pointer`}
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
          className={`absolute ${isLeft ? "right-0" : "left-0"} top-0 h-full w-px bg-[#1A1A1A]/10 z-10`}
        />
      )}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1A1A1A]/10 z-10" />
      )}

      {/* Subtext — left panel only, desktop only */}
      {isLeft && !isMobile && <Subtext />}

      {/* ── z-20: Idle title — dead center ── */}
      <AnimatePresence>
        {!active && (
          <motion.div
            key="idle"
            className="absolute inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: dimmed ? 0.1 : 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4, ease: CUBIC }}
          >
            <h2 className="pointer-events-none select-none text-center text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-[#1A1A1A]/80">
              {idleTitle}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── z-20: Active menu — dead center ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="menu"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center"
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
      {/* z-0: background branding */}
      <BottomBranding />

      {/* z-10+: interactive panels */}
      <div className="relative z-10 hidden md:flex h-full w-full flex-row">
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

      {/* Mobile */}
      <div className="relative z-10 flex md:hidden h-full w-full flex-col">
        <Panel
          side="left"
          active={hoveredSide === "left"}
          dimmed={hoveredSide === "right"}
          widthPct={50}
          idleTitle="Enterprise"
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
