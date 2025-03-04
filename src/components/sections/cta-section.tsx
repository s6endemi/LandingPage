"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Particles } from "@/components/magicui/particles";

export function FinalCtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Subtle parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  
  // Features für die zusammenfassende Liste
  const keyBenefits = [
    {
      title: "Persönlicher KI-Coach",
      description: "24/7 verfügbar für Fragen, Motivation & Trainingsanpassungen",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Personalisiertes Training",
      description: "Intelligente Anpassung an deine Fortschritte, Limitationen & Zeitplan",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Kontinuierliche Motivation",
      description: "Bleibe motiviert mit personalisierten Anreizen & Erfolgserlebnissen",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 10H20V12H13.5V10ZM13.5 15H20V17H13.5V15ZM13.5 5H20V7H13.5V5ZM8 5H10V7H8V5ZM8 10H10V12H8V10ZM8 15H10V17H8V15ZM4.5 5H6.5V7H4.5V5ZM4.5 10H6.5V12H4.5V10ZM4.5 15H6.5V17H4.5V15Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Maßgeschneiderte Ernährung",
      description: "Ernährungspläne angepasst an deine Vorlieben, Allergien & Ziele",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9ZM16 6V14H18.5V22H21V2C18.24 2 16 4.24 16 6Z" fill="currentColor"/>
        </svg>
      )
    }
  ];

  // Preis-Tiers
  const pricingOptions = [
    {
      name: "Früher Zugang",
      price: "9,99€",
      period: "pro Monat",
      features: [
        "Persönlicher KI-Coach",
        "Unbegrenzte Trainingspläne",
        "Anpassbare Ernährungspläne",
        "24/7 Unterstützung",
        "30 Tage Geld-zurück-Garantie"
      ],
      cta: "Jetzt starten",
      highlighted: true
    },
    {
      name: "Jährliches Abo",
      price: "7,99€",
      period: "pro Monat, jährlich gezahlt",
      features: [
        "Alle Features des monatlichen Plans",
        "2 Monate gratis",
        "Erweiterte Statistiken",
        "Vorrangiger Support",
        "Demnächst verfügbar"
      ],
      cta: "Bald erhältlich",
      highlighted: false,
      disabled: true
    }
  ];

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Subtle particle background */}
      <div className="absolute inset-0 -z-10">
        <Particles
          className="h-full w-full"
          quantity={40}
          color="#8AAE39"
          size={1}
        />
      </div>
      
      <div className="container mx-auto px-4">
        {/* Headline and Subheadline */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Erlebe deine Fitness-Transformation mit Athly
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Dein persönlicher KI-Coach unterstützt dich auf jedem Schritt deiner Fitness-Reise, 
            egal wo du gerade stehst.
          </motion.p>
        </div>
        
        {/* Image with Key Benefits */}
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto mb-20">
          {/* Image Side with Parallax */}
          <motion.div 
            className="relative"
            style={{ y: y1 }}
          >
            <div className="relative mx-auto max-w-[300px]">
              {/* Glow behind the phone */}
              <div className="absolute inset-0 -z-10 blur-3xl rounded-full bg-[#8AAE39]/5 animate-pulse" 
                  style={{ animationDuration: '10s' }}></div>
              
              {/* Phone Mockup */}
              <div className="relative rounded-[40px] border-[14px] border-[#111] bg-[#111] shadow-lg">
                {/* Screen Content */}
                <div className="relative overflow-hidden rounded-[26px] bg-[#f4f2ec] h-[520px]">
                  {/* Notch */}
                  <div className="absolute left-1/2 top-0 h-7 w-1/2 -translate-x-1/2 rounded-b-3xl bg-[#111]"></div>
                  
                  {/* App Interface Mockup */}
                  <div className="h-full w-full bg-gradient-to-b from-[#f8f6f0] to-[#f4f2ec]">
                    {/* App Bar */}
                    <div className="h-16 bg-gradient-to-r from-[#8AAE39] to-[#9abe4a] px-4 flex items-center">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M50 5L90 80H75L50 30L25 80H10L50 5Z" stroke="white" strokeWidth="3" />
                          <path d="M25 80H75H90L75 100H25L10 80H25Z" stroke="white" strokeWidth="3" />
                        </svg>
                        <span className="ml-2 text-white font-medium text-sm">Athly</span>
                      </div>
                    </div>
                    
                    {/* Chat Interface */}
                    <div className="p-4">
                      {/* AI Coach Message */}
                      <div className="flex mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#8AAE39] flex items-center justify-center text-white font-bold text-sm mr-2 flex-shrink-0">A</div>
                        <div className="max-w-[80%] bg-gray-100 rounded-lg rounded-tl-none p-3 shadow-sm">
                          <p className="text-sm">Guten Morgen! Basierend auf deinem Feedback von gestern habe ich deinen Trainingsplan für heute angepasst. Wie fühlst du dich?</p>
                        </div>
                      </div>
                      
                      {/* User Response */}
                      <div className="flex justify-end mb-4">
                        <div className="max-w-[80%] bg-[#8AAE39]/10 rounded-lg rounded-tr-none p-3">
                          <p className="text-sm">Etwas müde heute. Hatte gestern einen langen Arbeitstag.</p>
                        </div>
                      </div>
                      
                      {/* AI Coach Response */}
                      <div className="flex mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#8AAE39] flex items-center justify-center text-white font-bold text-sm mr-2 flex-shrink-0">A</div>
                        <div className="max-w-[80%] bg-gray-100 rounded-lg rounded-tl-none p-3 shadow-sm">
                          <p className="text-sm">Kein Problem! Ich habe ein leichteres Workout für dich vorbereitet, das trotzdem effektiv ist. Außerdem eine kurze Meditation, um deinen Stress zu reduzieren.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -right-4 top-5 bg-white rounded-lg shadow-sm px-3 py-2 text-xs border border-gray-200"
                style={{ y: y2 }}
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-[#8AAE39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium text-gray-700">Adaptive Trainingsanpassung</span>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -left-4 bottom-5 bg-white rounded-lg shadow-sm px-3 py-2 text-xs border border-gray-200"
                style={{ y: y3 }}
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-[#8AAE39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-700">Persönlicher Trainingsplan</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Key Benefits List */}
          <div>
            <div className="space-y-6">
              {keyBenefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 mt-1 bg-[#8AAE39]/10 p-3 rounded-full text-[#8AAE39] mr-4">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* CTA Button */}
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button className="bg-[#8AAE39] hover:bg-[#7a9c30] text-white rounded-lg px-8 py-3.5 font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center group">
                <span>Werde Teil von Athly</span>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <p className="text-sm text-gray-500 mt-3">Kostenlose Testphase. Keine Kreditkarte erforderlich.</p>
            </motion.div>
          </div>
        </div>
        
        {/* Pricing Section */}
        <div className="max-w-5xl mx-auto">
          <motion.h3 
            className="text-2xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Starte jetzt zu einem unschlagbaren Preis
          </motion.h3>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {pricingOptions.map((option, index) => (
              <motion.div 
                key={index}
                className={`relative rounded-xl overflow-hidden ${option.highlighted ? 'border-2 border-[#8AAE39]' : 'border border-gray-200'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={option.disabled ? {} : { y: -5, boxShadow: "0 10px 30px rgba(138, 174, 57, 0.15)" }}
              >
                {option.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-[#8AAE39] text-white text-center text-sm py-1 font-medium">
                    Empfohlen
                  </div>
                )}
                
                <div className={`p-8 ${option.highlighted ? 'pt-10' : ''} ${option.disabled ? 'opacity-75' : ''}`}>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h4>
                  <div className="flex items-baseline mb-6">
                    <span className="text-3xl font-bold text-gray-900">{option.price}</span>
                    <span className="text-gray-600 ml-2">{option.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-[#8AAE39] mr-3 mt-0.5" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12L11 14L15 10M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                      option.disabled 
                        ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                        : 'bg-[#8AAE39] text-white hover:bg-[#7a9c30] transition-colors shadow-sm'
                    }`}
                    disabled={option.disabled}
                  >
                    <span>{option.cta}</span>
                    {!option.disabled && (
                      <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Final Guarantee Message */}
          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="flex items-center justify-center text-gray-600">
              <svg className="w-5 h-5 text-[#8AAE39] mr-2" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>30 Tage Geld-zurück-Garantie, wenn du nicht völlig zufrieden bist</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}