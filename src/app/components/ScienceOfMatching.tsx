"use client";

import { motion } from "framer-motion";

const CUBIC = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    number: "01",
    tag: "Encoding",
    title: "Embed",
    description:
      'Every resume and job description is passed through Gemini embedding-001 and encoded into a single 3,072-dimensional dense vector. The model captures what a candidate actually does — not what words they used. "Python (pet snake, team mascot)" and "Python (backend engineering)" land in completely different regions of that space.',
    output: "3,072-dim vector per document",
  },
  {
    number: "02",
    tag: "Retrieval",
    title: "Score",
    description:
      "Cosine similarity is computed between every candidate vector and every active job description, stored in Supabase pgvector with an ivfflat index for fast approximate nearest-neighbor retrieval. In our benchmark of 41 candidates, real engineers averaged 60.6. Troll resumes averaged 41.9 — an 18.7-point separation invisible to any keyword-based system.",
    output: "Ranked similarity score per pair",
  },
  {
    number: "03",
    tag: "Delivery",
    title: "Route",
    description:
      "Only candidates above the semantic threshold surface to recruiters. The false positives that gamed their way to 80–100% on legacy ATS are filtered out. The strong hires — real engineers who scored 76–80 semantically — move to the top. Recruiters see signal, not noise.",
    output: "Precision shortlist, zero noise",
  },
];

export default function ScienceOfMatching() {
  return (
    <section
      id="matching-science"
      className="relative w-full bg-[#F5F5F5] text-[#1A1A1A] py-32 md:py-40"
    >
      <div className="max-w-5xl mx-auto px-8 sm:px-16 md:px-24 w-full">

        {/* ── Header ── */}
        <motion.div
          className="mb-24 md:mb-32 max-w-3xl"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: CUBIC }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#1A1A1A]/30 mb-6">
            How It Works
          </p>
          <div className="overflow-hidden pb-4">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.2, ease: CUBIC }}
              className="text-[clamp(2rem,7vw,7.5rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#1A1A1A]"
            >
              The Matching
              <br />
              <span className="text-[#1A1A1A]/20">Engine.</span>
            </motion.h2>
          </div>
          <p className="mt-8 text-lg md:text-xl leading-relaxed text-[#1A1A1A]/45">
            Three steps. No keyword lists. No Boolean logic. Just geometry.
          </p>
        </motion.div>

        {/* ── Steps ── */}
        <div className="flex flex-col divide-y divide-[#1A1A1A]/10 mt-20 md:mt-32">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-16 md:gap-x-24 md:gap-y-20 py-24 md:py-32"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: CUBIC }}
            >
              {/* Number + tag */}
              <div className="md:col-span-2 flex md:flex-col gap-4 md:gap-4 items-center md:items-start">
                <span className="font-mono text-[3rem] font-bold leading-none text-[#1A1A1A]/10">
                  {step.number}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#1A1A1A]/30">
                  {step.tag}
                </span>
              </div>

              {/* Title */}
              <div className="md:col-span-2 flex items-start pt-1">
                <h3 className="text-[clamp(1.75rem,3vw,3rem)] font-black uppercase leading-none tracking-tighter text-[#1A1A1A]">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-6 flex items-start">
                <p className="text-lg md:text-xl leading-relaxed text-[#1A1A1A]/55">
                  {step.description}
                </p>
              </div>

              {/* Output callout */}
              <div className="md:col-span-2 flex items-start justify-start md:justify-end">
                <div className="border border-[#1A1A1A]/15 px-4 py-3 inline-block">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/35">
                    Output
                  </p>
                  <p className="mt-2 text-xs font-medium text-[#1A1A1A]/60 leading-snug">
                    {step.output}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
