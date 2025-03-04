"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function AthlyFeatureSteps() {
  // Refs für Scroll-Animation
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Subtle parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Features mit Athly-Inhalten
  const features = [
    {
      step: "Dein KI-Coach",
      title: "Persönlicher KI-Coach",
      content: "Athly stellt dir einen persönlichen KI-Coach zur Verfügung, der dich rund um die Uhr begleitet. Er passt sich deinen Bedürfnissen an, motiviert dich und beantwortet all deine Fragen – genau wie ein echter Personal Trainer.",
      benefits: [
        "24/7 Verfügbarkeit",
        "Personalisierte Betreuung",
        "Sofortige Antworten auf alle Fitness-Fragen"
      ],
      image: "/api/placeholder/600/400?text=KI-Coach"
    },
    {
      step: "Adaptive Pläne",
      title: "Intelligente Trainingspläne", 
      content: "Deine Trainingspläne passen sich automatisch an deine Fortschritte, deinen Zeitplan und sogar deine Tagesform an. Mit Athly trainierst du immer optimal – selbst wenn unvorhergesehene Ereignisse deinen Alltag durcheinanderbringen.",
      benefits: [
        "Automatische Anpassung an deinen Fortschritt",
        "Berücksichtigung von Müdigkeit oder Zeitmangel",
        "Flexible Planung für deinen Lebensstil"
      ],
      image: "/api/placeholder/600/400?text=Adaptive-Trainingspläne"
    },
    {
      step: "Maßgeschneiderte Ernährung",
      title: "Personalisierte Ernährungspläne",
      content: "Vergiss starre Diätpläne und komplizierte Kalorienzählerei. Athly erstellt dir Ernährungspläne, die zu deinen Vorlieben, Allergien und Zielen passen. So isst du, was du magst, und erreichst trotzdem deine Ziele.",
      benefits: [
        "Individuelle Ernährungsempfehlungen",
        "Anpassung an Lebensmittelvorlieben",
        "Einfache Integration in deinen Alltag"
      ],
      image: "/api/placeholder/600/400?text=Ernährungspläne"
    },
    {
      step: "Kontinuierliche Motivation",
      title: "Nie wieder allein trainieren",
      content: "Dein Athly-Coach kennt deine Ziele und weiß, was dich motiviert. Er erkennt, wenn deine Motivation nachlässt, und findet genau die richtigen Worte, um dich wieder anzuspornen – genau dann, wenn du es am meisten brauchst.",
      benefits: [
        "Personalisierte Motivationstipps",
        "Erinnerungen zum richtigen Zeitpunkt",
        "Positive Verstärkung deiner Erfolge"
      ],
      image: "/api/placeholder/600/400?text=Motivation"
    }
  ];

  return (
    <div ref={containerRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Subtle background element with parallax */}
      <motion.div 
        className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{ y: bgY }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8AAE39" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span 
            className="inline-block text-[#8AAE39] font-medium mb-2 text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            FORTSCHRITTLICHE FUNKTIONEN
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Wie Athly dein Fitnesserlebnis transformiert
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Entdecke die einzigartigen Features, die Athly von herkömmlichen Fitness-Apps unterscheiden
          </motion.p>
        </div>

        {/* Features Steps Content */}
        <div className="space-y-24 md:space-y-32 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={cn(
                "grid md:grid-cols-2 gap-12 md:gap-16 items-center",
                index % 2 === 1 ? "md:grid-flow-dense" : ""
              )}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              {/* Image Column */}
              <div className={cn(index % 2 === 1 ? "md:col-start-1" : "")}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                  {/* Main Image */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                    <Image
                      src={feature.image}
                      alt={feature.title || feature.step}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                      width={600}
                      height={400}
                    />
                    
                    {/* Step Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-[#8AAE39] border border-[#8AAE39]/10 shadow-sm">
                      {feature.step}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Column */}
              <div className={cn("flex flex-col space-y-6", index % 2 === 1 ? "md:col-start-2" : "")}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {feature.content}
                  </p>
                </div>
                
                {/* Benefits List */}
                <div className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3 text-[#8AAE39]">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
                
                {/* Learn More Button */}
                <div className="pt-4">
                  <motion.button
                    className="group inline-flex items-center text-[#8AAE39] font-medium"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Mehr erfahren</span>
                    <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Final CTA */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Bereit für ein neues Fitnesserlebnis?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Starte noch heute mit deinem persönlichen KI-Coach und erlebe, wie Athly dein Training und deine Ernährung revolutioniert.
          </p>
          
          <motion.button
            className="bg-[#8AAE39] hover:bg-[#7a9c30] text-white rounded-lg px-8 py-3.5 font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center group mx-auto"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <span>Jetzt 14 Tage kostenlos testen</span>
            <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
          
          <p className="text-sm text-gray-500 mt-4">
            Keine Kreditkarte erforderlich. Jederzeit kündbar.
          </p>
        </motion.div>
      </div>
    </div>
  );
}