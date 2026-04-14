"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import LatentSpaceCanvas from "./LatentSpaceCanvas";

export default function LatentSpaceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [showHeadline, setShowHeadline] = useState(true);

  // Detect when the section enters the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          setHasEntered(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasEntered]);

  // Once the section enters the viewport, start the timer
  useEffect(() => {
    if (!hasEntered) return;

    const timer = setTimeout(() => {
      setShowHeadline(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [hasEntered]);

  return (
    <div ref={sectionRef} id="latent-space" className="relative">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">

        {/* Canvas — always visible */}
        <div className="absolute inset-0">
          <LatentSpaceCanvas />
        </div>

        {/* Radial vignette */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.15)_50%,rgba(10,10,10,0.65)_100%)]" />

        {/* Corner label */}
        <div className="pointer-events-none absolute top-10 left-6 right-6 sm:left-8 sm:right-8 md:left-16 md:right-16 lg:left-24 lg:right-24 xl:left-28 xl:right-28 z-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#F5F5F5]/30">
            [ 3,072-Dimensional Latent Space ]
          </p>
        </div>

        {/* Headline — visible on entry, fades out automatically */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: showHeadline ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pointer-events-none relative z-20 text-center px-6 sm:px-8 max-w-4xl mx-auto"
        >
          <h2 className="text-[clamp(1.75rem,5.5vw,6rem)] font-black uppercase leading-[0.88] tracking-tighter text-[#F5F5F5]">
            Every resume.
            <br />
            Every requirement.
            <br />
            <span className="text-[#F5F5F5]/35">One shared space.</span>
          </h2>
          <p className="mt-5 sm:mt-8 text-sm sm:text-base md:text-lg text-[#F5F5F5]/45 max-w-xl mx-auto leading-relaxed">
            TalentOne encodes every candidate and job into a single
            high-dimensional space — where proximity means fit, not keywords.
          </p>
        </motion.div>

        {/* Scroll cue */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <p className="text-[9px] font-medium uppercase tracking-[0.45em] text-[#F5F5F5]/25">
            Scroll
          </p>
          <div className="w-px h-10 bg-gradient-to-b from-[#F5F5F5]/25 to-transparent" />
        </div>

      </section>
    </div>
  );
}
