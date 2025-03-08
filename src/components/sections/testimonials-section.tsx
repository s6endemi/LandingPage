"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export function ModernTestimonialSection() {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  
  // Farbpalette entsprechend der Design-Vorgaben - reduziert für mehr Konsistenz
  const colors = {
    primary: "#9bc539",     // Frisches Grün als Hauptfarbe
    blue: "#3498db",        // Akzent Blau
    yellow: "#FBBF24",      // Gelb für Sterne
    dark: "#2d3748",        // Dunkler Text für Überschriften
    gray: "#4a5568",        // Grau für Fließtext
  };
  
  // Parallax-Effekt für Hintergrund-Elemente
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Transformations-Erfolgsgeschichten
  const successStories = [
    {
      id: 1,
      name: "Michael K., 34",
      headline: "Von 0 auf Halbmarathon in 8 Monaten",
      category: "athletic",
      story: "Mit Athly habe ich meine persönlichen Grenzen neu definiert. Noch vor einem Jahr war ich außer Atem nach einem kurzen Sprint zur Bahn. Heute bereite ich mich auf meinen ersten Halbmarathon vor und fühle mich stärker als je zuvor.",
      quote: "Athly passt sich meinem Leben an, nicht andersherum. Das macht den Unterschied.",
      achievement: ["12kg Gewichtsverlust", "5km in unter 25 Min", "Verbesserte Ausdauer"],
      duration: "8 Monate",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      id: 2,
      name: "Sophia M., 29",
      headline: "Mehr Energie und 8kg leichter",
      category: "weight-loss",
      story: "Mein Alltag war von ständiger Müdigkeit geprägt. Nach so vielen gescheiterten Diäten glaubte ich nicht mehr daran, mein Wunschgewicht zu erreichen. Mit Athly fand ich endlich einen Weg, der zu mir passt – ohne strenge Verbote, mit gesunder Ernährung und einem Plan, der sich an mein Leben anpasst.",
      quote: "Kein Gefühl des Verzichts mehr. Ich esse was ich mag und habe trotzdem abgenommen.",
      achievement: ["8kg Gewichtsverlust", "Besserer Schlaf", "Mehr Selbstvertrauen"],
      duration: "3 Monate",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      id: 3,
      name: "Thomas W., 31",
      headline: "+4kg Muskelmasse und endlich Definition",
      category: "muscle",
      story: "Jahrelang habe ich auf eigene Faust trainiert, mit mäßigem Erfolg. Mit Athly bekam ich endlich einen strukturierten Plan, der mich gezielt auf mein Ziel hinführt: mehr Muskeln, weniger Körperfett. Die KI-Anpassung an meine Fortschritte sorgt dafür, dass ich immer gefordert, aber nie überfordert bin.",
      quote: "Der virtuelle Trainer weiß genau, wann er mich pushen und wann er mir eine Pause gönnen muss.",
      achievement: ["+4kg Muskelmasse", "Niedrigerer Körperfettanteil", "Bessere Kraftwerte"],
      duration: "5 Monate",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      id: 4,
      name: "Lisa K., 36",
      headline: "Fitness nach der Schwangerschaft",
      category: "postpartum",
      story: "Nach der Geburt meines zweiten Kindes hatte ich das Gefühl, meinen Körper nicht wiederzuerkennen. Athly hat mir geholfen, langsam und sicher wieder in Form zu kommen. Das Beste: Die Workouts passen sich meinem chaotischen Alltag als Mutter an – sei es ein 15-Minuten-Training während des Mittagsschlafs oder längere Einheiten am Wochenende.",
      quote: "Endlich ein Programm, das versteht, dass Mütter flexible Lösungen brauchen.",
      achievement: ["Wiederaufbau der Rumpfmuskulatur", "Mehr Energie für den Alltag", "Gesteigerte Flexibilität"],
      duration: "6 Monate",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      id: 5,
      name: "Markus B., 42",
      headline: "Training trotz Knieverletzung",
      category: "rehabilitation",
      story: "Nach meiner Knie-OP sagten mir die Ärzte, ich könne nie wieder richtig trainieren. Mit Athly fand ich einen Weg, meine Fitness trotz Einschränkungen zu verbessern. Die KI berücksichtigt meine Verletzungsgeschichte und passt jede Übung an meine Möglichkeiten an. Das Ergebnis: schmerzfreies Training und eine Verbesserung, die ich nicht für möglich gehalten hätte.",
      quote: "Athly erinnert sich an alles. Wenn ich über Schmerzen berichte, wird jede Übung angepasst.",
      achievement: ["Schmerzfreies Training", "Verbesserte Mobilität", "Gesteigerte Muskelkraft"],
      duration: "6 Monate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      id: 6,
      name: "Jana F., 27",
      headline: "Gesunde Ernährung als Vegetarierin",
      category: "nutrition",
      story: "Als Vegetarierin bekam ich bei anderen Apps immer die gleichen langweiligen Gerichte vorgeschlagen. Athly versteht meine Ernährungspräferenzen und kreiert abwechslungsreiche, leckere Mahlzeiten, die zu meinem Lebensstil passen. Seit ich die Ernährungspläne befolge, habe ich mehr Energie und fühle mich rundum wohler.",
      quote: "Keine generischen Pläne mehr – Athly schlägt mir Gerichte vor, die ich wirklich gerne esse.",
      achievement: ["Ausgewogene vegetarische Ernährung", "Stabile Energielevel", "Verbesserte Hautqualität"],
      duration: "4 Monate",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      rating: 4
    }
  ];
  
  // Erfolgsstatistiken
  
  // Kategorien für Filter
  const categories = [
    { id: 'all', label: 'Alle Erfolge' },
    { id: 'weight-loss', label: 'Gewichtsverlust' },
    { id: 'muscle', label: 'Muskelaufbau' },
    { id: 'athletic', label: 'Sportliche Leistung' },
    { id: 'rehabilitation', label: 'Rehabilitation' },
    { id: 'nutrition', label: 'Ernährung' },
    { id: 'postpartum', label: 'Nach Schwangerschaft' }
  ];

  // Setze wahr, wenn ein Detail-Modal geöffnet ist
  const isModalOpen = selectedStory !== null;
  
  // Schließe das Detail-Modal
  const closeModal = () => setSelectedStory(null);

  // Finde die aktuell ausgewählte Story für das Modal
  const selectedStoryData = selectedStory !== null 
    ? successStories.find(story => story.id === selectedStory) 
    : null;

  return (
    <section 
      ref={containerRef}
      id="testimonials" 
      className="py-24 relative overflow-hidden bg-white font-inter"
      style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"' }}
    >
      {/* Subtiler Hintergrund */}
      <div className="absolute inset-0 -z-10 bg-gray-50/30"></div>
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-green-50 opacity-30 blur-3xl"
          style={{ y: y1 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Modern Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div 
            className="inline-block px-4 py-1.5 rounded-full mb-4 text-sm font-medium"
            style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            ATHLY ERFOLGSGESCHICHTEN
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-semibold mb-6 text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            REALE MENSCHEN<br />MESSBARE ERFOLGE
          </motion.h2>
          
          <motion.div
            className="w-24 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Entdecke, wie Athly das Leben und die Fitness unserer Nutzer verändert hat. Jede dieser Geschichten zeigt die Kraft personalisierter KI-Coaching-Pläne.
          </motion.p>
        </div>
        
        
        {/* Featured Success Story */}
        <motion.div 
          className="mb-24 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <FeaturedStory story={successStories[0]} colors={colors} />
        </motion.div>
        
        {/* Filter Categories */}
        <div className="mb-16">
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
                style={{ 
                  backgroundColor: activeCategory === category.id 
                    ? '#374151' // Elegantes Anthrazit
                    : ''
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
        
        {/* Success Stories Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories
              .filter(story => activeCategory === 'all' || story.category === activeCategory)
              .map((story, index) => (
                <SuccessStoryCard 
                  key={story.id} 
                  story={story} 
                  index={index}
                  colors={colors}
                  categories={categories}
                  onClick={() => setSelectedStory(story.id)}
                />
              ))}
          </div>
        </div>
        
      </div>

      {/* Detail-Modal - erscheint nur, wenn eine Story ausgewählt ist */}
      <AnimatePresence>
        {isModalOpen && selectedStoryData && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <StoryDetailModal story={selectedStoryData} colors={colors} onClose={closeModal} categories={categories} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Modern Key Metric Card
const MetricCard = ({ metric, index, primaryColor }) => (
  <motion.div 
    className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
    whileHover={{ y: -5 }}
  >
    {/* Subtle decoration */}
    <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300 bg-gray-100"></div>
    
    <div className="flex items-start mb-4">
      <div className="mr-4 opacity-80 text-primary-600" style={{ color: primaryColor }}>
        {metric.icon}
      </div>
    </div>
    
    <div className="mb-6">
      <div 
        className="text-4xl md:text-5xl font-semibold mb-2 group-hover:scale-105 origin-left transition-transform duration-300"
        style={{ color: primaryColor }}
      >
        {metric.value}
      </div>
      <h3 className="text-xl font-medium text-gray-900">{metric.title}</h3>
    </div>
    
    <p className="text-gray-600 leading-relaxed">{metric.description}</p>
  </motion.div>
);

// Featured Success Story Component
const FeaturedStory = ({ story, colors }) => {
  const [showMore, setShowMore] = useState(false);
  
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Left Column - Image */}
        <div className="relative h-full min-h-[300px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${story.image})` }}
          />
          <div 
            className="absolute inset-0 bg-black/50"
          />
          
          {/* Content Overlay */}
          <div className="relative h-full flex flex-col justify-end p-8 text-white">
            <div 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 backdrop-blur-sm bg-white/10 border border-white/20"
            >
              HERAUSRAGENDE ERFOLGSGESCHICHTE
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-2">{story.name}</h3>
            <p className="text-lg md:text-xl font-medium opacity-90">{story.headline}</p>
          </div>
        </div>
        
        {/* Right Column - Content */}
        <div className="p-8 md:p-10 flex flex-col">
          <div className="text-gray-500 mb-4 text-sm font-medium">
            Zeitraum: {story.duration}
          </div>
          
          <div className="mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={showMore ? "full" : "preview"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700 leading-relaxed mb-4">
                  {showMore ? story.story : `${story.story.substring(0, 150)}...`}
                </p>
                <button 
                  onClick={() => setShowMore(!showMore)}
                  className="text-sm font-medium inline-flex items-center group"
                  style={{ color: colors.primary }}
                >
                  <span>{showMore ? "Weniger anzeigen" : "Weiterlesen"}</span>
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Quote */}
          <div 
            className="p-5 rounded-xl mb-8 relative border bg-gray-50"
            style={{ borderColor: `${colors.primary}30` }}
          >
            <div 
              className="absolute top-3 left-3 text-5xl opacity-10"
              style={{ color: colors.primary }}
            >
              "
            </div>
            <blockquote className="text-lg italic text-gray-700 pl-4 relative z-10">
              "{story.quote}"
            </blockquote>
          </div>
          
          {/* Achievements */}
          <div className="mt-auto">
            <h4 className="text-gray-900 font-medium mb-3">Erfolge:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {story.achievement.map((item: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: React.Key | null | undefined) => (
                <div 
                  key={i}
                  className="flex items-center py-2 px-3 rounded-lg bg-gray-50"
                  style={{ backgroundColor: `${colors.primary}10` }}
                >
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                    style={{ 
                      backgroundColor: `${colors.primary}20`,
                      color: colors.primary
                    }}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Success Story Card
const SuccessStoryCard = ({ story, index, colors, categories, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={onClick}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <div 
          className="h-48 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url(${story.image})` }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent"
        />
        
        <div 
          className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-white/10 border border-white/20 text-white"
        >
          {categories.find((c: { id: any; }) => c.id === story.category)?.label || story.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.name}</h3>
        <p 
          className="font-medium mb-3 text-sm"
          style={{ color: colors.primary }}
        >
          {story.headline}
        </p>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{story.story}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {story.duration}
          </div>
          
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                fill={i < story.rating ? "currentColor" : "none"}
                stroke={i < story.rating ? "none" : "currentColor"}
                className="w-4 h-4 ml-0.5"
                style={{ color: colors.yellow }}
              >
                <path strokeWidth={1.5} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <button 
            className="text-sm font-medium inline-flex items-center group"
            style={{ color: '#64748b' }} // Elegantes Slate-Grau
          >
            <span>Details ansehen</span>
            <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Detailed Story Modal
const StoryDetailModal = ({ story, colors, onClose, categories }) => {
  return (
    <div className="flex flex-col max-h-[90vh]">
      {/* Modal Header */}
      <div className="relative">
        <div 
          className="h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${story.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          onClick={onClose}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Header content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div 
            className="inline-block px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-white/10 border border-white/20 mb-3"
          >
            {categories.find((c: { id: any; }) => c.id === story.category)?.label || story.category}
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">{story.name}</h3>
          <p className="text-lg font-medium opacity-90">{story.headline}</p>
        </div>
      </div>
      
      {/* Modal Body */}
      <div className="p-6 overflow-y-auto">
        <div className="mb-6">
          <div className="text-gray-500 mb-4 text-sm font-medium">
            Zeitraum: {story.duration}
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-6">{story.story}</p>
          
          {/* Quote */}
          <div 
            className="p-5 rounded-xl mb-8 relative border bg-gray-50"
            style={{ borderColor: `${colors.primary}30` }}
          >
            <div 
              className="absolute top-3 left-3 text-5xl opacity-10"
              style={{ color: colors.primary }}
            >
              "
            </div>
            <blockquote className="text-lg italic text-gray-700 pl-4 relative z-10">
              "{story.quote}"
            </blockquote>
          </div>
        </div>
        
        {/* Star Rating */}
        <div className="flex items-center mb-6">
          <span className="text-sm text-gray-700 mr-2">Bewertung:</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                fill={i < story.rating ? "currentColor" : "none"}
                stroke={i < story.rating ? "none" : "currentColor"}
                className="w-5 h-5 mr-0.5"
                style={{ color: colors.yellow }}
              >
                <path strokeWidth={1.5} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </div>
        
        {/* Achievements */}
        <div>
          <h4 className="text-gray-900 font-medium mb-3">Erreichte Ziele:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {story.achievement.map((item: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: React.Key | null | undefined) => (
              <div 
                key={i}
                className="flex items-center py-2.5 px-4 rounded-lg bg-gray-50"
                style={{ backgroundColor: `${colors.primary}10` }}
              >
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                  style={{ 
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary
                  }}
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call To Action */}
        <div className="mt-6 text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-gray-700 mb-4">
            Bereit für deine eigene Erfolgsgeschichte mit Athly?
          </p>
                          <button
                  className="inline-flex items-center text-white font-medium rounded-lg px-6 py-3 shadow-md group bg-gradient-to-r from-gray-700 to-gray-800"
                >
                  <span>Kostenlos starten</span>
                  <svg 
                    className="ml-2 w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
        </div>
      </div>
    </div>
  );
};