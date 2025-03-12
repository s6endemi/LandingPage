"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function HeroMockupAnimation() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Compact iOS Status Bar */}
      <div className="flex justify-between items-center px-3 py-1 bg-transparent">
        <div className="text-xs font-medium text-gray-600">9:32</div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M19 8L15 12H19L5 22L9 13H5L9 2L13 13L19 8Z" fill="#333"/>
            </svg>
          </div>
          <div className="text-xs font-medium text-gray-800">100%</div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-3 py-2 flex flex-col overflow-y-auto">
        {/* Date Header - Small & Subtle */}
        <div className="flex justify-center mb-3">
          <div className="bg-gray-100 rounded-full px-3 py-1">
            <span className="text-xs text-gray-500 font-medium">Heute, 9:32</span>
          </div>
        </div>

        {/* User Message - Compact */}
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex justify-end mb-2"
        >
          <div className="max-w-[85%] bg-gradient-to-r from-[#4361ee] to-[#4895ef] text-white rounded-2xl rounded-tr-sm px-3 py-2 shadow-sm">
            <p className="text-xs">Hey Coach, ich brauche ein schnelles Workout für heute. Maximal 30 Minuten!</p>
          </div>
        </motion.div>

        {/* Coach Message - Compact */}
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="flex mb-2"
        >
          <div className="w-6 h-6 bg-[#8ab42d] rounded-full flex items-center justify-center mr-1.5 flex-shrink-0 shadow-sm">
            <svg width="12" height="12" viewBox="0 0 725 750" fill="none">
              <path d="M549.579 685L362.5 298L175.421 685H31.4276L0 750H217L362 450L507 750H725L693.572 685H549.579Z" fill="white"/>
              <path d="M662.65 621L362.5 0L104.4 534H104.416L72.9944 599H72.9833L62.35 621H133.421L254.031 371.501L254.003 371.443L362.5 147L438.545 304.31L438.275 304.868L591.095 621H662.65Z" fill="white"/>
            </svg>
          </div>
          <div className="max-w-[85%] bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm">
            <p className="text-xs text-gray-800">Klar Hey! Hier ist ein effektives 30-Min Ganzkörper-Workout für dich:</p>
          </div>
        </motion.div>

        {/* Workout Card - Clean & Elegant */}
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="flex mb-2 ml-8"
        >
          <div className="max-w-[85%] w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            {/* Top Bar with Elegant Gradient */}
            <div className="h-1.5 bg-gradient-to-r from-[#3B82F6] to-[#6366F1]"></div>
            
            {/* Content with Clean Layout */}
              {/* Workout Card Content - Redesigned for Better Conversion */}
            <div className="px-3 py-3">
              {/* Workout Title with Prominent Time */}
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Kraftaufbau</h3>
                  <div className="flex items-center mt-0.5">
                    <svg className="w-3 h-3 text-[#3B82F6] mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs font-medium text-[#3B82F6]">30 Min</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-white bg-[#3B82F6] px-2.5 py-0.5 rounded-full">Heute</span>
              </div>
              
              {/* Key Workout Attributes - Clean Layout */}
              <div className="flex items-center justify-between">
                <div className="flex items-center bg-[#f0f4ff] rounded-lg px-2 py-1.5">
                  <svg className="w-3.5 h-3.5 text-[#3B82F6] mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xs text-gray-700">3x pro Woche</span>
                </div>
                
                <div className="flex items-center bg-[#f0f4ff] rounded-lg px-2 py-1.5">
                  <svg className="w-3.5 h-3.5 text-[#3B82F6] mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xs text-gray-700">Ganzkörper</span>
                </div>
              </div>
              
              {/* Progress Indicator - Visual Motivation */}
              <div className="mt-3 mb-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Fortschritt</span>
                  <span className="text-xs font-medium text-[#3B82F6]">7 Übungen</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60a5fa] rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              {/* Action Button - High Conversion Design */}
              <button className="w-full mt-1 bg-gradient-to-r from-[#3B82F6] to-[#60a5fa] text-white text-xs font-medium rounded-lg py-2 shadow-sm flex items-center justify-center">
                <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 3l14 9-14 9V3z"></path>
                </svg>
                Workout starten
              </button>
            </div>
          </div>
        </motion.div>

        {/* Coach Second Message - Compact */}
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
          className="flex"
        >
          <div className="w-6 h-6 bg-[#8ab42d] rounded-full flex items-center justify-center mr-1.5 flex-shrink-0 shadow-sm">
            <svg width="12" height="12" viewBox="0 0 725 750" fill="none">
              <path d="M549.579 685L362.5 298L175.421 685H31.4276L0 750H217L362 450L507 750H725L693.572 685H549.579Z" fill="white"/>
              <path d="M662.65 621L362.5 0L104.4 534H104.416L72.9944 599H72.9833L62.35 621H133.421L254.031 371.501L254.003 371.443L362.5 147L438.545 304.31L438.275 304.868L591.095 621H662.65Z" fill="white"/>
            </svg>
          </div>
          <div className="max-w-[85%] bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm">
            <p className="text-xs text-gray-800">Du kannst alle Übungen ohne Equipment machen! Wie klingt das für dich?</p>
          </div>
        </motion.div>
      </div>

      {/* Chat Input - Minimalist */}
      <div className="bg-white border-t border-gray-100 px-3 py-2.5">
        <div className="flex items-center">
          <div className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 flex items-center">
            <input 
              type="text" 
              className="flex-1 bg-transparent border-none outline-none text-gray-600 text-xs placeholder-gray-400" 
              placeholder="Nachricht" 
              disabled
            />
            <button className="text-gray-400">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
          <button className="ml-1.5 w-7 h-7 rounded-full bg-[#3B82F6] flex items-center justify-center shadow-sm">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 12l10 10 10-10M2 12h20" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}