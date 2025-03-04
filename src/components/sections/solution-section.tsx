"use client";

import { motion } from "framer-motion";

export function SolutionSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Mobile Device Simulation */}
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative mx-auto max-w-[300px]">
              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 blur-3xl rounded-full bg-[#8AAE39]/10 animate-pulse" 
                  style={{ animationDuration: '7s' }}></div>
              
              {/* Phone Mockup */}
              <div className="relative rounded-[40px] border-[14px] border-[#111] bg-[#111] shadow-xl">
                {/* Phone Content - Chat Simulation */}
                <div className="relative overflow-hidden rounded-[26px] bg-[#f4f2ec] h-[540px]">
                  {/* App Header */}
                  <div className="h-16 bg-gradient-to-r from-[#8AAE39] to-[#9abe4a] px-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 5L90 80H75L50 30L25 80H10L50 5Z" stroke="white" strokeWidth="3" />
                        <path d="M25 80H75H90L75 100H25L10 80H25Z" stroke="white" strokeWidth="3" />
                      </svg>
                      <span className="ml-2 text-white font-medium text-sm">Athly Coach</span>
                    </div>
                    <div>
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Chat Interface */}
                  <div className="p-4 overflow-y-auto h-[calc(540px-4rem)] bg-gray-50">
                    {/* Coach Message */}
                    <div className="flex mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#8AAE39] flex items-center justify-center text-white font-bold text-sm mr-2">A</div>
                      <div className="max-w-[70%] bg-white rounded-lg rounded-tl-none p-3 shadow-sm">
                        <p className="text-sm">Guten Morgen! Ich sehe, du hast gestern dein Beintraining absolviert. Wie fühlst du dich heute?</p>
                        <p className="text-xs text-gray-400 mt-1">9:05</p>
                      </div>
                    </div>
                    
                    {/* User Message */}
                    <div className="flex justify-end mb-4">
                      <div className="max-w-[70%] bg-[#8AAE39]/10 rounded-lg rounded-tr-none p-3">
                        <p className="text-sm">Meine Oberschenkel sind etwas schwer heute. Hatte gestern wirklich ein intensives Training.</p>
                        <p className="text-xs text-gray-400 mt-1">9:07</p>
                      </div>
                    </div>
                    
                    {/* Coach Response */}
                    <div className="flex mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#8AAE39] flex items-center justify-center text-white font-bold text-sm mr-2">A</div>
                      <div className="max-w-[70%] bg-white rounded-lg rounded-tl-none p-3 shadow-sm">
                        <p className="text-sm">Das ist normal nach deinem neuen Programm. Ich passe deinen Plan für heute an – wie wäre es mit leichtem Cardio und mehr Fokus auf den Oberkörper?</p>
                        <p className="text-xs text-gray-400 mt-1">9:08</p>
                      </div>
                    </div>
                    
                    {/* User Response */}
                    <div className="flex justify-end mb-4">
                      <div className="max-w-[70%] bg-[#8AAE39]/10 rounded-lg rounded-tr-none p-3">
                        <p className="text-sm">Das klingt perfekt. Kann ich das Training auf 18 Uhr verschieben? Habe heute einen längeren Arbeitstag.</p>
                        <p className="text-xs text-gray-400 mt-1">9:10</p>
                      </div>
                    </div>
                    
                    {/* Coach Final Response */}
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full bg-[#8AAE39] flex items-center justify-center text-white font-bold text-sm mr-2">A</div>
                      <div className="max-w-[70%] bg-white rounded-lg rounded-tl-none p-3 shadow-sm">
                        <p className="text-sm">Natürlich! Ich habe deinen Plan angepasst und eine Erinnerung für 18 Uhr gesetzt. Denk daran, vorher etwas zu essen – ich habe dir zwei schnelle Optionen in deinem Ernährungsplan hinterlegt.</p>
                        <p className="text-xs text-gray-400 mt-1">9:11</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Text Content */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Dein <span className="text-[#8AAE39]">persönlicher KI-Coach</span> – die Lösung, die du gesucht hast
              </h2>
              
              <p className="text-lg text-gray-600 mb-8">
                Athly kombiniert die Personalisierung eines echten Personal Trainers mit der Bequemlichkeit einer App – dank fortschrittlicher KI-Technologie, die wirklich auf dich eingeht.
              </p>
              
              {/* Key Solution Points */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8AAE39]/10 flex items-center justify-center text-[#8AAE39] mt-1 mr-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Immer verfügbar, immer persönlich</h3>
                    <p className="text-gray-600">Dein KI-Coach ist 24/7 für dich da und reagiert sofort auf deine Bedürfnisse – genau wie ein echter Trainer, nur ohne Terminbuchung.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8AAE39]/10 flex items-center justify-center text-[#8AAE39] mt-1 mr-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Kontinuierliche Anpassung</h3>
                    <p className="text-gray-600">Dein Trainingsplan entwickelt sich mit dir und wird bei Müdigkeit, Stress oder Zeitmangel automatisch angepasst.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8AAE39]/10 flex items-center justify-center text-[#8AAE39] mt-1 mr-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Ganzheitliche Betreuung</h3>
                    <p className="text-gray-600">Von Trainingsplanung über Ernährungsberatung bis hin zu Motivation und mentaler Unterstützung – alles in einer App.</p>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <motion.div
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ y: 0, scale: 0.99 }}
              >
                <button className="bg-[#8AAE39] text-white rounded-lg px-8 py-3.5 font-medium shadow-sm hover:shadow-md hover:bg-[#8AAE39]/90 transition-all duration-300 flex items-center">
                  <span>Probiere es jetzt aus</span>
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}