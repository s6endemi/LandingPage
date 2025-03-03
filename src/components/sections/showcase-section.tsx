"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

// Feature Showcase Card Component
const FeatureShowcaseCard = ({
  title,
  description,
  tags,
  mockupContent,
  index
}: {
  title: string;
  description: string;
  image: string;
  tags: string[];
  mockupContent: React.ReactNode;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={cardRef}
      className="relative group/card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-zinc-800/70 h-full flex flex-col bg-zinc-900/20"
        animate={{
          scale: isHovered ? 1.02 : 1,
          borderColor: isHovered ? "rgba(120, 120, 220, 0.3)" : "rgba(63, 63, 70, 0.7)",
          y: isHovered ? -5 : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15 
        }}
      >
        {/* Mockup Container */}
        <div className="p-5 relative">
          {/* Device Mockup */}
          <div className="aspect-[16/9] rounded-lg overflow-hidden relative border border-zinc-800/80 shadow-xl">
            {/* Mockup Header */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-zinc-800/90 flex items-center px-2 z-10">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className="w-24 h-3.5 rounded-full bg-zinc-700/70"></div>
              </div>
            </div>
            
            {/* Mockup Content */}
            <div className="pt-6 h-full w-full bg-gradient-to-b from-zinc-900 to-zinc-800">
              {mockupContent}
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-medium text-zinc-100 mb-2">{title}</h3>
          <p className="text-zinc-400 text-sm mb-4">{description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, i) => (
              <motion.span
                key={i}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800/70 text-zinc-300 border border-zinc-700/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1,
                  scale: 1
                }}
                transition={{ 
                  duration: 0.3,
                  delay: 0.6 + (i * 0.1)
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Animated corner accents */}
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r"
        ].map((position, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 ${position} border-blue-400/0`}
            animate={{ borderColor: isHovered ? "rgba(96, 165, 250, 0.5)" : "rgba(96, 165, 250, 0)" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// Dashboard Analytics Mockup Content
const DashboardAnalyticsMockup = () => {
  return (
    <div className="p-3 h-full">
      {/* Header with Stats */}
      <div className="flex justify-between mb-3">
        <div className="bg-zinc-700/30 rounded-md p-2 w-32">
          <div className="h-2 w-16 bg-blue-400/60 rounded-full mb-1.5"></div>
          <div className="h-4 w-20 bg-zinc-100/90 rounded-full"></div>
        </div>
        <div className="flex space-x-2">
          <div className="bg-zinc-700/30 rounded-md p-2 w-20">
            <div className="h-2 w-10 bg-green-400/60 rounded-full mb-1.5"></div>
            <div className="h-4 w-14 bg-zinc-100/90 rounded-full"></div>
          </div>
          <div className="bg-zinc-700/30 rounded-md p-2 w-20">
            <div className="h-2 w-10 bg-yellow-400/60 rounded-full mb-1.5"></div>
            <div className="h-4 w-14 bg-zinc-100/90 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Main Chart */}
      <div className="bg-zinc-800/50 rounded-md p-3 mb-3 border border-zinc-700/30">
        <div className="h-2 w-24 bg-zinc-400 rounded-full mb-2.5"></div>
        
        <div className="flex items-end space-x-1 h-20 mb-2">
          {[40, 65, 50, 80, 60, 85, 75, 90, 70, 60, 80, 95].map((h, i) => (
            <div key={i} className="flex-1 h-full flex items-end">
              <div 
                className="w-full rounded-sm bg-blue-500/70"
                style={{ height: `${h}%` }}
              ></div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between">
          <div className="h-2 w-8 bg-zinc-400/40 rounded-full"></div>
          <div className="h-2 w-8 bg-zinc-400/40 rounded-full"></div>
          <div className="h-2 w-8 bg-zinc-400/40 rounded-full"></div>
          <div className="h-2 w-8 bg-zinc-400/40 rounded-full"></div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-800/50 rounded-md p-2 border border-zinc-700/30">
          <div className="h-2 w-12 bg-zinc-400 rounded-full mb-2"></div>
          <div className="flex justify-between items-center">
            <div className="h-6 w-6 rounded-full bg-purple-500/70"></div>
            <div className="w-16 h-3 bg-zinc-100/80 rounded-full"></div>
          </div>
        </div>
        <div className="bg-zinc-800/50 rounded-md p-2 border border-zinc-700/30">
          <div className="h-2 w-12 bg-zinc-400 rounded-full mb-2"></div>
          <div className="flex justify-between items-center">
            <div className="h-6 w-6 rounded-full bg-indigo-500/70"></div>
            <div className="w-16 h-3 bg-zinc-100/80 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// NLP Analysis Mockup Content
const NLPAnalysisMockup = () => {
  return (
    <div className="p-3 h-full">
      {/* Text Input Area */}
      <div className="bg-zinc-700/30 rounded-md p-2 mb-3 border border-zinc-700/50">
        <div className="h-2 w-24 bg-zinc-400 rounded-full mb-2"></div>
        <div className="space-y-1.5">
          <div className="h-2 w-full bg-zinc-600/80 rounded-full"></div>
          <div className="h-2 w-5/6 bg-zinc-600/80 rounded-full"></div>
          <div className="h-2 w-4/6 bg-zinc-600/80 rounded-full"></div>
        </div>
      </div>
      
      {/* Analysis Results */}
      <div className="bg-zinc-800/50 rounded-md p-3 mb-3 border border-zinc-700/30">
        <div className="h-2 w-20 bg-blue-400/80 rounded-full mb-3"></div>
        
        {/* Sentiment Analysis */}
        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <div className="h-2 w-16 bg-zinc-500/80 rounded-full"></div>
            <div className="h-2 w-10 bg-zinc-500/80 rounded-full"></div>
          </div>
          <div className="h-3 w-full bg-zinc-700/50 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-green-500/70 rounded-full"></div>
          </div>
        </div>
        
        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-5 w-14 bg-blue-500/30 rounded-md border border-blue-400/30"></div>
          ))}
        </div>
        
        {/* Entity Recognition */}
        <div className="space-y-1.5">
          <div className="flex space-x-1">
            <div className="h-3 w-14 bg-zinc-100/80 rounded-sm"></div>
            <div className="h-3 w-8 bg-yellow-500/40 rounded-sm"></div>
            <div className="h-3 w-16 bg-zinc-100/80 rounded-sm"></div>
          </div>
          <div className="flex space-x-1">
            <div className="h-3 w-10 bg-zinc-100/80 rounded-sm"></div>
            <div className="h-3 w-12 bg-purple-500/40 rounded-sm"></div>
            <div className="h-3 w-8 bg-zinc-100/80 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Computer Vision Mockup Content
const ComputerVisionMockup = () => {
  return (
    <div className="p-3 h-full flex">
      {/* Image with Bounding Boxes */}
      <div className="flex-1 bg-zinc-800/70 rounded-md mr-2 border border-zinc-700/30 relative">
        {/* Placeholder Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-16 border-2 border-dashed border-zinc-600/70 rounded-md flex items-center justify-center">
            <div className="h-6 w-6 bg-zinc-700/70 rounded"></div>
          </div>
        </div>
        
        {/* Detection Boxes */}
        <div className="absolute top-1/4 left-1/4 h-8 w-8 border-2 border-blue-500/70 rounded-sm">
          <div className="absolute -top-4 left-0 h-3 w-12 bg-blue-500/80 text-[6px] flex items-center justify-center text-white">Person 98%</div>
        </div>
        <div className="absolute bottom-1/3 right-1/3 h-6 w-10 border-2 border-green-500/70 rounded-sm">
          <div className="absolute -top-4 left-0 h-3 w-12 bg-green-500/80 text-[6px] flex items-center justify-center text-white">Object 95%</div>
        </div>
      </div>
      
      {/* Results Panel */}
      <div className="flex-1 bg-zinc-800/50 rounded-md p-2 border border-zinc-700/30 flex flex-col">
        <div className="h-2 w-16 bg-zinc-400 rounded-full mb-3"></div>
        
        {/* Results List */}
        <div className="space-y-2 mb-2 flex-grow">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-3 w-14 bg-zinc-600/70 rounded-full"></div>
              <div className="h-3 w-8 bg-blue-400/70 rounded-full"></div>
            </div>
          ))}
        </div>
        
        {/* Controls */}
        <div className="flex justify-between">
          <div className="h-5 w-12 bg-zinc-700/70 rounded-md"></div>
          <div className="h-5 w-12 bg-blue-500/70 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

// Workflow Automation Mockup Content
const WorkflowAutomationMockup = () => {
  return (
    <div className="p-3 h-full">
      {/* Workflow Diagram */}
      <div className="h-full relative flex flex-col items-center justify-center">
        {/* Start Node */}
        <div className="h-8 w-24 bg-green-500/70 rounded-md mb-3 flex items-center justify-center">
          <div className="h-2 w-12 bg-white/80 rounded-full"></div>
        </div>
        
        {/* Connector */}
        <div className="h-4 w-0.5 bg-zinc-600 mb-1"></div>
        <div className="h-2 w-2 bg-zinc-500 rounded-full mb-1"></div>
        
        {/* Process Nodes */}
        <div className="flex space-x-12 mb-3">
          <div className="relative">
            <div className="h-8 w-24 bg-blue-500/70 rounded-md flex items-center justify-center">
              <div className="h-2 w-12 bg-white/80 rounded-full"></div>
            </div>
            {/* Connector to Decision */}
            <div className="absolute -right-6 top-1/2 w-6 h-0.5 bg-zinc-600"></div>
          </div>
          
          <div className="h-12 w-12 bg-yellow-500/70 rounded-full flex items-center justify-center rotate-45">
            <div className="h-6 w-6 border-2 border-white/80 rounded"></div>
          </div>
        </div>
        
        {/* Connector */}
        <div className="h-4 w-0.5 bg-zinc-600 mb-1"></div>
        <div className="h-2 w-2 bg-zinc-500 rounded-full mb-1"></div>
        
        {/* End Node */}
        <div className="h-8 w-24 bg-purple-500/70 rounded-md flex items-center justify-center">
          <div className="h-2 w-12 bg-white/80 rounded-full"></div>
        </div>
        
        {/* Status Indicator */}
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          <div className="h-2 w-10 bg-zinc-700/70 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

// Video Showcase Component
function VideoShowcase() {
  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="relative rounded-2xl overflow-hidden backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Premium Glass Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-transparent" />
            <BorderBeam className="absolute inset-0 opacity-20" />
          </div>
          
          <div className="relative z-10 p-10 md:p-16">
            {/* Header Section */}
            <div className="text-center mb-10">
              <motion.h3
                className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-300 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Erlebe SYNAPSE in Aktion
              </motion.h3>
              <motion.p
                className="text-zinc-400 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Sieh selbst, wie unsere KI-Plattform Arbeitsabläufe revolutioniert und Unternehmen in die Lage versetzt, 
                intelligentere Entscheidungen zu treffen und ihre Effizienz zu steigern.
              </motion.p>
            </div>
            
            {/* Video Section */}
            <div className="max-w-4xl mx-auto">
              <HeroVideoDialog
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/7Kt9ugD3bGQ?autoplay=1"
                thumbnailSrc="/ai-platform-demo.jpg"
                thumbnailAlt="SYNAPSE KI-Plattform Demo"
                className="w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Enhanced Showcase Section Component
export function EnhancedShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  // Feature showcase items
  const showcaseItems = [
    {
      title: "KI-gestützte Datenanalyse",
      description: "Echtzeit-Visualisierung komplexer Daten mit intelligenten Erkenntnissen und automatisierten Berichten.",
      image: "/placeholder-dashboard.jpg",
      tags: ["Echtzeit", "Automatisch", "Interaktiv"],
      mockupContent: <DashboardAnalyticsMockup />
    },
    {
      title: "Natürliche Sprachverarbeitung",
      description: "Fortschrittliche Textanalyse mit Stimmungserkennung, Entitätsextraktion und semantischer Klassifikation.",
      image: "/placeholder-nlp.jpg",
      tags: ["Mehrsprachig", "Kontextuell", "Genau"],
      mockupContent: <NLPAnalysisMockup />
    },
    {
      title: "Computer Vision",
      description: "Bilderkennung und Objektidentifikation mit Präzision, ideal für Qualitätskontrolle und Sicherheitsanwendungen.",
      image: "/placeholder-vision.jpg",
      tags: ["Objekterkennung", "Gesichtserkennung", "Schnell"],
      mockupContent: <ComputerVisionMockup />
    },
    {
      title: "Workflow-Automatisierung",
      description: "Intelligente Prozessautomatisierung, die sich an wechselnde Bedingungen anpasst und menschliche Eingriffe minimiert.",
      image: "/placeholder-workflow.jpg",
      tags: ["Adaptiv", "Zuverlässig", "Skalierbar"],
      mockupContent: <WorkflowAutomationMockup />
    }
  ];

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden" id="showcase">
      {/* Background mit sanftem Übergang */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/5 to-transparent" />
      </div>

      
      {/* Section Header */}
      <motion.div 
        className="container mx-auto px-4 mb-16"
        style={{ opacity, y }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Fortschrittliche KI-Anwendungen
          </motion.h2>
          <motion.p 
            className="text-zinc-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Entdecken Sie die innovativen Funktionen unserer KI-Plattform in realistischen Anwendungsszenarien
          </motion.p>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-blue-600/50 to-indigo-600/50 mx-auto mt-8 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>
      
      {/* Feature Showcase Grid */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {showcaseItems.map((item, index) => (
              <FeatureShowcaseCard
                key={index}
                title={item.title}
                description={item.description}
                image={item.image}
                tags={item.tags}
                mockupContent={item.mockupContent}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Video Showcase ersetzt den Highlighted Feature Bereich */}
      <VideoShowcase />
    </section>
  );
}