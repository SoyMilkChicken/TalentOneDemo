import SplitHero from "./components/SplitHero";
import HeroOverlay from "./components/HeroOverlay";
import LatentSpaceCanvas from "./components/LatentSpaceCanvas";
import BackToTop from "./components/BackToTop";
import BuiltBy from "./components/BuiltBy";
import Architecture from "./components/Architecture";
import MatchingProcess from "./components/MatchingProcess";
import CaseStudy from "./components/CaseStudy";
import UploadSection from "./components/UploadSection";

export default function Home() {
  return (
    <main className="relative bg-black">
      {/* Sticky Hero section that stays fixed while scrolling */}
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <SplitHero />
        <HeroOverlay />
      </div>
      
      {/* Content wrapper that will scroll over the sticky hero */}
      <div className="relative z-10 w-full flex flex-col">
        <section
          id="latent-space"
          className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0A]"
        >
          <div className="absolute inset-0">
            <LatentSpaceCanvas />
          </div>

          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.12)_50%,rgba(10,10,10,0.56)_100%)]" />

          <div className="pointer-events-none absolute top-12 left-12 z-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#F5F5F5]/48">
              [ 3,072-DIMENSIONAL LATENT SPACE ]
            </p>
          </div>

        </section>

        <CaseStudy />
        <BuiltBy />
        <Architecture />
        <MatchingProcess />
        <UploadSection />
      </div>

      <BackToTop />
    </main>
  );
}
