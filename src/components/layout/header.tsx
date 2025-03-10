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
    { name: "Features", href: "#features", id: "features", onClick: () => scrollToSection("features"), description: "Entdecke fortschrittliche KI-Trainingsfunktionen" },
    { name: "KI-Coach", href: "#coach", id: "coach", onClick: () => scrollToSection("coach"), description: "Lerne deinen persönlichen KI-Trainer kennen" },
    { name: "Erfahrungen", href: "#testimonials", id: "testimonials", onClick: () => scrollToSection("testimonials"), description: "Kundenstimmen und Erfolgsgeschichten" },
  ];

  return (
    <header className={`md:fixed relative top-0 w-full z-50 ${scrolled ? 'py-2.5' : 'py-5'} transition-all duration-300`}>
      {/* Glass-like background effect - 60% neutral colors */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-sm bg-white/90 shadow-sm border-b border-gray-100' 
          : 'bg-transparent'
      }`}></div>
      
      {/* Header Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between relative">
          {/* Logo with hover effect */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group relative flex items-center cursor-pointer"
          >
            <div className="relative z-10">
              <div className="absolute -inset-1 rounded-full opacity-0 blur group-hover:opacity-10 transition-opacity duration-500 bg-gray-200"></div>
              {/* Athly logo - 30% brand color */}
              <svg
                className="h-8 w-8 text-[#9bc539] group-hover:text-[#8ab52a] transition-colors duration-300"
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
              className="ml-2 font-bold tracking-tight text-gray-800 text-lg transition-all duration-300"
            >
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
                  {/* Active indicator - neutral with subtle highlight */}
                  {activeSection === item.id && (
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-gray-100"
                      layoutId="nav-active-item"
                      transition={{ 
                        type: "spring", 
                        duration: 0.7, 
                        bounce: 0.1,
                        ease: "easeInOut"
                      }}
                    ></motion.div>
                  )}
                  
                  {/* Navigation text - 60% neutral colors */}
                  <span 
                    className={cn(
                      "relative z-10 tracking-wide", 
                      activeSection === item.id
                        ? "text-gray-800 font-medium" 
                        : "text-gray-600 hover:text-gray-800"
                    )}
                  >
                    {item.name}
                  </span>
                  
                  {/* Tooltip - Simplified for better conversion */}
                  {activeItem === item.name && (
                    <div 
                      className="absolute top-full mt-2 rounded-lg py-2 px-3 bg-white/95 border border-gray-200 min-w-[180px] text-center shadow-sm animate-in fade-in duration-300 slide-in-from-bottom-1"
                    >
                      <div className="relative overflow-hidden">
                        <div className="text-xs text-gray-600 relative z-10 leading-relaxed">
                          {item.description}
                        </div>
                      </div>
                      
                      {/* Arrow pointer */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-t border-l border-gray-200"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button - 10% special colors for conversion */}
          <div className="relative group">
            <button 
              className="bg-[#9bc539] hover:bg-[#8ab42d] relative overflow-hidden border border-[#9bc539]/10 text-white rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:shadow-md hover:shadow-[#9bc539]/20"
              onClick={() => setIsModalOpen(true)}
            >
              {/* Shimmer effect for attention */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              <span className="relative z-10 flex items-center">
                <span className="hidden sm:inline">Frühen Zugang sichern</span>
                <span className="sm:hidden">Zugang</span>
                <svg className="ml-1.5 w-3.5 h-3.5 opacity-100 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button - 60% neutral colors */}
          <button 
            className="md:hidden relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 hover:bg-gray-100"
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
      
      {/* Mobile Menu Panel with backdrop */}
      <div 
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto backdrop-blur-sm bg-black/5' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white/98 backdrop-blur-sm border-l border-gray-100 p-8 transition-transform duration-300 shadow-lg ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">
                Menu
              </span>
              <button 
                className="text-gray-400 hover:text-gray-700"
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
                  className={`px-4 py-3 rounded-lg transition-colors text-left ${
                    activeSection === item.id
                    ? "bg-gray-100 text-gray-800 font-medium" 
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            {/* CTA in mobile menu - 10% special colors for conversion */}
            <button 
              className="w-full bg-[#9bc539] hover:bg-[#8ab42d] relative overflow-hidden border border-transparent text-white rounded-full py-3 text-sm font-medium transition-all shadow-sm"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
            >
              <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1500 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <span className="relative z-10 flex items-center justify-center">
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