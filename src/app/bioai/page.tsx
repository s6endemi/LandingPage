import { BioAIHero } from "@/components/bioai/hero-section";
import { SolutionVisualization } from "@/components/bioai/solution-visualization";
import { ElegantSolutionSection } from "@/components/bioai/elegant-solution-section";

export default function BioAIPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <BioAIHero />
      <SolutionVisualization />
      <ElegantSolutionSection />
    </main>
  );
}
