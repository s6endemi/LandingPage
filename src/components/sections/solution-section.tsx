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

  // Animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      id="solution"
    >
      {/* Subtle background with parallax effect */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-5 overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-gradient-to-bl from-gray-50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-gray-50 to-transparent rounded-full blur-3xl"></div>
      </motion.div>
      
      {/* Hero Video with Overlaid Title - Zing-style typography */}
      <div className="mb-14 md:mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative h-[140px] sm:h-[180px] md:h-[320px] overflow-hidden rounded-2xl shadow-md">
            {/* Hero Video */}
            <video 
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://cdn.pixabay.com/video/2024/02/15/200657-913478674_large.mp4" type="video/mp4" />
            </video>
            
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/10"></div>
            
            {/* Left-aligned Title Text - Zing style */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 max-w-2xl">
              <motion.span 
                className="text-white/90 text-xs uppercase tracking-wide mb-1 md:mb-3 font-medium"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                Erreiche deine Fitness-Ziele
              </motion.span>
              
              <motion.h2 
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* First Benefit - Conversion-optimized with focused chat scenario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div className="md:flex">
              {/* Left: Content */}
              <div className="p-6 md:p-10 md:w-1/2">
                {/* Benefit Label - NEW */}
                <div className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold tracking-wide mb-4">
                  FLEXIBEL & ANPASSBAR
                </div>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
                  Trainingspläne die sich an dich anpassen, nicht umgekehrt
                </h3>
                
                <p className="text-base md:text-lg font-medium text-gray-700 mb-8 md:pr-6">
                  Keine starren Pläne mehr. Athly passt sich deinem Leben an – ob du eine Übung ändern, ein Training verschieben oder deine Ziele anpassen willst.
                </p>
                
                {/* Benefit Points with Icons - NEW */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-gray-700 text-base md:text-lg">Ändere Übungen spontan ohne den Trainingseffekt zu verlieren</div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-gray-700 text-base md:text-lg">Passe deine Ziele jederzeit an und erhalte sofort einen neuen Plan</div>
                  </div>
                </div>
              </div>
              
              {/* Right: Fokussiertes Chat-Szenario */}
              <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                <div className="h-full w-full flex items-center justify-center p-4 md:p-6 lg:p-8">
                  {/* Nur die wesentliche Visualisierung des Szenarios */}
                  <div className="relative max-w-md mx-auto w-full">
                    {/* Nur die wichtigsten Chat-Elemente */}
                    <div className="flex flex-col space-y-3">
                      {/* Kurzer Kontext */}
                      <div className="bg-white rounded-2xl p-4 shadow-md">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                            A
                          </div>
                          <div className="font-semibold text-gray-900">Athly Coach</div>
                        </div>
                        
                        {/* Szenariobeschreibung */}
                        <div className="bg-blue-50 text-gray-800 p-3 rounded-xl rounded-tr-sm max-w-sm ml-auto mb-3">
                          <p className="text-sm">Hey Coach, ich muss mein Training heute absagen. Hab spontan ein wichtiges Meeting reinbekommen 😕</p>
                        </div>
                      </div>
                      
                      {/* Adaptation Card - Das eigentliche Feature im Fokus */}
                      <div className="bg-white rounded-2xl shadow-md p-5">
                        <div className="flex items-center mb-3">
                          <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                            A
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Plan angepasst</div>
                            <div className="text-xs text-green-600">Trainingsziele bleiben auf Kurs</div>
                          </div>
                        </div>
                        
                        {/* Das angepasste Workout als Hauptfokus */}
                        <div className="rounded-xl border border-green-100 bg-green-50 p-4 relative mt-2 mb-2">
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border border-white">
                            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                          </div>
                          
                          <div className="flex justify-between mb-2">
                            <div className="font-bold text-gray-900">Donnerstag, 14. März</div>
                            <div className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-medium">Neu</div>
                          </div>
                          
                          <div className="mb-3">
                            <div className="text-base font-medium text-gray-800">Cardio + Kraft Kombi</div>
                            <div className="text-sm text-gray-600">Von Dienstag verschoben</div>
                          </div>
                          
                          <div className="flex space-x-3">
                            <div className="py-1 px-3 bg-white rounded-md text-sm border border-gray-200 text-gray-700 flex items-center">
                              <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              30 Min
                            </div>
                            <div className="py-1 px-3 bg-white rounded-md text-sm border border-gray-200 text-gray-700 flex items-center">
                              <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1.5"></span>
                              Mittel
                            </div>
                          </div>
                        </div>
                        
                        {/* Adaptation Highlights */}
                        <div className="flex items-center text-sm text-gray-600 mt-3">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Intensität angepasst, um deine Ziele zu erreichen
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Second Benefit - Conversion-optimized with improvement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16 md:mb-24"
        >
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="md:grid md:grid-cols-2">
              {/* Left: Video - Größer für Mobile */}
              <div className="relative h-[220px] sm:h-[280px] md:h-[360px] rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl overflow-hidden">
                <video 
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="https://cdn.pixabay.com/video/2019/10/04/27539-364430966_large.mp4" type="video/mp4" />
                </video>
                
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/30"></div>
                
                {/* Subtle branding badge */}
                <div className="absolute top-5 left-5">
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-medium tracking-wide">ATHLY</span>
                  </div>
                </div>
              </div>
              
              {/* Right: Content */}
              <div className="p-6 md:p-10">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
                  Dein persönlicher Trainer, jederzeit verfügbar
                </h3>
                
                <p className="text-base md:text-lg text-gray-700 mb-8">
                  Frag deinen KI-Coach alles – von Übungstechniken bis zu Ernährungstipps. Erhalte sofort qualifizierte Antworten, wann immer du sie brauchst.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="font-medium text-gray-800 text-base md:text-lg">Sofortige Antworten auf alle Fragen</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="font-medium text-gray-800 text-base md:text-lg">Motiviert dich durchzuhalten</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="font-medium text-gray-800 text-base md:text-lg">Trainiert ohne zu verurteilen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        
        {/* Trust Section mit Video-Hintergrund */}
        <motion.div 
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Video-Hintergrund für die gesamte Box */}
          <div className="absolute inset-0 w-full h-full">
            <video 
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              style={{ objectPosition: "center 25%" }}
            >
              <source src="https://cdn.pixabay.com/video/2023/11/19/189729-886596145_large.mp4" type="video/mp4" />
            </video>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-black/40"></div>
          </div>
          
          <div className="grid md:grid-cols-2 relative z-10">
            <div className="p-6 md:p-10 lg:p-12">
              {/* 5 Goldene Sterne über dem Titel */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-gray-900">Erreiche auch du deine Ziele mit Athly</h3>
              <p className="text-base md:text-lg text-gray-700 mb-8">
                Mit Athly als deinem persönlichen KI-Coach ist dein Erfolg keine Frage des Glücks mehr. Wir haben hunderten Menschen geholfen – du bist der Nächste!
              </p>
              {/* CTA Button - accent color */}
              <button className="inline-flex items-center px-6 py-3 text-white font-medium rounded-xl shadow-md transition-all duration-300 group text-base md:text-lg"
                style={{ backgroundColor: colors.ctaGreen }}
              >
                <span>Kostenlos starten</span>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            
            {/* Right Column - Testimonial Overlay */}
            <div className="hidden md:flex items-center justify-center relative p-8">
              {/* Testimonial Overlay - elegant und subtil */}
              <div className="max-w-sm">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-5 border border-white/20">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-3">
                      {/* User Avatar mit Initial */}
                      <div className="h-10 w-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: colors.primary, color: 'white' }}>
                        M
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Michael S.</div>
                        <div className="text-xs text-gray-500">Nutzer seit 3 Monaten</div>
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
                    
                    {/* Testimonial Text */}
                    <p className="text-sm text-gray-700 italic mb-2">
                      "Habe in 8 Wochen 5kg abgenommen und endlich eine Routine gefunden, die ich durchhalten kann. Der KI-Coach versteht genau, wann er mich pushen muss und wann nicht."
                    </p>
                    
                    {/* Achievement Badge */}
                    <div className="self-start mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      -5kg in 8 Wochen
                    </div>
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