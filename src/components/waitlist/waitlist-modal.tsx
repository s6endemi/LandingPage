"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { addToWaitlist } from '@/lib/waitlist';
import { trackPageView, trackCTAClick, trackSignupSuccess, trackDuplicateSignup, trackSignupError, trackEvent } from '@/lib/analytics';

interface WaitlistModalProps {
  onClose: () => void;
}

export function WaitlistModal({ onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Neue States hinzufügen
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [participantNumber, setParticipantNumber] = useState<number>(0);

  // Detect if mobile
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Track page view when component mounts
  useEffect(() => {
    trackPageView('waitlist-modal');
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Focus input on mount, but only on desktop
  useEffect(() => {
    // Short delay to ensure the modal is visible first
    if (!isMobile) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Email validation
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Form submit handler aktualisieren mit Analytics
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Track CTA click
    trackCTAClick('waitlist-modal');
    
    if (!isValidEmail(email)) {
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await addToWaitlist(email, 'waitlist-modal');

      if (result.success) {
        // Track successful signup
        trackSignupSuccess('waitlist-modal', email, result.participantNumber ?? 0);
        
        // Success state
        setSubmitted(true);
        setParticipantNumber(result.participantNumber ?? 0);
      } else {
        if (result.existingEmail) {
          // Track duplicate email
          trackDuplicateSignup('waitlist-modal', email);
          
          // Show error for duplicate
          setErrorMessage(result.error ?? "Diese Email ist bereits registriert.");
        } else {
          // Track general error
          trackSignupError('waitlist-modal', result.error ?? "Ein unbekannter Fehler ist aufgetreten.");
          
          // Show general error
          setErrorMessage(result.error ?? "Ein unbekannter Fehler ist aufgetreten.");
        }
      }
    } catch (error) {
      // Track unexpected error
      trackSignupError('waitlist-modal', "Unexpected error");
      
      setErrorMessage("Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  // Track modal close
  const handleClose = () => {
    trackEvent('modal_close', 'waitlist-modal');
    onClose();
  };

  // Key handler for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  // Touch swipe handler for mobile
  const handleTouchStart = useRef<number | null>(null);
  const handleTouchMove = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    handleTouchStart.current = e.touches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleTouchMove.current = e.touches[0].clientY;
  };

  const onTouchEnd = () => {
    if (!handleTouchStart.current || !handleTouchMove.current) return;

    const distance = handleTouchMove.current - handleTouchStart.current;
    const isSwipeDown = distance > 100;

    if (isSwipeDown) {
      trackEvent('modal_swipe_close', 'waitlist-modal');
      onClose();
    }

    handleTouchStart.current = null;
    handleTouchMove.current = null;
  };

  // Define colors from theme
  const colors = {
    accent1: "#9E7AFF",
    accent2: "#FE8BBB",
    primary: "#9bc539",
    ctaGreen: "#8ab42d",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop with blur effect */}
      <motion.div
        className="absolute inset-0 bg-black/25 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      />

      <motion.div
        ref={modalRef}
        className="relative w-full sm:w-[95%] max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, y: isMobile ? 100 : 20, scale: isMobile ? 1 : 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: isMobile ? 100 : 20, scale: isMobile ? 1 : 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Mobile swipe indicator - Only visible on mobile */}
        {isMobile && (
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2 mb-1"></div>
        )}

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main content area */}
        <div className="p-5 sm:p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Early Access Badge */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-4 py-1.5 rounded-full">
                    <span className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full mr-2 animate-pulse bg-[#9bc539]"></span>
                      Early Access
                    </span>
                  </div>
                </div>

                {/* Headline with SparklesText */}
                <h2
                  id="modal-title"
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-center text-gray-900"
                >
                  Sichere dir deinen{" "}
                  <span className="relative inline-block">
                    <SparklesText
                      text="Platz"
                      colors={{ first: colors.accent1, second: colors.accent2 }}
                      sparklesCount={3}
                      className="inline-block font-bold"
                    />
                  </span>
                </h2>

                {/* Subheading */}
                <p className="text-sm sm:text-base text-gray-600 text-center mb-5 sm:mb-6">
                  Sei einer der Ersten mit Zugang zum Athly KI-Coach.
                  Limitierte Plätze verfügbar.
                </p>

                {/* Email Form - larger touch targets on mobile */}
                <form onSubmit={handleSubmit} className="mb-5 sm:mb-6">
                  <div className="mb-3">
                    <div className={`relative rounded-xl overflow-hidden border transition-all ${focused ? 'border-[#9bc539] ring-2 ring-[#9bc539]/20' : 'border-gray-200'}`}>
                      <input
                        ref={inputRef}
                        type="email"
                        placeholder="Deine E-Mail-Adresse"
                        className="w-full px-4 py-4 sm:py-3.5 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none text-base"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => {
                          setFocused(true);
                          trackEvent('input_focus', 'waitlist-modal');
                        }}
                        onBlur={() => setFocused(false)}
                        required
                        inputMode="email"
                        autoCapitalize="none"
                        autoComplete="email"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full px-6 py-4 sm:py-3.5 rounded-xl text-white font-medium text-base transition-all duration-300 overflow-hidden bg-[#8ab42d] hover:bg-[#7fa328] active:scale-[0.98] touch-manipulation"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                  >
                    <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Wird verarbeitet...
                        </span>
                      ) : (
                        <>
                          Jetzt anmelden
                          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </span>
                  </motion.button>
                  {errorMessage && (
                    <p className="mt-2 text-xs text-red-500">{errorMessage}</p>
                  )}
                </form>

                {/* Key benefits - more compact on mobile */}
                <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
                  <p className="text-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">Mit deiner Anmeldung erhältst du:</p>

                  <div className="flex items-start sm:items-center">
                    <svg className="w-4 h-4 mr-2 sm:mr-3 text-[#9bc539] flex-shrink-0 mt-0.5 sm:mt-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-700"><strong>Pionier-Bonus</strong> weil dein frühes Vertrauen unbezahlbar ist</span>
                  </div>

                  <div className="flex items-start sm:items-center">
                    <svg className="w-4 h-4 mr-2 sm:mr-3 text-[#9bc539] flex-shrink-0 mt-0.5 sm:mt-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-700">2 Wochen Premium-Coaching kostenlos</span>
                  </div>

                  <div className="flex items-start sm:items-center">
                    <svg className="w-4 h-4 mr-2 sm:mr-3 text-[#9bc539] flex-shrink-0 mt-0.5 sm:mt-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-700">Sofortige Benachrichtigung zum Launch</span>
                  </div>
                </div>

                {/* Social proof - more compact on mobile */}
                <div className="border-t border-gray-100 pt-3 sm:pt-4">
                  <div className="flex items-center justify-center">
                    <div className="flex -space-x-1.5 sm:-space-x-2 mr-2">
                      {[...Array(4)].map((_, index) => (
                        <div key={index} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white overflow-hidden bg-gray-200"></div>
                      ))}
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium bg-gray-800">
                        +200
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">200+ Personen</span> warten bereits
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Success State - compact for mobile */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="py-4 sm:py-6"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto flex items-center justify-center mb-4 sm:mb-6 bg-[#9bc539]/10">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#9bc539]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">Du bist dabei!</h3>
                <p className="text-sm sm:text-base text-gray-600 text-center mb-5 sm:mb-6">
                  Wir haben deine E-Mail-Adresse erhalten und informieren dich,
                  sobald dein exklusiver Zugang bereit ist.
                </p>
                <div className="flex justify-center">
                  <div className="inline-block bg-gray-100 rounded-full px-4 py-2 text-xs sm:text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full mr-2 bg-[#9bc539]"></span>
                      Du bist Teilnehmer #{participantNumber}
                    </span>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 text-center">
                  <button
                    className="text-gray-600 font-medium text-sm hover:text-gray-900 px-4 py-2"
                    onClick={() => {
                      trackEvent('success_close', 'waitlist-modal');
                      onClose();
                    }}
                  >
                    Schließen
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer with trust signals - simplified for mobile */}
        <div className="py-3 sm:py-4 px-5 sm:px-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center">
            {/* Rating stars */}
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#FBBF24]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <span className="ml-1.5 text-xs font-medium text-gray-800">
              4.8/5
            </span>
          </div>

          {/* Security assurance */}
          <div className="flex items-center">
            <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1.5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-gray-500">Sicher & DSGVO-konform</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}