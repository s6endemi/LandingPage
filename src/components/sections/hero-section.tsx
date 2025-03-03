"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SparklesCore } from "@/components/aceternity/sparkles";
import { Globe } from "@/components/magicui/globe";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headlineRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Features mit Icons
  const features = [
    {
      title: "Kognitive Analyse",
      description: "Versteht deinen Kontext & Prioritäten",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Adaptive Intelligenz",
      description: "Lernt und wächst mit deinen Bedürfnissen",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
    {
      title: "Intuitive Integration",
      description: "Funktioniert nahtlos mit allen deinen Tools",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  // Animation für die Headline-Striche
  const strokeVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  // Animation für die Headline-Buchstaben
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.5
      }
    })
  };

  // Headline Text
  const headlineText = "SYNAPSE";
  const headlineLetters = headlineText.split("");

  return (
    <div className="relative min-h-screen overflow-hidden" ref={containerRef} id="hero">
      {/* Hintergrund mit subtilen Elementen */}

      {/* Subtile funkelnde Partikel */}
      <div className="absolute inset-0 opacity-40">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.2}
          maxSize={1.0}
          particleColor="#AAAAAA"
          particleDensity={30}
        />
      </div>

      <motion.div
        className="flex flex-col items-center justify-center px-4 py-24 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Linke Spalte: Text und CTA */}
            <motion.div
              className="lg:col-span-6 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Neue Premium Headline mit SVG Animation statt MorphingText */}
              <div className="mb-8 z-10 relative h-24" ref={headlineRef}>
                <div className="relative">
                  {/* SVG Hintergrund-Animation */}
                  <svg
                    className="absolute -top-6 -left-2 w-full h-40 opacity-50"
                    viewBox="0 0 300 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M10,50 C30,20 70,20 90,50 C110,80 150,80 170,50 C190,20 230,20 250,50 C270,80 310,80 330,50"
                      stroke="url(#gradient)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      variants={strokeVariants}
                      initial="hidden"
                      animate={controls}
                    />
                    <motion.path
                      d="M10,70 C50,40 90,100 130,70 C170,40 210,100 250,70 C290,40 330,100 370,70"
                      stroke="url(#gradient)"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      variants={strokeVariants}
                      initial="hidden"
                      animate={controls}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#888888" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#DDDDDD" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#888888" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Animierter Headline Text */}
                  <div className="relative flex justify-center lg:justify-start">
                    {headlineLetters.map((letter, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={letterVariants}
                        initial="hidden"
                        animate={controls}
                        className="text-5xl md:text-7xl font-bold tracking-tight [text-shadow:0_0_30px_rgba(180,180,220,0.3)] bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-400"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>

                  {/* Glänzender Unterstreifen */}
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-transparent via-zinc-400 to-transparent"
                    initial={{ width: 0, left: "50%" }}
                    animate={{ width: "100%", left: "0%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />

                  {/* Glanzpunkte */}
                  <motion.div
                    className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full opacity-0"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  />
                  <motion.div
                    className="absolute top-0 right-1/3 w-1 h-1 bg-white rounded-full opacity-0"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      delay: 1.5,
                      repeat: Infinity,
                      repeatDelay: 4
                    }}
                  />
                </div>
              </div>

              {/* Eleganter, statischer Untertitel */}
              <h2 className="text-xl md:text-2xl font-light mb-8 text-zinc-300">
                <span className="relative inline-block">
                  Intelligenz, die dich wirklich versteht
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-zinc-500/0 via-zinc-400/50 to-zinc-500/0"
                    initial={{ width: 0, left: "50%" }}
                    animate={{ width: "100%", left: "0%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </span>
              </h2>

              <p className="text-zinc-400 text-lg max-w-xl mx-auto lg:mx-0 mb-8">
                SYNAPSE erweitert deine kognitiven Fähigkeiten durch adaptive Intelligenz,
                die dich wirklich kennt. Erlebe, wie eine KI dich endlich <em>versteht</em> und
                proaktiv unterstützt – ohne dass du es erklären musst.
              </p>

              {/* Feature Liste */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/30 transition-colors duration-300 border border-transparent hover:border-zinc-800/50 group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-zinc-900/70 border border-zinc-800/50 rounded-full p-2 text-blue-400 group-hover:border-zinc-700 group-hover:text-blue-300 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-200 group-hover:text-zinc-100">{feature.title}</h3>
                      <p className="text-zinc-500 text-sm group-hover:text-zinc-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <ShimmerButton
                  className="rounded-full px-8 py-3.5 text-base font-semibold text-zinc-950 shadow-[0_0_20px_rgba(80,80,160,0.2)]"
                  shimmerColor="rgba(180, 180, 220, 0.5)"
                  shimmerDuration="2s"
                  background="linear-gradient(110deg, #D1D1D1, #EEEEEE, #A1A1A1)"
                >
                  Frühen Zugang sichern
                </ShimmerButton>

                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "rgba(180, 180, 220, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full px-8 py-3.5 text-base font-medium bg-transparent border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:shadow-[0_0_20px_rgba(80,80,160,0.15)] transition-all duration-300"
                >
                  Demo erleben
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Rechte Spalte: Visuelle Darstellung */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div
                className="relative aspect-square max-w-xl mx-auto rounded-2xl overflow-hidden border border-zinc-800/30 bg-gradient-to-b from-zinc-900/5 to-zinc-900/10 backdrop-blur-[2px] shadow-[0_0_35px_rgba(0,0,0,0.2)]"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <BorderBeam className="absolute inset-0 opacity-40" />

                {/* Interaktive Visualisierung mit 3D-Effekt */}
                                {/* Interaktive Visualisierung mit 3D-Effekt */}
                                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: isHovering ? 1.05 : 1,
                    rotateY: isHovering ? 5 : 0,
                    rotateX: isHovering ? -5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Subtle glow behind the globe */}
                    <div className="absolute w-2/3 h-2/3 rounded-full bg-blue-500/5 blur-2xl"></div>
                    
                    <Globe className="w-5/6 h-5/6 opacity-90 relative z-10" />

                    {/* Enhanced orbital rings with beaming effects */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotateZ: 360 }}
                      transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    >
                      {/* Outer orbit with animated gradient */}
                      <div className="absolute top-1/2 left-1/2 w-[75%] h-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
                        <div className="absolute inset-0 border border-zinc-700/30 rounded-full"></div>
                        
                        {/* Animated beam along the path */}
                        <motion.div 
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400/70 rounded-full shadow-[0_0_10px_3px_rgba(120,170,255,0.4)]"
                          animate={{ 
                            rotate: 360
                          }}
                          transition={{ 
                            duration: 8, 
                            repeat: Infinity, 
                            ease: "linear" 
                          }}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotateZ: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    >
                      {/* Inner orbit with animated gradient */}
                      <div className="absolute top-1/2 left-1/2 w-[90%] h-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
                        <div className="absolute inset-0 border border-zinc-700/20 rounded-full"></div>
                        
                        {/* Animated beam along the path */}
                        <motion.div 
                          className="absolute top-0 right-1/2 translate-x-1/2 w-1 h-1 bg-indigo-400/70 rounded-full shadow-[0_0_10px_3px_rgba(130,130,255,0.4)]"
                          animate={{ 
                            rotate: -360
                          }}
                          transition={{ 
                            duration: 12, 
                            repeat: Infinity, 
                            ease: "linear" 
                          }}
                        />
                      </div>
                    </motion.div>
                    
                    {/* Additional diagonal orbit for more dynamic look */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotateZ: 180 }}
                      transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                      style={{ transform: "rotateX(60deg)" }}
                    >
                      <div className="absolute top-1/2 left-1/2 w-[65%] h-[65%] -translate-x-1/2 -translate-y-1/2 border border-zinc-700/15 rounded-full"></div>
                      
                      {/* Animated beam along the diagonal path */}
                      <motion.div 
                        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-400/70 rounded-full shadow-[0_0_10px_3px_rgba(150,120,230,0.4)]"
                        animate={{ 
                          rotate: 360
                        }}
                        transition={{ 
                          duration: 15, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                      />
                    </motion.div>

                    {/* Premium Pulsierende Punkte with enhanced glow */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-zinc-300/70 shadow-[0_0_8px_2px_rgba(180,180,220,0.3)]"
                        initial={{
                          x: Math.random() * 300 - 150,
                          y: Math.random() * 300 - 150,
                        }}
                        animate={{
                          x: Math.random() * 300 - 150,
                          y: Math.random() * 300 - 150,
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.7, 1.3, 0.7],
                        }}
                        transition={{
                          duration: 5 + Math.random() * 10,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    ))}
                    
                    {/* Enhanced beam rays from center */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 origin-center h-0.5 bg-gradient-to-r from-blue-400/40 to-transparent"
                        style={{ 
                          width: '30%', 
                          rotate: `${i * 45}deg`,
                          translateX: '-50%',
                          translateY: '-50%'
                        }}
                        animate={{
                          opacity: [0.1, 0.3, 0.1],
                          width: ['30%', '35%', '30%']
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 0.4,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    ))}
                    
                    {/* Enhanced central pulse */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-800/50 backdrop-blur-sm rounded-full flex items-center justify-center z-10"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(120, 150, 220, 0)",
                          "0 0 0 12px rgba(120, 150, 220, 0.15)",
                          "0 0 0 25px rgba(120, 150, 220, 0)",
                        ]
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    >
                      <motion.div 
                        className="w-4 h-4 rounded-full bg-gradient-to-b from-blue-400 to-indigo-600 shadow-[0_0_10px_2px_rgba(130,150,255,0.5)]"
                        animate={{ 
                          opacity: [0.7, 1, 0.7],
                          scale: [0.9, 1.1, 0.9] 
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Statistiken unten */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {[
            { value: "97%", label: "Erkennungsrate" },
            { value: "3.4x", label: "Produktivitätssteigerung" },
            { value: "<10ms", label: "Reaktionszeit" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400 mb-1 relative"
                whileHover={{ scale: 1.05 }}
              >
                {stat.value}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-zinc-400/50 to-transparent"
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div className="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll-Indikator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-zinc-500"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0]
        }}
        transition={{
          opacity: { delay: 1.5, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
      >
        <span className="text-xs mb-2">Mehr entdecken</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
}