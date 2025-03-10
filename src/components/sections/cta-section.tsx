"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SparklesText } from "@/components/magicui/sparkles-text";

export function WaitlistCta() {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle responsive detection
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
  
  // 60/30/10 Farbschema
  const colors = {
    // 60% - Neutrale Farben
    neutralDark: "#1f2937",
    neutralMedium: "#4b5563",
    neutralLight: "#f9fafb",
    
    // 30% - Markenfarben
    primary: "#9bc539",
    
    // 10% - CTA & Highlights
    ctaGreen: "#8ab42d",
    yellow: "#FBBF24",
    
    // Helfer-Farben
    accent1: "#9E7AFF", // Sparkle-Farben beibehalten
    accent2: "#FE8BBB"
  };
  
  // Subtle parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0.97, 1]);
  
  // Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail(email)) {
      setSubmitted(true);
      // Here would normally be the API call for waitlist registration
    } else if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden bg-gray-50 isolate"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Clean white to light gray gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        
        {/* Subtle dynamic shapes */}
        <motion.div 
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-white/50 blur-3xl"
          style={{ y: y1, opacity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#9bc539]/5 blur-3xl opacity-80"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            damping: 25, 
            stiffness: 300
          }}
        >
          <div className="relative">
            {/* Main content with clean spacing */}
            <div className={`p-6 md:p-10 text-center relative z-10 ${submitted ? 'pb-8' : 'pb-10'}`}>
              {/* Status badge */}
              <motion.div 
                className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-4 py-1.5 rounded-full mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2 animate-pulse bg-[#9bc539]"></span>
                  Early Access
                </span>
              </motion.div>
              
              {/* Headline with SparklesText */}
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5 }} 
              > 
                Reserviere deinen{" "}
                <span className="relative inline-block">
                  <SparklesText 
                    text="Platz" 
                    colors={{ first: colors.accent1, second: colors.accent2 }}
                    sparklesCount={5}
                    className="inline-block font-bold text-3xl sm:text-4xl md:text-5xl"
                  />
                </span>{" "}
                in der<br className="hidden sm:block" /> Athly-Community 
              </motion.h2>
              
              {/* Subheadline - clean and concise */}
              <motion.p 
                className="text-base md:text-lg text-gray-600 font-normal mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                Sei einer der Ersten, die Zugang zum revolutionären Athly KI-Coach erhalten. 
                Limitierte Plätze für den exklusiven Early-Access.
              </motion.p>
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Email Form - clean and modern */}
                    <motion.form 
                      onSubmit={handleSubmit}
                      className="max-w-xl mx-auto mb-6"
                    >
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-grow">
                          <input
                            ref={inputRef}
                            type="email"
                            placeholder="Deine E-Mail-Adresse"
                            className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9bc539]/30 focus:border-[#9bc539] transition-all text-base"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                            </svg>
                          </div>
                        </div>
                        <motion.button 
                          type="submit"
                          className="px-6 py-3.5 rounded-xl text-white font-medium text-base transition-all duration-300 overflow-hidden bg-[#8ab42d] hover:bg-[#7fa328]"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                            Jetzt anmelden
                            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </motion.button>
                      </div>
                    </motion.form>
                    
                    {/* Benefits and social proof */}
                    <div className="space-y-6 mb-6">
                      {/* Key benefits - clean and value-focused */}
                      <motion.div 
                        className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-gray-600 text-sm"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#9bc539]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span>Sofortige Benachrichtigung</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#9bc539]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span>30% Rabatt für Early Adopter</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#9bc539]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span>Nur noch <b>limitierte</b> Plätze</span>
                        </div>
                      </motion.div>
                      
                      {/* Social proof avatars */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-center"
                      >
                        <div className="flex justify-center mb-2">
                          <div className="flex -space-x-2">
                            {[...Array(5)].map((_, index) => (
                              <div key={index} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200"></div>
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium bg-gray-800">
                              +200
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          Über 250 Personen haben sich bereits eingetragen
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  /* Success state - clean and reassuring */
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="py-6 md:py-8 max-w-md mx-auto"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto flex items-center justify-center mb-6 bg-[#9bc539]/10">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-[#9bc539]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Du bist dabei!</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                      Wir haben deine E-Mail-Adresse erhalten und werden dich informieren, 
                      sobald dein exklusiver Zugang bereit ist.
                    </p>
                    <div className="inline-block bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full mr-2 bg-[#9bc539]"></span>
                        Du bist Teilnehmer #{Math.floor(Math.random() * 100) + 312}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Card Footer - trust signals */}
          <div className="py-4 md:py-5 px-6 md:px-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 relative">
            <div className="flex items-center relative z-10">
              {/* Rating stars */}
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 md:w-5 md:h-5 text-[#FBBF24]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="ml-2 text-xs md:text-sm font-medium text-gray-800">
                4.8/5 <span className="text-gray-500 font-normal">von über 100 Beta-Testern</span>
              </span>
            </div>
            
            {/* Security assurance */}
            <div className="flex items-center relative z-10">
              <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs md:text-sm text-gray-500">Deine Daten sind sicher & werden nicht weitergegeben</span>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom partner logos - credibility */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-xs md:text-sm text-gray-500 mb-5 md:mb-6">Diese Unternehmen vertrauen auf unsere Technologie</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10 grayscale opacity-60">
            {['TechCrunch', 'Forbes', 'Wired', 'Bloomberg', 'The Verge'].map((brand, index) => (
              <motion.div 
                key={index} 
                className="text-base md:text-lg font-medium text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}