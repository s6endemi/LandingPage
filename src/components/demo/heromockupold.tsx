"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HeroMockupAnimation() {
  // State für die aktuelle Szene in der Animation
  const [currentScene, setCurrentScene] = useState(0);
  
  // Animation alle 5 Sekunden wechseln
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % 4);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Szenen der Animation
  const scenes = [
    // Szene 1: Begrüßung und Zielerfassung
    <WelcomeScene key="welcome" />,
    
    // Szene 2: Personalisierte Trainingsplanung
    <WorkoutPlanScene key="workout" />,
    
    // Szene 3: Ernährungstipps
    <NutritionScene key="nutrition" />,
    
    // Szene 4: Fortschrittsverfolgung
    <ProgressScene key="progress" />
  ];

  return (
    <div className="relative w-full h-full bg-white overflow-hidden rounded-[24px]">
      {/* Header mit App-Logo */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[#9bc539] z-20 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-white" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 3L33 30H3L18 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 12L25.5 25H10.5L18 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="ml-2 text-white font-medium text-sm">Athly</span>
        </div>
        <div className="text-white text-xs font-medium bg-white/10 rounded-full px-2 py-0.5">
          Dein KI-Coach
        </div>
      </div>
      
      {/* Haupt-Inhaltsbereich */}
      <div className="absolute top-12 left-0 right-0 bottom-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {scenes[currentScene]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Fortschrittsanzeige unten */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30">
        <div className="flex space-x-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentScene 
                  ? 'bg-[#9bc539] w-4' 
                  : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Szene 1: Begrüßung und Zielerfassung
const WelcomeScene = () => {
  return (
    <div className="p-4 h-full flex flex-col">
      {/* KI-Coach Dialogfeld */}
      <div className="mb-4 flex">
        <div className="w-8 h-8 rounded-full bg-[#9bc539] flex items-center justify-center text-white mr-2 flex-shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-sm max-w-[85%]">
          <p className="text-gray-800 text-sm font-medium mb-1">Willkommen bei Athly!</p>
          <p className="text-gray-700 text-sm">Ich bin dein persönlicher KI-Coach. Was möchtest du erreichen?</p>
        </div>
      </div>
      
      {/* Zieloptionen */}
      <motion.div 
        className="space-y-2 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {[
          { text: "Gewicht verlieren", icon: "📉", color: "#3B82F6" },
          { text: "Muskeln aufbauen", icon: "💪", color: "#F59E0B" },
          { text: "Fitness verbessern", icon: "🏃‍♂️", color: "#10B981" },
          { text: "Gesünder ernähren", icon: "🥗", color: "#8B5CF6" }
        ].map((goal, i) => (
          <motion.div
            key={i}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            className="flex items-center bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-lg"
              style={{ backgroundColor: `${goal.color}15` }}
            >
              {goal.icon}
            </div>
            <span className="text-gray-800 text-sm font-medium">{goal.text}</span>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Personalisierungsbadge */}
      <motion.div
        className="absolute bottom-12 right-4 bg-white shadow-md rounded-xl p-2 border border-gray-100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 bg-[#9bc539]/10 text-[#9bc539]">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="text-xs font-medium text-gray-800">100% personalisiert</div>
        </div>
      </motion.div>
    </div>
  );
};

// Szene 2: Personalisierte Trainingsplanung
const WorkoutPlanScene = () => {
  return (
    <div className="p-4 h-full">
      {/* Tagesübersicht */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Dein Training heute</h2>
        <div className="text-sm text-gray-600 mb-3">Angepasst an deinen Fortschritt und Energielevel</div>
      </div>
      
      {/* Übungen */}
      <div className="space-y-3 mb-3">
        {[
          { name: "Warm-up", duration: "5 Min", status: "completed" },
          { name: "Haupttraining", duration: "25 Min", status: "current" },
          { name: "Cool-down", duration: "5 Min", status: "upcoming" }
        ].map((exercise, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
            className={`bg-white rounded-xl p-4 border ${
              exercise.status === 'current' 
                ? 'border-[#9bc539] shadow-md' 
                : 'border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 ${
                    exercise.status === 'completed' 
                      ? 'bg-green-500 text-white' 
                      : exercise.status === 'current'
                        ? 'bg-[#9bc539]/10 text-[#9bc539]'
                        : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {exercise.status === 'completed' ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : exercise.status === 'current' ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{exercise.name}</div>
                  <div className="text-xs text-gray-500">{exercise.duration}</div>
                </div>
              </div>
              
              {exercise.status === 'current' && (
                <div className="bg-[#9bc539] text-white text-xs rounded-full px-2 py-0.5 font-medium">
                  Jetzt
                </div>
              )}
            </div>
            
            {/* Progress bar for current exercise */}
            {exercise.status === 'current' && (
              <div className="mt-3">
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#9bc539] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                  />
                </div>
                <div className="mt-1 text-right text-xs text-gray-500">16:23 verbleibend</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Adaptive Training Badge */}
      <motion.div
        className="absolute bottom-12 left-4 bg-white shadow-md rounded-xl p-2 border border-gray-100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 bg-[#3B82F6]/10 text-[#3B82F6]">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div className="text-xs font-medium text-gray-800">Trainingsplan passt sich an</div>
        </div>
      </motion.div>
    </div>
  );
};

// Szene 3: Ernährungsplanung
const NutritionScene = () => {
  return (
    <div className="p-4 h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Deine Ernährung</h2>
        <div className="text-sm text-gray-600 mb-3">Optimiert für dein heutiges Training</div>
      </div>
      
      {/* Nährstoff-Verteilung */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium text-gray-800">Tagesübersicht</div>
          <div className="text-xs text-[#9bc539] font-medium">1860 kcal</div>
        </div>
        
        {/* Macros */}
        <div className="flex justify-between mb-4">
          {[
            { name: "Protein", value: "145g", color: "#3B82F6", percent: 60 },
            { name: "Carbs", value: "180g", color: "#F59E0B", percent: 75 },
            { name: "Fette", value: "65g", color: "#8B5CF6", percent: 45 }
          ].map((macro, i) => (
            <motion.div 
              key={i} 
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
            >
              <div className="text-center mb-1">
                <div className="text-xs text-gray-500">{macro.name}</div>
                <div className="text-sm font-medium text-gray-800">{macro.value}</div>
              </div>
              
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full rounded-full" 
                  style={{ backgroundColor: macro.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${macro.percent}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Mahlzeiten */}
      <div className="space-y-3">
        {[
          { time: "Frühstück", meal: "Protein-Pancakes mit Blaubeeren", icon: "☀️", completed: true },
          { time: "Mittagessen", meal: "Hähnchenbrust mit braunem Reis & Gemüse", icon: "🕛", completed: false },
          { time: "Pre-Workout", meal: "Protein-Shake mit Banane", icon: "⚡", completed: false }
        ].map((meal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
            className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center"
          >
            <div className="w-8 h-8 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mr-3 text-lg">
              {meal.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div className="text-sm font-medium text-gray-800">{meal.time}</div>
                {meal.completed && (
                  <div className="text-xs text-green-500 font-medium flex items-center">
                    <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Erledigt
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-600">{meal.meal}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Nutrition Sync Badge */}
      <motion.div
        className="absolute bottom-12 right-4 bg-white shadow-md rounded-xl p-2 border border-gray-100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 bg-[#F59E0B]/10 text-[#F59E0B]">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <div className="text-xs font-medium text-gray-800">Synchronisiert mit Training</div>
        </div>
      </motion.div>
    </div>
  );
};

// Szene 4: Fortschrittsverfolgung
const ProgressScene = () => {
  return (
    <div className="p-4 h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Deine Fortschritte</h2>
        <div className="text-sm text-gray-600 mb-2">+27% seit Trainingsbeginn</div>
      </div>
      
      {/* Hauptdiagramm */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium text-gray-800">Kraftentwicklung</div>
          <div className="text-xs text-[#8B5CF6] font-medium bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full">+12% im letzten Monat</div>
        </div>
        
        {/* Chart */}
        <div className="h-32 relative">
          <div className="absolute inset-0">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Historic data */}
              <motion.path 
                d="M0,40 10,38 20,36 30,33 40,30 50,25 60,20 70,18 80,15 90,10 100,8"
                fill="none" 
                stroke="url(#progressGradient)" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              
              {/* Area fill */}
              <motion.path 
                d="M0,40 10,38 20,36 30,33 40,30 50,25 60,20 70,18 80,15 90,10 100,8 L100,50 L0,50 Z"
                fill="url(#areaGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              
              {/* Current point */}
              <motion.circle 
                cx="100" cy="8" r="3" 
                fill="#8B5CF6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Metriken Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Kraftzuwachs", value: "+18%", color: "#8B5CF6" },
          { label: "Körperfett", value: "-2.4kg", color: "#10B981" },
          { label: "Muskelmasse", value: "+1.8kg", color: "#3B82F6" },
          { label: "Ausdauer", value: "+32%", color: "#F59E0B" }
        ].map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            className="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
          >
            <div className="text-sm font-medium mb-1" style={{ color: metric.color }}>{metric.value}</div>
            <div className="text-xs text-gray-500">{metric.label}</div>
          </motion.div>
        ))}
      </div>
      
      {/* Progress Tracking Badge */}
      <motion.div
        className="absolute bottom-12 left-4 bg-white shadow-md rounded-xl p-2 border border-gray-100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 bg-[#8B5CF6]/10 text-[#8B5CF6]">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-xs font-medium text-gray-800">KI-basierte Prognosen</div>
        </div>
      </motion.div>
    </div>
  );
};