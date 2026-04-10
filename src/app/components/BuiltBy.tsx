import Image from "next/image";

const TEAM = [
  {
    name: "Stan Feng",
    role: "Co-Founder & Engineering",
    photo: "/team/stan-feng.jpg",
  },
  {
    name: "Perry Su",
    role: "Co-Founder & Product",
    photo: "/team/perry-su.jpg",
  },
  {
    name: "JiuJiu Su",
    role: "Co-Founder & Design",
    photo: "/team/jiujiu-su.jpg",
  },
];

export default function BuiltBy() {
  return (
    <section
      id="built-by"
      className="relative min-h-screen w-full bg-white text-[#1A1A1A] pt-40 md:pt-56 pb-24 md:pb-32 px-8 md:px-12 flex flex-col items-center"
    >
      {/* ── Header ── */}
      <div className="text-center mb-24 md:mb-32">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30 mb-4">
          The Team
        </p>
        <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#1A1A1A]">
          Built By
        </h2>
      </div>

      {/* ── Team grid — centered with generous spacing ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 w-full max-w-6xl place-items-center">
        {TEAM.map((member) => (
          <div key={member.name} className="flex flex-col items-center gap-6 text-center">
            {/* Profile picture */}
            <div className="relative w-48 h-48 md:w-60 md:h-60 bg-[#f0f0ee] overflow-hidden">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover"
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
          </div>
        ))}
      </div>
    </section>
  );
}
