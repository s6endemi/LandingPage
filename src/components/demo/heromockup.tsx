"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Definieren des Message-Typs für TypeScript
interface Message {
  type: 'coach' | 'user';
  text: string;
  includeWorkout?: boolean;
  includeWarmup?: boolean;
  includeNutrition?: boolean;
  includeProgress?: boolean;
}

export function HeroMockupAnimation() {
  // Demo state
  const [isDemoRunning, setIsDemoRunning] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "coach",
      text: "Hallo! 👋 Hier ist dein persönlicher KI-Trainer von Athly. Dein Trainingsplan für heute ist bereit. Sollen wir direkt loslegen?",
      includeWorkout: true
    }
  ]);
  
  // Ref für auto-scroll
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll zum Ende des Chats
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  
  // Demo-Sequenz
  useEffect(() => {
    if (!isDemoRunning) return;
    
    // Automatische Demo zeigen
    const timeline = [
      // User antwortet
      () => {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: "user",
            text: "Ja, ich bin bereit! Lass uns starten 💪"
          }]);
          setTimeout(() => scrollToBottom(), 100);
        }, 2000);
      },
      
      // Coach beginnt zu tippen
      () => {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => scrollToBottom(), 100);
        }, 3500);
      },
      
      // Coach antwortet
      () => {
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            type: "coach",
            text: "Super! Achte besonders auf deine Form bei den Übungen. Hier ist dein personalisierter Plan:"
          }]);
          setTimeout(() => scrollToBottom(), 100);
        }, 5000);
      },
      
      // Coach schickt Aufwärm-Routine
      () => {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: "coach",
            text: "Beginne mit dieser Aufwärm-Routine:",
            includeWarmup: true
          }]);
          setTimeout(() => scrollToBottom(), 100);
        }, 7000);
      },
      
      // User antwortet
      () => {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: "user",
            text: "Danke! Kann ich meine Fortschritte vom letzten Training sehen?"
          }]);
          setTimeout(() => scrollToBottom(), 100);
        }, 10000);
      },
      
      // Coach beginnt zu tippen
      () => {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => scrollToBottom(), 100);
        }, 12000);
      },
      
      // Coach sendet Fortschritte
      () => {
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            type: "coach",
            text: "Natürlich! Hier sind deine Fortschritte der letzten Woche:",
            includeProgress: true
          }]);
          setTimeout(() => scrollToBottom(), 100);
        }, 14000);
      },
      
      // Coach beginnt zu tippen
      () => {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => scrollToBottom(), 100);
        }, 17000);
      },
      
      // Coach sendet Ernährungstipp
      () => {
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            type: "coach",
            text: "Vergiss nicht, nach dem Training ausreichend Protein zu dir zu nehmen. Hier sind einige schnelle Optionen:",
            includeNutrition: true
          }]);
          setTimeout(() => scrollToBottom(), 100);
          
          // Demo neu starten nach kurzer Pause
          setTimeout(() => {
            resetDemo();
          }, 10000);
        }, 19000);
      }
    ];
    
    // Timeline ausführen
    timeline.forEach(action => action());
    
    // Cleanup
    return () => {
      // Alle Timeouts löschen wenn nötig
    };
  }, [isDemoRunning]);
  
  // Reset der Demo
  const resetDemo = () => {
    setMessages([
      {
        type: "coach",
        text: "Hallo! 👋 Hier ist dein persönlicher KI-Trainer von Athly. Dein Trainingsplan für heute ist bereit. Sollen wir direkt loslegen?",
        includeWorkout: true
      }
    ]);
    setIsDemoRunning(true);
  };
  
  // Verhindern der Form-Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Workout Komponente
  const WorkoutComponent = () => (
    <div className="mt-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl overflow-hidden border border-blue-100">
      <div className="p-3 border-b border-blue-100 flex items-center">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <div className="font-medium text-gray-800">Personalisiertes Training</div>
          <div className="text-sm text-gray-600">Oberkörper • 25 Min • Mittelschwer</div>
        </div>
      </div>
      <div className="p-3">
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-blue-500 font-medium">1</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Liegestütze</div>
              <div className="text-xs text-gray-500">3 × 12 Wiederholungen</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-blue-500 font-medium">2</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Rudern mit Kurzhanteln</div>
              <div className="text-xs text-gray-500">3 × 15 Wiederholungen</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-blue-500 font-medium">3</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Schulterdrücken</div>
              <div className="text-xs text-gray-500">3 × 10 Wiederholungen</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Warmup Komponente
  const WarmupComponent = () => (
    <div className="mt-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl overflow-hidden border border-orange-100">
      <div className="p-3 border-b border-orange-100">
        <div className="font-medium text-gray-800">Aufwärmen</div>
        <div className="text-sm text-gray-600">5 Minuten • Vor dem Haupttraining</div>
      </div>
      <div className="p-3">
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-orange-500 font-medium">A</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Dynamisches Stretching</div>
              <div className="text-xs text-gray-500">45 Sekunden</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-orange-500 font-medium">B</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Arm- und Schulterkreisen</div>
              <div className="text-xs text-gray-500">10× je Richtung</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-orange-500 font-medium">C</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Leichte Liegestütze</div>
              <div className="text-xs text-gray-500">8 Wiederholungen</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Progress Komponente
  const ProgressComponent = () => (
    <div className="mt-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl overflow-hidden border border-purple-100">
      <div className="p-3 border-b border-purple-100">
        <div className="font-medium text-gray-800">Trainingsfortschritt</div>
        <div className="text-sm text-gray-600">Letzte 7 Tage</div>
      </div>
      <div className="p-3">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <div className="text-xs font-medium text-gray-700">Trainingshäufigkeit</div>
              <div className="text-xs font-medium text-purple-500">5/7 Tage</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '71%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <div className="text-xs font-medium text-gray-700">Trainingsvolumen</div>
              <div className="text-xs font-medium text-purple-500">+12% vs. Vorwoche</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <div className="text-xs font-medium text-gray-700">Übungsqualität</div>
              <div className="text-xs font-medium text-purple-500">92%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Nutrition Komponente
  const NutritionComponent = () => (
    <div className="mt-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl overflow-hidden border border-green-100">
      <div className="p-3 border-b border-green-100 flex items-center">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3 text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        </div>
        <div>
          <div className="font-medium text-gray-800">Ernährungstipps</div>
          <div className="text-sm text-gray-600">Post-Workout Optionen</div>
        </div>
      </div>
      <div className="p-3">
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-green-500 font-medium">1</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Protein-Shake mit Banane</div>
              <div className="text-xs text-gray-500">25g Protein, 150 kcal</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-green-500 font-medium">2</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Griechischer Joghurt mit Beeren</div>
              <div className="text-xs text-gray-500">18g Protein, 180 kcal</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-green-500 font-medium">3</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Thunfisch-Wrap mit Avocado</div>
              <div className="text-xs text-gray-500">22g Protein, 280 kcal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full overflow-hidden rounded-[24px] bg-white shadow-lg border border-gray-100">
      {/* App Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 flex items-center justify-between text-white">
        <div className="flex items-center">
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 17.5L4 15M4 9L6.5 6.5M17.5 6.5L20 4M20 20L17.5 17.5M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-bold text-lg tracking-tight">Athly</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Chat Interface */}
      <div className="flex flex-col h-[calc(100%-110px)]">
        
        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto py-4 px-4 space-y-4"
        >
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : ''} ${index === 0 ? 'pt-2' : ''}`}
              >
                {/* Coach Avatar */}
                {message.type === 'coach' && (
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1 shadow-sm">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Chat Bubbles */}
                <div className={`max-w-[80%] ${message.type === 'user' ? '' : 'ml-1'}`}>
                  <div 
                    className={`p-3 rounded-2xl shadow-sm ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  
                  {/* Specialized Components */}
                  {message.includeWorkout && <WorkoutComponent />}
                  {message.includeWarmup && <WarmupComponent />}
                  {message.includeProgress && <ProgressComponent />}
                  {message.includeNutrition && <NutritionComponent />}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1 shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Chat Input */}
        <div className="px-4 py-3 border-t border-gray-100">
          <form onSubmit={handleSubmit} className="flex items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Nachricht an deinen KI-Trainer..."
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-400 rounded-full py-2.5 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition-colors"
                disabled={isDemoRunning}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <button 
              className="ml-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-3 text-white shadow-sm hover:from-blue-600 hover:to-indigo-700 transition-all"
              type="submit"
              disabled={isDemoRunning}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      {/* Tab Bar */}
      <div className="bg-white border-t border-gray-100 px-6 py-2.5 flex justify-between items-center">
        <button className="text-blue-500 flex flex-col items-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button className="text-gray-400 flex flex-col items-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-xs mt-1">Programme</span>
        </button>
        
        <div className="relative flex-shrink-0">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
          </div>
        </div>
        
        <button className="text-gray-400 flex flex-col items-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs mt-1">Fortschritt</span>
        </button>
        
        <button className="text-gray-400 flex flex-col items-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1">Profil</span>
        </button>
      </div>
    </div>
  );
}