import React from "react";

type PhoneMockupProps = {
  children: React.ReactNode;
  className?: string;
};

export function PhoneMockup({ children, className = "" }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Hintergrund-Glow-Effekt */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-[#9bc53930] via-[#6366f120] to-[#9bc53920] blur-xl rounded-[80px] z-0"></div>
      
      {/* Glasartiger Rahmen */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-[55px] border-[14px] border-black/80 backdrop-blur-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.2),inset_0_0_10px_rgba(255,255,255,0.1)] z-10">
        {/* Glasreflexionen */}
        <div className="absolute top-0 left-5 right-5 h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-[40px] opacity-30"></div>
        <div className="absolute top-1/3 right-0 w-1 h-1/3 bg-white/20"></div>
        
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-xl z-20 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-black/80 ring-1 ring-gray-700/50 mx-1"></div>
            <div className="h-2 w-14 rounded-full bg-black/80 ring-1 ring-gray-700/50 mx-1"></div>
          </div>
        </div>
        
        {/* Bildschirminhalt */}
        <div className="relative rounded-[42px] bg-white overflow-hidden w-[375px] h-[812px]">
          {children}
        </div>
        
        {/* Power-Button mit Glaseffekt */}
        <div className="absolute right-[-3px] top-[180px] w-[3px] h-[80px] bg-gradient-to-r from-gray-800 to-black/40 backdrop-blur-sm rounded-l-sm"></div>
        
        {/* Volume-Buttons mit Glaseffekt */}
        <div className="absolute left-[-3px] top-[150px] w-[3px] h-[30px] bg-gradient-to-l from-gray-800 to-black/40 backdrop-blur-sm rounded-r-sm"></div>
        <div className="absolute left-[-3px] top-[200px] w-[3px] h-[30px] bg-gradient-to-l from-gray-800 to-black/40 backdrop-blur-sm rounded-r-sm"></div>
      </div>
    </div>
  );
}