"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Einzelne Testimonial-Karte
const TestimonialCard = ({
  quote,
  author,
  goal,
  achievement,
  image,
  rating,
  index
}: {
  quote: string;
  author: string;
  goal: string;
  achievement: string;
  image: string;
  rating: number;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative group rounded-xl overflow-hidden h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="h-full p-6 bg-white border border-gray-100 rounded-xl flex flex-col"
        animate={{
          y: isHovered ? -5 : 0,
          boxShadow: isHovered ? "0 10px 30px rgba(138, 174, 57, 0.1)" : "0 2px 10px rgba(138, 174, 57, 0.05)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Quote Symbol */}
        <div className="text-[#8AAE39]/20 text-5xl font-serif absolute top-3 right-4">&quot;</div>
        
        {/* Star Rating */}
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 24 24"
              fill={i < rating ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className={`w-4 h-4 mr-1 ${i < rating ? "text-[#8AAE39]" : "text-gray-300"}`}
              animate={{
                scale: isHovered && i < rating ? [1, 1.2, 1] : 1
              }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
              }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </motion.svg>
          ))}
        </div>
        
        {/* Achievement Badge */}
        <div className="inline-block bg-[#8AAE39]/10 rounded-full px-3 py-1 text-xs font-medium text-[#8AAE39] mb-3 self-start">
          {achievement}
        </div>
        
        {/* Quote Text */}
        <p className="text-gray-700 mb-4 flex-grow">{quote}</p>
        
        {/* Author Info with Profile Picture */}
        <div className="flex items-center pt-4 mt-auto border-t border-gray-100">
          <div className="flex-shrink-0 mr-3">
            <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-[#8AAE39]/30 transition-colors duration-300">
              <motion.div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
                animate={{
                  scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{author}</h4>
            <p className="text-sm text-gray-500">{goal}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Fitness Erfolge Component mit Icon und Animation
const FitnessAchievement = ({
  icon,
  value,
  label,
  index
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  index: number;
}) => {
  return (
    <motion.div 
      className="relative bg-white rounded-lg p-5 shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(138, 174, 57, 0.15)" }}
    >
      <div className="flex items-start">
        <div className="bg-[#8AAE39]/10 p-3 rounded-full text-[#8AAE39] mr-4">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
      
      {/* Dezenter Highlight-Effekt */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8AAE39]/0 via-[#8AAE39] to-[#8AAE39]/0 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Hauptkomponente für die Social Proof Section
export function SocialProofSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  
  // Realistische Testimonials für eine Fitness-App
  const testimonials = [
    {
      quote: "Seit ich mit Athly trainiere, bin ich viel motivierter. Mein KI-Coach passt meine Pläne perfekt an, wenn ich mal einen stressigen Arbeitstag hatte oder nicht gut geschlafen habe.",
      author: "Sophia M.",
      goal: "Ziel: Insgesamt fitter werden",
      achievement: "-8kg in 3 Monaten",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "Endlich ein Fitness-System, das sich an mich anpasst und nicht umgekehrt. Die persönlichen Gespräche mit meinem KI-Coach fühlen sich erstaunlich natürlich an und geben mir genau den Push, den ich brauche.",
      author: "Thomas W.",
      goal: "Ziel: Muskelaufbau",
      achievement: "+4kg Muskelmasse",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "Als Mutter von zwei Kindern ist mein Zeitplan oft chaotisch. Athly ist der erste Trainer, der das versteht und sich flexibel anpasst, ohne dass ich mich schuldig fühlen muss, wenn etwas dazwischenkommt.",
      author: "Lisa K.",
      goal: "Ziel: Nach Schwangerschaft zurück in Form",
      achievement: "3x pro Woche trainieren",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4
    },
    {
      quote: "Was mich am meisten beeindruckt: Mein Athly-Coach erinnert sich an alles. Wenn ich von Knieschmerzen berichte, passt er nicht nur das aktuelle Training an, sondern berücksichtigt es auch in allen zukünftigen Plänen.",
      author: "Markus B.",
      goal: "Ziel: Schmerzfreies Training trotz alter Verletzungen",
      achievement: "6 Monate ohne Schmerzen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "Die Ernährungstipps sind goldwert! Athly respektiert, dass ich Vegetarier bin und schlägt mir trotzdem proteinreiche Mahlzeiten vor, die ich tatsächlich gerne esse – kein 08/15-Plan wie bei anderen Apps.",
      author: "Jana F.",
      goal: "Ziel: Gesünder ernähren ohne zu verzichten",
      achievement: "Bessere Blutwerte",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "Als jemand mit einem vollen Terminkalender schätze ich die Anpassungsfähigkeit von Athly. Selbst wenn ich nur 20 Minuten Zeit habe, erstellt mein Coach ein effektives Kurztraining.",
      author: "Daniel H.",
      goal: "Ziel: Trotz Zeitmangel fit bleiben",
      achievement: "Konsequenz trotz 60h-Woche",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4
    }
  ];

  // Featured Testimonial - hervorgehobenes größeres Testimonial
  const featured = {
    quote: "Nach mehreren gescheiterten Versuchen mit Standard-Fitness-Apps habe ich mit Athly endlich meine Ziele erreicht. Der KI-Coach hat nicht nur einen perfekten Trainingsplan erstellt, sondern mich auch durch Motivationstiefs begleitet. Das adaptive Training hat meinen Körper wirklich verändert – und das Beste: Es fühlt sich nicht wie eine temporäre Diät an, sondern wie eine nachhaltige Lebensumstellung.",
    author: "Michael K.",
    goal: "Halbmarathon-Vorbereitung",
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    achievements: [
      { label: "Gewichtsverlust", value: "12 kg" },
      { label: "Laufleistung", value: "+180%" },
      { label: "Trainiert seit", value: "8 Monaten" }
    ]
  };

  // Erfolgsstatistiken
  const achievements = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="currentColor"/>
        </svg>
      ),
      value: "87%",
      label: "Verbesserte Konsequenz beim Training"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
        </svg>
      ),
      value: "3x",
      label: "Längere Durchhaltedauer als bei Standard-Apps"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM12 7C13.66 7 15 8.34 15 10C15 11.66 13.66 13 12 13C10.34 13 9 11.66 9 10C9 8.34 10.34 7 12 7ZM18 19H6V17.6C6 15.6 10 14.5 12 14.5C14 14.5 18 15.6 18 17.6V19Z" fill="currentColor"/>
        </svg>
      ),
      value: "92%",
      label: "Erreichen persönlicher Fitnessziele"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
        </svg>
      ),
      value: "4.9/5",
      label: "Durchschnittliche Bewertung"
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="testimonials" 
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span 
            className="inline-block text-[#8AAE39] font-medium mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            ERFOLGSGESCHICHTEN
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Was unsere Nutzer sagen
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Echte Menschen, echte Erfolge mit ihrem Athly KI-Coach
          </motion.p>
          <motion.div 
            className="w-20 h-1 bg-[#8AAE39] mx-auto mt-8 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>
        
        {/* Featured Testimonial - Redesigned with Fitness Focus */}
        <div className="max-w-6xl mx-auto mb-16">
          <motion.div 
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ 
              boxShadow: "0 15px 30px rgba(138, 174, 57, 0.1)",
              y: -5
            }}
          >
            <div className="grid md:grid-cols-5 gap-0">
              {/* Image/Profile Column */}
              <div className="md:col-span-2 bg-[#8AAE39]/5 p-8 flex flex-col justify-center relative overflow-hidden">
                {/* Subtle Pattern Background */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="fitness-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M0 0L20 0L20 20L0 20Z" fill="none" stroke="#8AAE39" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#fitness-pattern)" />
                  </svg>
                </div>
                
                <div className="relative z-10 flex flex-col items-center md:items-start">
                  {/* Profile Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                    <motion.div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${featured.image})` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  
                  {/* Author Info */}
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{featured.author}</h3>
                    <div className="inline-block bg-[#8AAE39]/10 rounded-full px-3 py-1 text-sm font-medium text-[#8AAE39] mb-3">
                      {featured.goal}
                    </div>
                  </div>
                  
                  {/* Achievement Stats */}
                  <div className="grid grid-cols-3 gap-4 w-full mt-4">
                    {featured.achievements.map((achievement, i) => (
                      <div key={i} className="text-center">
                        <div className="font-bold text-[#8AAE39] text-xl">{achievement.value}</div>
                        <div className="text-xs text-gray-600">{achievement.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Decorative Element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#8AAE39]/10 z-0"></div>
              </div>
              
              {/* Quote Column */}
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                <div className="text-[#8AAE39]/20 text-7xl font-serif absolute top-5 right-6">&quot;</div>
                
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="mb-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 mr-1 text-[#8AAE39]"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-lg text-gray-700 italic leading-relaxed">
                      {featured.quote}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Testimonial Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                goal={testimonial.goal}
                achievement={testimonial.achievement}
                image={testimonial.image}
                rating={testimonial.rating}
                index={index}
              />
            ))}
          </div>
        </div>
        
        {/* Achievements/Stats Section */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          style={{ y }}
        >
          <motion.h3 
            className="text-2xl font-bold text-center text-gray-900 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Die <span className="text-[#8AAE39]">Erfolge</span> unserer Mitglieder
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <FitnessAchievement
                key={index}
                icon={achievement.icon}
                value={achievement.value}
                label={achievement.label}
                index={index}
              />
            ))}
          </div>
        </motion.div>
        
        {/* CTA Banner with Trust Indicators */}
        <div className="max-w-4xl mx-auto mt-20">
          <motion.div 
            className="bg-gradient-to-r from-[#8AAE39]/90 to-[#9abe4a]/90 rounded-2xl overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="cta-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20H40M20 0V40" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-pattern)" />
              </svg>
            </div>
            
            <div className="relative z-10 p-10 md:p-12 text-center">
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Bereit für deinen persönlichen KI-Coach?
              </motion.h3>
              <motion.p 
                className="text-white/90 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Schließe dich tausenden von zufriedenen Nutzern an, die mit Athly ihre Fitnessziele erreichen.
              </motion.p>
              
              <motion.button
                className="bg-white text-[#8AAE39] px-8 py-3.5 rounded-lg font-medium shadow-sm group relative overflow-hidden inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {/* Subtle shine effect */}
                <span className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-[#8AAE39]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                <span className="relative z-10 flex items-center">
                  Kostenlos starten
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </motion.button>
              
              {/* Trust Badges */}
              <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4">
                {['100% kostenlose Testphase', 'Keine Kreditkarte nötig', 'Jederzeit kündbar'].map((badge, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center text-white text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{badge}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}