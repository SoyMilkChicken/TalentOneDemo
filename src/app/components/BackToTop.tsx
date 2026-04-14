"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.75);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-[#1A1A1A]/15 bg-[#F5F5F5]/95 text-[#1A1A1A] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1A1A1A]/30 md:bottom-8 md:right-8 md:h-12 md:w-12 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span
        aria-hidden="true"
        className="text-lg leading-none md:text-xl"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        ↑
      </span>
    </button>
  );
}
