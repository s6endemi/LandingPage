"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { FlipWords } from "@/components/ui/flip-words";
import { HeroMockupAnimation } from "@/components/demo/heromockup";
import { PhoneMockup } from "@/components/ui/phone-mockup";

export function EnhancedHeroSection() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Subtle parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 15 : 50]);
  
  // Define colors using 60/30/10 principle
  // 60% - Neutral colors (grays, white, black)
  const neutralMedium = "#4b5563";
  
  // 30% - Brand colors
  const mainGreen = "#9bc539";
  
  // 10% - Call to action / Highlight
  const ctaGreen = "#9bc539";
  
  // Words for FlipWords component
  const flipWordsList = [
    "Personal Trainer",
    "Trainingspartner",
    "Ernährungsberater",
    "Gesundheitscoach"
  ];

  return (
    <div 
      id="hero" 
      ref={containerRef}
      className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center overflow-hidden font-inter"
    >
      {/* Clean white background */}
      <div className="absolute inset-0 bg-white -z-20"></div>
      
      {/* Subtle particle background with reduced opacity */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <Particles
          className="h-full w-full"
          quantity={isMobile ? 8 : 15}
          color={neutralMedium}
          size={1}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-8 md:py-16">
        {/* Mobile layout */}
        {isMobile ? (
          <div className="flex flex-col items-center">
            {/* HEADLINE FIRST on mobile - for clarity and immediate value proposition */}
            <div className="w-full text-center mb-8">
              {/* Pre-headline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="mb-3"
              >
                <p className="uppercase tracking-wider font-medium text-xs text-center text-gray-500">
                  Demnächst verfügbar
                </p>
              </motion.div>
              
              {/* Main headline */}
              <motion.div
                className="mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h1 className="text-4xl sm:text-5xl font-normal text-gray-900 leading-tight">
                  Dein persönlicher
                </h1>
              </motion.div>
              
              {/* FlipWords headline */}
              <motion.div
                className="relative mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                  <FlipWords 
                    words={flipWordsList} 
                    duration={3000}
                    className="relative" 
                  />
                </h1>
                
                {/* Underline effect */}
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 mx-auto h-[3px] bg-gradient-to-r from-[#9bc539]/30 to-gray-200"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                ></motion.div>
              </motion.div>
              
              {/* "powered by AI" subtitle */}
              <motion.p
                className="text-sm font-medium text-gray-500 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                powered by AI
              </motion.p>
              
            </div>
            
            {/* PHONE MOCKUP - Größeres Mockup für Mobile */}
            <div className="w-full mb-10">
              <motion.div 
                className="relative mx-auto"
                style={{ y }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Container für das Mockup - Volle Breite ausnutzen */}
                <div className="w-full flex justify-center items-center">
                  {/* Direktes Rendering der Mockup-Animation mit Glaseffekt-Rahmen */}
                  <div className="relative w-[280px] h-[580px] bg-black rounded-[40px] overflow-hidden shadow-xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[25px] bg-black rounded-b-xl z-20"></div>
                    
                    {/* Innerer Bildschirm */}
                    <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[32px] overflow-hidden m-[10px] bg-white">
                      {/* Direktes Einbetten des HeroMockupAnimation */}
                      <HeroMockupAnimation />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Main text description moved after mockup */}
              <motion.p 
                className="text-base font-semibold text-gray-600 mb-8 mt-8 max-w-lg mx-auto leading-relaxed text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Dein KI-Fitness-Coach rund um die Uhr. Genau wie ein echter Personal Trainer, nur ohne die hohen Kosten.
              </motion.p>
            </div>
            
            {/* CTA SECTION - Email capture box */}
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mb-8"
              >
                <div className="bg-white rounded-2xl py-7 px-5 shadow-md border border-gray-100 relative overflow-hidden">
                  <h3 className="text-left text-xl font-semibold text-gray-800 mb-2">Sei von Anfang an dabei!</h3>
                  <p className="text-left text-gray-600 text-sm mb-4">
                    Sichere dir <span className="font-semibold text-[#8ab42d]">30% Rabatt</span> und zwei Wochen Premium-Coaching kostenlos
                  </p>
                  
                  <div className="flex flex-col gap-3 mb-3">
                    <input 
                      type="email" 
                      placeholder="Deine E-Mail Adresse" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#8ab42d]/30 focus:border-[#8ab42d] transition-all text-sm"
                    />
                    <motion.button 
                      className="w-full text-white font-medium rounded-xl px-4 py-4 transition-all shadow-md relative overflow-hidden group"
                      style={{ 
                        backgroundColor: ctaGreen
                      }}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ 
                        boxShadow: "0 10px 15px -3px rgba(139, 180, 45, 0.1), 0 4px 6px -2px rgba(139, 180, 45, 0.05)"
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                        Jetzt sichern
                        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </motion.button>
                  </div>
                  
                  <p className="text-xs text-gray-500">Kein Spam, nur Updates zum Launch! Du kannst dich jederzeit abmelden.</p>
                </div>
              </motion.div>
              
              {/* Social proof - Compact for mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full border border-white overflow-hidden bg-gray-200"></div>
                    ))}
                    <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-white text-xs bg-gray-500">
                      +
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">
                    250+ Anmeldungen
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex mr-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">4.8/5</span>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Desktop layout - Side by side with more spacing and expanded width */
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Content column - Start earlier for more left expansion */}
            <div className="col-span-6 col-start-1 z-10 text-left pr-8">
              {/* Pre-headline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mb-5"
              >
                <p className="uppercase tracking-wider font-medium text-sm text-gray-500">
                  Demnächst verfügbar
                </p>
              </motion.div>

              {/* Headline with FlipWords integration - slightly larger */}
              <div className="mb-8">
                <motion.h1 
                  className="text-5xl lg:text-6xl xl:text-7xl font-normal text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  Dein persönlicher
                </motion.h1>
                
                <motion.div 
                  className="relative mt-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                    <FlipWords 
                      words={flipWordsList} 
                      duration={3000}
                      className="relative" 
                    />
                  </h1>
                  
                  {/* Elegant underline */}
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-[4px] bg-gradient-to-r from-[#9bc539]/30 to-gray-200"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
                  ></motion.div>
                </motion.div>
                
                {/* "powered by AI" subtitle */}
                <motion.p
                  className="text-lg font-medium text-gray-500 mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  powered by AI
                </motion.p>
              </div>
              
              {/* Subheadline - slightly larger */}
              <motion.p 
                className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Dein KI-Fitness-Coach rund um die Uhr. Genau wie ein echter Personal Trainer, nur ohne die hohen Kosten.
              </motion.p>
              
              
              {/* CTA - Desktop version - slightly larger */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mb-8"
              >
                <div className="bg-white rounded-2xl py-8 px-8 shadow-md border border-gray-100 relative overflow-hidden max-w-xl">
                  <div className="absolute top-4 right-6">
                    <div className="flex items-center">
                      <span className="text-xs font-medium text-gray-500">Early Access</span>
                    </div>
                  </div>
                  
                  <h3 className="text-left text-xl lg:text-2xl font-semibold text-gray-800 mb-3">Sei von Anfang an dabei!</h3>
                  <p className="text-left text-gray-600 text-base mb-6">
                    Sichere dir <span className="font-semibold text-[#8ab42d]">30% Rabatt</span> und zwei Wochen Premium-Coaching kostenlos
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <input 
                      type="email" 
                      placeholder="Deine E-Mail Adresse" 
                      className="flex-1 px-5 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#8ab42d]/30 focus:border-[#8ab42d] transition-all text-base"
                    />
                    <motion.button 
                      className="text-white font-medium rounded-xl px-7 py-4 transition-all shadow-md relative overflow-hidden group whitespace-nowrap"
                      style={{ 
                        backgroundColor: ctaGreen
                      }}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ 
                        boxShadow: "0 10px 15px -3px rgba(139, 180, 45, 0.1), 0 4px 6px -2px rgba(139, 180, 45, 0.05)"
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Jetzt sichern
                        <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </motion.button>
                  </div>
                  
                  <p className="text-sm text-gray-500">Kein Spam, nur Updates zum Launch! Du kannst dich jederzeit abmelden.</p>
                </div>
              </motion.div>
              
              {/* Social proof - Desktop layout */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center justify-between mb-6"
              >
                {/* User participation */}
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="w-7 h-7 rounded-full border border-white overflow-hidden bg-gray-200"></div>
                    ))}
                    <div className="w-7 h-7 rounded-full border border-white flex items-center justify-center text-white text-xs bg-gray-500">
                      +
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">
                    Bereits 250+ Anmeldungen
                  </span>
                </div>
                
                {/* Rating */}
                <div className="flex items-center">
                  <div className="flex mr-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4.8/5 Bewertung</span>
                </div>
              </motion.div>
            </div>
            
            {/* Phone Image - Desktop */}
            <div className="col-span-6 col-start-7 flex justify-center items-center">
              <motion.div 
                className="relative"
                style={{ y }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Direktes Rendering der Mockup-Animation mit Glaseffekt-Rahmen */}
                <div className="relative w-[320px] h-[650px] bg-black rounded-[40px] overflow-hidden shadow-xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-xl z-20"></div>
                  
                  {/* Innerer Bildschirm */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[32px] overflow-hidden m-[12px] bg-white">
                    {/* Direktes Einbetten des HeroMockupAnimation */}
                    <HeroMockupAnimation />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}