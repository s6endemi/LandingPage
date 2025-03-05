"use client";

import React, { useRef, useState,  JSX } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export function AthlyFeatureSection(): JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  // isHovering-State wurde entfernt, da keine Auto-Rotation mehr

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const phoneY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  // Athly core features
  const features = [
    {
      id: "ai-coach",
      title: "Intelligenter KI-Coach",
      description: "Dein virtueller Trainer versteht dich, passt sich deinen Bedürfnissen an und gibt dir wissenschaftlich fundiertes Feedback in Echtzeit.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "#8AAE39",
      stats: [
        { label: "Anpassungsfähigkeit", value: "97%" },
        { label: "Personalisierung", value: "Maximal" },
        { label: "Verständnis", value: "Tiefgreifend" }
      ],
      notification: {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        text: "Trainingsplan angepasst",
        color: "bg-green-100 text-green-600"
      },
      screens: [
        "Heute 5 von 6 Zielen erreicht!",
        "Dein Training wurde anhand deiner Schlafqualität optimiert",
        "Plan für die kommende Woche erstellt"
      ]
    },
    {
      id: "adaptive-training",
      title: "Adaptive Trainingspläne",
      description: "Dynamische Programme, die sich in Echtzeit anpassen – an deine Fortschritte, Verfügbarkeit und Tagesform, für maximale Effizienz.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "#3B82F6",
      stats: [
        { label: "Trainingseffizienz", value: "+86%" },
        { label: "Erfolgserlebnisse", value: "+129%" },
        { label: "Zeiteffizienz", value: "Maximal" }
      ],
      notification: {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        text: "Training für 18:00 Uhr",
        color: "bg-blue-100 text-blue-600"
      },
      screens: [
        "Dein Plan wurde basierend auf deinem Feedback angepasst",
        "3 neue Übungen, die perfekt zu deinen Zielen passen",
        "Du bist deinem Ziel 12% näher gekommen"
      ]
    },
    {
      id: "nutrition",
      title: "Personalisierte Ernährung",
      description: "Maßgeschneiderte Ernährungspläne, die perfekt zu deinen Trainingszielen passen und deine Vorlieben, Allergien und Lebensstil berücksichtigen.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "#F59E0B",
      stats: [
        { label: "Genuss", value: "100%" },
        { label: "Nachhaltigkeit", value: "Langfristig" },
        { label: "Nährstoff-Optimierung", value: "Kontinuierlich" }
      ],
      notification: {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ),
        text: "Neue Rezeptempfehlung",
        color: "bg-amber-100 text-amber-600"
      },
      screens: [
        "Dein Mittagessen: Quinoa-Bowl mit grilliertem Hähnchen",
        "Optimiert für deine Proteindichte: 37g",
        "Komplettiert deine Mikronährstoffziele für heute"
      ]
    },
    {
      id: "progress-tracking",
      title: "Intelligentes Fortschrittstracking",
      description: "Datengetriebene Einblicke in deine Entwicklung, mit visuellen Auswertungen, personalisierten Meilensteinen und KI-gesteuerter Motivation.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "#8B5CF6",
      stats: [
        { label: "Motivation", value: "+94%" },
        { label: "Zielerfüllung", value: "+87%" },
        { label: "Langfristiger Erfolg", value: "Garantiert" }
      ],
      notification: {
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        ),
        text: "Meilenstein erreicht!",
        color: "bg-purple-100 text-purple-600"
      },
      screens: [
        "Du hast deinen Kraftwert um 15% verbessert",
        "Deine Konsistenz liegt bei 94% - Spitzenklasse!",
        "Neue Herausforderung freigeschaltet"
      ]
    }
  ];

  // Auto-Rotation wurde entfernt

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient background effects */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-30 overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 -right-1/4 w-[800px] h-[800px] rounded-full bg-[#8AAE39]/10 blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-[#3B82F6]/10 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#F59E0B]/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/10 blur-3xl"></div>

        {/* Neural Network Background */}
        <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,30 Q25,10 50,30 T100,30" stroke="#8AAE39" strokeWidth="0.05" fill="none" opacity="0.3" />
          <path d="M0,40 Q35,20 70,40 T100,40" stroke="#3B82F6" strokeWidth="0.05" fill="none" opacity="0.2" />
          <path d="M0,50 Q45,30 60,50 T100,50" stroke="#F59E0B" strokeWidth="0.05" fill="none" opacity="0.2" />
          <path d="M0,60 Q55,40 70,60 T100,60" stroke="#8B5CF6" strokeWidth="0.05" fill="none" opacity="0.2" />
          <path d="M0,70 Q65,50 80,70 T100,70" stroke="#8AAE39" strokeWidth="0.05" fill="none" opacity="0.3" />
        </svg>

        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with animated elements */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            className="inline-block bg-gradient-to-r from-[#8AAE39]/20 via-[#8AAE39]/30 to-[#8AAE39]/20 px-5 py-2 rounded-full mb-6 backdrop-blur-sm shadow-sm border border-[#8AAE39]/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-wider font-medium text-[#8AAE39]">Die Athly Erfahrung</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Revolutionäre <span className="text-[#8AAE39] relative inline-block">
              Funktionen
              <motion.div 
                className="absolute bottom-0 left-0 h-[3px] bg-[#8AAE39]/30"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.5 }}
              ></motion.div>
            </span> für echte Ergebnisse
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Athly vereint modernste KI-Technologie mit sportwissenschaftlicher Expertise, um dir eine personalisierte Trainingserfahrung zu bieten, die früher nur Elite-Athleten zugänglich war.
          </motion.p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Interactive Feature Explorer - Left Side */}
          <motion.div 
            className="order-2 lg:order-1"
            style={{ y: contentY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Feature Selector Tabs */}
            <div 
              className="space-y-3 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`rounded-xl cursor-pointer transition-all duration-300 overflow-hidden backdrop-blur-sm border ${
                    activeFeature === index 
                      ? `border-[${feature.color}]/50 shadow-lg shadow-[${feature.color}]/5` 
                      : "border-gray-100 shadow-sm hover:shadow-md"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`relative overflow-hidden ${
                    activeFeature === index 
                      ? `bg-gradient-to-r from-[${feature.color}]/10 via-white to-white` 
                      : "bg-white"
                  }`}>
                    {/* Subtle line decoration for active feature */}
                    {activeFeature === index && (
                      <div className={`absolute left-0 top-0 bottom-0 w-1`} style={{ backgroundColor: feature.color }}></div>
                    )}
                    
                    <div className="flex p-5">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 ${
                        activeFeature === index
                          ? "text-white"
                          : "text-gray-500"
                      }`} style={{ backgroundColor: activeFeature === index ? feature.color : "#f3f4f6" }}>
                        {feature.icon}
                      </div>
                      
                      <div>
                        <h3 className={`font-semibold text-lg mb-1 ${activeFeature === index ? "text-gray-900" : "text-gray-700"}`}>
                          {feature.title}
                        </h3>
                        <p className={`text-sm line-clamp-2 ${activeFeature === index ? "text-gray-700" : "text-gray-500"}`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Expanded Content for Active Feature */}
                    <AnimatePresence>
                      {activeFeature === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-5 pb-5 overflow-hidden"
                        >
                          {/* Feature Stats */}
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {feature.stats.map((stat, idx) => (
                              <div 
                                key={idx} 
                                className="p-3 rounded-lg text-center bg-white shadow-sm border border-gray-100"
                              >
                                <div className="text-lg font-bold" style={{ color: feature.color }}>
                                  {stat.value}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Feature Notification Preview */}
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${feature.notification.color.split(' ')[0]} bg-opacity-20 my-3`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${feature.notification.color}`}>
                              {feature.notification.icon}
                            </div>
                            <span className="text-sm font-medium">{feature.notification.text}</span>
                          </div>
                          
                          {/* Call to Action */}
                          <button 
                            className="mt-2 text-sm font-medium flex items-center" 
                            style={{ color: feature.color }}
                          >
                            <span>Mehr über {feature.title} erfahren</span>
                            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Feature Highlights wurden entfernt */}
          </motion.div>
          
          {/* Device Showcase - Right Side */}
          <motion.div 
            className="order-1 lg:order-2 relative"
            style={{ y: phoneY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="relative mx-auto max-w-[320px]">
              {/* Enhanced glow effect based on active feature */}
              <div 
                className="absolute inset-0 -z-10 blur-[100px] rounded-full animate-pulse" 
                style={{ 
                  backgroundColor: `${features[activeFeature].color}20`,
                  animationDuration: '7s' 
                }}
              ></div>
              
              {/* Feature-specific floating elements - Left side */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`float-left-${activeFeature}`}
                  className="absolute -left-12 top-1/4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/50 px-3 py-2 text-sm z-10"
                  initial={{ opacity: 0, x: -20, y: 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -10, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${features[activeFeature].notification.color}`}>
                      {features[activeFeature].notification.icon}
                    </div>
                    <span>{features[activeFeature].notification.text}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Feature-specific floating elements - Right side */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`float-right-${activeFeature}`}
                  className="absolute -right-10 bottom-1/3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/50 px-3 py-2 text-sm z-10 max-w-[150px]"
                  initial={{ opacity: 0, x: 20, y: 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 10, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-center">
                    <div className="font-medium mb-1" style={{ color: features[activeFeature].color }}>
                      {features[activeFeature].screens[0]}
                    </div>
                    <div className="text-xs text-gray-500">
                      {features[activeFeature].title}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Enhanced phone mockup */}
              <div className="relative rounded-[40px] border-[14px] border-[#111] bg-[#111] shadow-2xl overflow-hidden z-0">
                {/* Phone screen */}
                <div className="relative overflow-hidden rounded-[26px] bg-[#f4f2ec] h-[570px]">
                  {/* Notch */}
                  <div className="absolute left-1/2 top-0 h-6 w-1/2 -translate-x-1/2 rounded-b-3xl bg-[#111] z-20"></div>
                  
                  {/* App header with feature-specific gradient */}
                  <div 
                    className="h-16 px-4 flex items-center justify-between"
                    style={{ background: `linear-gradient(90deg, ${features[activeFeature].color} 0%, ${features[activeFeature].color}dd 100%)` }}
                  >
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 5L90 80H75L50 30L25 80H10L50 5Z" stroke="white" strokeWidth="3" />
                        <path d="M25 80H75H90L75 100H25L10 80H25Z" stroke="white" strokeWidth="3" />
                      </svg>
                      <span className="ml-2 text-white font-medium text-sm">Athly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <div>
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* App Content - Feature-specific */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`screen-${activeFeature}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="p-4 h-[calc(570px-4rem)] bg-gradient-to-b from-gray-50 to-white relative"
                    >
                      {/* Specific UI for each feature */}
                      {activeFeature === 0 && (
                        <div className="h-full flex flex-col">
                          <div className="bg-white rounded-xl shadow-md p-4 mb-3 flex items-start">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white mr-3 flex-shrink-0"
                              style={{ backgroundColor: features[activeFeature].color }}
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">Guten Morgen, Max</h4>
                              <p className="text-sm text-gray-600 mt-1">Dein KI-Coach hat deinen Tag bereits geplant</p>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-xl shadow-md p-4 mb-3">
                            <h4 className="font-medium text-gray-900 mb-3">Tagesübersicht:</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                  <div 
                                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                    style={{ backgroundColor: `${features[activeFeature].color}20`, color: features[activeFeature].color }}
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l3 3" />
                                    </svg>
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">Training</span>
                                </div>
                                <span className="text-sm text-gray-500">19:00 Uhr</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                  <div 
                                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                    style={{ backgroundColor: `${features[activeFeature].color}20`, color: features[activeFeature].color }}
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">Ernährungsplan</span>
                                </div>
                                <span className="text-sm text-gray-500">Aktualisiert</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-xl shadow-md p-4 mb-3 h-full">
                            <h4 className="font-medium text-gray-900 mb-3">Coach-Vorschlag:</h4>
                            <div className="bg-gray-50 rounded-lg p-4 border-l-2" style={{ borderColor: features[activeFeature].color }}>
                              <p className="text-sm text-gray-700">
                                &quot;Basierend auf deiner Schlafqualität (7.5h, 92% Effizienz) und Erholungswerten habe ich dein heutiges Training angepasst. Perfekter Tag für ein intensives HIIT-Workout!&quot;
                              </p>
                            </div>
                            
                            <div className="mt-4 flex justify-between">
                              <button 
                                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700"
                              >
                                Anpassen
                              </button>
                              <button 
                                className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                                style={{ backgroundColor: features[activeFeature].color }}
                              >
                                Akzeptieren
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeFeature === 1 && (
                        <div className="h-full flex flex-col">
                          <div className="bg-white rounded-xl shadow-md p-4 mb-3">
                            <h4 className="font-bold text-gray-900 flex items-center">
                              <span>Dein adaptiver Trainingsplan</span>
                              <div 
                                className="ml-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                                style={{ backgroundColor: features[activeFeature].color }}
                              >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">Angepasst basierend auf deinem Fortschritt</p>
                          </div>
                          
                          <div className="bg-white rounded-xl shadow-md p-4 mb-3">
                            <h4 className="font-medium text-gray-900 mb-3">Heutiges Training:</h4>
                            <div className="space-y-2">
                              <div className="bg-gray-50 rounded-lg p-3 border-l-2" style={{ borderColor: features[activeFeature].color }}>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-gray-800 text-sm">Warm-up</span>
                                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${features[activeFeature].color}20`, color: features[activeFeature].color }}>5 Min</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Dynamische Stretches & Mobilisierung</p>
                              </div>
                              
                              <div className="bg-gray-50 rounded-lg p-3 border-l-2" style={{ borderColor: features[activeFeature].color }}>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-gray-800 text-sm">Haupttraining</span>
                                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${features[activeFeature].color}20`, color: features[activeFeature].color }}>25 Min</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">HIIT Circuit - 5 Übungen</p>
                              </div>
                              
                              <div className="bg-gray-50 rounded-lg p-3 border-l-2" style={{ borderColor: features[activeFeature].color }}>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-gray-800 text-sm">Cool-down</span>
                                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${features[activeFeature].color}20`, color: features[activeFeature].color }}>5 Min</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Statisches Stretching & Atmung</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-xl shadow-md p-4 h-full">
                            <h4 className="font-medium text-gray-900 mb-3">Wochenplan:</h4>
                            <div className="flex space-x-2 overflow-x-auto py-2">
                              {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day, i) => (
                                <div 
                                  key={day} 
                                  className={`flex-shrink-0 w-14 h-16 rounded-lg flex flex-col items-center justify-center ${i === 3 ? "border-2" : "border"}`}
                                  style={{ 
                                    borderColor: i === 3 ? features[activeFeature].color : "rgb(229, 231, 235)",
                                    backgroundColor: i === 3 ? `${features[activeFeature].color}10` : "white"
                                  }}
                                >
                                  <div className="text-sm font-medium">{day}</div>
                                  <div 
                                    className="mt-1 w-8 h-1 rounded-full"
                                    style={{ 
                                      backgroundColor: i === 6 ? "rgb(229, 231, 235)" : features[activeFeature].color,
                                      opacity: i === 6 ? 0.5 : (i === 3 ? 1 : 0.6)
                                    }}
                                  ></div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {i === 6 ? "Rest" : i % 2 === 0 ? "Kraft" : "Cardio"}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeFeature === 2 && (
                        <div className="h-full flex flex-col">
                          <div className="bg-white rounded-xl shadow-md p-4 mb-3">
                            <div className="flex justify-between items-center">
                              <h4 className="font-bold text-gray-900">Ernährungsplan</h4>
                              <div 
                                className="px-2 py-1 rounded-full text-xs font-medium"
                                style={{ backgroundColor: `${features[activeFeature].color}20`, color: features[activeFeature].color }}
                              >
                                Personalisiert
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Optimiert für deine Trainingsziele</p>
                          </div>
                          
                          <div className="bg-white rounded-xl shadow-md p-4 mb-3">
                            <h4 className="font-medium text-gray-900 mb-3">Tagesübersicht:</h4>
                            <div className="grid grid-cols-4 gap-2 mb-3">
                              <div className="p-2 rounded-lg bg-gray-50 text-center">
                                <div className="text-sm font-bold" style={{ color: features[activeFeature].color }}>2100</div>
                                <div className="text-xs text-gray-500">kcal</div>
                              </div>
                              <div className="p-2 rounded-lg bg-gray-50 text-center">
                                <div className="text-sm font-bold" style={{ color: features[activeFeature].color }}>140g</div>
                                <div className="text-xs text-gray-500">Protein</div>
                              </div>
                              <div className="p-2 rounded-lg bg-gray-50 text-center">
                                <div className="text-sm font-bold" style={{ color: features[activeFeature].color }}>70g</div>
                                <div className="text-xs text-gray-500">Fett</div>
                              </div>
                              <div className="p-2 rounded-lg bg-gray-50 text-center">
                                <div className="text-sm font-bold" style={{ color: features[activeFeature].color }}>200g</div>
                                <div className="text-xs text-gray-500">Carbs</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Wasseraufnahme</span>
                              <span className="text-xs font-medium" style={{ color: features[activeFeature].color }}>1.2/2.5L</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                              <div className="h-2 rounded-full" style={{ backgroundColor: features[activeFeature].color, width: "48%" }}></div>
                            </div>
                          </div>
                          
                          <div 
                            className="bg-white rounded-xl shadow-md p-4 mb-3"
                            style={{ borderTop: `3px solid ${features[activeFeature].color}` }}
                          >
                            <h4 className="font-medium text-gray-900 mb-2">Mittagessen-Vorschlag:</h4>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-800 text-sm">Mediterraner Quinoa-Bowl</span>
                                <span 
                                  className="text-xs px-2 py-1 rounded-full"
                                  style={{ backgroundColor: `${features[activeFeature].color}20`, color: features[activeFeature].color }}
                                >+32g Protein</span>
                              </div>
                              <div className="mt-3 flex items-center text-xs text-gray-500">
                                <span className="flex items-center mr-3">
                                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  15 Min
                                </span>
                                <span className="flex items-center">
                                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  Alle Zutaten vorhanden
                                </span>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-between">
                              <button 
                                className="px-3 py-1.5 rounded-lg border text-xs font-medium text-gray-700 border-gray-200"
                              >
                                Alternative
                              </button>
                              <button 
                                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                                style={{ backgroundColor: features[activeFeature].color }}
                              >
                                Rezept anzeigen
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeFeature === 3 && (
                        <div className="h-full flex flex-col">
                          <div className="bg-white rounded-xl shadow-md p-4 mb-3">
                            <h4 className="font-bold text-gray-900">Dein Fortschritt</h4>
                            <p className="text-sm text-gray-600 mt-1">Kontinuierliche Verbesserung seit 8 Wochen</p>
                          </div>
                          
                          <div className="bg-white rounded-xl shadow-md p-4 mb-3">
                            <h4 className="font-medium text-gray-900 mb-3">Meilensteine:</h4>
                            <div className="relative">
                              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100 z-0"></div>
                              
                              <div className="relative z-10 flex mb-3">
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-white mr-3"
                                  style={{ backgroundColor: features[activeFeature].color }}
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3 flex-grow">
                                  <div className="font-medium text-sm text-gray-800">5km Lauf unter 30 Min</div>
                                  <div className="text-xs text-gray-500 mt-1">Erreicht am 15. März</div>
                                </div>
                              </div>
                              
                              <div className="relative z-10 flex mb-3">
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-white mr-3"
                                  style={{ backgroundColor: features[activeFeature].color }}
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3 flex-grow">
                                  <div className="font-medium text-sm text-gray-800">10 Klimmzüge in Folge</div>
                                  <div className="text-xs text-gray-500 mt-1">Erreicht am 2. April</div>
                                </div>
                              </div>
                              
                              <div className="relative z-10 flex">
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center border-2 mr-3"
                                  style={{ borderColor: features[activeFeature].color, color: features[activeFeature].color }}
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l3 3" />
                                  </svg>
                                </div>
                                <div 
                                  className="bg-gray-50 rounded-lg p-3 flex-grow border"
                                  style={{ borderColor: `${features[activeFeature].color}30` }}
                                >
                                  <div className="font-medium text-sm text-gray-800">5 Trainingswochen in Folge</div>
                                  <div className="text-xs mt-1" style={{ color: features[activeFeature].color }}>86% erledigt</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-xl shadow-md p-4 h-full">
                            <h4 className="font-medium text-gray-900 mb-3">Fortschrittstrend:</h4>
                            <div className="h-32 flex items-end space-x-1">
                              {[60, 65, 68, 72, 75, 73, 78, 82, 85, 88, 92].map((val, i) => (
                                <div 
                                  key={i} 
                                  className="flex-1 rounded-t-sm" 
                                  style={{
                                    height: `${val}%`,
                                    backgroundColor: features[activeFeature].color,
                                    opacity: 0.4 + (i * 0.05)
                                  }}
                                ></div>
                              ))}
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                              <span>Jan</span>
                              <span>Feb</span>
                              <span>März</span>
                              <span>Apr</span>
                              <span>Mai</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Common Bottom Navigation */}
                      <div className="absolute bottom-4 left-0 right-0 px-4">
                        <div className="bg-white rounded-full shadow-md p-1 flex justify-around">
                          {["Home", "Plan", "Progress", "Profile"].map((item, idx) => (
                            <button 
                              key={item}
                              className={`w-12 h-12 rounded-full flex flex-col items-center justify-center ${idx === activeFeature ? "text-white" : "text-gray-400"}`}
                              style={{ backgroundColor: idx === activeFeature ? features[activeFeature].color : "transparent" }}
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {idx === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                                {idx === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />}
                                {idx === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2" />}
                                {idx === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                              </svg>
                              <span className="text-xs mt-0.5">{item}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            

          </motion.div>
        </div>
      </div>
    </section>
  );
}