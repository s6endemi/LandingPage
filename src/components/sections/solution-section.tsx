"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function SolutionSection() {
  const containerRef = useRef(null);
  
  // Premium color palette with strategic accents
  const colors = {
    primary: "#9bc539",      // Green for strategic accents only
    dark: "#374151",         // Rich dark gray for headings
    gray: "#6B7280",         // Medium gray for body text
    light: "#F9FAFB",        // Light gray for subtle backgrounds
    blue: "#3B82F6",         // Premium blue for first feature
    accent: "#8B5CF6",       // Subtle purple accent for third feature
    neutral: "#E5E7EB",      // Neutral color for UI elements
    neutralDark: "#4B5563",  // Darker neutral for contrasts
    neutralLight: "#F3F4F6", // Lighter neutral for backgrounds
  };
  
  // Parallax-Effect for images
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const imageY1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageY2 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const imageY3 = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -20]);
  
  // Solution features for alternating rows with concise texts
  const solutions = [
    {
      badge: "KI-KOMMUNIKATION",
      title: "Persönliches Coaching in Gesprächen",
      description: "Kommuniziere mit deinem KI-Coach wie mit einem persönlichen Trainer. Stelle Fragen und passe Pläne an – genau dann, wenn du es brauchst.",
      image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Person spricht mit AI-Coach auf Smartphone",
      mockup: {
        text: "Ich muss heute mein Training verschieben",
        response: "Kein Problem! Ich habe deinen Plan auf 18 Uhr angepasst und deine Ernährung entsprechend aktualisiert."
      },
      features: [
        "24/7 Verfügbarkeit für alle Fragen", 
        "Personalisiertes Coaching per Chat",
        "Schnelle Anpassung mit einem Text"
      ]
    },
    {
      badge: "PERSONALISIERUNG",
      title: "Maßgeschneiderte Pläne für deine Ziele",
      description: "Schluss mit One-Size-Fits-All Programmen. Athly erstellt personalisierte Trainings- und Ernährungspläne basierend auf deinen individuellen Zielen.",
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Personalisierter Trainingsplan auf Smartphone",
      mockup: {
        stat: "87%",
        label: "Bessere Ergebnisse durch Personalisierung"
      },
      features: [
        "Individuelle Trainingspläne", 
        "Anpassung an Ernährungsvorlieben",
        "Optimiert für deinen Zeitplan"
      ]
    },
    {
      badge: "INTELLIGENTE ANPASSUNG",
      title: "Optimierung in Echtzeit – jeden Tag",
      description: "Keine starren Programme, sondern lebende Pläne. Dein Coach erkennt deine Form und passt alles automatisch an – wie ein echter Trainer.",
      image: "https://images.unsplash.com/photo-1574269252556-89926e7c5805?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Person trainiert mit adaptivem Fitness-Plan",
      mockup: {
        progress: 68,
        label: "Trainingsziel angepasst: 3kg mehr Muskelmasse"
      },
      features: [
        "Anpassung an Tagesform", 
        "Automatische Fortschrittsoptimierung",
        "Flexible Pläne für deinen Alltag"
      ]
    }
  ];

  // Font import for demonstration (in production this would be in a global style file)
  const fontImportStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
  `;

  return (
    <section 
      ref={containerRef}
      className="relative py-20 overflow-hidden font-['Inter',sans-serif]"
      id="solution"
      style={{ 
        /* Base typography settings for Zing-like look */
        fontFamily: "'Inter', system-ui, sans-serif",
        fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
        letterSpacing: "-0.01em"
      }}
    >
      {/* Stylesheet for font */}
      <style>{fontImportStyle}</style>
      
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 opacity-10 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-gradient-to-bl from-gray-50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-gray-50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-full h-32 bg-gradient-to-r from-transparent via-gray-100/20 to-transparent blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with animated underline */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-5 py-2 rounded-full mb-4"
            style={{ 
              backgroundColor: `${colors.neutralLight}`,
              color: colors.neutralDark
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-wide font-medium">DIE ATHLY LÖSUNG</span>
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-semibold mb-5 text-gray-800 inline-block relative tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ lineHeight: 1.1 }}
          >
            Dein KI-<span style={{ color: colors.primary }}>Coach</span> im Taschenformat
            <motion.div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] opacity-30"
              style={{ backgroundColor: colors.dark }}
              initial={{ width: 0 }}
              whileInView={{ width: "70%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
            ></motion.div>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-normal leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Kombiniere die Personalisierung eines echten Trainers mit der Bequemlichkeit 
            einer App – dank KI-Technologie, die dich wirklich versteht
          </motion.p>
        </div>
        
        {/* Alternating features with optimized layout */}
        <div className="space-y-20">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className={`flex flex-col lg:items-center ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 lg:gap-16 relative`}
            >
              {/* Decorative background */}
              {index !== solutions.length - 1 && (
                <div 
                  className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 h-px w-1/4 opacity-20"
                  style={{ backgroundColor: colors.dark }}
                ></div>
              )}
              
              {/* Image side with overlaid UI elements */}
              <motion.div 
                className="lg:w-1/2 relative"
                style={{ y: index === 0 ? imageY1 : index === 1 ? imageY2 : imageY3 }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                  {/* Image with overlay */}
                  <img 
                    src={solution.image} 
                    alt={solution.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 opacity-60"
                    style={{ 
                      background: index % 2 === 0 
                        ? `linear-gradient(to right, ${colors.dark}40 0%, transparent 100%)` 
                        : `linear-gradient(to left, ${colors.dark}40 0%, transparent 100%)`
                    }}
                  ></div>
                  
                  {/* Floating badge */}
                  <div 
                    className={`absolute ${index % 2 === 0 ? 'right-6' : 'left-6'} top-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/50 px-3 py-2 text-sm z-20`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                        style={{ 
                          backgroundColor: index === 0 
                            ? colors.blue 
                            : index === 1 
                              ? colors.primary 
                              : colors.accent 
                        }}
                      >
                        {index === 0 ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        ) : index === 1 ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium tracking-wide text-gray-800">{solution.badge}</span>
                    </div>
                  </div>
                  
                  {/* UI element overlay based on solution type */}
                  {solution.mockup && (
                    <div className={`absolute ${index % 2 === 0 ? 'left-6' : 'right-6'} bottom-6 max-w-[70%] z-20`}>
                      {index === 0 ? (
                        // Chat mockup
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/80 p-3 max-w-[240px]">
                          <div className="bg-gray-100 rounded-lg p-2 mb-2 text-sm font-normal">{solution.mockup.text}</div>
                          <div className="rounded-lg p-2 text-sm font-normal" 
                            style={{ 
                              backgroundColor: `${colors.blue}10`, 
                              color: colors.dark
                            }}
                          >
                            {solution.mockup.response}
                          </div>
                        </div>
                      ) : index === 1 ? (
                        // Statistics mockup
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/80 p-4 text-center">
                          <div className="text-2xl font-semibold mb-1" style={{ color: colors.primary }}>{solution.mockup.stat}</div>
                          <div className="text-xs text-gray-700 max-w-[180px] font-normal">{solution.mockup.label}</div>
                        </div>
                      ) : (
                        // Progress mockup
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/80 p-4">
                          <div className="w-full h-2 bg-gray-100 rounded-full mb-2 overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                background: `linear-gradient(to right, ${colors.blue}, ${colors.primary})`,
                                width: `${solution.mockup.progress}%` 
                              }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-700 font-normal">{solution.mockup.label}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Content side */}
              <motion.div 
                className="lg:w-1/2"
                style={{ y: textY }}
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="lg:max-w-xl">
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 tracking-wide"
                    style={{ 
                      backgroundColor: `${colors.neutralLight}`,
                      color: index === 0 ? colors.blue : index === 1 ? colors.primary : colors.accent
                    }}
                  >
                    {solution.badge}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-medium mb-3 text-gray-800 tracking-tight" style={{ lineHeight: 1.1 }}>
                    {solution.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-5 leading-relaxed font-normal">
                    {solution.description}
                  </p>
                  
                  {/* Checklist with enhanced presentation */}
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <div 
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3"
                          style={{ 
                            backgroundColor: index === 0 ? `${colors.blue}15` : index === 1 ? `${colors.primary}15` : `${colors.accent}15`,
                            color: index === 0 ? colors.blue : index === 1 ? colors.primary : colors.accent
                          }}
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Action link only on the last element */}
                  {index === solutions.length - 1 && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-block mt-2"
                    >
                      <button 
                        className="inline-flex items-center text-white rounded-xl px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300"
                        style={{ 
                          backgroundColor: colors.primary,
                          boxShadow: `0 4px 14px -4px ${colors.primary}40`,
                          letterSpacing: "0.01em" 
                        }}
                      >
                        <span>Kostenlos starten</span>
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* Improved transition to feature section */}
        <div className="mt-24 md:mt-28 text-center relative">
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 -top-16 w-px h-12"
            style={{ 
              background: `linear-gradient(to bottom, transparent, ${colors.dark}50)` 
            }}
          ></div>
          
          <motion.div
            className="inline-block mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="px-4 py-2 rounded-xl text-xs font-medium inline-flex items-center gap-2 tracking-wide"
              style={{ 
                backgroundColor: colors.neutralLight,
                color: colors.dark
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>ENTDECKE DIE DETAILS</span>
            </div>
          </motion.div>
          
          <motion.h2
            className="text-3xl md:text-4xl font-medium mb-4 text-gray-800 tracking-tight"
            style={{ lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Wie funktioniert Athly im Detail?
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Tauche tiefer ein und entdecke alle Features, die Athly zur innovativsten Fitness-Lösung machen
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <svg 
              className="w-6 h-6 mx-auto animate-bounce"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              style={{ color: colors.primary }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}