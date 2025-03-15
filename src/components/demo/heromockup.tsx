"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function HeroMockupAnimation() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [startButtonHovered, setStartButtonHovered] = useState(false)
  const workoutCardRef = useRef(null)

  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Simplified conversation sequence
  useEffect(() => {
    const sequence = async () => {
      // User message
      setCurrentMessageIndex(1)
      await delay(800)
      
      // Coach typing indicator
      setIsTyping(true)
      await delay(1200)
      setIsTyping(false)
      
      // Coach response
      setCurrentMessageIndex(2)
      await delay(800)
      
      // Workout card and final user response
      setCurrentMessageIndex(3)
    }

    const timer = setTimeout(() => {
      sequence()
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  // Utility delay function
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  // Animation variants
  const messageVariants = {
    initial: { opacity: 0, y: 10, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  }

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-xl shadow-sm border border-gray-100">
      {/* Device Status Bar */}
      <div className="flex justify-between items-center px-3 py-1 bg-gray-50">
        <div className="text-xs font-medium ml-4 text-gray-600">9:41</div>
        <div className="flex items-center space-x-1">
          <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" />
          </svg>
          <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            <path d="M17 12c0-2.76-2.24-5-5-5v10c2.76 0 5-2.24 5-5z" />
          </svg>
          <div className="text-xs font-medium text-gray-600">100%</div>
        </div>
      </div>

      {/* Content Area - Elegantly optimized */}
      <div className="flex-1 px-3 py-2 flex flex-col bg-gradient-to-b from-white to-gray-50 overflow-y-auto">
        {/* Date Header - Only shown on non-mobile devices */}
        {!isMobile && (
          <div className="flex justify-center mb-3">
            <div className="bg-gray-100 rounded-full px-3 py-1 shadow-sm">
              <span className="text-xs text-gray-500 font-medium">Heute, 9:41</span>
            </div>
          </div>
        )}

        {/* User Message - More concise but still readable */}
        <AnimatePresence>
          {currentMessageIndex >= 1 && (
            <motion.div
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex justify-end mb-2.5"
            >
              <div className="max-w-[85%] bg-gradient-to-r from-[#4361ee] to-[#4895ef] text-white rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-sm">
                <p className="text-xs md:text-sm">
                  {isMobile 
                    ? "Hey! Ich möchte in Top-Form kommen. Kannst du helfen?" 
                    : "Hey! Der Sommer steht vor der Tür und ich möchte in Top-Form kommen. Kannst du mir helfen?"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex mb-2.5"
              key="typing-indicator"
            >
              <div className="w-7 h-7 bg-[#9bc539] rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 725 750" fill="none">
                  <path
                    d="M549.579 685L362.5 298L175.421 685H31.4276L0 750H217L362 450L507 750H725L693.572 685H549.579Z"
                    fill="white"
                  />
                  <path
                    d="M662.65 621L362.5 0L104.4 534H104.416L72.9944 599H72.9833L62.35 621H133.421L254.031 371.501L254.003 371.443L362.5 147L438.545 304.31L438.275 304.868L591.095 621H662.65Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="max-w-[85%] bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <motion.div
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.2 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coach Message - Slightly optimized for mobile */}
        <AnimatePresence>
          {currentMessageIndex >= 2 && (
            <motion.div
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex mb-2.5"
            >
              <div className="w-7 h-7 bg-[#9bc539] rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 725 750" fill="none">
                  <path
                    d="M549.579 685L362.5 298L175.421 685H31.4276L0 750H217L362 450L507 750H725L693.572 685H549.579Z"
                    fill="white"
                  />
                  <path
                    d="M662.65 621L362.5 0L104.4 534H104.416L72.9944 599H72.9833L62.35 621H133.421L254.031 371.501L254.003 371.443L362.5 147L438.545 304.31L438.275 304.868L591.095 621H662.65Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="max-w-[85%] bg-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-sm">
                <p className="text-xs md:text-sm text-gray-800">
                  {isMobile
                    ? "Klar! Hier ist dein 8-Wochen-Plan:"
                    : "Klar! Hier ist dein 8-Wochen-Sommerplan mit optimalen Workouts und Ernährungstipps:"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Workout Card - Elegantly optimized, not compressed */}
        <AnimatePresence>
          {currentMessageIndex >= 3 && (
            <motion.div
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex mb-2.5 ml-9"
            >
              <motion.div
                ref={workoutCardRef}
                className="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                whileHover={{ boxShadow: "0 8px 16px rgba(155, 197, 57, 0.1)" }}
              >
                {/* Top Bar with Summer Theme Gradient */}
                <div className="h-1.5 bg-gradient-to-r from-[#9bc539] to-[#4cc9f0]"></div>

                <div className="px-3 py-2.5">
                  {/* Title and Badge */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <h3 className="text-sm font-bold text-gray-800">Sommer-Body Plan</h3>
                      <span className="ml-2 text-[10px] font-medium text-white bg-[#9bc539] px-1.5 py-0.5 rounded-full">
                        Neu
                      </span>
                    </div>
                  </div>

                  {/* Key Stats - Elegantly arranged for mobile */}
                  {isMobile ? (
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-[#9bc539]/10 flex items-center justify-center mr-1.5">
                          <svg className="w-3 h-3 text-[#9bc539]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 4.318c-2.667 2.455-8 7.503-8 10.682 0 4.142 3.582 7.5 8 7.5s8-3.358 8-7.5c0-3.18-5.333-8.227-8-10.682z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className="font-medium text-xs text-gray-700">-5kg/8 Wo.</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-[#9bc539]/10 flex items-center justify-center mr-1.5">
                          <svg className="w-3 h-3 text-[#9bc539]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className="font-medium text-xs text-gray-700">94% Erfolg</div>
                      </div>
                    </div>
                  ) : (
                    // Desktop version: Original layout
                    <div className="flex gap-2 mb-2.5">
                      <div className="flex-1 bg-gray-50 rounded-lg p-2 flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-[#9bc539]/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-[#9bc539]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 4.318c-2.667 2.455-8 7.503-8 10.682 0 4.142 3.582 7.5 8 7.5s8-3.358 8-7.5c0-3.18-5.333-8.227-8-10.682z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className="font-medium text-[10px] text-gray-700">-5kg in 8 Wochen</div>
                      </div>
                      
                      <div className="flex-1 bg-gray-50 rounded-lg p-2 flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-[#9bc539]/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-[#9bc539]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className="font-medium text-[10px] text-gray-700">94% Erfolgsrate</div>
                      </div>
                    </div>
                  )}

                  {/* Call to Action Button */}
                  <motion.button
                    className="w-full bg-[#9bc539] hover:bg-[#8ab42d] text-white text-xs font-medium rounded-lg py-2 shadow-sm flex items-center justify-center"
                    onHoverStart={() => setStartButtonHovered(true)}
                    onHoverEnd={() => setStartButtonHovered(false)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="flex items-center"
                      animate={startButtonHovered ? { x: [0, 5, 0] } : {}}
                      transition={{ duration: 1, repeat: startButtonHovered ? Infinity : 0 }}
                    >
                      <span>Jetzt starten</span>
                      <svg
                        className="w-3.5 h-3.5 ml-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* User Grateful Response */}
        <AnimatePresence>
          {currentMessageIndex >= 3 && (
            <motion.div
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex justify-end"
              transition={{ delay: 0.5 }}
            >
              <div className="max-w-[85%] bg-gradient-to-r from-[#4361ee] to-[#4895ef] text-white rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-sm">
                <p className="text-xs md:text-sm">
                  {isMobile
                    ? "Wow, danke! Mit dir schaffe ich das! 💪"
                    : "Wow, danke! Mit dir schaffe ich das definitiv! 💪"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Input */}
      <div className="bg-white border-t border-gray-100 px-3 py-3">
        <div className="flex items-center">
          <div className="flex-1 bg-gray-100 rounded-full px-3.5 py-2 flex items-center shadow-sm">
            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-gray-600 text-xs placeholder-gray-400"
              placeholder="Nachricht schreiben..."
              disabled
            />
            <button className="text-gray-400">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
          <button
            className="ml-2 w-8 h-8 rounded-full bg-[#9bc539] flex items-center justify-center shadow-sm"
          >
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12l10 10 10-10M2 12h20" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}