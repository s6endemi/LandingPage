"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Optimierte AI Coach Demo ohne übermäßige Animationen
export const AiCoachDemo: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulate conversation flow with reduced delay times
  useEffect(() => {
    const messages = [
      { type: "user-audio", delay: 800 },
      { type: "typing", delay: 1000 },
      { type: "coach-response", delay: 1500 },
      { type: "user-text", delay: 1800 },
    ]

    const showNextMessage = async (index: number) => {
      if (index >= messages.length) return

      if (messages[index].type === "typing") {
        setIsTyping(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsTyping(false)
      }

      setCurrentMessage(index + 1)

      setTimeout(() => {
        showNextMessage(index + 1)
      }, messages[index].delay)
    }

    const timer = setTimeout(() => {
      showNextMessage(0)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  // Scroll to bottom when new messages appear
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [currentMessage, isTyping])

  // Simplified Audio Wave Animation
  const AudioWaveAnimation = () => (
    <div className="flex items-center space-x-1 h-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-[#3B82F6] rounded-full"
          animate={{
            height: isRecording ? [8, 12, 8] : 8 + Math.sin(i * 1.5) * 7,
          }}
          transition={{
            duration: isRecording ? 0.5 : 0.7,
            repeat: isRecording ? Number.POSITIVE_INFINITY : 0,
            delay: i * 0.1,
          }}
        ></motion.div>
      ))}
    </div>
  )

  // Simple Typing Indicator
  const TypingIndicator = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
          animate={{ y: [0, -2, 0] }}
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )

  // Toggle recording state
  const toggleRecording = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Simulate stopping recording after 3 seconds
      setTimeout(() => {
        setIsRecording(false)
      }, 3000)
    }
  }

  return (
    <div className="relative h-full w-full bg-gray-50 overflow-hidden rounded-xl shadow">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-[#3B82F6] text-white py-2 px-3 z-10 rounded-t-xl">
        <div className="flex justify-between items-center">
          <div className="font-medium text-sm">Athly Coach</div>
          <div className="flex items-center text-xs bg-white/20 px-2 py-0.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1"></div>
            <span>Jetzt aktiv</span>
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="absolute top-[40px] left-0 right-0 bottom-[56px] bg-gradient-to-b from-gray-50 to-white p-3 overflow-y-auto">
        {/* Date Header */}
        <div className="flex justify-center mb-3">
          <div className="bg-gray-100 rounded-full px-3 py-1 shadow-sm">
            <span className="text-xs text-gray-500 font-medium">Heute, 9:32</span>
          </div>
        </div>

        {/* User Audio Message */}
        <AnimatePresence>
          {currentMessage >= 1 && (
            <motion.div
              className="flex justify-end mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-[85%] bg-[#3B82F6]/10 rounded-2xl rounded-tr-sm p-3 text-sm text-gray-800 shadow-sm">
                <div className="flex items-center mb-1.5">
                  <svg
                    className="w-3.5 h-3.5 text-[#3B82F6] mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                  <span className="text-xs text-gray-500 mr-1.5">Sprachnachricht</span>
                  <span className="text-xs text-gray-500">0:16</span>
                </div>

                {/* Audio Waveform Display */}
                <div className="px-3 py-2 bg-white/80 backdrop-blur-sm rounded-lg flex items-center shadow-sm">
                  <AudioWaveAnimation />
                  <span className="ml-3 text-xs text-gray-600 font-medium">
                    "Hab Knieschmerzen seit gestern, was soll ich heute trainieren?"
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="flex mb-4"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-7 h-7 rounded-full bg-[#3B82F6] flex items-center justify-center text-white mr-2 flex-shrink-0 shadow-sm">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="max-w-[80%] bg-white rounded-2xl rounded-tl-sm p-3 text-sm text-gray-800 shadow-sm">
                <TypingIndicator />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Answer - Verbesserte Workout-Karte */}
        <AnimatePresence>
          {currentMessage >= 3 && (
            <motion.div
              className="flex mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-7 h-7 rounded-full bg-[#3B82F6] flex items-center justify-center text-white mr-2 flex-shrink-0 shadow-sm">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="max-w-[80%] bg-white rounded-2xl rounded-tl-sm p-3 text-sm text-gray-800 shadow-sm">
                <div className="font-medium text-xs block mb-2">
                  Ich habe deinen angepassten Plan erstellt:
                </div>

                {/* Elegante, moderne Workout-Karte */}
                <div className="mt-3 mb-4">
                  {/* Stylische Karte mit Farbverlauf und verbessertem Layout */}
                  <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
                    {/* Stylisher Header mit Gradient */}
                    <div className="bg-gradient-to-r from-[#3B82F6] to-[#60a5fa] px-3.5 py-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="text-white font-medium">Oberkörper-Fokus</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hauptinhalt mit verbesserten visuellen Elementen */}
                    <div className="bg-white p-3.5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mr-3">
                          <svg className="w-4.5 h-4.5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-[#3B82F6] font-medium">Kniegelenk-schonend</div>
                          <div className="flex items-center mt-0.5">
                            <svg className="w-3 h-3 text-[#3B82F6] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs text-gray-600">5+ Übungen • 35 Min</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 p-2 rounded-full transition-colors">
                          <svg className="w-4 h-4 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile-Optimized Tip Section */}
                <div className="text-xs text-gray-600 mt-3 px-1">
                  <div className="flex items-start">
                    <svg className="w-3.5 h-3.5 text-[#3B82F6] mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="text-[#3B82F6] font-medium block mb-0.5">Tipp:</span> 
                      Für deine Knie habe ich eine Regenerationssequenz vorbereitet.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Response */}
        <AnimatePresence>
          {currentMessage >= 4 && (
            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-[80%] bg-[#3B82F6]/10 rounded-2xl rounded-tr-sm p-3 text-sm text-gray-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Super, danke! Genau was ich brauche.</span>
                  <svg
                    className="w-3.5 h-3.5 text-[#3B82F6] ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Invisible div for scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area with Interactive Elements */}
      <div className="absolute left-0 right-0 bottom-0 border-t border-gray-200 p-2 bg-white z-10 rounded-b-xl">
        <div className="flex items-center">
          <div className="flex-1 flex rounded-full border border-gray-200 overflow-hidden bg-gray-50">
            <input
              type="text"
              className="flex-1 px-3 py-1.5 text-xs outline-none bg-transparent"
              placeholder="Stelle eine Frage..."
            />

            {/* Audio & Video Buttons */}
            <div className="flex">
              <button
                className={`px-2 ${isRecording ? "text-red-500" : "text-gray-400"}`}
                onClick={toggleRecording}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
              <button className="px-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Send Button */}
          <button
            className="ml-2 bg-[#3B82F6] text-white p-1.5 rounded-full shadow-sm flex items-center justify-center"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// Optimierte Intelligente Trainingsplanung Demo (ohne Tabs)
export const AdaptiveTrainingDemo: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(67)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-full w-full bg-gray-50 overflow-hidden rounded-xl shadow-md">
      {/* Header - ohne Tabs */}
      <div className="absolute top-0 left-0 right-0 bg-[#9bc539] text-white py-2.5 px-3 z-10 rounded-t-xl">
        <div className="flex justify-between items-center">
          <div className="font-medium">Smarter Plan</div>
          <div className="flex items-center text-xs bg-white/20 px-2 py-0.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-300 mr-1"></div>
            <span>Adaptiv</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="absolute top-[42px] left-0 right-0 bottom-0 p-3.5 overflow-y-auto">
        {/* Intelligence Card */}
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
            <div className="text-sm text-green-600 font-medium">
              +12% Leistung
            </div>
          </div>

          <div className="flex items-center px-1">
            <div className="w-full">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-green-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 0.8 }}
                ></motion.div>
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

          {/* Training Card */}
          <div className="bg-[#9bc539]/5 rounded-lg overflow-hidden mb-3 border border-[#9bc539]/10">
            <div className="px-3.5 py-2 bg-[#9bc539]/15 text-sm font-medium text-gray-700 flex justify-between items-center">
              <span>Oberkörper</span>
              <span className="text-[#9bc539]">45 Min</span>
            </div>

            <div className="px-3.5 py-2.5 space-y-2">
              {[
                { name: "Bankdrücken", increase: "+10%" },
                { name: "Schulterdrücken", increase: "+15%" },
              ].map((exercise, index) => (
                <div key={index} className="flex items-center text-xs">
                  <div className="w-4 h-4 rounded-full bg-[#9bc539]/20 flex items-center justify-center text-[#9bc539] mr-2">
                    <span className="text-[9px] font-bold">{index + 1}</span>
                  </div>
                  <div className="text-gray-700 text-sm flex-1">{exercise.name}</div>
                  <div className="text-[#9bc539] font-medium text-sm">
                    {exercise.increase}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full py-2.5 bg-[#9bc539] text-white rounded-lg text-sm font-medium"
          >
            Training starten
          </button>
        </div>

        {/* Progress Card - Vereinfacht ohne Hover-Tooltip */}
        <div className="bg-white rounded-xl shadow-sm p-3.5">
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-[#9bc539] mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <div className="text-sm font-medium text-gray-800">Fortschritt</div>
            </div>
            <div className="text-xs font-medium text-[#9bc539] bg-[#9bc539]/10 px-2 py-0.5 rounded-full">
              Woche 4 von 6
            </div>
          </div>

          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2.5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#9bc539]/70 to-[#9bc539]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            ></motion.div>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-[#9bc539] mr-1.5"></span>
              <span className="text-gray-600">
                Kraft <span className="text-[#9bc539] font-medium">+21%</span>
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-[#9bc539] mr-1.5"></span>
              <span className="text-gray-600">
                Fett <span className="text-[#9bc539] font-medium">-3%</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Optimierte Ernährungs-Demo mit klarem interaktiven Button
export const NutritionSyncDemo: React.FC = () => {
  const [scanComplete, setScanComplete] = useState(false)
  const [scanning, setScanning] = useState(false)

  // Simulate scan process
  const handleScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setScanComplete(true)
    }, 1500)
  }

  return (
    <div className="relative h-full w-full bg-gray-50 overflow-hidden rounded-xl shadow-md">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-[#F59E0B] text-white py-2.5 px-3 z-10 rounded-t-xl">
        <div className="flex justify-between items-center">
          <div className="font-medium">Mahlzeit-Scanner</div>
          <div className="flex items-center text-xs bg-white/20 px-2.5 py-0.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-300 mr-1"></div>
            <span>Verfügbar</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="absolute top-[42px] left-0 right-0 bottom-0 p-3.5 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* Scanning Animation */}
          {scanning && (
            <motion.div
              className="bg-white rounded-xl shadow-sm p-5 mb-3.5 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="text-sm font-medium text-gray-700 mb-2">Analysiere Mahlzeit...</div>
              <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#F59E0B]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                ></motion.div>
              </div>
            </motion.div>
          )}

          {/* Scan Result */}
          {scanComplete && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-3.5">
              <div className="px-3.5 py-2.5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#F59E0B] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="font-medium text-sm text-gray-700">Mediterrane Bowl</div>
                </div>
                <div className="text-sm text-[#F59E0B] font-medium">Heute, 13:24</div>
              </div>

              {/* Nutrition Stats */}
              <div className="p-3.5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3.5">
                  {[
                    { value: "490", label: "kcal" },
                    { value: "28g", label: "Protein" },
                    { value: "42g", label: "Carbs" },
                    { value: "18g", label: "Fett" },
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-gray-700 font-medium text-sm mb-0.5">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Coach Comment */}
                <div className="bg-[#F59E0B]/5 rounded-lg p-3 mb-3">
                  <div className="flex items-start">
                    <div className="w-7 h-7 rounded-full bg-[#F59E0B] flex items-center justify-center mr-2.5 flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Perfekt nach deinem Training!</span> Die 28g Protein unterstützen
                        deine Muskelregeneration optimal.
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
                    <motion.div
                      className="h-full bg-[#F59E0B]"
                      initial={{ width: "0%" }}
                      animate={{ width: "70%" }}
                      transition={{ duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
                
                <button
                  className="w-full py-2.5 bg-[#F59E0B] text-white rounded-lg text-sm font-medium mt-3"
                  onClick={() => setScanComplete(false)}
                >
                  Neue Mahlzeit scannen
                </button>
              </div>
            </div>
          )}

          {/* Scan Button Area mit klarer Anzeige der Interaktivität */}
          {!scanComplete && !scanning && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-3.5">
              <div className="text-center mb-3.5">
                <div className="h-12 w-12 mx-auto mb-2 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="text-sm text-gray-600">
                  Fotografiere deine nächste Mahlzeit für sofortige Analysen und trainingsoptimierte Empfehlungen
                </div>
              </div>

              {/* Klar interaktiver Button */}
              <div>
                <button
                  className="w-full py-2.5 bg-[#F59E0B] text-white rounded-lg text-sm font-medium"
                  onClick={handleScan}
                >
                  Mahlzeit scannen
                </button>
                {/* Visuelle Indikation für Demo */}
                <div className="text-center mt-2 text-xs text-[#F59E0B] font-medium flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  Klick mich für Demo
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Optimierte Körperanalyse Demo ohne Tabs
export const BodyAnalyzerDemo: React.FC = () => {
  const [progress, setProgress] = useState({
    fat: 0,
    muscle: 0,
    definition: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress({
        fat: -2.8,
        muscle: 1.4,
        definition: 9,
      })
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-full w-full bg-gray-50 overflow-hidden rounded-xl shadow-md">
      {/* Header ohne Tabs */}
      <div className="absolute top-0 left-0 right-0 bg-[#8B5CF6] text-white py-2 px-3 z-10 rounded-t-xl">
        <div className="flex justify-between items-center">
          <div className="font-medium">Körperanalyse</div>
          <div className="flex items-center text-xs bg-white/20 px-2 py-0.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-white mr-1"></div>
            <span>KI-gestützt</span>
          </div>
        </div>
      </div>

      {/* Content Area - Fixed to prevent scrolling */}
      <div className="absolute top-[36px] left-0 right-0 bottom-0 p-3 overflow-hidden flex flex-col">
        {/* Visual Comparison Area - More compact */}
        <div className="bg-white rounded-xl shadow-sm p-2.5 mb-2.5 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-[#8B5CF6]/15 flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="font-medium text-sm text-gray-800">Vorher/Nachher</div>
            </div>
            <div className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
              Positiv
            </div>
          </div>

          {/* Visual Comparison Area - More compact height */}
          <div className="h-24 mb-2 bg-[#8B5CF6]/5 rounded-xl flex">
            <div className="w-1/2 h-full border-r border-white/30 px-3 flex flex-col justify-center items-center">
              <div className="text-xs text-gray-500 mb-1">Vorher</div>
              <div className="h-12 w-8 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="mt-1 text-xs text-gray-600 font-medium">
                8 Wochen zuvor
              </div>
            </div>
            <div className="w-1/2 h-full px-3 flex flex-col justify-center items-center">
              <div className="text-xs text-gray-500 mb-1">Nachher</div>
              <div className="h-12 w-8 bg-[#8B5CF6]/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="mt-1 text-xs text-gray-600 font-medium">
                Heute
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results Card */}
        <div className="bg-white rounded-xl shadow-sm p-2.5 mb-2 flex-shrink-0">
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium text-sm text-gray-800">KI-Analyse</div>
            <div className="text-xs text-[#8B5CF6] font-medium">8 Wochen Fortschritt</div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-2">
            {[
              { label: "Körperfett", value: progress.fat, unit: "%" },
              { label: "Muskelmasse", value: progress.muscle, unit: "kg" },
              { label: "Definition", value: progress.definition, unit: "%" },
            ].map((stat, index) => (
              <div key={index} className="bg-[#8B5CF6]/5 rounded-lg p-2 text-center">
                <div className="text-[#8B5CF6] font-medium text-sm mb-0.5">
                  {stat.value > 0 ? "+" : ""}
                  {stat.value}
                  {stat.unit}
                </div>
                <div className="text-xs text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#8B5CF6]/10 rounded-lg p-2 mb-2 flex items-center">
            <svg className="w-4 h-4 text-[#8B5CF6] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <div className="text-xs text-gray-600">
              <span className="font-medium">KI-Prognose:</span> 6 Wochen bis zum Ziel
            </div>
          </div>

          <button className="w-full py-2 bg-[#8B5CF6] text-white rounded-lg text-sm font-medium mt-1">
            Neues Foto hinzufügen
          </button>
        </div>
      </div>
    </div>
  )
}

// Fixed Mobile Version for Body Analyzer - Optimized to fit without scrolling
export const MobileBodyAnalyzerDemo: React.FC = () => {
  const [progress, setProgress] = useState({
    fat: 0,
    muscle: 0,
    definition: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress({
        fat: -2.8,
        muscle: 1.4,
        definition: 9,
      })
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-full w-full bg-gray-50 overflow-hidden rounded-xl shadow-md">
      <div className="absolute top-0 left-0 right-0 bg-[#8B5CF6] text-white py-2 px-3 z-10 rounded-t-xl">
        <div className="flex justify-between items-center">
          <div className="font-medium">Körperanalyse</div>
          <div className="flex items-center text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
            <div className="w-1 h-1 rounded-full bg-white mr-1"></div>
            <span>KI-gestützt</span>
          </div>
        </div>
      </div>

      {/* Content Area - Fixed to prevent scrolling */}
      <div className="absolute top-[36px] left-0 right-0 bottom-0 p-2 overflow-hidden flex flex-col">
        {/* Visual Comparison Area - Simplified for mobile */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-2 flex-shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#8B5CF6]/15 flex items-center justify-center mr-1.5">
                <svg className="w-3.5 h-3.5 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="font-medium text-xs text-gray-800">Vorher/Nachher</div>
            </div>
            <div className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap">
              Positive Veränderung
            </div>
          </div>

          <div className="h-20 mb-1.5 bg-[#8B5CF6]/5 rounded-lg flex">
            <div className="w-1/2 h-full border-r border-white/30 flex flex-col justify-center items-center">
              <div className="text-[10px] text-gray-500 mb-1">Vorher</div>
              <div className="h-8 w-6 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="mt-1 text-[9px] text-gray-600 font-medium">
                8 Wochen zuvor
              </div>
            </div>
            <div className="w-1/2 h-full flex flex-col justify-center items-center">
              <div className="text-[10px] text-gray-500 mb-1">Nachher</div>
              <div className="h-8 w-6 bg-[#8B5CF6]/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="mt-1 text-[9px] text-gray-600 font-medium">
                Heute
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results and Button */}
        <div className="bg-white rounded-xl shadow-sm p-2 flex-shrink-0">
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            {[
              { label: "Körperfett", value: progress.fat, unit: "%" },
              { label: "Muskelmasse", value: progress.muscle, unit: "kg" },
              { label: "Definition", value: progress.definition, unit: "%" },
            ].map((stat, index) => (
              <div key={index} className="bg-[#8B5CF6]/5 rounded-lg p-1.5 text-center">
                <div className="text-[#8B5CF6] font-medium text-xs mb-0.5">
                  {stat.value > 0 ? "+" : ""}
                  {stat.value}
                  {stat.unit}
                </div>
                <div className="text-[10px] text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#8B5CF6]/10 rounded-lg p-1.5 mb-2 flex items-center">
            <svg className="w-3.5 h-3.5 text-[#8B5CF6] mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <div className="text-[10px] text-gray-600">
              <span className="font-medium">KI-Prognose:</span> 6 Wochen bis zum Ziel
            </div>
          </div>

          <button className="w-full py-1.5 bg-[#8B5CF6] text-white rounded-lg text-xs font-medium">
            Neues Foto hinzufügen
          </button>
        </div>
      </div>
    </div>
  )
}