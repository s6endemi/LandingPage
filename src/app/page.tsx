import { EnhancedHeroSection } from "@/components/sections/hero-section";
import { FeatureSection } from "@/components/sections/features-section";
import { ModernTestimonialSection } from "@/components/sections/testimonials-section";
import { RefinedProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { WaitlistCta } from "@/components/sections/cta-section";




export default function Home() {
  return (
    <div className="min-h-screen">
      <EnhancedHeroSection />
      <RefinedProblemSection />
      <SolutionSection />
      <FeatureSection />
      <ModernTestimonialSection />
      <WaitlistCta />
      
      {/* Hier können später weitere Sektionen wie Preise, etc. hinzugefügt werden */}
    </div>
  );
}