const TEAM = [
  { name: "Stan Feng", role: "Co-Founder & Engineering" },
  { name: "Perry Su", role: "Co-Founder & Product" },
];

export default function BuiltBy() {
  return (
    <section
      id="built-by"
      className="relative min-h-screen w-full bg-white text-[#1A1A1A] py-24 md:py-32 px-8 md:px-12 flex flex-col"
    >
      {/* ── Header ── */}
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30 mb-4">
          The Team
        </p>
        <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#1A1A1A]">
          Built By
        </h2>
      </div>

      {/* ── Team grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mt-16 md:mt-24 max-w-4xl">
        {TEAM.map((member) => (
          <div key={member.name} className="flex flex-col items-start gap-6">
            {/* Profile picture placeholder */}
            <div className="w-40 h-40 md:w-52 md:h-52 bg-[#f0f0ee] flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/15">
                Photo
              </span>
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
          </div>
        ))}
      </div>
    </section>
  );
}
