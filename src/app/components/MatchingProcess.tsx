"use client";

import { motion } from "framer-motion";

const CUBIC = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    number: "01",
    title: "Contextual Parsing",
    description:
      "We read beyond keywords to understand the context, impact, and actual signal behind each resume bullet.",
  },
  {
    number: "02",
    title: "Dynamic Skill Mapping",
    description:
      "Profiles are mapped against live enterprise demand to uncover adjacent capability, transition paths, and hidden overlap.",
  },
  {
    number: "03",
    title: "Precision Routing",
    description:
      "The right candidates surface to the right team at the exact moment a pipeline needs decisive momentum.",
  },
];

export default function MatchingProcess() {
  return (
    <section
      id="matching-science"
      className="relative w-full overflow-hidden border-y border-[#1A1A1A]/10 bg-[#F2EEE7] px-8 py-24 text-[#1A1A1A] md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: CUBIC }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-[#1A1A1A]/35">
            How It Works
          </p>
          <h2
            className="mt-6 text-[clamp(3rem,6.4vw,6rem)] leading-[0.94] tracking-[-0.05em] text-[#1A1A1A]"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            <span className="italic">The Science of Matching</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#1A1A1A]/55 md:text-lg">
            A calmer view of the engine underneath the platform: interpret,
            map, and route with precision.
          </p>
        </motion.div>

        <div className="mt-20 grid items-start gap-10 md:mt-24 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {STEPS.map((step, index) => (
            <div key={step.number} className="contents">
              <motion.article
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: CUBIC }}
              >
                <div
                  className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-[#1A1A1A]/12 bg-white text-[2rem] text-[#1A1A1A]/55"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  <span className="italic">{step.number}</span>
                </div>
                <div className="mt-10 h-px w-full max-w-[12rem] bg-[#1A1A1A]/12" />
                <h3
                  className="mt-8 text-[clamp(2rem,3vw,3.25rem)] leading-[0.96] tracking-[-0.05em] text-[#1A1A1A]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  {step.title}
                </h3>
                <p className="mt-6 max-w-[18rem] text-lg leading-[1.7] text-[#1A1A1A]/60">
                  {step.description}
                </p>
              </motion.article>

              {index < STEPS.length - 1 ? (
                <div className="hidden items-start justify-center pt-4 md:flex">
                  <div className="flex items-center gap-5 text-[#1A1A1A]/18">
                    <div className="h-px w-14 bg-[#1A1A1A]/12" />
                    <span
                      className="text-[2.5rem] leading-none"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      →
                    </span>
                    <div className="h-px w-14 bg-[#1A1A1A]/12" />
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
