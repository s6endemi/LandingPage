"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]);

  const springY1 = useSpring(y1, { damping: 15, stiffness: 100 });
  const springY2 = useSpring(y2, { damping: 20, stiffness: 80 });

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      onViewportEnter={() => {
        // You can add additional animations when the component enters the viewport
      }}
      onViewportLeave={() => {
        // You can add additional animations when the component leaves the viewport
      }}
    >
      <div className="absolute left-0 top-0 h-full ml-8 md:ml-16 lg:ml-24">
        <svg
          width="50"
          height={svgHeight}
          viewBox={`0 0 50 ${svgHeight}`}
          fill="none"
          className="absolute left-0 top-0"
        >
          {/* Gradient for the beam path */}
          <defs>
            <linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(80, 100, 180, 0.5)" />
              <stop offset="50%" stopColor="rgba(120, 140, 220, 0.9)" />
              <stop offset="100%" stopColor="rgba(80, 100, 180, 0.5)" />
            </linearGradient>
          </defs>

          {/* Background line */}
          <line
            x1="25"
            y1="0"
            x2="25"
            y2={svgHeight}
            stroke="rgba(120, 120, 140, 0.1)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Animated path */}
          <motion.path
            d={`M 25 0 L 25 ${svgHeight}`}
            fill="none"
            stroke="url(#beamGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            style={{ pathLength: scrollYProgress }}
          />

          {/* Moving dot */}
          <motion.circle
            cx="25"
            cy={springY1}
            r="4"
            fill="#4a83ff"
            filter="drop-shadow(0 0 5px rgba(100, 150, 255, 0.8))"
          />

          {/* Glowing pulse around the dot */}
          <motion.circle
            cx="25"
            cy={springY2}
            r="12"
            fill="none"
            stroke="rgba(120, 150, 255, 0.4)"
            strokeWidth="1"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
            }}
            animate={{
              r: [12, 16, 12],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Content markers/indicators */}
        <div className="absolute left-0 top-0 h-full w-full z-10">
          {Array.from({ length: 5 }).map((_, i) => {
            const progress = i / 4; // 0, 0.25, 0.5, 0.75, 1
            const y = progress * svgHeight;

            return (
              <motion.div
                key={i}
                className="absolute left-0 w-7 h-7 flex items-center justify-center"
                style={{ top: y - 14 }} // Center vertically
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
              >
                <div className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center group hover:scale-125 transition-transform duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/70 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="ml-16 md:ml-32 lg:ml-48" ref={contentRef}>
        {children}
      </div>
    </motion.div>
  );
};
