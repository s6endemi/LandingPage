"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Iphone16Pro } from "@/components/ui/iphone-16-pro";
import { WordRotate } from "@/components/magicui/word-rotate";

export function FeatureSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef(null);
  
  // Premium color palette with strategic accents
  const colors = {
    primary: "#9bc539",      // Green for strategic accents
    secondary: "#3B82F6",    // Blue for accents
    dark: "#374151",         // Rich dark gray for headings
    gray: "#6B7280",         // Medium gray for body text
    light: "#F9FAFB",        // Light gray for backgrounds
    neutralDark: "#4B5563",  // Darker neutral for contrasts
    neutralLight: "#F3F4F6", // Lighter neutral for backgrounds
  };
  
  // Parallax effect for smooth movements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const phoneY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -30]);
  
  // Features with more compelling descriptions and visuals
  const features = [
    {
      id: "ai-coach",
      title: "Dein 24/7 KI-Coach",
      description: "Trainiere mit einem echten Coach-Gefühl: Stelle Fragen, erhalte Anpassungen, und bekomme wissenschaftlich fundiertes Feedback – zu jeder Zeit verfügbar, wie ein Profi-Trainer in deiner Tasche.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: colors.primary,
      stats: [
        { label: "Antwortzeit", value: "< 2 Sek" },
        { label: "Personalisierungsgrad", value: "97%" },
        { label: "24/7 Verfügbarkeit", value: "100%" }
      ]
    },
    {
      id: "adaptive-training",
      title: "Lebende Trainingspläne",
      description: "Schluss mit starren Programmen. Deine Pläne passen sich in Echtzeit an – basierend auf deinem Fortschritt, Tagesform und verfügbarer Zeit. Bei Müdigkeit wird's leichter, bei guter Form intensiver.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: colors.secondary,
      stats: [
        { label: "Anpassungsgenauigkeit", value: "95%" },
        { label: "Erfolgsquote", value: "+72%" },
        { label: "Verletzungsprävention", value: "+85%" }
      ]
    },
    {
      id: "nutrition-sync",
      title: "Ernährung & Training in Sync",
      description: "Deine Ernährung passt sich automatisch deinem Training an – mehr Proteine nach Krafttraining, mehr Kohlenhydrate vor Cardio. Ideal für optimale Leistung und Regeneration, abgestimmt auf deinen Alltag.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "#F59E0B", // Orange color
      stats: [
        { label: "Personalisierungsgrad", value: "100%" },
        { label: "Nährstoffausnutzung", value: "+65%" },
        { label: "Anpassung an Vorlieben", value: "96%" }
      ]
    },
    {
      id: "progress-tracking",
      title: "Fortschritt visuell & motivierend",
      description: "Dein Fortschritt wird greifbar dargestellt – mit KI-gestützter Analyse deiner Leistungskurve, Vorhersage künftiger Erfolge und Visualisierung deiner Entwicklung über Zeit. Daten, die tatsächlich motivieren.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "#8B5CF6", // Purple color
      stats: [
        { label: "Erreichte Ziele", value: "87%" },
        { label: "Prognosegenauigkeit", value: "93%" },
        { label: "Motivationssteigerung", value: "+76%" }
      ]
    }
  ];

  // Font import for consistent typography
  const fontImportStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
  `;

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-white font-[Inter,sans-serif]"
      id="features"
      style={{ 
        fontFamily: "'Inter', system-ui, sans-serif",
        fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
        letterSpacing: "-0.01em"
      }}
    >
      {/* Stylesheet for font */}
      <style>{fontImportStyle}</style>
      
      {/* Subtle background elements */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-10 overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gray-50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-tr from-gray-50 to-transparent rounded-full blur-3xl"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-center opacity-[0.02]"></div>
        
        {/* Flowing background accent */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.05]">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1.1, 1],
              rotate: [0, 10, -5, 0],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-[800px] h-[800px] rounded-full"
            style={{
              background: `radial-gradient(circle at center, ${colors.primary}, transparent 60%)`
            }}
          />
        </div>
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Badge nun zentriert über dem Titel */}
        <div className="text-center mb-20 md:mb-28">
          <motion.div
            className="mb-4 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-5 py-2 rounded-full"
                 style={{ 
                   backgroundColor: colors.neutralLight,
                   color: colors.dark
                 }}
            >
              <span className="text-sm uppercase tracking-wide font-medium">MEHR ALS NUR EINE FITNESS-APP</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-semibold mb-5 text-gray-800 inline-block relative tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ lineHeight: 1.1 }}
          >
            Innovative{" "}
            <span className="inline-block w-[180px] md:w-[250px] text-center relative align-bottom overflow-hidden h-[50px] md:h-[65px]" style={{ color: colors.primary }}>
              <WordRotate 
                words={["Features", "KI-Technik", "Analysen"]} 
                className="text-4xl md:text-5xl font-semibold"
                duration={3000}
                motionProps={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 },
                  transition: { duration: 0.5, ease: "easeOut" },
                }}
              />
            </span>{" "}
            für echte Ergebnisse
            <motion.div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] opacity-30"
              style={{ backgroundColor: colors.dark }}
              initial={{ width: 0 }}
              whileInView={{ width: "70%", x: 0 }}
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
            Athly vereint hochmoderne KI-Technologie mit sportwissenschaftlicher Expertise, 
            um dir eine völlig neue Art des Trainings zu bieten – intelligent, anpassungsfähig und maßgeschneidert.
          </motion.p>
        </div>

        {/* 3D Perspective Container - Keeping as requested */}
        <div className="relative mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div 
              className="inline-block px-4 py-2 rounded-full"
              style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
            >
              <span className="text-sm font-medium tracking-wide">ALLES IN EINER APP</span>
            </div>
          </motion.div>
          
          {/* 3D Display with multiple angles of the app */}
          <div className="relative h-[400px] lg:h-[500px] max-w-6xl mx-auto">
            {/* Center phone */}
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Iphone16Pro
                width={280}
                height={560}
                src="/images/athly-dashboard.jpg" // Replace with your main app image
                className="shadow-2xl"
              />
            </motion.div>
            
            {/* Left phone */}
            <motion.div
              className="absolute left-[20%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
              style={{ perspective: "1000px" }}
              initial={{ opacity: 0, x: -60, rotateY: 45 }}
              whileInView={{ opacity: 0.8, x: 0, rotateY: 25 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Iphone16Pro
                width={220}
                height={440}
                src="/images/athly-nutrition.jpg" // Replace with nutrition screen
                className="shadow-xl"
              />
            </motion.div>
            
            {/* Right phone */}
            <motion.div
              className="absolute left-[80%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
              style={{ perspective: "1000px" }}
              initial={{ opacity: 0, x: 60, rotateY: -45 }}
              whileInView={{ opacity: 0.8, x: 0, rotateY: -25 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Iphone16Pro
                width={220}
                height={440}
                src="/images/athly-workout.jpg" // Replace with workout screen
                className="shadow-xl"
              />
            </motion.div>
            
            {/* Accent glow effect */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-3xl opacity-30"
                style={{ background: `radial-gradient(circle at center, ${colors.primary}40, transparent 70%)` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Feature Selector - Left */}
          <div className="order-2 lg:order-1 lg:col-span-5 lg:sticky lg:top-24 self-start">
            <div className="space-y-4 max-w-xl mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`rounded-xl cursor-pointer transition-all duration-300 overflow-hidden backdrop-blur-sm border hover:shadow-lg`}
                  style={{ 
                    borderColor: activeFeature === index ? `${feature.color}50` : 'rgba(229, 231, 235, 1)',
                    boxShadow: activeFeature === index ? `0 10px 25px -5px ${feature.color}15` : '',
                    transform: activeFeature === index ? 'translateY(-2px)' : 'none'
                  }}
                  onClick={() => setActiveFeature(index)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: activeFeature === index ? -2 : -1,
                    boxShadow: activeFeature === index 
                      ? `0 15px 30px -5px ${feature.color}20` 
                      : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div 
                    className="relative overflow-hidden bg-white"
                    style={{ 
                      background: activeFeature === index 
                        ? `linear-gradient(to right, ${feature.color}05, white 80%)` 
                        : 'white' 
                    }}
                  >
                    {/* Subtle line decoration for active feature */}
                    {activeFeature === index && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r" 
                           style={{ backgroundColor: feature.color }}></div>
                    )}
                    
                    <div className="flex p-5">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300`} 
                        style={{ 
                          backgroundColor: activeFeature === index ? feature.color : "#f3f4f6",
                          color: activeFeature === index ? "white" : "#6B7280",
                          boxShadow: activeFeature === index ? `0 10px 15px -3px ${feature.color}20` : 'none'
                        }}
                      >
                        {feature.icon}
                      </div>
                      
                      <div>
                        <h3 className={`font-medium text-lg mb-1 transition-colors duration-300 ${activeFeature === index ? "text-gray-900" : "text-gray-700"}`}>
                          {feature.title}
                        </h3>
                        <p className={`text-sm line-clamp-2 transition-colors duration-300 ${activeFeature === index ? "text-gray-700" : "text-gray-500"}`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Expanded Content for active feature */}
                    <AnimatePresence>
                      {activeFeature === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="px-5 pb-5 overflow-hidden"
                        >
                          {/* Feature Stats */}
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {feature.stats.map((stat, idx) => (
                              <motion.div 
                                key={idx} 
                                className="p-3 rounded-lg text-center bg-white shadow-sm border border-gray-100"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                              >
                                <div className="text-lg font-medium" style={{ color: feature.color }}>
                                  {stat.value}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Call to Action */}
                          <motion.button 
                            className="mt-2 text-sm font-medium flex items-center group" 
                            style={{ color: feature.color }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            whileHover={{ x: 2 }}
                          >
                            <span>Mehr über {feature.title} erfahren</span>
                            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" 
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Feature Demo Display - Right Side */}
          <div className="order-1 lg:order-2 lg:col-span-7 relative">
            {/* Feature Display Area */}
            <div className="relative">
              {/* Demo visualization based on which feature is selected */}
              <AnimatePresence mode="wait">
                {activeFeature === 0 && (
                  <motion.div
                    key="feature-weight-plateau"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    {/* Weight Loss Plateau Demo */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 relative">
                          <div className="relative w-full">
                            <img 
                              src="/images/fitness-woman.jpg" 
                              alt="Fitness Training" 
                              className="w-full object-cover h-[300px] md:h-full"
                            />
                            
                            {/* Body Fat Overlay */}
                            <motion.div 
                              className="absolute bottom-6 left-4 bg-white rounded-xl shadow-lg p-3"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                            >
                              <div className="text-sm text-gray-500">Body fat</div>
                              <div className="flex items-center">
                                <span className="text-xl font-bold text-red-500">2 lb</span>
                                <svg className="w-4 h-4 text-red-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                        
                        <div className="md:w-1/2 p-6 md:p-8">
                          <h3 className="text-2xl font-bold mb-4 text-gray-800">Push through the weight-loss plateau</h3>
                          <p className="text-gray-600 mb-6">Hit the right exercises, reps, and intensity—all powered by a healthy calorie deficit based on your body composition and activity level.</p>
                          
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex items-center"
                          >
                            <div className="mr-4 p-3 rounded-full" style={{ backgroundColor: `${colors.primary}15` }}>
                              <svg className="w-6 h-6" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Dein KI-Coach überwacht</div>
                              <div className="font-medium">Kalorien, Aktivität, und Fortschritt</div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Coaching Dialog Demo */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="absolute right-4 -bottom-20 md:right-12 md:-bottom-10 max-w-[260px]"
                    >
                      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                          </div>
                          <div className="font-medium">Dein KI-Coach</div>
                        </div>
                        <p className="text-gray-700 text-sm">Basierend auf deinen Daten würde ich dir raten, 20% mehr Protein zu dir zu nehmen und HIIT zweimal pro Woche einzubauen, um dein Plateau zu überwinden.</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                {activeFeature === 1 && (
                  <motion.div
                    key="feature-gain-muscle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    {/* Gain Muscle Demo - neues, saubereres Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                      {/* Linke Seite: Hauptkarte mit Trainingsinfo */}
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6 md:p-8">
                          <h3 className="text-2xl font-bold mb-4 text-gray-800">Gain muscle</h3>
                          <p className="text-gray-600 mb-6">Put the right plates on your barbell, every workout. With sessions adapted to you by Athly's AI, you'll never push too hard or lift too little again.</p>
                          
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="bg-gray-50 rounded-xl p-5"
                          >
                            <div className="mb-4">
                              <div className="flex items-center gap-4 mb-4">
                                <img src="/images/shoulders-icon.png" alt="Shoulders" className="w-12 h-12" />
                                <div>
                                  <div className="font-medium text-gray-800 text-lg">Shoulders</div>
                                  <div className="text-sm text-gray-500">Round 1/3 | Exercise 3/3</div>
                                </div>
                              </div>
                              
                              <div className="flex justify-center items-center gap-6 mb-4">
                                <div className="bg-white px-8 py-4 rounded-lg shadow-sm">
                                  <div className="text-sm text-gray-500 text-center">reps</div>
                                  <div className="text-2xl font-bold text-center">15</div>
                                </div>
                                
                                <div className="text-xl">×</div>
                                
                                <div className="bg-white px-8 py-4 rounded-lg shadow-sm">
                                  <div className="text-sm text-gray-500 text-center">kg</div>
                                  <div className="text-2xl font-bold text-center">10</div>
                                </div>
                              </div>
                            </div>
                            
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "75%" }}
                              transition={{ delay: 0.6, duration: 1 }}
                              className="h-2 rounded-full"
                              style={{ backgroundColor: colors.secondary }}
                            ></motion.div>
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Rechte Seite: Personalisierte Gewichtsempfehlung */}
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6 md:p-8">
                          <h3 className="text-xl font-bold mb-6 text-gray-800">Personalized Weight</h3>
                          
                          <div className="mb-8">
                            <div className="flex items-center mb-6">
                              <div className="flex-shrink-0 mr-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.secondary}15` }}>
                                  <svg className="w-6 h-6" style={{ color: colors.secondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                  </svg>
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-600 text-sm">Basierend auf deiner letzten Performance</div>
                                <div className="font-medium text-lg">8kg → 10kg vorgeschlagen</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-100 pt-5">
                            <div className="text-sm font-medium text-gray-700 mb-3">KI-Analyse des Trainings:</div>
                            <ul className="space-y-3">
                              <li className="flex items-center">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <span className="text-sm">Form verbessert seit letzter Woche</span>
                              </li>
                              <li className="flex items-center">
                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                  </svg>
                                </div>
                                <span className="text-sm">+2kg progressives Overload</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Lean Mass & Equipment Indicators */}
                    <div className="flex justify-between">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="bg-white rounded-xl shadow-md p-4 mb-4"
                      >
                        <div className="text-sm text-gray-500">Lean mass</div>
                        <div className="flex items-center text-xl font-bold text-green-500">
                          97 lb
                          <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="bg-white rounded-xl shadow-md p-4 flex items-center"
                      >
                        <img src="/images/dumbbells-icon.png" alt="Dumbbells" className="w-6 h-6 mr-2" />
                        <span className="font-medium mr-2">Dumbbells</span>
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                {activeFeature === 2 && (
                  <motion.div
                    key="feature-nutrition-sync"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    {/* Nutrition Sync Demo */}
                    <div className="flex flex-col md:flex-row gap-6 mb-10">
                      <div className="md:w-3/5">
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="bg-white rounded-2xl shadow-lg overflow-hidden h-full"
                        >
                          <div className="p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                              <h3 className="text-2xl font-bold text-gray-800">Stay motivated</h3>
                              <div className="bg-gray-100 rounded-full px-3 py-1 text-sm">5 days of healthy activity</div>
                            </div>
                            
                            <div className="mb-8">
                              <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
                                <div className="flex justify-between items-center mb-4">
                                  <div className="text-lg font-medium">Aktivitätsübersicht</div>
                                  <div className="text-sm text-gray-500">Diese Woche</div>
                                </div>
                                
                                <div className="flex items-center mb-2">
                                  <div className="w-40 bg-gray-200 rounded-full h-3 mr-3">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: "70%" }}
                                      transition={{ delay: 0.5, duration: 1 }}
                                      className="h-3 rounded-full"
                                      style={{ background: `linear-gradient(to right, #4ade80, ${colors.primary})` }}
                                    ></motion.div>
                                  </div>
                                  <div className="text-white px-3 py-1 rounded text-xs font-medium bg-green-500">HEALTHY</div>
                                </div>
                                
                                <div className="text-sm text-gray-500">5 von 7 Tagen erreicht - auf Kurs!</div>
                              </div>
                              
                              <p className="text-gray-600">
                                Get personalized fitness tips from Athly Coach, show off your workout streaks, and challenge friends to hit the same heights.
                              </p>
                            </div>
                            
                            <div className="flex items-center mt-4">
                              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white mr-4">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Nächstes Training</div>
                                <div className="font-medium">Heute, 18:30 - HIIT Session</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      
                      <div className="md:w-2/5">
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="bg-white rounded-2xl shadow-lg overflow-hidden h-full relative"
                        >
                          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(to right, ${colors.primary}, #F59E0B)` }}></div>
                          <div className="p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                              <h3 className="text-xl font-bold text-gray-800">Nutrition Plan</h3>
                              <div className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">Auto-adjusted</div>
                            </div>
                            
                            <div className="space-y-4">
                              {[
                                { time: "7:30", title: "Breakfast", meal: "Protein Pancakes with Banana", protein: "high", carbs: "medium" },
                                { time: "10:30", title: "Pre-Workout Snack", meal: "Greek Yogurt with Honey", protein: "medium", carbs: "low" },
                                { time: "13:30", title: "Post-Workout Meal", meal: "Grilled Chicken with Quinoa", protein: "very-high", carbs: "medium", focus: true }
                              ].map((meal, idx) => (
                                <motion.div 
                                  key={idx}
                                  initial={{ y: 10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ delay: 0.5 + (idx * 0.1), duration: 0.4 }}
                                  className={`p-3 rounded-lg border ${meal.focus ? 'border-2 border-yellow-400 bg-yellow-50' : 'border-gray-100'}`}
                                >
                                  <div className="flex justify-between mb-1">
                                    <span className="text-xs text-gray-500">{meal.time}</span>
                                    <span className="text-xs font-medium">{meal.title}</span>
                                  </div>
                                  <div className="text-sm font-medium mb-2">{meal.meal}</div>
                                  <div className="flex space-x-2">
                                    <div className="flex items-center space-x-1">
                                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                      <span className="text-xs">
                                        {meal.protein === 'high' ? 'P: 30g' : 
                                         meal.protein === 'very-high' ? 'P: 40g' : 'P: 20g'}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                                      <span className="text-xs">
                                        {meal.carbs === 'high' ? 'C: 60g' : 
                                         meal.carbs === 'low' ? 'C: 15g' : 'C: 30g'}
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                            
                            <div className="mt-4 text-xs flex items-center" style={{ color: "#F59E0B" }}>
                              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              Angepasst für HIIT-Training heute
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeFeature === 3 && (
                  <motion.div
                    key="feature-progress-tracking"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    {/* Progress Tracking and Consistency Demo */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/2">
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="bg-white rounded-2xl shadow-lg overflow-hidden h-full"
                        >
                          <div className="p-6 md:p-8">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Stay consistent</h3>
                            
                            <div className="relative mb-6">
                              <img 
                                src="/images/custom-workout.jpg" 
                                alt="Custom Workout" 
                                className="w-full h-48 object-cover rounded-xl"
                              />
                              
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-xs">
                                  <div className="text-center mb-2">
                                    <div className="text-lg font-bold">Custom Workout</div>
                                    <div className="text-sm text-gray-500">What would you like to do in our session?</div>
                                  </div>
                                  
                                  <div className="mb-3">
                                    <div className="text-xs text-gray-500 mb-2">TIME</div>
                                    <div className="flex justify-around gap-2">
                                      <div className="px-3 py-1 rounded-full bg-gray-100 text-sm">20 min</div>
                                      <div className="px-3 py-1 rounded-full bg-gray-100 text-sm">30 min</div>
                                      <div className="px-3 py-1 rounded-full bg-black text-white text-sm">40 min</div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="text-xs text-gray-500 mb-2">TARGET MUSCLES</div>
                                    <div className="grid grid-cols-3 gap-2">
                                      {['Shoulders', 'Biceps', 'Triceps'].map((muscle, idx) => (
                                        <div key={idx} className="text-center">
                                          <div className="w-12 h-12 mx-auto mb-1">
                                            <img src={`/images/${muscle.toLowerCase()}-icon.png`} alt={muscle} className="w-full h-full" />
                                          </div>
                                          <div className="text-xs">{muscle}</div>
                                          <div className="text-xs text-gray-500">100%</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-gray-600">
                              Make light work of working out. Athly Coach tailors workouts based on your preferred duration, intensity, and equipment.
                            </p>
                          </div>
                        </motion.div>
                      </div>
                      
                      <div className="md:w-1/2">
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="bg-white rounded-2xl shadow-lg overflow-hidden h-full"
                        >
                          <div className="p-6 md:p-8">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-2xl font-bold text-gray-800">Deine Fitness Journey</h3>
                              <div className="text-sm py-1 px-3 rounded-full" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                                +32% in 60 Tagen
                              </div>
                            </div>
                            
                            <div className="h-64 relative mb-6">
                              {/* Progress Chart */}
                              <div className="absolute inset-0">
                                <div className="h-full w-full">
                                  <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <defs>
                                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#3B82F6" />
                                        <stop offset="100%" stopColor="#8B5CF6" />
                                      </linearGradient>
                                    </defs>
                                    
                                    {/* Background grid lines */}
                                    <g stroke="#f2f2f2" strokeWidth="1">
                                      {[20, 40, 60, 80].map((y) => (
                                        <line key={y} x1="0" y1={y} x2="100" y2={y} />
                                      ))}
                                      {[0, 20, 40, 60, 80, 100].map((x) => (
                                        <line key={x} x1={x} y1="0" x2={x} y2="100" />
                                      ))}
                                    </g>
                                    
                                    {/* Progress line */}
                                    <motion.path
                                      initial={{ pathLength: 0 }}
                                      animate={{ pathLength: 1 }}
                                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                      d="M0,80 10,75 20,68 30,65 40,60 50,55 60,45 70,38 80,30 90,25"
                                      fill="none"
                                      stroke="url(#progressGradient)"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                    />
                                    
                                    {/* Future projection */}
                                    <motion.path
                                      initial={{ pathLength: 0, opacity: 0 }}
                                      animate={{ pathLength: 1, opacity: 0.7 }}
                                      transition={{ duration: 1, delay: 2, ease: "easeOut" }}
                                      d="M90,25 100,20"
                                      fill="none"
                                      stroke="#8B5CF6"
                                      strokeWidth="3"
                                      strokeDasharray="4,4"
                                      strokeLinecap="round"
                                    />
                                    
                                    {/* Milestones */}
                                    <motion.g
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ duration: 0.5, delay: 2.2 }}
                                    >
                                      <circle cx="20" cy="68" r="3" fill="white" stroke="#3B82F6" strokeWidth="2" />
                                      <circle cx="60" cy="45" r="3" fill="white" stroke="#8B5CF6" strokeWidth="2" />
                                      <circle cx="100" cy="20" r="3" fill="white" stroke="#8B5CF6" strokeWidth="2" />
                                    </motion.g>
                                  </svg>
                                </div>
                              </div>
                              
                              {/* Milestone labels */}
                              <div className="absolute left-[17%] top-[70%] transform -translate-x-1/2">
                                <div className="text-xs font-medium p-1 rounded bg-white/80 shadow-sm">5km erreicht</div>
                              </div>
                              
                              <div className="absolute left-[57%] top-[47%] transform -translate-x-1/2">
                                <div className="text-xs font-medium p-1 rounded bg-white/80 shadow-sm">10km Lauf</div>
                              </div>
                              
                              <div className="absolute right-0 top-[22%] transform -translate-x-1/2">
                                <div className="text-xs font-medium p-1 rounded bg-white/80 shadow-sm text-purple-600">Halbmarathon</div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>Start</span>
                              <span>Heute (12 Wochen)</span>
                              <span>Prognose (16 Wochen)</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Floating Coach Message */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="absolute right-8 -bottom-20 max-w-[220px]"
                    >
                      <div className="bg-purple-600 text-white rounded-xl shadow-lg p-4">
                        <p className="text-sm">Basierend auf deinen Daten bist du auf dem besten Weg, in 4 Wochen deinen ersten Halbmarathon zu schaffen!</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Nur eine einzelne Benachrichtigung für Feature 1 */}
              {activeFeature === 0 && (
                <motion.div
                  className="absolute left-4 top-6 z-20"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-3 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Your fitness program is ready. Are you?</div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Feature-spezifische Zeit-Anzeige für Feature 3 */}
              {activeFeature === 2 && (
                <motion.div
                  className="absolute right-6 top-6 z-20"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="text-sm text-gray-500">Nächstes Training</div>
                    <div className="font-medium">Heute, 18:30 - HIIT</div>
                  </div>
                </motion.div>
              )}
              
              {/* Feature-spezifische Fortschritts-Anzeige für Feature 4 */}
              {activeFeature === 3 && (
                <motion.div
                  className="absolute right-6 top-6 z-20"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="text-sm text-gray-500">Fortschritt</div>
                    <div className="font-medium text-purple-600">+32% in 12 Wochen</div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}