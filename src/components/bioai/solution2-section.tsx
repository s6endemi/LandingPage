"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { WaitlistModal } from "@/components/waitlist/waitlist-modal";
import { trackEvent } from "@/lib/analytics";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MorphingText } from "@/components/magicui/morphing-text";
import { Meteors } from "@/components/magicui/meteors";

type JourneyStage = {
  id: string;
  badge: string;
  label: string;
  teaser: string;
  headline: string;
  description: string;
  bulletPoints: string[];
  statLabel: string;
  statValue: string;
  accent: string;
  microCopy: string;
  previewTag: string;
};

const journeyStages: JourneyStage[] = [
  {
    id: "analysis",
    badge: "Phase 01",
    label: "Intelligente Analyse",
    teaser: "Versteht dich schneller als jeder Fragebogen.",
    headline: "Deine Daten werden zum Performance-Blueprint",
    description:
      "Athly synchronisiert deine Wearables, Schlafdaten und Trainingserfahrung, um in Sekunden ein intelligentes Profil aufzubauen.",
    bulletPoints: [
      "Verbindet Health Apps, Kalender und Wearables automatisch",
      "Erkennt Ziele, Alltag und Limits mit Natural Language Understanding",
      "Erstellt ein adaptives Ausgangslevel ohne manuelle Tabellen",
    ],
    statLabel: "Startklar in",
    statValue: "92 s",
    accent: "from-emerald-400/50 via-sky-500/25 to-transparent",
    microCopy: "Zero friction onboarding: die KI versteht dich schneller als ein menschlicher Coach.",
    previewTag: "AI Intake",
  },
  {
    id: "plan",
    badge: "Phase 02",
    label: "Adaptiver Plan",
    teaser: "Workouts, Meals und Recovery reagieren in Echtzeit.",
    headline: "Der Plan, der sich jede Woche mit dir weiterentwickelt",
    description:
      "Der dynamische Sequencer kombiniert KI Modelle, menschliches Coaching und Biofeedback, um jede Einheit anzupassen.",
    bulletPoints: [
      "Rebalanciert Trainingssplit automatisch nach Energie und Stress Score",
      "Empfiehlt Mahlzeiten passend zu Kalorien, Makros und Vorlieben",
      "Synct deinen Kalender, damit Sessions in freie Slots fallen",
    ],
    statLabel: "Plan Updates",
    statValue: "12x pro Woche",
    accent: "from-lime-400/40 via-emerald-400/20 to-transparent",
    microCopy: "Hybrid Engine kombiniert KI Intelligence mit menschlichen Review Loops.",
    previewTag: "Dynamic Sequencer",
  },
  {
    id: "live",
    badge: "Phase 03",
    label: "Live Evolution",
    teaser: "Realtime Coaching mitten in deinem Alltag.",
    headline: "On-demand Coaching, Feedback und Motivation",
    description:
      "Dein Athly Coach reagiert auf Form Videos, Stimmungen und Alltagschaos mit konkreten Antworten in Sekunden.",
    bulletPoints: [
      "Video Form Checks mit KI Analyse und Coach Feedback",
      "Push Hinweise passen Intensitaet an deine HRV Trends an",
      "Voice Coaching ueber AirPods, wenn du im Gym bist",
    ],
    statLabel: "Antwortzeit",
    statValue: "<5 s Latenz",
    accent: "from-cyan-400/40 via-blue-500/20 to-transparent",
    microCopy: "Always-on Accountability: WhatsApp, App und Sprache in einem Feed.",
    previewTag: "Autopilot Coach",
  },
];

type HighlightCard = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  metric: { value: string; label: string };
  icon: React.ReactNode;
};

const highlightCards: HighlightCard[] = [
  {
    id: "twin",
    title: "Live Body Twin",
    description:
      "Simuliert jede Routine mit deinem digitalen Avatar und zeigt, wie Schlaf, Fuel und Training zusammenspielen.",
    tags: ["Predictive Analytics", "Wearable Sync"],
    metric: { value: "87%", label: "Goal Milestones erreicht" },
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 3c3.866 0 7 3.134 7 7 0 1.336-.36 2.59-.99 3.665l1.89 4.229-4.228-1.89A6.97 6.97 0 0112 17c-3.866 0-7-3.134-7-7s3.134-7 7-7z"
        />
      </svg>
    ),
  },
  {
    id: "collective",
    title: "Coach Collective Intelligence",
    description:
      "Alle Erkenntnisse der Athly Coaches fliessen in eine gemeinsame Wissensbank mit sofort einsatzbereiten Playbooks.",
    tags: ["Human in the Loop", "Pro Playbooks"],
    metric: { value: "24/7", label: "Guided Support" },
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M17 20h5V4H2v16h5m10 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0m-6 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0M7 16h10"
        />
      </svg>
    ),
  },
  {
    id: "motivation",
    title: "Motivation OS",
    description:
      "Micro Challenges, Social Accountability und Rewards halten dich konstant in Bewegung.",
    tags: ["Habit Loop", "Social Drive"],
    metric: { value: "3.5x", label: "mehr Completed Sessions" },
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 6v6l4 2m5-1a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

type SolutionMetric = {
  id: string;
  value: number;
  suffix?: string;
  precision?: number;
  label: string;
  highlight?: string;
};

const solutionMetrics: SolutionMetric[] = [
  { id: "consistency", value: 72, suffix: "%", label: "mehr Trainingskonsistenz nach 30 Tagen" },
  { id: "fat-loss", value: 4.8, suffix: "kg", precision: 1, label: "durchschnittlicher Fettverlust in 8 Wochen" },
  { id: "rating", value: 4.92, suffix: "/5", precision: 2, label: "Coach Experience Rating", highlight: "Beta Cohort" },
];

const trustSignals = ["14 Tage kostenlos testen", "Keine Kreditkarte erforderlich", "Human Coaches inklusive"];

type BlueprintSignal = "Performance" | "Recovery" | "Fuel" | "Community";

type BlueprintStep = {
  time: string;
  title: string;
  detail: string;
  signal: BlueprintSignal;
  micro?: string;
};

type ExperienceMetric = {
  label: string;
  value: string;
  sub?: string;
};

type ExperiencePreset = {
  id: string;
  label: string;
  shortLabel: string;
  headline: string;
  summary: string;
  accent: string;
  tagline: string;
  highlights: string[];
  stat: { value: string; label: string };
  metrics: ExperienceMetric[];
  blueprint: BlueprintStep[];
};

const experiencePresets: ExperiencePreset[] = [
  {
    id: "sync",
    label: "Bio Sync Cloud",
    shortLabel: "Sync",
    headline: "Bio Sync Cloud",
    summary:
      "Athly verbindet Wearables, Health Apps und Kalender in einem orchestrierten Datenstrom, sodass du und dein Coach in Echtzeit reagieren koennen.",
    accent: "from-emerald-400/35 via-sky-500/15 to-transparent",
    tagline: "Datenstrom in Echtzeit, kein manuelles Tracking",
    highlights: [
      "HRV, Schlaf und Fuel werden kontinuierlich bewertet.",
      "Anomalie Detection liefert sofortige Recovery-Empfehlungen.",
      "Priorisierte Insights landen automatisch bei deinem Coach.",
    ],
    stat: { value: "45", label: "kompatible Datenquellen" },
    metrics: [
      { label: "Analyseruns", value: "120/Tag", sub: "KI Auswertungen" },
      { label: "Latency", value: "<2 s", sub: "Daten-Refresh" },
      { label: "Coach Handoffs", value: "Auto-priorisiert" },
    ],
    blueprint: [
      {
        time: "06:20",
        title: "Wake Sync",
        detail: "Sleep & HRV Import, Hydration Micro-Nudge",
        signal: "Recovery",
      },
      {
        time: "07:40",
        title: "AI Intake",
        detail: "Kalender & Energie Forecast, Routine-Vorschlag",
        signal: "Performance",
      },
      {
        time: "12:30",
        title: "Fuel Align",
        detail: "Makro-Anpassung & Slack Summary",
        signal: "Fuel",
      },
      {
        time: "21:15",
        title: "Night Protocol",
        detail: "Blue-Light Cutoff & Sleep Recipe Push",
        signal: "Recovery",
      },
    ],
  },
  {
    id: "engine",
    label: "Adaptive Decision Engine",
    shortLabel: "Plan",
    headline: "Adaptive Decision Engine",
    summary:
      "Die Hybrid-KI bewertet jede Einheit, vergleicht sie mit deinem Zielpfad und passt Belastung, Fuel und Fokus automatisch an.",
    accent: "from-lime-400/35 via-emerald-400/20 to-transparent",
    tagline: "Der Plan, der jede Woche smarter wird",
    highlights: [
      "Sequenziert Workouts nach Energielevel und Kalendereintraegen.",
      "Kombiniert Coach Playbooks mit dynamischen KI-Analysen.",
      "Prognostiziert Zielreichweite und gleicht sie taeglich ab.",
    ],
    stat: { value: "12", label: "Live Re-Planungen/Woche" },
    metrics: [
      { label: "Session Load", value: "High", sub: "heute" },
      { label: "Focus Score", value: "82", sub: "Deep Work ready" },
      { label: "AI Adjustments", value: "6 Trigger", sub: "letzte 24h" },
    ],
    blueprint: [
      {
        time: "06:45",
        title: "Activation",
        detail: "Mobility + Breathing, Last angepasst an HRV",
        signal: "Performance",
      },
      {
        time: "09:30",
        title: "Deep Work Block",
        detail: "Nutrition Boost & Fokus-Protokoll",
        signal: "Fuel",
      },
      {
        time: "17:45",
        title: "Strength Session",
        detail: "Progression + Tempo-Coaching via KI Voice",
        signal: "Performance",
      },
      {
        time: "20:50",
        title: "Recovery Sync",
        detail: "Cold-Plunge Reminder & Coach Review",
        signal: "Recovery",
      },
    ],
  },
  {
    id: "ritual",
    label: "Motivation Ritual Engine",
    shortLabel: "Drive",
    headline: "Motivation Ritual Engine",
    summary:
      "Micro-Challenges, Stimmungs-Check-ins und Social Accountability halten dich im Momentum und pushen deine Completion Rate.",
    accent: "from-cyan-400/30 via-sky-500/20 to-transparent",
    tagline: "Always-on Accountability & Dopaminarchitektur",
    highlights: [
      "Voice Notes deines Coaches werden zu personalisierten Nudges.",
      "Community Sprints aktivieren Competition genau dann, wenn du sie brauchst.",
      "Rewards passen sich an deine Psyche und Routinen an.",
    ],
    stat: { value: "3.5x", label: "mehr abgeschlossene Sessions" },
    metrics: [
      { label: "Motivation Score", value: "92", sub: "heute" },
      { label: "Social Loop", value: "3 Sprints", sub: "aktiv" },
      { label: "Reward Tier", value: "Founder+", sub: "Beta Vorteil" },
    ],
    blueprint: [
      {
        time: "07:10",
        title: "Mood Check-in",
        detail: "Voice-Reflexion + Nudge Playlist",
        signal: "Community",
      },
      {
        time: "12:05",
        title: "Micro Sprint",
        detail: "15 Min EMOM, Gamified Leaderboard",
        signal: "Performance",
      },
      {
        time: "18:40",
        title: "Coach Loop",
        detail: "Video Feedback + Habit Score",
        signal: "Community",
      },
      {
        time: "22:00",
        title: "Recovery Ritual",
        detail: "Breath Series + Sleep Podcast",
        signal: "Recovery",
      },
    ],
  },
];

const blueprintBadgeAccent: Record<BlueprintSignal, string> = {
  Performance: "bg-emerald-400/15 text-emerald-100/90",
  Recovery: "bg-sky-400/15 text-sky-100/90",
  Fuel: "bg-lime-400/15 text-lime-100/90",
  Community: "bg-cyan-400/15 text-cyan-100/90",
};

interface AnimatedMetricProps {

  metric: SolutionMetric;
  index: number;
  isActive: boolean;
}

const AnimatedMetric: React.FC<AnimatedMetricProps> = ({ metric, index, isActive }) => {
  const { value, suffix = "", precision = 0, label, highlight } = metric;
  const base = useMotionValue(0);
  const spring = useSpring(base, { stiffness: 90, damping: 22 });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (isActive) {
      base.set(value);
    }
  }, [base, isActive, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      const rounded = Number(latest.toFixed(precision));
      setCurrent(rounded);
    });

    return () => {
      unsubscribe();
    };
  }, [precision, spring]);

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(current);

  const needsGap = suffix && suffix !== "%" && !suffix.startsWith("/");

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 16 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-7 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      <div className="relative">
        <div className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
          {formatted}
          {suffix && (
            <span className="text-emerald-300">
              {needsGap ? " " : ""}
              {suffix}
            </span>
          )}
        </div>
        {highlight && (
          <div className="mt-2 inline-flex rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-emerald-200/90">
            {highlight}
          </div>
        )}
        <p className="mt-4 text-sm text-slate-300/80 md:text-base">{label}</p>
      </div>
    </motion.div>
  );
};

const ExperienceComposer: React.FC = () => {
  const [activePresetId, setActivePresetId] = useState<ExperiencePreset["id"]>(experiencePresets[0].id);
  const [timeCommitment, setTimeCommitment] = useState(45);
  const [energyReserve, setEnergyReserve] = useState(70);
  const [voiceNudges, setVoiceNudges] = useState(true);
  const [coachLoop, setCoachLoop] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useTransform(pointerY, [0, 1], [6, -6]);
  const rotateY = useTransform(pointerX, [0, 1], [-8, 8]);
  const gradientX = useTransform(pointerX, [0, 1], ["0%", "100%"]);
  const gradientY = useTransform(pointerY, [0, 1], ["0%", "100%"]);
  const glowBackground = useMotionTemplate`radial-gradient(320px circle at ${gradientX} ${gradientY}, rgba(34,197,94,0.18), transparent 75%)`;

  const activePreset = useMemo(
    () => experiencePresets.find((preset) => preset.id === activePresetId) ?? experiencePresets[0],
    [activePresetId]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePresetId((prev) => {
        const index = experiencePresets.findIndex((preset) => preset.id === prev);
        const nextIndex = index === -1 ? 0 : (index + 1) % experiencePresets.length;
        return experiencePresets[nextIndex].id;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    pointerX.set(Math.min(Math.max(x, 0), 1));
    pointerY.set(Math.min(Math.max(y, 0), 1));
  };

  const resetPointer = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const sessionBlocks = Math.max(2, Math.round(timeCommitment / 30));
  const energyDescriptor = energyReserve >= 78 ? "High Output" : energyReserve >= 55 ? "Balanced Flow" : "Recovery Ease";
  const aiAdjustments = voiceNudges
    ? Math.max(4, Math.round(energyReserve / 12 + sessionBlocks))
    : Math.max(2, Math.round(sessionBlocks / 1.5));
  const coachCadence = coachLoop ? "Taegliche Coach-Checks" : "2x/Woche Coach Sync";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <motion.div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={resetPointer}
        style={{ rotateX, rotateY }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-10 shadow-[0_40px_130px_-60px_rgba(16,185,129,0.65)] backdrop-blur-2xl"
      >
        <motion.div className="absolute inset-0" style={{ background: glowBackground }} />
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${activePreset.accent} opacity-65 blur-3xl`} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent opacity-55" />

        <div className="relative flex flex-col gap-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-emerald-200/80">Experience Composer</span>
              <p className="mt-2 text-sm text-slate-200/80">Steuere deinen Tagesplan wie ein Operator.</p>
            </div>
            <div className="relative flex w-full max-w-xs items-center rounded-full bg-white/[0.07] p-1">
              {experiencePresets.map((preset) => {
                const isActive = preset.id === activePresetId;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setActivePresetId(preset.id)}
                    className="relative flex-1 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition-colors"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="preset-highlight"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/30 via-cyan-400/25 to-emerald-400/30 shadow-[0_10px_30px_-18px_rgba(34,197,94,0.7)]"
                        transition={{ type: "spring", stiffness: 260, damping: 24 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? "text-white" : "text-slate-200/70"}`}>{preset.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-emerald-200/80">
              <span>Live Blueprint</span>
              <span>{activePreset.label}</span>
            </div>
            <p className="mt-4 text-sm text-slate-200/75">{activePreset.tagline}</p>
            <div className="mt-6 space-y-4">
              {activePreset.blueprint.map((step, idx) => (
                <motion.div
                  key={`${step.time}-${step.title}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.4 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.05] p-4"
                >
                  <div className="flex flex-col items-start text-xs uppercase tracking-[0.28em] text-slate-200/70">
                    <span className="text-sm font-semibold text-white/90">{step.time}</span>
                    <span className={`mt-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${blueprintBadgeAccent[step.signal]}`}>
                      {step.signal}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-medium text-white">{step.title}</span>
                      {step.micro && <span className="text-xs text-emerald-200/75">{step.micro}</span>}
                    </div>
                    <p className="mt-1 text-xs text-slate-300/80">{step.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-emerald-200/80">
                <span>Verfuegbare Zeit</span>
                <span>{timeCommitment} Min</span>
              </div>
              <input
                type="range"
                min={30}
                max={75}
                step={5}
                value={timeCommitment}
                onChange={(event) => setTimeCommitment(Number(event.target.value))}
                className="mt-4 h-1 w-full appearance-none rounded-full bg-white/10"
                style={{ accentColor: "#34d399" }}
              />
              <div className="mt-4 flex items-center justify-between text-xs text-slate-300/70">
                <span>Sessions</span>
                <span>{sessionBlocks} Bloecke</span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-emerald-200/80">
                <span>Energie-Reserve</span>
                <span>{energyReserve}%</span>
              </div>
              <input
                type="range"
                min={40}
                max={90}
                step={5}
                value={energyReserve}
                onChange={(event) => setEnergyReserve(Number(event.target.value))}
                className="mt-4 h-1 w-full appearance-none rounded-full bg-white/10"
                style={{ accentColor: "#22d3ee" }}
              />
              <div className="mt-4 flex items-center justify-between text-xs text-slate-300/70">
                <span>Status</span>
                <span>{energyDescriptor}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-white">AI Voice Nudges</div>
                  <p className="text-xs text-slate-300/70">Realtime Feedback im Gym</p>
                </div>
                <button
                  type="button"
                  onClick={() => setVoiceNudges((prev) => !prev)}
                  aria-pressed={voiceNudges}
                  className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${voiceNudges ? "bg-gradient-to-r from-emerald-400 to-cyan-400" : "bg-white/15"}`}
                >
                  <motion.span
                    className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-slate-950 shadow-lg"
                    animate={{ x: voiceNudges ? 22 : 2 }}
                    transition={{ type: "spring", stiffness: 240, damping: 20 }}
                  />
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-white">Coach Loop</div>
                  <p className="text-xs text-slate-300/70">Human Feedback integriert</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCoachLoop((prev) => !prev)}
                  aria-pressed={coachLoop}
                  className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${coachLoop ? "bg-gradient-to-r from-emerald-400 to-cyan-400" : "bg-white/15"}`}
                >
                  <motion.span
                    className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-slate-950 shadow-lg"
                    animate={{ x: coachLoop ? 22 : 2 }}
                    transition={{ type: "spring", stiffness: 240, damping: 20 }}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-lg font-semibold text-emerald-100">
                  {sessionBlocks}x
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Sessions geplant</div>
                  <p className="text-xs text-slate-300/70">{energyDescriptor} ? {aiAdjustments} AI Nudges</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-lg font-semibold text-emerald-100">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10m-7 0l-1.553 6.212a2 2 0 001.94 2.488h2.226a2 2 0 001.94-2.488L13 11" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Coach Rhythm</div>
                  <p className="text-xs text-slate-300/70">{coachCadence}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePreset.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-emerald-200/80">
              Intelligent Layer
            </div>
            <h3 className="text-2xl font-semibold text-white md:text-3xl">{activePreset.headline}</h3>
            <p className="text-sm text-slate-200/85 md:text-base">{activePreset.summary}</p>
            <ul className="space-y-3 text-sm text-slate-100/90">
              {activePreset.highlights.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-emerald-300/40 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100/90">
              <span className="text-2xl font-semibold text-white">{activePreset.stat.value}</span>
              <span className="text-xs uppercase tracking-[0.3em] text-emerald-100/80">{activePreset.stat.label}</span>
            </div>
            <div className="grid gap-3 pt-4 sm:grid-cols-3">
              {activePreset.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-slate-300/70">{metric.label}</div>
                  <div className="mt-2 text-lg font-semibold text-white">{metric.value}</div>
                  {metric.sub && <div className="text-xs text-slate-400/70">{metric.sub}</div>}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export function Solution2Section() {

  const [activeStageId, setActiveStageId] = useState<JourneyStage["id"]>(journeyStages[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spots, setSpots] = useState(() => 34 + Math.floor(Math.random() * 6));
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const isMetricsInView = useInView(metricsRef, { once: true, amount: 0.4 });

  const activeStage = useMemo(
    () => journeyStages.find((stage) => stage.id === activeStageId) ?? journeyStages[0],
    [activeStageId]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots((prev) => {
        if (prev <= 12) return prev;
        const decrement = Math.random() > 0.65 ? 1 : 0;
        return Math.max(12, prev - decrement);
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const changeStage = (id: JourneyStage["id"], trackSelection = false) => {
    setActiveStageId((prev) => {
      if (prev === id) return prev;
      if (trackSelection) {
        trackEvent("feature_select", "solution2", { stage: id });
      }
      return id;
    });
  };

  const openWaitlistModal = () => {
    setIsModalOpen(true);
    trackEvent("modal_open", "solution2", { stage: activeStageId });
  };

  return (
    <section id="solution2" className="relative overflow-hidden bg-slate-950 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl" />
      </div>

      <Meteors number={16} className="opacity-40" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-20 px-6 sm:px-8">
        <div className="space-y-7 text-center md:text-left">
          <div className="inline-flex items-center gap-2 self-center rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-200/90 md:self-start">
            Solution 02
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <AuroraText as="h2" className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            Der Athly Solution Stack orchestriert deine Transformation wie ein Elite-Team
          </AuroraText>

          <div className="relative h-16 w-full max-w-2xl md:h-20">
            <MorphingText
              texts={[
                "Adaptive Coaching Engine",
                "Predictive Recovery Lab",
                "Always-On Accountability",
              ]}
              className="mx-auto h-full w-full max-w-3xl text-left text-[clamp(1.8rem,4vw,2.9rem)] font-semibold uppercase tracking-[0.14em] text-emerald-100/60 leading-[1.05] md:mx-0 md:text-[clamp(2.2rem,3.5vw,3.4rem)]"
            />
          </div>

          <p className="mx-auto max-w-3xl text-sm text-slate-300 md:mx-0 md:text-base">
            Athly verbindet Daten, Coaching und Motivation in einer fluessigen Experience. Kein generischer Plan, sondern
            ein System, das mit dir mitwaechst – jeden Tag smarter.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <ShimmerButton
              onClick={openWaitlistModal}
              className="px-8 py-4 text-base font-semibold text-white"
              shimmerColor="#34d399"
              background="linear-gradient(135deg,#22c55e 0%,#0ea5e9 100%)"
              borderRadius="999px"
            >
              Beta Zugang sichern
            </ShimmerButton>

            <button
              onClick={() => changeStage("plan", true)}
              onMouseEnter={() => changeStage("plan")}
              onFocus={() => changeStage("plan")}
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-emerald-400/80 hover:text-white"
            >
              <span>Erlebe den adaptiven Plan</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 md:justify-start">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live Sync mit Apple Health & Garmin
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              DSGVO-ready Infrastruktur
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              EU Performance Coaches on demand
            </div>
          </div>
        </div>

        <ExperienceComposer />

        <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4">
            {journeyStages.map((stage) => {
              const isActive = stage.id === activeStage.id;
              return (
                <motion.button
                  key={stage.id}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => changeStage(stage.id, true)}
                  onMouseEnter={() => changeStage(stage.id)}
                  onFocus={() => changeStage(stage.id)}
                  className={`group relative w-full overflow-hidden rounded-2xl border px-6 py-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-emerald-400/60 bg-emerald-400/10 text-white shadow-[0_30px_80px_-50px_rgba(34,197,94,0.8)]"
                      : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-emerald-300/40 hover:bg-emerald-400/10"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-between text-xs uppercase tracking-[0.35em]">
                    <span className="text-slate-300/80">{stage.badge}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                        isActive ? "bg-emerald-400/20 text-emerald-200" : "bg-white/5 text-slate-400"
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold">{stage.teaser}</p>
                </motion.button>
              );
            })}
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] px-8 py-10 shadow-[0_40px_140px_-60px_rgba(16,185,129,0.8)] backdrop-blur-2xl"
              >
                <BorderBeam size={220} colorFrom="#22d3ee" colorTo="#22c55e" />
                <div className={`absolute inset-0 bg-gradient-to-br ${activeStage.accent} opacity-70 blur-3xl`} />
                <div className="relative">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.35em] text-slate-300/70">
                    <span>{activeStage.badge}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/80">
                      {activeStage.previewTag}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white md:text-3xl">{activeStage.headline}</h3>
                  <p className="mt-4 text-base text-slate-200/85">{activeStage.description}</p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-100/90">
                    {activeStage.bulletPoints.map((point, idx) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 * idx, duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white/90">
                      <span className="block text-[10px] uppercase tracking-[0.4em] text-emerald-200/80">
                        {activeStage.statLabel}
                      </span>
                      <span className="text-2xl font-semibold text-white">{activeStage.statValue}</span>
                    </div>
                    <p className="max-w-xs text-xs text-slate-200/80">{activeStage.microCopy}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {highlightCards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
            >
              <BorderBeam size={180} delay={index * 0.8} colorFrom="#22d3ee" colorTo="#22c55e" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-200">
                    {card.icon}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-200/70 transition-colors duration-300 group-hover:text-emerald-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="text-sm text-slate-300/85">{card.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-semibold text-emerald-300">{card.metric.value}</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-300/80">{card.metric.label}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div ref={metricsRef} className="grid gap-6 sm:grid-cols-3">
          {solutionMetrics.map((metric, index) => (
            <AnimatedMetric key={metric.id} metric={metric} index={index} isActive={isMetricsInView} />
          ))}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] px-8 py-10 text-center shadow-[0_40px_120px_-60px_rgba(16,185,129,0.7)] backdrop-blur-2xl sm:px-12">
          <BorderBeam size={260} colorFrom="#22d3ee" colorTo="#22c55e" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.2),transparent_75%)]" />
          <div className="relative space-y-6">
            <motion.span
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-200"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-ping" />
              {spots} Beta Plaetze offen
            </motion.span>

            <AuroraText as="h3" className="mx-auto max-w-3xl text-3xl font-semibold leading-tight text-white md:text-4xl">
              Werde Teil der Athly Performance Cohort
            </AuroraText>

            <p className="mx-auto max-w-2xl text-sm text-slate-200/80 md:text-base">
              Sichere dir jetzt priorisierten Zugang zur App, bevor wir oeffnen. Erhalte einen personalisierten Onboarding Call,
              einen dedizierten Coach und Founder-tier Vorteile, solange Plaetze verfuegbar sind.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ShimmerButton
                onClick={openWaitlistModal}
                className="px-8 py-4 text-base font-semibold text-white"
                shimmerColor="#22d3ee"
                background="linear-gradient(135deg,#22c55e 0%,#0ea5e9 50%,#6366f1 100%)"
                borderRadius="14px"
              >
                Jetzt Early Access sichern
              </ShimmerButton>

              <button
                onClick={() => changeStage("live", true)}
                onMouseEnter={() => changeStage("live")}
                onFocus={() => changeStage("live")}
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-emerald-400/70 hover:text-white"
              >
                <span>Live Demo ansehen</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400 md:text-sm">
              {trustSignals.map((signal) => (
                <div key={signal} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && <WaitlistModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
