"use client";

import React from "react";
import { motion } from "framer-motion";

export function Enhanced3DPhoneMockup({ content, color, isMobile = false }) {
  // Desktop version
  if (!isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative mx-auto"
      >
        
        {/* Main 3D scene container with perspective */}
        <div className="perspective-[1200px] group">
          {/* Phone Frame with 3D transform */}
          <div 
            className="relative mx-auto w-[280px] h-[580px] md:w-[300px] md:h-[620px] rounded-[54px] p-2.5 overflow-hidden transform preserve-3d group-hover:rotate-y-3 group-hover:-rotate-x-2 transition-transform duration-700"
            style={{ 
              background: `linear-gradient(145deg, #2a2a2a, #222222)`,
              boxShadow: `
                0 50px 100px -20px rgba(0,0,0,0.25),
                0 30px 60px -30px rgba(0,0,0,0.3),
                inset 0 -2px 6px 0px rgba(255,255,255,0.1),
                inset 0 2px 6px 0px rgba(0,0,0,0.8)
              `
            }}
          >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 rounded-[54px] overflow-hidden bg-gradient-to-br from-black/5 to-black/20 backdrop-blur-sm opacity-40 pointer-events-none z-10"></div>
            
            {/* Side light reflection */}
            <div 
              className="absolute -right-16 top-20 w-24 h-[70%] bg-gradient-to-l from-white/20 to-transparent transform rotate-[30deg] pointer-events-none z-20 opacity-20"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2), transparent)`
              }}
            ></div>
            
            {/* Buttons */}
            <div className="absolute left-0 top-[100px] w-[3px] h-10 bg-gradient-to-b from-gray-600 to-gray-700 rounded-r-lg ml-[-1px] z-30"></div>
            <div className="absolute left-0 top-[150px] w-[3px] h-14 bg-gradient-to-b from-gray-600 to-gray-700 rounded-r-lg ml-[-1px] z-30"></div>
            <div className="absolute right-0 top-[120px] w-[3px] h-16 bg-gradient-to-b from-gray-600 to-gray-700 rounded-l-lg mr-[-1px] z-30"></div>
            
            {/* Notch - More modern design */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[18px] z-30">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#333] bg-opacity-80"></div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#333] bg-opacity-60"></div>
            </div>
            
            {/* Screen - With subtle gradient and shadow */}
            <div 
              className="relative h-full w-full rounded-[48px] overflow-hidden border border-gray-800"
              style={{ 
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)' 
              }}
            >
              {/* Screen glare effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-60 pointer-events-none z-10"></div>
              
              {/* Color tint based on feature */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none z-10"
                style={{ 
                  backgroundColor: color 
                }}
              ></div>
              
              {/* Content container */}
              <div className="absolute inset-0 z-20 bg-white">
                {content}
              </div>
            </div>
          </div>
          
          {/* Eleganterer Schatten-Effekt */}
          <div className="absolute top-[99%] left-1/2 -translate-x-1/2 z-0 pointer-events-none">
            <div 
              className="w-[200px] h-[25px] opacity-20 blur-xl"
              style={{ 
                background: `radial-gradient(50% 50% at 50% 50%, ${color}80 0%, transparent 80%)`,
                transform: 'perspective(800px) rotateX(60deg) scale(1, 0.2)'
              }}
            ></div>
            <div 
              className="w-[250px] h-[20px] opacity-10 blur-lg mt-1"
              style={{ 
                background: `radial-gradient(50% 50% at 50% 50%, #00000080 0%, transparent 80%)`,
                transform: 'perspective(800px) rotateX(80deg) scale(1, 0.1)'
              }}
            ></div>
          </div>
          
          {/* Branding glow effect */}
          <div 
            className="absolute -z-10 -inset-4 rounded-[70px] opacity-30 blur-2xl"
            style={{ 
              background: `radial-gradient(circle at 50% 50%, ${color}40, transparent 70%)` 
            }}
          ></div>
        </div>
      </motion.div>
    );
  }
  
  // Mobile version
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative mx-auto mb-8"
    >
      {/* Main 3D scene container with perspective */}
      <div className="perspective-[1200px]">
        {/* Phone Frame with 3D transform */}
        <div 
          className="relative mx-auto w-[270px] h-[560px] rounded-[52px] p-2 overflow-hidden transform preserve-3d"
          style={{ 
            background: `linear-gradient(145deg, #2a2a2a, #222222)`,
            boxShadow: `
              0 30px 60px -15px rgba(0,0,0,0.25),
              0 20px 40px -20px rgba(0,0,0,0.3),
              inset 0 -2px 6px 0px rgba(255,255,255,0.1),
              inset 0 2px 6px 0px rgba(0,0,0,0.8)
            `
          }}
        >
          {/* Glass effect overlay */}
          <div className="absolute inset-0 rounded-[52px] overflow-hidden bg-gradient-to-br from-black/5 to-black/20 backdrop-blur-sm opacity-40 pointer-events-none z-10"></div>
          
          {/* Side light reflection */}
          <div 
            className="absolute -right-16 top-20 w-24 h-[70%] bg-gradient-to-l from-white/20 to-transparent transform rotate-[30deg] pointer-events-none z-20 opacity-20"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.2), transparent)`
            }}
          ></div>
          
          {/* Buttons */}
          <div className="absolute left-0 top-[100px] w-[2px] h-10 bg-gradient-to-b from-gray-600 to-gray-700 rounded-r-lg ml-[-1px] z-30"></div>
          <div className="absolute left-0 top-[150px] w-[2px] h-14 bg-gradient-to-b from-gray-600 to-gray-700 rounded-r-lg ml-[-1px] z-30"></div>
          <div className="absolute right-0 top-[120px] w-[2px] h-16 bg-gradient-to-b from-gray-600 to-gray-700 rounded-l-lg mr-[-1px] z-30"></div>
          
          {/* Notch - More modern design */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[25px] bg-black rounded-b-[16px] z-30">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#333] bg-opacity-80"></div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#333] bg-opacity-60"></div>
          </div>
          
          {/* Screen - With subtle gradient and shadow */}
          <div 
            className="relative h-full w-full rounded-[46px] overflow-hidden border border-gray-800"
            style={{ 
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)' 
            }}
          >
            {/* Screen glare effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-60 pointer-events-none z-10"></div>
            
            {/* Color tint based on feature */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none z-10"
              style={{ 
                backgroundColor: color 
              }}
            ></div>
            
            {/* Content container */}
            <div className="absolute inset-0 z-20 bg-white">
              {content}
            </div>
          </div>
        </div>
        
        {/* Eleganterer Schatten-Effekt */}
        <div className="absolute top-[99%] left-1/2 -translate-x-1/2 z-0 pointer-events-none">
          <div 
            className="w-[180px] h-[25px] opacity-20 blur-xl"
            style={{ 
              background: `radial-gradient(50% 50% at 50% 50%, ${color}80 0%, transparent 80%)`,
              transform: 'perspective(800px) rotateX(60deg) scale(1, 0.2)'
            }}
          ></div>
          <div 
            className="w-[220px] h-[15px] opacity-10 blur-lg mt-1"
            style={{ 
              background: `radial-gradient(50% 50% at 50% 50%, #00000080 0%, transparent 80%)`,
              transform: 'perspective(800px) rotateX(80deg) scale(1, 0.1)'
            }}
          ></div>
        </div>
        
        {/* Branding glow effect */}
        <div 
          className="absolute -z-10 -inset-4 rounded-[70px] opacity-30 blur-2xl"
          style={{ 
            background: `radial-gradient(circle at 50% 50%, ${color}40, transparent 70%)` 
          }}
        ></div>
      </div>
    </motion.div>
  );
}