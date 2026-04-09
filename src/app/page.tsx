import SplitHero from "./components/SplitHero";
import BuiltBy from "./components/BuiltBy";
import Architecture from "./components/Architecture";
import CaseStudy from "./components/CaseStudy";
import UploadSection from "./components/UploadSection";

export default function Home() {
  return (
    <main>
      <SplitHero />
      <BuiltBy />
      <Architecture />
      <CaseStudy />
      <UploadSection />
    </main>
  );
}
