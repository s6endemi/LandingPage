import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesBenefitsSection } from "@/components/sections/features-section";
import { EnhancedShowcaseSection } from "@/components/sections/showcase-section";
import { SocialProofSection } from "@/components/sections/testimonials-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { FinalCtaSection } from "@/components/sections/cta-section";




export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesBenefitsSection />
      <EnhancedShowcaseSection />
      <SocialProofSection />
      <FinalCtaSection />
      
      {/* Hier können später weitere Sektionen wie Preise, etc. hinzugefügt werden */}
    </div>
  );
}