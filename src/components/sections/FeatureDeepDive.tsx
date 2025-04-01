"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export function FeatureDeepDive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.5 });
  const controls = useAnimation();

  const [activeDeepDive, setActiveDeepDive] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasCompletedHorizontal, setHasCompletedHorizontal] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [hasEnteredSection, setHasEnteredSection] = useState(false);

  // Throttle-Mechanismus für Scroll-Ereignisse
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Farben konsistent mit anderen Sektionen
  const colors = {
    primary: "#9bc539", // Frisches Grün als Hauptfarbe
    blue: "#3498db", // Akzent Blau
    orange: "#ff7846", // Warmes Orange als Kontrast
    purple: "#8B5CF6", // Lila für Feature-Section
    dark: "#2d3748", // Dunkler Text für Überschriften
    gray: "#4a5568", // Grau für Fließtext
  };

  // Tiefergehende Feature-Informationen
  const featureInsights = [
    {
      id: "ai-coach-insights",
      title: "KI-Coach im Alltag",
      subtitle: "Wie Athly deinen Alltag revolutioniert",
      color: colors.primary,
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      benefits: [
        "Tägliche Anpassungen basierend auf deinem Feedback und deiner Tagesform",
        "Personalisierte Erinnerungen, die dich motiviert halten",
        "Intelligente Übungsvorschläge, die genau zu deinen Zielen passen",
      ],
      quote: {
        text: "Seit ich Athly nutze, habe ich endlich einen Plan, der sich an mich anpasst – nicht umgekehrt. Es fühlt sich an, als hätte ich einen echten Coach in der Tasche.",
        author: "Lisa, 34 – nutzt Athly seit 3 Monaten",
      },
      stats: [
        { value: "94%", label: "höhere Trainingsregelmäßigkeit" },
        { value: "78%", label: "weniger verpasste Trainingseinheiten" },
      ],
    },
    {
      id: "adaptive-training-insights",
      title: "Trainings, die mitwachsen",
      subtitle: "Warum adaptive Pläne bessere Ergebnisse liefern",
      color: colors.blue,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      benefits: [
        "Automatische Progression basierend auf deinen Fortschritten",
        "Intelligente Belastungssteuerung verhindert Übertraining",
        "Alternative Übungen bei Gelenkschmerzen oder Einschränkungen",
      ],
      quote: {
        text: "Der Unterschied zu anderen Apps ist erstaunlich. Wenn ich müde bin, passt sich mein Training an – kein stures Durchziehen mehr. So bleibe ich verletzungsfrei und motiviert.",
        author: "Thomas, 42 – nutzt Athly seit 6 Monaten",
      },
      stats: [
        { value: "32%", label: "schnellere Fortschritte" },
        { value: "87%", label: "weniger Trainingsabbrüche" },
      ],
    },
    {
      id: "nutrition-insights",
      title: "Ernährung, die schmeckt",
      subtitle: "Individualisierte Ernährungspläne ohne Verzicht",
      color: colors.orange,
      image:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      benefits: [
        "Berücksichtigung deiner Vorlieben, Allergien und Lebensstil",
        "Anpassung an deinen Trainingsrhythmus und Energiebedarf",
        "Flexible Alternativen für spontane Änderungen im Tagesablauf",
      ],
      quote: {
        text: "Früher habe ich Diäten gehasst. Mit Athly esse ich, was mir schmeckt und erreiche trotzdem meine Ziele. Die Vorschläge passen perfekt zu meinem hektischen Arbeitsalltag.",
        author: "Sophia, 29 – nutzt Athly seit 4 Monaten",
      },
      stats: [
        { value: "83%", label: "höhere Zufriedenheit mit der Ernährung" },
        { value: "67%", label: "weniger Heißhungerattacken" },
      ],
    },
    {
      id: "tracking-insights",
      title: "Motivation durch Fortschritt",
      subtitle: "Wie Daten deine Fitness-Reise transformieren",
      color: colors.purple,
      image:
        "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      benefits: [
        "Visuelle Fortschrittstracking für sofortige Erfolgserlebnisse",
        "KI-basierte Meilensteine, die auf deine Ziele abgestimmt sind",
        "Langzeitanalysen, die versteckte Erfolgsmuster aufdecken",
      ],
      quote: {
        text: "Die Fortschrittsanalysen von Athly sind unglaublich motivierend. Selbst kleine Erfolge werden sichtbar gemacht. Das hat mir endlich geholfen, langfristig dranzubleiben.",
        author: "Markus, 37 – nutzt Athly seit 5 Monaten",
      },
      stats: [
        { value: "88%", label: "höhere langfristige Zielerreichung" },
        { value: "73%", label: "gesteigerte Trainingszufriedenheit" },
      ],
    },
  ];

  // Funktion zum Scrollen zu einem bestimmten Feature mit Verzögerung
  const scrollToCard = (index: number, smooth = true) => {
    if (isScrolling) return;

    setIsScrolling(true);
    setActiveDeepDive(index);

    // Timeout für isScrolling
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.getElementsByClassName("feature-card");
      if (cards[index]) {
        const cardWidth = cards[0].clientWidth;
        const gap = 24; // 24px gap
        const scrollPosition = index * (cardWidth + gap);

        container.scrollTo({
          left: scrollPosition,
          behavior: smooth ? "smooth" : "auto",
        });
      }
    }

    // Prüfen, ob wir am Ende des horizontalen Scrollens sind
    if (index === featureInsights.length - 1) {
      setHasCompletedHorizontal(true);
    } else {
      setHasCompletedHorizontal(false);
    }

    // Nach der Animation isScrolling zurücksetzen
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 400); // Etwas kürzer als die transition-duration
  };

  // IntersectionObserver für Sichtbarkeit der Section
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting && !hasEnteredSection) {
          setHasEnteredSection(true);
          // Bei erstem Eintritt in die Section zur ersten Karte scrollen
          setTimeout(() => {
            scrollToCard(0, false);
          }, 100);
        } else if (!entry.isIntersecting && hasEnteredSection) {
          // Reset beim Verlassen der Section
          setHasEnteredSection(false);
        }
      },
      {
        threshold: 0.5, // 50% der Section muss sichtbar sein
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasEnteredSection]);

  // Wheel-Event-Handler
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    let lastScrollTime = 0;
    const scrollThrottleMs = 150; // Mindestzeit zwischen Scroll-Ereignissen

    const handleWheel = (e: WheelEvent) => {
      // Nur behandeln, wenn Maus über dem Container
      if (!isMouseOver) return;

      // Throttling für schnelles Scrollen
      const now = Date.now();
      if (now - lastScrollTime < scrollThrottleMs) {
        e.preventDefault();
        return;
      }

      lastScrollTime = now;

      // Wenn letzte Karte und nach unten scrollen -> normal weiter
      if (hasCompletedHorizontal && e.deltaY > 0) {
        return;
      }

      e.preventDefault();

      if (isScrolling) return;

      // Scroll-Richtung bestimmen
      if (e.deltaY > 0 && activeDeepDive < featureInsights.length - 1) {
        // Scroll down/right
        scrollToCard(activeDeepDive + 1);
      } else if (e.deltaY < 0 && activeDeepDive > 0) {
        // Scroll up/left
        scrollToCard(activeDeepDive - 1);
      }
    };

    const handleMouseEnter = () => {
      setIsMouseOver(true);
    };

    const handleMouseLeave = () => {
      setIsMouseOver(false);
    };

    // Event-Listener hinzufügen mit passiven: false für preventDefault
    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeDeepDive, hasCompletedHorizontal, isScrolling, isMouseOver]);

  // Manueller Scroll-Handler für horizontale Synchronisation
  const handleScroll = () => {
    if (!scrollContainerRef.current || isScrolling) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.querySelector(".feature-card")?.clientWidth || 0;
    const gap = 24;

    if (cardWidth > 0) {
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));

      if (newIndex !== activeDeepDive) {
        setActiveDeepDive(newIndex);

        // Prüfen, ob wir am Ende des horizontalen Scrollens sind
        if (newIndex === featureInsights.length - 1) {
          setHasCompletedHorizontal(true);
        } else {
          setHasCompletedHorizontal(false);
        }
      }
    }
  };

  // Animation steuern
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });

      // Tastatur-Steuerung hinzufügen
      const handleKeyDown = (e: KeyboardEvent) => {
        if (isMouseOver) {
          if (e.key === "ArrowRight" && activeDeepDive < featureInsights.length - 1) {
            scrollToCard(activeDeepDive + 1);
            e.preventDefault();
          } else if (e.key === "ArrowLeft" && activeDeepDive > 0) {
            scrollToCard(activeDeepDive - 1);
            e.preventDefault();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [inView, activeDeepDive, controls, isMouseOver]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-white overflow-hidden font-inter min-h-screen relative"
      style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"' }}
      id="feature-deep-dive"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-5 py-2 rounded-full mb-4"
            style={{
              backgroundColor: `${colors.primary}15`,
              color: colors.primary,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-wide font-medium">ATHLY IN DER PRAXIS</span>
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-semibold mb-5 text-gray-800 inline-block relative tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ lineHeight: 1.1 }}
          >
            Was Athly für <span style={{ color: colors.dark }}>dich</span> bedeutet
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] opacity-30"
              style={{ backgroundColor: colors.primary }}
              initial={{ width: 0 }}
              whileInView={{ width: "70%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
            ></motion.div>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-normal leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Entdecke, wie unsere innovativen Funktionen deinen Fitness-Alltag revolutionieren und dir zu echten,
            langfristigen Ergebnissen verhelfen.
          </motion.p>
        </div>

        {/* Feature Navigation Tabs */}
        <motion.div
          className="flex justify-center mb-8 overflow-x-auto sticky top-4 z-40 pb-2 bg-white/80 backdrop-blur-sm py-2 rounded-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
        >
          <div className="flex space-x-2">
            {featureInsights.map((feature, index) => (
              <button
                key={feature.id}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeDeepDive === index
                    ? "text-white shadow-md scale-105"
                    : "text-gray-600 hover:text-gray-900 bg-gray-100"
                }`}
                style={{
                  backgroundColor: activeDeepDive === index ? feature.color : "",
                  boxShadow: activeDeepDive === index ? `0 4px 14px -4px ${feature.color}40` : "",
                }}
                onClick={() => scrollToCard(index)}
              >
                {feature.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Horizontal-Scroll-Container mit visueller Führung */}
        <div className="min-h-[70vh] flex flex-col">
          {/* Visuelle Seitenführung */}
          <div
            className={`fixed z-50 top-1/2 transform -translate-y-1/2 right-4 hidden md:block transition-opacity duration-500 ${isMouseOver ? "opacity-100" : "opacity-0"}`}
          >
            <div className="space-y-2">
              {featureInsights.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full block transition-all duration-300 ${
                    activeDeepDive === index ? "w-6 h-6 -ml-2 -mt-2" : "bg-gray-300"
                  }`}
                  style={{
                    backgroundColor: activeDeepDive === index ? featureInsights[activeDeepDive].color : "",
                  }}
                  onClick={() => scrollToCard(index)}
                  aria-label={`Scroll to card ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Horizontally Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide flex-grow cursor-all-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={handleScroll}
          >
            {/* CSS für versteckte Scrollbar */}
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {featureInsights.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="feature-card flex-shrink-0 w-full md:w-[calc(100%-40px)] lg:w-[calc(90%-60px)] xl:w-[calc(80%-80px)] snap-center h-[70vh]"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Image Section */}
                    <div className="md:w-1/2 relative">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-[250px] md:h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          background: `linear-gradient(to right, ${feature.color}80, transparent)`,
                        }}
                      ></div>

                      {/* Feature Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div
                          className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                          style={{ backgroundColor: `${feature.color}90` }}
                        >
                          {index + 1}/4
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm md:text-base font-medium opacity-90">{feature.subtitle}</p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                      {/* Benefits */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-4 text-gray-800">Was das für dich bedeutet:</h4>
                        <ul className="space-y-3">
                          {feature.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <div
                                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3"
                                style={{
                                  backgroundColor: `${feature.color}15`,
                                  color: feature.color,
                                }}
                              >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span className="text-gray-700 font-normal">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Quote */}
                      <div className="mb-6 bg-gray-50 rounded-xl p-5 relative">
                        <div className="absolute -left-2 top-3 text-4xl opacity-20" style={{ color: feature.color }}>
                          "
                        </div>
                        <p className="text-gray-600 italic text-sm mb-2 relative z-10">"{feature.quote.text}"</p>
                        <p className="text-xs font-medium" style={{ color: feature.color }}>
                          {feature.quote.author}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        {feature.stats.map((stat, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-white shadow-sm border border-gray-100 text-center"
                          >
                            <div className="text-xl font-semibold mb-1" style={{ color: feature.color }}>
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Dezenter visueller Hinweis am letzten Slide */}
                      {index === featureInsights.length - 1 && (
                        <div className="mt-6 flex justify-center">
                          <div className="w-10 h-1 rounded-full bg-gray-200"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center items-center py-6">
            <div className="flex space-x-2">
              {featureInsights.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeDeepDive === index ? "w-8" : "bg-gray-300"
                  }`}
                  style={{
                    backgroundColor: activeDeepDive === index ? featureInsights[activeDeepDive].color : "",
                  }}
                  onClick={() => scrollToCard(index)}
                  aria-label={`Scroll to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
