"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroOverlay() {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(() =>
    typeof window === "undefined" ? 800 : window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map scroll distance (0 to 1 window height) to opacity (0 to 0.75)
  const opacity = useTransform(scrollY, [0, windowHeight], [0, 0.75]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 bg-black z-50"
    />
  );
}
