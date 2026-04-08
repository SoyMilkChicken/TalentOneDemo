"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ────────────────────────────────────────────────────
// Layout
// ────────────────────────────────────────────────────
const EXPANDED = 65;
const COLLAPSED = 35;
const RESTING = 50;

const SPRING = { type: "spring" as const, stiffness: 120, damping: 22, mass: 1 };
const CUBIC = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Side = "left" | "right" | null;

// ────────────────────────────────────────────────────
// Menu data
// ────────────────────────────────────────────────────
type MenuItem = { label: string; sup?: string; href: string };

const ENTERPRISE_MENU: MenuItem[] = [
  { label: "Audit Engine", href: "#audit" },
  { label: "Architecture", href: "#architecture" },
  { label: "Case Study", sup: "01", href: "#case-study" },
  { label: "Contact Sales", href: "#contact" },
];

const APPLICANT_MENU: MenuItem[] = [
  { label: "Upload Resume", href: "#upload" },
  { label: "Vector Analysis", href: "#analysis" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact" },
];

// ────────────────────────────────────────────────────
// Massive bottom branding — static behind panels
// ────────────────────────────────────────────────────
function BottomBranding() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full overflow-hidden text-center">
      <h1 className="whitespace-nowrap text-[15vw] font-black uppercase leading-[0.75] tracking-tighter text-[#1A1A1A]">
        TalentOne
      </h1>
    </div>
  );
}

// ────────────────────────────────────────────────────
// Clip-reveal menu item (like the reference site)
// Each item slides up from behind a clip mask, staggered
// ────────────────────────────────────────────────────
function ClipRevealItem({
  item,
  index,
  onNavigate,
}: {
  item: MenuItem;
  index: number;
  onNavigate: () => void;
}) {
  return (
    <div className="overflow-hidden">
      <motion.a
        href={item.href}
        onClick={onNavigate}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{
          duration: 0.55,
          delay: index * 0.08,
          ease: CUBIC,
        }}
        className="group block cursor-pointer"
      >
        <span className="text-2xl font-bold leading-tight text-[#1A1A1A] transition-opacity duration-300 group-hover:opacity-30">
          {item.label}
          {item.sup && (
            <sup className="ml-0.5 text-[0.55em] font-normal text-[#1A1A1A]/40 align-super">
              ({item.sup})
            </sup>
          )}
        </span>
      </motion.a>
    </div>
  );
}

function NavMenu({
  items,
  onNavigate,
}: {
  items: MenuItem[];
  onNavigate: () => void;
}) {
  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((item, i) => (
        <ClipRevealItem
          key={item.label}
          item={item}
          index={i}
          onNavigate={onNavigate}
        />
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
  onNavigate,
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
  onNavigate: () => void;
  isMobile: boolean;
}) {
  const isLeft = side === "left";
  const bg = isLeft ? "bg-white" : "bg-[#f0f0ee]";

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
      transition={{
        duration: 0.7,
        ease: CUBIC,
      }}
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

      {/* ── Idle title — clip-reveal in/out ── */}
      <AnimatePresence mode="wait">
        {!active && (
          <motion.div
            key="idle"
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: dimmed ? 0.1 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-110%" }}
                transition={{ duration: 0.6, ease: CUBIC }}
                className="pointer-events-none select-none text-center text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-[#1A1A1A]/80"
              >
                {idleTitle}
              </motion.h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Active: clip-reveal nav in top-left corner ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="menu"
            className="absolute top-10 left-10 md:top-12 md:left-12 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <NavMenu items={menuItems} onNavigate={onNavigate} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Subtle inner scale on hover (depth effect) ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ scale: active ? 1.03 : 1 }}
        transition={{ duration: 0.8, ease: CUBIC }}
      >
        {/* Background grain / texture layer that scales subtly */}
        <div
          className="h-full w-full opacity-[0.015]"
          style={{
            backgroundImage: isLeft
              ? "none"
              : "radial-gradient(circle at 60% 40%, rgba(0,0,0,0.03) 0%, transparent 70%)",
          }}
        />
      </motion.div>
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
  const handleNavigate = useCallback(() => setHoveredSide(null), []);

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
    <section id="hero" className="relative h-screen w-screen overflow-hidden bg-white">
      {/* z-0: static bottom branding */}
      <BottomBranding />

      {/* Panels on top */}
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
          onNavigate={handleNavigate}
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
          onNavigate={handleNavigate}
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
          onNavigate={handleNavigate}
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
          onNavigate={handleNavigate}
          isMobile={true}
        />
      </div>
    </section>
  );
}
