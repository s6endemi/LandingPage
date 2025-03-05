"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export function EnhancedSocialProofSection() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');
  const [featuredStory, setFeaturedStory] = useState(0);
  
  // Parallax-Effekt für Hintergrund-Elemente
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Transformations-Erfolgsgeschichten - reduziert und vereinfacht
  const transformationStories = [
    {
      id: 1,
      name: "Michael K., 34",
      goal: "Halbmarathon-Vorbereitung",
      category: "athletic",
      before: "Ich hatte schon so viele Fitness-Apps probiert, aber keine hat mich wirklich motiviert dranzubleiben.",
      after: "Mit Athly habe ich nicht nur 12kg abgenommen, sondern eine völlig neue Beziehung zum Sport entwickelt.",
      duration: "8 Monate",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      achievement: "Von 0 auf Halbmarathon",
      featured: true
    },
    {
      id: 2,
      name: "Sophia M., 29",
      goal: "Mehr Energie im Alltag",
      category: "weight-loss",
      before: "Ich habe mich in meinem Körper nicht mehr wohlgefühlt und wusste nicht, wo ich anfangen sollte.",
      after: "Mein KI-Coach passt meine Pläne perfekt an. Ich habe 8kg abgenommen und fühle mich voller Energie.",
      duration: "3 Monate",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      achievement: "Neue Lebensenergie"
    },
    {
      id: 3,
      name: "Thomas W., 31",
      goal: "Muskelaufbau",
      category: "muscle",
      before: "Im Fitnessstudio fühlte ich mich immer verloren und habe kaum Fortschritte gemacht.",
      after: "Die persönlichen Gespräche mit meinem KI-Coach geben mir genau den Push, den ich brauche. +4kg Muskelmasse in 5 Monaten.",
      duration: "5 Monate",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      achievement: "Sichtbare Resultate"
    },
    {
      id: 4,
      name: "Lisa K., 36",
      goal: "Nach Schwangerschaft",
      category: "postpartum",
      before: "Als Mutter von zwei Kindern dachte ich, ich müsste meine Fitness-Ziele aufgeben.",
      after: "Athly passt sich flexibel meinem Alltag an, ohne dass ich mich schuldig fühle, wenn der Familienalltag dazwischenkommt.",
      duration: "6 Monate",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      achievement: "Starke Mutter",
      featured: true
    },
    {
      id: 5,
      name: "Markus B., 42",
      goal: "Training trotz Verletzung",
      category: "rehabilitation",
      before: "Nach meiner Knie-OP hat mir kein Trainer helfen können, schmerzfrei zu trainieren.",
      after: "Mein Athly-Coach erinnert sich an alles. Wenn ich von Knieschmerzen berichte, wird es in allen Plänen berücksichtigt.",
      duration: "6 Monate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      achievement: "Schmerzfrei aktiv"
    },
    {
      id: 6,
      name: "Jana F., 27",
      goal: "Gesündere Ernährung",
      category: "nutrition",
      before: "Als Vegetarierin bekam ich immer die gleichen Standard-Ernährungspläne, die nicht zu mir passten.",
      after: "Die Ernährungstipps sind goldwert! Athly schlägt mir Mahlzeiten vor, die ich tatsächlich gerne esse.",
      duration: "4 Monate",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      achievement: "Nachhaltige Ernährung"
    }
  ];
  
  // Erfolgsstatistiken - vereinfacht
  const achievementStats = [
    {
      value: "87%",
      label: "mehr Konsequenz",
      description: "Nutzer trainieren regelmäßiger als mit herkömmlichen Apps"
    },
    {
      value: "92%",
      label: "Zielerreichung",
      description: "Der Großteil unserer Nutzer erreicht ihre persönlichen Fitnessziele"
    },
    {
      value: "4.9/5",
      label: "Bewertung",
      description: "Durchschnittliche Bewertung unserer App im App Store"
    }
  ];
  
  // Filter-Kategorien - reduziert
  const categories = [
    { id: 'all', label: 'Alle Erfolge' },
    { id: 'weight-loss', label: 'Gewichtsverlust' },
    { id: 'muscle', label: 'Muskelaufbau' },
    { id: 'athletic', label: 'Sportliche Leistung' },
    { id: 'rehabilitation', label: 'Rehabilitation' },
    { id: 'nutrition', label: 'Ernährung' }
  ];

  return (
    <section 
      ref={containerRef}
      id="testimonials" 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hintergrund-Element */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#8AAE39]/5 blur-3xl"
          style={{ y: y1 }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header - größer und eleganter */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div 
            className="inline-block bg-[#8AAE39]/10 text-[#8AAE39] text-sm font-medium px-5 py-2 rounded-full mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            ECHTE ERFOLGSGESCHICHTEN
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Von echten Menschen,<br />
            <span className="text-[#8AAE39] relative">
              echte Resultate
              <motion.div 
                className="absolute bottom-0 left-0 h-[3px] bg-[#8AAE39]/30 w-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.7 }}
              />
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Entdecke, wie Menschen mit Athly ihre Fitness-Ziele erreichen – mit personalisierten Plänen 
            und ihrem persönlichen KI-Coach an ihrer Seite.
          </motion.p>
          <motion.div
            className="mt-8 max-w-3xl mx-auto bg-[#8AAE39]/5 rounded-xl p-4 border border-[#8AAE39]/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-[#8AAE39] font-medium text-lg text-center">
              Deine Fitnessziele zu erreichen ist kein Sprint, sondern ein Marathon. Wir begleiten dich bei jedem Schritt.
            </p>
          </motion.div>
        </div>
        
        {/* Achievements/Stats Section - eleganter und minimalistischer */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {achievementStats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
        
        {/* Featured Transformation - größer und fokussierter */}
        <div className="mb-20">
          <FeaturedTransformation 
            story={transformationStories.find(story => story.id === (featuredStory === 0 ? 1 : 4))} 
          />
          
          {/* Next/Previous Featured Navigation */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => setFeaturedStory(0)}
              className={`w-3 h-3 rounded-full mx-2 transition-colors ${featuredStory === 0 ? 'bg-[#8AAE39]' : 'bg-gray-300'}`}
              aria-label="Erste Erfolgsgeschichte anzeigen"
            />
            <button 
              onClick={() => setFeaturedStory(1)}
              className={`w-3 h-3 rounded-full mx-2 transition-colors ${featuredStory === 1 ? 'bg-[#8AAE39]' : 'bg-gray-300'}`}
              aria-label="Zweite Erfolgsgeschichte anzeigen"
            />
          </div>
        </div>
        
        {/* Category Filter - eleganter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === category.id
                    ? 'bg-[#8AAE39] text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#8AAE39]/30'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Testimonial Grid - größer und eleganter */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transformationStories
              .filter(story => activeTab === 'all' || story.category === activeTab)
              .map((story, index) => (
                <TestimonialCard key={story.id} story={story} index={index} />
              ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}

// Neu gestaltete Komponenten für ein eleganteres Look & Feel

const StatCard = ({ stat, index }) => (
  <motion.div 
    className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
    whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(138, 174, 57, 0.1)" }}
  >
    <div className="relative z-10">
      <div className="text-4xl md:text-5xl font-bold text-[#8AAE39] mb-3 group-hover:scale-105 transition-transform duration-300">{stat.value}</div>
      <div className="flex items-center mb-4">
        <div className="h-1 w-16 bg-[#8AAE39]/30 rounded-full"></div>
      </div>
      <div className="font-medium text-xl text-gray-800 mb-2">{stat.label}</div>
      <p className="text-gray-600">{stat.description}</p>
    </div>
    
    {/* Minimalistisches dekoratives Element */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#8AAE39]/5 rounded-full -mr-10 -mt-10 group-hover:bg-[#8AAE39]/10 transition-colors duration-300"></div>
  </motion.div>
);

const TestimonialCard = ({ story, index }) => {
  const [showBefore, setShowBefore] = useState(false);
  
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div 
        className="h-full bg-white border border-gray-100 rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header mit Profilbild */}
        <div className="relative p-8 pb-6">
          {/* Achievement Badge */}
          <div className="inline-block bg-[#8AAE39]/10 rounded-full px-4 py-1.5 text-sm font-medium text-[#8AAE39] mb-3">
            {story.achievement}
          </div>
          
          {/* Autor-Info - minimalistischer und eleganter */}
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm mr-4">
              <motion.div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${story.image})` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-900">{story.name}</h4>
              <p className="text-gray-500">{story.goal}</p>
            </div>
          </div>
          
          {/* Before/After Toggle - minimalistisch und elegant */}
          <div className="flex mb-2 border-b border-gray-100 pb-1">
            <button
              className={`mr-4 py-2 text-sm font-medium relative ${!showBefore ? 'text-[#8AAE39]' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setShowBefore(false)}
            >
              Mit Athly
              {!showBefore && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8AAE39]"></span>}
            </button>
            <button
              className={`py-2 text-sm font-medium relative ${showBefore ? 'text-[#8AAE39]' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setShowBefore(true)}
            >
              Vorher
              {showBefore && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8AAE39]"></span>}
            </button>
          </div>
        </div>
        
        {/* Content - eleganter und fokussierter */}
        <div className="px-8 pb-8 flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={showBefore ? 'before' : 'after'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <div className="mb-6 flex-grow">
                <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                  &quot;{showBefore ? story.before : story.after}&quot;
                </blockquote>
              </div>
              
              <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                <span>Zeitraum: {story.duration}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 ml-1 text-[#8AAE39]"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeaturedTransformation = ({ story }) => {
  const [flipped, setFlipped] = useState(false);
  
  return (
    <motion.div 
      className="max-w-6xl mx-auto bg-white rounded-2xl shadow overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative">
        {/* "Featured" Banner - eleganter */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#8AAE39] to-[#97bc41] text-white text-center text-sm py-2 font-medium">
          Herausragende Erfolgsgeschichte
        </div>
        
        <div className="pt-12 grid md:grid-cols-2 gap-0">
          {/* Left Column - eleganter und fokussierter */}
          <div className="p-10 bg-gray-50 flex flex-col">
            <div className="mx-auto md:mx-0 text-center md:text-left mb-8">
              <motion.div 
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow mx-auto md:mx-0 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${story.image})` }}
                />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{story.name}</h3>
              <div className="inline-block bg-[#8AAE39]/10 rounded-full px-4 py-1.5 text-sm font-medium text-[#8AAE39]">
                {story.goal}
              </div>
            </div>
            
            <div className="mt-auto pt-6">
              <button
                onClick={() => setFlipped(!flipped)}
                className="w-full py-4 rounded-lg text-[#8AAE39] font-medium bg-white border border-[#8AAE39] hover:bg-[#8AAE39]/5 transition-colors duration-300 flex items-center justify-center"
              >
                <span>{flipped ? "Erfolgsgeschichte ansehen" : "Vorher/Nachher vergleichen"}</span>
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Right Column - eleganter und fokussierter */}
          <div className="p-10 flex items-center">
            <AnimatePresence mode="wait">
              {flipped ? (
                <motion.div
                  key="comparison"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div className="grid grid-cols-1 gap-8">
                    {/* Before */}
                    <div className="bg-gray-50 rounded-2xl p-6 relative">
                      <div className="absolute top-0 left-0 bg-gray-600 text-white text-xs font-medium py-1 px-3 rounded-br-lg rounded-tl-lg">
                        VORHER
                      </div>
                      <div className="pt-6">
                        <blockquote className="text-xl text-gray-600 italic leading-relaxed mt-4">
                          &quot;{story.before}&quot;
                        </blockquote>
                      </div>
                    </div>
                    
                    {/* After */}
                    <div className="bg-[#8AAE39]/5 rounded-2xl p-6 relative">
                      <div className="absolute top-0 left-0 bg-[#8AAE39] text-white text-xs font-medium py-1 px-3 rounded-br-lg rounded-tl-lg">
                        NACHHER
                      </div>
                      <div className="pt-6">
                        <blockquote className="text-xl text-gray-700 italic leading-relaxed mt-4">
                          &quot;{story.after}&quot;
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="story"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-[#8AAE39]/20 text-8xl font-serif absolute top-10 right-10">&quot;</div>
                  <div className="relative">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Die Transformation</h3>
                      <p className="text-xl text-gray-700 leading-relaxed">
                        {story.after}
                      </p>
                    </div>
                    
                    <div className="mt-10 bg-[#8AAE39]/5 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Der Athly-Effekt:</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="p-2 rounded-full bg-[#8AAE39]/20 text-[#8AAE39] mr-3 mt-0.5">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" />
                            </svg>
                          </div>
                          <div className="text-gray-700">Personalisierte Pläne, die sich mit dem Fortschritt anpassen</div>
                        </div>
                        <div className="flex items-start">
                          <div className="p-2 rounded-full bg-[#8AAE39]/20 text-[#8AAE39] mr-3 mt-0.5">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" />
                            </svg>
                          </div>
                          <div className="text-gray-700">Kontinuierliche Anpassung an deinen Alltag</div>
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

