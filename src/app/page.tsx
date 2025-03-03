import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesCarousel } from "@/components/sections/features-section";
import { EnhancedShowcaseSection } from "@/components/sections/showcase-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesCarousel />
      <EnhancedShowcaseSection />
      <TestimonialsSection />
      
      {/* Hier können später weitere Sektionen wie Preise, etc. hinzugefügt werden */}
    </div>
  );
}