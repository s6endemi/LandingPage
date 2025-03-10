"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function RefinedProblemSection() {
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  
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

  // Modernisierte, subtilere Farbpalette
  const colors = {
    primary: "#9bc539",      // Grün, aber subtiler eingesetzt
    primaryLight: "#f2f7e8", // Sehr heller Grünton für Hintergründe
    accent1: "#4a6fa1",      // Gedecktes Blau statt leuchtendem Blau
    accent2: "#e37f62",      // Gedämpftes Terrakotta statt grellem Orange
    accent3: "#8c7bbc",      // Subtiles Lavendel statt leuchtendem Lila
    dark: "#313942",         // Dunkelgrau mit Blauton statt reinem Schwarz
    text: "#4e5968",         // Mittleres Grau für Haupttext
    textLight: "#6e7a8a",    // Helleres Grau für Sekundärtext
    bgLight: "#fafafa",      // Fast-Weiß für Hintergründe
    border: "#eaecf0"        // Subtile Rahmenfarbe
  };

  // Überarbeitete Animation Varianten - subtiler und eleganter, reduziert für Mobile
  const fadeIn = {
    hidden: { opacity: 0, y: isMobile ? 10 : 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: isMobile ? 0.5 : 0.6, 
        ease: [0.22, 1, 0.36, 1] // Custom easing für elegantere Animation
      } 
    }
  };
  
  const staggeredFadeIn = {
    hidden: { opacity: 0, y: isMobile ? 8 : 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.5, 
        delay: 0.08 * i,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Modernisierte Problem-Karten mit subtileren Design-Elementen
  const painPoints = [
    {
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" 
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: colors.primary,
      title: "Generische Trainingspläne",
      description: "Vorgefertigte Programme ignorieren deinen Körpertyp, deine Trainingshistorie und persönlichen Bedürfnisse – ein Grund, warum sie selten funktionieren.",
      imageUrl: "https://images.unsplash.com/photo-1616279969902-60bc89fc751a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      imageAlt: "Frustrierte Person mit Fitness-Plan"
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: colors.accent1,
      title: "Fehlende Accountability",
      description: "Ohne persönliche Betreuung fehlt die Verantwortlichkeit. Jede verpasste Session wird leichter zur Gewohnheit – und der innere Schweinehund gewinnt.",
      imageUrl: "https://images.unsplash.com/photo-1591311630200-ffa9120a540f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Person, die Workout aufschiebt"
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.22766 9C8.77678 7.83481 10.2584 7 12.0001 7C14.2092 7 16.0001 8.34315 16.0001 10C16.0001 11.3994 14.7224 12.5751 12.9943 12.9066C12.4519 13.0106 12.0001 13.4477 12.0001 14M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: colors.accent3,
      title: "Keine individuelle Beratung",
      description: "Du stößt auf Fragen zur Technik, Ernährung oder Verletzungen? Eine App bietet keine echten Antworten – und Google liefert oft widersprüchliche Informationen.",
      imageUrl: "https://images.unsplash.com/photo-1621252179027-65c82c3f1723?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Verwirrte Person, die Hilfe sucht"
    }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-28 overflow-hidden font-sans" id="problem">
      {/* Subtiler, eleganterer Hintergrund */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-gray-50 opacity-80"></div>
      <div className="absolute -z-10 w-full h-full overflow-hidden">
        <div className="absolute -right-40 top-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-primary-50 to-white opacity-60 blur-3xl"></div>
        <div className="absolute -left-20 bottom-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-50 to-white opacity-50 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header mit modernem Typografie-Ansatz - mobile optimiert */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 lg:mb-24">
          <motion.div
            className="inline-block font-medium mb-3 md:mb-5 text-xs tracking-wider uppercase px-3 py-1 md:px-4 md:py-1.5 rounded-full"
            style={{ 
              color: colors.primary,
              backgroundColor: `${colors.primaryLight}` 
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            Die Herausforderung
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-8 tracking-tight leading-tight"
            style={{ color: colors.dark }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            Warum scheitern die meisten{' '}
            <br className="hidden sm:block" />
            Fitness&shy;programme?
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg"
            style={{ color: colors.text }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            Trotz zahlloser Fitness-Apps und Trainingsprogramme bleibt langfristiger Erfolg selten.
            <br className="hidden md:block" />
            Die Ursachen sind überraschend konstant:
          </motion.p>
        </div>

        {/* Problem Cards - für Mobile optimiert mit angepasstem Layout */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-x-8 md:gap-y-16 mb-16 md:mb-24 lg:mb-32">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className="flex flex-col h-full rounded-xl md:rounded-2xl overflow-hidden bg-white"
              style={{ boxShadow: "0 1px 3px rgba(16, 24, 40, 0.04), 0 1px 2px rgba(16, 24, 40, 0.03)" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: isMobile ? -2 : -4,
                transition: { duration: 0.3 }
              }}
            >
              {/* Bild mit subtilerem Farbakzent - optimierte Höhe für Mobile */}
              <div className="aspect-[4/2.5] md:aspect-[5/3] overflow-hidden relative">
                <img 
                  src={point.imageUrl} 
                  alt={point.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 filter saturate-[0.9]"
                />
                
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{ 
                    background: `linear-gradient(to top, ${colors.dark}90, transparent 70%)` 
                  }}
                ></div>
                
                {/* Modernes Tag-Element über dem Bild - angepasste Größe für Mobile */}
                <div
                  className="absolute bottom-3 md:bottom-5 left-3 md:left-5 py-1 px-2.5 md:px-3 rounded-full text-[10px] md:text-xs font-medium backdrop-blur-sm"
                  style={{ 
                    backgroundColor: `${colors.dark}30`,
                    color: 'white' 
                  }}
                >
                  <span>Problem {index + 1}</span>
                </div>
              </div>
              
              {/* Content mit eleganter Typografie - weniger Padding auf Mobile */}
              <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex-grow flex flex-col">
                <div className="mb-3 md:mb-4 flex items-center">
                  <div 
                    className="flex-shrink-0 p-1.5 md:p-2 mr-3 md:mr-4 rounded-lg"
                    style={{ 
                      backgroundColor: `${point.color}08`,
                      color: point.color
                    }}
                  >
                    {point.icon}
                  </div>
                  <h3 
                    className="font-semibold text-base md:text-lg lg:text-xl"
                    style={{ color: colors.dark }}
                  >
                    {point.title}
                  </h3>
                </div>
                
                <p 
                  className="flex-grow text-sm md:text-base"
                  style={{ color: colors.textLight, lineHeight: '1.6' }}
                >
                  {point.description}
                </p>
                
                {/* Subtile visuelle Trennung */}
                <div className="pt-4 md:pt-5 mt-auto">
                  <div 
                    className="w-10 md:w-12 h-px"
                    style={{ backgroundColor: `${point.color}25` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reality-Check-Bereich - besser für Mobile optimiert */}
        <motion.div
          className="relative max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          {/* Subtiler Hintergrund-Layer für Tiefe */}
          <div className="absolute -z-10 inset-0 bg-white rounded-2xl md:rounded-3xl border border-gray-100/50 transform rotate-0.5 opacity-75"></div>
          
          <div className="rounded-2xl md:rounded-3xl overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(16, 24, 40, 0.04), 0 2px 6px rgba(16, 24, 40, 0.02)" }}>
            <div className="flex flex-col md:grid md:grid-cols-2">
              {/* Linke Spalte - Visuelle Darstellung mit elegantem Text-Overlay - bessere Höhe auf Mobile */}
              <div className="relative h-full min-h-[240px] sm:min-h-[280px] md:min-h-full">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Frustrierter Fitness-App-Nutzer"
                  className="absolute inset-0 h-full w-full object-cover filter saturate-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40"></div>
                
                {/* Overlay Content mit subtilerer Typografie - optimierte Abstände für Mobile */}
                <div className="relative z-10 p-6 sm:p-8 md:p-12 h-full flex flex-col justify-center">
                  <h3 
                    className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 md:mb-5 tracking-tight"
                  >
                    Die ernüchternde Realität
                  </h3>
                  
                  <p 
                    className="text-white/80 text-sm sm:text-base md:text-lg mb-6 md:mb-8"
                    style={{ lineHeight: '1.7', fontWeight: '300' }}
                  >
                    Die überwiegende Mehrheit der Menschen scheitert nicht aus Mangel an Willenskraft – 
                    sondern weil ihnen die richtige Form der Unterstützung fehlt.
                  </p>
                  
                  <div className="mt-auto">
                    <motion.div
                      className="inline-block"
                      whileHover={{ 
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <a
                        href="#solution"
                        className="inline-flex items-center text-white rounded-lg md:rounded-xl px-4 sm:px-5 md:px-6 py-2.5 md:py-3 text-xs sm:text-sm font-medium transition-all duration-300 border border-white/20 backdrop-blur-sm bg-white/10 hover:bg-white/15"
                      >
                        <span>Die bessere Alternative entdecken</span>
                        <svg className="ml-2 w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Rechte Spalte - Moderne Darstellung der Fakten - besser für Mobile angepasst */}
              <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center bg-white">
                <h3 
                  className="text-lg md:text-xl font-semibold mb-6 md:mb-10 tracking-tight"
                  style={{ color: colors.dark }}
                >
                  Die Zahlen sprechen für sich
                </h3>
                
                {/* Statistiken - modernere, subtilere Visualisierung - mobil-optimiert */}
                <div className="space-y-6 md:space-y-10">
                  {[
                    { value: "80%", label: "der App-Nutzer brechen in den ersten Monaten ab", color: colors.accent2 },
                    { value: "67%", label: "fühlen sich von generischen Plänen unterfordert", color: colors.accent1 },
                    { value: "92%", label: "wünschen sich persönlichere Betreuung", color: colors.primary }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center"
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={staggeredFadeIn}
                    >
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center mr-4 md:mr-5 flex-shrink-0"
                        style={{ 
                          backgroundColor: `${stat.color}08`,
                          color: stat.color
                        }}
                      >
                        <span className="text-lg sm:text-xl md:text-2xl font-medium">{stat.value}</span>
                      </div>
                      
                      <div className="flex-1">
                        <p 
                          className="text-sm sm:text-base font-normal mb-2 md:mb-2.5"
                          style={{ color: colors.text }}
                        >
                          <span className="font-medium">{stat.label.split(' ')[0]}</span>
                          <span>
                            {' ' + stat.label.split(' ').slice(1).join(' ')}
                          </span>
                        </p>
                        
                        {/* Subtilere Progress Bar */}
                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full rounded-full"
                            style={{ backgroundColor: stat.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: stat.value }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                          ></motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Subtile Trennung zum nächsten Abschnitt - weniger Abstand auf Mobile */}
                <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-gray-100">
                  <p className="text-xs md:text-sm" style={{ color: colors.textLight }}>
                    Quelle: Fitness Industry Association, 2023 Survey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}