"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SparklesCore } from "@/components/aceternity/sparkles";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

// Premium Testimonial Card Component for Highlighted Testimonials
const HighlightedTestimonialCard = ({
  quote,
  author,
  position,
  company,
  image,
  rating,
  index
}: {
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
  rating: number;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-zinc-700/50 p-8 h-full flex flex-col"
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -5 : 0,
          backgroundColor: isHovered ? "rgba(24, 24, 27, 0.5)" : "rgba(24, 24, 27, 0.3)",
          borderColor: isHovered ? "rgba(120, 120, 220, 0.3)" : "rgba(63, 63, 70, 0.5)"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15 
        }}
      >
        {/* Border Beam Effect */}
        <BorderBeam className="absolute inset-0 opacity-30" />
        
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-zinc-900/10" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="opacity-20">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(120, 120, 140, 0.3)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>
        </div>
        
        {/* Quote Icon with Glow */}
        <motion.div
          className="absolute -top-4 -left-4 text-5xl text-zinc-700/50"
          animate={{ 
            opacity: isHovered ? 0.8 : 0.5,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          &quot;
        </motion.div>
        
        {/* Star Rating */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 24 24"
              fill={i < rating ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "w-5 h-5 mr-1",
                i < rating ? "text-amber-400" : "text-zinc-600"
              )}
              animate={{
                scale: isHovered && i < rating ? [1, 1.2, 1] : 1,
                rotateY: isHovered && i < rating ? [0, 360, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </motion.svg>
          ))}
        </div>
        
        {/* Quote Text */}
        <div className="flex-grow">
          <p className="text-zinc-300 italic mb-6 relative">
            {/* Subtle text highlight on hover */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-lg -m-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">{quote}</span>
          </p>
        </div>
        
        {/* Author Info with Profile Picture */}
        <div className="flex items-center mt-4">
          {/* Profile Image with Animated Border */}
          <div className="relative mr-4">
            <motion.div
              className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-70 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-md transition-opacity duration-500"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
            />
            <div className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-700/50 group-hover:border-zinc-600/50 transition-colors duration-300">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          </div>
          
          {/* Author Details */}
          <div>
            <h4 className="font-medium text-zinc-200">{author}</h4>
            <p className="text-sm text-zinc-400">
              {position}, <span className="text-zinc-500">{company}</span>
            </p>
          </div>
        </div>
        
        {/* Animated corner accents */}
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r"
        ].map((position, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 ${position} border-blue-400/0`}
            animate={{ borderColor: isHovered ? "rgba(96, 165, 250, 0.5)" : "rgba(96, 165, 250, 0)" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
// Company Card for the Erfolgreiche Teams section
const CompanyCard = ({
  company,
  logo,
  industry,
  highlight,
  index
}: {
  company: string;
  logo: string;
  industry: string;
  highlight: string;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm rounded-xl overflow-hidden h-full"
        animate={{ 
          y: isHovered ? -5 : 0,
          borderColor: isHovered ? "rgba(120, 120, 220, 0.3)" : "rgba(63, 63, 70, 0.5)",
          boxShadow: isHovered ? "0 10px 30px -10px rgba(20, 20, 40, 0.3)" : "0 0 0 rgba(0, 0, 0, 0)"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15 
        }}
      >
        <div className="flex items-center p-5 border-b border-zinc-800/30">
          {/* Logo */}
          <motion.div 
            className="w-12 h-12 rounded-full bg-zinc-800/70 border border-zinc-700/30 flex items-center justify-center overflow-hidden mr-4"
            animate={{ 
              rotate: isHovered ? 10 : 0,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="w-8 h-8 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${logo})` }}
            />
          </motion.div>
          
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-medium text-zinc-100">{company}</h3>
            <p className="text-xs text-zinc-500">{industry}</p>
          </div>
          
          {/* Accent Line */}
          <motion.div 
            className="ml-auto h-8 w-1 rounded-full bg-gradient-to-b from-blue-400/70 to-indigo-500/70"
            animate={{ 
              height: isHovered ? '2rem' : '1.5rem',
              opacity: isHovered ? 1 : 0.7
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Highlight */}
        <div className="p-5">
          <div className="text-zinc-300">{highlight}</div>
          
          {/* Read more link */}
          <motion.div 
            className="flex items-center mt-4 text-blue-400 text-sm cursor-pointer"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>Mehr erfahren</span>
            <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Company logos - these are placeholder SVG data URLs
const companyLogos = {
  techvision: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjA5QkYyIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0yMSAxMmE5IDkgMCAxMS05LTkgOS4wMSA5LjAxIDAgMDE5IDl6Ii8+PHBhdGggZD0iTTEyIDhMMTIgMTZNOCAxMkwxNiAxMiIvPjwvc3ZnPg==",
  globalbank: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjA5QkYyIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0zIDVhMiAyIDAgMDEyLTJoMTRhMiAyIDAgMDEyIDJ2MTRhMiAyIDAgMDEtMiAySDVhMiAyIDAgMDEtMi0yVjV6Ii8+PHBhdGggZD0iTTkgMTJIMTUiLz48cGF0aCBkPSJNMTIgOVYxNSIvPjwvc3ZnPg==",
  innovatelabs: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjA5QkYyIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMCAyTDEyIDQuMkwxNCAyIi8+PHBhdGggZD0iTTEyIDQuMlYxNiIvPjxwYXRoIGQ9Ik04IDlIMTYiLz48cGF0aCBkPSJNNSAxNi44TDEyIDIyTDE5IDE2LjgiLz48L3N2Zz4=",
  datastream: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjA5QkYyIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0yMSAxMkg4TTIxIDE2SDgiLz48cGF0aCBkPSJNMjEgOEg4TTQgOEg0TTQgMTJINE00IDE2SDQiLz48L3N2Zz4=",
  nexushealth: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjA5QkYyIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xOC4yIDEyLjVMOC4yIDEyLjUiLz48cGF0aCBkPSJNMTMuMiA3LjVMOC4yIDEyLjVMMTMuMiAxNy41Ii8+PHBhdGggZD0iTTIxIDVhMiAyIDAgMDAtMi0ySDVhMiAyIDAgMDAtMiAydjE0YTIgMiAwIDAwMiAyaDE0YTIgMiAwIDAwMi0yVjV6Ii8+PC9zdmc+"
};

// Company data
const companies = [
  {
    company: "TechVision Solutions",
    logo: companyLogos.techvision,
    industry: "Software & AI",
    highlight: "42% gesteigerte Produktivität durch intelligente Automatisierung"
  },
  {
    company: "Global Banking Corp",
    logo: companyLogos.globalbank,
    industry: "Finanzwesen",
    highlight: "Reduzierte die Bearbeitungszeit für Kundenanfragen um 65%"
  },
  {
    company: "InnovateLabs GmbH",
    logo: companyLogos.innovatelabs,
    industry: "Forschung & Entwicklung",
    highlight: "30% schnellere Markteinführung für neue Produkte"
  },
  {
    company: "DataStream Analytics",
    logo: companyLogos.datastream,
    industry: "Datenanalyse",
    highlight: "Verarbeitet 3x mehr Daten bei gleichbleibenden Kosten"
  },
  {
    company: "Nexus Health Systems",
    logo: companyLogos.nexushealth,
    industry: "Gesundheitswesen",
    highlight: "Verbesserte Patientenkommunikation führt zu 28% höherer Zufriedenheit"
  }
];

// Featured Testimonial Component
const FeaturedTestimonial = ({
  quote,
  author,
  position,
  company,
  image
}: {
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative group rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Glass Effect Background */}
      <motion.div
        className="absolute inset-0 backdrop-blur-sm"
        animate={{
          backgroundColor: isHovered ? "rgba(24, 24, 27, 0.6)" : "rgba(24, 24, 27, 0.4)"
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/40 to-zinc-900/20" />
        <BorderBeam className="absolute inset-0 opacity-40" />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={{
              backgroundPositionX: isHovered ? "100%" : "0%"
            }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
            }}
          />
        </div>
      </motion.div>
      
      <div className="relative z-10 p-10 md:p-12 flex flex-col md:flex-row items-start gap-8">
        {/* Profile Section */}
        <div className="md:w-1/3">
          <div className="relative group/image">
            {/* Profile image with animated border */}
            <motion.div
              className="absolute -inset-2 rounded-full opacity-0 group-hover/image:opacity-100 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-md transition-opacity duration-500"
              animate={{
                rotate: isHovered ? 360 : 0
              }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            />
            
            <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-zinc-700/70 group-hover/image:border-zinc-500/70 transition-colors duration-300 mx-auto md:mx-0">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
              
              {/* Subtle inner glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
              />
            </div>
            
            {/* Animated orbit */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-blue-500/20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 10, ease: "linear", repeat: Infinity },
                scale: { duration: 3, ease: "easeInOut", repeat: Infinity }
              }}
            />
          </div>
          
          {/* Author Info */}
          <div className="text-center md:text-left mt-4">
            <h4 className="font-medium text-zinc-200 text-lg">{author}</h4>
            <p className="text-sm text-zinc-400 mt-1">
              {position}, <span className="text-zinc-500">{company}</span>
            </p>
          </div>
          
          {/* Premium Rating */}
          <div className="flex justify-center md:justify-start mt-4">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-1 text-amber-400"
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: "easeInOut",
                  repeat: isHovered ? Infinity : 0,
                  repeatDelay: 5
                }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </motion.svg>
            ))}
          </div>
        </div>
        
        {/* Quote Section */}
        <div className="md:w-2/3 relative">
          {/* Large quote mark */}
          <motion.div
            className="absolute -top-6 -left-2 text-7xl text-zinc-700/30"
            animate={{ 
              opacity: isHovered ? 0.5 : 0.3,
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.5 }}
          >
            &quot;
          </motion.div>
          
          {/* Quote Text */}
          <div className="relative mt-4 md:mt-0">
            <p className="text-xl md:text-2xl text-zinc-200 font-light italic leading-relaxed mb-6 pl-4 md:pl-6 relative">
              {/* Subtle line accent */}
              <motion.span
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400/30 via-indigo-400/30 to-blue-400/10 rounded-full"
                animate={{
                  height: isHovered ? "100%" : "70%"
                }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">{quote}</span>
            </p>
            
            {/* Dynamic particles on hover */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                <SparklesCore
                  id="featured-sparkles"
                  background="transparent"
                  minSize={0.2}
                  maxSize={0.8}
                  particleColor="#4B91F7"
                  particleDensity={10}
                  className="opacity-30"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Testimonial Statistics Component
const TestimonialStats = () => {
  const stats = [
    { value: "90%", label: "Kundenzufriedenheit" },
    { value: "80+", label: "Active Companies" },
    { value: "4.9/5", label: "Durchschnittliche Bewertung" }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="relative backdrop-blur-sm group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          {/* Glass card with border */}
          <div className="relative rounded-xl backdrop-blur-sm border border-zinc-800/50 p-6 transition-colors duration-300 group-hover:border-zinc-700/50">
            {/* Subtle background elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-zinc-900/5" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-b from-blue-900/20 to-transparent blur-xl" />
            </div>
            
            {/* Highlight on hover */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            <motion.div 
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-400 mb-2 text-center"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {stat.value}
            </motion.div>
            <div className="text-zinc-400 text-sm text-center">{stat.label}</div>
            
            {/* Pulsing dot */}
            <motion.div
              className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-blue-400"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [0.8, 1.2, 0.8],
                boxShadow: [
                  "0 0 2px rgba(96, 165, 250, 0.3)",
                  "0 0 8px rgba(96, 165, 250, 0.6)",
                  "0 0 2px rgba(96, 165, 250, 0.3)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Marquee testimonial card - compact version for the marquee
const MarqueeTestimonialCard = ({
  quote,
  author,
  position,

  image,
  rating
}: {
  quote: string;
  author: string;
  position: string;
  company: string;
  image: string;
  rating: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative w-80 mx-4 my-6 flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <motion.div
        className="h-full rounded-xl overflow-hidden backdrop-blur-sm border border-zinc-700/50 p-6 bg-zinc-900/30"
        animate={{
          borderColor: isHovered ? "rgba(120, 120, 220, 0.3)" : "rgba(63, 63, 70, 0.5)",
          boxShadow: isHovered ? "0 10px 30px -10px rgba(20, 20, 40, 0.3)" : "0 0 0 rgba(0, 0, 0, 0)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Star rating */}
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              fill={i < rating ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className={cn(
                "w-4 h-4 mr-1",
                i < rating ? "text-amber-400" : "text-zinc-600"
              )}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        
        {/* Quote */}
        <p className="text-zinc-300 text-sm mb-4 line-clamp-4">{quote}</p>
        
        {/* Author info */}
        <div className="flex items-center mt-auto pt-2 border-t border-zinc-800/50">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border border-zinc-700/50">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
          <div>
            <h4 className="text-zinc-200 text-sm font-medium">{author}</h4>
            <p className="text-zinc-500 text-xs">{position}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Case Study Card Component
const CaseStudyCard = ({
  title,
  company,
  description,
  image,
  index
}: {
  title: string;
  company: string;
  description: string;
  image: string;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card with image and overlay */}
      <div className="relative rounded-xl overflow-hidden aspect-video">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{ 
            backgroundImage: `url(${image})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-zinc-900/30" />
        
        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col h-full justify-end">
          <div className="bg-zinc-900/60 backdrop-blur-sm p-4 rounded-lg border border-zinc-700/30 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
            <h3 className="text-lg font-medium text-zinc-100 mb-1">{title}</h3>
            <p className="text-sm text-blue-300 mb-3">{company}</p>
            <p className="text-sm text-zinc-400 line-clamp-2">{description}</p>
            
            {/* Animated arrow button */}
            <motion.div 
              className="flex items-center mt-4 text-zinc-300 text-sm group/btn"
              animate={{
                x: isHovered ? 5 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="group-hover/btn:text-blue-300 transition-colors">Fallstudie lesen</span>
              <svg className="w-4 h-4 ml-2 transform transition-transform group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Testimonials Section Component
export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60]);
  
  // Sample testimonial data
  const testimonials = [
    {
      quote: "Diese Platform hat die Art und Weise, wie unser Team zusammenarbeitet, revolutioniert. Die Produktivität ist spürbar gestiegen.",
      author: "Marie Schmidt",
      position: "COO",
      company: "TechStart GmbH",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "Die Benutzerfreundlichkeit in Kombination mit den fortschrittlichen Funktionen macht diese Lösung zu etwas Besonderem.",
      author: "Thomas Weber",
      position: "Head of Product",
      company: "InnovateLabs",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "Nach einem Jahr Nutzung können wir bestätigen, dass die Investition sich mehr als gelohnt hat. Ein echter Game-Changer.",
      author: "Sophia Müller",
      position: "CTO",
      company: "DataVision AG",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4
    }
  ];
  
  // Featured testimonial with Asian tech executive
  const featured = {
    quote: "Die intelligente Plattform hat nicht nur unsere internen Prozesse optimiert, sondern auch die Zusammenarbeit mit Kunden auf ein völlig neues Level gehoben. Wir konnten unsere Projektdurchlaufzeiten um 40% reduzieren und gleichzeitig die Kundenzufriedenheit signifikant steigern. In der heutigen schnelllebigen Geschäftswelt ist diese Lösung nicht mehr wegzudenken.",
    author: "Mei Zhang",
    position: "CEO",
    company: "Quantum Innovations",
    image: "https://plus.unsplash.com/premium_photo-1661774991416-ee14a1bc0d30?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  };
  
  // Case studies data
  const caseStudies = [
    {
      title: "40% schnellere Projektabwicklung",
      company: "Global Banking Corp",
      description: "Wie eine führende Finanzinstitution durch unsere Plattform ihre Effizienz revolutionierte.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Verbesserte Kundenzufriedenheit",
      company: "TechVision Solutions",
      description: "Ein Tech-Unternehmen verbessert seine Kundenbindung durch datengesteuerte Entscheidungen.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];
  
  // Extended testimonials data for marquee
  const allTestimonials = [
    ...testimonials,
    {
      quote: "Die intuitive Benutzeroberfläche hat unseren Schulungsbedarf drastisch reduziert. Neue Mitarbeiter sind in Rekordzeit produktiv.",
      author: "Martin Weber",
      position: "HR Director",
      company: "MetaSolutions GmbH",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "Seit der Implementierung haben wir eine Steigerung der Kundenzufriedenheit um 42% verzeichnet. Absolut beeindruckend.",
      author: "Elena Schmitz",
      position: "Customer Success",
      company: "Bright Finance",
      image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "Als Start-up waren wir skeptisch, aber die Investition hat sich bereits nach drei Monaten amortisiert. Klare Empfehlung!",
      author: "Niklas Berger",
      position: "Founder & CEO",
      company: "GreenTech Ventures",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4
    },
    {
      quote: "Als Start-up waren wir skeptisch, aber die Investition hat sich bereits nach drei Monaten amortisiert. Klare Empfehlung!",
      author: "Dr.Jing Wei",
      position: " CEO",
      company: "SevenHills Ventures",
      image: "https://unsplash.com/de/fotos/frau-tragt-blaues-hemd-WC7KIHo13Fc",
      rating: 5
    },
    {
      quote: "Die KI-Komponenten haben unsere Datenanalyse auf ein völlig neues Level gehoben. Wir entdecken jetzt Muster, die wir vorher nie gesehen hätten.",
      author: "Dr. Stephanie Krause",
      position: "Data Science Lead",
      company: "Analytics Pro",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "Die Cloud-Integration funktionierte nahtlos, und das Sicherheitskonzept hat sogar unsere IT-Abteilung beeindruckt.",
      author: "Chen Wei",
      position: "Security Officer",
      company: "SecureTech Solutions",
      image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 5
    }
  ];

  return (
    <section ref={containerRef} className="py-24 overflow-hidden" id="testimonials">
      {/* Premium Section Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Subtle gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,120,180,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(90,90,160,0.08),transparent_60%)]" />
      </div>
      
      {/* Section Header */}
      <motion.div 
        className="container mx-auto px-4 mb-16"
        style={{ opacity, y }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Das sagen unsere Kunden
          </motion.h2>
          <motion.p 
            className="text-zinc-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Erfahrungen von Unternehmen, die unsere Lösungen bereits erfolgreich einsetzen
          </motion.p>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-blue-600/50 to-indigo-600/50 mx-auto mt-8 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>
      
      {/* Featured Testimonial */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-6xl mx-auto">
          <FeaturedTestimonial
            quote={featured.quote}
            author={featured.author}
            position={featured.position}
            company={featured.company}
            image={featured.image}
          />
        </div>
      </div>
      
      {/* Testimonial Statistics */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-5xl mx-auto">
          <TestimonialStats />
        </div>
      </div>
      
      {/* Testimonials Marquee */}
      <div className="mb-20 overflow-hidden">
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-2xl font-semibold text-zinc-200">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-400">
              Kundenstimmen
            </span>
          </h3>
        </motion.div>
        
        {/* First row - regular direction */}
        <Marquee className="py-2 [--duration:30s]" pauseOnHover>
          {allTestimonials.slice(0, 6).map((testimonial, index) => (
            <MarqueeTestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              company={testimonial.company}
              image={testimonial.image}
              rating={testimonial.rating}
            />
          ))}
        </Marquee>
        
        {/* Second row - reverse direction */}
        <Marquee className="py-2" pauseOnHover reverse>
          {allTestimonials.slice(5).map((testimonial, index) => (
            <MarqueeTestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              position={testimonial.position}
              company={testimonial.company}
              image={testimonial.image}
              rating={testimonial.rating}
            />
          ))}
        </Marquee>
      </div>
      
      {/* Company Showcase - Redesigned */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-6xl mx-auto">
          <motion.h3 
            className="text-2xl font-semibold text-center text-zinc-200 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-400">
              Erfolgreiche Teams vertrauen auf uns
            </span>
          </motion.h3>
          
          {/* Company Cards with Horizontal Scroll on Mobile */}
          <div className="relative">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none -z-10">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-1/3 w-px bg-gradient-to-b from-transparent via-zinc-700/30 to-transparent"></div>
              <div className="absolute top-0 bottom-0 right-1/3 w-px bg-gradient-to-b from-transparent via-zinc-700/30 to-transparent"></div>
            </div>
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.slice(0, 6).map((company, index) => (
                <CompanyCard
                  key={index}
                  company={company.company}
                  logo={company.logo}
                  industry={company.industry}
                  highlight={company.highlight}
                  index={index}
                />
              ))}
            </div>
            
            {/* Highlight lines */}
            <motion.div 
              className="absolute -inset-6 pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0" />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Case Studies */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-5xl mx-auto">
          <motion.h3 
            className="text-2xl font-semibold text-center text-zinc-200 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-400">
              Erfolgsgeschichten
            </span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study, index) => (
              <CaseStudyCard
                key={index}
                title={study.title}
                company={study.company}
                description={study.description}
                image={study.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Banner */}
      <div className="container mx-auto px-4 mt-24">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="relative rounded-2xl backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Premium Glass Background with Border Beam */}
            <div className="absolute inset-0">
              <BorderBeam className="absolute inset-0 opacity-40" />
              
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid-pattern-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(180, 180, 220, 0.5)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern-cta)" />
                </svg>
              </div>
            </div>
            
            <div className="relative z-10 p-10 md:p-16 flex flex-col items-center text-center">
              <motion.h3 
                className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-300 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Bereit, die Transformation zu starten?
              </motion.h3>
              <motion.p 
                className="text-zinc-400 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Schließe dich Tausenden von zufriedenen Kunden an, die bereits von unserer Plattform profitieren.
              </motion.p>
              
              <motion.button
                  className="relative overflow-hidden px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // Finde den Waitlist-Button im Header und simuliere einen Klick
                    const headerButton = document.querySelector('.relative.group button');
                    if (headerButton) {
                      (headerButton as HTMLButtonElement).click();
                    }
                  }}
                >
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-15deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  <span className="relative z-10 flex items-center">
                    Kostenlose Demo anfordern
                    <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.button>

              
              {/* Trust Badges */}
              <div className="mt-10 flex flex-wrap justify-center gap-8">
                {['Sichere Verschlüsselung', 'DSGVO-konform', '24/7 Support'].map((badge, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center text-zinc-500 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <svg className="w-4 h-4 mr-1.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>{badge}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}