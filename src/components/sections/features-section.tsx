"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

  // Optimierte Features mit simplifizierten Mockups
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
      mockupContent: (
        <div className="relative h-full w-full">
          {/* Dialog Interface - Fixierter Header */}
          <div className="absolute top-0 left-0 right-0 bg-[#3B82F6] text-white p-4 z-10">
            <div className="text-lg font-medium">Chat mit Athly</div>
            <div className="text-xs">Dein persönlicher Trainer</div>
          </div>
          
          {/* Chat Messages - Vereinfacht */}
          <div className="absolute top-[72px] left-0 right-0 bottom-[60px] bg-gray-50 p-4 overflow-hidden">
            {/* User Message - Einfacher */}
            <div className="flex justify-end mb-3">
              <div className="max-w-[80%] bg-[#3B82F6]/10 rounded-2xl rounded-tr-sm p-3 text-sm text-gray-800">
                Wie kann ich mein Training anpassen, wenn ich diese Woche weniger Zeit habe?
              </div>
            </div>
            
            {/* AI Answer - Einfacher */}
            <div className="flex mb-3">
              <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white mr-2 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="max-w-[80%] bg-white rounded-2xl rounded-tl-sm p-3 text-sm text-gray-800 shadow-sm">
                <span className="font-medium">Hier ist dein angepasster Plan:</span>
                <div className="mt-2 bg-[#3B82F6]/5 p-2 rounded-lg">
                  <div className="text-[#3B82F6] font-medium mb-1">Kürzeres Intensiv-Workout</div>
                  <div className="text-xs text-gray-600">30 Min • Effektiv • Für dein Ziel optimiert</div>
                </div>
              </div>
            </div>
            
            {/* User Thanks */}
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-[#3B82F6]/10 rounded-2xl rounded-tr-sm p-3 text-sm text-gray-800">
                Perfekt, danke!
              </div>
            </div>
          </div>
          
          {/* Input Area - Fixiert am unteren Rand */}
          <div className="absolute left-0 right-0 bottom-0 border-t border-gray-200 p-3 bg-white z-10">
            <div className="flex rounded-full border border-gray-200 overflow-hidden">
              <input type="text" className="flex-1 px-4 py-2 text-sm outline-none" placeholder="Stelle eine Frage..." />
              <button className="bg-[#3B82F6] text-white px-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ),
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
      mockupContent: (
        <div className="relative h-full w-full">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bg-[#9bc539] text-white p-4 z-10">
            <div className="text-lg font-medium">Dein Trainingsplan</div>
            <div className="text-xs">Passt sich in Echtzeit an</div>
          </div>
          
          {/* Simplified Content Area */}
          <div className="absolute top-[72px] left-0 right-0 bottom-0 bg-gray-50 p-4">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <div className="font-medium text-gray-800">Heutiges Training</div>
                <div className="text-xs bg-[#9bc539] text-white px-2 py-0.5 rounded-full font-medium">
                  ANGEPASST
                </div>
              </div>
              
              {/* Simplified Training Card */}
              <div className="bg-[#9bc539]/5 rounded-lg p-3 mb-3">
                <div className="font-medium text-gray-800 mb-1">Krafttraining: Oberkörper</div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-600">45 Min • Intensität angepasst</div>
                  <div className="text-xs text-[#9bc539] font-medium">+10% Intensität</div>
                </div>
              </div>
              
              <div className="text-xs text-gray-600 mb-4">
                Anpassung basierend auf deinem Fortschritt und Erholung
              </div>
              
              <button className="w-full py-2 bg-[#9bc539] text-white rounded-lg text-sm font-medium">
                Plan starten
              </button>
            </div>
            
            {/* Progress Card */}
            <div className="bg-white rounded-xl shadow-sm p-3">
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-[#9bc539] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div className="text-sm font-medium text-gray-800">Dein Fortschritt</div>
              </div>
              
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#9bc539]/70 to-[#9bc539]" style={{width: '67%'}}></div>
              </div>
              
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <div>4 von 6 Wochen</div>
                <div className="text-[#9bc539] font-medium">+21% Kraft seit Start</div>
              </div>
            </div>
          </div>
        </div>
      ),
      stats: [
        { label: "Bessere Ergebnisse", value: "+76%" },
        { label: "Anpassungen", value: "Echtzeit" },
        { label: "Trainingsvielfalt", value: "Unbegrenzt" }
      ]
    },
    {
      id: "nutrition-sync",
      badge: "ERNÄHRUNG & TRAINING IN SYNC",
      title: "Perfekt abgestimmte Ernährung",
      description: "Scanne deine Mahlzeiten und erhalte sofort Feedback zur Nährwertqualität. Deine Ernährungsempfehlungen passen sich automatisch an dein Training an.",
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
      mockupContent: (
        <div className="relative h-full w-full">
          {/* COMING SOON Badge */}
          <div className="absolute top-3 right-3 z-30">
            <div className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
              Coming Soon
            </div>
          </div>
          
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bg-[#F59E0B] text-white p-4 z-10">
            <div className="text-lg font-medium">Deine Ernährung</div>
            <div className="text-xs">Synchronisiert mit deinem Training</div>
          </div>
          
          {/* Simplified Content Area */}
          <div className="absolute top-[72px] left-0 right-0 bottom-0 bg-gray-50 p-4">
            {/* Meal Scan Feature - Already Available */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
              <div className="px-3 py-2 border-b border-gray-100 bg-green-50 flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="text-xs font-medium text-green-700">Bereits verfügbar</div>
                </div>
                <div className="text-xs text-gray-500">Mahlzeiten-Analyse</div>
              </div>
              
              <div className="p-3 text-center">
                <div className="bg-[#F59E0B]/10 rounded-xl p-3 flex flex-col items-center mb-2">
                  <svg className="w-10 h-10 mb-2 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-sm font-medium text-gray-800">Scanne deine Mahlzeiten</div>
                  <div className="text-xs text-gray-600 mt-1">Erhalte sofort Nährwertanalysen</div>
                </div>
              </div>
            </div>
            
            {/* Coming Soon Preview - Simplified */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-800">Training-Ernährungs-Sync</div>
                  <div className="text-xs text-gray-500">Optimierte Ernährungspläne</div>
                </div>
              </div>
              
              <div className="bg-[#F59E0B]/5 rounded-lg p-3 mb-3">
                <div className="text-sm font-medium text-gray-800 mb-1">Nach deinem Training</div>
                <div className="text-xs text-gray-600">Automatisch angepasste Ernährungsempfehlungen für optimale Regeneration</div>
              </div>
            </div>
          </div>
        </div>
      ),
      stats: [
        { label: "Mahlzeiten-Scan", value: "Verfügbar" },
        { label: "Leistungssteigerung", value: "+65%" },
        { label: "Regenerationszeit", value: "-48%" }
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
      mockupContent: (
        <div className="relative h-full w-full">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bg-[#8B5CF6] text-white p-4 z-10">
            <div className="text-lg font-medium">Deine Körperanalyse</div>
            <div className="text-xs">KI-gestützte Fortschrittsverfolgung</div>
          </div>
          
          {/* Simplified Content Area */}
          <div className="absolute top-[72px] left-0 right-0 bottom-0 bg-gray-50 p-4">
            {/* Simplified Before/After Card */}
            <div className="bg-white rounded-xl shadow-sm p-3 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium text-sm text-gray-800">Deine Entwicklung</div>
                <div className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Positive Veränderung
                </div>
              </div>
              
              {/* Simplified Comparison Visualizer */}
              <div className="h-32 mb-3 bg-[#8B5CF6]/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <div className="text-sm font-medium text-gray-800">Vorher / Nachher Vergleich</div>
                </div>
              </div>
            </div>
            
            {/* Analysis Results - Simplified */}
            <div className="bg-white rounded-xl shadow-sm p-3">
              <div className="text-sm font-medium text-gray-700 mb-3">KI-Analyse deiner Fortschritte:</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#8B5CF6]/5 rounded p-2 text-center">
                  <div className="text-[#8B5CF6] font-medium text-sm mb-0.5">-2.8%</div>
                  <div className="text-xs text-gray-500">Körperfett</div>
                </div>
                <div className="bg-[#8B5CF6]/5 rounded p-2 text-center">
                  <div className="text-[#8B5CF6] font-medium text-sm mb-0.5">+1.4kg</div>
                  <div className="text-xs text-gray-500">Muskelmasse</div>
                </div>
                <div className="bg-[#8B5CF6]/5 rounded p-2 text-center">
                  <div className="text-[#8B5CF6] font-medium text-sm mb-0.5">+9%</div>
                  <div className="text-xs text-gray-500">Definition</div>
                </div>
              </div>
              
              <button className="w-full mt-3 py-2 bg-[#8B5CF6] text-white rounded-lg text-sm font-medium">
                Neues Foto hinzufügen
              </button>
            </div>
          </div>
        </div>
      ),
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
              <span className="text-xs md:text-sm uppercase tracking-wide font-medium">INNOVATIVE FEATURES</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Dein KI-<span style={{ color: colors.primary }}>Coach</span> im 
            Taschenformat
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg text-gray-600 mx-auto font-normal leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Athly vereint persönliches Training mit modernster Technologie, um dir ein Fitness-Erlebnis 
            zu bieten, das so individuell ist wie du selbst – jederzeit und überall verfügbar.
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
                
                {/* Right column: Mockup */}
                <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative mx-auto"
                  >
                    {/* Phone Frame */}
                    <div className="relative mx-auto w-[280px] h-[570px] md:w-[300px] md:h-[610px] bg-black rounded-[60px] p-4 overflow-hidden shadow-xl">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20"></div>
                      
                      {/* Screen */}
                      <div className="relative h-full w-full rounded-[48px] bg-white overflow-hidden">
                        {feature.mockupContent}
                      </div>
                    </div>
                    
                    {/* Subtle glow effect - ÜBERARBEITET für subtilen Rand-Schimmer */}
                    <div 
                      className="absolute -z-10 -inset-0.5 rounded-[62px] blur-sm opacity-10"
                      style={{ 
                        background: `linear-gradient(to bottom right, ${feature.color}80, ${feature.color}30)` 
                      }}
                    ></div>
                  </motion.div>
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
                
                {/* Phone Mockup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative mx-auto mb-8"
                >
                  {/* Phone Frame */}
                  <div className="relative mx-auto w-[280px] h-[570px] bg-black rounded-[60px] p-4 overflow-hidden shadow-xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20"></div>
                    
                    {/* Screen */}
                    <div className="relative h-full w-full rounded-[48px] bg-white overflow-hidden">
                      {feature.mockupContent}
                    </div>
                  </div>
                  
                  {/* Subtle glow effect - ÜBERARBEITET für subtilen Rand-Schimmer */}
                  <div 
                    className="absolute -z-10 -inset-0.5 rounded-[62px] blur-sm opacity-10"
                    style={{ 
                      background: `linear-gradient(to bottom right, ${feature.color}80, ${feature.color}30)` 
                    }}
                  ></div>
                </motion.div>
                
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