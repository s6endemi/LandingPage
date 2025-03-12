import { EnhancedHeroSection } from "@/components/sections/hero-section";
import { FeatureSection } from "@/components/sections/features-section";
import { TestimonialSection } from "@/components/sections/testimonials-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { WaitlistCta } from "@/components/sections/cta-section";



export default function Home() {
  return (
    <div className="min-h-screen">
      <EnhancedHeroSection />
      <SolutionSection />
      <FeatureSection />
      <TestimonialSection />
      <WaitlistCta />
      
      {/* Hier können später weitere Sektionen wie Preise, etc. hinzugefügt werden */}
    </div>
  );
}