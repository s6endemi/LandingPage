"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { WaitlistModal } from "@/components/waitlist/waitlist-modal";
import { motion } from "framer-motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle scroll events for header appearance
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

  // Track active section with IntersectionObserver
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
    
    // Fallback for home section if not found in DOM
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

  // Scroll to section function with offset
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

  // Navigation items
  const navItems = [
    { name: "Features", href: "#features", id: "features", onClick: () => scrollToSection("features") },
    { name: "KI-Coach", href: "#coach", id: "coach", onClick: () => scrollToSection("coach") },
    { name: "Erfahrungen", href: "#testimonials", id: "testimonials", onClick: () => scrollToSection("testimonials") },
  ];

  return (
    <header className={`md:fixed relative top-0 w-full z-50 ${scrolled ? 'py-2' : 'py-3 md:py-5'} transition-all duration-300`}>
      {/* Glass-like background effect - optimiert */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-sm bg-white/90 shadow-sm border-b border-gray-100' 
          : 'bg-transparent'
      }`}></div>
      
      {/* Header Content - kompakter für mobile */}
      <div className="container mx-auto px-3 md:px-4 relative z-10">
        <div className="flex items-center justify-between relative">
          {/* Logo - vereinfacht für optimale Performance */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center"
          >
            <svg
              className="h-7 w-7 md:h-8 md:w-8 text-[#9bc539]"
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
            <span className="ml-2 font-bold tracking-tight text-gray-800 text-base md:text-lg">
              ATHLY
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <div
              className={cn(
                "relative flex items-center h-10 rounded-full p-1 overflow-hidden",
                "border border-gray-200 shadow-sm backdrop-blur-sm transition-all duration-300",
                scrolled ? "bg-white/90" : "bg-white/60"
              )}
            >
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="relative flex items-center justify-center h-full rounded-full px-5 text-sm font-medium transition-all duration-300"
                  onMouseEnter={() => setActiveItem(item.name)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-gray-100"
                      layoutId="nav-active-item"
                      transition={{ 
                        type: "spring", 
                        duration: 0.7, 
                        bounce: 0.1
                      }}
                    ></motion.div>
                  )}
                  
                  {/* Navigation text */}
                  <span 
                    className={cn(
                      "relative z-10", 
                      activeSection === item.id
                        ? "text-gray-800 font-medium" 
                        : "text-gray-600 hover:text-gray-800"
                    )}
                  >
                    {item.name}
                  </span>
                  
                  {/* Tooltip - nur auf Desktop */}
                  {activeItem === item.name && (
                    <div className="absolute top-full mt-2 rounded-lg py-2 px-3 bg-white/95 border border-gray-200 min-w-[180px] text-center shadow-sm animate-in fade-in duration-300 slide-in-from-bottom-1">
                      <div className="text-xs text-gray-600">
                        {item.id === "features" && "Entdecke fortschrittliche KI-Trainingsfunktionen"}
                        {item.id === "coach" && "Lerne deinen persönlichen KI-Trainer kennen"}
                        {item.id === "testimonials" && "Kundenstimmen und Erfolgsgeschichten"}
                      </div>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-t border-l border-gray-200"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button - optimiert für mobile */}
          <div className="flex items-center">
            <button 
              className="bg-[#9bc539] text-white rounded-full px-4 py-2 text-sm font-medium"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="flex items-center">
                <span className="hidden sm:inline">Zugang</span>
                <span className="sm:hidden">Zugang</span>
                <svg className="ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            {/* Mobile Menu Toggle Button - kompakter */}
            <button 
              className="md:hidden ml-1 h-9 w-9 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative">
                <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Panel mit optimiertem Backdrop */}
      <div 
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto backdrop-blur-sm bg-black/5' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white p-6 transition-transform duration-300 shadow-lg ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-gray-800">Menu</span>
              <button 
                className="text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
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
                  className={`px-3 py-2.5 rounded-lg transition-colors text-left ${
                    activeSection === item.id
                    ? "bg-gray-100 text-gray-800 font-medium" 
                    : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            {/* CTA in mobile menu - optimiert */}
            <button 
              className="w-full bg-[#9bc539] text-white rounded-full py-2.5 text-sm font-medium"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
            >
              <span className="flex items-center justify-center">
                Frühen Zugang sichern
                <svg className="ml-1.5 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      {isModalOpen && (
        <WaitlistModal onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
}