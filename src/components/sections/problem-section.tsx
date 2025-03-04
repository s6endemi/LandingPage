"use client";

import { motion } from "framer-motion";

export function ElegantProblemSection() {
  // Subtle fade-in animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Problem cards with better visual examples
  const painPoints = [
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Generische One-Size-Fits-All Pläne",
      description: "Herkömmliche Fitness-Apps bieten vorgefertigte Pläne, die nicht zu deinem Körper, deinen Zielen oder deinem Lebensstil passen.",
      imageAlt: "Person frustriert mit Standard-Trainingsplan"
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Fehlende Motivation und Accountability",
      description: "Ohne echtes Feedback ist es zu leicht, Trainingseinheiten zu verschieben. Der innere Schweinehund gewinnt ohne persönliche Betreuung.",
      imageAlt: "Demotivierte Person mit ungenutzter Fitness-App"
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.22766 9C8.77678 7.83481 10.2584 7 12.0001 7C14.2092 7 16.0001 8.34315 16.0001 10C16.0001 11.3994 14.7224 12.5751 12.9943 12.9066C12.4519 13.0106 12.0001 13.4477 12.0001 14M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Keine Antworten auf deine Fragen",
      description: "Was tun bei Schmerzen? Wie trainieren bei Zeitmangel? Klassische Apps lassen dich mit deinen wichtigsten Fragen allein.",
      imageAlt: "Verwirrte Person, die Hilfe mit Übungen sucht"
    }
  ];

  // Statistiken über Fitness-App-Nutzung
  const stats = [
    { value: "80%", label: "der Fitness-App-Nutzer brechen in den ersten 3 Monaten ab" },
    { value: "67%", label: "fühlen sich von generischen Trainingsplänen nicht angesprochen" },
    { value: "92%", label: "wünschen sich eine persönlichere Betreuung" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            className="inline-block text-[#8AAE39] font-medium mb-2 text-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            DIE HERAUSFORDERUNG
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-5 text-gray-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Warum scheitern die meisten beim Erreichen ihrer Fitnessziele?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            Herkömmliche Fitness-Apps versprechen viel, liefern aber selten langfristige Erfolge. 
            Die Gründe dafür sind eindeutig:
          </motion.p>
        </div>

        {/* Problem Cards - mit visuellen Elementen und Bildern */}
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-12 mb-16">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className="flex flex-col h-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
            >
              {/* Bild des Frustrationsszenarios */}
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 mb-6 relative group">
                {/* Placeholder für das Bild */}
                <img 
                  src={`/api/placeholder/600/340?text=${encodeURIComponent(point.imageAlt)}`} 
                  alt={point.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtile Overlay-Verlauf */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
              </div>
              
              {/* Content */}
              <div className="flex-grow">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 p-2 mr-4 rounded-full bg-[#8AAE39]/10 text-[#8AAE39]">
                    {point.icon}
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">{point.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{point.description}</p>
                
                {/* Visual indicator - horizontal line */}
                <div className="mt-auto">
                  <div className="w-16 h-1 bg-[#8AAE39]/30 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistik-Sektion - Elegant und interessant */}
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          {/* Hintergrund-Akzent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8AAE39] to-[#8AAE39]/30"></div>
          
          <div className="md:text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Die Realität ist ernüchternd</h3>
            <p className="text-gray-600 md:max-w-2xl md:mx-auto">
              Selbst mit den besten Absichten führen herkömmliche Fitness-Apps selten zum Erfolg. 
              Unsere Marktanalyse zeigt deutlich, wo das Problem liegt:
            </p>
          </div>
          
          {/* Stats Grid - Modernes, interessantes Layout */}
          <div className="grid md:grid-cols-3 gap-y-8 gap-x-4">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (index * 0.1) }}
              >
                <div className="flex md:flex-col md:items-center">
                  {/* Large statistic */}
                  <div className="text-4xl font-bold text-[#8AAE39] md:mb-3 mr-3 md:mr-0">
                    {stat.value}
                  </div>
                  
                  {/* Description */}
                  <div className="flex-1 md:text-center">
                    {/* Visual separator */}
                    <div className="hidden md:block h-px w-10 bg-[#8AAE39]/30 mx-auto mb-3"></div>
                    
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Conclusion and Call-to-Action */}
          <div className="mt-12 pt-8 border-t border-gray-100 md:text-center">
            <p className="text-lg font-medium text-gray-700 mb-6">
              Was also fehlt? Ein persönlicher Trainer, der für alle erschwinglich ist.
            </p>
            
            <motion.div
              className="inline-block"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <button className="bg-[#8AAE39] text-white rounded-lg px-6 py-3 font-medium shadow-sm hover:shadow-md hover:bg-[#8AAE39]/90 transition-all duration-300 flex items-center">
                <span>Die Athly-Lösung entdecken</span>
                <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}