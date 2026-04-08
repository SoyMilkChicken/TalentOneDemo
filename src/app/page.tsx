import SplitHero from "./components/SplitHero";
import BuiltBy from "./components/BuiltBy";
import CaseStudy from "./components/CaseStudy";
import UploadSection from "./components/UploadSection";

export default function Home() {
  return (
    <main>
      <SplitHero />
      <BuiltBy />
      <CaseStudy />
      <UploadSection />
    </main>
  );
}
