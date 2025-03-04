"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Particles } from "@/components/magicui/particles";

export function ProfessionalHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Subtiler Parallax-Effekt
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  
  // Kernvorteile mit eleganten Icons
  const keyBenefits = [
    {
      title: "Persönlicher KI-Coach",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Intelligente Anpassung",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Personalisierte Ernährung",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9ZM16 6V14H18.5V22H21V2C18.24 2 16 4.24 16 6Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "24/7 Motivation",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 10H20V12H13.5V10ZM13.5 15H20V17H13.5V15ZM13.5 5H20V7H13.5V5ZM8 5H10V7H8V5ZM8 10H10V12H8V10ZM8 15H10V17H8V15ZM4.5 5H6.5V7H4.5V5ZM4.5 10H6.5V12H4.5V10ZM4.5 15H6.5V17H4.5V15Z" fill="currentColor"/>
        </svg>
      )
    }
  ];

  return (
    <div 
      id="hero" 
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden"
    >
      {/* Subtiler Partikel-Hintergrund */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <Particles
          className="h-full w-full"
          quantity={40}
          color="#8AAE39"
          size={1}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Content-Spalte */}
          <div className="lg:col-span-6 z-10 text-center lg:text-left">
            {/* Logo Animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 hidden lg:block"
            >
              <svg 
                className="w-12 h-12"
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

            {/* Headline mit WHO/WHY/WHAT Framework */}
            <motion.h1 
              className="font-manrope text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Für Fitness-Enthusiasten, die 
              <span className="text-[#8AAE39] relative block mt-1">
                mehr als eine App wollen
                {/* Elegante Unterstreichung */}
                <motion.div 
                  className="absolute bottom-2 left-0 h-[3px] bg-[#8AAE39]/20"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
                ></motion.div>
              </span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Dein KI-Fitness-Coach trainiert dich persönlich, adaptiv und rund um die Uhr – genau wie ein echter Personal Trainer, nur ohne die hohen Kosten.
            </motion.p>
            
            {/* Key Benefits - Minimalistisch und elegant */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {keyBenefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#8AAE39]/10 text-[#8AAE39] mr-3">
                    {benefit.icon}
                  </div>
                  <p className="font-medium text-gray-800">{benefit.title}</p>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <button
                className="relative bg-[#8AAE39] text-white rounded-lg px-6 py-3.5 font-medium shadow-sm hover:shadow-md hover:bg-[#8AAE39]/90 transition-all duration-300 overflow-hidden group"
              >
                {/* Subtiler Shine-Effekt */}
                <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                <span className="flex items-center">
                  Deinen persönlichen Coach sichern
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
              
              <button className="bg-white hover:bg-white border border-gray-200 text-gray-700 rounded-lg px-6 py-3.5 font-medium transition-all duration-300 hover:text-[#8AAE39] hover:border-[#8AAE39]/30 hover:shadow-sm">
                Wie es funktioniert
              </button>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div 
              className="mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-8 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
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
          
          {/* Phone Image - Elegant und minimalistisch */}
          <div className="lg:col-span-6">
            <motion.div 
              className="relative mx-auto max-w-[340px]"
              style={{ y }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Subtiler Glow-Effekt */}
              <div className="absolute inset-0 -z-10 blur-3xl rounded-full bg-[#8AAE39]/5 animate-pulse" 
                  style={{ animationDuration: '10s' }}></div>
              
              {/* Eleganter Smartphone Mockup */}
              <div className="relative rounded-[40px] border-[14px] border-[#111] bg-[#111] shadow-lg">
                <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-b from-[#f8f6f0] to-[#f4f2ec] h-[570px]">
                  {/* Notch */}
                  <div className="absolute left-1/2 top-0 h-7 w-1/2 -translate-x-1/2 rounded-b-3xl bg-[#111] z-20"></div>
                  
                  {/* App Interface */}
                  <div className="h-full w-full">
                    {/* App Bar */}
                    <div className="h-16 bg-gradient-to-r from-[#8AAE39] to-[#9abe4a] px-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M50 5L90 80H75L50 30L25 80H10L50 5Z" stroke="white" strokeWidth="3" />
                          <path d="M25 80H75H90L75 100H25L10 80H25Z" stroke="white" strokeWidth="3" />
                        </svg>
                        <span className="ml-2 text-white font-medium text-sm">Athly</span>
                      </div>
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </div>
                    
                    {/* Simplified App Content */}
                    <div className="p-6">
                      <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Dein heutiger Plan</h3>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-[#8AAE39]/10 flex items-center justify-center text-[#8AAE39]">
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3V21M3 12H21" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-800">Oberkörper Training</p>
                              <p className="text-xs text-gray-500">Angepasst für deine Ziele</p>
                            </div>
                          </div>
                          <div className="text-[#8AAE39] text-sm font-medium">18:00</div>
                        </div>
                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-[#8AAE39] rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#8AAE39]/10 flex items-center justify-center text-[#8AAE39] mb-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9ZM16 6V14H18.5V22H21V2C18.24 2 16 4.24 16 6Z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-gray-800">Ernährung</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#8AAE39]/10 flex items-center justify-center text-[#8AAE39] mb-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.84 4.22a5.5 5.5 0 0 0-7.78 0L12 5.29l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.07L12 21l7.78-7.93 1.06-1.07a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-gray-800">Motivation</p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-medium text-gray-800">Wöchentlicher Fortschritt</h3>
                          <div className="text-[#8AAE39] text-sm font-medium">+12%</div>
                        </div>
                        <div className="flex items-end h-24 gap-2">
                          {[35, 45, 60, 40, 75, 65, 50].map((height, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-[#8AAE39]/20 rounded-t-sm"
                                style={{ height: `${height}%` }}
                              ></div>
                              <div className="text-xs text-gray-500 mt-1">
                                {['M', 'D', 'M', 'D', 'F', 'S', 'S'][index]}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Tags */}
              <motion.div
                className="absolute -right-4 top-12 bg-white rounded-lg shadow-sm px-3 py-2 text-xs border border-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-[#8AAE39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium text-gray-700">Intelligent & Personalisiert</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}