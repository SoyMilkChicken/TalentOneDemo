"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ────────────────────────────────────────────────────
// Layout
// ────────────────────────────────────────────────────
const EXPANDED = 65;
const COLLAPSED = 35;
const RESTING = 50;

const CUBIC = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Side = "left" | "right" | null;

// ────────────────────────────────────────────────────
// Menu data
// ────────────────────────────────────────────────────
type MenuItem = { label: string; sup?: string; href: string };

const ENTERPRISE_MENU: MenuItem[] = [
  { label: "Architecture", href: "#latent-space" },
  { label: "Case Study", sup: "01", href: "#case-study" },
  { label: "The Proof", href: "#architecture" },
  { label: "Built By", href: "#built-by" },
];

const APPLICANT_MENU: MenuItem[] = [
  { label: "Vector Analysis", href: "#latent-space" },
  { label: "Case Study", sup: "01", href: "#case-study" },
  { label: "Built By", href: "#built-by" },
];

// ────────────────────────────────────────────────────
// Massive bottom branding
// ────────────────────────────────────────────────────
function BottomBranding() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 z-20 w-full text-center"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <h1 className="whitespace-nowrap text-[15vw] font-black uppercase leading-[0.85] tracking-tighter text-[#1A1A1A]">
        TalentOne
      </h1>
    </div>
  );
}

// ────────────────────────────────────────────────────
// Clip-reveal menu item
// ────────────────────────────────────────────────────
function ClipRevealItem({
  item,
  index,
  onNavigate,
  dark = false,
}: {
  item: MenuItem;
  index: number;
  onNavigate: () => void;
  dark?: boolean;
}) {
  const color = dark ? "text-[#F5F5F5]" : "text-[#1A1A1A]";
  const supColor = dark ? "text-[#F5F5F5]/40" : "text-[#1A1A1A]/40";

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
        <span
          className={`text-2xl font-bold leading-tight ${color} transition-opacity duration-300 group-hover:opacity-30`}
        >
          {item.label}
          {item.sup && (
            <sup className={`ml-0.5 text-[0.55em] font-normal ${supColor} align-super`}>
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
  dark = false,
}: {
  items: MenuItem[];
  onNavigate: () => void;
  dark?: boolean;
}) {
  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((item, i) => (
        <ClipRevealItem
          key={`${item.label}-${item.href}-${i}`}
          item={item}
          index={i}
          onNavigate={onNavigate}
          dark={dark}
        />
      ))}
    </nav>
  );
}

// ────────────────────────────────────────────────────
// Desktop Panel (unchanged)
// ────────────────────────────────────────────────────
function DesktopPanel({
  side,
  active,
  widthPct,
  idleTitle,
  menuItems,
  onEnter,
  onLeave,
  onNavigate,
}: {
  side: "left" | "right";
  active: boolean;
  widthPct: number;
  idleTitle: string;
  menuItems: MenuItem[];
  onEnter: () => void;
  onLeave: () => void;
  onNavigate: () => void;
}) {
  const isLeft = side === "left";
  const bg = isLeft ? "bg-white" : "bg-[#f0f0ee]";

  return (
    <motion.div
      className={`relative flex flex-col overflow-hidden ${bg} cursor-pointer`}
      style={{ height: "100vh" }}
      animate={{ width: `${widthPct}%` }}
      transition={{ duration: 0.7, ease: CUBIC }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Hair-thin divider */}
      <div
        className={`absolute ${isLeft ? "right-0" : "left-0"} top-0 h-full w-px bg-[#1A1A1A]/10 z-10`}
      />


      {/* Idle title — only visible on hover (active state shows menu instead) */}

      {/* Active: label + nav menu — revealed on hover */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="menu"
            className="absolute top-12 left-12 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="overflow-hidden mb-4">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: CUBIC }}
                className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/35"
              >
                {idleTitle}
              </motion.p>
            </div>
            <NavMenu items={menuItems} onNavigate={onNavigate} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle inner scale */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ scale: active ? 1.03 : 1 }}
        transition={{ duration: 0.8, ease: CUBIC }}
      >
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
// Mobile: Full-screen toggle
// ────────────────────────────────────────────────────
function MobileHero({ onNavigate }: { onNavigate: () => void }) {
  const [activePage, setActivePage] = useState<"enterprise" | "talent">(
    "enterprise"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const isEnterprise = activePage === "enterprise";
  const currentMenu = isEnterprise ? ENTERPRISE_MENU : APPLICANT_MENU;
  const currentTitle = isEnterprise ? "Enterprise" : "Talent";
  const otherTitle = isEnterprise ? "Talent" : "Enterprise";
  const bg = isEnterprise ? "bg-white" : "bg-[#f0f0ee]";

  const handleSwitch = useCallback(() => {
    setMenuOpen(false);
    setActivePage((p) => (p === "enterprise" ? "talent" : "enterprise"));
  }, []);

  const handleMenuNavigate = useCallback(() => {
    setMenuOpen(false);
    onNavigate();
  }, [onNavigate]);

  return (
    <div className={`relative h-full w-full ${bg} overflow-hidden`}>
      {/* ── Top brand label ── */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 pt-8"
        style={{ paddingTop: "max(2rem, env(safe-area-inset-top, 2rem))" }}
      >
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#1A1A1A]/60">
          TalentOne
        </p>
      </div>

      {/* ── Center title — tap to reveal menu ── */}
      <AnimatePresence mode="wait">
        {!menuOpen && (
          <motion.div
            key={`title-${activePage}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <button
              onClick={() => setMenuOpen(true)}
              className="text-center"
            >
              <h2 className="text-[clamp(3rem,12vw,5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-[#1A1A1A]/80">
                {currentTitle}
              </h2>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/25">
                Tap to explore
              </p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Menu — revealed on tap ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="absolute inset-0 flex flex-col justify-center px-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Back button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 left-8 text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/40 font-medium"
            >
              ← Back
            </button>

            <NavMenu items={currentMenu} onNavigate={handleMenuNavigate} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Switch button — fixed bottom-right corner ── */}
      <button
        onClick={handleSwitch}
        className="absolute bottom-8 right-8 z-30 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/35 font-medium transition-opacity duration-200 active:opacity-60"
      >
        <span>{otherTitle}</span>
        <span className="text-lg leading-none">→</span>
      </button>
    </div>
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
      <BottomBranding />

      {/* ── Desktop: horizontal split (unchanged) ── */}
      <div className="relative z-10 hidden md:flex h-full w-full flex-row">
        <DesktopPanel
          side="left"
          active={hoveredSide === "left"}
          widthPct={leftWidth}
          idleTitle="Enterprise"
          menuItems={ENTERPRISE_MENU}
          onEnter={handleEnter("left")}
          onLeave={handleLeave}
          onNavigate={handleNavigate}
        />
        <DesktopPanel
          side="right"
          active={hoveredSide === "right"}
          widthPct={rightWidth}
          idleTitle="Talent"
          menuItems={APPLICANT_MENU}
          onEnter={handleEnter("right")}
          onLeave={handleLeave}
          onNavigate={handleNavigate}
        />
      </div>

      {/* ── Mobile: full-screen toggle ── */}
      <div className="relative z-10 flex md:hidden h-full w-full">
        <MobileHero onNavigate={handleNavigate} />
      </div>
    </section>
  );
}
