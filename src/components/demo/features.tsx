import React from "react";

// AI Coach Demo with Audio and Video Features
export const AiCoachDemo: React.FC = () => {
  // Define an animated audio wave effect
  const AudioWaveAnimation = () => (
    <div className="flex items-center space-x-1 h-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className="w-0.5 bg-[#3B82F6] rounded-full animate-pulse" 
          style={{
            height: `${8 + Math.sin(i * 1.5) * 7}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.7 + Math.random() * 0.5}s`
          }}
        ></div>
      ))}
    </div>
  );

  return (
    <div className="relative h-full w-full">
      {/* Kompakter Header */}
      <div className="absolute top-0 left-0 right-0 bg-[#3B82F6] text-white py-2.5 px-3 z-10 flex justify-between items-center">
        <div className="font-medium">Athly Coach</div>
        <div className="flex items-center text-xs bg-white/20 px-2 py-0.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1 animate-pulse"></div>
          <span>Jetzt aktiv</span>
        </div>
      </div>
      
      {/* Chat Messages - With Problem/Solution Focus */}
      <div className="absolute top-[42px] left-0 right-0 bottom-[54px] bg-gray-50 p-3 overflow-hidden">
        {/* User Audio Message */}
        <div className="flex justify-end mb-3">
          <div className="max-w-[85%] bg-[#3B82F6]/10 rounded-2xl rounded-tr-sm p-2.5 text-sm text-gray-800">
            <div className="flex items-center mb-1">
              <svg className="w-3.5 h-3.5 text-[#3B82F6] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span className="text-xs text-gray-500 mr-1">Sprachnachricht</span>
              <span className="text-xs text-gray-500">0:16</span>
            </div>
            
            {/* Audio Waveform Display */}
            <div className="px-2 py-1 bg-white/50 rounded-lg flex items-center">
              <AudioWaveAnimation />
              <span className="ml-2 text-xs text-gray-600 font-medium">
                "Hab Knieschmerzen seit gestern, was soll ich heute trainieren?"
              </span>
            </div>
          </div>
        </div>
        
        {/* AI Answer - Immediate Solution */}
        <div className="flex mb-3">
          <div className="w-7 h-7 rounded-full bg-[#3B82F6] flex items-center justify-center text-white mr-2 flex-shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="max-w-[80%] bg-white rounded-2xl rounded-tl-sm p-2.5 text-sm text-gray-800 shadow-sm">
            <span className="font-medium text-xs">Ich habe deinen angepassten Plan erstellt:</span>
            
            {/* Kompakte Workout-Karte */}
            <div className="mt-2 mb-2 bg-[#3B82F6]/5 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between bg-[#3B82F6]/15 px-3 py-1.5">
                <div className="flex items-center">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-[#3B82F6] font-medium text-xs">Oberkörper-Fokus für heute</div>
                </div>
              </div>
              <div className="px-3 py-2 text-xs flex justify-between">
                <span className="text-gray-600">Knieglenk-schonend • 35 Min • 3 Übungen</span>
              </div>
            </div>
            
            {/* Zusatzinfo/Empfehlung */}
            <div className="text-xs text-gray-600">
              <span className="text-[#3B82F6] font-medium">Tipp:</span> Für deine Knie habe ich eine Regenerationssequenz vorbereitet.
            </div>
          </div>
        </div>
        
        {/* User Response - Motivierte Bestätigung */}
        <div className="flex justify-end">
          <div className="max-w-[80%] bg-[#3B82F6]/10 rounded-2xl rounded-tr-sm p-2.5 text-sm text-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-xs">Super, danke! Genau was ich brauche.</span>
              <svg className="w-3.5 h-3.5 text-[#3B82F6] ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Input Area with Audio and Video Option */}
      <div className="absolute left-0 right-0 bottom-0 border-t border-gray-200 p-2 bg-white z-10">
        <div className="flex items-center">
          <div className="flex-1 flex rounded-full border border-gray-200 overflow-hidden bg-gray-50">
            <input type="text" className="flex-1 px-3 py-1.5 text-xs outline-none bg-transparent" placeholder="Stelle eine Frage..." />
            
            {/* Audio & Video Buttons */}
            <div className="flex">
              <button className="px-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button className="px-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Send Button */}
          <button className="ml-2 bg-[#3B82F6] text-white p-1.5 rounded-full shadow-sm flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Adaptive Training Demo - Optimiert mit vergrößerter Schrift
export const AdaptiveTrainingDemo: React.FC = () => (
  <div className="relative h-full w-full">
    {/* Kompakter Header mit KI-Indikator */}
    <div className="absolute top-0 left-0 right-0 bg-[#9bc539] text-white py-3 px-3.5 z-10 flex justify-between items-center">
      <div className="font-medium text-base">Smarter Plan</div>
      <div className="flex items-center text-xs bg-white/20 px-2 py-0.5 rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-green-300 mr-1 animate-pulse"></div>
        <span>Adaptiv</span>
      </div>
    </div>
    
    {/* Simplified Content Area */}
    <div className="absolute top-[45px] left-0 right-0 bottom-0 bg-gray-50 p-3.5">
      {/* Intelligence Card - REFINED */}
      <div className="bg-white rounded-xl shadow-sm p-3.5 mb-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#9bc539]/15 flex items-center justify-center text-[#9bc539] mr-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">KI-Analyse</span>
          </div>
          <span className="text-sm text-green-600 font-medium">+12% Leistung</span>
        </div>
        
        <div className="flex items-center px-1">
          <div className="w-full">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
              <div className="h-full bg-gradient-to-r from-green-400 to-green-500" style={{width: '72%'}}></div>
            </div>
            <div className="flex justify-between text-[11px] text-gray-500">
              <span>Vorherige Schulterübungen</span>
              <span>Aktuelle Anpassung</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Card */}
      <div className="bg-white rounded-xl shadow-sm p-3.5 mb-3.5">
        <div className="flex justify-between items-center mb-2.5">
          <div className="font-medium text-sm text-gray-800">Heutiges Training</div>
          <div className="text-xs font-medium bg-[#9bc539] text-white px-2.5 py-0.5 rounded-full">
            OPTIMIERT
          </div>
        </div>
        
        {/* Simplified Training Card - Enhanced */}
        <div className="bg-[#9bc539]/5 rounded-lg overflow-hidden mb-3">
          <div className="px-3.5 py-2 bg-[#9bc539]/15 text-sm font-medium text-gray-700 flex justify-between items-center">
            <span>Oberkörper</span>
            <span className="text-[#9bc539]">45 Min</span>
          </div>
          
          <div className="px-3.5 py-2.5 space-y-2">
            <div className="flex items-center text-xs">
              <div className="w-4 h-4 rounded-full bg-[#9bc539]/20 flex items-center justify-center text-[#9bc539] mr-2">
                <span className="text-[9px] font-bold">1</span>
              </div>
              <div className="text-gray-700 text-sm flex-1">Bankdrücken</div>
              <div className="text-[#9bc539] font-medium text-sm">+10%</div>
            </div>
            
            <div className="flex items-center text-xs">
              <div className="w-4 h-4 rounded-full bg-[#9bc539]/20 flex items-center justify-center text-[#9bc539] mr-2">
                <span className="text-[9px] font-bold">2</span>
              </div>
              <div className="text-gray-700 text-sm flex-1">Schulterdrücken</div>
              <div className="text-[#9bc539] font-medium text-sm">+15%</div>
            </div>
          </div>
        </div>
        
        <button className="w-full py-2.5 bg-[#9bc539] text-white rounded-lg text-sm font-medium">
          Training starten
        </button>
      </div>
      
      {/* Progress Card */}
      <div className="bg-white rounded-xl shadow-sm p-3.5">
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-[#9bc539] mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <div className="text-sm font-medium text-gray-800">Fortschritt</div>
          </div>
          <div className="text-xs text-gray-500">Woche 4/6</div>
        </div>
        
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2.5">
          <div className="h-full bg-gradient-to-r from-[#9bc539]/70 to-[#9bc539]" style={{width: '67%'}}></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-[#9bc539] mr-1.5"></span>
            <span className="text-gray-600">Kraft <span className="text-[#9bc539] font-medium">+21%</span></span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-[#9bc539] mr-1.5"></span>
            <span className="text-gray-600">Fett <span className="text-[#9bc539] font-medium">-3%</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Nutrition Sync Demo - Fully Integrated Design
export const NutritionSyncDemo: React.FC = () => (
  <div className="relative h-full w-full">
    {/* Kompakter Header */}
    <div className="absolute top-0 left-0 right-0 bg-[#F59E0B] text-white py-3 px-3.5 z-10 flex justify-between items-center">
      <div className="font-medium text-base">Mahlzeit-Scanner</div>
      <div className="flex items-center text-xs bg-white/20 px-2.5 py-0.5 rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-green-300 mr-1"></div>
        <span>Verfügbar</span>
      </div>
    </div>
    
    {/* Simplified Content Area - Single Use Case */}
    <div className="absolute top-[45px] left-0 right-0 bottom-0 bg-gray-50 p-3.5">
      {/* Photo Scan Result Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-3.5">
        <div className="px-3.5 py-2.5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-[#F59E0B] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="font-medium text-sm text-gray-700">Mediterrane Bowl</div>
          </div>
          <div className="text-sm text-[#F59E0B] font-medium">
            Heute, 13:24
          </div>
        </div>
        
        {/* Nutrition Stats */}
        <div className="p-3.5">
          <div className="grid grid-cols-4 gap-2 mb-3.5">
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-gray-700 font-medium text-sm mb-0.5">490</div>
              <div className="text-xs text-gray-500">kcal</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-gray-700 font-medium text-sm mb-0.5">28g</div>
              <div className="text-xs text-gray-500">Protein</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-gray-700 font-medium text-sm mb-0.5">42g</div>
              <div className="text-xs text-gray-500">Carbs</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-gray-700 font-medium text-sm mb-0.5">18g</div>
              <div className="text-xs text-gray-500">Fett</div>
            </div>
          </div>
          
          {/* Coach Comment with Integration of Coming Soon */}
          <div className="bg-[#F59E0B]/5 rounded-lg p-3 mb-3">
            <div className="flex items-start">
              <div className="w-7 h-7 rounded-full bg-[#F59E0B] flex items-center justify-center mr-2.5 flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Perfekt nach deinem Training!</span> Die 28g Protein unterstützen deine Muskelregeneration optimal.
                </div>

              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Tagesbedarf</span>
              <span>1480 / 2100 kcal</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#F59E0B]/70 to-[#F59E0B]" style={{width: '70%'}}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scan Button Area */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-3.5">
        <div className="text-center mb-3.5">
          <div className="h-12 w-12 mx-auto mb-2 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="text-sm text-gray-600">
            Fotografiere deine nächste Mahlzeit für sofortige Analysen und trainingsoptimierte Empfehlungen
          </div>
        </div>
        
        <button className="w-full py-2.5 bg-[#F59E0B] text-white rounded-lg text-sm font-medium">
          Mahlzeit scannen
        </button>
      </div>
    </div>
  </div>
);

// Body Analyzer Demo - Enhanced UX
export const BodyAnalyzerDemo: React.FC = () => (
  <div className="relative h-full w-full">
    {/* Kompakter Header */}
    <div className="absolute top-0 left-0 right-0 bg-[#8B5CF6] text-white py-3 px-3.5 z-10 flex justify-between items-center">
      <div className="font-medium text-base">Körperanalyse</div>
      <div className="flex items-center text-xs bg-white/20 px-2.5 py-0.5 rounded-full">
        <span>KI-gestützt</span>
      </div>
    </div>
    
    {/* Optimized Content Area */}
    <div className="absolute top-[45px] left-0 right-0 bottom-0 bg-gray-50 p-3.5">
      {/* Before/After Comparison Card */}
      <div className="bg-white rounded-xl shadow-sm p-3.5 mb-3.5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full bg-[#8B5CF6]/15 flex items-center justify-center mr-2.5">
              <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="font-medium text-base text-gray-800">Vorher/Nachher</div>
          </div>
          <div className="text-xs bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full font-medium">
            Positive Veränderung
          </div>
        </div>
        
        {/* Visual Comparison Area */}
        <div className="h-24 mb-2.5 bg-[#8B5CF6]/5 rounded-xl flex">
          <div className="w-1/2 h-full border-r border-white/30 px-3 flex flex-col justify-center items-center">
            <div className="text-xs text-gray-500 mb-1">Vorher</div>
            <div className="h-12 w-8 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="w-1/2 h-full px-3 flex flex-col justify-center items-center">
            <div className="text-xs text-gray-500 mb-1">Nachher</div>
            <div className="h-12 w-8 bg-[#8B5CF6]/30 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-center text-gray-500">
          Erstelle einfach Fortschrittsbilder und verfolge deine Veränderungen
        </div>
      </div>
      
      {/* Analysis Results Card */}
      <div className="bg-white rounded-xl shadow-sm p-3.5">
        <div className="flex justify-between items-center mb-3">
          <div className="font-medium text-base text-gray-800">KI-Analyse</div>
          <div className="text-xs text-[#8B5CF6] font-medium">8 Wochen Fortschritt</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2.5 mb-3.5">
          <div className="bg-[#8B5CF6]/5 rounded-lg p-2.5 text-center">
            <div className="text-[#8B5CF6] font-medium text-sm mb-1">-2.8%</div>
            <div className="text-xs text-gray-700">Körperfett</div>
          </div>
          <div className="bg-[#8B5CF6]/5 rounded-lg p-2.5 text-center">
            <div className="text-[#8B5CF6] font-medium text-sm mb-1">+1.4kg</div>
            <div className="text-xs text-gray-700">Muskelmasse</div>
          </div>
          <div className="bg-[#8B5CF6]/5 rounded-lg p-2.5 text-center">
            <div className="text-[#8B5CF6] font-medium text-sm mb-1">+9%</div>
            <div className="text-xs text-gray-700">Definition</div>
          </div>
        </div>
        
        <div className="bg-[#8B5CF6]/10 rounded-lg p-2.5 mb-3.5 flex items-center">
          <svg className="w-5 h-5 text-[#8B5CF6] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div className="text-sm text-gray-600">
            <span className="font-medium">KI-Prognose:</span> Erreiche dein Ziel in weiteren 6 Wochen
          </div>
        </div>
        
        <button className="w-full py-2.5 bg-[#8B5CF6] text-white rounded-lg text-sm font-medium">
          Neues Foto hinzufügen
        </button>
      </div>
    </div>
  </div>
);