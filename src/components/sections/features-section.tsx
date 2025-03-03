"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Link from "next/link";

// Project Card Component
const ProjectCard = ({
  project,
  translate,
}: {
  project: {
    title: string;
    link: string;
    thumbnail: string;
    description: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      className="group/project h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group-hover/project:shadow-2xl h-full w-full"
      >
        {/* Regular img tag instead of Next.js Image component */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <img
            src={project.thumbnail}
            className="object-cover object-left-top h-full w-full"
            alt={project.title}
          />
        </div>
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 opacity-0 group-hover/project:opacity-90 bg-gradient-to-t from-black via-black/80 to-transparent rounded-xl transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 opacity-0 group-hover/project:opacity-100 group-hover/project:translate-y-0 transition-all duration-300">
          <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-sm text-zinc-300">{project.description}</p>
          
          <div className="flex items-center mt-4 text-blue-400 text-sm">
            <span>Website besuchen</span>
            <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Header for the integration showcase
const ShowcaseHeader = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-32 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-6xl font-bold">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
          KI-Integration
        </span>{" "}
        bei führenden Unternehmen
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-zinc-400">
        Entdecken Sie, wie unsere fortschrittliche KI-Plattform in verschiedenen Branchen erfolgreich 
        implementiert wurde und maßgeschneiderte Lösungen für einzigartige Herausforderungen bietet.
      </p>
    </div>
  );
};

// Main Integration Showcase Component
export function AIIntegrationShowcase() {
  const firstRow = integrationProjects.slice(0, 5);
  const secondRow = integrationProjects.slice(5, 10);
  const thirdRow = integrationProjects.slice(10, 15);
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 200]),
    springConfig
  );
  
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      id="ai-integration"
    >
      <ShowcaseHeader />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((project) => (
            <ProjectCard
              project={project}
              translate={translateX}
              key={project.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((project) => (
            <ProjectCard
              project={project}
              translate={translateXReverse}
              key={project.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((project) => (
            <ProjectCard
              project={project}
              translate={translateX}
              key={project.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

// Project data with real websites
export const integrationProjects = [
  {
    title: "Moonbeam - KI-gestützte Textoptimierung",
    link: "https://gomoonbeam.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    description: "Implementation von NLP-Modellen für verbesserte Inhaltsqualität und automatisierte Vorschläge."
  },
  {
    title: "Cursor - Intelligente Code-Vervollständigung",
    link: "https://cursor.so",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    description: "Integration unserer Code-Analyse-KI für echtzeitfähige Entwicklungsunterstützung."
  },
  {
    title: "Rogue - Adaptive Sicherheitsanalyse",
    link: "https://userogue.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/rogue.png",
    description: "KI-basierte Bedrohungserkennung und automatisierte Sicherheitsmaßnahmen."
  },
  {
    title: "Editorially - Smart Content Management",
    link: "https://editorially.org",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/editorially.png",
    description: "Implementation von KI-gestützten Workflows für optimierte Inhaltserstellung und -verwaltung."
  },
  {
    title: "Editrix AI - Sprachoptimierung",
    link: "https://editrix.ai",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    description: "Integration unserer sprachbasierten KI für automatisierte Text-Enhancement-Funktionen."
  },
  {
    title: "Pixel Perfect - Bildoptimierung",
    link: "https://app.pixelperfect.quest",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
    description: "Einsatz von Computer Vision AI für automatisierte Bildverbesserung und Designoptimierung."
  },
  {
    title: "Algochurn - Lernalgorithmen",
    link: "https://algochurn.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
    description: "KI-gestützte Lernfortschrittsverfolgung und personalisierte Algorithmus-Empfehlungen."
  },
  {
    title: "Aceternity UI - Design Intelligenz",
    link: "https://ui.aceternity.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
    description: "Integration von KI-gestützten Design-Entscheidungen und automatisierter Komponenten-Optimierung."
  },
  {
    title: "Tailwind Master Kit - Smarte Styles",
    link: "https://tailwindmasterkit.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
    description: "Implementierung unserer Design-KI für kontextbezogene Stilvorschläge und Optimierungen."
  },
  {
    title: "SmartBridge - Intelligente Konnektivität",
    link: "https://smartbridgetech.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
    description: "KI-gesteuerte Systeme für verbesserte Datenkommunikation und -synchronisation."
  },
  {
    title: "Renderwork Studio - Kreative KI",
    link: "https://renderwork.studio",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
    description: "Integration von generativen KI-Modellen für kreative Arbeitsabläufe und Designerstellung."
  },
  {
    title: "Creme Digital - Customer Insights",
    link: "https://cremedigital.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
    description: "Implementation unserer KI-Analytics für tiefgreifende Kundenverhaltensmuster."
  },
  {
    title: "Golden Bells Academy - EdTech KI",
    link: "https://goldenbellsacademy.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
    description: "KI-gestützte Lernwege und personalisiertes Feedback für optimierte Bildungsergebnisse."
  },
  {
    title: "Invoker Labs - Entwickler-KI",
    link: "https://invoker.lol",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/invoker.png",
    description: "Integration unserer Code-Analyse und automatische Bug-Erkennung für Entwicklerteams."
  },
  {
    title: "E Free Invoice - Dokumenten-KI",
    link: "https://efreeinvoice.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
    description: "Implementierung von Document-Processing-KI für automatisierte Datenerkennung und -extraktion."
  },
];