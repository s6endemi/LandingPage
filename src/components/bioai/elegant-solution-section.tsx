"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

// Ultra-modern font stack
const fontStack = "system-ui, -apple-system, 'SF Pro Display', 'Inter', sans-serif";

// Elegant 3D Health Visualization
const HealthVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [activeMetric, setActiveMetric] = useState(0);
  
  const metrics = [
    { name: "Neural Efficiency", value: 94.7, color: "#a855f7", unit: "%" },
    { name: "Cardiovascular Health", value: 87.2, color: "#22d3ee", unit: "%" },
    { name: "Metabolic Optimization", value: 91.5, color: "#f59e0b", unit: "%" },
    { name: "Recovery Quality", value: 89.3, color: "#22c55e", unit: "%" }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let time = 0;
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) * 0.7;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      time += 0.01;

      // Draw elegant health rings
      metrics.forEach((metric, index) => {
        const angle = (index / metrics.length) * Math.PI * 2;
        const ringRadius = radius - index * 15;
        const progress = metric.value / 100;
        
        // Background ring
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Animated progress ring
        const gradient = ctx.createLinearGradient(
          centerX - ringRadius, centerY - ringRadius,
          centerX + ringRadius, centerY + ringRadius
        );
        gradient.addColorStop(0, metric.color + '40');
        gradient.addColorStop(0.5, metric.color + 'FF');
        gradient.addColorStop(1, metric.color + '40');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2);
        ctx.stroke();
        
        // Pulsing data points
        const pulseRadius = 6 + Math.sin(time * 3 + index) * 2;
        const pointX = centerX + Math.cos(angle - Math.PI / 2) * (ringRadius + 25);
        const pointY = centerY + Math.sin(angle - Math.PI / 2) * (ringRadius + 25);
        
        ctx.fillStyle = metric.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = metric.color;
        ctx.beginPath();
        ctx.arc(pointX, pointY, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // Central AI core
      const coreRadius = 20 + Math.sin(time * 2) * 5;
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      coreGradient.addColorStop(0, 'rgba(34, 197, 94, 0.8)');
      coreGradient.addColorStop(0.7, 'rgba(34, 197, 94, 0.3)');
      coreGradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cycle through metrics
    const metricInterval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % metrics.length);
    }, 3000);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(metricInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-96">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Floating metric display */}
      <motion.div
        key={activeMetric}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-2" style={{ fontFamily: fontStack }}>
            {metrics[activeMetric].value}{metrics[activeMetric].unit}
          </div>
          <div className="text-lg text-slate-300" style={{ fontFamily: fontStack }}>
            {metrics[activeMetric].name}
          </div>
          <div className="text-sm text-slate-400 mt-1">Real-time optimization</div>
        </div>
      </motion.div>
    </div>
  );
};

// Elegant feature cards
const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/30 hover:bg-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl`}>
              {feature.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white" style={{ fontFamily: fontStack }}>
                {feature.title}
              </h3>
              <div className="text-sm text-emerald-400 font-medium">{feature.metric}</div>
            </div>
          </div>
          
          <p className="text-slate-300 text-sm leading-relaxed" style={{ fontFamily: fontStack }}>
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export function ElegantSolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const features = [
    {
      icon: "🧠",
      title: "Predictive Intelligence",
      metric: "48h accuracy",
      description: "AI models analyze patterns to predict health issues before they manifest, enabling proactive interventions.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "⚡",
      title: "Real-time Optimization", 
      metric: "<200ms response",
      description: "Continuous analysis of biometric data provides instant recommendations for performance and recovery.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: "🎯",
      title: "Precision Coaching",
      metric: "94% effectiveness",
      description: "Personalized interventions based on your unique health signature and environmental context.",
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-950 py-32"
    >
      {/* Elegant background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.08),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 mb-8 backdrop-blur-xl">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-emerald-300" style={{ fontFamily: fontStack, letterSpacing: '0.1em' }}>
              HOW IT WORKS
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: fontStack }}>
            <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              Your Health
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
              Optimized by AI
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: fontStack }}>
            Four interconnected systems working together to create your personalized health optimization engine.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-purple-400/5 rounded-3xl" />
              
              <div className="relative">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: fontStack }}>
                    Live Health Matrix
                  </h3>
                  <p className="text-slate-400" style={{ fontFamily: fontStack }}>
                    Real-time analysis across all health dimensions
                  </p>
                </div>
                
                <HealthVisualization />
              </div>
            </div>
          </motion.div>

          {/* Right: Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-center"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-2xl">
            <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: fontStack }}>
              Ready to optimize your health?
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto" style={{ fontFamily: fontStack }}>
              Join thousands who've transformed their health with predictive AI intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ShimmerButton
                className="px-8 py-4 text-lg font-bold text-slate-900"
                shimmerColor="#34d399"
                background="linear-gradient(135deg,#34d399 0%,#22d3ee 50%,#a855f7 100%)"
                borderRadius="16px"
              >
                Start Your Health Journey
              </ShimmerButton>
              
              <button className="group inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white/90 backdrop-blur-sm transition hover:border-emerald-300/50 hover:bg-white/10">
                <span style={{ fontFamily: fontStack }}>Learn More</span>
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span style={{ fontFamily: fontStack }}>No setup required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span style={{ fontFamily: fontStack }}>Results in 48 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span style={{ fontFamily: fontStack }}>Expert support included</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}