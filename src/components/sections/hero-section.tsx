"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Particles } from "@/components/magicui/particles";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  
  // Parallax scroll effect (subtler)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  
  // Optimized benefits with clearer WHO/WHY focus
  const benefits = [
    {
      title: "Individuelle Betreuung",
      description: "Schluss mit generischen Trainingsplänen, die nicht zu dir passen",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Echte Anpassung",
      description: "Dein Plan entwickelt sich, wenn du dich entwickelst – wie ein echter Trainer",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18H21M3 12H21M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Motivation, die wirkt",
      description: "24/7 Unterstützung genau dann, wenn du sie am meisten brauchst",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14V16M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden py-12"
    >
      {/* Very subtle particles background */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <Particles
          className="h-full w-full"
          quantity={50}
          color="#8AAE39"
          size={1}
        />
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Content Column */}
        <div className="flex-1 text-center lg:text-left z-10">
          {/* Subtle logo animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <svg 
              className="w-12 h-12 mx-auto lg:mx-0"
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M50 5L90 80H75L50 30L25 80H10L50 5Z" 
                fill="#8AAE39" 
              />
              <path 
                d="M25 80H75H90L75 100H25L10 80H25Z" 
                fill="#8AAE39" 
              />
            </svg>
          </motion.div>

          {/* Headline with WHO/WHY/WHAT framework */}
          <div className="mb-5">
            <motion.h1 
              className="font-manrope text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Für Fitness-Enthusiasten, die<br />
              <span className="text-[#8AAE39] relative inline-block">
                mehr als eine App wollen
                {/* Elegante Unterstreichung mit Animation */}
                <motion.div 
                  className="absolute bottom-2 left-0 h-[3px] bg-[#8AAE39]/20"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
                ></motion.div>
              </span>
            </motion.h1>
          </div>
          
          {/* Subheadline with clearer WHY focus */}
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Dein KI-Fitness-Coach trainiert dich persönlich, adaptiv und rund um die Uhr – genau wie ein echter Personal Trainer, nur ohne die hohen Kosten.
          </motion.p>
          
          {/* Benefits List with subtle hover */}
          <div className="mb-10 space-y-5 max-w-lg mx-auto lg:mx-0">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                className={`flex items-start p-2 rounded-lg transition-all duration-300
                  ${hoveredBenefit === index ? 'bg-white/30' : 'bg-transparent'}`}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div className={`flex-shrink-0 p-2 rounded-full mr-3 transition-colors duration-300
                  ${hoveredBenefit === index ? 'bg-[#8AAE39]/10 text-[#8AAE39]' : 'text-gray-500'}`}>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 text-base">{benefit.title}</h3>
                  <p className="text-gray-600 mt-1 text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Buttons with benefit-driven primary CTA */}
          <motion.div 
            className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button
              className="relative bg-[#8AAE39] text-white rounded-lg px-6 py-3 font-medium shadow-sm hover:shadow-md hover:bg-[#8AAE39]/90 transition-all duration-300 overflow-hidden group"
            >
              {/* Subtle shine effect */}
              <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              <span className="flex items-center">
                Deinen persönlichen Coach sichern
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
            
            <button className="bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 text-gray-700 rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:text-[#8AAE39] hover:border-[#8AAE39]/30">
              Wie es funktioniert
            </button>
          </motion.div>
          
          {/* Trust Indicators with subtle animation */}
          <motion.div 
            className="mt-14 flex flex-wrap justify-center lg:justify-start items-center gap-8 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { value: "30+", label: "aktive Tester" },
              { value: "9,99€", label: "pro Monat" },
              { value: "24/7", label: "Verfügbarkeit" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-semibold text-[#8AAE39] text-lg">{item.value}</span> 
                <span className="text-gray-600">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Image/Device Column with subtle parallax */}
        <motion.div 
          className="flex-1 z-10"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative mx-auto max-w-[300px]">
            {/* Very subtle glow behind the phone */}
            <div className="absolute inset-0 -z-10 blur-3xl rounded-full bg-[#8AAE39]/5 animate-pulse" 
                style={{ animationDuration: '10s' }}></div>
            
            {/* Simplified iPhone Mockup */}
            <div className="relative rounded-[40px] border-[14px] border-[#111] bg-[#111] shadow-md">
              {/* Empty Screen Content */}
              <div className="relative overflow-hidden rounded-[26px] bg-[#f4f2ec] h-[520px]">
                {/* Notch */}
                <div className="absolute left-1/2 top-0 h-7 w-1/2 -translate-x-1/2 rounded-b-3xl bg-[#111]"></div>
                
                {/* Empty Screen with subtle gradient */}
                <div className="h-full w-full bg-gradient-to-b from-[#f8f6f0] to-[#f4f2ec]">
                  {/* App Bar with subtle gradient */}
                  <div className="h-16 bg-gradient-to-r from-[#8AAE39] to-[#9abe4a] px-4 flex items-center">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 5L90 80H75L50 30L25 80H10L50 5Z" stroke="white" strokeWidth="3" />
                        <path d="M25 80H75H90L75 100H25L10 80H25Z" stroke="white" strokeWidth="3" />
                      </svg>
                      <span className="ml-2 text-white font-medium text-sm">Athly</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subtle floating tags */}
            <motion.div
              className="absolute -right-4 top-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm px-3 py-2 text-xs border border-gray-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[#8AAE39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-gray-700">24/7 Verfügbar</span>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -left-4 bottom-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm px-3 py-2 text-xs border border-gray-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[#8AAE39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-medium text-gray-700">Personalisiert für dich</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}