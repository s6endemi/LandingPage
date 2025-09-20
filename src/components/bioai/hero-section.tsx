"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

// Ultra-modern font stack
const fontStack = "system-ui, -apple-system, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif";

// Real-time biometric data simulation
const LiveBiometrics = () => {
  const [hrv, setHrv] = useState(45);
  const [glucose, setGlucose] = useState(94);
  const [stress, setStress] = useState(24);
  const [prediction, setPrediction] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setHrv(prev => prev + (Math.random() - 0.5) * 2);
      setGlucose(prev => Math.max(80, Math.min(120, prev + (Math.random() - 0.5) * 3)));
      setStress(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 4)));
      setPrediction(prev => Math.max(0, Math.min(50, prev + (Math.random() - 0.5) * 3)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 text-xs">
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3 backdrop-blur-sm">
        <div className="text-emerald-300 font-semibold">HRV</div>
        <div className="text-white text-lg font-bold">{hrv.toFixed(0)}ms</div>
        <div className="text-emerald-400 text-xs">↗ Trending up</div>
      </div>
      <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 backdrop-blur-sm">
        <div className="text-cyan-300 font-semibold">Glucose</div>
        <div className="text-white text-lg font-bold">{glucose.toFixed(0)}</div>
        <div className="text-cyan-400 text-xs">mg/dL optimal</div>
      </div>
      <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 backdrop-blur-sm">
        <div className="text-amber-300 font-semibold">Stress</div>
        <div className="text-white text-lg font-bold">{stress.toFixed(0)}%</div>
        <div className="text-amber-400 text-xs">Low baseline</div>
      </div>
      <div className="rounded-xl border border-purple-400/20 bg-purple-400/5 p-3 backdrop-blur-sm">
        <div className="text-purple-300 font-semibold">Risk</div>
        <div className="text-white text-lg font-bold">{prediction.toFixed(0)}%</div>
        <div className="text-purple-400 text-xs">48h forecast</div>
      </div>
    </div>
  );
};

// Advanced particle system for neural background
const NeuralParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    pulsePhase: number;
    connections: number[];
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 60;
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.3,
      pulsePhase: Math.random() * Math.PI * 2,
      connections: []
    }));

    // Create dynamic connections
    const updateConnections = () => {
      particlesRef.current.forEach((particle, i) => {
        particle.connections = [];
        particlesRef.current.forEach((other, j) => {
          if (i !== j) {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150 && particle.connections.length < 4) {
              particle.connections.push(j);
            }
          }
        });
      });
    };

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      time += 0.016;

      // Update particles
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulsePhase += 0.02;

        // Boundary collision
        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -0.9;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -0.9;
        
        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.offsetWidth, particle.x));
        particle.y = Math.max(0, Math.min(canvas.offsetHeight, particle.y));
      });

      // Update connections every 60 frames
      if (Math.floor(time * 60) % 60 === 0) {
        updateConnections();
      }

      // Draw connections with advanced effects
      particlesRef.current.forEach((particle, i) => {
        particle.connections.forEach(connectionIndex => {
          const connected = particlesRef.current[connectionIndex];
          const dx = connected.x - particle.x;
          const dy = connected.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.4;
            const pulseIntensity = Math.sin(time * 3 + i * 0.7) * 0.3 + 0.7;
            
            // Create gradient for connection
            const gradient = ctx.createLinearGradient(particle.x, particle.y, connected.x, connected.y);
            gradient.addColorStop(0, `rgba(34, 197, 94, ${alpha * pulseIntensity})`);
            gradient.addColorStop(0.5, `rgba(6, 182, 212, ${alpha * pulseIntensity * 0.8})`);
            gradient.addColorStop(1, `rgba(168, 85, 247, ${alpha * pulseIntensity * 0.6})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(connected.x, connected.y);
            ctx.stroke();
          }
        });
      });

      // Draw particles with glow effects
      particlesRef.current.forEach((particle, i) => {
        const pulse = Math.sin(particle.pulsePhase) * 0.5 + 0.5;
        const size = particle.size * (0.8 + pulse * 0.4);
        const alpha = particle.alpha * (0.7 + pulse * 0.3);
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(34, 197, 94, ${alpha})`;
        
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size * 3);
        gradient.addColorStop(0, `rgba(34, 197, 94, ${alpha})`);
        gradient.addColorStop(0.3, `rgba(6, 182, 212, ${alpha * 0.6})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.shadowBlur = 5;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

// Floating health insights
const FloatingInsights = () => {
  const insights = [
    { text: "Injury risk ↓78%", icon: "🎯", color: "emerald", delay: 0 },
    { text: "Sleep quality optimized", icon: "💤", color: "cyan", delay: 1 },
    { text: "Stress managed proactively", icon: "🧘", color: "purple", delay: 2 },
    { text: "Performance peak predicted", icon: "⚡", color: "amber", delay: 3 }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {insights.map((insight, index) => (
        <motion.div
          key={insight.text}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: [20, -10, -20, -40],
            scale: [0.8, 1, 1, 0.9]
          }}
          transition={{ 
            duration: 4,
            delay: insight.delay * 2,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut"
          }}
          className={`absolute flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-xl ${
            insight.color === 'emerald' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' :
            insight.color === 'cyan' ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200' :
            insight.color === 'purple' ? 'border-purple-400/30 bg-purple-400/10 text-purple-200' :
            'border-amber-400/30 bg-amber-400/10 text-amber-200'
          }`}
          style={{
            left: `${20 + index * 15}%`,
            top: `${30 + (index % 2) * 20}%`,
            fontFamily: fontStack
          }}
        >
          <span className="text-lg">{insight.icon}</span>
          {insight.text}
        </motion.div>
      ))}
    </div>
  );
};

// World-class health trend chart with stock-like visualization
const HealthTrendChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [currentValue, setCurrentValue] = useState(87.2);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('up');
  const [change, setChange] = useState(+2.4);
  
  // Generate realistic health trend data
  const generateDataPoints = () => {
    const points: Array<{x: number, y: number, time: string}> = [];
    const now = new Date();
    let baseValue = 85;
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
      // Create realistic health score fluctuations
      const variation = Math.sin(i * 0.3) * 3 + Math.random() * 2 - 1;
      baseValue += variation * 0.3;
      baseValue = Math.max(75, Math.min(95, baseValue)); // Keep in healthy range
      
      points.push({
        x: (23 - i) / 23,
        y: (baseValue - 70) / 25, // Normalize to 0-1
        time: timeStr
      });
    }
    
    return points;
  };

  const [dataPoints] = useState(generateDataPoints);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let animationProgress = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      animationProgress = Math.min(animationProgress + 0.02, 1);
      
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const padding = 20;
      const chartWidth = width - padding * 2;
      const chartHeight = height - padding * 2;

      // Draw grid lines
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Horizontal grid lines
      for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let i = 0; i <= 6; i++) {
        const x = padding + (chartWidth / 6) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
      }

      // Draw area fill
      const visiblePoints = dataPoints.slice(0, Math.floor(dataPoints.length * animationProgress));
      
      if (visiblePoints.length > 1) {
        // Create gradient fill
        const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
        gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
        gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.1)');
        gradient.addColorStop(1, 'rgba(34, 197, 94, 0.0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(padding + visiblePoints[0].x * chartWidth, height - padding);
        
        visiblePoints.forEach((point, index) => {
          const x = padding + point.x * chartWidth;
          const y = padding + (1 - point.y) * chartHeight;
          
          if (index === 0) {
            ctx.lineTo(x, y);
          } else {
            // Smooth curves using quadratic bezier
            const prevPoint = visiblePoints[index - 1];
            const prevX = padding + prevPoint.x * chartWidth;
            const prevY = padding + (1 - prevPoint.y) * chartHeight;
            
            const cpX = (prevX + x) / 2;
            ctx.quadraticCurveTo(cpX, prevY, x, y);
          }
        });
        
        const lastPoint = visiblePoints[visiblePoints.length - 1];
        ctx.lineTo(padding + lastPoint.x * chartWidth, height - padding);
        ctx.closePath();
        ctx.fill();
        
        // Draw line
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        
        visiblePoints.forEach((point, index) => {
          const x = padding + point.x * chartWidth;
          const y = padding + (1 - point.y) * chartHeight;
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            const prevPoint = visiblePoints[index - 1];
            const prevX = padding + prevPoint.x * chartWidth;
            const prevY = padding + (1 - prevPoint.y) * chartHeight;
            
            const cpX = (prevX + x) / 2;
            ctx.quadraticCurveTo(cpX, prevY, x, y);
          }
        });
        ctx.stroke();
        
        // Draw data points
        visiblePoints.forEach((point, index) => {
          const x = padding + point.x * chartWidth;
          const y = padding + (1 - point.y) * chartHeight;
          
          // Glow effect
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(34, 197, 94, 0.6)';
          
          ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
          
          // White center
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      if (animationProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    // Update values periodically
    const valueInterval = setInterval(() => {
      const lastPoint = dataPoints[dataPoints.length - 1];
      const newValue = 70 + lastPoint.y * 25;
      setCurrentValue(newValue);
      
      const previousValue = 70 + dataPoints[dataPoints.length - 2].y * 25;
      const changeValue = newValue - previousValue;
      setChange(changeValue);
      setTrend(changeValue > 0.5 ? 'up' : changeValue < -0.5 ? 'down' : 'stable');
    }, 3000);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(valueInterval);
    };
  }, [dataPoints]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: fontStack }}>
            Health Score
          </h4>
          <p className="text-slate-400 text-sm" style={{ fontFamily: fontStack }}>
            24-hour trend analysis
          </p>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white" style={{ fontFamily: fontStack }}>
              {currentValue.toFixed(1)}
            </span>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              trend === 'up' ? 'text-emerald-400' : 
              trend === 'down' ? 'text-red-400' : 
              'text-amber-400'
            }`}>
              <span>
                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
              </span>
              <span>
                {change > 0 ? '+' : ''}{change.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-1">vs yesterday</div>
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="relative h-32 mb-4">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      {/* Time labels */}
      <div className="flex justify-between text-xs text-slate-500 mb-4">
        <span>24h ago</span>
        <span>12h ago</span>
        <span>6h ago</span>
        <span>Now</span>
      </div>
      
      {/* Key Insights */}
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="text-center p-2 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
          <div className="text-emerald-300 font-semibold">Peak</div>
          <div className="text-white font-bold">6:30 AM</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-cyan-400/10 border border-cyan-400/20">
          <div className="text-cyan-300 font-semibold">Stability</div>
          <div className="text-white font-bold">94%</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-purple-400/10 border border-purple-400/20">
          <div className="text-purple-300 font-semibold">Forecast</div>
          <div className="text-white font-bold">↗ Rising</div>
        </div>
      </div>
      
      {/* AI Insight */}
      <div className="mt-4 p-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-300 text-sm font-semibold">AI Insight</span>
        </div>
        <div className="text-emerald-100 text-sm" style={{ fontFamily: fontStack }}>
          {trend === 'up' ? 
            "Optimal performance window detected. Consider scheduling important tasks in the next 2-3 hours." :
            trend === 'down' ?
            "Natural recovery phase. Focus on rest and hydration for optimal restoration." :
            "Stable baseline achieved. Perfect time for consistent, moderate-intensity activities."
          }
        </div>
      </div>
    </div>
  );
};

export function BioAIHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.4 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [0, 1], [2, -2]);
  const rotateY = useTransform(mouseX, [0, 1], [-2, 2]);
  const glowX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const resetMouse = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-slate-950 text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
    >
      {/* Advanced Neural Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(168,85,247,0.08),transparent_50%)]" />
        <NeuralParticleSystem />
        
        {/* Dynamic mesh gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${glowX} ${glowY}, rgba(34,197,94,0.15), transparent 70%)`
          }}
        />
      </div>

      <div ref={containerRef} className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_600px] gap-16 items-center min-h-screen">
          {/* Left: Content */}
          <motion.div 
            className="space-y-10 z-10"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-4 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-6 py-3 backdrop-blur-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-emerald-300" style={{ fontFamily: fontStack, letterSpacing: '0.1em' }}>
                  BIOAI OS BETA
                </span>
              </div>
              <div className="h-4 w-px bg-emerald-400/30" />
              <span className="text-sm font-medium text-emerald-200/80" style={{ fontFamily: fontStack }}>
                Active Learning
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 1 }}
              className="space-y-6"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.85] tracking-tight" style={{ fontFamily: fontStack }}>
                <span className="block bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                  Health
                </span>
                <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
                  Precognition
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-medium text-slate-300 mt-4">
                  before problems emerge
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl leading-relaxed text-slate-300 max-w-2xl"
              style={{ fontFamily: fontStack }}
            >
              Neural networks analyze movement patterns, facial biomarkers, voice cognition, and environmental signals to predict health issues 48 hours before they manifest.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              {['Movement CV', 'Facial Biomarkers', 'Voice Cognition', 'Environment AI'].map((feature, index) => (
                <div 
                  key={feature}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-emerald-400' :
                    index === 1 ? 'bg-cyan-400' :
                    index === 2 ? 'bg-purple-400' :
                    'bg-amber-400'
                  }`} />
                  <span className="text-sm font-medium text-white" style={{ fontFamily: fontStack }}>
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <ShimmerButton
                className="px-10 py-5 text-xl font-bold text-slate-900"
                shimmerColor="#34d399"
                background="linear-gradient(135deg,#34d399 0%,#22d3ee 30%,#a855f7 70%,#f59e0b 100%)"
                borderRadius="16px"
              >
                Request Beta Access
              </ShimmerButton>
              
              <button className="group inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-8 py-5 text-xl font-semibold text-white/90 backdrop-blur-sm transition-all hover:border-emerald-300/50 hover:bg-white/10 hover:scale-105">
                <span style={{ fontFamily: fontStack }}>Live Demo</span>
                <svg className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6-4h8m-5-1V3m0 18v-2" />
                </svg>
              </button>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-6 text-sm text-slate-400 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span style={{ fontFamily: fontStack }}>500+ longevity professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span style={{ fontFamily: fontStack }}>FDA-ready architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span style={{ fontFamily: fontStack }}>SOC2 & GDPR compliant</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Health Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ rotateX, rotateY }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_40px_120px_-40px_rgba(34,197,94,0.3)]">
              {/* Interactive glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-60"
                style={{
                  background: `radial-gradient(400px circle at ${glowX} ${glowY}, rgba(34,197,94,0.15), transparent 70%)`
                }}
              />

              {/* Floating insights */}
              <FloatingInsights />

              <div className="relative space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: fontStack }}>
                      Predictive Health Twin
                    </h3>
                    <p className="text-slate-400" style={{ fontFamily: fontStack }}>
                      Live multimodal analysis
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-emerald-200" style={{ fontFamily: fontStack }}>
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Live Biometrics */}
                <LiveBiometrics />

                {/* Health Trend Chart */}
                <HealthTrendChart />

                {/* Neural Network Status */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: fontStack }}>94.7%</div>
                    <div className="text-slate-400">Model Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: fontStack }}>&lt;200ms</div>
                    <div className="text-slate-400">Inference Time</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}