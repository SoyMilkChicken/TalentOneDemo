"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CUBIC = [0.22, 1, 0.36, 1] as const;

const TEAM = [
  {
    name: "Stan Feng",
    role: "Co-Founder & Engineering",
    photo: "/team/stan-feng.jpg",
    objectPosition: "top", // Show head, not crop it
  },
  {
    name: "Perry Su",
    role: "Co-Founder & Product",
    photo: "/team/perry-su.jpg",
    objectPosition: "center",
  },
  {
    name: "JiuJiu Su",
    role: "Co-Founder & Design",
    photo: "/team/jiujiu-su.jpg",
    objectPosition: "center",
  },
];

export default function BuiltBy() {
  return (
    <section
      id="built-by"
      className="relative w-full bg-white text-[#1A1A1A] pt-32 md:pt-40 pb-48 md:pb-72 flex flex-col items-center overflow-hidden"
    >
      {/* ── Header — scroll-triggered reveal ── */}
      <motion.div
        className="text-center mb-32 md:mb-48 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: CUBIC }}
      >
        <p className="text-[20px] font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30 mb-4">
          The Team
        </p>
        <div className="overflow-hidden pb-4 inline-block">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: CUBIC }}
            className="text-[clamp(2rem,7vw,7.5rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#1A1A1A]"
          >
            Built By
          </motion.h2>
        </div>
      </motion.div>

      {/* ── Team grid — staggered entrance ── */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 place-items-stretch"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            className="group relative flex flex-col bg-white rounded-none border border-[#1A1A1A]/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
          >
            {/* Profile picture */}
            <div className="relative w-full aspect-square bg-[#e6e6e6] overflow-hidden rounded-none">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="rounded-none object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                style={{ objectPosition: member.objectPosition }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Name + role */}
            <div className="flex flex-col items-center justify-center w-full py-16 md:py-24 bg-white">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#1A1A1A]">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-[#1A1A1A]/40 font-medium">
                {member.role}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
