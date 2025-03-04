"use client";

import { useState, useRef, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export function EnhancedSocialProofSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [featuredStory, setFeaturedStory] = useState(0);
  
  // Parallax-Effekt für Hintergrund-Elemente
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  
  // Transformations-Erfolgsgeschichten
  const transformationStories = [
    {
      id: 1,
      name: "Michael K.",
      goal: "Halbmarathon-Vorbereitung",
      category: "athletic",
      before: {
        weight: "95 kg",
        fitness: "Konnte kaum 2km joggen",
        quote: "Ich hatte schon so viele Fitness-Apps probiert, aber keine hat mich wirklich motiviert dranzubleiben."
      },
      after: {
        weight: "83 kg",
        fitness: "Erster Halbmarathon absolviert",
        quote: "Mit Athly habe ich nicht nur mein Gewicht reduziert, sondern eine völlig neue Beziehung zum Sport entwickelt."
      },
      duration: "8 Monate",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      achievement: "Von 0 auf Halbmarathon",
      rating: 5,
      stats: [
        { label: "Gewichtsverlust", value: "12 kg" },
        { label: "Laufleistung", value: "+180%" },
        { label: "Ruhepuls", value: "-15 bpm" }
      ],
      featured: true
    },
    {
      id: 2,
      name: "Sophia M.",
      goal: "Insgesamt fitter werden",
      category: "weight-loss",
      before: {
        weight: "78 kg",
        fitness: "Außer Atem nach Treppen",
        quote: "Ich habe mich in meinem Körper nicht mehr wohlgefühlt und wusste nicht, wo ich anfangen sollte."
      },
      after: {
        weight: "70 kg",
        fitness: "Voller Energie den ganzen Tag",
        quote: "Mein KI-Coach passt meine Pläne perfekt an, wenn ich mal einen stressigen Arbeitstag hatte oder nicht gut geschlafen habe."
      },
      duration: "3 Monate",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      achievement: "-8kg in 3 Monaten",
      rating: 5,
      stats: [
        { label: "Gewichtsverlust", value: "8 kg" },
        { label: "Energielevel", value: "+60%" },
        { label: "Trainings/Woche", value: "3x" }
      ]
    },
    {
      id: 3,
      name: "Thomas W.",
      goal: "Muskelaufbau",
      category: "muscle",
      before: {
        weight: "72 kg",
        fitness: "Schlank, aber ohne Definition",
        quote: "Ich wollte mehr Muskeln aufbauen, aber im Fitnessstudio fühlte ich mich immer verloren."
      },
      after: {
        weight: "76 kg",
        fitness: "Definierte Muskeln, mehr Kraft",
        quote: "Endlich ein Fitness-System, das sich an mich anpasst und nicht umgekehrt. Die persönlichen Gespräche mit meinem KI-Coach geben mir genau den Push, den ich brauche."
      },
      duration: "5 Monate",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      achievement: "+4kg Muskelmasse",
      rating: 5,
      stats: [
        { label: "Muskelmasse", value: "+4 kg" },
        { label: "Bankdrücken", value: "+25 kg" },
        { label: "Körperfett", value: "-3%" }
      ]
    },
    {
      id: 4,
      name: "Lisa K.",
      goal: "Nach Schwangerschaft zurück in Form",
      category: "postpartum",
      before: {
        weight: "82 kg",
        fitness: "Erschöpft und überfordert",
        quote: "Als Mutter von zwei Kindern ist mein Zeitplan oft chaotisch. Ich dachte, ich müsste meine Fitness-Ziele aufgeben."
      },
      after: {
        weight: "73 kg",
        fitness: "Fit trotz Family-Life",
        quote: "Athly ist der erste Trainer, der mich wirklich versteht und sich flexibel anpasst, ohne dass ich mich schuldig fühlen muss, wenn etwas dazwischenkommt."
      },
      duration: "6 Monate",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      achievement: "3x pro Woche trainieren",
      rating: 4,
      stats: [
        { label: "Gewichtsverlust", value: "9 kg" },
        { label: "Trainings/Woche", value: "3x" },
        { label: "Ausdauer", value: "+40%" }
      ],
      featured: true
    },
    {
      id: 5,
      name: "Markus B.",
      goal: "Schmerzfreies Training trotz alter Verletzungen",
      category: "rehabilitation",
      before: {
        fitness: "Chronische Knieschmerzen",
        quote: "Nach meiner Knie-OP hat mir kein Trainer helfen können, schmerzfrei zu trainieren."
      },
      after: {
        fitness: "Endlich schmerzfrei aktiv",
        quote: "Was mich am meisten beeindruckt: Mein Athly-Coach erinnert sich an alles. Wenn ich von Knieschmerzen berichte, berücksichtigt er das auch in allen zukünftigen Plänen."
      },
      duration: "6 Monate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      achievement: "6 Monate ohne Schmerzen",
      rating: 5,
      stats: [
        { label: "Schmerzfreie Tage", value: "180+" },
        { label: "Mobilität", value: "+35%" },
        { label: "Lebensqualität", value: "+70%" }
      ]
    },
    {
      id: 6,
      name: "Jana F.",
      goal: "Gesünder ernähren ohne zu verzichten",
      category: "nutrition",
      before: {
        diet: "Wenig Protein, unausgewogen",
        quote: "Als Vegetarierin bekam ich immer die gleichen Standard-Ernährungspläne, die nicht zu mir passten."
      },
      after: {
        diet: "Ausgewogen & proteinreich",
        quote: "Die Ernährungstipps sind goldwert! Athly schlägt mir proteinreiche Mahlzeiten vor, die ich tatsächlich gerne esse – kein 08/15-Plan wie bei anderen Apps."
      },
      duration: "4 Monate",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      achievement: "Bessere Blutwerte",
      rating: 5,
      stats: [
        { label: "Energie", value: "+50%" },
        { label: "Proteinzufuhr", value: "+30%" },
        { label: "Neue Rezepte", value: "45+" }
      ]
    }
  ];
  
  // Erfolgsstatistiken
  const achievementStats = [
    {
      value: "87%",
      label: "mehr Konsequenz",
      description: "Nutzer trainieren regelmäßiger als mit herkömmlichen Apps"
    },
    {
      value: "3x",
      label: "längere Nutzung",
      description: "Athly-Nutzer bleiben durchschnittlich dreimal länger dabei"
    },
    {
      value: "92%",
      label: "Zielerreichung",
      description: "Der Großteil unserer Nutzer erreicht ihre persönlichen Fitnessziele"
    },
    {
      value: "4.9/5",
      label: "Bewertung",
      description: "Durchschnittliche Bewertung unserer Nutzer"
    }
  ];
  
  // Filter-Kategorien
  const categories = [
    { id: 'all', label: 'Alle Erfolge' },
    { id: 'weight-loss', label: 'Gewichtsverlust' },
    { id: 'muscle', label: 'Muskelaufbau' },
    { id: 'athletic', label: 'Sportliche Leistung' },
    { id: 'rehabilitation', label: 'Schmerzfreies Training' },
    { id: 'nutrition', label: 'Ernährung' },
    { id: 'postpartum', label: 'Nach Schwangerschaft' }
  ];
  
  // Testimonial-Karten für das Grid
  const TestimonialCard = ({ story, index }: { story: any, index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showBefore, setShowBefore] = useState(false);
    
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
          className="h-full bg-white border border-gray-100 rounded-xl flex flex-col"
          animate={{
            y: isHovered ? -5 : 0,
            boxShadow: isHovered ? "0 10px 30px rgba(138, 174, 57, 0.1)" : "0 2px 10px rgba(138, 174, 57, 0.05)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Header mit Before/After Toggle */}
          <div className="relative px-6 pt-6 pb-2">
            {/* Achievement Badge */}
            <div className="inline-block bg-[#8AAE39]/10 rounded-full px-3 py-1 text-xs font-medium text-[#8AAE39] mb-2">
              {story.achievement}
            </div>
            
            {/* Before/After Toggle */}
            <div className="absolute top-6 right-6 flex items-center bg-gray-100 rounded-full p-1 text-xs">
              <button
                className={`px-3 py-1 rounded-full ${!showBefore ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
                onClick={() => setShowBefore(false)}
              >
                Nach
              </button>
              <button
                className={`px-3 py-1 rounded-full ${showBefore ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
                onClick={() => setShowBefore(true)}
              >
                Vor
              </button>
            </div>
            
            {/* Author Info */}
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 mr-3">
                <motion.div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${story.image})` }}
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{story.name}</h4>
                <p className="text-sm text-gray-500">Ziel: {story.goal}</p>
              </div>
            </div>
          </div>
          
          {/* Content - Before/After Toggle */}
          <div className="px-6 flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={showBefore ? 'before' : 'after'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {showBefore ? (
                  <div>
                    <div className="text-gray-400 text-xs uppercase mb-1">Vor Athly</div>
                    <div className="mb-3">
                      {story.before.weight && (
                        <div className="flex items-center mb-1">
                          <svg className="w-4 h-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3C14.21 3 16 4.79 16 7S14.21 11 12 11 8 9.21 8 7 9.79 3 12 3M16 13.54C16 14.6 15.72 17.07 13.81 19.83L13 15L13.94 13.12C13.32 13.05 12.67 13 12 13S10.68 13.05 10.06 13.12L11 15L10.19 19.83C8.28 17.07 8 14.6 8 13.54C5.61 14.24 4 15.5 4 17V21H20V17C20 15.5 18.4 14.24 16 13.54Z" />
                          </svg>
                          <span className="text-gray-600 text-sm">{story.before.weight}</span>
                        </div>
                      )}
                      {story.before.fitness && (
                        <div className="flex items-center mb-1">
                          <svg className="w-4 h-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                          </svg>
                          <span className="text-gray-600 text-sm">{story.before.fitness}</span>
                        </div>
                      )}
                      {story.before.diet && (
                        <div className="flex items-center mb-1">
                          <svg className="w-4 h-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9Z" />
                          </svg>
                          <span className="text-gray-600 text-sm">{story.before.diet}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 italic text-sm">{story.before.quote}</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-[#8AAE39] text-xs uppercase mb-1">Mit Athly</div>
                    <div className="mb-3">
                      {story.after.weight && (
                        <div className="flex items-center mb-1">
                          <svg className="w-4 h-4 text-[#8AAE39] mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3C14.21 3 16 4.79 16 7S14.21 11 12 11 8 9.21 8 7 9.79 3 12 3M16 13.54C16 14.6 15.72 17.07 13.81 19.83L13 15L13.94 13.12C13.32 13.05 12.67 13 12 13S10.68 13.05 10.06 13.12L11 15L10.19 19.83C8.28 17.07 8 14.6 8 13.54C5.61 14.24 4 15.5 4 17V21H20V17C20 15.5 18.4 14.24 16 13.54Z" />
                          </svg>
                          <span className="text-gray-700 text-sm">{story.after.weight}</span>
                        </div>
                      )}
                      {story.after.fitness && (
                        <div className="flex items-center mb-1">
                          <svg className="w-4 h-4 text-[#8AAE39] mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                          </svg>
                          <span className="text-gray-700 text-sm">{story.after.fitness}</span>
                        </div>
                      )}
                      {story.after.diet && (
                        <div className="flex items-center mb-1">
                          <svg className="w-4 h-4 text-[#8AAE39] mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9Z" />
                          </svg>
                          <span className="text-gray-700 text-sm">{story.after.diet}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 italic text-sm">{story.after.quote}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Footer */}
          <div className="p-6 pt-4 border-t border-gray-100 mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    fill={i < story.rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`w-4 h-4 mr-1 ${i < story.rating ? "text-[#8AAE39]" : "text-gray-300"}`}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div className="text-xs text-gray-500">Zeitraum: {story.duration}</div>
            </div>
            
            {story.stats && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {story.stats.map((stat: { value: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; label: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, i: Key | null | undefined) => (
                  <div key={i} className="text-center">
                    <div className="text-sm font-bold text-[#8AAE39]">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };
  
  // Featured Transformation Card
  const FeaturedTransformation = ({ story }: { story: any }) => {
    const [flipped, setFlipped] = useState(false);
    
    return (
      <motion.div 
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative">
          {/* "Featured Erfolgsgeschichte" Banner */}
          <div className="absolute top-0 left-0 right-0 bg-[#8AAE39] text-white text-center text-sm py-1.5 font-medium">
            Herausragende Erfolgsgeschichte
          </div>
          
          <div className="pt-10 grid md:grid-cols-12 gap-0">
            {/* Left Column - Profile/Stats */}
            <div className="md:col-span-4 bg-gray-50 p-8 flex flex-col">
              <div className="mx-auto md:mx-0 text-center md:text-left mb-8">
                <motion.div 
                  className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto md:mx-0 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${story.image})` }}
                  />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                <div className="inline-block bg-[#8AAE39]/10 rounded-full px-3 py-1 text-xs font-medium text-[#8AAE39] mt-1">
                  {story.goal}
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex">
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
                <div className="text-sm text-gray-500">Zeitraum: {story.duration}</div>
              </div>
              
              {/* Key Metrics */}
              <div className="space-y-4 mt-4">
                {story.stats.map((stat: { label: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; value: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                      <span className="text-sm font-bold text-[#8AAE39]">{stat.value}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#8AAE39] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${60 + index * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + (index * 0.2) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto pt-8">
                <button
                  onClick={() => setFlipped(!flipped)}
                  className="w-full py-3 rounded-lg border border-[#8AAE39] text-[#8AAE39] font-medium hover:bg-[#8AAE39]/5 transition-colors duration-300 flex items-center justify-center"
                >
                  <span>{flipped ? "Erfolgsgeschichte ansehen" : "Vorher/Nachher vergleichen"}</span>
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div className="md:col-span-8 p-8 flex items-center">
              <AnimatePresence mode="wait">
                {flipped ? (
                  <motion.div
                    key="comparison"
                    initial={{ opacity: 0, rotateY: -20 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Vorher / Nachher Vergleich</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Before Column */}
                      <div className="bg-gray-50 rounded-xl p-6 relative">
                        <div className="absolute top-0 left-0 bg-gray-600 text-white text-xs font-medium py-1 px-3 rounded-br-lg rounded-tl-lg">
                          VORHER
                        </div>
                        <div className="mt-6 space-y-4">
                          {story.before.weight && (
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-gray-200 mr-3 mt-1">
                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 3C14.21 3 16 4.79 16 7S14.21 11 12 11 8 9.21 8 7 9.79 3 12 3M16 13.54C16 14.6 15.72 17.07 13.81 19.83L13 15L13.94 13.12C13.32 13.05 12.67 13 12 13S10.68 13.05 10.06 13.12L11 15L10.19 19.83C8.28 17.07 8 14.6 8 13.54C5.61 14.24 4 15.5 4 17V21H20V17C20 15.5 18.4 14.24 16 13.54Z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">Gewicht</div>
                                <div className="text-gray-600">{story.before.weight}</div>
                              </div>
                            </div>
                          )}
                          {story.before.fitness && (
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-gray-200 mr-3 mt-1">
                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">Fitness-Level</div>
                                <div className="text-gray-600">{story.before.fitness}</div>
                              </div>
                            </div>
                          )}
                          {story.before.diet && (
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-gray-200 mr-3 mt-1">
                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9Z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">Ernährung</div>
                                <div className="text-gray-600">{story.before.diet}</div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <blockquote className="italic text-gray-600">
                            "{story.before.quote}"
                          </blockquote>
                        </div>
                      </div>
                      
                      {/* After Column */}
                      <div className="bg-[#8AAE39]/5 rounded-xl p-6 relative">
                        <div className="absolute top-0 left-0 bg-[#8AAE39] text-white text-xs font-medium py-1 px-3 rounded-br-lg rounded-tl-lg">
                          NACHHER
                        </div>
                        <div className="mt-6 space-y-4">
                          {story.after.weight && (
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-[#8AAE39]/20 mr-3 mt-1">
                                <svg className="w-4 h-4 text-[#8AAE39]" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 3C14.21 3 16 4.79 16 7S14.21 11 12 11 8 9.21 8 7 9.79 3 12 3M16 13.54C16 14.6 15.72 17.07 13.81 19.83L13 15L13.94 13.12C13.32 13.05 12.67 13 12 13S10.68 13.05 10.06 13.12L11 15L10.19 19.83C8.28 17.07 8 14.6 8 13.54C5.61 14.24 4 15.5 4 17V21H20V17C20 15.5 18.4 14.24 16 13.54Z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">Gewicht</div>
                                <div className="text-gray-700">{story.after.weight}</div>
                              </div>
                            </div>
                          )}
                          {story.after.fitness && (
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-[#8AAE39]/20 mr-3 mt-1">
                                <svg className="w-4 h-4 text-[#8AAE39]" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">Fitness-Level</div>
                                <div className="text-gray-700">{story.after.fitness}</div>
                              </div>
                            </div>
                          )}
                          {story.after.diet && (
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-[#8AAE39]/20 mr-3 mt-1">
                                <svg className="w-4 h-4 text-[#8AAE39]" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9Z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">Ernährung</div>
                                <div className="text-gray-700">{story.after.diet}</div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-6 pt-6 border-t border-[#8AAE39]/20">
                          <blockquote className="italic text-gray-700">
                            "{story.after.quote}"
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="story"
                    initial={{ opacity: 0, rotateY: 20 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-[#8AAE39]/20 text-7xl font-serif absolute top-8 right-8">&quot;</div>
                    <div className="relative">
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Die Transformation</h3>
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {story.after.quote}
                        </p>
                      </div>
                      
                      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Der Athly-Effekt:</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="p-1.5 rounded-full bg-[#8AAE39]/10 text-[#8AAE39] mr-3 mt-0.5">
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" />
                              </svg>
                            </div>
                            <div className="text-gray-700">Personalisierte Pläne, die sich mit dem Fortschritt anpassen</div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-1.5 rounded-full bg-[#8AAE39]/10 text-[#8AAE39] mr-3 mt-0.5">
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" />
                              </svg>
                            </div>
                            <div className="text-gray-700">24/7 Motivation und Unterstützung durch den KI-Coach</div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-1.5 rounded-full bg-[#8AAE39]/10 text-[#8AAE39] mr-3 mt-0.5">
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" />
                              </svg>
                            </div>
                            <div className="text-gray-700">Kontinuierliche Anpassung an Alltag und Lebensstil</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  
  // Statistik-Karte
  const StatCard = ({ stat, index }: { stat: any, index: number }) => {
    return (
      <motion.div 
        className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
        whileHover={{ 
          y: -5, 
          boxShadow: "0 15px 30px rgba(138, 174, 57, 0.15)",
          transition: { duration: 0.2 }
        }}
      >
        <div className="relative z-10">
          <div className="text-3xl md:text-4xl font-bold text-[#8AAE39] mb-2">{stat.value}</div>
          <div className="flex items-center mb-3">
            <div className="h-1 w-10 bg-[#8AAE39]/30 rounded-full"></div>
            <div className="h-1 w-5 bg-[#8AAE39]/10 rounded-full ml-1"></div>
          </div>
          <div className="font-medium text-gray-800 mb-1">{stat.label}</div>
          <p className="text-sm text-gray-500">{stat.description}</p>
        </div>
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#8AAE39]/5 rounded-full -mr-8 -mt-8"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#8AAE39]/5 rounded-full -mr-4 -mb-4"></div>
      </motion.div>
    );
  };

  return (
    <section 
      ref={containerRef}
      id="testimonials" 
      className="py-20 relative overflow-hidden"
    >
      {/* Hintergrund-Elemente */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white">
        <motion.div 
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#8AAE39]/5 blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-[#8AAE39]/5 blur-3xl"
          style={{ y: y2 }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-6">
          {/* Category Label */}
          <motion.div 
            className="inline-block bg-[#8AAE39]/10 text-[#8AAE39] text-sm font-medium px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            ECHTE ERGEBNISSE
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Transformationsgeschichten<br />
            <span className="text-[#8AAE39] relative">
              unserer Mitglieder
              <motion.div 
                className="absolute bottom-0 left-0 h-[3px] bg-[#8AAE39]/20 w-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.7 }}
              />
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Entdecke, wie echte Menschen mit Athly ihre Fitness-Ziele erreicht haben – mit personalisierten Plänen und ihrem persönlichen KI-Coach.
          </motion.p>
        </div>
        
        {/* Achievements/Stats Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievementStats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
        
        {/* Featured Transformation */}
        <div className="mb-16">
          <FeaturedTransformation 
            story={transformationStories.find(story => story.id === (featuredStory === 0 ? 1 : 4))} 
          />
          
          {/* Next/Previous Featured Navigation */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setFeaturedStory(0)}
              className={`w-3 h-3 rounded-full mx-1 transition-colors ${featuredStory === 0 ? 'bg-[#8AAE39]' : 'bg-gray-300'}`}
            />
            <button 
              onClick={() => setFeaturedStory(1)}
              className={`w-3 h-3 rounded-full mx-1 transition-colors ${featuredStory === 1 ? 'bg-[#8AAE39]' : 'bg-gray-300'}`}
            />
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                  activeTab === category.id
                    ? 'bg-[#8AAE39] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Testimonial Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformationStories
              .filter(story => activeTab === 'all' || story.category === activeTab)
              .map((story, index) => (
                <TestimonialCard key={story.id} story={story} index={index} />
              ))}
          </div>
        </div>
        
        {/* Social Proof CTA */}
        <div className="max-w-4xl mx-auto mt-20">
          <motion.div 
            className="relative overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#8AAE39] to-[#9abe4a] z-0"></div>
            <div className="absolute inset-0 opacity-10 z-0">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="cta-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20H40M20 0V40" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-pattern)" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-10 md:p-12 text-center">
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Beginne heute deine eigene Erfolgsgeschichte
              </motion.h3>
              
              <motion.p 
                className="text-white/90 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Schließe dich tausenden von zufriedenen Nutzern an, die mit ihrem persönlichen KI-Coach ihre Fitnessziele erreichen.
              </motion.p>
              
              <motion.button
                className="bg-white text-[#8AAE39] px-8 py-3.5 rounded-lg font-medium shadow-md group relative overflow-hidden inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ 
                  y: -3,
                  boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ y: 0 }}
              >
                {/* Subtle shine effect */}
                <span className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-[#8AAE39]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                <span className="relative z-10 flex items-center">
                  Deinen persönlichen Coach sichern
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