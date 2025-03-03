// src/components/layout/header.tsx
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/aceternity/sparkles";
import { WaitlistModal } from "@/components/waitlist/waitlist-modal";
import { motion } from "framer-motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Beobachten der Sektionen mit IntersectionObserver
  useEffect(() => {
    const sections = [
      { id: "home", el: document.getElementById("hero") },
      { id: "showcase", el: document.getElementById("showcase") },
      { id: "ai-integration", el: document.getElementById("ai-integration") },
      { id: "testimonials", el: document.getElementById("testimonials") }
    ];

    const observerOptions = {
      root: null, // viewport als root
      rootMargin: "-40% 0px -60% 0px", // Nur als aktiv betrachten, wenn wirklich im Fokus
      threshold: 0 // Bereits triggern, wenn ein kleiner Teil sichtbar ist
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Elemente beobachten (wenn sie existieren)
    sections.forEach(section => {
      if (section.el) {
        observer.observe(section.el);
      }
    });
    
    // Falls Hero-Sektion keine ID hat, behandle den Anfang der Seite speziell
    if (!sections[0].el) {
      const handleScrollForHome = () => {
        if (window.scrollY < 100) {
          setActiveSection("home");
        }
      };
      
      window.addEventListener("scroll", handleScrollForHome);
      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", handleScrollForHome);
      };
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Scroll to section function
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset für den Header, damit die Section nicht hinter dem Header verschwindet
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const navItems = [
    { name: "Integration", href: "#ai-integration", id: "ai-integration", onClick: () => scrollToSection("ai-integration"), description: "KI-Integration in Unternehmen" },
    { name: "Features", href: "#showcase", id: "showcase", onClick: () => scrollToSection("showcase"), description: "Entdecke fortschrittliche KI-Funktionen" },
    { name: "Erfahrungen", href: "#testimonials", id: "testimonials", onClick: () => scrollToSection("testimonials"), description: "Kundenstimmen und Erfolgsgeschichten" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 ${scrolled ? 'py-3' : 'py-6'} transition-all duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between relative">
          {/* Logo mit Premium-Effekt */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group relative flex items-center cursor-pointer"
          >
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-70 transition-opacity duration-500">
              <SparklesCore
                id="logo-sparkles"
                background="transparent"
                minSize={0.4}
                maxSize={1.0}
                particleColor="#AAAAAA"
                particleDensity={20}
              />
            </div>
            
            <div className="relative z-10">
              <div className="absolute -inset-1 rounded-full opacity-0 blur group-hover:opacity-30 transition-opacity duration-300 bg-zinc-400/20"></div>
              <svg
                className="h-8 w-8 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span
              className="ml-2 bg-gradient-to-r from-zinc-400 via-zinc-300 to-zinc-400 bg-clip-text text-xl
                       font-bold tracking-tight text-transparent transition-all duration-300 group-hover:from-zinc-300 group-hover:via-white group-hover:to-zinc-300"
            >
              SYNAPSE
            </span>
          </button>

          {/* Zentrierte Navigation mit Glasmorphismus */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <div
              className={cn(
                "relative flex items-center h-12 rounded-full p-1 overflow-hidden",
                "border border-zinc-700/50 shadow-[0_0_15px_rgba(100,100,100,0.1)] backdrop-blur-md transition-all duration-300",
                scrolled ? "bg-black/70" : "bg-black/50"
              )}
            >
              {/* Sparkles im Hintergrund */}
              <div className="absolute inset-0 opacity-20">
                <SparklesCore
                  id="nav-sparkles"
                  background="transparent"
                  minSize={0.2}
                  maxSize={0.6}
                  particleColor="#FFFFFF"
                  particleDensity={15}
                />
              </div>
              
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="relative flex items-center justify-center h-full rounded-full px-6 text-sm font-medium transition-all duration-200"
                  onMouseEnter={() => setActiveItem(item.name)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  {/* Active Background Indicator für aktives Element */}
                  {activeSection === item.id && (
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-[#0a0a1f]"
                      layoutId="nav-active-item"
                      transition={{ 
                        type: "spring", 
                        duration: 0.6, 
                        bounce: 0.15,
                        ease: "easeInOut"
                      }}
                    ></motion.div>
                  )}
                  
                  {/* Text */}
                  <span 
                    className={cn(
                      "relative z-10", 
                      activeSection === item.id
                        ? "bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent" 
                        : "text-zinc-400 hover:text-zinc-300"
                    )}
                  >
                    {item.name}
                  </span>
                  
                  {/* Elegantere Tooltips mit Animation */}
                  {activeItem === item.name && (
                    <div 
                      className="absolute top-full mt-2 rounded-lg py-2 px-3 bg-black/80 border border-zinc-800/30 backdrop-blur-md min-w-[180px] text-center shadow-[0_5px_15px_rgba(0,0,0,0.3)] animate-in fade-in duration-200 slide-in-from-bottom-1"
                      style={{
                        background: "linear-gradient(to bottom, rgba(20, 20, 25, 0.9), rgba(10, 10, 15, 0.9))"
                      }}
                    >
                      <div className="relative overflow-hidden">
                        {/* Glow-Effekt */}
                        <div className="absolute -inset-1 blur-sm bg-gradient-to-r from-transparent via-zinc-400/10 to-transparent opacity-50 animate-[shine_2s_ease_infinite]"></div>
                        
                        {/* Text Content */}
                        <div className="text-xs text-zinc-300 relative z-10">
                          {item.description}
                        </div>
                      </div>
                      
                      {/* Arrow Pointer mit Glow */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45 border-t border-l border-zinc-800/30">
                        <div className="absolute inset-0 opacity-50 blur-sm bg-zinc-400/10"></div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Waitlist Button mit verbessertem Design */}
          <div className="relative group">
            <button 
              className="bg-black relative overflow-hidden border border-zinc-700 text-zinc-300 hover:text-white rounded-full px-5 py-2.5 text-sm transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              {/* Shimmer Effekt manuell */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-zinc-400/10 to-transparent"></div>
              {/* Glow beim Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-md"></div>
              
              <span className="relative z-10 flex items-center">
                <span>Frühen Zugang sichern</span>
                <svg className="ml-1.5 w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            {/* Button-Effekt */}
            <div className="absolute -inset-1 opacity-0 group-hover:opacity-30 blur-sm bg-gradient-to-r from-zinc-400/30 via-zinc-200/30 to-zinc-400/30 rounded-full transition-opacity duration-300"></div>
          </div>

          {/* Verbessertes Mobile Menu Toggle */}
          <button 
            className="md:hidden relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-200 hover:bg-zinc-800/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="relative">
              <span className={`block w-5 h-0.5 bg-zinc-400 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-zinc-400 transition-all duration-300 mt-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-zinc-400 transition-all duration-300 mt-1 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Panel mit Animation */}
      <div 
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto backdrop-blur-sm bg-black/80' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`fixed top-0 right-0 h-full w-64 bg-zinc-900/90 border-l border-zinc-800/50 p-8 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                Menu
              </span>
              <button 
                className="text-zinc-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className={`px-4 py-3 rounded-lg transition-colors text-left ${
                    activeSection === item.id
                    ? "bg-zinc-800/50 text-white" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/30"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            {/* Button im Mobile Menü */}
            <button 
              className="w-full bg-black relative overflow-hidden border border-zinc-700 text-zinc-300 hover:text-white rounded-full py-2.5 text-sm transition-colors"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
            >
              <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-zinc-400/10 to-transparent"></div>
              <span className="relative z-10">Frühen Zugang sichern</span>
            </button>
          </div>
        </div>
      </div>

      {/* Premium Waitlist Modal */}
      {isModalOpen && (
        <WaitlistModal onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
}