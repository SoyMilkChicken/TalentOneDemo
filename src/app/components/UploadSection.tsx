export default function UploadSection() {
  return (
    <section
      id="upload"
      className="relative min-h-screen w-full bg-[#F5F5F5] text-[#1A1A1A] py-24 md:py-32 px-8 md:px-12 flex flex-col justify-center"
    >
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1A1A1A]/30 mb-4">
        For Talent
      </p>
      <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#1A1A1A]">
        Upload
        <br />
        <span className="text-[#1A1A1A]/30">Your Vectors.</span>
      </h2>
    </section>
  );
}
