"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { WaitlistModal } from "@/components/waitlist/waitlist-modal";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // Calculate header height for spacing
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        // Typcast to HTMLElement to access offsetHeight
        const headerElement = headerRef.current as HTMLElement;
        setHeaderHeight(headerElement.offsetHeight);
        
        // Only set mobile header height if screen is smaller than md breakpoint (768px)
        if (window.innerWidth < 768) {
          setMobileHeaderHeight(headerElement.offsetHeight);
        } else {
          setMobileHeaderHeight(0); // No spacing needed for desktop
        }
      }
    };

    // Initial calculation
    updateHeaderHeight();

    // Setup resize observer for dynamic updates
    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    // Also update on window resize for breakpoint changes
    const handleResize = () => {
      updateHeaderHeight();
    };

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (headerRef.current) {
        resizeObserver.unobserve(headerRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      { id: "hero", el: document.getElementById("hero") },
      { id: "solution", el: document.getElementById("solution") },
      { id: "features", el: document.getElementById("features") },
      { id: "testimonials", el: document.getElementById("testimonials") },
      { id: "waitlist", el: document.getElementById("waitlist") }
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
          setActiveSection("hero");
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

  // Navigation items - Optimiert für Konversion
  const navItems = [
    { name: "Vorteile", href: "#solution", id: "solution", onClick: () => scrollToSection("solution") },
    { name: "Features", href: "#features", id: "features", onClick: () => scrollToSection("features") },
    { name: "Erfahrungen", href: "#testimonials", id: "testimonials", onClick: () => scrollToSection("testimonials") },
  ];

  return (
    <>
      {/* Header bleibt immer sichtbar beim Scrollen */}
      <motion.header 
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 w-full"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: 1,
          y: 0, 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className={`px-4 ${scrolled ? 'py-2' : 'py-3'} transition-all duration-300`}>
          {/* Container für die Navbar mit Hintergrund */}
          <motion.div 
            className={`
              mx-auto max-w-4xl bg-white transition-all duration-300 ease-in-out rounded-full
              ${scrolled 
                ? 'py-1 shadow-lg bg-white/95 backdrop-blur-sm border border-gray-100' 
                : 'py-2 shadow-md bg-white/90'
              }
            `}
            layout
          >
            <div className="flex items-center justify-between px-3 md:px-4">
              {/* Logo */}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center"
              >
                <svg
                  className={`transition-all duration-300 ${scrolled ? 'h-7 w-7 md:h-8 md:w-8' : 'h-8 w-8 md:h-9 md:w-9'}`}
                  viewBox="0 0 725 750"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M549.579 685L362.5 298L175.421 685H31.4276L0 750H217L362 450L507 750H725L693.572 685H549.579Z" fill="#749B0C"/>
                  <path d="M662.65 621L362.5 0L104.4 534H104.416L72.9944 599H72.9833L62.35 621H133.421L254.031 371.501L254.003 371.443L362.5 147L438.545 304.31L438.275 304.868L591.095 621H662.65Z" fill="#749B0C"/>
                  <path d="M694.067 686H694.056L725 750L694.067 686Z" fill="#749B0C"/>
                  <path d="M0 750L30.9441 686H30.9333L0 750Z" fill="#749B0C"/>
                  <path d="M362 299L362.008 299.017L356.969 309.442L356.961 309.425L362 299Z" fill="#749B0C"/>
                </svg>
                <span className={`ml-2 font-bold tracking-tight text-gray-800 transition-all duration-300 ${scrolled ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}>
                  ATHLY
                </span>
              </button>

              {/* Desktop Navigation - Kompakter mit subtiler Markierung */}
              <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className={`
                      px-4 py-2 text-sm font-medium transition-all duration-200 relative
                      ${activeSection === item.id
                        ? "text-[#749B0C]" 
                        : "text-gray-700 hover:text-gray-900"
                      }
                    `}
                  >
                    {item.name}
                    {activeSection === item.id && (
                      <motion.div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#9bc539] rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Right Section: CTA Button - Angepasste Größe je nach Scroll-Status */}
              <div className="flex items-center space-x-3">
                <button 
                  className={`
                    bg-[#9bc539] hover:bg-[#8ab42d] text-white rounded-full transition-all shadow-sm hover:shadow-md
                    ${scrolled 
                      ? 'px-3.5 py-1.5 text-sm' 
                      : 'px-4 py-2 text-sm'
                    }
                  `}
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="hidden sm:inline">Jetzt starten</span>
                  <span className="sm:hidden">Starten</span>
                </button>
                
                {/* Mobile Menu Toggle - Besser angepasst */}
                <button 
                  className="md:hidden ml-1 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100/80"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <div className="relative w-5">
                    <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 mt-1 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Mobile Menu Panel - Verbesserte UX für mobile Nutzer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 z-40 bg-black/5 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div 
                className="fixed top-4 right-4 left-4 bg-white rounded-2xl overflow-hidden shadow-xl"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-5">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center">
                      <svg
                        className="h-7 w-7"
                        viewBox="0 0 725 750"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M549.579 685L362.5 298L175.421 685H31.4276L0 750H217L362 450L507 750H725L693.572 685H549.579Z" fill="#749B0C"/>
                        <path d="M662.65 621L362.5 0L104.4 534H104.416L72.9944 599H72.9833L62.35 621H133.421L254.031 371.501L254.003 371.443L362.5 147L438.545 304.31L438.275 304.868L591.095 621H662.65Z" fill="#749B0C"/>
                        <path d="M694.067 686H694.056L725 750L694.067 686Z" fill="#749B0C"/>
                        <path d="M0 750L30.9441 686H30.9333L0 750Z" fill="#749B0C"/>
                        <path d="M362 299L362.008 299.017L356.969 309.442L356.961 309.425L362 299Z" fill="#749B0C"/>
                      </svg>
                      <span className="ml-2 font-bold tracking-tight text-gray-800 text-base">
                        ATHLY
                      </span>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-gray-600 focus:outline-none p-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Verbesserte mobile Navigation mit mehr Touch-Fläche */}
                  <div className="flex flex-col space-y-2">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={item.onClick}
                        className={`
                          px-4 py-3 rounded-xl text-left transition-colors text-base relative
                          ${activeSection === item.id
                            ? "text-[#749B0C] font-medium" 
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                      >
                        {item.name}
                        {activeSection === item.id && (
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-[#9bc539] rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Conversion-optimierter CTA Button für Mobile */}
                  <div className="mt-6">
                    <button 
                      className="w-full bg-[#9bc539] hover:bg-[#8ab42d] text-white rounded-xl py-4 text-base font-medium transition-all shadow-sm flex items-center justify-center"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsModalOpen(true);
                      }}
                    >
                      <span className="flex items-center justify-center">
                        Jetzt starten
                        <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Waitlist Modal mit AnimatePresence für smoothe Übergänge */}
      <AnimatePresence>
        {isModalOpen && (
          <WaitlistModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Spacer div that's only displayed on mobile devices */}
      <div style={{ height: mobileHeaderHeight }} aria-hidden="true" className="md:hidden w-full"></div>
    </>
  );
}