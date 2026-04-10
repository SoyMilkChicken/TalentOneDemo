import SplitHero from "./components/SplitHero";
import HeroOverlay from "./components/HeroOverlay";
import BuiltBy from "./components/BuiltBy";
import Architecture from "./components/Architecture";
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
        <BuiltBy />
        <Architecture />
        <CaseStudy />
        <UploadSection />
      </div>
    </main>
  );
}
