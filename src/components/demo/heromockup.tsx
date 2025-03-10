"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HeroMockupAnimation() {
  // Demo state
  const [isDemoRunning, setIsDemoRunning] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "coach",
      text: "Guten Morgen Michael! 👋 Hier ist dein Trainingsplan für heute. Brauchst du eine leichtere Variante oder können wir direkt loslegen?",
      includeWorkout: true
    }
  ]);
  
  // Ref für auto-scroll
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
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
            text: "Nein, das schaffe ich! Lass uns loslegen 💪"
          }]);
          setTimeout(() => scrollToBottom(), 100);
        }, 2500);
      },
      
      // Coach beginnt zu tippen
      () => {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => scrollToBottom(), 100);
        }, 4000);
      },
      
      // Coach antwortet
      () => {
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            type: "coach",
            text: "Super Einstellung! Denk dran auf die Form zu achten. Viel Spaß beim Training! 😊"
          }]);
          setTimeout(() => scrollToBottom(), 100);
        }, 6000);
      },
      
      // Coach schickt Aufwärm-Routine
      () => {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: "coach",
            text: "Hier ist deine angepasste Aufwärm-Routine für heute:",
            includeWarmup: true
          }]);
          setTimeout(() => scrollToBottom(), 100);
        }, 8000);
      },
      
      // User antwortet
      () => {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: "user",
            text: "Perfekt, danke dir!"
          }]);
          setTimeout(() => scrollToBottom(), 100);
        }, 11000);
      },
      
      // Coach beginnt zu tippen
      () => {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => scrollToBottom(), 100);
        }, 13000);
      },
      
      // Coach sendet Motivation
      () => {
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            type: "coach",
            text: "Gerne! Ich tracke deinen Fortschritt während des Trainings. Nach dem Training bekommst du eine Analyse deiner Performance."
          }]);
          setTimeout(() => scrollToBottom(), 100);
        }, 15000);
      },
      
      // Coach beginnt zu tippen
      () => {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => scrollToBottom(), 100);
        }, 18000);
      },
      
      // Coach sendet Ernährungstipp
      () => {
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            type: "coach",
            text: "Denk daran nach dem Training ausreichend zu trinken und innerhalb von 30 Minuten eine proteinreiche Mahlzeit zu dir zu nehmen, um deine Regeneration zu unterstützen.",
            includeNutrition: true
          }]);
          setTimeout(() => scrollToBottom(), 100);
          
          // Demo neu starten nach kurzer Pause
          setTimeout(() => {
            resetDemo();
          }, 10000);
        }, 21000);
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
        text: "Guten Morgen Michael! 👋 Hier ist dein Trainingsplan für heute. Brauchst du eine leichtere Variante oder können wir direkt loslegen?",
        includeWorkout: true
      }
    ]);
    setIsDemoRunning(true);
  };
  
  // Auto-scroll zum Ende des Chats
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  
  // Verhindern der Form-Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Workout Komponente
  const WorkoutComponent = () => (
    <div className="mt-3 bg-gray-100 rounded-xl overflow-hidden">
      <div className="flex items-center p-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <div className="font-medium text-gray-800">Heutiges Training</div>
          <div className="text-sm text-gray-500">Oberkörper Workout • 15-20 Min • Mittelschwer</div>
        </div>
      </div>
    </div>
  );
  
  // Warmup Komponente
  const WarmupComponent = () => (
    <div className="mt-3 bg-gray-100 rounded-xl overflow-hidden">
      <div className="p-3 border-b border-gray-200">
        <div className="font-medium text-gray-800">Aufwärm-Routine</div>
        <div className="text-sm text-gray-500">5 Minuten • Vor dem Haupttraining</div>
      </div>
      <div className="p-3">
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-blue-500 font-medium">1</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Arm- und Schulterkreisen</div>
              <div className="text-xs text-gray-500">10 Wiederholungen je Richtung</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-blue-500 font-medium">2</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Dynamische Brustdehnung</div>
              <div className="text-xs text-gray-500">30 Sekunden</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-blue-500 font-medium">3</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Leichte Liegestütze</div>
              <div className="text-xs text-gray-500">8-10 Wiederholungen</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Nutrition Komponente
  const NutritionComponent = () => (
    <div className="mt-3 bg-gray-100 rounded-xl overflow-hidden">
      <div className="flex p-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div className="font-medium text-gray-800">Ernährungstipp</div>
          <div className="text-sm text-gray-600 mt-1">
            Nach dem Training: 
            <span className="font-medium"> Protein-Shake mit Banane</span> 
            oder 
            <span className="font-medium"> Griechischer Joghurt mit Beeren</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full overflow-hidden rounded-[24px] bg-white">
      {/* Chat Interface */}
      <div className="flex flex-col h-full">
        
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
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                
                {/* Chat Bubbles */}
                <div className="max-w-[80%]">
                  <div 
                    className={`p-3 rounded-2xl ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  
                  {/* Workout Component */}
                  {message.includeWorkout && <WorkoutComponent />}
                  
                  {/* Warmup Component */}
                  {message.includeWarmup && <WarmupComponent />}
                  
                  {/* Nutrition Component */}
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
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Chat Input */}
        <div className="px-4 py-3 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Nachricht schreiben..."
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 rounded-full py-2.5 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300"
                disabled={isDemoRunning}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-gray-400 p-1">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <button 
              className="ml-2 rounded-full bg-blue-500 p-2.5 text-white"
              type="submit"
              disabled={isDemoRunning}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z" fill="currentColor"/>
                <path d="M14 12C14 12.5523 13.5523 13 13 13C12.4477 13 12 12.5523 12 12C12 11.4477 12.4477 11 13 11C13.5523 11 14 11.4477 14 12Z" fill="currentColor"/>
                <path d="M8 12C8 12.5523 7.55228 13 7 13C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11C7.55228 11 8 11.4477 8 12Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12Z" fill="currentColor"/>
              </svg>
            </button>
          </form>
        </div>
        
        {/* Tab Bar */}
        <div className="bg-white border-t border-gray-200 px-2 py-1 flex justify-between">
          <button className="p-2 text-blue-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center -mt-5 border-4 border-white text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <button className="p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}