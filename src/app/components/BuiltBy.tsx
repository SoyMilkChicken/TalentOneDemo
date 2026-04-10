"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CUBIC = [0.16, 1, 0.3, 1] as const;

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
      className="relative min-h-[130vh] w-full bg-white text-[#1A1A1A] py-24 md:py-32 px-8 md:px-12 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Header — scroll-triggered reveal ── */}
      <motion.div
        className="text-center mb-32 md:mb-48"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: CUBIC }}
      >
        <p className="text-[20px] font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30 mb-4">
          The Team
        </p>
        <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-semibold uppercase leading-[0.85] tracking-tighter text-[#1A1A1A]">
          Built By
        </h2>
      </motion.div>

      {/* ── Team grid — staggered entrance ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl place-items-stretch">
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            className="group relative flex flex-col bg-white rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: CUBIC,
            }}
          >
            {/* Profile picture */}
            <div className="relative w-full aspect-square bg-[#e6e6e6] overflow-hidden">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                style={{ objectPosition: member.objectPosition }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Name + role */}
            <div className="flex flex-col items-center justify-center w-full py-12 md:py-16 bg-white">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#1A1A1A]">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-[#1A1A1A]/40 font-medium">
                {member.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
