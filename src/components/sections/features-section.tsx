"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AthlyFeatureSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax-Effekt für App-Screenshots
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  // Athly's Kernfunktionen
  const features = [
    {
      id: "ai-coach",
      title: "Persönlicher KI-Coach",
      description: "Dein digitaler Coach lernt dich kennen, motiviert dich und passt sich deinen Bedürfnissen an – rund um die Uhr verfügbar.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
        </svg>
      ),
      benefits: ["24/7 Verfügbarkeit", "Lernt aus deinen Gewohnheiten", "Passt sich deiner Tagesform an"],
      screenshot: "/api/placeholder/280/500?text=AI_Coach_Screen"
    },
    {
      id: "smart-plan",
      title: "Intelligente Trainingspläne",
      description: "Dynamische Pläne, die sich deinem Fortschritt, deiner Verfügbarkeit und deinen Zielen automatisch anpassen.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="currentColor"/>
        </svg>
      ),
      benefits: ["Personalisierte Übungen", "Adaptive Schwierigkeitsgrade", "Optimale Progression"],
      screenshot: "/api/placeholder/280/500?text=Smart_Plan_Screen"
    },
    {
      id: "nutrition",
      title: "Maßgeschneiderte Ernährung",
      description: "Ernährungspläne, die zu deinen Trainingszielen passen und deine persönlichen Vorlieben, Allergien und Einschränkungen berücksichtigen.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9ZM16 6V14H18.5V22H21V2C18.24 2 16 4.24 16 6Z" fill="currentColor"/>
        </svg>
      ),
      benefits: ["Deinen Vorlieben angepasst", "Realistische Essgewohnheiten", "Ausgewogene Makros"],
      screenshot: "/api/placeholder/280/500?text=Nutrition_Screen"
    },
    {
      id: "progress",
      title: "Fortschrittsanalyse",
      description: "Visuelle Auswertungen deiner Entwicklung, Erfolgsmetriken und personalisierte Meilensteine, die dich motivieren weiterzumachen.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V7H9V17ZM13 17H11V11H13V17ZM17 17H15V14H17V17Z" fill="currentColor"/>
        </svg>
      ),
      benefits: ["Datengetriebene Einsichten", "Visuelle Fortschrittsgrafiken", "Motivierende Meilensteine"],
      screenshot: "/api/placeholder/280/500?text=Progress_Screen"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative bg-white overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-[#8AAE39]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] rounded-full bg-[#8AAE39]/5 blur-3xl" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div 
            className="inline-block bg-[#8AAE39]/10 text-[#8AAE39] text-sm font-medium px-5 py-2 rounded-full mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            WARUM ATHLY
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Dein persönlicher KI-Coach<br />
            <span className="text-[#8AAE39]">immer dabei</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Athly vereint die Expertise eines persönlichen Trainers mit der Flexibilität einer App – 
            für einen Bruchteil der Kosten.
          </motion.p>
        </div>
        
        {/* Interactive Feature Showcase */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-7 gap-8">
            {/* Feature Tabs - Left Side */}
            <div className="md:col-span-3 space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? "bg-white shadow-lg border-l-4 border-[#8AAE39]" 
                      : "bg-white/60 hover:bg-white hover:shadow-md"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start">
                    {/* Icon */}
                    <div className={`p-3 rounded-lg ${
                      activeFeature === index 
                        ? "bg-[#8AAE39] text-white" 
                        : "bg-[#8AAE39]/10 text-[#8AAE39]"
                    } mr-4 transition-colors duration-300`}>
                      {feature.icon}
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
                    </div>
                  </div>
                  
                  {/* Feature Benefits - Only Show for Active Feature in Mobile */}
                  <AnimatedBenefitsList 
                    benefits={feature.benefits} 
                    isActive={activeFeature === index} 
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Feature Visualization - Right Side */}
            <div className="md:col-span-4 relative flex items-center justify-center">
              <div className="relative h-[600px]">
                {/* Phone Frame */}
                <motion.div 
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Phone Bezel */}
                  <div className="rounded-[40px] border-[14px] border-gray-900 overflow-hidden shadow-xl">
                    {/* Screen Content */}
                    <div className="bg-white aspect-[9/19.5] relative overflow-hidden">
                      {/* Dynamic Screenshot Based on Active Feature */}
                      <AnimatedAppScreens 
                        features={features} 
                        activeIndex={activeFeature} 
                      />
                      
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-7 bg-gray-900 rounded-b-xl z-50"></div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute top-1/4 -right-6 bg-white rounded-xl shadow-lg px-4 py-3 z-10 max-w-[180px]"
                  style={{ y: y1 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center text-sm font-medium text-[#8AAE39]">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                    </svg>
                    <span>Heute 3 von 4 Zielen erreicht</span>
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute bottom-1/4 -left-6 bg-white rounded-xl shadow-lg px-4 py-3 z-10 max-w-[180px]"
                  style={{ y: y2 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div className="flex items-center text-sm font-medium text-gray-800">
                    <svg className="w-4 h-4 mr-2 text-[#8AAE39]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM13 14H11V12H13V14ZM13 10H11V6H13V10Z" />
                    </svg>
                    <span>Dein Coach hat eine Nachricht</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Core Benefits Summary */}
        <div className="max-w-5xl mx-auto mt-20">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Personalisierung",
                description: "Trainings- und Ernährungspläne, die sich deinen Zielen, Vorlieben und Fortschritten anpassen.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
                  </svg>
                )
              },
              {
                title: "Echte Betreuung",
                description: "Dein KI-Coach lernt dich kennen, motiviert dich und passt deine Pläne an deine tägliche Form an.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" />
                  </svg>
                )
              },
              {
                title: "Datengetriebene Erfolge",
                description: "Erreiche messbare Ergebnisse durch kontinuierliche Analyse und Optimierung deines Trainings.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V7H9V17ZM13 17H11V11H13V17ZM17 17H15V14H17V17Z" />
                  </svg>
                )
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                whileHover={{ y: -5, backgroundColor: "white", boxShadow: "0 10px 25px rgba(138, 174, 57, 0.1)" }}
              >
                <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center text-[#8AAE39] mb-5">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        

      </div>
    </section>
  );
}

// Animated Benefits List Component
const AnimatedBenefitsList = ({ benefits, isActive }) => {
  return (
    <div className={`mt-4 pl-14 space-y-2 transition-all duration-300 ${isActive ? "block md:block" : "hidden md:block"}`}>
      {benefits.map((benefit, idx) => (
        <motion.div 
          key={idx}
          className="flex items-center"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isActive ? 1 : 0.7, x: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
        >
          <svg className="w-4 h-4 text-[#8AAE39] mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          <span className="text-gray-600 text-sm">{benefit}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Animated App Screens Component
const AnimatedAppScreens = ({ features, activeIndex }) => {
  return (
    <>
      {features.map((feature, index) => (
        <motion.div
          key={feature.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: activeIndex === index ? 1 : 0,
            scale: activeIndex === index ? 1 : 0.9
          }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={feature.screenshot}
            alt={feature.title}
            className="w-full h-full object-cover"
          />
          
          {/* App Interface Overlay */}
          <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-r from-[#8AAE39] to-[#97bc41] px-4 flex items-center">
            <div className="flex items-center">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="white">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              <span className="ml-2 text-white font-medium text-sm">Athly</span>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};