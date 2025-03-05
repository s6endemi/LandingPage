import { ProfessionalHeroSection } from "@/components/sections/hero-section";
import { AthlyFeatureSection } from "@/components/sections/features-section";
import { EnhancedSocialProofSection } from "@/components/sections/testimonials-section";
import { ElegantProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { FinalWaitlistCta } from "@/components/sections/cta-section";




export default function Home() {
  return (
    <div className="min-h-screen">
      <ProfessionalHeroSection />
      <ElegantProblemSection />
      <SolutionSection />
      <AthlyFeatureSection />
      <EnhancedSocialProofSection />
      <FinalWaitlistCta />
      
      {/* Hier können später weitere Sektionen wie Preise, etc. hinzugefügt werden */}
    </div>
  );
}