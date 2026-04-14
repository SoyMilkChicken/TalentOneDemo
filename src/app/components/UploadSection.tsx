"use client";

import { motion } from "framer-motion";

const CUBIC = [0.16, 1, 0.3, 1] as const;

export default function UploadSection() {
  return (
    <section
      id="upload"
      className="relative min-h-screen w-full bg-[#F5F5F5] text-[#1A1A1A] py-24 md:py-32 px-8 md:px-12 flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: CUBIC }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30 mb-4">
          For Talent
        </p>
        <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#1A1A1A]">
          Upload
          <br />
          <span className="text-[#1A1A1A]/30">Your Vectors.</span>
        </h2>
      </motion.div>
    </section>
  );
}
