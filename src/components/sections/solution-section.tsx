"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function SolutionSection() {
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
  
  // Minimalistisches Farbschema
  const colors = {
    primary: "#9bc539",
    secondary: "#3B82F6",
    dark: "#1f2937",
    gray: "#6b7280",
    lightGray: "#f3f4f6",
    white: "#ffffff",
    ctaGreen: "#8ab42d"
  };
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -15 : -40]);

  return (
    <section 
      ref={containerRef}
      className="relative py-12 md:py-24 overflow-hidden bg-white"
      id="solution"
    >
      {/* Subtle background elements */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-5 overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-gradient-to-bl from-gray-50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-gray-50 to-transparent rounded-full blur-3xl"></div>
      </motion.div>
      
      {/* Hero Video with Overlaid Title - Mobile-optimiert */}
      <div className="mb-8 md:mb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="relative h-[140px] sm:h-[180px] md:h-[280px] overflow-hidden rounded-xl shadow-md">
            {/* Hero Video - Für mobile optimiert mit niedrigerer Auflösung */}
            <video 
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/athly-hero-placeholder.jpg" // Fallback-Bild hinzugefügt
              loading="lazy" // Lazy-loading für bessere Performance
            >
              <source 
                media="(max-width: 767px)" 
                src="https://cdn.pixabay.com/video/2024/02/15/200657-913478674_small.mp4" 
                type="video/mp4" 
              />
              <source 
                src="https://cdn.pixabay.com/video/2024/02/15/200657-913478674_large.mp4" 
                type="video/mp4" 
              />
            </video>
            
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30"></div>
            
            {/* Left-aligned Title Text - Für Mobile optimiert */}
            <div className="absolute inset-0 flex flex-col justify-center px-5 md:px-12 max-w-2xl">
              <motion.span 
                className="text-white/90 text-xs uppercase tracking-wide mb-1 md:mb-2 font-medium"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                Erreiche deine Fitness-Ziele
              </motion.span>
              
              <motion.h2 
                className="text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Dein KI-Trainer,
                <span style={{ color: colors.primary }}> immer dabei</span>
              </motion.h2>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* BENEFIT 1: Trainingsplan-Anpassung - Mobile-optimiert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-16"
        >
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center">
              {/* Left: Content - Mobile-optimiert */}
              <div className="p-5 md:p-8 md:w-1/2">
                {/* Benefit Label */}
                <div className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold tracking-wide mb-3">
                  FLEXIBEL & ANPASSBAR
                </div>
                
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight">
                  Dein flexibler Trainingsplan
                </h3>
                
                <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-5">
                  Athly passt sich deinem Leben an, nicht umgekehrt. Egal was passiert, dein KI-Coach optimiert deinen Plan in Echtzeit.
                </p>
                
                {/* Benefit Points - Mobile-optimiert mit mehr Space für Touch */}
                <div className="space-y-4 md:space-y-3 mb-4 md:mb-6">
                  <div className="flex items-start md:items-center">
                    <div className="flex-shrink-0 h-7 w-7 md:h-8 md:w-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-3 mt-0.5 md:mt-0">
                      <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-gray-700 text-sm md:text-base">Verschiebe oder ändere dein Training ohne Qualitätsverlust</div>
                  </div>
                  
                  <div className="flex items-start md:items-center">
                    <div className="flex-shrink-0 h-7 w-7 md:h-8 md:w-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-3 mt-0.5 md:mt-0">
                      <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-gray-700 text-sm md:text-base">Sofortige Plananpassung bei Terminänderungen</div>
                  </div>
                  
                  <div className="flex items-start md:items-center">
                    <div className="flex-shrink-0 h-7 w-7 md:h-8 md:w-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-3 mt-0.5 md:mt-0">
                      <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="text-gray-700 text-sm md:text-base">Bleib motiviert, auch wenn dein Alltag chaotisch ist</div>
                  </div>
                </div>
              </div>
              
              {/* Right: Konzeptuelle Visualisierung - Mobile-optimiert */}
              <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                <div className="h-full min-h-[220px] md:min-h-[320px] w-full flex items-center justify-center p-4 md:p-6">
                  {/* Vereinfachte, prägnante Visualisierung - Mobile-optimiert */}
                  <div className="w-full max-w-xs md:max-w-sm">
                    {/* Problem-Karte */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-2 border-l-4 border-red-400">
                      <div className="flex items-center text-gray-800">
                        <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-sm md:text-base">Terminkonflikt: Training nicht möglich</span>
                      </div>
                    </div>
                    
                    {/* Transformation-Pfeil */}
                    <div className="flex justify-center py-2">
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    
                    {/* Lösung-Karte */}
                    <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-400">
                      <div className="flex items-center mb-3">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-gray-800 text-sm md:text-base">Neuer optimierter Plan erstellt</span>
                      </div>
                      
                      {/* Optimierter Plan */}
                      <div className="bg-green-50 rounded p-3 mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-xs md:text-sm font-medium">Donnerstag, 17:30 Uhr</div>
                          <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Neu</div>
                        </div>
                        <div className="text-xs md:text-sm text-gray-600">30-Min Intensiv-Workout</div>
                      </div>
                      
                      <div className="flex items-center text-xs md:text-sm text-green-600">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Deine Ziele bleiben auf Kurs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* BENEFIT 2: KI-Coach - Mobile-optimiert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-16"
        >
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="flex flex-col md:grid md:grid-cols-2">
              {/* Left: Video - Mobile-optimiert */}
              <div className="relative h-[180px] sm:h-[200px] md:h-[320px] overflow-hidden">
                <video 
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/images/athly-coach-placeholder.jpg" // Fallback-Bild hinzugefügt
                  loading="lazy" // Lazy-loading für bessere Performance
                >
                  <source 
                    media="(max-width: 767px)" 
                    src="https://cdn.pixabay.com/video/2019/10/04/27539-364430966_small.mp4" 
                    type="video/mp4" 
                  />
                  <source 
                    src="https://cdn.pixabay.com/video/2019/10/04/27539-364430966_large.mp4" 
                    type="video/mp4" 
                  />
                </video>
                
                {/* Simple, elegant overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-5 md:p-6">
                  {/* Athly badge */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-medium">ATHLY</span>
                  </div>
                </div>
              </div>
              
              {/* Right: Content - Mobile-optimiert */}
              <div className="p-5 md:p-8">
                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold tracking-wide mb-3">
                  24/7 EXPERTISE
                </div>

                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight">
                  Dein persönlicher KI-Trainer
                </h3>
                
                <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-5">
                  Stelle jederzeit Fragen, erhalte sofortige Antworten und individuelles Feedback – rund um die Uhr.
                </p>
                
                {/* Benefit Points - Mobile-optimiert mit mehr Space für Touch */}
                <div className="space-y-4 md:space-y-3 mb-4 md:mb-6">
                  <div className="flex items-start md:items-center">
                    <div className="flex-shrink-0 h-7 w-7 md:h-8 md:w-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-3 mt-0.5 md:mt-0">
                      <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="text-gray-700 text-sm md:text-base">Sofortige Antworten auf all deine Fitness-Fragen</div>
                  </div>
                  
                  <div className="flex items-start md:items-center">
                    <div className="flex-shrink-0 h-7 w-7 md:h-8 md:w-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-3 mt-0.5 md:mt-0">
                      <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-gray-700 text-sm md:text-base">Verständliche Übungserklärungen ohne Fachjargon</div>
                  </div>
                  
                  <div className="flex items-start md:items-center">
                    <div className="flex-shrink-0 h-7 w-7 md:h-8 md:w-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-3 mt-0.5 md:mt-0">
                      <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="text-gray-700 text-sm md:text-base">Motivierende Begleitung ohne Verurteilung</div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Section - Mobile-optimiert und prägnanter */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Video-Hintergrund als Overlay - Mobile-optimiert */}
          <div className="absolute inset-0 w-full h-full">
            <video 
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/athly-trust-bg.jpg" 
              loading="lazy" 
              style={{ objectPosition: "center 25%" }}
            >
              <source 
                media="(max-width: 767px)" 
                src="https://cdn.pixabay.com/video/2023/11/19/189729-886596145_small.mp4" 
                type="video/mp4" 
              />
              <source 
                src="https://cdn.pixabay.com/video/2023/11/19/189729-886596145_large.mp4" 
                type="video/mp4" 
              />
            </video>
            
            {/* Gradient Overlay - Für Mobile verstärkt */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/70 md:bg-gradient-to-r md:from-white/95 md:via-white/80 md:to-black/50"></div>
          </div>
          
          {/* Mobile Layout - Vereinfacht und fokussiert */}
          <div className="md:hidden relative z-10 p-5">
            {/* Kompakter Header */}
            <div className="flex items-center justify-between mb-3">
              {/* Bewertungssterne */}
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Nutzerzahl-Badge */}
              <div className="bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                100+ aktive Nutzer
              </div>
            </div>
            
            {/* Headline */}
            <h3 className="text-xl font-bold mb-2 text-gray-900">
              Erreiche deine Fitness-Ziele mit Athly
            </h3>
            
            {/* Mini-Testimonial - Kompakter integriert */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 mb-4 border border-gray-100">
              <div className="flex items-start">
                {/* User Avatar */}
                <div className="h-7 w-7 flex-shrink-0 rounded-full bg-green-500 text-white flex items-center justify-center mr-2 font-medium text-xs">
                  M
                </div>
                {/* Kurzes Zitat */}
                <div>
                  <p className="text-xs text-gray-700">
                    <span className="font-medium">Michael S.</span>: "Mit Athly habe ich 5kg in 8 Wochen abgenommen und eine Routine gefunden, die ich durchhalte."
                  </p>
                </div>
              </div>
            </div>
            
            {/* CTA Button - Klarer Fokus */}
            <button className="w-full flex items-center justify-center px-6 py-3 text-white font-medium rounded-xl shadow-md transition-all duration-300 mb-3"
              style={{ backgroundColor: colors.ctaGreen }}
            >
              <span>Kostenlos starten</span>
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
       
          </div>
          
          {/* Desktop Layout - Original beibehalten */}
          <div className="hidden md:grid md:grid-cols-3 relative z-10">
            {/* Left Column: Conversion-optimierter CTA */}
            <div className="p-6 md:p-8 md:col-span-2 relative">
              {/* Social Proof Element */}
              <div className="flex items-center mb-3">
                <div className="flex -space-x-3 mr-3">
                  {/* Elegante User Avatars */}
                  {[...Array(3)].map((_, i) => {
                    // Subtile Farbpalette
                    const colors = ["#8ab42d", "#67a2b8", "#9d8abf"];
                    const initials = ["J", "S", "M"];
                    return (
                      <div 
                        key={i} 
                        className="h-7 w-7 rounded-full shadow-sm border border-white/40 text-white flex items-center justify-center text-xs font-medium transform transition-transform hover:scale-105"
                        style={{ 
                          background: `linear-gradient(135deg, ${colors[i]}, ${colors[i]}dd)`,
                          backdropFilter: "blur(8px)"
                        }}
                      >
                        {initials[i]}
                      </div>
                    );
                  })}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">100+ Nutzer</span> in den letzten 30 Tagen
                </div>
              </div>
              
              {/* 5 Goldene Sterne - Prägnanter */}
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                Erreiche auch du deine Ziele mit Athly
              </h3>
              
              <p className="text-base text-gray-700 mb-6 max-w-lg">
                Tausende Nutzer haben mit ihrem KI-Coach bereits ihr Wunschgewicht erreicht, Muskeln aufgebaut oder einfach einen aktiveren Lebensstil gefunden.
              </p>
              
              {/* CTA Button - Prägnanter und konversionsstärker */}
              <button className="flex items-center px-6 py-3 text-white font-medium rounded-xl shadow-md transition-all duration-300 group"
                style={{ backgroundColor: colors.ctaGreen }}
              >
                <span>Kostenlos starten</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mt-5">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>100% Datenschutz</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>7 Tage kostenlos</span>
                </div>
              </div>
            </div>
            
            {/* Right Column: Testimonial */}
            <div className="hidden md:block p-6 relative">
              {/* Testimonial Card - Prägnanter und glaubwürdiger */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-5 border border-gray-100">
                <div className="flex items-center mb-3">
                  {/* User Avatar */}
                  <div className="h-10 w-10 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 font-medium">
                    M
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Michael S.</div>
                    <div className="text-xs text-gray-500">Athly-Nutzer seit 3 Monaten</div>
                  </div>
                </div>
                
                {/* Sterne-Rating */}
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Testimonial Text - Prägnanter */}
                <p className="text-sm text-gray-700 mb-3">
                  "Mit Athly habe ich 5kg in 8 Wochen abgenommen und endlich eine Routine gefunden, die ich durchhalte. Die Flexibilität macht den Unterschied."
                </p>
                
                {/* Spezifische Erfolgs-Badges */}
                <div className="flex flex-wrap gap-2">
                  <div className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    -5kg in 8 Wochen
                  </div>
                  <div className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    4-5x pro Woche aktiv
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}