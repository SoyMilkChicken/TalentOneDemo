export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-[#0A0A0A] text-[#F5F5F5] flex flex-col items-center justify-center px-8 md:px-12 py-24 md:py-32 overflow-hidden"
    >
      {/* Large background text */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden text-center select-none">
        <p className="whitespace-nowrap text-[13vw] font-black uppercase leading-[0.75] tracking-tighter text-[#F5F5F5]/[0.03]">
          TalentOne
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#F5F5F5]/30 mb-8">
          Get in Touch
        </p>

        <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#F5F5F5]">
          Are You Ready
          <br />
          <span className="text-[#F5F5F5]/40">to Change How</span>
          <br />
          You Hire?
        </h2>

        <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
          <a
            href="mailto:feng375@purdue.edu"
            className="group flex flex-col items-center gap-2 cursor-pointer"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#F5F5F5]/30">
              Email
            </p>
            <p className="text-lg md:text-xl font-medium text-[#F5F5F5] transition-opacity duration-200 group-hover:opacity-50">
              feng375@purdue.edu
            </p>
          </a>

          <div className="hidden md:block h-12 w-px bg-[#F5F5F5]/10" />

          <a
            href="tel:+17657710393"
            className="group flex flex-col items-center gap-2 cursor-pointer"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#F5F5F5]/30">
              Phone
            </p>
            <p className="text-lg md:text-xl font-medium text-[#F5F5F5] transition-opacity duration-200 group-hover:opacity-50">
              (765) 771-0393
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
