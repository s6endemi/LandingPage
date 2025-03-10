"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FeatureSection() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // 60/30/10 Farbprinzip
  const colors = {
    // 60% - Neutrale Farben
    neutralDark: "#1f2937",
    neutralMedium: "#4b5563",
    neutralLight: "#f9fafb",
    
    // 30% - Markenfarben
    primary: "#9bc539",
    secondary: "#3B82F6",
    tertiary: "#F59E0B",
    quaternary: "#8B5CF6",
    
    // 10% - CTA und Highlights
    ctaGreen: "#8ab42d"
  };
  
  // Subtle parallax for depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -15 : -40]);

  // Features mit Balance aus Funktion und Nutzen
  const features = [
    {
      id: "ai-coach",
      badge: "PERSÖNLICHER KI-COACH",
      title: "Gespräche wie mit einem echten Trainer",
      description: "Stelle Fragen, bekomme personalisierte Antworten und diskutiere deine Fortschritte – ganz natürlich, als würdest du mit einem persönlichen Trainer sprechen. Dein KI-Coach versteht deine Ziele, erinnert sich an frühere Gespräche und passt sich deiner Persönlichkeit an.",
      benefit: "Mit einem Coach, der dich versteht und jederzeit für dich da ist, bleibst du motiviert und erreichst schneller deine Ziele.",
      imageSrc: "/images/athly-dashboard.jpg",
      color: colors.secondary,
      mockupContent: (
        <div className="relative">
          <div className="absolute inset-0 bg-gray-50"></div>
          
          {/* Dialog Interface */}
          <div className="absolute top-0 left-0 right-0 bg-[#3B82F6] text-white p-4">
            <div className="text-lg font-medium">Chat mit Athly</div>
            <div className="text-xs">Dein persönlicher Trainer</div>
          </div>
          
          {/* Chat Messages */}
          <div className="absolute top-20 left-0 right-0 bottom-14 overflow-y-auto p-4">
            {/* User Message */}
            <div className="flex justify-end mb-3">
              <div className="max-w-[80%] bg-[#3B82F6]/10 rounded-2xl rounded-tr-sm p-3 text-sm text-gray-800">
                Ich habe morgen wenig Zeit. Kannst du mir ein kurzes, intensives Workout erstellen?
              </div>
            </div>
            
            {/* AI Answer 1 */}
            <div className="flex mb-3">
              <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white mr-2 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="max-w-[80%] bg-white rounded-2xl rounded-tl-sm p-3 text-sm text-gray-800 shadow-sm">
                Natürlich! Hier ist ein 20-Minuten HIIT-Workout für dich:
                <br /><br />
                <span className="font-medium">5 Übungen, je 40 Sek. mit 20 Sek. Pause:</span>
                <ul className="list-disc pl-5 space-y-1 mt-1 text-gray-700">
                  <li>Burpees</li>
                  <li>Mountain Climbers</li>
                  <li>Kettlebell Swings</li>
                  <li>Plank Jacks</li>
                  <li>Jump Squats</li>
                </ul>
              </div>
            </div>
            
            {/* User Message 2 */}
            <div className="flex justify-end mb-3">
              <div className="max-w-[80%] bg-[#3B82F6]/10 rounded-2xl rounded-tr-sm p-3 text-sm text-gray-800">
                Könnte ich statt Burpees etwas für den Rücken machen? Hatte letzte Woche Probleme.
              </div>
            </div>
            
            {/* AI Answer 2 - with contextualization highlighted */}
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white mr-2 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="max-w-[80%] bg-white rounded-2xl rounded-tl-sm p-3 text-sm text-gray-800 shadow-sm">
                <span className="bg-[#3B82F6]/10 rounded px-1">Aufgrund deiner Rückenprobleme</span>, ersetze ich Burpees mit rückenfreundlicheren Alternativen:
                <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-700">
                  <li>Supermans (für den unteren Rücken)</li>
                  <li>Birddog-Übung (für Stabilität)</li>
                </ul>
                <div className="mt-2 border-t border-gray-100 pt-2 text-xs text-gray-500">
                  Ich habe deine Rückenprobleme in deinem Profil vermerkt, um zukünftige Workouts anzupassen.
                </div>
              </div>
            </div>
          </div>
          
          {/* Input Area */}
          <div className="absolute left-0 right-0 bottom-0 border-t border-gray-200 p-3 bg-white">
            <div className="flex rounded-full border border-gray-200 overflow-hidden">
              <input type="text" className="flex-1 px-4 py-2 text-sm outline-none" placeholder="Stell eine Frage zu deinem Training..." />
              <button className="bg-[#3B82F6] text-white px-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ),
      stats: [
        { label: "Antwortzeit", value: "< 2 Sek" },
        { label: "Verfügbarkeit", value: "24/7" },
        { label: "Personalisierung", value: "100%" }
      ]
    },
    {
      id: "adaptive-training",
      badge: "INTELLIGENTE TRAININGSPLANUNG",
      title: "Trainingsplan, der sich dir anpasst",
      description: "Schluss mit starren Programmen. Dein Trainingsplan passt sich automatisch an deinen Fortschritt, deine Tagesform und verfügbare Zeit an. Bei Müdigkeit wird's leichter, bei guter Form intensiver – genau wie bei einem aufmerksamen Trainer.",
      benefit: "Du trainierst immer optimal, ohne Plateaus oder Übertraining, und siehst kontinuierlich Fortschritte, die dich motivieren.",
      imageSrc: "/images/athly-workout.jpg",
      color: colors.primary,
      mockupContent: (
        <div className="relative">
          <div className="absolute inset-0 bg-gray-50"></div>
          
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bg-[#9bc539] text-white p-4">
            <div className="text-lg font-medium">Dein Trainingsplan</div>
            <div className="text-xs">Passt sich an dich an</div>
          </div>
          
          {/* Progress Visualization */}
          <div className="absolute top-20 left-4 right-4 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
              <div className="font-medium text-gray-800">Dein Fortschritt</div>
              <div className="text-xs bg-[#9bc539]/10 text-[#9bc539] px-2 py-0.5 rounded-full">Automatisch angepasst</div>
            </div>
            
            <div className="p-4">
              <div className="h-24 mb-2 relative">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <defs>
                    <linearGradient id="adaptiveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9bc539" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#9bc539" />
                    </linearGradient>
                  </defs>
                  
                  {/* Your rising curve */}
                  <path 
                    d="M0,40 10,38 20,36 30,30 40,28 50,26 60,20 70,18 80,15 90,10 100,8" 
                    stroke="url(#adaptiveGradient)" 
                    strokeWidth="2"
                    fill="none"
                  />
                  
                  {/* Current point */}
                  <circle cx="60" cy="20" r="3" fill="#9bc539" />
                </svg>
                
                <div className="absolute bottom-0 left-[60%] transform -translate-x-1/2 flex flex-col items-center">
                  <div className="text-xs font-medium text-[#9bc539]">Hier bist du</div>
                  <svg className="w-4 h-4 text-[#9bc539]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Current Workout Card */}
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium text-gray-800">Heutiges Training</div>
              <div className="text-xs text-[#9bc539] font-medium">Optimiert für dich</div>
            </div>
            
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-[#9bc539]/10 text-[#9bc539] rounded-lg mr-3 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-800">Krafttraining: Oberkörper</div>
                <div className="text-xs text-gray-500">
                  <span className="line-through pr-1">3x10</span>
                  <span className="text-[#9bc539] font-medium">4x8 mit mehr Gewicht</span>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 bg-[#9bc539]/5 rounded p-2">
              Anpassung basierend auf deinem schnellen Fortschritt und deiner guten Erholung seit letztem Training
            </div>
          </div>
        </div>
      ),
      stats: [
        { label: "Bessere Ergebnisse", value: "+76%" },
        { label: "Anpassungen", value: "Echtzeit" },
        { label: "Trainingsvielfalt", value: "Unbegrenzt" }
      ]
    },
    {
      id: "nutrition-sync",
      badge: "ERNÄHRUNG & TRAINING IN SYNC",
      title: "Perfekt abgestimmte Ernährung",
      description: "Deine Ernährung passt sich automatisch an dein Training an – mehr Protein nach Krafttraining, mehr Kohlenhydrate vor Cardio. Ideal für optimale Ergebnisse, abgestimmt auf deinen individuellen Stoffwechsel und Lebensstil.",
      benefit: "Du musst nicht mehr rätseln, was du essen sollst. Die richtigen Nährstoffe zur richtigen Zeit beschleunigen deinen Fortschritt und verbessern deine Regeneration.",
      imageSrc: "/images/athly-nutrition.jpg",
      color: colors.tertiary,
      mockupContent: (
        <div className="relative">
          <div className="absolute inset-0 bg-gray-50"></div>
          
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bg-[#F59E0B] text-white p-4">
            <div className="text-lg font-medium">Deine Ernährung</div>
            <div className="text-xs">Synchronisiert mit deinem Training</div>
          </div>
          
          {/* Nutrition plan */}
          <div className="absolute top-20 left-4 right-4">
            <div className="bg-white rounded-xl p-3 mb-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Frühstück</div>
                    <div className="text-xs text-gray-500">08:00 Uhr</div>
                  </div>
                </div>
                <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded font-medium">
                  Protein-Fokus
                </div>
              </div>
              <div className="text-sm text-gray-700">Protein-Pancakes mit Blaubeeren</div>
              <div className="flex mt-2 text-xs text-gray-500 space-x-2">
                <div>Protein: 32g</div>
                <div>Carbs: 45g</div>
                <div>Fett: 14g</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-3 mb-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Pre-Workout Snack</div>
                    <div className="text-xs text-gray-500">11:30 Uhr</div>
                  </div>
                </div>
                <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">
                  Carb-Boost
                </div>
              </div>
              <div className="text-sm text-gray-700">Banane und Mandelbutter</div>
              <div className="flex mt-2 text-xs text-gray-500 space-x-2">
                <div>Protein: 8g</div>
                <div>Carbs: 30g</div>
                <div>Fett: 10g</div>
              </div>
            </div>
          </div>
          
          {/* Sync notice */}
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-sm p-3">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-[#F59E0B] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <div className="font-medium text-sm text-gray-800">Automatische Anpassung</div>
            </div>
            <div className="text-xs text-gray-600">
              Dein Trainingsplan für heute beinhaltet <span className="font-medium">Krafttraining</span>. Deine Ernährung wurde optimiert für:
              <ul className="mt-1 pl-4 space-y-0.5">
                <li>• Mehr Protein für Muskelaufbau</li>
                <li>• Zeitlich optimierte Kohlenhydratzufuhr</li>
                <li>• Ausreichend gesunde Fette für Hormonbalance</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      stats: [
        { label: "Bessere Energielevel", value: "+82%" },
        { label: "Leistungssteigerung", value: "+65%" },
        { label: "Regenerationszeit", value: "-48%" }
      ]
    },
    {
      id: "progress-tracking",
      badge: "FORTSCHRITTSVERFOLGUNG",
      title: "Deine Erfolge visualisiert",
      description: "Ergebnisse sehen, die dich motivieren. Athly analysiert deine Daten und visualisiert Fortschritte auf eine Weise, die wirklich motiviert. Du siehst nicht nur, wie weit du gekommen bist, sondern auch, was als Nächstes möglich ist.",
      benefit: "Sichtbare Erfolge sind der beste Motivator. Mit Athly bleibst du am Ball, weil du deinen Fortschritt deutlich siehst und immer weißt, was der nächste Schritt ist.",
      imageSrc: "/images/athly-progress.jpg",
      color: colors.quaternary,
      mockupContent: (
        <div className="relative">
          <div className="absolute inset-0 bg-gray-50"></div>
          
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bg-[#8B5CF6] text-white p-4">
            <div className="text-lg font-medium">Deine Fortschritte</div>
            <div className="text-xs">Analysiert & Visualisiert</div>
          </div>
          
          {/* Main Metric Chart */}
          <div className="absolute top-20 left-4 right-4 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="font-medium text-sm text-gray-800">Kraftentwicklung</div>
              <div className="text-xs bg-[#8B5CF6]/10 text-[#8B5CF6] px-2 py-0.5 rounded-full">
                +27% in 30 Tagen
              </div>
            </div>
            
            <div className="h-32 relative mb-2">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <defs>
                  <linearGradient id="vizGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="predictGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                
                {/* Historical data */}
                <path 
                  d="M0,40 10,38 20,36 30,33 40,30 50,25 60,20" 
                  fill="none" 
                  stroke="url(#vizGradient)" 
                  strokeWidth="2"
                />
                
                {/* Area fill */}
                <path 
                  d="M0,40 10,38 20,36 30,33 40,30 50,25 60,20 L60,50 L0,50 Z" 
                  fill="url(#areaGradient)"
                />
                
                {/* Predicted line */}
                <path 
                  d="M60,20 70,15 80,12 90,10 100,8" 
                  fill="none" 
                  stroke="url(#predictGradient)" 
                  strokeWidth="2"
                  strokeDasharray="4,2"
                />
                
                {/* Current point */}
                <circle cx="60" cy="20" r="3" fill="#8B5CF6" />
              </svg>
              
              {/* Vertical line separator */}
              <div className="absolute top-0 bottom-0 w-px bg-gray-200 left-[60%]"></div>
              
              <div className="absolute top-0 left-[62%] text-xs">
                <span className="text-[#8B5CF6] font-medium">Prognose</span>
              </div>
            </div>
            
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Start</span>
              <span className="text-[#8B5CF6]">Jetzt</span>
              <span className="text-gray-500">In 8 Wochen</span>
            </div>
          </div>
          
          {/* Progress cards */}
          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
            <div className="bg-white rounded-lg shadow-sm p-3">
              <div className="text-sm font-medium text-[#8B5CF6]">+18%</div>
              <div className="text-xs text-gray-500">Kraft</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3">
              <div className="text-sm font-medium text-green-500">-2.4kg</div>
              <div className="text-xs text-gray-500">Körperfett</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-3">
              <div className="text-sm font-medium text-blue-500">+1.8kg</div>
              <div className="text-xs text-gray-500">Muskeln</div>
            </div>
          </div>
        </div>
      ),
      stats: [
        { label: "Motivation", value: "+89%" },
        { label: "Zielerreichung", value: "2x schneller" },
        { label: "Langzeit-Erfolg", value: "93%" }
      ]
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden bg-white"
      id="features"
    >
      {/* Subtle background elements */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-5 overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gray-50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-tr from-gray-50 to-transparent rounded-full blur-3xl"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            className="mb-3 md:mb-4 flex justify-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gray-100 text-gray-800">
              <span className="text-xs md:text-sm uppercase tracking-wide font-medium">INNOVATIVE FEATURES</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Dein KI-<span style={{ color: colors.primary }}>Coach</span> im 
            Taschenformat
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg text-gray-600 mx-auto font-normal leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Athly vereint persönliches Training mit modernster Technologie, um dir ein Fitness-Erlebnis 
            zu bieten, das so individuell ist wie du selbst – jederzeit und überall verfügbar.
          </motion.p>
        </div>

        {/* Feature Sections */}
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <div key={feature.id} className="relative">
              {/* Connecting line between features */}
              {index < features.length - 1 && (
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-[100%] w-px h-16 md:h-24 bg-gradient-to-b from-gray-200 to-transparent"></div>
              )}
              
              {/* Feature Content mit Phone Mockup */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 lg:gap-16`}
              >
                {/* Phone Mockup */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative"
                  >
                    {/* Phone Frame - Verbesserte Anzeige des Inhalts */}
                    <div className="relative mx-auto w-[280px] h-[570px] md:w-[300px] md:h-[610px] bg-black rounded-[60px] p-4 overflow-hidden shadow-xl">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20"></div>
                      
                      {/* Screen - Sichergestellt, dass der Inhalt vollständig angezeigt wird */}
                      <div className="relative h-full w-full rounded-[48px] bg-white overflow-hidden">
                        <div className="absolute inset-0">
                          {feature.mockupContent}
                        </div>
                      </div>
                    </div>
                    
                    {/* Responsive Bubbles: Desktop neben dem Mockup, Mobile am unteren Rand */}
                    {index === 0 && (
                      <>
                        {/* Desktop Version - neben dem Mockup */}
                        <motion.div
                          className="hidden md:block absolute -right-16 lg:-right-24 top-1/4"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <div 
                            className="backdrop-blur-sm bg-white/90 shadow-lg rounded-xl p-3 border border-gray-50"
                            style={{ maxWidth: '220px' }}
                          >
                            <div className="flex items-center mb-1.5">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-800">24/7 Coach-Zugang</div>
                            </div>
                            <p className="text-xs text-gray-600">Stelle Fragen und erhalte sofort qualifizierte Antworten – zu jeder Zeit.</p>
                          </div>
                        </motion.div>
                        
                        {/* Mobile Version - am unteren Rand des Mockups */}
                        <motion.div
                          className="md:hidden absolute -bottom-1 -right-4 z-20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <div 
                            className="backdrop-blur-sm bg-white/95 shadow-lg rounded-xl p-2.5 border border-gray-50"
                            style={{ maxWidth: '180px' }}
                          >
                            <div className="flex items-center">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-800">24/7 Coach-Zugang</div>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}

                    {index === 1 && (
                      <>
                        {/* Desktop Version - neben dem Mockup */}
                        <motion.div
                          className="hidden md:block absolute -left-16 lg:-left-24 top-1/3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <div 
                            className="backdrop-blur-sm bg-white/90 shadow-lg rounded-xl p-3 border border-gray-50"
                            style={{ maxWidth: '220px' }}
                          >
                            <div className="flex items-center mb-1.5">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-800">Smarte Anpassung</div>
                            </div>
                            <p className="text-xs text-gray-600">Dein Plan passt sich automatisch an deine Tagesform und Fortschritte an.</p>
                          </div>
                        </motion.div>
                        
                        {/* Mobile Version - am unteren Rand des Mockups */}
                        <motion.div
                          className="md:hidden absolute -bottom-1 -left-4 z-20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <div 
                            className="backdrop-blur-sm bg-white/95 shadow-lg rounded-xl p-2.5 border border-gray-50"
                            style={{ maxWidth: '180px' }}
                          >
                            <div className="flex items-center">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-800">Smarte Anpassung</div>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}

                    {index === 2 && (
                      <>
                        {/* Desktop Version - neben dem Mockup */}
                        <motion.div
                          className="hidden md:block absolute -right-16 lg:-right-24 top-1/2"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <div 
                            className="backdrop-blur-sm bg-white/90 shadow-lg rounded-xl p-3 border border-gray-50"
                            style={{ maxWidth: '220px' }}
                          >
                            <div className="flex items-center mb-1.5">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-800">Optimale Nährstoffe</div>
                            </div>
                            <p className="text-xs text-gray-600">Wissenschaftlich abgestimmte Ernährung für maximale Leistung und Regeneration.</p>
                          </div>
                        </motion.div>
                        
                        {/* Mobile Version - am unteren Rand des Mockups */}
                        <motion.div
                          className="md:hidden absolute -bottom-1 -right-4 z-20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <div 
                            className="backdrop-blur-sm bg-white/95 shadow-lg rounded-xl p-2.5 border border-gray-50"
                            style={{ maxWidth: '180px' }}
                          >
                            <div className="flex items-center">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-800">Optimale Nährstoffe</div>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}

                    {index === 3 && (
                      <>
                        {/* Desktop Version - neben dem Mockup */}
                        <motion.div
                          className="hidden md:block absolute -left-16 lg:-left-24 top-2/5"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <div 
                            className="backdrop-blur-sm bg-white/90 shadow-lg rounded-xl p-3 border border-gray-50"
                            style={{ maxWidth: '220px' }}
                          >
                            <div className="flex items-center mb-1.5">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-800">Motivierende Insights</div>
                            </div>
                            <p className="text-xs text-gray-600">Sichtbare Fortschritte und Prognosen halten dich langfristig motiviert.</p>
                          </div>
                        </motion.div>
                        
                        {/* Mobile Version - am unteren Rand des Mockups */}
                        <motion.div
                          className="md:hidden absolute -bottom-1 -left-4 z-20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <div 
                            className="backdrop-blur-sm bg-white/95 shadow-lg rounded-xl p-2.5 border border-gray-50"
                            style={{ maxWidth: '180px' }}
                          >
                            <div className="flex items-center">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-gray-800">Motivierende Insights</div>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                    
                    {/* Subtle glow effect */}
                    <div className="absolute -z-10 inset-0 rounded-[60px] blur-xl opacity-20" style={{ backgroundColor: feature.color }}></div>
                  </motion.div>
                </div>
                
                {/* Feature description */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="inline-block px-3 py-1.5 rounded-full text-sm mb-4"
                      style={{ 
                        backgroundColor: `${feature.color}10`, 
                        color: feature.color 
                      }}
                    >
                      {feature.badge}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 tracking-tight">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 max-w-lg mx-auto md:mx-0">
                      {feature.description}
                    </p>
                    
                    {/* Benefit Box */}
                    <motion.div
                      className="mb-6 bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm text-gray-700"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-[#9bc539] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>{feature.benefit}</p>
                      </div>
                    </motion.div>
                    
                    {/* Stats */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      {feature.stats.map((stat, i) => (
                        <motion.div
                          key={i}
                          className="bg-white shadow-sm rounded-xl p-3 border border-gray-100"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                        >
                          <div className="font-semibold mb-1" style={{ color: feature.color }}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-24 md:mt-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
            Bereit für ein neues Fitness-Erlebnis?
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Starte noch heute mit Athly und erlebe, wie personalisiertes Training und Ernährung dein Leben verändern können.
          </p>
          <motion.button
            className="inline-flex items-center px-6 py-3 text-white font-medium rounded-xl shadow-md transition-all duration-300"
            style={{ 
              backgroundColor: colors.ctaGreen,
              boxShadow: `0 4px 14px -4px ${colors.ctaGreen}40`
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Jetzt starten</span>
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
          
          {/* Trust Signals */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 text-[#9bc539] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Datenschutz garantiert</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 text-[#9bc539] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Auf allen Geräten</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 text-[#9bc539] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Kostenlose Testversion</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}