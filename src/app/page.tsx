import SplitHero from "./components/SplitHero";
import HeroOverlay from "./components/HeroOverlay";
import LatentSpaceSection from "./components/LatentSpaceSection";
import StickyNav from "./components/StickyNav";
import Architecture from "./components/Architecture";
import CaseStudy from "./components/CaseStudy";
import ScienceOfMatching from "./components/ScienceOfMatching";
import BuiltBy from "./components/BuiltBy";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ScrollReset from "./components/ScrollReset";

export default function Home() {
  return (
    <main className="relative bg-black">
      <ScrollReset />
      <StickyNav />

      {/* Sticky hero */}
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <SplitHero />
        <HeroOverlay />
      </div>

      {/* Scrolling content */}
      <div className="relative z-10 w-full flex flex-col">
        <LatentSpaceSection />
        <Architecture />
        <CaseStudy />
        <ScienceOfMatching />
        <BuiltBy />
        <Footer />
      </div>

      <BackToTop />
    </main>
  );
}
