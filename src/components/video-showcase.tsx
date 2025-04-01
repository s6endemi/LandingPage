"use client";

import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export function VideoShowcase() {
  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="relative rounded-2xl overflow-hidden backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Premium Glass Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-transparent" />
            <BorderBeam className="absolute inset-0 opacity-20" />
          </div>

          <div className="relative z-10 p-10 md:p-16">
            {/* Header Section */}
            <div className="text-center mb-10">
              <motion.h3
                className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-300 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Erlebe SYNAPSE in Aktion
              </motion.h3>
              <motion.p
                className="text-zinc-400 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Sieh selbst, wie unsere KI-Plattform Arbeitsabläufe revolutioniert und Unternehmen in die Lage versetzt,
                intelligentere Entscheidungen zu treffen und ihre Effizienz zu steigern.
              </motion.p>
            </div>

            {/* Video Section */}
            <div className="max-w-4xl mx-auto mb-8">
              <HeroVideoDialog
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/watch?v=7Kt9ugD3bGQ"
                thumbnailSrc="/images/synapse-demo-thumbnail.jpg"
                thumbnailAlt="SYNAPSE KI-Plattform Demo"
                className="w-full"
              />
            </div>

            {/* Key Features Under Video */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              {[
                { value: "98.7%", label: "Genauigkeit bei Vorhersagemodellen", icon: "📊" },
                { value: "73%", label: "Kosteneinsparung durch Automatisierung", icon: "💰" },
                { value: "5x", label: "Schnellere Datenverarbeitung", icon: "⚡" },
                { value: "24/7", label: "Verfügbarkeit mit 99.99% Uptime", icon: "🔄" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="backdrop-blur-sm bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, backgroundColor: "rgba(30, 30, 40, 0.4)" }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <p className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-zinc-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mt-10">
              <motion.button
                className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium inline-flex items-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const modalTrigger = document.querySelector("[data-open-waitlist]");
                  if (modalTrigger && modalTrigger instanceof HTMLElement) {
                    modalTrigger.click();
                  }
                }}
              >
                <span>Demo anfordern</span>
                <svg
                  className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
