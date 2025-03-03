"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "@/components/aceternity/sparkles";
import { BorderBeam } from "@/components/magicui/border-beam";

interface WaitlistModalProps {
  onClose: () => void;
}

export function WaitlistModal({ onClose }: WaitlistModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    useCase: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Fokus auf erstes Eingabefeld beim Öffnen
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    
    // Event-Listener für Escape-Taste
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
  
  // Klick außerhalb schließt Modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  // Formularvalidierung
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name wird benötigt";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "E-Mail wird benötigt";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Keine gültige E-Mail";
    }
    
    if (!formData.useCase.trim()) {
      newErrors.useCase = "Bitte beschreibe deinen Anwendungsfall";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Formular absenden
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      // Simuliere API-Aufruf
      setTimeout(() => {
        setLoading(false);
        setStep("success");
      }, 1500);
    }
  };
  
  // Input-Änderungen verarbeiten
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Fehler zurücksetzen bei Eingabe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[100] p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop mit Blur-Effekt */}
      <motion.div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Modal Container */}
      <div className="w-full max-w-lg relative z-10" ref={modalRef}>
        <AnimatePresence mode="wait">
          {step === "form" ? (
            <FormStep 
              key="form"
              formData={formData}
              errors={errors}
              loading={loading}
              inputRef={inputRef}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              onClose={onClose}
            />
          ) : (
            <SuccessStep 
              key="success"
              name={formData.name}
              onClose={onClose}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Formular-Step-Komponente
function FormStep({ 
  formData, 
  errors, 
  loading, 
  inputRef,
  handleChange, 
  handleSubmit,
  onClose 
}: { 
  formData: any; 
  errors: Record<string, string>; 
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-700/50 shadow-2xl"
    >
      {/* Premium Border Effekt */}
      <div className="absolute inset-0 pointer-events-none">
        <BorderBeam className="opacity-40" />
      </div>
      
      {/* Background Effekte */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <SparklesCore
          id="modal-sparkles"
          background="transparent"
          minSize={0.2}
          maxSize={0.5}
          particleColor="#FFFFFF"
          particleDensity={12}
        />
      </div>
      
      {/* Hintergrund-Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
      
      {/* Modal Header */}
      <div className="relative z-10 p-6 border-b border-zinc-700/30">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-400">
            Frühen Zugang sichern
          </h2>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p className="text-zinc-400 text-sm mt-2">
          Trage dich für exklusiven Early-Access zu SYNAPSE ein.
        </p>
      </div>
      
      {/* Formular */}
      <form onSubmit={handleSubmit} className="relative z-10 p-6">
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
              Name
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-zinc-800/50 border ${errors.name ? 'border-red-500/70' : 'border-zinc-700/50'} focus:border-blue-500/50 rounded-lg outline-none transition-colors text-zinc-200 placeholder-zinc-500`}
                placeholder="Dein vollständiger Name"
              />
              {errors.name && (
                <p className="absolute text-xs text-red-400 mt-1">{errors.name}</p>
              )}
            </div>
          </div>
          
          {/* E-Mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
              E-Mail
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-zinc-800/50 border ${errors.email ? 'border-red-500/70' : 'border-zinc-700/50'} focus:border-blue-500/50 rounded-lg outline-none transition-colors text-zinc-200 placeholder-zinc-500`}
                placeholder="deine@email.de"
              />
              {errors.email && (
                <p className="absolute text-xs text-red-400 mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          
          {/* Unternehmen */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-zinc-300 mb-1">
              Unternehmen <span className="text-zinc-500 text-xs">(optional)</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 focus:border-blue-500/50 rounded-lg outline-none transition-colors text-zinc-200 placeholder-zinc-500"
              placeholder="Dein Unternehmen"
            />
          </div>
          
          {/* Anwendungsfall */}
          <div>
            <label htmlFor="useCase" className="block text-sm font-medium text-zinc-300 mb-1">
              Dein Anwendungsfall
            </label>
            <div className="relative">
              <textarea
                id="useCase"
                name="useCase"
                value={formData.useCase}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-2.5 bg-zinc-800/50 border ${errors.useCase ? 'border-red-500/70' : 'border-zinc-700/50'} focus:border-blue-500/50 rounded-lg outline-none transition-colors text-zinc-200 placeholder-zinc-500 resize-none`}
                placeholder="Wie möchtest du SYNAPSE einsetzen?"
              />
              {errors.useCase && (
                <p className="absolute text-xs text-red-400 mt-1">{errors.useCase}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="relative w-full py-3 px-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium overflow-hidden group disabled:opacity-70"
          >
            {/* Shimmer Effekt */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Wird übermittelt...
              </div>
            ) : (
              <span className="relative z-10">Jetzt anmelden</span>
            )}
          </button>
        </div>
        
        {/* Datenschutzhinweis */}
        <div className="mt-4 text-center">
          <p className="text-xs text-zinc-500">
            Durch die Anmeldung akzeptierst du unsere{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Datenschutzbestimmungen
            </a>
          </p>
        </div>
      </form>
    </motion.div>
  );
}

// Erfolgs-Step-Komponente
function SuccessStep({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-700/50 shadow-2xl"
    >
      {/* Premium Border Effekt */}
      <div className="absolute inset-0 pointer-events-none">
        <BorderBeam className="opacity-40" />
      </div>
      
      {/* Background Effekte */}
      <div className="absolute inset-0 -z-10">
        <SparklesCore
          id="success-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleColor="#FFFFFF"
          particleDensity={20}
        />
      </div>
      
      {/* Hintergrund-Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 via-transparent to-blue-900/20" />
      
      <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center">
        {/* Erfolgs-Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ 
            scale: { duration: 0.5, ease: "backOut" },
            rotate: { delay: 0.5, duration: 0.5 }
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6"
        >
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-300 mb-4"
        >
          Vielen Dank, {name.split(" ")[0]}!
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-zinc-300 mb-6"
        >
          Deine Anfrage wurde erfolgreich übermittelt. Wir werden dich kontaktieren, sobald wir Zugang zu unserer exklusiven Beta-Phase gewähren.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <button
            onClick={onClose}
            className="relative py-3 px-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium overflow-hidden group"
          >
            {/* Shimmer Effekt */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative z-10">Zurück zur Website</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}