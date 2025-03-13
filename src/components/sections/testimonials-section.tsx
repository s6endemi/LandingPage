"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TestimonialMarquee } from "../ui/TestimonialMarquee";

export function TestimonialSection() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Minimalistisches Farbschema
  const colors = {
    // 60% - Neutrale Farben
    neutralDark: "#1f2937",
    neutralMedium: "#4b5563",
    neutralLight: "#f9fafb",
    
    // 30% - Markenfarben
    primary: "#9bc539",
    secondary: "#3B82F6",
    
    // 10% - CTA und Highlights
    ctaGreen: "#8ab42d",
    yellow: "#FBBF24"
  };
  
  // Parallax-Effekt für subtile Bewegung
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -15 : -30]);

  // Featured testimonial data
  const featuredTestimonial = {
    id: 1,
    name: "Darlene Chan, 20",
    headline: "Endlich eine App, die meinen Alltag versteht",
    story: "Mein chaotischer Zeitplan hat jede Fitness-Routine unmöglich gemacht! Termine verschieben sich ständig, und bei anderen Apps musste ich dann alles neu planen. Athly merkt, wenn ich einen stressigen Tag habe und passt mein Training automatisch an - manchmal reichen auch 15 Minuten, um dranzubleiben. Total begeistert, wie gut das funktioniert!",
    quote: "Zum ersten Mal fühle ich mich nicht schuldig, wenn ich ein Training verschieben muss. Athly plant einfach um und macht weiter.",
    achievement: ["3x Training pro Woche", "Konstante Routine", "Weniger Stress"],
    duration: "4 Monate",
    image: "/images/Darlene.jpeg", 
    rating: 5
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-20 overflow-hidden bg-white"
      id="testimonials"
    >
      {/* Subtiler Hintergrund mit Parallax */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute -top-40 right-5 md:right-20 w-72 md:w-96 h-72 md:h-96 rounded-full bg-[#9bc539]/5 opacity-60 blur-3xl"
          style={{ y: y1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/30 opacity-90"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header - Zentriert und elegant */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span 
            className="inline-block px-3 py-1 rounded-full mb-3 text-xs font-medium tracking-wide"
            style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            ERFAHRUNGEN
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Erfolgsgeschichten
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
          Was unsere Nutzer über ihre Transformation mit Athly sagen 
          </motion.p>
        </div>
        
        {/* Featured Testimonial - Elegant und iOS-inspiriert */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="md:flex">
              {/* Left: Image */}
              <div className="md:w-2/5 relative">
                <div className="h-64 md:h-full w-full">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${featuredTestimonial.image})` }}
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"
                  />
                  
                  {/* Achievement Badge */}
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-white text-xs font-medium">
                    {featuredTestimonial.duration}
                  </div>
                </div>
              </div>
              
              {/* Right: Content */}
              <div className="p-6 md:p-8 md:w-3/5">
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        viewBox="0 0 24 24"
                        fill={i < featuredTestimonial.rating ? "currentColor" : "none"}
                        stroke={i < featuredTestimonial.rating ? "none" : "currentColor"}
                        className="w-4 h-4 text-amber-400"
                      >
                        <path strokeWidth={1.5} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{featuredTestimonial.name}</h3>
                <p className="text-lg font-medium text-gray-700 mb-4">{featuredTestimonial.headline}</p>
                
                {/* Quote - Elegant und minimal */}
                <div 
                  className="relative mb-5 pl-5 border-l-2"
                  style={{ borderLeftColor: colors.primary }}
                >
                  <p className="text-gray-600 italic">"{featuredTestimonial.quote}"</p>
                </div>
                
                <p className="text-gray-600 mb-5">{featuredTestimonial.story}</p>
                
                {/* Achievements - Horizontal badges */}
                <div className="flex flex-wrap gap-2">
                  {featuredTestimonial.achievement.map((item, i) => (
                    <div 
                      key={i}
                      className="py-1 px-3 rounded-full text-sm"
                      style={{ backgroundColor: `${colors.primary}08`, color: colors.neutralDark }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Testimonial Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="py-2">
            <TestimonialMarquee />
          </div>
        </motion.div>
      </div>
    </section>
  );
}