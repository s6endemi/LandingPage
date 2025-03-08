"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SparklesText } from "@/components/magicui/sparkles-text";

export function WaitlistCta() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  // Color palette - Premium with retro accents
  const colors = {
    primary: "#9cc441",     // Fresh green for buttons and accents
    accent1: "#9E7AFF",     // Purple for sparkles
    accent2: "#FE8BBB",     // Pink for sparkles
    yellow: "#FBBF24",      // Gold for stars
    dark: "#374151",        // Dark gray for text
    gray: "#6B7280",        // Gray for text
  };
  
  // Parallax & animation effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1]);
  
  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
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
      className="relative py-28 overflow-hidden bg-gradient-to-b from-white to-gray-50 isolate font-inter"
      style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        
        {/* Dynamic background elements */}
        <motion.div 
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-gray-100/70 blur-3xl"
          style={{ y: y1, opacity }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-gray-100/70 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Light beam effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="relative flex w-full h-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-gray-200 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
            >
              <div className="absolute w-[100%] left-0 bg-white h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
              <div className="absolute w-40 h-[100%] left-0 bg-white bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-gray-200 text-white [--conic-position:from_290deg_at_center_top]"
            >
              <div className="absolute w-40 h-[100%] right-0 bg-white bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
              <div className="absolute w-[100%] right-0 bg-white h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            </motion.div>
            <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-gray-200 opacity-15 blur-3xl"></div>
            <motion.div
              initial={{ width: "8rem" }}
              whileInView={{ width: "16rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-gray-100 opacity-10 blur-2xl"
            ></motion.div>
            <motion.div
              initial={{ width: "15rem" }}
              whileInView={{ width: "30rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-gray-300 opacity-50"
            ></motion.div>
          </div>
        </div>
        
        {/* Subtle grid pattern in background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]"></div>
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          <div className="relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="fitness-pattern" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="rotate(5)">
                    <path d="M25,0 L25,50 M0,25 L50,25" stroke={colors.primary} strokeWidth="0.5" />
                    <circle cx="25" cy="25" r="1" fill={colors.primary} />
                    <circle cx="0" cy="25" r="1" fill={colors.primary} />
                    <circle cx="50" cy="25" r="1" fill={colors.primary} />
                    <circle cx="25" cy="0" r="1" fill={colors.primary} />
                    <circle cx="25" cy="50" r="1" fill={colors.primary} />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#fitness-pattern)" />
              </svg>
            </div>
            
            {/* Subtle Athly logo watermark */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.02] pointer-events-none">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5L90 80H75L50 30L25 80H10L50 5Z" fill={colors.primary} />
                <path d="M25 80H75H90L75 100H25L10 80H25Z" fill={colors.primary} />
              </svg>
            </div>
            
            {/* Light effect on top edge */}
            <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-gray-100/0 via-gray-300 to-gray-100/0 blur-sm -translate-x-1/2"></div>
            
            {/* Main content */}
            <div className="p-8 md:p-14 text-center relative z-10">
              {/* Pre-Headline Badge */}
              <motion.div 
                className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-2 animate-pulse" style={{ backgroundColor: colors.primary }}></span>
                  Early Access
                </span>
              </motion.div>
              
              {/* Premium Headline with SparklesText */}
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 text-gray-900 leading-tight" 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.7 }}
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
                in der<br className="hidden sm:block" />  Athly-Community 
              </motion.h2>
              
              {/* Subheadline */}
              <motion.p 
                className="text-xl text-gray-600 font-semibold  mb-10 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Sei einer der Ersten, die Zugang zum revolutionären Athly AI-Coach erhalten. 
                Limitierte Plätze für den exklusiven Early-Access.
              </motion.p>
              
              {!submitted ? (
                <>
                  {/* Email Form */}
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-grow">
                        <input
                          ref={inputRef}
                          type="email"
                          placeholder="Deine E-Mail-Adresse"
                          className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:border-primary-500 transition-all"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{ 
                            "--tw-ring-color": `${colors.primary}50`,
                            "--tw-border-opacity": 1,
                            "--tw-border-color": `${colors.primary}`
                          } as React.CSSProperties}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                          </svg>
                        </div>
                      </div>
                      <button 
                        type="submit"
                        className="group relative px-8 py-4 rounded-xl text-white font-medium text-lg shadow-lg transition-all duration-300 overflow-hidden"
                        style={{ 
                          backgroundColor: colors.primary,
                          boxShadow: `0 10px 25px -5px ${colors.primary}20`
                        }}
                      >
                        {/* Button Shine Effect */}
                        <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                        
                        {/* Button Text */}
                        <span className="relative z-10 flex items-center whitespace-nowrap">
                          Jetzt anmelden
                          <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </motion.form>
                  
                  {/* Social Proof & Urgency */}
                  <motion.div 
                    className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-gray-500 text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" style={{ color: colors.primary }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
                      </svg>
                      <span>Sofortige Benachrichtigung bei Verfügbarkeit</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" style={{ color: colors.primary }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
                      </svg>
                      <span>30% Rabatt für Early Adopter</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" style={{ color: colors.primary }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
                      </svg>
                      <span>Nur noch <b>limitierte</b> Plätze verfügbar</span>
                    </div>
                  </motion.div>
                  
                  {/* Avatars for Social Proof */}
                  <motion.div 
                    className="flex justify-center mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="flex -space-x-2">
                      {[
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
                        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
                        "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
                        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                      ].map((avatar, index) => (
                        <div key={index} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                          <img src={avatar} alt="User avatar" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium" style={{ backgroundColor: colors.dark }}>
                        +412
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-sm text-gray-500"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Über 250 Personen haben sich bereits eingetragen
                  </motion.p>
                </>
              ) : (
                /* Success State after registration */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-8"
                >
                  <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: `${colors.primary}15` }}>
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: colors.primary }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Du bist dabei!</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Wir haben deine E-Mail-Adresse erhalten und werden dich informieren, 
                    sobald dein exklusiver Zugang bereit ist.
                  </p>
                  <div className="inline-block bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.primary }}></span>
                      Du bist Teilnehmer #{Math.floor(Math.random() * 100) + 312}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Card Footer */}
          <div className="py-6 px-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 relative">
            {/* Subtle pattern for footer */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="footer-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#374151" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#footer-dots)" />
              </svg>
            </div>
            
            <div className="flex items-center relative z-10">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: colors.yellow }}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="ml-2 text-sm font-medium text-gray-700">
                4.8/5 <span className="text-gray-500 font-normal">von über 100 Beta-Testern</span>
              </span>
            </div>
            
            <div className="flex items-center relative z-10">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: colors.dark }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm text-gray-600">Deine Daten sind sicher & werden nicht weitergegeben</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Brands Section */}
        <div className="mt-16 text-center">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-6">Diese Unternehmen vertrauen auf unsere Technologie</p>
          <div className="flex flex-wrap justify-center items-center gap-8 grayscale opacity-70">
            {['TechCrunch', 'Forbes', 'Wired', 'Bloomberg', 'The Verge'].map((brand, index) => (
              <motion.div 
                key={index} 
                className="text-xl font-bold text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
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