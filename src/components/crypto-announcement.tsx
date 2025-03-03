"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SparklesCore } from "@/components/aceternity/sparkles";
import { X as XIcon, Sparkles, TrendingUp, ExternalLink } from "lucide-react";

export function CryptoAnnouncement() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  
  // Verzögertes Einblenden für dramatischen Effekt nach dem Laden
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Lokaler Storage für das Schließen
  useEffect(() => {
    const announcementDismissed = localStorage.getItem("syn-announcement-dismissed");
    if (announcementDismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("syn-announcement-dismissed", "true");
  };

  // Text-Einblendungseffekt
  const words = ["JUST", "LAUNCHED:"];
  
  // Varianten für animierte Elemente
  const containerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.8,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transition: { duration: 0.4 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-[70px] sm:top-16 left-0 right-0 w-full z-40 overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div 
            className="relative py-4 px-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Premium Glass Effect Background with depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70 backdrop-blur-md z-0">
              <motion.div 
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: isHovered ? 0.5 : 0.3,
                }}
                transition={{ duration: 0.8 }}
              >
                <BorderBeam className="absolute inset-0 opacity-30" />
              </motion.div>
              
              {/* Animated Gradient Background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-violet-900/5 to-indigo-900/5"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                  opacity: isHovered ? 0.8 : 0.3
                }}
                transition={{ 
                  backgroundPosition: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  opacity: { duration: 0.5 }
                }}
                style={{ backgroundSize: '200% 100%' }}
              />
              
              {/* Premium Sparkles with increased density on hover */}
              <motion.div 
                className="absolute inset-0"
                animate={{ 
                  opacity: isHovered ? 0.5 : 0.3
                }}
                transition={{ duration: 0.5 }}
              >
                <SparklesCore
                  id="announcement-sparkles"
                  background="transparent"
                  minSize={0.2}
                  maxSize={0.6}
                  particleColor={isHovered ? "#BBBBFF" : "#AAAAAA"}
                  particleDensity={isHovered ? 25 : 15}
                />
              </motion.div>
            </div>
            
            {/* Container für den Inhalt */}
            <div className="container mx-auto relative z-10">
              <div className="flex items-center justify-between">
                {/* Linke Seite - Logo & Text */}
                <div className="flex items-center space-x-6">
                  {/* Enhanced Coin-Symbol mit 3D-Effekt */}
                  <motion.div 
                    className="relative group/token"
                    variants={itemVariants}
                  >
                    {/* Hintergrund-Glow */}
                    <motion.div
                      className="absolute -inset-3 rounded-full opacity-0 group-hover/token:opacity-100 bg-gradient-to-r from-blue-500/20 via-violet-500/30 to-indigo-500/20 blur-lg transition-opacity duration-700"
                    />
                    
                    {/* Pulsierende Ringe */}
                    <motion.div
                      className="absolute -inset-2 rounded-full border border-blue-400/20"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 0.2, 0.6]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <motion.div
                      className="absolute -inset-3 rounded-full border border-indigo-400/10"
                      animate={{ 
                        scale: [1.1, 1.3, 1.1],
                        opacity: [0.4, 0.1, 0.4]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                    
                    {/* Token Emblem */}
                    <motion.div
                      className="relative h-10 w-10 rounded-full shadow-[0_0_15px_rgba(90,120,250,0.3)] overflow-hidden"
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0 0 25px rgba(90,120,250,0.5)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {/* Token Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-violet-700">
                        {/* Subtle background pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <svg width="100%" height="100%" className="opacity-20">
                            <defs>
                              <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Glanzeffekt */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
                        animate={{
                          rotate: [0, 360],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                          rotate: { repeat: Infinity, duration: 10, ease: "linear" },
                          opacity: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                        }}
                      />
                      
                      {/* Symbol */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="flex items-center"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                        >
                          <span className="text-sm font-bold text-white flex items-center">
                            <Sparkles className="w-3 h-3 mr-0.5" />
                            SYN
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Enhanced Announcement Text mit Animation */}
                  <div className="text-sm md:text-base">
                    <div className="flex flex-wrap items-center gap-x-2">
                      {/* Animated Label */}
                      <motion.div 
                        className="flex items-center space-x-1"
                        variants={itemVariants}
                      >
                        {words.map((word, i) => (
                          <motion.span
                            key={`word-${i}`}
                            className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-blue-300"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{
                              opacity: { duration: 0.4, delay: 0.3 + 0.1 * i },
                              y: { duration: 0.4, delay: 0.4 + 0.1 * i },
                              backgroundPosition: { 
                                duration: 6, 
                                repeat: Infinity, 
                                ease: "linear" 
                              }
                            }}
                            style={{ backgroundSize: '200% 100%' }}
                          >
                            {word}{" "}
                          </motion.span>
                        ))}
                      </motion.div>
                      
                      {/* Main Message with Trend Icon */}
                      <motion.div 
                        className="flex items-center"
                        variants={itemVariants}
                      >
                        <motion.span 
                          className="text-zinc-100 flex items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        >
                          SYNAPSE Token ($SYN) ist jetzt auf CoinMarket verfügbar
                          <motion.span
                            className="inline-flex ml-2 text-green-400"
                            animate={{ 
                              y: [0, -3, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3
                            }}
                          >
                            <TrendingUp className="h-4 w-4" />
                          </motion.span>
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Rechte Seite - CTA Button & Dismiss */}
                <div className="flex items-center space-x-3">
                  {/* Enhanced CTA Button mit Animated Glow */}
                  <motion.a
                    href="#"
                    className="hidden sm:flex relative px-5 py-2 rounded-full text-sm text-white overflow-hidden"
                    variants={itemVariants}
                    onMouseEnter={() => setIsCtaHovered(true)}
                    onMouseLeave={() => setIsCtaHovered(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Button Background with Animated Gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{ backgroundSize: '200% 100%' }}
                    />
                    
                    {/* Glow Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-indigo-400/30 to-blue-400/0"
                      initial={{ opacity: 0, x: '-100%' }}
                      animate={{ 
                        opacity: isCtaHovered ? 1 : 0, 
                        x: isCtaHovered ? '100%' : '-100%' 
                      }}
                      transition={{
                        opacity: { duration: 0.2 },
                        x: { duration: 0.8 }
                      }}
                    />
                    
                    {/* Button Content */}
                    <motion.span 
                      className="relative z-10 flex items-center font-medium"
                      animate={{
                        textShadow: isCtaHovered ? '0 0 8px rgba(255,255,255,0.5)' : '0 0 0px transparent',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>Token kaufen</span>
                      <motion.span
                        animate={{ x: isCtaHovered ? 4 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      >
                        <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
                      </motion.span>
                    </motion.span>
                  </motion.a>
                  
                  {/* Enhanced Dismiss Button with Elegant Animation */}
                  <motion.button
                    variants={itemVariants}
                    className="text-zinc-400 hover:text-white transition-colors p-1 rounded-full hover:bg-zinc-800/40"
                    onClick={handleDismiss}
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    aria-label="Dismiss announcement"
                  >
                    <XIcon className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Animated Bottom Light Bar with Enhanced Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
                animate={{
                  left: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"
                animate={{
                  left: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}