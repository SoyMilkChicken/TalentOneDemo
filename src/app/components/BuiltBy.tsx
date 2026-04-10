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
      className="relative min-h-screen w-full bg-white text-[#1A1A1A] pt-56 md:pt-72 pb-24 md:pb-32 px-8 md:px-12 flex flex-col items-center overflow-hidden"
    >
      {/* ── Header — scroll-triggered reveal ── */}
      <motion.div
        className="text-center mb-24 md:mb-32"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: CUBIC }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30 mb-4">
          The Team
        </p>
        <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#1A1A1A]">
          Built By
        </h2>
      </motion.div>

      {/* ── Team grid — staggered entrance ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 w-full max-w-6xl place-items-center">
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            className="flex flex-col items-center gap-6 text-center"
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
            <div className="relative w-48 h-48 md:w-60 md:h-60 bg-[#f0f0ee] overflow-hidden">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover"
                style={{ objectPosition: member.objectPosition }}
                sizes="(max-width: 768px) 192px, 240px"
              />
            </div>

            {/* Name + role */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-[-0.02em] text-[#1A1A1A]">
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
