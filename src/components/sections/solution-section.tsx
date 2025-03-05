"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export function SolutionSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Messages for dynamic chat simulation
  const chatMessages = [
    {
      coach: "Guten Morgen! Ich sehe, du hast gestern dein Beintraining absolviert. Wie fühlst du dich heute?",
      user: "Meine Oberschenkel sind etwas schwer heute. Hatte gestern wirklich ein intensives Training."
    },
    {
      coach: "Das ist normal nach deinem neuen Programm. Ich passe deinen Plan für heute an – wie wäre es mit leichtem Cardio und mehr Fokus auf den Oberkörper?",
      user: "Das klingt perfekt. Kann ich das Training auf 18 Uhr verschieben? Habe heute einen längeren Arbeitstag."
    },
    {
      coach: "Natürlich! Ich habe deinen Plan angepasst und eine Erinnerung für 18 Uhr gesetzt. Denk daran, vorher etwas zu essen – ich habe dir zwei schnelle Optionen in deinem Ernährungsplan hinterlegt.",
      user: "Danke! Das ist genau, warum ich Athly liebe. So viel einfacher als ständig Pläne umschreiben zu müssen."
    }
  ];
  
  // Solution features with enhanced descriptions
  const solutionFeatures = [
    {
      title: "Echte Personalisierung",
      description: "Athly lernt dich wirklich kennen – deine Vorlieben, Einschränkungen und Ziele. Jeder Trainingsplan wird individuell auf dich zugeschnitten, nicht aus Vorlagen zusammengestellt.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Intelligente Anpassung",
      description: "Kein starres Programm, sondern ein lebender Plan. Dein Coach erkennt Müdigkeit, Stress oder Zeitmangel und passt dein Training sofort an – genau wie ein menschlicher Trainer.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Multimodale Interaktion",
      description: "Kommuniziere mit deinem Coach wie mit einem echten Menschen – per Text, Sprache oder Video. Zeige Übungen, fotografiere Mahlzeiten oder führe natürliche Gespräche.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    }
  ];

  // Parallax effect for the phone
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const phoneY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [100, 0]);

  // Cycle through chat messages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % chatMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 -z-10 opacity-20 overflow-hidden bg-gradient-to-b from-gray-50/50 via-white to-white"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section title with animated underline */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Die <span className="text-[#8AAE39]">Lösung</span> für deine Fitness-Ziele
            <motion.div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] bg-[#8AAE39]/30"
              initial={{ width: 0 }}
              whileInView={{ width: "70%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
            ></motion.div>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Kombiniere die Personalisierung eines echten Trainers mit der Bequemlichkeit einer App – dank KI-Technologie, die wirklich auf dich eingeht
          </motion.p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
          {/* Enhanced mobile device simulation */}
          <motion.div 
            className="lg:w-1/2 relative"
            style={{ y: phoneY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="relative mx-auto max-w-[320px]">
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 -z-10 blur-[100px] rounded-full bg-gradient-to-br from-[#8AAE39]/40 to-emerald-300/20 animate-pulse" 
                  style={{ animationDuration: '7s' }}></div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -right-12 -top-10 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/50 px-3 py-2 text-sm z-10"
                initial={{ opacity: 0, x: 20, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Trainingsplan angepasst</span>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -left-10 bottom-24 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/50 px-3 py-2 text-sm z-10"
                initial={{ opacity: 0, x: -20, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Erinnerung für 18:00</span>
                </div>
              </motion.div>
              
              {/* Enhanced phone mockup */}
              <div className="relative rounded-[40px] border-[14px] border-[#111] bg-[#111] shadow-2xl">
                {/* Phone screen */}
                <div className="relative overflow-hidden rounded-[26px] bg-[#f4f2ec] h-[570px]">
                  {/* Notch */}
                  <div className="absolute left-1/2 top-0 h-6 w-1/2 -translate-x-1/2 rounded-b-3xl bg-[#111] z-20"></div>
                  
                  {/* App header with subtle gradient */}
                  <div className="h-16 bg-gradient-to-r from-[#8AAE39] via-[#95bb3d] to-[#9abe4a] px-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 5L90 80H75L50 30L25 80H10L50 5Z" stroke="white" strokeWidth="3" />
                        <path d="M25 80H75H90L75 100H25L10 80H25Z" stroke="white" strokeWidth="3" />
                      </svg>
                      <span className="ml-2 text-white font-medium text-sm">Athly Coach</span>
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
                  
                  {/* Enhanced chat interface with animation */}
                  <div className="p-4 h-[calc(570px-4rem)] bg-gradient-to-b from-gray-50 to-white">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                      >
                        {/* Date indicator */}
                        <div className="flex justify-center my-3">
                          <div className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500">Heute</div>
                        </div>
                        
                        {/* Coach message */}
                        <div className="flex items-start">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8AAE39] to-[#9abe4a] flex items-center justify-center text-white font-bold text-sm mr-2 shadow-sm">A</div>
                          <div className="max-w-[70%] bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100">
                            <p className="text-sm">{chatMessages[activeIndex].coach}</p>
                            <p className="text-[10px] text-gray-400 mt-1">Gerade eben</p>
                          </div>
                        </div>
                        
                        {/* User message */}
                        <div className="flex justify-end">
                          <div className="max-w-[70%] bg-gradient-to-r from-[#8AAE39]/5 to-[#8AAE39]/10 rounded-2xl rounded-tr-none p-4 shadow-sm">
                            <p className="text-sm">{chatMessages[activeIndex].user}</p>
                            <p className="text-[10px] text-gray-400 mt-1">Gerade eben</p>
                          </div>
                        </div>
                        
                        {/* Typing indicator if it's the last message */}
                        {activeIndex === chatMessages.length - 1 && (
                          <div className="flex items-start">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8AAE39] to-[#9abe4a] flex items-center justify-center text-white font-bold text-sm mr-2 shadow-sm">A</div>
                            <div className="bg-white rounded-2xl rounded-tl-none py-4 px-5 shadow-sm border border-gray-100">
                              <div className="flex space-x-1.5">
                                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Input area */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white rounded-full border border-gray-200 flex items-center p-1 pl-4 pr-2">
                        <input 
                          type="text" 
                          className="bg-transparent text-sm flex-1 outline-none" 
                          placeholder="Schreibe deinem Coach..." 
                          disabled
                        />
                        <button className="w-8 h-8 rounded-full bg-[#8AAE39] flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Content side - Enhanced */}
          <motion.div 
            className="lg:w-1/2"
            style={{ y: contentY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="max-w-lg mx-auto lg:ml-0">
              <h3 className="text-[#8AAE39] font-semibold text-lg mb-2">DEINE PERSÖNLICHE FITNESS-LÖSUNG</h3>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Dein <span className="text-[#8AAE39] relative">
                  persönlicher Coach
                  <div className="absolute bottom-0 left-0 w-full h-[5px] bg-[#8AAE39]/10"></div>
                </span> wie du ihn verdienst
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Athly vereint die Expertise eines echten Personal Trainers mit der Verfügbarkeit einer App. Unsere KI-Technologie versteht deine individuellen Bedürfnisse und passt sich deinem Leben an – nicht umgekehrt.
              </p>
              
              {/* Enhanced solution features */}
              <div className="space-y-8 mb-10">
                {solutionFeatures.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start bg-gradient-to-r from-gray-50 to-transparent p-5 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100/50"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#8AAE39]/80 to-[#8AAE39]/70 flex items-center justify-center text-white mt-1 mr-4 shadow-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-xl text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Enhanced CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <button className="w-full sm:w-auto bg-gradient-to-r from-[#8AAE39] to-[#9abe4a] text-white rounded-xl px-8 py-4 font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden">
                    {/* Shine effect */}
                    <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    <span className="mr-2">Kostenlos starten</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </motion.div>
                
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-1 text-[#8AAE39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>14 Tage kostenlos testen</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}