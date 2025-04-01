"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Enhanced3DPhoneMockup } from "@/components/ui/Enhanced3DPhoneMockup";
import {
  GoalTrackingDemo,
  AdaptiveTrainingDemo,
  NutritionSyncDemo,
  BodyAnalyzerDemo,
} from "@/components/demo/features";
import { WaitlistModal } from "@/components/waitlist/waitlist-modal";

// Optimierter AI Coach bleibt als erstes Feature unverändert
const OptimizedAiCoachDemo = ({ isVisible = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Starte die Animation nur, wenn die Komponente sichtbar wird
  useEffect(() => {
    if (isVisible && !shouldAnimate) {
      setShouldAnimate(true);
    }
  }, [isVisible, shouldAnimate]);

  // Simuliere den Chat-Ablauf nur, wenn shouldAnimate true ist
  useEffect(() => {
    if (!shouldAnimate) return;

    const messages = [
      { type: "user-audio", delay: 800 },
      { type: "typing", delay: 1000 },
      { type: "coach-response", delay: 1500 },
      { type: "user-text", delay: 1800 },
    ];

    const showNextMessage = async (index) => {
      if (index >= messages.length) return;

      if (messages[index].type === "typing") {
        setIsTyping(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsTyping(false);
      }

      setCurrentMessage(index + 1);

      setTimeout(() => {
        showNextMessage(index + 1);
      }, messages[index].delay);
    };

    const timer = setTimeout(() => {
      showNextMessage(0);
    }, 600);

    return () => clearTimeout(timer);
  }, [shouldAnimate]);

  // Scrolle nur innerhalb des Chat-Containers (beeinträchtigt nicht den Seitenscroll)
  useEffect(() => {
    if (messagesEndRef.current && chatContainerRef.current && shouldAnimate) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [currentMessage, isTyping, shouldAnimate]);

  // Audio-Wellen-Animation
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
  );

  // Einfacher Typing-Indikator
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
  );

  // Toggle Recording-Status
  const toggleRecording = () => {
    setIsRecording(!isRecording);

    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };

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

      {/* Chat-Nachrichten-Bereich mit einem Ref zur Steuerung des Scrollens */}
      <div
        ref={chatContainerRef}
        className="absolute top-[40px] left-0 right-0 bottom-[56px] bg-gradient-to-b from-gray-50 to-white p-3 overflow-y-auto"
      >
        {/* Datums-Header */}
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

        {/* AI Answer */}
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
                <div className="font-medium text-xs block mb-2">Ich habe deinen angepassten Plan erstellt:</div>

                {/* Mobile-Optimized Workout Card */}
                <div className="mt-2 mb-3 bg-white rounded-lg overflow-hidden border border-[#3B82F6]/15 shadow-sm">
                  {/* Blue Header with Simplified Layout */}
                  <div className="bg-[#3B82F6] px-2.5 py-1.5 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-white font-medium text-xs">Oberkörper-Fokus</div>
                    </div>
                    <div className="bg-white/20 rounded-full px-1.5 py-0.5 text-[10px] text-white">Personalisiert</div>
                  </div>

                  {/* Simplified Content Area */}
                  <div className="p-2 flex items-center space-x-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#3B82F6] font-medium text-xs">Kniegelenk-schonend</div>
                      <div className="flex items-center">
                        <span className="text-[10px] text-gray-600">5+ Übungen • 35 Min</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 bg-[#3B82F6]/10 p-1 rounded-full">
                      <svg className="w-3.5 h-3.5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Mobile-Optimized Tip Section */}
                <div className="text-xs text-gray-600 mt-2 px-1">
                  <span className="text-[#3B82F6] font-medium block mb-0.5">Tipp:</span>
                  Für deine Knie habe ich eine Regenerationssequenz vorbereitet.
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

        {/* Unsichtbares div für Scroll-Referenz */}
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
              <button className={`px-2 ${isRecording ? "text-red-500" : "text-gray-400"}`} onClick={toggleRecording}>
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
          <button className="ml-2 bg-[#3B82F6] text-white p-1.5 rounded-full shadow-sm flex items-center justify-center">
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
  );
};

export function FeatureSection() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const demoRefs = useRef({});
  const [visibleDemos, setVisibleDemos] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State für das Waitlist-Modal

  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Einrichtung der Intersection Observer für jede Demo-Komponente
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.dataset.id;
          if (entry.isIntersecting && id) {
            setVisibleDemos((prev) => ({
              ...prev,
              [id]: true,
            }));
          }
        });
      },
      { threshold: 0.4 }
    );

    // Beobachte alle Demo-Container
    Object.keys(demoRefs.current).forEach((id) => {
      if (demoRefs.current[id]) {
        observer.observe(demoRefs.current[id]);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Alternativer Ansatz: Direkt das Modal öffnen statt zu scrollen
  const openWaitlistModal = () => {
    setIsModalOpen(true);
  };

  // 60/30/10 Farbprinzip
  const colors = {
    // 60% - Neutrale Farben
    neutralDark: "#1f2937",
    neutralMedium: "#4b5563",
    neutralLight: "#f9fafb",

    // 30% - Markenfarben
    primary: "#9bc539",
    secondary: "#3B82F6",
    tertiary: "#F59E0B",
    quaternary: "#8B5CF6",

    // 10% - CTA und Highlights
    ctaGreen: "#8ab42d",
  };

  // Optimierte Features mit separaten Mockup-Komponenten
  const features = [
    {
      id: "ai-coach",
      badge: "PERSÖNLICHER KI-COACH",
      title: "Dein 24/7 Coach: Personalisierte Fitness-Beratung auf Knopfdruck",
      description:
        "Schluss mit Standardplänen und generischen Tipps. Athly's KI-Coach analysiert deine individuellen Bedürfnisse und liefert maßgeschneiderte Trainingspläne in Echtzeit – ganz natürlich, als würdest du mit einem persönlichen Trainer sprechen.",
      color: colors.secondary,
      highlights: [
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          ),
          title: "24/7 Coach-Zugang",
          description: "Stelle Fragen und erhalte sofort qualifizierte Antworten – zu jeder Zeit.",
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          title: "Sofortige Antworten zu allen Fitness-Fragen",
          description: "Keine Wartezeiten, keine Termine – dein Coach ist immer verfügbar.",
        },
      ],
      mockupContent: <OptimizedAiCoachDemo />,
      stats: [
        { label: "Antwortzeit", value: "< 1 Sek" },
        { label: "Verfügbarkeit", value: "24/7" },
        { label: "Personalisierung", value: "100%" },
      ],
    },
    {
      id: "goal-tracking", // Geändert von adaptive-training zu goal-tracking
      badge: "PERSÖNLICHER ZIEL-TRACKER",
      title: "Deine Ziele im Blick – immer und überall",
      description:
        "Verfolge deine Fortschritte, erhalte KI-Insights zu deinen Erfolgen und behalte den Überblick über alle deine Fitness-Ziele in einer übersichtlichen Oberfläche.",
      color: colors.primary,
      highlights: [
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          ),
          title: "Echtzeit-Tracking",
          description: "Verfolge deine Fortschritte und erhalte sofortige Updates zu deinen Zielen.",
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
          title: "KI-Insights",
          description: "Entdecke Muster in deinem Training und erhalte personalisierte Empfehlungen.",
        },
      ],
      mockupContent: <GoalTrackingDemo />, // Hier wird GoalTrackingDemo verwendet
      stats: [
        { label: "Motivationssteigerung", value: "+87%" },
        { label: "Zielerreichung", value: "+65%" },
        { label: "Personalisierung", value: "100%" },
      ],
    },
    {
      id: "nutrition-sync",
      badge: "ERNÄHRUNG & TRAINING IN SYNC",
      title: "Foto-Scan & KI-Analyse: Optimale Ernährung ohne Rätselraten.",
      description:
        "Fotografiere deine Mahlzeit und Athly's KI identifiziert sofort alle Nährwerte – perfekt abgestimmt auf deine Trainingsziele. Keine Kalorien zählen, kein Rätselraten – nur maßgeschneiderte Ernährung, die deine Fitness-Performance maximiert.",
      color: colors.tertiary,
      comingSoon: true,
      highlights: [
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
          ),
          title: "Fortschrittliche Lebensmittel-Erkennungs-KI",
          description: "Unsere KI erkennt Lebensmittel und Portionsgrößen präziser als jede andere App auf dem Markt.",
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          title: "Trainings-synchronisierte Nährwerte",
          description:
            "Die KI passt Ernährungsempfehlungen automatisch an deine Trainingsintensität und Regenerationsphase an.",
        },
      ],
      mockupContent: <NutritionSyncDemo />,
      stats: [
        { label: "Zeiteinsparung", value: "85%" },
        { label: "Durchschnittliche Leistungssteigerung", value: "+65%" },
      ],
    },
    {
      id: "body-analyzer",
      badge: "KI-KÖRPERANALYSE",
      title: "Sehe deine Fortschritte mit eigenen Augen",
      description:
        "Erfasse deinen Körper per Foto und unsere hochentwickelte KI liefert detaillierte Analysen zu Körperfett, Muskelmasse und Proportionen – präziser als menschliche Trainer und ohne unangenehme Messungen. So siehst du genau, was funktioniert und was nicht.",
      color: colors.quaternary,
      highlights: [
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          ),
          title: "Motivierende Insights",
          description: "Sichtbare Fortschritte und Prognosen halten dich langfristig motiviert.",
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          ),
          title: "KI-Prognosen & Empfehlungen",
          description:
            "Die KI projiziert zukünftige Ergebnisse und gibt maßgeschneiderte Empfehlungen für Trainings- und Ernährungsoptimierung..",
        },
      ],
      mockupContent: <BodyAnalyzerDemo />,
      stats: [
        { label: "Genaue Analyse", value: "< 30 Sek" },
        { label: "Motivationsschub", value: "+92%" },
        { label: "Messbarer Fortschritt", value: "Garantiert" },
      ],
    },
  ];

  return (
    <section ref={containerRef} className="relative py-12 md:py-20 overflow-hidden bg-white" id="features">
      {/* Vereinfachter Hintergrund für bessere Performance */}
      <div className="absolute inset-0 -z-10 opacity-5 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-gradient-to-bl from-gray-50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-tr from-gray-50 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <div className="mb-3 flex justify-center">
            <div className="inline-block px-3 py-1.5 rounded-full bg-gray-100 text-gray-800">
              <span className="text-xs md:text-sm uppercase tracking-wide font-medium">Mehr als nur eine App:</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800 tracking-tight">
            Athly's <span style={{ color: colors.primary }}>Features</span> deinen Fitness-Erfolg
          </h2>

          <p className="text-base md:text-lg text-gray-600 mx-auto font-normal leading-relaxed">
            Von KI-Coach bis Körperanalyse: Athly bietet dir alles für deinen Fitness-Erfolg.
          </p>
        </div>

        {/* Feature Sections - Mit reduzierten Animationen */}
        <div className="space-y-16 md:space-y-24">
          {features.map((feature, index) => (
            <div key={feature.id} className="relative">
              {/* Verbindungslinie zwischen Features */}
              {index < features.length - 1 && (
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-[100%] w-px h-12 md:h-16 bg-gradient-to-b from-gray-200 to-transparent"></div>
              )}

              {/* Desktop Layout: 2-column */}
              <div className="hidden md:flex flex-col md:flex-row items-start gap-12">
                {/* Left column: Feature content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                  <div className="text-center md:text-left">
                    {/* Badge & Title */}
                    <div
                      className="inline-block px-3 py-1 rounded-full text-sm mb-2 bg-blue-50 text-blue-600"
                      style={{
                        backgroundColor: `${feature.color}10`,
                        color: feature.color,
                      }}
                    >
                      {feature.badge}
                    </div>

                    {feature.comingSoon && (
                      <div className="mb-2">
                        <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      </div>
                    )}

                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 tracking-tight">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 mb-6 max-w-lg mx-auto md:mx-0">{feature.description}</p>

                    {/* Feature Info Boxes - Desktop */}
                    <div className="space-y-4 mb-6">
                      {feature.highlights.map((highlight, i) => (
                        <div key={i} className="bg-white shadow-sm rounded-xl p-4 border border-gray-100">
                          <div className="flex items-start">
                            <div
                              className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center mr-3 text-blue-500"
                              style={{ color: feature.color }}
                            >
                              {highlight.icon}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 mb-1">{highlight.title}</div>
                              <div className="text-sm text-gray-600">{highlight.description}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Feature Stats - clean row format */}
                    <div className="flex justify-between gap-3 mb-6">
                      {feature.stats.map((stat, i) => (
                        <div key={i} className="flex-1 bg-gray-50 rounded-xl py-3 px-2 text-center">
                          <div className="font-bold text-lg mb-1" style={{ color: feature.color }}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column: Demo-Telefon mit Lazy-Loading */}
                <div
                  className={`w-full md:w-1/2 ${index % 2 === 1 ? "md:order-1" : "md:order-2"}`}
                  ref={(el) => (demoRefs.current[feature.id] = el)}
                  data-id={feature.id}
                >
                  <Enhanced3DPhoneMockup
                    content={React.cloneElement(feature.mockupContent, {
                      isVisible: visibleDemos[feature.id],
                    })}
                    color={feature.color}
                    isMobile={false}
                  />
                </div>
              </div>

              {/* Mobile Layout: Vertically stacked with feature boxes under phone */}
              <div className="flex flex-col md:hidden">
                {/* Badge & Title */}
                <div className="text-center mb-6">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-sm mb-2 bg-blue-50 text-blue-600"
                    style={{
                      backgroundColor: `${feature.color}10`,
                      color: feature.color,
                    }}
                  >
                    {feature.badge}
                  </div>

                  {feature.comingSoon && (
                    <div className="mb-2">
                      <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-3 text-gray-800 tracking-tight">{feature.title}</h3>

                  <p className="text-gray-600 mb-5 text-sm">{feature.description}</p>
                </div>

                {/* Mobile Demo mit Lazy Loading */}
                <div ref={(el) => (demoRefs.current[`mobile-${feature.id}`] = el)} data-id={`mobile-${feature.id}`}>
                  <Enhanced3DPhoneMockup
                    content={React.cloneElement(feature.mockupContent, {
                      isVisible: visibleDemos[`mobile-${feature.id}`],
                    })}
                    color={feature.color}
                    isMobile={true}
                  />
                </div>

                {/* Feature Boxes - Under the Phone on Mobile */}
                <div className="space-y-3 my-5">
                  {feature.highlights.map((highlight, i) => (
                    <div key={i} className="bg-white shadow-sm rounded-xl p-3 border border-gray-100">
                      <div className="flex items-start">
                        <div
                          className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center mr-3 text-blue-500"
                          style={{ color: feature.color }}
                        >
                          {highlight.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 mb-0.5 text-sm">{highlight.title}</div>
                          <div className="text-xs text-gray-600">{highlight.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Stats */}
                <div className="flex justify-between gap-2 mb-4">
                  {feature.stats.map((stat, i) => (
                    <div key={i} className="flex-1 bg-gray-50 rounded-xl py-2 px-1 text-center">
                      <div className="font-bold text-base mb-0.5" style={{ color: feature.color }}>
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action - Simplified */}
        <div className="mt-16 md:mt-24 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">
            Bereit für ein neues Fitness-Erlebnis?
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm md:text-base">
            Starte noch heute mit Athly und erlebe, wie personalisiertes Training und Ernährung dein Leben verändern
            können.
          </p>
          <button
            onClick={openWaitlistModal}
            className="inline-flex items-center px-5 py-2.5 text-white font-medium rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: colors.ctaGreen,
              boxShadow: `0 4px 14px -4px ${colors.ctaGreen}40`,
            }}
          >
            <span>Jetzt starten</span>
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Trust Signals */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs md:text-sm">
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 text-[#9bc539] mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Datenschutz garantiert</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 text-[#9bc539] mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Auf allen Geräten</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 text-[#9bc539] mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span>Kostenlose Testversion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Modal hinzugefügt */}
      <AnimatePresence>{isModalOpen && <WaitlistModal onClose={() => setIsModalOpen(false)} />}</AnimatePresence>
    </section>
  );
}
