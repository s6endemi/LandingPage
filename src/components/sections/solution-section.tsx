"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { WaitlistModal } from "@/components/waitlist/waitlist-modal";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image"; // Added Next.js Image import

export function SolutionSection() {
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState("ai-coach");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Colors
  const colors = {
    primary: "#9bc539",
    secondary: "#3B82F6",
    dark: "#1f2937",
    gray: "#6b7280",
    lightGray: "#f3f4f6",
    white: "#ffffff",
    ctaGreen: "#8ab42d",
  };

  // Open waitlist modal
  const openWaitlistModal = () => {
    setIsModalOpen(true);
    trackEvent("modal_open", "solution", { feature: activeFeature });
  };

  // Track feature selection
  const handleFeatureSelect = (featureId: string) => {
    setActiveFeature(featureId);
    trackEvent("feature_select", "solution", { feature: featureId });
  };

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -10 : -20]);

  // Features data
  const features = [
    {
      id: "ai-coach",
      title: "Dein KI-Coach",
      mobileTitle: "KI-Coach",
      description: "24/7 persönliche Betreuung & Motivation durch deinen KI-Coach",
      mobileDescription: "24/7 Betreuung & Motivation",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      id: "flexible-plan",
      title: "Flexibler Plan",
      mobileTitle: "Flexibler Plan",
      description: "Anpassbare Workouts, die zu deinem Zeitplan passen",
      mobileDescription: "Workouts für deinen Zeitplan",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "real-results",
      title: "Echte Resultate",
      mobileTitle: "Resultate",
      description: "87% unserer Nutzer erreichen ihre Fitnessziele",
      mobileDescription: "87% erreichen ihre Ziele",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={containerRef} className="relative py-10 sm:py-16 lg:py-20 overflow-hidden bg-white" id="solution">
      {/* Background elements - Lighter for mobile */}
      <motion.div className="absolute inset-0 -z-10 opacity-5 overflow-hidden" style={{ y: backgroundY }}>
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-gradient-to-bl from-gray-50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-gray-50 to-transparent rounded-full blur-3xl"></div>
      </motion.div>

      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header section - Simplified for mobile */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3"
            onViewportEnter={() => trackEvent("solution_badge_visible", "solution")}
          >
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium">
              {isMobile ? "KI-Fitness-Coaching" : "KI-gesteuertes Fitness-Coaching"}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight"
            onViewportEnter={() => trackEvent("solution_heading_visible", "solution")}
          >
            <span style={{ color: colors.primary }}>Dein persönlicher</span> KI-Coach,{" "}
            <span className="relative">
              immer dabei
              <svg
                className="absolute -bottom-1 left-0 w-full h-1.5 sm:h-2 text-green-200"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
              >
                <path d="M0,5 C50,2 150,2 200,5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600"
            onViewportEnter={() => trackEvent("solution_subheading_visible", "solution")}
          >
            {isMobile
              ? "Erreiche deine Ziele mit einem Coach, der dich versteht."
              : "Athly passt sich dir an – nicht umgekehrt. Erreiche deine Fitnessziele mit einem Coach, der dich versteht."}
          </motion.p>
        </div>

        {/* Hero Video + Overlay - Height reduced for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative rounded-xl shadow-lg overflow-hidden mb-6 sm:mb-10 md:mb-16"
          onViewportEnter={() => trackEvent("hero_video_visible", "solution")}
        >
          <div className="relative h-[200px] sm:h-[240px] md:h-[400px] overflow-hidden">
            {/* Video skeleton */}
            {!videoLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
            )}

            {/* Video with optimized loading - Use lower quality on mobile */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/athly-hero-placeholder.jpg"
              onLoadedData={() => setVideoLoaded(true)}
            >
              <source src="https://cdn.pixabay.com/video/2023/11/19/189729-886596145_small.mp4" type="video/mp4" />
            </video>

            {/* Video overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/50"></div>

            {/* Overlay content - Mobile optimized with simpler layout */}
            <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-12 max-w-2xl">
              {!isMobile && (
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1">
                    <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center mr-1.5">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-white font-medium">KI-Coach 24/7</span>
                  </div>

                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1">
                    <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center mr-1.5">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-white font-medium">Anpassbarer Plan</span>
                  </div>
                </div>
              )}

              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight mb-3 sm:mb-4">
                <span className="inline-block">Fitness-Transformation</span>
                <br />
                <span className="inline-block" style={{ color: colors.primary }}>
                  leicht gemacht
                </span>
              </h2>

              <button
                onClick={openWaitlistModal}
                className="mt-1 sm:mt-2 inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-900 font-medium rounded-lg shadow-md hover:shadow-lg active:translate-y-0.5 transition-all duration-300 group text-sm sm:text-base"
              >
                <span>{isMobile ? "Jetzt starten" : "Jetzt kostenlos starten"}</span>
                <svg
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Feature Selection Tabs - Mobile optimized with better touch targets */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gray-50 rounded-xl p-1 sm:p-1.5 flex justify-between">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureSelect(feature.id)}
                className={`py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all flex-1 ${
                  activeFeature === feature.id ? "bg-white shadow-sm text-gray-900" : "text-gray-600 hover:bg-white/50"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start">
                  {isMobile && <span className="mb-1 sm:mr-2">{feature.icon}</span>}
                  <span>{isMobile ? feature.mobileTitle : feature.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Content */}
        <AnimatePresence mode="wait">
          {/* Real Results Feature - Updated with Next.js Image components for before/after */}
          {activeFeature === "real-results" && (
            <motion.div
              key="real-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8 sm:mb-12"
              onAnimationComplete={() => trackEvent("feature_displayed", "solution", { feature: "real-results" })}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left: Testimonials & Results - Better condensed for mobile */}
                <div className="p-4 sm:p-5 md:p-8">
                  <div className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold tracking-wide mb-3 sm:mb-4">
                    NACHWEISBARE ERGEBNISSE
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                    {isMobile ? "Erfolge in 12 Wochen" : "Was unsere Nutzer in nur 12 Wochen erreicht haben"}
                  </h3>

                  {/* Mobile Before/After - Only shown on mobile */}
                  <div className="block md:hidden mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Transformationen unserer Nutzer
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <div className="rounded-lg overflow-hidden h-48 relative">
                          <Image
                            src="/images/voher.jpeg"
                            alt="Vorher Transformation"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: "cover" }}
                            priority
                          />
                        </div>
                        <div className="text-xs text-gray-500 text-center">Woche 1</div>
                      </div>
                      <div className="space-y-1">
                        <div className="rounded-lg overflow-hidden h-48 relative">
                          <Image
                            src="/images/nacher.jpeg"
                            alt="Nachher Transformation"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: "cover" }}
                            priority
                          />
                        </div>
                        <div className="text-xs text-gray-500 text-center">Woche 12</div>
                      </div>
                    </div>
                  </div>

                  {/* Results Cards - Better grid for mobile */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
                    {/* Card 1 */}
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">87%</div>
                      <div className="text-xs sm:text-sm text-gray-600">erreichen ihre Fitnessziele</div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">8-15kg</div>
                      <div className="text-xs sm:text-sm text-gray-600">durchschnittlicher Gewichtsverlust</div>
                    </div>
                  </div>

                  {/* Testimonial - Compact mobile version */}
                  {isMobile ? (
                    <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm mb-4">
                      <div className="flex items-center mb-1">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-2 font-medium">
                          M
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-xs sm:text-sm">Markus T.</div>
                          <div className="text-xs text-gray-600">-12kg in 12 Wochen</div>
                        </div>
                      </div>

                      <p className="text-xs text-gray-700 italic">
                        "Mit Athly konnte ich endlich mein Bauchfett loswerden. Die personalisierten Workouts und
                        Ernährungstipps passen perfekt zu meinem Alltag."
                      </p>

                      <div className="mt-1 flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm mb-5">
                      <div className="flex items-center mb-2">
                        <div className="h-10 w-10 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 font-medium">
                          M
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Markus T.</div>
                          <div className="text-xs text-gray-600">38 Jahre, -12kg in 12 Wochen</div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 italic">
                        "Nach Jahren erfolgloser Diäten hat Athly mein Leben verändert. Mein KI-Coach hat mir geholfen,
                        meine Ernährung umzustellen und regelmäßig zu trainieren. Die personalisierten Workouts passen
                        perfekt in meinen stressigen Berufsalltag, und die Resultate sprechen für sich."
                      </p>

                      <div className="mt-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mobile CTA - Only on mobile */}
                  {isMobile && (
                    <button
                      onClick={openWaitlistModal}
                      className="w-full flex items-center justify-center px-4 py-3 text-white font-medium rounded-xl shadow-md hover:shadow-lg active:translate-y-0.5 transition-all duration-300 group text-sm"
                      style={{ backgroundColor: colors.ctaGreen }}
                    >
                      <span>Jetzt loslegen</span>
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Right: Before/After & Benefits - Now visible on all screen sizes */}
                <div className="relative overflow-hidden hidden md:block">
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="absolute inset-0 opacity-20 bg-pattern-grid"></div>
                  </div>

                  <div className="relative h-full p-5 md:p-8 flex flex-col justify-center">
                    {/* Before/After Card - Updated with Next.js Image components */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md p-4 mb-6 border border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-base">
                        <svg
                          className="w-5 h-5 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Transformationen unserer Nutzer
                      </h4>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          {/* Before image with Next.js Image component */}
                          <div className="rounded-lg overflow-hidden h-56 md:h-72 relative">
                            <Image
                              src="/images/voher.jpeg"
                              alt="Vorher Transformation"
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              style={{ objectFit: "cover" }}
                              priority
                            />
                          </div>
                          <div className="text-xs text-gray-500 text-center">Woche 1</div>
                        </div>

                        <div className="space-y-2">
                          {/* After image with Next.js Image component */}
                          <div className="rounded-lg overflow-hidden h-56 md:h-72 relative">
                            <Image
                              src="/images/nacher.jpeg"
                              alt="Nachher Transformation"
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              style={{ objectFit: "cover" }}
                              priority
                            />
                          </div>
                          <div className="text-xs text-gray-500 text-center">Woche 12</div>
                        </div>
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-500">Gewichtsverlust: 12kg </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Coach Feature */}
          {activeFeature === "ai-coach" && (
            <motion.div
              key="ai-coach"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8 sm:mb-12"
              onAnimationComplete={() => trackEvent("feature_displayed", "solution", { feature: "ai-coach" })}
            >
              <div className="grid md:grid-cols-2">
                {/* Left: Video/Image - Height reduced for mobile */}
                <div className="relative h-[180px] sm:h-[240px] md:h-auto overflow-hidden">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/athly-coach-placeholder.jpg"
                  >
                    <source src="https://cdn.pixabay.com/video/2019/10/04/27539-364430966_small.mp4" type="video/mp4" />
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70 flex flex-col justify-end p-4 sm:p-5 md:p-8">
                    {isMobile ? (
                      <div className="inline-block bg-white/20 backdrop-blur-md rounded-lg py-1.5 px-3 mx-auto">
                        <h4 className="text-white text-sm font-bold">ATHLY</h4>
                      </div>
                    ) : (
                      <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 max-w-md">
                        <h4 className="text-white text-lg font-bold mb-2">Dein KI-Coach ist immer für dich da</h4>
                        <p className="text-white/90 text-sm">
                          24/7 verfügbar mit maßgeschneiderten Tipps nur für dich.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Content - More compact for mobile */}
                <div className="p-4 sm:p-5 md:p-8">
                  <div className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold tracking-wide mb-3 sm:mb-4">
                    24/7 EXPERTISE
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                    {isMobile ? "Dein KI-Trainer im Alltag" : "Dein persönlicher KI-Trainer im Alltag"}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-5">
                    {isMobile
                      ? "Dein persönlicher Coach, der jederzeit für dich da ist."
                      : "Stelle jederzeit Fragen und erhalte sofortige Antworten – rund um die Uhr, genau wenn du es brauchst."}
                  </p>

                  {/* Chat Example - More concise for mobile */}
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 border border-gray-100">
                    <div className="space-y-2 sm:space-y-3">
                      {/* User Question */}
                      <div className="flex justify-end">
                        <div className="bg-blue-500 text-white rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] text-xs sm:text-sm">
                          {isMobile
                            ? "Wie verbessere ich mein Laufen?"
                            : "Wie verbessere ich meine Lauftechnik beim Joggen?"}
                        </div>
                      </div>

                      {/* Coach Response - Simplified for mobile */}
                      <div className="flex">
                        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-2 flex-shrink-0">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] text-xs sm:text-sm border border-gray-200">
                          {isMobile ? (
                            <div>
                              <p className="font-medium text-gray-800">Dein persönlicher Lauf-Boost! 🏃‍♀️</p>
                              <div className="mt-1 space-y-1 text-xs">
                                <p>
                                  <span className="font-medium">1.</span>{" "}
                                  <span className="text-green-600">Mittelfuß</span> zuerst aufsetzen
                                </p>
                                <p>
                                  <span className="font-medium">2.</span> Rücken{" "}
                                  <span className="text-green-600">gerade</span> halten
                                </p>
                                <p>
                                  <span className="font-medium">3.</span>{" "}
                                  <span className="text-green-600">Kurze, schnelle</span> Schritte
                                </p>
                              </div>
                              <p className="mt-1 text-xs text-gray-500">Ich hab ein Video vorbereitet!</p>
                            </div>
                          ) : (
                            <>
                              <p className="font-medium text-gray-800">
                                Nach Analyse deiner Laufdaten empfehle ich dir 3 Anpassungen:
                              </p>
                              <ol className="list-decimal ml-4 mt-1 text-xs space-y-1">
                                <li>
                                  <span className="font-medium text-green-600">Mittelfußlanden</span> statt Fersenlauf -
                                  reduziert die Stoßbelastung um bis zu 30%
                                </li>
                                <li>
                                  <span className="font-medium text-green-600">Aufrechte Körperhaltung</span> - öffnet
                                  die Atemwege und verbessert die Sauerstoffaufnahme
                                </li>
                                <li>
                                  <span className="font-medium text-green-600">Höhere Schrittfrequenz</span>{" "}
                                  (170-180/min) - steigert die Effizienz und schont die Gelenke
                                </li>
                              </ol>
                              <p className="mt-1 text-xs text-gray-500">
                                Ich habe ein kurzes Video mit Übungen vorbereitet, das ich dir gleich zeige 📱
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Benefits - More efficient layout for mobile */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2 sm:mr-3 mt-0.5">
                        <svg
                          className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 text-xs sm:text-sm">Sofortige Antworten</div>
                        {!isMobile && (
                          <p className="text-xs text-gray-600">Auf all deine Fitness- und Ernährungsfragen</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2 sm:mr-3 mt-0.5">
                        <svg
                          className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 text-xs sm:text-sm">Persönliche Motivation</div>
                        {!isMobile && (
                          <p className="text-xs text-gray-600">Dein Coach kennt dich und was dich antreibt</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button - Larger touch target for mobile */}
                  <button
                    onClick={openWaitlistModal}
                    className="w-full flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 text-white font-medium rounded-xl shadow-md hover:shadow-lg active:translate-y-0.5 transition-all duration-300 group text-sm sm:text-base"
                    style={{ backgroundColor: colors.ctaGreen }}
                  >
                    <span>{isMobile ? "Coach erstellen" : "Deinen persönlichen Coach erstellen"}</span>
                    <svg
                      className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Flexible Plan Feature */}
          {activeFeature === "flexible-plan" && (
            <motion.div
              key="flexible-plan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8 sm:mb-12"
              onAnimationComplete={() => trackEvent("feature_displayed", "solution", { feature: "flexible-plan" })}
            >
              <div className="flex flex-col md:flex-row md:items-center">
                {/* Left Content - More compact for mobile */}
                <div className="p-4 sm:p-5 md:p-8 md:w-1/2">
                  <div className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold tracking-wide mb-3 sm:mb-4">
                    MAXIMALE FLEXIBILITÄT
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                    {isMobile ? "Dein Plan passt sich dir an" : "Dein Leben, dein Plan – wir passen uns an"}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-5">
                    {isMobile
                      ? "Dein Plan passt sich deinem Leben an, nicht umgekehrt."
                      : "Athly passt sich deinem Leben an, nicht umgekehrt. Dein KI-Coach optimiert deinen Plan in Echtzeit und hält dich auf Kurs."}
                  </p>

                  {/* User Quote - Simplified for mobile */}
                  {!isMobile ? (
                    <div className="bg-gray-50 rounded-lg p-4 mb-5 border-l-4 border-blue-400">
                      <p className="text-sm text-gray-700 italic">
                        "Mit drei Kindern und Vollzeitjob hatte ich nie Zeit für ein regelmäßiges Training. Athly hat
                        das geändert – egal wie chaotisch mein Alltag wird."
                      </p>
                      <div className="mt-2 text-sm font-medium text-gray-700">– Markus, 38, berufstätiger Vater</div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4 border-l-4 border-blue-400">
                      <p className="text-xs text-gray-700 italic">
                        "Als berufstätiger Vater hatte ich nie Zeit für regelmäßiges Training. Athly hat das geändert."
                      </p>
                      <div className="mt-1 text-xs font-medium text-gray-700">– Marc, 42</div>
                    </div>
                  )}
                </div>

                {/* Right Visualization - Simplified and more focused for mobile */}
                <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                  <div className="h-full min-h-[280px] md:min-h-[400px] w-full flex items-center justify-center p-4 sm:p-6">
                    <div className="w-full max-w-sm">
                      {/* Problem Card - More compact for mobile */}
                      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-3 sm:mb-4 border-l-4 border-red-400">
                        <div className="flex items-center text-gray-800 mb-1.5 sm:mb-2">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-medium text-sm sm:text-base">Terminkonflikt entdeckt</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 ml-6 sm:ml-7">
                          {isMobile
                            ? "Dienstag-Workout kollidiert mit Meeting (14-16 Uhr)"
                            : "Dein geplantes Workout am Dienstag kollidiert mit deinem Meeting (14:00-16:00 Uhr)"}
                        </div>
                      </div>

                      {/* AI Analyzing - More streamlined for mobile */}
                      <div className="bg-blue-50 rounded-lg p-2.5 sm:p-3 mb-3 sm:mb-4 border border-blue-100">
                        <div className="flex items-center mb-1.5 sm:mb-2">
                          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-blue-500 rounded-full text-white flex items-center justify-center mr-2">
                            <svg
                              className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-blue-700">
                            Athly KI analysiert Alternativen...
                          </span>
                        </div>
                        <div className="ml-7 sm:ml-8 text-xs text-blue-600 space-y-0.5 sm:space-y-1">
                          <div>• Überprüfe deinen Kalender</div>
                          {!isMobile && <div>• Analysiere Trainingsplan & Ziele</div>}
                          <div>• Identifiziere optimale Zeitfenster</div>
                        </div>
                      </div>

                      {/* Solution Card - More focused for mobile */}
                      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-green-400">
                        <div className="flex items-center mb-2 sm:mb-3">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-medium text-gray-800 text-sm sm:text-base">
                            Optimierter Plan erstellt
                          </span>
                        </div>

                        <div className="bg-green-50 rounded p-2.5 sm:p-3 mb-2 sm:mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-xs sm:text-sm font-medium">Dienstag, 17:30 Uhr</div>
                            <div className="bg-green-500 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                              Neu
                            </div>
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">30-Min HIIT Workout (angepasst)</div>
                          <div className="mt-1 text-xs text-green-600">+ Alternative am Mittwoch früh</div>
                        </div>

                        <div className="flex items-center text-xs sm:text-sm text-green-600">
                          <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Deine Trainingsziele bleiben auf Kurs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust & CTA Section - Streamlined layout for mobile */}
        <motion.div
          className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm border border-gray-100 overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onViewportEnter={() => trackEvent("trust_section_visible", "solution")}
        >
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left Column: Stats & USPs - More compact for mobile */}
            <div className="p-4 sm:p-5 md:p-8 md:col-span-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 tracking-tight">
                {isMobile ? "Warum 200+ Nutzer uns vertrauen" : "Warum über 200+ Nutzer Athly vertrauen"}
              </h3>

              {/* Stats Grid - Better layout for mobile */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                {/* Stat 1 */}
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">24/7</div>
                  <div className="text-xs md:text-sm text-gray-500">Verfügbarkeit</div>
                </div>

                {/* Stat 2 */}
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">94%</div>
                  <div className="text-xs md:text-sm text-gray-500">Zufriedenheit</div>
                </div>

                {/* Stat 3 */}
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">4.8/5</div>
                  <div className="text-xs md:text-sm text-gray-500">Bewertung</div>
                </div>
              </div>

              {/* Trust Badges - Better mobile layout */}
              <div className={`${isMobile ? "grid grid-cols-1 gap-2" : "grid grid-cols-2 gap-3"}`}>
                <div className="flex items-center bg-white/80 rounded-lg p-2.5 sm:p-3 border border-gray-100">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 sm:mr-3">
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">100% Datenschutz</div>
                    <div className="text-xs text-gray-500">DSGVO-konform & sicher</div>
                  </div>
                </div>

                <div className="flex items-center bg-white/80 rounded-lg p-2.5 sm:p-3 border border-gray-100">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 sm:mr-3">
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">2 Wochen kostenlos</div>
                    <div className="text-xs text-gray-500">Ohne Risiko testen</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: CTA - Simplified for mobile */}
            <div className="p-4 sm:p-5 md:p-8 md:col-span-2 bg-white">
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Bereit für deine Fitness-Transformation?
                </h3>

                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5">
                  {isMobile
                    ? "Starte jetzt mit deinem KI-Coach."
                    : "Starte jetzt mit deinem persönlichen KI-Coach und erlebe, wie einfach Fitness sein kann."}
                </p>

                {/* Offer Badge - Simplified for mobile */}
                <div className="bg-green-50 rounded-lg p-2.5 sm:p-3 mb-4 sm:mb-5 border border-green-100">
                  <div className="flex items-center">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-xs sm:text-sm">Early-Access Angebot</div>
                      <div className="text-xs sm:text-sm text-gray-600">14 Tage kostenlos + 70% Rabatt</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button - Larger touch target for mobile */}
                <button
                  onClick={openWaitlistModal}
                  className="w-full flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 text-white font-bold text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg active:translate-y-0.5 transition-all duration-300 group mb-2 sm:mb-3"
                  style={{ backgroundColor: colors.ctaGreen }}
                >
                  <span>Kostenlos starten</span>
                  <svg
                    className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  {isMobile
                    ? "Sofort Zugang. Keine Kreditkarte nötig."
                    : "Sofort Zugang. Keine Kreditkarte erforderlich. Jederzeit kündbar."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Waitlist Modal */}
      <AnimatePresence>{isModalOpen && <WaitlistModal onClose={() => setIsModalOpen(false)} />}</AnimatePresence>
    </section>
  );
}
