const BULLETS = [
  {
    title: "The Keyword Illusion",
    text: "Legacy ATS relies on exact-match Boolean logic, mathematically blind to context.",
  },
  {
    title: "The False Positive Penalty",
    text: "Evaluators waste 90-second review windows screening absurd false positives.",
  },
  {
    title: "The Discarded Alpha",
    text: "Highly qualified candidates with non-obvious but mathematically proximate fit are systematically auto-rejected before human review.",
  },
];

export default function CaseStudy() {
  return (
    <section
      id="case-study"
      className="relative min-h-screen w-full bg-[#1A1A1A] text-[#F5F5F5] py-24 md:py-32 px-8 md:px-12 flex flex-col"
    >
      {/* ── Header ── */}
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#F5F5F5]/30 mb-4">
          Case Study
        </p>
        <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#F5F5F5]">
          What the ATS
          <br />
          <span className="text-[#F5F5F5]/40">Failed to Do</span>
        </h2>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-16 md:mt-24 flex-1">
        {/* Left: Narrative */}
        <div className="md:col-span-4">
          <h3 className="text-2xl font-bold mb-8 text-[#F5F5F5]">
            The Cost of Brittle Parsing
          </h3>
          <div className="flex flex-col gap-6">
            {BULLETS.map((b) => (
              <div key={b.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#F5F5F5]/50 mb-1.5">
                  {b.title}
                </p>
                <p className="text-sm leading-relaxed text-[#F5F5F5]/70">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Data placeholder */}
        <div className="md:col-span-8 flex items-stretch">
          <div className="w-full min-h-[400px] md:h-[600px] border border-[#F5F5F5]/20 flex items-center justify-center">
            <span className="text-sm uppercase tracking-[0.2em] text-[#F5F5F5]/20 text-center px-4">
              [ Interactive Vector Scatter Plot Will Render Here ]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
