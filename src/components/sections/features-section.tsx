"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FeaturesBenefitsSection() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [direction, setDirection] = useState(0); // -1 für links, 1 für rechts
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Längerer Autoplay-Timer
  const autoplayDuration = 10000;

  // Features und Benefits Array - jetzt mit klarer Trennung
  const features = [
    {
      // WHAT
      featureTitle: "KI-Coach mit Persönlichkeit",
      featureDescription: "Ein virtuelle Coach, der dich und deine Ziele wirklich versteht",
      // HOW & WHY (Benefits)
      benefits: [
        "Nie wieder allein trainieren – dein Coach ist immer für dich da",
        "Deine Fragen werden sofort beantwortet – keine Recherche nötig",
        "Motivation genau dann, wenn du sie am meisten brauchst"
      ],
      colorClass: "bg-[#8AAE39]",
      textColorClass: "text-[#8AAE39]",
      mockupContent: "chat-coach"
    },
    {
      // WHAT
      featureTitle: "Adaptive Trainingspläne",
      featureDescription: "Trainingspläne, die sich automatisch an deine Fortschritte anpassen",
      // HOW & WHY (Benefits)
      benefits: [
        "Stetige Fortschritte durch intelligente Belastungsanpassung",
        "Keine Plateaus mehr durch dynamische Trainingssteuerung",
        "Training optimal angepasst an deinen Alltag und Energielevel"
      ],
      colorClass: "bg-[#8AAE39]",
      textColorClass: "text-[#8AAE39]",
      mockupContent: "workout-plan"
    },
    {
      // WHAT
      featureTitle: "Personalisierte Ernährung",
      featureDescription: "Ernährungspläne basierend auf deinen Vorlieben und Zielen",
      // HOW & WHY (Benefits)
      benefits: [
        "Esse was du magst und erreiche trotzdem deine Ziele",
        "Flexible Mahlzeitenplanung statt rigider Diät-Vorschriften",
        "Lerne gesunde Ernährung, die zu deinem Lebensstil passt"
      ],
      colorClass: "bg-[#8AAE39]",
      textColorClass: "text-[#8AAE39]",
      mockupContent: "nutrition"
    },
    {
      // WHAT
      featureTitle: "Multimodale Kommunikation",
      featureDescription: "Kommuniziere mit deinem Coach per Text, Sprache oder Video",
      // HOW & WHY (Benefits)
      benefits: [
        "Immer die passende Kommunikationsmethode für jede Situation",
        "Trainingstechniken visuell erklärt, wenn du sie brauchst",
        "Natürliche Gespräche wie mit einem echten Trainer"
      ],
      colorClass: "bg-[#8AAE39]",
      textColorClass: "text-[#8AAE39]",
      mockupContent: "communication"
    },
    {
      // WHAT
      featureTitle: "Lebensangepasste Planung",
      featureDescription: "Automatische Anpassung bei unvorhergesehenen Ereignissen",
      // HOW & WHY (Benefits)
      benefits: [
        "Kein schlechtes Gewissen mehr bei verpassten Trainings",
        "Work-Life-Balance durch flexible Trainingsplanung",
        "Stressfreies Training auch bei vollem Terminkalender"
      ],
      colorClass: "bg-[#8AAE39]",
      textColorClass: "text-[#8AAE39]",
      mockupContent: "adaptivity"
    }
  ];

  // Funktion zum Zurücksetzen des Autoplay-Timers
  const resetAutoplayTimer = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentFeature((prev) => (prev === features.length - 1 ? 0 : prev + 1));
      }, autoplayDuration);
    }
  }, [autoplay, features.length]);

  // Navigation Funktionen mit useCallback und Timer-Reset
  const nextFeature = useCallback(() => {
    setDirection(1);
    setCurrentFeature((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    resetAutoplayTimer(); // Timer zurücksetzen bei manuellem Klick
  }, [features.length, resetAutoplayTimer]);

  const prevFeature = useCallback(() => {
    setDirection(-1);
    setCurrentFeature((prev) => (prev === 0 ? features.length - 1 : prev - 1));
    resetAutoplayTimer(); // Timer zurücksetzen bei manuellem Klick
  }, [features.length, resetAutoplayTimer]);

  const goToFeature = useCallback((index: number) => {
    setDirection(index > currentFeature ? 1 : -1);
    setCurrentFeature(index);
    resetAutoplayTimer(); // Timer zurücksetzen bei manuellem Klick
  }, [currentFeature, resetAutoplayTimer]);

  // Autoplay initial starten und bei Änderungen aktualisieren
  useEffect(() => {
    resetAutoplayTimer();
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, resetAutoplayTimer]);

  // Pausiere Autoplay bei Interaktion
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => {
    setAutoplay(true);
    resetAutoplayTimer();
  };

  // Slide Varianten für Text-Animation
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

  // Fade Varianten für Mockup-Animation
  const fadeVariants = {
    enter: {
      opacity: 0,
      scale: 0.95
    },
    center: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 0.95
    }
  };

  return (
    <section 
      id="features" 
      className="py-16 md:py-24 bg-white overflow-hidden"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <div className="container mx-auto px-4">
        {/* Section Header - optimiert mit Benefits-Fokus */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span 
            className="inline-block text-[#8AAE39] font-medium mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            FUNKTIONEN MIT ECHTEM MEHRWERT
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-3 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Was macht Athly so besonders?
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nicht nur was wir bieten, sondern wie es dein Fitnesserlebnis verändert. 
            Entdecke die Vorteile, die nur ein echter KI-Coach bieten kann.
          </motion.p>
        </div>

        {/* Feature Carousel */}
        <div 
          ref={carouselRef}
          className="relative max-w-6xl mx-auto"
        >
          {/* Feature Content mit Features-Benefits Struktur */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[550px]">
            {/* Feature Description - mit klarer Trennung Feature/Benefit */}
            <motion.div 
              className="lg:col-span-5 order-2 lg:order-1 text-center lg:text-left pt-4"
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
                  transition={{ type: "tween", duration: 0.4, delay: 0.05 }}
                  className="space-y-5"
                >
                  {/* Feature Component */}
                  <div className="mb-6">
                    <div className="inline-block bg-[#8AAE39]/10 rounded-full px-3 py-1 text-sm font-medium text-[#8AAE39] mb-3">
                      FEATURE
                    </div>
                    <h3 
                      className={`text-2xl md:text-3xl font-bold mb-3 ${features[currentFeature].textColorClass}`}
                    >
                      {features[currentFeature].featureTitle}
                    </h3>
                    <p className="text-gray-600 text-lg">{features[currentFeature].featureDescription}</p>
                  </div>
                  
                  {/* Benefits Component - NEU */}
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 mb-6">
                    <div className="font-medium text-gray-800 mb-3">BENEFITS</div>
                    <ul className="space-y-3">
                      {features[currentFeature].benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <div className={`flex-shrink-0 ${features[currentFeature].textColorClass} mt-1 mr-3`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Feature Indicators - eleganter gestaltet */}
                  <div className="flex space-x-2 mt-6 lg:justify-start justify-center">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToFeature(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentFeature 
                            ? `w-7 ${features[currentFeature].colorClass}` 
                            : "w-2 bg-gray-200 hover:bg-gray-300"
                        }`}
                        aria-label={`Go to feature ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* NEU: Try Feature Button */}
                  <div className="mt-8">
                    <motion.button
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ y: 0, scale: 0.98 }}
                      className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#8AAE39]/30 rounded-lg px-6 py-3 font-medium transition-all duration-300 text-gray-700 hover:text-[#8AAE39]"
                    >
                      <span className="flex items-center">
                        <span>{features[currentFeature].featureTitle} ausprobieren</span>
                        <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          
            {/* Mockup Display mit gleicher Animation */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  variants={fadeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    type: "spring", 
                    duration: 0.28,
                    stiffness: 125,
                    damping: 10,
                    delay: -0.02
                  }}
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
          
          {/* Navigation Arrows - neu gestaltet */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none">
            <motion.button 
              onClick={prevFeature}
              className="text-gray-500 hover:text-[#8AAE39] transition-all w-11 h-11 bg-white/70 hover:bg-white/90 border border-gray-100 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-md pointer-events-auto"
              aria-label="Previous feature"
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button 
              onClick={nextFeature}
              className="text-gray-500 hover:text-[#8AAE39] transition-all w-11 h-11 bg-white/70 hover:bg-white/90 border border-gray-100 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-md pointer-events-auto"
              aria-label="Next feature"
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
        
        {/* Value Proposition Call-to-Action */}
        <motion.div 
          className="mt-20 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Das ist mehr als nur eine Fitness-App</h3>
          <p className="text-gray-600 mb-8">
            Mit Athly erhältst du die Expertise eines Personal Trainers, die Flexibilität einer App und die kontinuierliche Motivation, die du brauchst – alles zu einem Bruchteil der Kosten.
          </p>
          
          {/* Pricing Preview */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8">
              <div className="text-3xl font-bold text-[#8AAE39]">9,99€<span className="text-gray-500 text-lg font-normal">/Monat</span></div>
              <div className="h-8 border-r border-gray-200 hidden md:block"></div>
              <div className="text-gray-600">Weniger als <span className="line-through">80-120€</span> pro Stunde für einen Personal Trainer</div>
            </div>
          </div>
          
          {/* Value-Focused CTA */}
          <motion.button 
            className="relative overflow-hidden group inline-block"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <span className="absolute inset-0 w-full h-full bg-[#8AAE39] rounded-lg transform group-hover:scale-105 transition-transform duration-300 ease-out"></span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#8AAE39]/90 to-[#9abe4a]/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="absolute inset-0 w-full h-full border border-white/20 rounded-lg"></span>
            <span className="relative flex items-center justify-center text-white font-medium py-3.5 px-8 rounded-lg z-10">
              <span>14 Tage kostenlos testen</span>
              <svg className="ml-2 w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
          </motion.button>
          
          {/* No Risk Statement */}
          <p className="text-sm text-gray-500 mt-4">Keine Kreditkarte erforderlich. Jederzeit kündbar.</p>
        </motion.div>
      </div>
    </section>
  );
}