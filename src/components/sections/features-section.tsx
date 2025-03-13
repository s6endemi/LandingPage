"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Enhanced3DPhoneMockup } from "@/components/ui/Enhanced3DPhoneMockup";
import { AiCoachDemo, AdaptiveTrainingDemo, NutritionSyncDemo, BodyAnalyzerDemo } from "@/components/demo/features";

export function FeatureSection() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // 60/30/10 Farbprinzip
  const colors = {
    // 60% - Neutrale Farben
    neutralDark: "#1f2937",
    neutralMedium: "#4b5563",
    neutralLight: "#f9fafb",
    
    // 30% - Markenfarben
    primary: "#9bc539",
    secondary: "#3B82F6",
    tertiary: "#F59E0B",
    quaternary: "#8B5CF6",
    
    // 10% - CTA und Highlights
    ctaGreen: "#8ab42d"
  };
  
  // Subtle parallax for depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -15 : -40]);

  // Optimierte Features mit separaten Mockup-Komponenten
  const features = [
    {
      id: "ai-coach",
      badge: "PERSÖNLICHER KI-COACH",
      title: "Gespräche wie mit einem echten Trainer",
      description: "Stelle Fragen, bekomme personalisierte Antworten und diskutiere deine Fortschritte – ganz natürlich, als würdest du mit einem persönlichen Trainer sprechen.",
      color: colors.secondary,
      highlights: [
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          ),
          title: "24/7 Coach-Zugang",
          description: "Stelle Fragen und erhalte sofort qualifizierte Antworten – zu jeder Zeit."
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          title: "Sofortige Hilfe",
          description: "Keine Wartezeiten, keine Termine – dein Coach ist immer verfügbar."
        }
      ],
      mockupContent: <AiCoachDemo />,
      stats: [
        { label: "Antwortzeit", value: "< 1 Sek" },
        { label: "Verfügbarkeit", value: "24/7" },
        { label: "Personalisierung", value: "100%" }
      ]
    },
    {
      id: "adaptive-training",
      badge: "INTELLIGENTE TRAININGSPLANUNG",
      title: "Trainingsplan, der sich dir anpasst",
      description: "Schluss mit starren Programmen. Dein Trainingsplan passt sich automatisch an deinen Fortschritt, deine Tagesform und verfügbare Zeit an.",
      color: colors.primary,
      highlights: [
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          ),
          title: "Smarte Anpassung",
          description: "Dein Plan passt sich automatisch an deine Tagesform und Fortschritte an."
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          title: "Kontinuierlicher Fortschritt",
          description: "Keine Plateaus mehr durch intelligente Belastungssteuerung."
        }
      ],
      mockupContent: <AdaptiveTrainingDemo />,
      stats: [
        { label: "Bessere Ergebnisse", value: "+76%" },
        { label: "Anpassungen", value: "Echtzeit" },
        { label: "Trainingsvielfalt", value: "Unbegrenzt" }
      ]
    },
    {
      id: "nutrition-sync",
      badge: "ERNÄHRUNG & TRAINING IN SYNC",
      title: "Optimiere deine Ernährung: Intelligente Empfehlungen, die dein Training boosten.",
      description: "Nie wieder rätseln, was du essen sollst! Athly analysiert deine Mahlzeiten per Foto-Scan und synchronisiert deine Ernährungsempfehlungen automatisch mit deinem Trainingsplan – für maximale Ergebnisse.",
      color: colors.tertiary,
      comingSoon: true,
      highlights: [
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          ),
          title: "Optimale Nährstoffe",
          description: "Wissenschaftlich abgestimmte Ernährung für maximale Leistung und Regeneration."
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          title: "Foto-Scan Technologie",
          description: "Einfaches Scannen deiner Mahlzeiten zur sofortigen Nährwertanalyse."
        }
      ],
      mockupContent: <NutritionSyncDemo />,
      stats: [
        { label: "Mahlzeiten-Scan", value: "Verfügbar" },
        { label: "Durchschnittliche Leistungssteigerung", value: "+65%" },
      ]
    },
    {
      id: "body-analyzer",
      badge: "VISUELLE KÖRPERANALYSE",
      title: "Sehe deine Fortschritte mit eigenen Augen",
      description: "Lade Körperfotos hoch und erhalte sofort eine präzise Analyse deines Körperfettanteils, deiner Muskelentwicklung und Körperhaltung.",
      color: colors.quaternary,
      highlights: [
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
          title: "Motivierende Insights",
          description: "Sichtbare Fortschritte und Prognosen halten dich langfristig motiviert."
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ),
          title: "Fortschritts-Tracking",
          description: "Verfolgung deiner Veränderungen über Zeit mit übersichtlichen Vergleichen."
        }
      ],
      mockupContent: <BodyAnalyzerDemo />,
      stats: [
        { label: "Genaue Analyse", value: "< 30 Sek" },
        { label: "Motivationsschub", value: "+92%" },
        { label: "Messbarer Fortschritt", value: "Garantiert" }
      ]
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden bg-white"
      id="features"
    >
      {/* Subtle background elements */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-5 overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gray-50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-tr from-gray-50 to-transparent rounded-full blur-3xl"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            className="mb-3 md:mb-4 flex justify-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gray-100 text-gray-800">
              <span className="text-xs md:text-sm uppercase tracking-wide font-medium">Mehr als nur eine App:</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Athly's <span style={{ color: colors.primary }}>Features</span> deinen Fitness-Erfolg
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg text-gray-600 mx-auto font-normal leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Von KI-Coach bis Körperanalyse: Athly bietet dir alles für deinen Fitness-Erfolg.
          </motion.p>
        </div>

        {/* Feature Sections */}
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <div key={feature.id} className="relative">
              {/* Connecting line between features */}
              {index < features.length - 1 && (
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-[100%] w-px h-16 md:h-24 bg-gradient-to-b from-gray-200 to-transparent"></div>
              )}
              
              {/* Desktop Layout: 2-column */}
              <div className="hidden md:flex flex-col md:flex-row items-start gap-16">
                {/* Left column: Feature content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center md:text-left"
                  >
                    {/* Badge & Title */}
                    <div className="inline-block px-3 py-1 rounded-full text-sm mb-3 bg-blue-50 text-blue-600"
                      style={{ 
                        backgroundColor: `${feature.color}10`, 
                        color: feature.color 
                      }}
                    >
                      {feature.badge}
                      {feature.comingSoon && (
                        <span className="ml-2 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full uppercase">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 tracking-tight">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 max-w-lg mx-auto md:mx-0">
                      {feature.description}
                    </p>
                    
                    {/* Feature Info Boxes - Desktop */}
                    <div className="space-y-4 mb-6">
                      {feature.highlights.map((highlight, i) => (
                        <motion.div
                          key={i}
                          className="bg-white shadow-sm rounded-xl p-4 border border-gray-100"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                        >
                          <div className="flex items-start">
                            <div className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center mr-3 text-blue-500"
                              style={{ color: feature.color }}
                            >
                              {highlight.icon}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 mb-1">{highlight.title}</div>
                              <div className="text-sm text-gray-600">{highlight.description}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Feature Stats - clean row format */}
                    <div className="flex justify-between gap-3 mb-6">
                      {feature.stats.map((stat, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 bg-gray-50 rounded-xl py-3 px-2 text-center"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                        >
                          <div className="font-bold text-lg mb-1" style={{ color: feature.color }}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {/* Right column: Enhanced 3D Mockup - Desktop */}
                <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                  <Enhanced3DPhoneMockup 
                    content={feature.mockupContent} 
                    color={feature.color} 
                    isMobile={false} 
                  />
                </div>
              </div>
              
              {/* Mobile Layout: Vertically stacked with feature boxes under phone */}
              <div className="flex flex-col md:hidden">
                {/* Badge & Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-6"
                >
                  <div className="inline-block px-3 py-1 rounded-full text-sm mb-3 bg-blue-50 text-blue-600"
                    style={{ 
                      backgroundColor: `${feature.color}10`, 
                      color: feature.color 
                    }}
                  >
                    {feature.badge}
                    {feature.comingSoon && (
                      <span className="ml-2 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full uppercase">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 tracking-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                </motion.div>
                
                {/* Enhanced 3D Mockup for Mobile */}
                <Enhanced3DPhoneMockup 
                  content={feature.mockupContent} 
                  color={feature.color} 
                  isMobile={true} 
                />
                
                {/* Feature Boxes - Under the Phone on Mobile */}
                <div className="space-y-4 mb-6">
                  {feature.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      className="bg-white shadow-sm rounded-xl p-4 border border-gray-100"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                    >
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center mr-3 text-blue-500"
                          style={{ color: feature.color }}
                        >
                          {highlight.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 mb-1">{highlight.title}</div>
                          <div className="text-sm text-gray-600">{highlight.description}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Mobile Stats */}
                <div className="flex justify-between gap-3 mb-4">
                  {feature.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gray-50 rounded-xl py-3 px-2 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + (i * 0.1) }}
                    >
                      <div className="font-bold text-lg mb-1" style={{ color: feature.color }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-24 md:mt-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
            Bereit für ein neues Fitness-Erlebnis?
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Starte noch heute mit Athly und erlebe, wie personalisiertes Training und Ernährung dein Leben verändern können.
          </p>
          <motion.button
            className="inline-flex items-center px-6 py-3 text-white font-medium rounded-xl shadow-md transition-all duration-300"
            style={{ 
              backgroundColor: colors.ctaGreen,
              boxShadow: `0 4px 14px -4px ${colors.ctaGreen}40`
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Jetzt starten</span>
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
          
          {/* Trust Signals */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 text-[#9bc539] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Datenschutz garantiert</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 text-[#9bc539] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Auf allen Geräten</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 text-[#9bc539] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Kostenlose Testversion</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}