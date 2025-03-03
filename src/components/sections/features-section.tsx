"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FeaturesCarousel() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [direction, setDirection] = useState(0); // -1 für links, 1 für rechts
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Features Array mit festen Tailwind-Farbklassen
  const features = [
    {
      title: "Personalisierter KI-Coach",
      description: "Dein 24/7 verfügbarer Coach, der sich an deinen Lebensstil anpasst und dich kontinuierlich motiviert.",
      colorClass: "bg-[#8AAE39]", // Feste CSS-Klasse statt dynamischer Variable
      textColorClass: "text-[#8AAE39]", // Feste CSS-Klasse für Text
      mockupContent: "chat-coach"
    },
    {
      title: "Smarte Trainingspläne",
      description: "Individuell erstellte und automatisch angepasste Trainingspläne, die mit deinem Fortschritt wachsen.",
      colorClass: "bg-[#8AAE39]",
      textColorClass: "text-[#8AAE39]",
      mockupContent: "workout-plan"
    },
    {
      title: "Maßgeschneiderte Ernährung",
      description: "Ernährungspläne, die zu deinem Geschmack und Lifestyle passen – ohne starre Diätvorschriften.",
      colorClass: "bg-[#8AAE39]",
      textColorClass: "text-[#8AAE39]",
      mockupContent: "nutrition"
    },
    {
      title: "Multi-Kommunikation",
      description: "Sprich mit deinem Coach per Chat, Sprache oder Video – genau wie mit einem echten Trainer.",
      colorClass: "bg-[#8AAE39]",
      textColorClass: "text-[#8AAE39]",
      mockupContent: "communication"
    },
    {
      title: "Intelligente Anpassungen",
      description: "Automatische Anpassungen deines Plans bei Krankheit, Urlaub oder unvorhergesehenen Ereignissen.",
      colorClass: "bg-[#8AAE39]",
      textColorClass: "text-[#8AAE39]",
      mockupContent: "adaptivity"
    }
  ];

  // Navigation Funktionen mit useCallback
  const nextFeature = useCallback(() => {
    setDirection(1);
    setCurrentFeature((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  }, [features.length]);

  const prevFeature = useCallback(() => {
    setDirection(-1);
    setCurrentFeature((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  }, [features.length]);

  const goToFeature = useCallback((index: number) => {
    setDirection(index > currentFeature ? 1 : -1);
    setCurrentFeature(index);
  }, [currentFeature]);

  // Autoplay Logik
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextFeature();
      }, 6000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, nextFeature]); // Hinzufügen von nextFeature als Abhängigkeit

  // Pausiere Autoplay bei Interaktion
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);

  // Slide Varianten für Animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0
    })
  };

  return (
    <section 
      id="features" 
      className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Erlebe Fitness neu definiert
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Athly bietet dir Features, die weit über traditionelle Fitness-Apps hinausgehen. 
            Entdecke, wie ein persönlicher KI-Coach dein Trainingserlebnis revolutioniert.
          </motion.p>
        </div>

        {/* Feature Carousel */}
        <div 
          ref={carouselRef}
          className="relative max-w-6xl mx-auto"
        >
          {/* Feature Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[600px]">
            {/* Feature Description */}
            <motion.div 
              className="lg:col-span-5 order-2 lg:order-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentFeature}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.5 }}
                  className="space-y-6"
                >
                  <h3 
                    className={`text-2xl font-bold mb-3 ${features[currentFeature].textColorClass}`}
                  >
                    {features[currentFeature].title}
                  </h3>
                  <p className="text-gray-600 text-lg">{features[currentFeature].description}</p>
                  
                  {/* Feature Indicators */}
                  <div className="flex space-x-3 mt-8 lg:justify-start justify-center">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToFeature(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index === currentFeature 
                            ? `w-8 ${features[currentFeature].colorClass}` 
                            : "w-2.5 bg-gray-300"
                        }`}
                        aria-label={`Go to feature ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Learn More Button */}
                  <div className="mt-8 inline-block">
                    <button 
                      className="group flex items-center text-[#8AAE39] font-medium hover:underline"
                    >
                      <span>Mehr erfahren</span>
                      <svg 
                        className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          
            {/* Mockup Display */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentFeature}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.5, delay: 0.1 }}
                  className="relative"
                >
                  {/* Phone Mockup with Empty Screen ready for content */}
                  <div className="relative w-[280px] md:w-[320px] mx-auto">
                    {/* Glow Effect */}
                    <div 
                      className={`absolute inset-0 blur-2xl opacity-10 rounded-full z-0 ${features[currentFeature].colorClass}`}
                    ></div>
                    
                    {/* Phone Frame */}
                    <div className="relative z-10">
                      <div className="relative rounded-[40px] border-[14px] border-[#111] bg-[#111] shadow-xl">
                        {/* Screen Content - Empty for now */}
                        <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-b from-[#fafafa] to-[#f0f0f0] h-[540px]">
                          {/* App Header */}
                          <div className="absolute top-0 left-0 right-0 h-16 bg-[#8AAE39] flex items-center justify-between px-5">
                            <div className="flex items-center">
                              <svg 
                                className="h-6 w-6 text-white" 
                                viewBox="0 0 100 100" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path 
                                  d="M50 5L90 80H75L50 30L25 80H10L50 5Z" 
                                  stroke="white" 
                                  strokeWidth="4" 
                                />
                                <path 
                                  d="M25 80H75H90L75 100H25L10 80H25Z" 
                                  stroke="white" 
                                  strokeWidth="4" 
                                />
                              </svg>
                              <span className="ml-2 text-white font-medium">Athly</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                              </svg>
                            </div>
                          </div>
                          
                          {/* Feature Name as Placeholder */}
                          <div className="flex flex-col items-center justify-center h-full px-5">
                            <div className="text-center text-gray-400 opacity-50">
                              <div className="text-sm mb-2">{features[currentFeature].mockupContent}</div>
                              <p className="text-xs">Mockup-Inhalt wird hier dargestellt</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-2xl z-20"></div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none">
            <button 
              onClick={prevFeature}
              className="text-gray-400 hover:text-[#8AAE39] transition-colors w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md pointer-events-auto"
              aria-label="Previous feature"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextFeature}
              className="text-gray-400 hover:text-[#8AAE39] transition-colors w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md pointer-events-auto"
              aria-label="Next feature"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Call-to-Action Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Bereit für deinen persönlichen KI-Fitness-Coach?</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Erlebe einen völlig neuen Weg zu trainieren – mit einem Coach, der dich versteht und unterstützt.
          </p>
          
          <motion.button 
            className="bg-[#8AAE39] hover:bg-[#7a9c30] text-white px-8 py-3 rounded-lg shadow-md font-medium transition-all relative overflow-hidden group"
            whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(138, 174, 57, 0.15)" }}
            whileTap={{ y: 0 }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <span className="relative z-10 flex items-center">
              Kostenlos testen
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}