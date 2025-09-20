"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

const intelligenceLayers = [
  {
    id: "fusion",
    badge: "Layer 01",
    title: "Sensor Fusion Core",
    summary:
      "Verbindet Wearables, Computer Vision und Neuro-Signale zu einem konsistenten biometrischen Zwilling.",
    highlights: [
      "32+ Streams synchron: HRV, Glukose, SpO2, EEG, EMG",
      "Computer Vision fu00fcr MSK-Alignment & Mikro-Mimik",
      "Anomaly Detection mit personalisierten GenAI-Coaches",
    ],
    metric: { label: "Signal Integrity", value: "99.1%" },
    accent: "from-emerald-400/40 via-cyan-400/20 to-transparent",
  },
  {
    id: "context",
    badge: "Layer 02",
    title: "Context Intelligence",
    summary:
      "Verdichtet Environment Data, Lifestyle-Trigger und Cognitive Load zu proaktiven Empfehlungen.",
    highlights: [
      "Live-Scanning von Licht, Luft, Akustik, Temperatur",
      "Behaviour Graphs erkennen Burnout- oder Overtraining-Muster",
      "Adaptive Schedules passen Workouts, Recovery, Nutrition an",
    ],
    metric: { label: "Prediction Horizon", value: "18h" },
    accent: "from-sky-400/35 via-indigo-400/20 to-transparent",
  },
  {
    id: "guidance",
    badge: "Layer 03",
    title: "Guidance Engine",
    summary:
      "Generiert gefu00fchte Journeys, Nudges und Coach Loops, die sich in Echtzeit deinen Signalen anpassen.",
    highlights: [
      "Emotion-AI fu00fcr Stress, Fokus & Recovery",
      "Voice + AR-Overlays mit situativem Cueing",
      "Hybrid Coaching: AI replants & Human Expert Oversight",
    ],
    metric: { label: "Engagement Boost", value: "3.8x" },
    accent: "from-purple-400/35 via-rose-400/20 to-transparent",
  },
];

const streamMatrix = [
  {
    title: "Vital Suite",
    streams: ["HRV", "Temp", "SpO2", "BP"],
    description: "Hochauflu00f6sende Sensorfusion mit Kalman-Rekonstruktion und personalisierten Baselines.",
  },
  {
    title: "Motion Vision",
    streams: ["MSK Pose", "IMU", "Force Plate"],
    description: "Millimeter-genaue Bewegungserkennung fu00fcr Strength Training, Rehab & Posture.",
  },
  {
    title: "Neuro Mood",
    streams: ["EEG", "Facial Stress", "Tone"],
    description: "Erkennt mentale Ermu00fcdung, Fokus-Wellen und emotionale Signaturen in Echtzeit.",
  },
  {
    title: "Enviro Layer",
    streams: ["Licht", "Luft", "Akustik", "Temperatur"],
    description: "Baut circadiane Routinen und Recovery-Spaces auf Basis deiner Umgebung.",
  },
];

export function BioAISolutionSection() {
  const [activeLayerId, setActiveLayerId] = useState(intelligenceLayers[0].id);
  const activeLayer = intelligenceLayers.find((layer) => layer.id === activeLayerId) ?? intelligenceLayers[0];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,118,110,0.2),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(6,182,212,0.18),transparent_70%)]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:px-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-200/90">
            BioAI Intelligence Stack
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl md:text-[2.9rem]">
            Drei Ebenen, ein adaptives Operating System fu00fcr deinen Ko00f6rper
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-300 sm:text-base">
            BioAI orchestriert Sensoren, Kontexte und menschliche Coaches in einer flu00fcssigen Experience. Jede Schicht verstu00e4rkt die andere und liefert proaktive Entscheidungen, bevor du sie brauchst.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="space-y-4">
            {intelligenceLayers.map((layer) => {
              const isActive = layer.id === activeLayerId;
              return (
                <motion.button
                  key={layer.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`group relative w-full overflow-hidden rounded-2xl border px-6 py-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-emerald-400/60 bg-emerald-400/10 text-white shadow-[0_30px_80px_-50px_rgba(16,185,129,0.9)]"
                      : "border-white/10 bg-white/5 text-slate-200 hover:border-emerald-300/40 hover:bg-emerald-400/10"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-between text-[10px] uppercase tracking-[0.35em]">
                    <span className="text-slate-300/80">{layer.badge}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                        isActive ? "bg-emerald-400/20 text-emerald-200" : "bg-white/5 text-slate-400"
                      }`}
                    >
                      {layer.metric.label}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold">{layer.title}</p>
                  <div className="mt-2 text-sm text-slate-300/80">{layer.summary}</div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl"
            >
              <BorderBeam size={220} colorFrom="#34d399" colorTo="#06b6d4" />
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${activeLayer.accent} opacity-70 blur-3xl`} />

              <div className="relative space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.35em] text-emerald-200/80">
                  <span>{activeLayer.badge}</span>
                  <span className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold text-emerald-100/80">
                    {activeLayer.metric.value}
                  </span>
                </div>

                <div className="grid gap-3 text-sm text-slate-100/90">
                  {activeLayer.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-6">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/70">Stream Matrix</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {streamMatrix.map((stream) => (
                      <div key={stream.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-emerald-200/70">
                          {stream.streams.map((tag) => (
                            <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 text-sm font-medium text-white">{stream.title}</div>
                        <p className="mt-1 text-xs text-slate-300/75">{stream.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <ShimmerButton
                    className="px-7 py-3 text-sm font-semibold text-white"
                    shimmerColor="#22d3ee"
                    background="linear-gradient(135deg,#22c55e 0%,#0ea5e9 50%,#6366f1 100%)"
                    borderRadius="14px"
                  >
                    Demo der Guidance Engine
                  </ShimmerButton>
                  <span className="text-xs text-slate-300/70">Inklusive real-time Coach Loop & Predictive Scripts</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
