"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

// Ultra-modern font stack
const fontStack = "system-ui, -apple-system, 'SF Pro Display', 'Inter', sans-serif";

type BiometricData = {
  label: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "stable";
  health: "optimal" | "warning" | "critical";
  prediction: number;
};

type HealthLayer = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  data: BiometricData[];
  insights: string[];
};

const healthLayers: HealthLayer[] = [
  {
    id: "neural",
    name: "Neural Pathways",
    description: "Cognitive load, stress patterns, and mental fatigue analysis",
    icon: "🧠",
    color: "from-purple-400 to-pink-400",
    data: [
      { label: "Cognitive Load", value: 67, unit: "%", trend: "stable", health: "optimal", prediction: 71 },
      { label: "Stress Index", value: 24, unit: "pts", trend: "down", health: "optimal", prediction: 19 },
      { label: "Focus Score", value: 87, unit: "%", trend: "up", health: "optimal", prediction: 92 },
    ],
    insights: [
      "Deep work window: 9:15-11:30 AM",
      "Stress peak predicted at 3:20 PM",
      "Optimal break time: every 47 minutes"
    ]
  },
  {
    id: "cardiac",
    name: "Cardiovascular",
    description: "Heart rate variability, blood pressure, and circulation patterns",
    icon: "❤️",
    color: "from-red-400 to-rose-400",
    data: [
      { label: "HRV", value: 45, unit: "ms", trend: "up", health: "optimal", prediction: 48 },
      { label: "Resting HR", value: 58, unit: "bpm", trend: "stable", health: "optimal", prediction: 57 },
      { label: "Recovery", value: 92, unit: "%", trend: "up", health: "optimal", prediction: 95 },
    ],
    insights: [
      "Peak cardiovascular performance: 6:30-8:00 AM",
      "Recovery phase entering at 10:45 PM",
      "Optimal training zone: 142-156 BPM"
    ]
  },
  {
    id: "metabolic",
    name: "Metabolic State",
    description: "Glucose levels, metabolic flexibility, and energy utilization",
    icon: "⚡",
    color: "from-amber-400 to-orange-400",
    data: [
      { label: "Glucose", value: 94, unit: "mg/dL", trend: "stable", health: "optimal", prediction: 91 },
      { label: "Ketones", value: 0.8, unit: "mmol/L", trend: "up", health: "optimal", prediction: 1.2 },
      { label: "Energy", value: 85, unit: "%", trend: "up", health: "optimal", prediction: 89 },
    ],
    insights: [
      "Metabolic switch window: 2:15-4:30 PM",
      "Glucose stability trending upward",
      "Fat oxidation peak at 7:20 AM"
    ]
  },
  {
    id: "environment",
    name: "Environment",
    description: "Air quality, light exposure, temperature, and acoustic environment",
    icon: "🌍",
    color: "from-emerald-400 to-teal-400",
    data: [
      { label: "Air Quality", value: 12, unit: "AQI", trend: "stable", health: "optimal", prediction: 11 },
      { label: "Light", value: 6.7, unit: "k lux", trend: "up", health: "optimal", prediction: 7.2 },
      { label: "Noise", value: 34, unit: "dB", trend: "down", health: "optimal", prediction: 31 },
    ],
    insights: [
      "Optimal circadian light exposure achieved",
      "Air quality excellent for deep work",
      "Acoustic environment promoting focus"
    ]
  }
];

const predictionScenarios = [
  {
    id: "injury-risk",
    title: "Injury Prevention",
    description: "MSK stress analysis with 48h forecasting",
    risk: 12,
    confidence: 94,
    recommendation: "Reduce load by 15% tomorrow, focus on mobility",
    timeframe: "Next 48 hours"
  },
  {
    id: "burnout",
    title: "Burnout Prevention", 
    description: "Stress accumulation and recovery deficit analysis",
    risk: 8,
    confidence: 87,
    recommendation: "Schedule 20min meditation at 2:30 PM",
    timeframe: "Next 72 hours"
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description: "Peak performance window identification",
    risk: 3,
    confidence: 96,
    recommendation: "Schedule high-intensity work 9:15-11:30 AM",
    timeframe: "Tomorrow"
  }
];

// Neural network canvas visualization
const NeuralVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const nodes: Array<{x: number, y: number, vx: number, vy: number, connections: number[]}> = [];
    const nodeCount = 35;
    
    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: []
      });
    }
    
    // Create connections
    nodes.forEach((node, i) => {
      const connectionCount = Math.floor(Math.random() * 4) + 2;
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodeCount);
        if (targetIndex !== i && !node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex);
        }
      }
    });
    
    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      time += 0.01;
      
      // Update node positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;
      });
      
      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach(targetIndex => {
          const target = nodes[targetIndex];
          const distance = Math.sqrt((target.x - node.x) ** 2 + (target.y - node.y) ** 2);
          const maxDistance = 120;
          
          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.4;
            const pulseIntensity = Math.sin(time * 3 + i * 0.5) * 0.3 + 0.7;
            
            ctx.strokeStyle = `rgba(34, 197, 94, ${alpha * pulseIntensity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        });
      });
      
      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 2 + i * 0.3) * 0.4 + 0.6;
        const size = 2 + pulse * 1.5;
        
        ctx.fillStyle = `rgba(34, 197, 94, ${0.8 * pulse})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(34, 197, 94, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

// Biometric data card component
const BiometricCard = ({ data, delay }: { data: BiometricData; delay: number }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const targetValue = useMotionValue(0);
  const spring = useSpring(targetValue, { stiffness: 60, damping: 20 });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      targetValue.set(data.value);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [data.value, delay, targetValue]);
  
  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setCurrentValue(latest);
    });
    return unsubscribe;
  }, [spring]);
  
  const trendIcon = {
    up: "↗",
    down: "↘", 
    stable: "→"
  };
  
  const healthColor = {
    optimal: "text-emerald-400",
    warning: "text-amber-400",
    critical: "text-red-400"
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400" style={{ fontFamily: fontStack }}>
          {data.label}
        </span>
        <span className={`text-sm ${healthColor[data.health]}`}>
          {trendIcon[data.trend]}
        </span>
      </div>
      
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-2xl font-bold text-white" style={{ fontFamily: fontStack }}>
          {currentValue.toFixed(data.unit === "mmol/L" ? 1 : 0)}
        </span>
        <span className="text-sm text-slate-400">{data.unit}</span>
      </div>
      
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-500">Next 4h:</span>
        <span className={`font-medium ${data.prediction > data.value ? 'text-emerald-400' : 'text-amber-400'}`}>
          {data.prediction.toFixed(data.unit === "mmol/L" ? 1 : 0)}{data.unit}
        </span>
      </div>
    </motion.div>
  );
};

// Prediction panel component
const PredictionPanel = ({ scenario, isActive }: { scenario: typeof predictionScenarios[0]; isActive: boolean }) => {
  const riskPercentage = scenario.risk;
  const confidencePercentage = scenario.confidence;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.98,
      }}
      className={`relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl transition-all duration-500 ${
        isActive 
          ? 'border-emerald-400/30 bg-emerald-400/5 shadow-[0_20px_60px_-20px_rgba(34,197,94,0.4)]' 
          : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: fontStack }}>
            {scenario.title}
          </h4>
          <p className="text-sm text-slate-400" style={{ fontFamily: fontStack }}>
            {scenario.description}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-400" style={{ fontFamily: fontStack }}>
            {riskPercentage}%
          </div>
          <div className="text-xs text-slate-500">risk</div>
        </div>
      </div>
      
      {/* Risk visualization */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Risk Level</span>
          <span>{confidencePercentage}% confidence</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${riskPercentage}%` }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-400 rounded-full" />
          <span className="text-sm font-medium text-white" style={{ fontFamily: fontStack }}>
            {scenario.recommendation}
          </span>
        </div>
        <div className="text-xs text-slate-500" style={{ fontFamily: fontStack }}>
          Timeline: {scenario.timeframe}
        </div>
      </div>
    </motion.div>
  );
};

export function SolutionVisualization() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [activePrediction, setActivePrediction] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [0, 1], [2, -2]);
  const rotateY = useTransform(mouseX, [0, 1], [-2, 2]);
  
  useEffect(() => {
    const layerInterval = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % healthLayers.length);
    }, 4000);
    
    const predictionInterval = setInterval(() => {
      setActivePrediction(prev => (prev + 1) % predictionScenarios.length);
    }, 6000);
    
    return () => {
      clearInterval(layerInterval);
      clearInterval(predictionInterval);
    };
  }, []);
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const currentLayer = healthLayers[activeLayer];
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-slate-950 py-32"
      onMouseMove={handleMouseMove}
    >
      {/* Ultra-sophisticated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.04),transparent_50%)]" />
        <NeuralVisualization />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header with ultra-modern typography */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-6 py-2 mb-8 backdrop-blur-xl">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-emerald-300" style={{ fontFamily: fontStack, letterSpacing: '0.1em' }}>
              BIOAI INTELLIGENCE LAYER
            </span>
          </div>
          
          <h2 
            className="text-6xl md:text-7xl font-bold text-white mb-6 leading-[0.9]"
            style={{ fontFamily: fontStack, letterSpacing: '-0.02em' }}
          >
            <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
              Predictive Health
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>
          
          <p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: fontStack }}
          >
            Four-dimensional health analysis that predicts issues 48 hours before they manifest. 
            Neural pathways, cardiovascular patterns, metabolic states, and environmental factors 
            fused into actionable insights.
          </p>
        </motion.div>
        
        {/* Main dashboard interface */}
        <motion.div
          style={{ rotateX, rotateY }}
          className="grid lg:grid-cols-[1fr_400px] gap-12 mb-20"
        >
          {/* Left: Health Layer Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: fontStack }}>
                    Live Health Matrix
                  </h3>
                  <p className="text-slate-400" style={{ fontFamily: fontStack }}>
                    Real-time multimodal inference across {healthLayers.length} health dimensions
                  </p>
                </div>
                
                <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-emerald-200" style={{ fontFamily: fontStack }}>
                    ACTIVE
                  </span>
                </div>
              </div>
              
              {/* Layer selector */}
              <div className="flex flex-wrap gap-2 mb-8">
                {healthLayers.map((layer, index) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(index)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeLayer === index
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    style={{ fontFamily: fontStack }}
                  >
                    {activeLayer === index && (
                      <motion.div
                        layoutId="layer-background"
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${layer.color} opacity-20`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <span className="text-lg">{layer.icon}</span>
                      {layer.name}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Active layer data */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLayer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h4 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: fontStack }}>
                      {currentLayer.name} Analysis
                    </h4>
                    <p className="text-slate-400 mb-6" style={{ fontFamily: fontStack }}>
                      {currentLayer.description}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {currentLayer.data.map((dataPoint, index) => (
                        <BiometricCard 
                          key={dataPoint.label}
                          data={dataPoint}
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-emerald-300 mb-3" style={{ fontFamily: fontStack }}>
                        AI Insights
                      </h5>
                      {currentLayer.insights.map((insight, index) => (
                        <motion.div
                          key={insight}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 text-sm text-slate-300"
                          style={{ fontFamily: fontStack }}
                        >
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                          {insight}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Right: Prediction Engine */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: fontStack }}>
                Predictive Engine
              </h3>
              <p className="text-slate-400 mb-6" style={{ fontFamily: fontStack }}>
                48-hour health forecasting with intervention recommendations
              </p>
              
              <div className="space-y-4">
                {predictionScenarios.map((scenario, index) => (
                  <PredictionPanel
                    key={scenario.id}
                    scenario={scenario}
                    isActive={activePrediction === index}
                  />
                ))}
              </div>
            </div>
            
            {/* Neural network status */}
            <div className="rounded-2xl border border-purple-400/20 bg-purple-400/5 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                <h4 className="text-lg font-semibold text-white" style={{ fontFamily: fontStack }}>
                  Neural Network Status
                </h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-400 mb-1">Model Accuracy</div>
                  <div className="text-2xl font-bold text-purple-300" style={{ fontFamily: fontStack }}>94.7%</div>
                </div>
                <div>
                  <div className="text-slate-400 mb-1">Inference Time</div>
                  <div className="text-2xl font-bold text-purple-300" style={{ fontFamily: fontStack }}>&lt; 200ms</div>
                </div>
                <div>
                  <div className="text-slate-400 mb-1">Data Points</div>
                  <div className="text-2xl font-bold text-purple-300" style={{ fontFamily: fontStack }}>847k</div>
                </div>
                <div>
                  <div className="text-slate-400 mb-1">Active Models</div>
                  <div className="text-2xl font-bold text-purple-300" style={{ fontFamily: fontStack }}>12</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-center rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-2xl"
        >
          <h3 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: fontStack }}>
            Experience the Future of Health Intelligence
          </h3>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto" style={{ fontFamily: fontStack }}>
            Join the beta cohort and get early access to predictive health insights that prevent issues before they happen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ShimmerButton
              className="px-8 py-4 text-lg font-bold text-slate-900"
              shimmerColor="#34d399"
              background="linear-gradient(135deg,#34d399 0%,#22d3ee 50%,#a855f7 100%)"
              borderRadius="16px"
            >
              Join Beta Cohort
            </ShimmerButton>
            
            <button className="group inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white/90 backdrop-blur-sm transition hover:border-emerald-300/50 hover:bg-white/10">
              <span style={{ fontFamily: fontStack }}>Watch Demo</span>
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span style={{ fontFamily: fontStack }}>500+ health professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              <span style={{ fontFamily: fontStack }}>FDA-compliant architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span style={{ fontFamily: fontStack }}>SOC2 & GDPR ready</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}