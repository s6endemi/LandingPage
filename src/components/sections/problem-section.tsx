"use client";

import { motion } from "framer-motion";

export function ProblemSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Problem Cards mit Icon, Titel und Beschreibung
  const painPoints = [
    {
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Generische One-Size-Fits-All Pläne",
      description: "Die meisten Fitness-Apps bieten vorgefertigte Pläne, die nicht wirklich zu deinem Körper, Zielen oder Lebensstil passen. Keine Anpassung an deine individuellen Bedürfnisse."
    },
    {
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Fehlende Motivation und Accountability",
      description: "Wer motiviert dich, wenn der innere Schweinehund übernimmt? Ohne echtes Feedback und Accountability ist es zu leicht, Trainingseinheiten zu verschieben... und dann ganz aufzugeben."
    },
    {
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.22766 9C8.77678 7.83481 10.2584 7 12.0001 7C14.2092 7 16.0001 8.34315 16.0001 10C16.0001 11.3994 14.7224 12.5751 12.9943 12.9066C12.4519 13.0106 12.0001 13.4477 12.0001 14M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Keine Antworten auf deine Fragen",
      description: "Was tun bei Schmerzen? Wie anpassen bei Zeitmangel? Klassische Apps lassen dich mit deinen Fragen allein – genau dann, wenn du Hilfe am dringendsten brauchst."
    }
  ];

  // Statistik über Fitness-App-Nutzung
  const stats = [
    { value: "80%", label: "der Fitness-App-Nutzer brechen in den ersten 3 Monaten ab" },
    { value: "67%", label: "fühlen sich von generischen Trainingsplänen nicht angesprochen" },
    { value: "92%", label: "wünschen sich eine persönlichere Betreuung" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-5 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Warum scheitern die meisten beim Erreichen ihrer Fitnessziele?
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Herkömmliche Fitness-Apps versprechen viel, liefern aber selten langfristige Erfolge. 
            Die Gründe dafür sind eindeutig:
          </motion.p>
        </div>

        {/* Problem Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-[#8AAE39] mb-4">{point.icon}</div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Agitation Section - Statistiken */}
        <motion.div
          className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Die Realität ist ernüchternd</h3>
            <p className="text-gray-600">Selbst mit den besten Absichten führen herkömmliche Fitness-Apps selten zum Erfolg:</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-[#8AAE39] mb-2">{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
          
          {/* Transition to Solution */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-lg font-medium text-gray-700 mb-6">
              Was also fehlt? Ein persönlicher Trainer, der für alle erschwinglich ist.
            </p>
            <motion.div
              className="inline-block"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <button className="bg-[#8AAE39] text-white rounded-lg px-6 py-3 font-medium shadow-sm hover:shadow-md hover:bg-[#8AAE39]/90 transition-all duration-300 flex items-center">
                <span>Wie Athly dieses Problem löst</span>
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}