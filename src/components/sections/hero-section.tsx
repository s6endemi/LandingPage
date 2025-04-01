"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { FlipWords } from "@/components/ui/flip-words";
import { HeroMockupAnimation } from "@/components/demo/heromockup";
import { Enhanced3DPhoneMockup } from "@/components/ui/Enhanced3DPhoneMockup";
import { addToWaitlist } from "@/lib/waitlist";
import {
  trackPageView,
  trackCTAClick,
  trackSignupSuccess,
  trackDuplicateSignup,
  trackSignupError,
  trackEvent,
} from "@/lib/analytics";

export function EnhancedHeroSection() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [participantNumber, setParticipantNumber] = useState(0);

  // Track page view on component mount
  useEffect(() => {
    trackPageView("hero-section");
    trackEvent("hero_displayed", "hero");
  }, []);

  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Subtle parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 10 : 50]);

  // Define colors
  const neutralMedium = "#4b5563";
  const mainGreen = "#9bc539";
  const ctaGreen = "#8FBC29";
  const phoneColor = "#8FBC29";

  // Words for FlipWords component - Value-focused list
  const flipWordsList = ["24/7 KI-Coach", "Fitness-Begleiter", "Motivations-Partner", "Erfolgs-Garant"];

  // Track word changes in FlipWords
  const handleWordChange = (word: any) => {
    trackEvent("flipword_changed", "hero", { word });
  };

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Form submit handler with analytics
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    trackCTAClick("hero");

    if (!isValidEmail(email)) {
      trackEvent("invalid_email", "hero", { email_length: email.length });
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await addToWaitlist(email, "hero");

      if (result.success) {
        trackSignupSuccess("hero", email, result.participantNumber ?? 0);
        setSubmitted(true);
        setParticipantNumber(result.participantNumber ?? 0);
        trackEvent("signup_success_view", "hero", {
          participant_number: result.participantNumber ?? 0,
        });
      } else {
        if (result.existingEmail) {
          trackDuplicateSignup("hero", email);
          setErrorMessage(result.error ?? "Diese Email ist bereits registriert.");
        } else {
          trackSignupError("hero", result.error ?? "Ein unbekannter Fehler ist aufgetreten.");
          setErrorMessage(result.error ?? "Ein unbekannter Fehler ist aufgetreten.");
        }
      }
    } catch (error) {
      trackSignupError("hero", "Unexpected error");
      console.error("Submission error:", error);
      setErrorMessage("Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  // Track phone mockup interactions
  const handlePhoneMockupInteraction = () => {
    trackEvent("phone_mockup_interaction", "hero");
  };

  return (
    <div
      id="hero"
      ref={containerRef}
      className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 -z-20"></div>
      <div className="absolute inset-0 -z-10 opacity-30">
        <Particles className="h-full w-full" quantity={isMobile ? 6 : 15} color={neutralMedium} size={1} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-8 md:py-16">
        {/* Mobile layout */}
        {isMobile ? (
          <div className="flex flex-col items-center">
            {/* HEADLINE FIRST on mobile */}
            <div className="w-full text-center mb-6">
              {/* Pre-headline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mb-3"
              >
                <span className="inline-block bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  Neu: KI-gestütztes Fitness-Coaching
                </span>
              </motion.div>

              {/* Main headline */}
              <motion.div
                className="mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl font-[650] text-gray-900 leading-tight-plus tracking-tighter-plus text-shadow-sm">
                  Athly: Dein
                </h1>
              </motion.div>

              {/* FlipWords headline */}
              <motion.div
                className="relative mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                onViewportEnter={() => trackEvent("headline_visible", "hero")}
              >
                <h1 className="text-4xl sm:text-5xl font-[650] text-gray-900 leading-tight-plus tracking-tighter-plus text-shadow-sm">
                  <FlipWords
                    words={flipWordsList}
                    duration={3000}
                    className="relative"
                    onWordChange={handleWordChange}
                  />
                </h1>

                {/* Underline */}
                <motion.div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[3px] bg-gradient-to-r from-[#8FBC29]/90 to-[#8FBC29]/10"
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                ></motion.div>
              </motion.div>

              {/* Tagline - improved for clearer benefit */}
              <motion.p
                className="text-base font-medium text-gray-600 mb-6 max-w-lg mx-auto leading-medium-plus tracking-tight-plus text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                KI-Coach, der dich <span className="text-[#8FBC29] font-bold">24/7 motiviert</span>, trainiert und zum
                Erfolg führt
              </motion.p>
            </div>

            {/* PHONE MOCKUP - Enhanced 3D Version */}
            <div className="w-full mb-6">
              <motion.div
                style={{ y }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onViewportEnter={() => trackEvent("phone_mockup_visible", "hero")}
                onClick={handlePhoneMockupInteraction}
              >
                <Enhanced3DPhoneMockup content={<HeroMockupAnimation />} color={phoneColor} isMobile={true} />
              </motion.div>

              {/* Key benefits list */}
              <motion.div
                className="grid grid-cols-2 gap-4 mb-6 mt-6 max-w-lg mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {[
                  { icon: "🏆", text: "Personalisierte Trainingspläne" },
                  { icon: "🔄", text: "Tägliche Anpassungen" },
                  { icon: "💬", text: "Echtzeitfeedback" },
                  { icon: "📊", text: "Fortschrittsverfolgung" },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-lg mr-2">{benefit.icon}</span>
                    <p className="text-xs font-medium text-gray-700">{benefit.text}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* CTA SECTION - Email capture box */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="mb-6"
                    onViewportEnter={() => trackEvent("cta_form_visible", "hero")}
                  >
                    <div className="bg-white rounded-2xl py-7 px-5 shadow-lg border border-gray-100 relative overflow-hidden">
                      {/* Form Headline - More benefit-focused */}
                      <h3 className="text-left text-xl font-[550] text-gray-800 mb-2 tracking-tight-plus">
                        Starte jetzt mit deinem persönlichen KI-Coach!
                      </h3>

                      <p className="text-left text-gray-600 text-sm mb-4 font-[450] tracking-tight">
                        <span className="font-[550] text-[#8FBC29]">70% Launch-Rabatt</span> + 14 Tage Premium-Coaching
                        kostenlos
                      </p>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-3">
                        <input
                          ref={inputRef}
                          type="email"
                          placeholder="Deine E-Mail Adresse"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#8FBC29]/30 focus:border-[#8FBC29] transition-all text-sm"
                          required
                          disabled={isLoading}
                          onFocus={() => trackEvent("input_focus", "hero")}
                        />
                        <motion.button
                          type="submit"
                          className="w-full text-white font-[550] rounded-xl px-4 py-4 transition-all shadow-md relative overflow-hidden group tracking-tight cursor-pointer"
                          style={{
                            backgroundColor: ctaGreen,
                          }}
                          whileTap={{ scale: 0.98 }}
                          whileHover={{
                            boxShadow:
                              "0 10px 15px -3px rgba(139, 180, 45, 0.1), 0 4px 6px -2px rgba(139, 180, 45, 0.05)",
                          }}
                          disabled={isLoading}
                        >
                          <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                            {isLoading ? (
                              <span className="flex items-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Wird verarbeitet...
                              </span>
                            ) : (
                              <>
                                Jetzt dabei sein!
                                <svg
                                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                  />
                                </svg>
                              </>
                            )}
                          </span>
                        </motion.button>
                        {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
                      </form>

                      <p className="text-xs text-gray-500 font-[450]">
                        Kein Spam, nur Updates zum Launch! Du kannst dich jederzeit abmelden.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl py-7 px-5 shadow-lg border border-gray-100 relative overflow-hidden mb-6"
                    onAnimationComplete={() => trackEvent("success_view_complete", "hero")}
                  >
                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 bg-[#9bc539]/10">
                      <svg
                        className="w-8 h-8 text-[#9bc539]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-[650] text-gray-900 mb-3 text-center tracking-tight-plus">
                      Du bist dabei!
                    </h3>
                    <p className="text-gray-600 text-sm text-center mb-4 font-[450] leading-medium-plus">
                      Dein persönlicher KI-Coach wird vorbereitet! Wir informieren dich, sobald dein exklusiver Zugang
                      bereit ist.
                    </p>
                    <div className="flex justify-center">
                      <div className="inline-block bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 font-[450]">
                        <span className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full mr-2 bg-[#9bc539]"></span>
                          Du bist Teilnehmer #{participantNumber}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social proof - Improved messaging */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="flex justify-between items-center mb-4"
                onViewportEnter={() => trackEvent("social_proof_visible", "hero")}
              >
                {/* User participation */}
                <div className="flex items-center" onClick={() => trackEvent("participation_badge_click", "hero")}>
                  <div className="flex -space-x-2 mr-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border border-white overflow-hidden bg-gray-200 flex items-center justify-center text-xs font-[450] text-gray-500"
                      >
                        {["J", "M", "S"][i - 1]}
                      </div>
                    ))}
                    <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-white text-xs bg-gray-500">
                      +
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 font-[450]">250+ aktive Athly Nutzer</span>
                </div>

                {/* Rating - Enhanced messaging */}
                <div className="flex items-center" onClick={() => trackEvent("rating_badge_click", "hero")}>
                  <div className="flex mr-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 font-[450]">4.8/5 Coaching-Erfolge</span>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Desktop layout - Side by side with more spacing */
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Content column */}
            <div className="col-span-6 col-start-1 z-10 text-left pr-8">
              {/* Pre-headline - Better highlight on AI coaching */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mb-5"
              >
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Neu: KI-gestütztes Fitness-Coaching
                </span>
              </motion.div>

              {/* Headline with FlipWords integration */}
              <div className="mb-6">
                <motion.h1
                  className="text-5xl lg:text-6xl xl:text-7xl font-[650] text-gray-900 leading-tight-plus tracking-tighter-plus text-shadow-sm"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  Athly: Dein
                </motion.h1>

                <motion.div
                  className="relative mt-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  onViewportEnter={() => trackEvent("headline_visible", "hero")}
                >
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-[650] text-gray-900 leading-tight-plus tracking-tighter-plus text-shadow-sm">
                    <FlipWords
                      words={flipWordsList}
                      duration={3000}
                      className="relative"
                      onWordChange={handleWordChange}
                    />
                  </h1>

                  {/* Elegant underline */}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-[4px] bg-gradient-to-r from-[#8FBC29]/90 to-[#8FBC29]/10"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
                  ></motion.div>
                </motion.div>
              </div>

              {/* Improved subheadline - Clear value proposition */}
              <motion.p
                className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-2xl leading-medium-plus tracking-tight-plus font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                KI-Coach, der dich <span className="text-[#8FBC29] font-bold">24/7 motiviert</span>, trainiert und zum
                Erfolg führt
              </motion.p>

              {/* Key benefits - Better highlight features */}
              <motion.div
                className="grid grid-cols-2 gap-6 mb-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {[
                  { icon: "🏆", title: "Personalisierte Trainingspläne", desc: "Auf deine Ziele und Niveau angepasst" },
                  { icon: "🔄", title: "Tägliche Anpassungen", desc: "Reagiert auf deine Fortschritte in Echtzeit" },
                  { icon: "💬", title: "Intelligentes Feedback", desc: "Verbessert deine Technik & Motivation" },
                  { icon: "📊", title: "Fortschrittsverfolgung", desc: "Visualisiert deinen Weg zum Erfolg" },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-xl mr-3 bg-green-100 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                      {benefit.icon}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-gray-800">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA - Desktop version */}
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mb-8"
                    onViewportEnter={() => trackEvent("cta_form_visible", "hero")}
                  >
                    <div className="bg-white rounded-2xl py-8 px-8 shadow-lg border border-gray-100 relative overflow-hidden max-w-xl">
                      <div className="absolute top-4 right-6">
                        <div className="flex items-center">
                          <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                            Early Access
                          </span>
                        </div>
                      </div>

                      {/* Form Headline - Value proposition focused */}
                      <h3 className="text-left text-xl lg:text-2xl font-[550] text-gray-800 mb-3 tracking-tight-plus">
                        Starte jetzt mit deinem persönlichen KI-Coach!
                      </h3>

                      <p className="text-left text-gray-600 text-base mb-6 font-[450] tracking-tight">
                        <span className="font-[550] text-[#8FBC29]">70% Launch-Rabatt</span> + 14 Tage Premium-Coaching
                        kostenlos
                      </p>

                      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-3">
                        <input
                          ref={inputRef}
                          type="email"
                          placeholder="Deine E-Mail Adresse"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 px-5 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#8FBC29]/30 focus:border-[#8FBC29] transition-all text-base font-[450]"
                          required
                          disabled={isLoading}
                          onFocus={() => trackEvent("input_focus", "hero")}
                        />
                        <motion.button
                          type="submit"
                          className="text-white font-[550] rounded-xl px-7 py-4 transition-all shadow-md relative overflow-hidden group whitespace-nowrap tracking-tight cursor-pointer"
                          style={{
                            backgroundColor: ctaGreen,
                          }}
                          whileTap={{ scale: 0.98 }}
                          whileHover={{
                            boxShadow:
                              "0 10px 15px -3px rgba(139, 180, 45, 0.1), 0 4px 6px -2px rgba(139, 180, 45, 0.05)",
                          }}
                          disabled={isLoading}
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            {isLoading ? (
                              <span className="flex items-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Wird verarbeitet...
                              </span>
                            ) : (
                              <>
                                Jetzt Platz sichern!
                                <svg
                                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                  />
                                </svg>
                              </>
                            )}
                          </span>
                        </motion.button>
                      </form>

                      {errorMessage && <p className="text-red-500 text-sm mb-3">{errorMessage}</p>}

                      <p className="text-sm text-gray-500 font-[450]">
                        Kein Spam, nur Updates zum Launch! Du kannst dich jederzeit abmelden.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 bg-white rounded-2xl py-8 px-8 shadow-lg border border-gray-100 relative overflow-hidden max-w-xl"
                    onAnimationComplete={() => trackEvent("success_view_complete", "hero")}
                  >
                    <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 bg-[#9bc539]/10">
                      <svg
                        className="w-10 h-10 text-[#9bc539]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-[650] text-gray-900 mb-4 text-center tracking-tight-plus">
                      Du bist dabei!
                    </h3>
                    <p className="text-gray-600 text-base text-center mb-6 font-[450] leading-medium-plus">
                      Dein persönlicher KI-Coach wird vorbereitet! Wir informieren dich, sobald dein exklusiver Zugang
                      bereit ist.
                    </p>
                    <div className="flex justify-center">
                      <div className="inline-block bg-gray-100 rounded-full px-4 py-2 text-base text-gray-600 font-[450]">
                        <span className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full mr-2 bg-[#9bc539]"></span>
                          Du bist Teilnehmer #{participantNumber}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social proof - Desktop layout with enhanced messaging */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center justify-between mb-6"
                onViewportEnter={() => trackEvent("social_proof_visible", "hero")}
              >
                {/* User participation */}
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => trackEvent("participation_badge_click", "hero")}
                >
                  <div className="flex -space-x-2 mr-3">
                    {[1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className="w-7 h-7 rounded-full border border-white overflow-hidden bg-gray-200 flex items-center justify-center text-sm font-[450] text-gray-500"
                      >
                        {["J", "M", "S"][index - 1]}
                      </div>
                    ))}
                    <div className="w-7 h-7 rounded-full border border-white flex items-center justify-center text-white text-xs bg-gray-500">
                      +
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 font-[450]">Bereits 250+ aktive Athly Nutzer</span>
                </div>

                {/* Rating - Enhanced messaging */}
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => trackEvent("rating_badge_click", "hero")}
                >
                  <div className="flex mr-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-[450]">4.8/5 Coaching-Erfolge von Nutzern</span>
                </div>
              </motion.div>
            </div>

            {/* Phone Image - Desktop - Enhanced 3D Version */}
            <div className="col-span-6 col-start-7 flex justify-center items-center">
              <motion.div
                style={{ y }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                onViewportEnter={() => trackEvent("phone_mockup_visible", "hero")}
                onClick={handlePhoneMockupInteraction}
                className="cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              >
                <Enhanced3DPhoneMockup content={<HeroMockupAnimation />} color={phoneColor} isMobile={false} />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
