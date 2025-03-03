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
      { id: "features", el: document.getElementById("features") },
      { id: "coach", el: document.getElementById("coach") },
      { id: "testimonials", el: document.getElementById("testimonials") }
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -60% 0px",
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    sections.forEach(section => {
      if (section.el) {
        observer.observe(section.el);
      }
    });
    
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
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const navItems = [
    { name: "Features", href: "#features", id: "features", onClick: () => scrollToSection("features"), description: "Entdecke fortschrittliche KI-Trainingsfunktionen" },
    { name: "KI-Coach", href: "#coach", id: "coach", onClick: () => scrollToSection("coach"), description: "Lerne deinen persönlichen KI-Trainer kennen" },
    { name: "Erfahrungen", href: "#testimonials", id: "testimonials", onClick: () => scrollToSection("testimonials"), description: "Kundenstimmen und Erfolgsgeschichten" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 ${scrolled ? 'py-2.5' : 'py-5'} transition-all duration-300`}>
      {/* Subtilerer glasartiger Hintergrund */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-sm bg-white/50 shadow-sm' 
          : 'bg-transparent'
      }`}></div>
      
      {/* Header Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between relative">
          {/* Logo mit dezenterem Effekt */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group relative flex items-center cursor-pointer"
          >
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-50 transition-opacity duration-700">
              <SparklesCore
                id="logo-sparkles"
                background="transparent"
                minSize={0.3}
                maxSize={0.7}
                particleColor="#8AAE39"
                particleDensity={15}
              />
            </div>
            
            <div className="relative z-10">
              <div className="absolute -inset-1 rounded-full opacity-0 blur group-hover:opacity-20 transition-opacity duration-500 bg-[#8AAE39]/20"></div>
              {/* Logo mit subtileren Farben */}
              <svg
                className="h-8 w-8 text-[#8AAE39] group-hover:text-[#7a9c30] transition-colors duration-300"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M18 3L33 30H3L18 3Z" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path 
                  d="M18 12L25.5 25H10.5L18 12Z" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              className="ml-2 bg-gradient-to-r from-[#8AAE39] to-[#7a9c30] bg-clip-text text-lg
                       font-bold tracking-tight text-transparent transition-all duration-300"
            >
              ATHLY
            </span>
          </button>

          {/* Elegantere Navigation mit sanfterem Glaseffekt */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <div
              className={cn(
                "relative flex items-center h-10 rounded-full p-1 overflow-hidden",
                "border border-[#8AAE39]/20 shadow-[0_0_10px_rgba(138,174,57,0.07)] backdrop-blur-sm transition-all duration-300",
                scrolled ? "bg-white/70" : "bg-white/40"
              )}
            >
              {/* Dezentere Sparkles im Hintergrund */}
              <div className="absolute inset-0 opacity-5">
                <SparklesCore
                  id="nav-sparkles"
                  background="transparent"
                  minSize={0.1}
                  maxSize={0.4}
                  particleColor="#8AAE39"
                  particleDensity={10}
                />
              </div>
              
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="relative flex items-center justify-center h-full rounded-full px-5 text-sm font-medium transition-all duration-300"
                  onMouseEnter={() => setActiveItem(item.name)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  {/* Sanfterer Active Background Indicator */}
                  {activeSection === item.id && (
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-[#8AAE39]/10"
                      layoutId="nav-active-item"
                      transition={{ 
                        type: "spring", 
                        duration: 0.7, 
                        bounce: 0.1,
                        ease: "easeInOut"
                      }}
                    ></motion.div>
                  )}
                  
                  {/* Eleganterer Text mit subtileren Farben */}
                  <span 
                    className={cn(
                      "relative z-10 tracking-wide", 
                      activeSection === item.id
                        ? "text-[#8AAE39]" 
                        : "text-gray-600 hover:text-[#8AAE39]/80"
                    )}
                  >
                    {item.name}
                  </span>
                  
                  {/* Elegantere Tooltips */}
                  {activeItem === item.name && (
                    <div 
                      className="absolute top-full mt-2 rounded-lg py-2 px-3 bg-white/90 border border-[#8AAE39]/10 backdrop-blur-sm min-w-[180px] text-center shadow-[0_3px_10px_rgba(138,174,57,0.1)] animate-in fade-in duration-300 slide-in-from-bottom-1"
                    >
                      <div className="relative overflow-hidden">
                        {/* Subtilerer Glow-Effekt */}
                        <div className="absolute -inset-1 blur-sm bg-gradient-to-r from-transparent via-[#8AAE39]/5 to-transparent opacity-50"></div>
                        
                        {/* Text mit feinerer Typografie */}
                        <div className="text-xs text-gray-600 relative z-10 leading-relaxed">
                          {item.description}
                        </div>
                      </div>
                      
                      {/* Feinerer Arrow Pointer */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-t border-l border-[#8AAE39]/10">
                        <div className="absolute inset-0 opacity-30 blur-sm bg-[#8AAE39]/5"></div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Eleganterer Waitlist Button mit subtileren Effekten */}
          <div className="relative group">
            <button 
              className="bg-[#8AAE39]/90 hover:bg-[#8AAE39] relative overflow-hidden border border-[#8AAE39]/20 text-white rounded-full px-5 py-2.5 text-sm transition-all hover:shadow-sm hover:shadow-[#8AAE39]/10"
              onClick={() => setIsModalOpen(true)}
            >
              {/* Subtilerer Shimmer Effekt */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              <span className="relative z-10 flex items-center">
                <span>Frühen Zugang sichern</span>
                <svg className="ml-1.5 w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Verfeinertes Mobile Menu Toggle */}
          <button 
            className="md:hidden relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 hover:bg-[#8AAE39]/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="relative">
              <span className={`block w-5 h-0.5 bg-[#8AAE39]/80 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-[#8AAE39]/80 transition-all duration-300 mt-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-[#8AAE39]/80 transition-all duration-300 mt-1 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Verfeinertes Mobile Menu Panel */}
      <div 
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto backdrop-blur-sm bg-[#8AAE39]/5' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-sm border-l border-[#8AAE39]/10 p-8 transition-transform duration-300 shadow-lg ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-[#8AAE39]">
                Menu
              </span>
              <button 
                className="text-gray-400 hover:text-[#8AAE39]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className={`px-4 py-3 rounded-lg transition-colors text-left ${
                    activeSection === item.id
                    ? "bg-[#8AAE39]/10 text-[#8AAE39]" 
                    : "text-gray-600 hover:text-[#8AAE39] hover:bg-[#8AAE39]/5"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            {/* Eleganterer Button im Mobile Menü */}
            <button 
              className="w-full bg-[#8AAE39]/90 hover:bg-[#8AAE39] relative overflow-hidden border border-[#8AAE39]/20 text-white rounded-full py-2.5 text-sm transition-all"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
            >
              <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1500 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
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