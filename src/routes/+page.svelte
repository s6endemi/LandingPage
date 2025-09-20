<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import {
    Rocket,
    Brain,
    Building,
    Terminal,
    Cpu,
    Shield,
    TrendingUp,
    ChevronDown,
    Network,
    Vote,
    Wallet,
    Link,
  } from "lucide-svelte";
  import CircuitBackground from "$lib/assets/circuit-background.svg?raw";

  type SectionId = "hero" | "ventures" | "intel" | "architect" | "tokenomics";

  // Stats für Live-Updates
  let stats = {
    activeProjects: 6,
    totalInvestment: 570,
    successRate: 94,
    marketSentiment: 92,
    networkNodes: 1337,
    transactionsPerSecond: 9842,
  };

  // Enhanced Terminal Simulation
  let terminalLines: { command: string; output?: string; chart?: any; status?: string }[] = [
    { command: "Initializing quantum neural network...", status: "success" },
    { command: "Connecting to blockchain nodes...", output: "✓ 1,337 nodes connected", status: "success" },
    { command: "Loading AI trading models...", output: "✓ 12 models active", status: "success" },
    { command: "Analyzing market sentiment...", output: "📈 Bullish: 76.3%", status: "success" },
    { command: "Web3 protocols initialized", status: "success" },
  ];
  
  let currentMetrics = {
    btcPrice: 67420,
    ethPrice: 3845,
    vigPrice: 0.0234,
    marketCap: 2.1,
    volume24h: 45.7,
    tvl: 234.5,
    apy: 15.7,
    networkHash: "847.2 EH/s",
    gasPrice: 23,
    blockHeight: 19847562
  };
  
  let chartData = [
    { time: "00:00", price: 0.0220, open: 0.0218, high: 0.0225, low: 0.0215, close: 0.0220, volume: 1200 },
    { time: "02:00", price: 0.0223, open: 0.0220, high: 0.0228, low: 0.0219, close: 0.0223, volume: 1450 },
    { time: "04:00", price: 0.0225, open: 0.0223, high: 0.0230, low: 0.0221, close: 0.0225, volume: 1850 },
    { time: "06:00", price: 0.0228, open: 0.0225, high: 0.0232, low: 0.0224, close: 0.0228, volume: 1650 },
    { time: "08:00", price: 0.0231, open: 0.0228, high: 0.0235, low: 0.0227, close: 0.0231, volume: 2100 },
    { time: "10:00", price: 0.0235, open: 0.0231, high: 0.0238, low: 0.0229, close: 0.0235, volume: 1900 },
    { time: "12:00", price: 0.0238, open: 0.0235, high: 0.0242, low: 0.0233, close: 0.0238, volume: 1950 },
    { time: "14:00", price: 0.0236, open: 0.0238, high: 0.0240, low: 0.0234, close: 0.0236, volume: 2200 },
    { time: "16:00", price: 0.0234, open: 0.0236, high: 0.0239, low: 0.0232, close: 0.0234, volume: 2300 },
    { time: "18:00", price: 0.0237, open: 0.0234, high: 0.0241, low: 0.0233, close: 0.0237, volume: 2450 },
    { time: "20:00", price: 0.0241, open: 0.0237, high: 0.0244, low: 0.0235, close: 0.0241, volume: 2650 },
    { time: "22:00", price: 0.0238, open: 0.0241, high: 0.0243, low: 0.0236, close: 0.0238, volume: 2200 },
    { time: "24:00", price: 0.0234, open: 0.0238, high: 0.0240, low: 0.0232, close: 0.0234, volume: 2100 }
  ];
  
  let selectedDataPoint = null;
  let chartHoverIndex = -1;

  const advancedCommands = [
    // AI & Analytics
    { command: "vigor-ai predict --model neural-v3 --timeframe 24h", output: "📈 Price target: $0.0267 (+14.2%)", chart: "prediction" },
    { command: "sentiment-analyzer --sources twitter,reddit,telegram", output: "😎 Bullish: 78.4% | Neutral: 15.2% | Bearish: 6.4%", status: "success" },
    { command: "whale-tracker scan --min-amount 100k --token VIGOR", output: "🐋 3 large transactions detected in last 1h", status: "warning" },
    
    // DeFi Operations
    { command: "yield-optimizer calculate --pool VIGOR/USDC --amount 10000", output: "💰 Estimated APY: 23.7% | Daily: $6.49", status: "success" },
    { command: "liquidity-analyzer --pair VIGOR/ETH --depth 50", output: "💧 Liquidity: $2.3M | Slippage <0.1% for $10K", chart: "liquidity" },
    { command: "arbitrage-scanner --min-profit 0.5% --max-gas 50", output: "⚡ 2 opportunities found | Max profit: 1.3%", status: "success" },
    
    // Blockchain Analytics  
    { command: "network-analyzer --chain ethereum --metrics all", output: "⛓️ TPS: 12.3 | Gas: 23 gwei | Congestion: Low", status: "success" },
    { command: "validator-monitor --network vigor-pos --uptime 24h", output: "✅ 99.97% uptime | 1,247 validators active", status: "success" },
    { command: "cross-chain-bridge status --from ethereum --to polygon", output: "🌉 Bridge healthy | Avg time: 12min | Fee: $2.30", status: "success" },
    
    // Security & Compliance
    { command: "smart-contract-audit --contract 0x742d...8f2a --depth full", output: "🛡️ Security score: 98/100 | 0 critical issues", status: "success" },
    { command: "rugpull-detector scan --token-address 0x742d...8f2a", output: "✅ Safe | Liquidity locked | Verified contract", status: "success" },
    { command: "compliance-check --jurisdiction US,EU --token VIGOR", output: "📋 Compliant in 47/50 jurisdictions", status: "success" },
    
    // Advanced Trading
    { command: "mev-protection enable --strategy sandwich-resist", output: "🛡️ MEV protection active | Savings: $127.43", status: "success" },
    { command: "flashloan-optimizer --amount 100000 --token USDC", output: "⚡ Best route: Aave → Compound | Profit: $234", status: "success" },
    { command: "options-pricing --strike 0.025 --expiry 30d --vol 0.8", output: "📊 Call: $0.0023 | Put: $0.0019 | IV: 82%", chart: "options" }
  ];

  function addTerminalLine() {
    const commandData = advancedCommands[Math.floor(Math.random() * advancedCommands.length)];
    
    // Update metrics randomly
    currentMetrics = {
      ...currentMetrics,
      vigPrice: +(currentMetrics.vigPrice + (Math.random() - 0.5) * 0.002).toFixed(4),
      volume24h: +(currentMetrics.volume24h + (Math.random() - 0.5) * 5).toFixed(1),
      apy: +(currentMetrics.apy + (Math.random() - 0.5) * 2).toFixed(1),
      gasPrice: Math.max(15, currentMetrics.gasPrice + Math.floor((Math.random() - 0.5) * 10))
    };
    
    terminalLines = [...terminalLines.slice(-4), commandData];
  }

  let sections: Record<SectionId, HTMLElement | null> = {
    hero: null,
    ventures: null,
    intel: null,
    architect: null,
    tokenomics: null,
  };
  let copiedAddress: string | null = null;
  let visibility: Record<SectionId, boolean> = {
    hero: false,
    ventures: false,
    intel: false,
    architect: false,
    tokenomics: false,
  };

  // Scrolling state
  let scrollY: number;
  let windowHeight: number;

  // Parallax effect
  $: parallaxOffset = scrollY * 0.5;

  let animationFrame: number;
  const animateStats = () => {
    stats = {
      ...stats,
      activeProjects: stats.activeProjects + (Math.random() > 0.5 ? 1 : 0),
      transactionsPerSecond: 9000 + Math.floor(Math.random() * 2000),
    };
    animationFrame = requestAnimationFrame(animateStats);
  };

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute("data-section") as SectionId;
          if (sectionId) {
            visibility[sectionId] = entry.isIntersecting;
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.entries(sections).forEach(([key, element]) => {
      if (element) {
        observer.observe(element);
      }
    });

    animateStats();

    const terminalInterval = setInterval(addTerminalLine, 1500);

    return () => {
      observer.disconnect();
      clearInterval(terminalInterval);
      cancelAnimationFrame(animationFrame);
    };
  });

  const sectionData = [
    {
      id: "ventures" as const,
      title: "Ventures",
      description:
        "Revolutionizing DeFi through strategic investments and ecosystem development. Our protocol enables seamless integration of traditional finance with cutting-edge blockchain technology.",
      icon: Rocket,
      stats: [
        { label: "Active DApps", value: () => stats.activeProjects, prefix: "", suffix: "" },
        { label: "TVL", value: () => stats.totalInvestment, prefix: "$", suffix: "K" },
        { label: "Protocol Growth", value: () => stats.successRate, prefix: "", suffix: "%" },
      ],
      features: [
        { icon: TrendingUp, label: "Yield Optimization" },
        { icon: Shield, label: "Risk Management" },
        { icon: Cpu, label: "Smart Contracts" },
      ],
    },
    {
      id: "intel" as const,
      title: "Intel",
      description:
        "Advanced AI-driven analytics for real-time market insights. Our neural networks process millions of data points to predict market movements and optimize trading strategies.",
      icon: Brain,
      stats: [
        { label: "AI Confidence", value: () => stats.marketSentiment, prefix: "", suffix: "%" },
        { label: "Network Size", value: () => stats.networkNodes, prefix: "", suffix: "+" },
        { label: "Predictions/s", value: () => stats.transactionsPerSecond, prefix: "", suffix: "" },
      ],
      features: [
        { icon: Terminal, label: "Predictive Analytics" },
        { icon: Shield, label: "Neural Networks" },
        { icon: Cpu, label: "Machine Learning" },
      ],
    },
    {
      id: "architect" as const,
      title: "Architect",
      description:
        "Built on next-generation Layer 2 technology, our protocol delivers unmatched scalability and security. Zero-knowledge proofs ensure privacy while maintaining full transparency.",
      icon: Building,
      stats: [
        { label: "Network Uptime", value: () => 99.99, prefix: "", suffix: "%" },
        { label: "Scalability", value: () => "Unlimited", prefix: "", suffix: "" },
        { label: "Security Score", value: () => 98, prefix: "", suffix: "/100" },
      ],
      features: [
        { icon: Shield, label: "Zero-Knowledge Proofs" },
        { icon: Cpu, label: "Layer 2 Scaling" },
        { icon: Terminal, label: "Cross-Chain Bridge" },
      ],
    },
  ];

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      history.pushState({}, "", `#${sectionId}`); // Update URL hash
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<svelte:window bind:scrollY bind:innerHeight={windowHeight} />

<!-- Fixed Network Background -->
<div class="bg-black fixed inset-0 -z-10 overflow-hidden">
  <div
    class="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen"
    style="transform: translateY({-parallaxOffset}px)"
  >
    {@html CircuitBackground}
  </div>
</div>
<div class="from-black to-black font-space-grotesk text-white min-h-screen bg-gradient-to-b via-[#0a0a1f]">
  <!-- Hero Section -->
  <section
    bind:this={sections.hero}
    data-section="hero"
    class="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
  >
    <!-- Multi-layer Animated Background -->
    <div class="absolute inset-0">
      <!-- Primary gradient -->
      <div class="bg-gradient-radial absolute inset-0 from-[#0052ff]/15 via-[#001a40]/8 to-transparent opacity-60 animate-pulse-slow"></div>
      <!-- Secondary gradient -->
      <div class="bg-gradient-radial absolute inset-0 from-[#00c7ff]/8 via-transparent to-[#0052ff]/5 opacity-40 animate-float"></div>
      <!-- Floating orbs -->
      <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-[#0052ff]/10 rounded-full blur-2xl animate-float-delayed"></div>
      <div class="absolute bottom-1/3 right-1/4 w-24 h-24 bg-[#00c7ff]/8 rounded-full blur-xl animate-float-reverse"></div>
      <div class="absolute top-1/2 right-1/3 w-16 h-16 bg-[#73e4ff]/6 rounded-full blur-lg animate-float"></div>
    </div>

    <!-- Hero Content -->
    <div
      class="relative z-10 max-w-5xl text-center"
      class:opacity-100={visibility.hero}
      class:translate-y-0={visibility.hero}
      class:scale-100={visibility.hero}
      class:opacity-0={!visibility.hero}
      class:translate-y-16={!visibility.hero}
      class:scale-95={!visibility.hero}
      style="transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1)"
    >
      <h2
        class="neon-glow-enhanced mb-8 bg-gradient-to-r from-[#0052ff] via-[#00c7ff] to-[#73e4ff] bg-clip-text text-4xl
               font-extralight tracking-tight text-transparent md:text-6xl lg:text-7xl leading-tight
               animate-gradient-x bg-size-300 hover:scale-105 transition-transform duration-700"
      >
        Building the Future of Web3
      </h2>
      <p class="mb-12 text-xl font-light leading-relaxed text-gray-300 md:text-2xl lg:text-3xl max-w-4xl mx-auto
               opacity-90 hover:opacity-100 transition-all duration-500">
        Your strategic partner in the digital revolution, merging artificial intelligence with blockchain technology to
        create the next generation of decentralized finance.
      </p>
      <div class="flex flex-col justify-center space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0 mb-16">
        <button
          on:click={() => scrollToSection("ventures")}
          class="premium-btn-enhanced group relative overflow-hidden rounded-full border border-[#0a1a2f] bg-gradient-to-br
                 from-[#00132f] via-[#00193f] to-[#002050] px-10 py-4 font-light transition-all duration-500
                 hover:border-[#0044ff]/40 hover:via-[#002860] hover:to-[#001f4f] hover:scale-105
                 active:scale-95 shadow-2xl hover:shadow-[0_0_40px_rgba(0,199,255,0.3)]"
        >
          <div
            class="absolute inset-0 bg-[radial-gradient(at_center_center,_rgba(0,199,255,0.15)_0%,_transparent_70%)]
                   opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#00c7ff33] to-[#0052ff33] opacity-0
                   transition-opacity duration-300 group-hover:opacity-20"
          ></div>
          <span class="relative flex items-center space-x-2">
            <span>Explore Ecosystem</span>
            <ChevronDown class="h-4 w-4 rotate-90 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </button>

        <button
          on:click={() => scrollToSection("tokenomics")}
          class="glass-btn-enhanced group relative overflow-hidden rounded-full border border-[#3a3a5a]/30
                 bg-[#0a0a1a]/50 px-10 py-4 font-light backdrop-blur-sm transition-all duration-500
                 hover:border-[#00c7ff]/40 hover:bg-[#151530]/30 hover:scale-105
                 active:scale-95 shadow-xl hover:shadow-[0_0_30px_rgba(0,199,255,0.2)]"
        >
          <div
            class="absolute inset-0 -z-10 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
                   from-[#00c7ff10] via-transparent to-transparent opacity-0 transition-opacity
                   duration-300 group-hover:opacity-100"
          ></div>
          <span class="relative flex items-center space-x-2">
            <span>Discover $VIGOR</span>
            <TrendingUp class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </button>
      </div>

      <!-- Ultra-Enhanced Terminal with Data Visualization -->
      <div class="bg-black/40 mt-16 overflow-hidden rounded-2xl border border-[#0052ff]/40 backdrop-blur-sm
                  shadow-2xl hover:shadow-[0_0_60px_rgba(0,82,255,0.3)] transition-all duration-700
                  hover:scale-[1.02] hover:border-[#00c7ff]/50 group">
        
        <!-- Terminal Header with Live Stats -->
        <div class="flex items-center justify-between border-b border-[#0052ff]/30 px-6 py-3 bg-gradient-to-r from-black/60 to-[#001122]/40">
          <div class="flex items-center space-x-3">
            <div class="h-3 w-3 rounded-full bg-red-500/30 animate-pulse"></div>
            <div class="h-3 w-3 rounded-full bg-yellow-500/30 animate-pulse" style="animation-delay: 0.5s"></div>
            <div class="h-3 w-3 rounded-full bg-green-500/40 animate-pulse" style="animation-delay: 1s"></div>
            <span class="text-xs text-[#00c7ff]/80 font-mono ml-4">vigor-terminal-v3.7.2</span>
          </div>
          <div class="flex items-center space-x-4 text-xs">
            <div class="text-[#00c7ff]/60">CPU: <span class="text-[#00c7ff]">23%</span></div>
            <div class="text-[#00c7ff]/60">RAM: <span class="text-[#00c7ff]">1.2GB</span></div>
            <div class="text-[#00c7ff]/60">NET: <span class="text-green-400">847 KB/s</span></div>
          </div>
        </div>
        
        <!-- Main Terminal Content Grid -->
        <div class="grid lg:grid-cols-3 gap-6 p-6">
          
          <!-- Left: Command Output -->
          <div class="lg:col-span-2 space-y-2">
            <div class="text-xs text-[#00c7ff]/60 mb-3 font-mono">VIGOR AI Terminal - Real-time Crypto Analytics</div>
            {#each terminalLines as line}
              <div class="terminal-line-enhanced group/line" in:fade={{ duration: 200 }}>
                <div class="flex items-start space-x-2">
                  <span class="text-[#0052ff] font-mono text-sm mt-0.5">❯</span>
                  <div class="flex-1">
                    <div class="text-[#00c7ff] font-mono text-sm mb-1 group-hover/line:text-[#00e5ff] transition-colors">
                      {line.command}
                    </div>
                    {#if line.output}
                      <div class="text-green-400/90 font-mono text-xs ml-4 flex items-center space-x-2">
                        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span>{line.output}</span>
                      </div>
                    {/if}
                    {#if line.status === 'success'}
                      <div class="text-green-400/70 font-mono text-xs ml-4 mt-1">✓ Completed successfully</div>
                    {:else if line.status === 'warning'}
                      <div class="text-yellow-400/70 font-mono text-xs ml-4 mt-1">⚠ Alert triggered</div>
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>
          
          <!-- Right: Live Data Panel -->
          <div class="space-y-4">
            <!-- Market Metrics -->
            <div class="bg-gradient-to-br from-[#0052ff]/10 to-[#00c7ff]/5 rounded-lg p-4 border border-[#0052ff]/20">
              <div class="text-[#00c7ff] text-sm font-semibold mb-3 flex items-center">
                <div class="w-2 h-2 bg-[#00c7ff] rounded-full mr-2 animate-pulse"></div>
                LIVE METRICS
              </div>
              <div class="space-y-2 text-xs font-mono">
                <div class="flex justify-between">
                  <span class="text-gray-400">$VIGOR</span>
                  <span class="text-[#00c7ff]">${currentMetrics.vigPrice}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">24h Vol</span>
                  <span class="text-green-400">${currentMetrics.volume24h}M</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">APY</span>
                  <span class="text-yellow-400">{currentMetrics.apy}%</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">Gas</span>
                  <span class="text-orange-400">{currentMetrics.gasPrice} gwei</span>
                </div>
              </div>
            </div>
            
            <!-- Professional Stock Chart -->
            <div class="bg-gradient-to-br from-[#001122]/80 to-[#000]/60 rounded-xl p-5 border border-[#0052ff]/30 chart-container group">
              <div class="flex items-center justify-between mb-4">
                <div class="text-[#00c7ff] text-sm font-semibold">$VIGOR/USD (24H)</div>
                <div class="flex items-center space-x-2 text-xs">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="text-green-400">+3.2%</span>
                </div>
              </div>
              
              <!-- Chart Area -->
              <div class="h-32 relative overflow-hidden rounded-lg bg-black/20 border border-[#0052ff]/10">
                <!-- Background Grid -->
                <svg class="absolute inset-0 w-full h-full opacity-30">
                  <defs>
                    <pattern id="grid" width="20" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 16" fill="none" stroke="rgba(0, 199, 255, 0.1)" stroke-width="0.5"/>
                    </pattern>
                    <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:rgba(0, 199, 255, 0.3);stop-opacity:1" />
                      <stop offset="100%" style="stop-color:rgba(0, 82, 255, 0.1);stop-opacity:0" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/> 
                      </feMerge>
                    </filter>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                
                <!-- Candlestick Chart -->
                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 260 128">
                  {#each chartData as candle, i}
                    {@const x = 10 + (i * 20)}
                    {@const maxPrice = Math.max(...chartData.map(d => d.high))}
                    {@const minPrice = Math.min(...chartData.map(d => d.low))}
                    {@const priceRange = maxPrice - minPrice}
                    {@const yHigh = 118 - ((candle.high - minPrice) / priceRange) * 108}
                    {@const yLow = 118 - ((candle.low - minPrice) / priceRange) * 108}
                    {@const yOpen = 118 - ((candle.open - minPrice) / priceRange) * 108}
                    {@const yClose = 118 - ((candle.close - minPrice) / priceRange) * 108}
                    {@const isGreen = candle.close >= candle.open}
                    
                    <!-- Candlestick Shadow (High-Low line) -->
                    <line 
                      x1={x} y1={yHigh} x2={x} y2={yLow}
                      stroke={isGreen ? '#22c55e' : '#ef4444'} 
                      stroke-width="1"
                      opacity="0.8"
                      class="animate-draw-line"
                      style="animation-delay: {i * 0.1}s"
                    />
                    
                    <!-- Candlestick Body -->
                    <rect 
                      x={x - 3} 
                      y={Math.min(yOpen, yClose)} 
                      width="6" 
                      height={Math.abs(yClose - yOpen) || 1}
                      fill={isGreen ? '#22c55e' : '#ef4444'}
                      opacity="0.9"
                      class="candle-body hover:opacity-100 cursor-pointer transition-all duration-200"
                      style="animation: candleDraw 0.6s ease-out {i * 0.1}s both"
                      on:mouseenter={() => chartHoverIndex = i}
                      on:mouseleave={() => chartHoverIndex = -1}
                    />
                    
                    <!-- Volume bars at bottom -->
                    <rect 
                      x={x - 2} 
                      y={118 - (candle.volume / 3000) * 15} 
                      width="4" 
                      height={(candle.volume / 3000) * 15}
                      fill="rgba(0, 199, 255, 0.3)"
                      class="volume-bar"
                      style="animation: volumeRise 0.8s ease-out {i * 0.1}s both"
                    />
                  {/each}
                  
                  <!-- Price Line Overlay -->
                  <path 
                    d="M {chartData.map((candle, i) => {
                      const x = 10 + (i * 20);
                      const maxPrice = Math.max(...chartData.map(d => d.high));
                      const minPrice = Math.min(...chartData.map(d => d.low));
                      const priceRange = maxPrice - minPrice;
                      const y = 118 - ((candle.close - minPrice) / priceRange) * 108;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')}"
                    stroke="url(#priceGradient)"
                    stroke-width="2"
                    fill="none"
                    filter="url(#glow)"
                    class="price-line"
                    style="animation: drawLine 2s ease-out 0.5s both"
                  />
                  
                  <!-- Area under the line -->
                  <path 
                    d="M {chartData.map((candle, i) => {
                      const x = 10 + (i * 20);
                      const maxPrice = Math.max(...chartData.map(d => d.high));
                      const minPrice = Math.min(...chartData.map(d => d.low));
                      const priceRange = maxPrice - minPrice;
                      const y = 118 - ((candle.close - minPrice) / priceRange) * 108;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')} L 250 118 L 10 118 Z"
                    fill="url(#priceGradient)"
                    opacity="0.2"
                    class="price-area"
                    style="animation: fillArea 2.5s ease-out 1s both"
                  />
                </svg>
                
                <!-- Hover Tooltip -->
                {#if chartHoverIndex >= 0}
                  {@const candle = chartData[chartHoverIndex]}
                  <div 
                    class="absolute bg-black/90 border border-[#00c7ff]/50 rounded-lg p-3 text-xs font-mono z-10 pointer-events-none backdrop-blur-sm"
                    style="left: {10 + chartHoverIndex * 20}px; top: 10px; transform: translateX(-50%)"
                  >
                    <div class="text-[#00c7ff] font-semibold mb-1">{candle.time}</div>
                    <div class="space-y-1">
                      <div class="flex justify-between space-x-4">
                        <span class="text-gray-400">Open:</span>
                        <span class="text-white">${candle.open}</span>
                      </div>
                      <div class="flex justify-between space-x-4">
                        <span class="text-gray-400">High:</span>
                        <span class="text-green-400">${candle.high}</span>
                      </div>
                      <div class="flex justify-between space-x-4">
                        <span class="text-gray-400">Low:</span>
                        <span class="text-red-400">${candle.low}</span>
                      </div>
                      <div class="flex justify-between space-x-4">
                        <span class="text-gray-400">Close:</span>
                        <span class="text-[#00c7ff]">${candle.close}</span>
                      </div>
                      <div class="flex justify-between space-x-4">
                        <span class="text-gray-400">Vol:</span>
                        <span class="text-yellow-400">{candle.volume}</span>
                      </div>
                    </div>
                  </div>
                {/if}
                
                <!-- Price Labels -->
                <div class="absolute right-2 top-2 text-xs font-mono text-[#00c7ff]/80">
                  ${Math.max(...chartData.map(d => d.high)).toFixed(4)}
                </div>
                <div class="absolute right-2 bottom-2 text-xs font-mono text-[#00c7ff]/80">
                  ${Math.min(...chartData.map(d => d.low)).toFixed(4)}
                </div>
              </div>
              
              <!-- Chart Controls -->
              <div class="flex items-center justify-between mt-3 text-xs">
                <div class="flex space-x-3">
                  <button class="text-[#00c7ff] hover:text-white transition-colors px-2 py-1 rounded border border-[#00c7ff]/20 hover:border-[#00c7ff]/40">1H</button>
                  <button class="text-[#00c7ff]/60 hover:text-[#00c7ff] transition-colors px-2 py-1 rounded">4H</button>
                  <button class="text-[#00c7ff]/60 hover:text-[#00c7ff] transition-colors px-2 py-1 rounded">1D</button>
                </div>
                <div class="text-gray-500">Volume: <span class="text-[#00c7ff]">{chartData.reduce((sum, d) => sum + d.volume, 0).toLocaleString()}</span></div>
              </div>
            </div>
            
          </div>
        </div>
        
        <!-- Terminal Footer with Typing Indicator -->
        <div class="border-t border-[#0052ff]/20 px-6 py-3 bg-black/30">
          <div class="flex items-center space-x-2 text-xs font-mono">
            <span class="text-[#0052ff]">❯</span>
            <span class="text-[#00c7ff]/60">vigor-ai --mode advanced --realtime</span>
            <div class="flex space-x-1 ml-2">
              <div class="w-1 h-3 bg-[#00c7ff] animate-pulse"></div>
              <div class="w-1 h-3 bg-[#00c7ff]/60 animate-pulse" style="animation-delay: 0.2s"></div>
              <div class="w-1 h-3 bg-[#00c7ff]/30 animate-pulse" style="animation-delay: 0.4s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Scroll Indicator -->
    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce-slow">
      <div class="relative">
        <div class="absolute inset-0 bg-[#00c7ff]/20 rounded-full blur-lg animate-pulse"></div>
        <ChevronDown class="h-8 w-8 text-[#00c7ff]/80 relative z-10 hover:text-[#00c7ff] transition-colors" />
      </div>
      <div class="text-xs text-[#00c7ff]/60 mt-2 animate-fade-in-out">Scroll to explore</div>
    </div>
  </section>

  <!-- Main Sections -->
  {#each sectionData as { id, title, description, icon: Icon, stats, features }, i}
    <section bind:this={sections[id]} data-section={id} class="relative min-h-screen py-24" {id}>
      <!-- Decorative Side Elements -->
      {#if id === "ventures"}
        <div class="absolute left-20 top-1/3 hidden font-light text-[#00c7ff] opacity-60 lg:block">
          <div class="rotate-[-90deg] whitespace-nowrap text-sm tracking-wider">POWERED BY AI</div>
          <div class="mt-40 h-40 w-[1px] bg-gradient-to-b from-[#0052ff] to-transparent"></div>
        </div>

        <div class="absolute bottom-1/3 right-20 hidden text-right lg:block">
          <div class="text-xs font-light tracking-widest text-gray-500">NEXT GEN</div>
          <div class="text-2xl font-light tracking-wider text-[#00c7ff]">DeFi Protocol</div>
          <div class="ml-auto mt-2 h-px w-20 bg-gradient-to-r from-transparent to-[#0052ff]"></div>
        </div>
      {/if}

      {#if id === "intel"}
        <!-- Intel Side Metrics -->
        <div class="absolute left-10 top-1/2 hidden -translate-y-1/2 lg:block">
          <div class="space-y-8">
            <div class="text-right">
              <div class="flex items-center space-x-4">
                <div>
                  <div class="text-xs font-light tracking-widest text-gray-500">PROCESSING</div>
                  <div class="text-xl font-light text-[#00c7ff]">24/7</div>
                </div>
                <div>
                  <div class="text-xs font-light tracking-widest text-gray-500">REAL-TIME</div>
                  <div class="text-xl font-light text-[#00c7ff]">Data</div>
                </div>
              </div>
            </div>
            <div class="h-px w-32 bg-gradient-to-r from-[#0052ff] to-transparent"></div>
          </div>
        </div>

        <div class="absolute right-10 top-1/2 hidden -translate-y-1/2 lg:block">
          <svg class="h-32 w-32 opacity-20">
            <circle cx="16" cy="16" r="16" class="animate-pulse fill-none stroke-[#00c7ff]" stroke-width="0.5" />
            <path d="M16 0 L32 32" class="stroke-[#00c7ff] stroke-[0.5]" />
          </svg>
        </div>
      {/if}

      <div class="container mx-auto px-6">
        <div
          class="grid gap-12 lg:grid-cols-2"
          class:opacity-100={visibility[id]}
          class:opacity-0={!visibility[id]}
          class:translate-x-20={!visibility[id] && id === "ventures"}
          class:-translate-x-20={!visibility[id] && id === "intel"}
          class:translate-y-20={!visibility[id] && id === "architect"}
          class:translate-none={visibility[id]}
          style="transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) {i * 0.2}s"
        >
          <!-- Content -->
          <div
            class="flex flex-col justify-center"
            class:order-2={id === "ventures"}
            class:order-1={id === "intel"}
            class:lg:col-span-2={id === "architect"}
          >
            <div class="mb-6 flex items-center space-x-4 {id === 'architect' ? 'justify-center' : ''}">
              <div
                class="flex h-16 w-16 items-center justify-center rounded-xl bg-[#0052ff]/10
                       backdrop-blur-sm transition-transform duration-300 hover:scale-110"
              >
                <svelte:component this={Icon} class="h-8 w-8 text-[#00c7ff]" />
              </div>
              <h2
                class="neon-glow bg-gradient-to-r from-[#0052ff] via-[#00c7ff] to-[#73e4ff]
                       bg-clip-text text-4xl font-light tracking-tight text-transparent md:text-5xl"
              >
                {title}
              </h2>
            </div>
            <p class="mb-8 text-xl font-light leading-relaxed text-gray-300 {id === 'architect' ? 'text-center' : ''}">
              {description}
            </p>

            <!-- Stats Grid -->
            <div class="grid grid-cols-3 gap-4 {id === 'architect' ? 'mx-auto max-w-2xl' : ''}">
              {#each stats as stat}
                <div
                  class="group rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-4 backdrop-blur-sm
                         transition-all duration-300 hover:-translate-y-1 hover:border-[#0052ff]/20
                         hover:bg-[#0052ff]/10"
                >
                  <p class="mb-1 text-xl font-light text-[#00c7ff]">
                    {stat.prefix}{stat.value().toLocaleString()}{stat.suffix}
                  </p>
                  <p class="text-sm text-gray-400">{stat.label}</p>
                </div>
              {/each}
            </div>

            <!-- Feature Icons -->
            <div class="mt-8 flex space-x-6 {id === 'architect' ? 'justify-center' : ''}">
              {#each features as feature}
                <div class="group flex items-center space-x-2 text-gray-400">
                  <svelte:component
                    this={feature.icon}
                    class="h-5 w-5 text-[#00c7ff] transition-transform duration-300 group-hover:scale-110"
                  />
                  <span class="text-sm transition-colors duration-300 group-hover:text-[#00c7ff]">
                    {feature.label}
                  </span>
                </div>
              {/each}
            </div>
          </div>

          <!-- Visual Element - Nur für Ventures und Intel -->
          {#if id !== "architect"}
            <div
              class="relative flex items-center justify-center"
              class:order-1={id === "ventures"}
              class:order-2={id === "intel"}
            >
              <div class="relative h-[400px] w-[400px]">
                <div
                  class="bg-gradient-radial absolute inset-0 rounded-full from-[#0052ff]/10
                         via-transparent to-transparent opacity-50"
                ></div>
                <!-- Animated lines -->
                {#each Array(5) as _, j}
                  <div
                    class="absolute h-px w-full bg-gradient-to-r from-transparent via-[#0052ff]/30 to-transparent"
                    style="
                      top: {20 + j * 20}%;
                      transform: rotate({j * 30}deg);
                      animation: glow {2 + j * 0.5}s infinite ease-in-out;
                    "
                  ></div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Architect Bottom Stats -->
      {#if id === "architect"}
        <div class="absolute bottom-20 left-1/2 hidden -translate-x-1/2 space-y-4 text-center lg:block">
          <div class="flex justify-center space-x-16">
            <div>
              <div class="text-xs font-light tracking-widest text-gray-500">SCALABILITY</div>
              <div class="font-light text-[#00c7ff]">100k TPS</div>
            </div>
            <div>
              <div class="text-xs font-light tracking-widest text-gray-500">SECURITY</div>
              <div class="font-light text-[#00c7ff]">Zero-Knowledge</div>
            </div>
            <div>
              <div class="text-xs font-light tracking-widest text-gray-500">EFFICIENCY</div>
              <div class="font-light text-[#00c7ff]">Layer 2</div>
            </div>
          </div>
          <div class="h-px w-full bg-gradient-to-r from-transparent via-[#0052ff]/30 to-transparent"></div>
        </div>
      {/if}
    </section>
  {/each}
  <section id="tokenomics" class="relative min-h-screen py-24">
    <!-- Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute left-20 top-1/4 h-40 w-px bg-gradient-to-b from-[#0052ff]/50 to-transparent"></div>
      <div class="absolute bottom-1/4 right-20 h-40 w-px bg-gradient-to-b from-transparent to-[#0052ff]/50"></div>
    </div>

    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="mb-20 text-center">
        <h2
          class="mb-6 bg-gradient-to-r from-[#0052ff] via-[#00c7ff] to-[#73e4ff] bg-clip-text text-4xl
             font-light text-transparent"
        >
          Tokenomics
        </h2>
        <p class="mx-auto max-w-2xl font-light text-gray-400">
          Designed for sustainable growth and community-driven development
        </p>

        <!-- Contract Address -->
        <div class="mt-8 flex items-center justify-center">
          <button
            class="group relative inline-flex items-center gap-2 rounded-full border border-[#0052ff]/20 bg-[#0052ff]/5 px-6 py-2 backdrop-blur-sm transition-all duration-300 hover:border-[#0052ff]/40 hover:bg-[#0052ff]/10"
            on:click={() => {
              navigator.clipboard.writeText("AB5ZXPQeTexkkKKuFWvC8af9nDhk153tkCBJaarvpump");
              copiedAddress = "";
              setTimeout(() => (copiedAddress = null), 2000);
            }}
          >
            <span class="text-sm text-gray-400">CA:</span>
            <span class="font-mono text-sm text-[#00c7ff]">AB5ZXPQeTexkkKKuFWvC8af9nDhk153tkCBJaarvpump</span>
            <Link class="h-4 w-4 text-[#00c7ff] opacity-60 transition-opacity group-hover:opacity-100" />
            {#if copiedAddress === "AB5ZXPQeTexkkKKuFWvC8af9nDhk153tkCBJaarvpump"}
              <div
                class="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-[#0052ff]/20 px-3 py-1 text-xs text-[#00c7ff]"
              >
                Copied!
              </div>
            {/if}
          </button>
        </div>
      </div>

      <!-- Tokenomics Grid -->
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <!-- Left Side: Interactive Circle -->
        <div class="relative aspect-square">
          <div
            class="absolute inset-0 rounded-full bg-gradient-to-r from-[#0052ff]/10 to-transparent opacity-50 blur-2xl"
          ></div>
          <div class="relative h-full">
            <!-- Circulating Supply Slice -->
            <div class="absolute inset-0 transition-all duration-300 hover:-translate-y-2 hover:scale-105">
              <div class="top 0 absolute left-1/2 h-1/2 w-px bg-[#0052ff]/20"></div>
              <div class="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2">
                <div class="text-xl font-light text-[#00c7ff]">80%</div>
                <div class="text-sm text-gray-500">Circulating Supply</div>
              </div>
            </div>
            <!-- Locked Slice -->
            <div
              class="absolute inset-0 rotate-[90deg] transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            >
              <div class="top 0 absolute left-1/2 h-1/2 w-px bg-[#0052ff]/20"></div>
              <div class="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 -rotate-[90deg]">
                <div class="text-xl font-light text-[#00c7ff]">10%</div>
                <div class="text-sm text-gray-500">Locked</div>
              </div>
            </div>
            <!-- Development Slice -->
            <div
              class="absolute inset-0 rotate-[180deg] transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            >
              <div class="top 0 absolute left-1/2 h-1/2 w-px bg-[#0052ff]/20"></div>
              <div class="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 -rotate-[180deg]">
                <div class="text-xl font-light text-[#00c7ff]">5%</div>
                <div class="text-sm text-gray-500">Development</div>
              </div>
            </div>
            <!-- Marketing Slice -->
            <div
              class="absolute inset-0 rotate-[270deg] transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            >
              <div class="top 0 absolute left-1/2 h-1/2 w-px bg-[#0052ff]/20"></div>
              <div class="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 -rotate-[270deg]">
                <div class="text-xl font-light text-[#00c7ff]">5%</div>
                <div class="text-sm text-gray-500">Marketing</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Details -->
        <div class="space-y-6">
          <div
            class="group rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div class="mb-2 flex items-center justify-between">
              <div class="text-lg text-[#00c7ff]">Circulating Supply</div>
              <div class="text-white text-2xl font-light">80%</div>
            </div>
            <p class="text-sm font-light text-gray-400">Available for public trading and community participation</p>
          </div>

          <div
            class="group rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div class="mb-2 flex items-center justify-between">
              <div class="text-lg text-[#00c7ff]">Strategic Reserve (Locked)</div>
              <div class="text-white text-2xl font-light">10%</div>
            </div>
            <p class="text-sm font-light text-gray-400">Time-locked tokens for long-term ecosystem development</p>
          </div>

          <div
            class="group rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div class="mb-2 flex items-center justify-between">
              <div class="text-lg text-[#00c7ff]">Development Fund</div>
              <div class="text-white text-2xl font-light">5%</div>
            </div>
            <p class="text-sm font-light text-gray-400">
              Platform development, security audits, and infrastructure improvements
            </p>
          </div>

          <div
            class="group rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
          >
            <div class="mb-2 flex items-center justify-between">
              <div class="text-lg text-[#00c7ff]">Marketing & Partnerships</div>
              <div class="text-white text-2xl font-light">5%</div>
            </div>
            <p class="text-sm font-light text-gray-400">
              Marketing initiatives, community growth, and strategic partnerships
            </p>
          </div>
        </div>
      </div>

      <!-- Additional Token Info -->
      <div class="mt-20 grid gap-8 md:grid-cols-3">
        <div class="rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-6 text-center backdrop-blur-sm">
          <div class="text-sm text-gray-400">Market Cap</div>
          <div class="text-2xl text-[#00c7ff]">/</div>
        </div>
        <div class="rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-6 text-center backdrop-blur-sm">
          <div class="text-sm text-gray-400">Token Type</div>
          <div class="text-2xl text-[#00c7ff]">SPL Token</div>
        </div>
        <div class="rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-6 text-center backdrop-blur-sm">
          <div class="text-sm text-gray-400">Total Supply</div>
          <div class="text-2xl text-[#00c7ff]">1B Tokens</div>
        </div>
      </div>

      <!-- Token Utility & Benefits -->
      <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          class="group rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-[#0052ff]/10"
        >
          <div class="mb-4 inline-block rounded-lg bg-[#0052ff]/10 p-3">
            <Wallet class="h-6 w-6 text-[#00c7ff]" />
          </div>
          <h3 class="mb-2 text-lg font-light text-[#00c7ff]">Staking Rewards</h3>
          <p class="text-sm text-gray-400">Earn up to 15% APY by staking your tokens in our protocol</p>
        </div>

        <div
          class="group rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-[#0052ff]/10"
        >
          <div class="mb-4 inline-block rounded-lg bg-[#0052ff]/10 p-3">
            <Vote class="h-6 w-6 text-[#00c7ff]" />
          </div>
          <h3 class="mb-2 text-lg font-light text-[#00c7ff]">Governance Rights</h3>
          <p class="text-sm text-gray-400">Participate in protocol decisions and shape the future of the ecosystem</p>
        </div>

        <div
          class="group rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-[#0052ff]/10"
        >
          <div class="mb-4 inline-block rounded-lg bg-[#0052ff]/10 p-3">
            <Cpu class="h-6 w-6 text-[#00c7ff]" />
          </div>
          <h3 class="mb-2 text-lg font-light text-[#00c7ff]">AI Trading Signals</h3>
          <p class="text-sm text-gray-400">
            Access premium AI-powered Hyper-Finetuned market insights and trading signals
          </p>
        </div>

        <div
          class="group rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-[#0052ff]/10"
        >
          <div class="mb-4 inline-block rounded-lg bg-[#0052ff]/10 p-3">
            <Network class="h-6 w-6 text-[#00c7ff]" />
          </div>
          <h3 class="mb-2 text-lg font-light text-[#00c7ff]">Cross-Chain Bridge</h3>
          <p class="text-sm text-gray-400">Seamlessly bridge assets across multiple blockchain networks</p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  :global(body) {
    font-family: "Space Grotesk", sans-serif;
  }

  .neon-glow {
    text-shadow:
      0 0 7px rgba(0, 199, 255, 0.3),
      0 0 10px rgba(0, 199, 255, 0.2),
      0 0 21px rgba(0, 199, 255, 0.1);
  }
  
  .neon-glow-enhanced {
    text-shadow:
      0 0 10px rgba(0, 199, 255, 0.4),
      0 0 20px rgba(0, 199, 255, 0.3),
      0 0 30px rgba(0, 199, 255, 0.2),
      0 0 40px rgba(0, 199, 255, 0.1),
      0 0 60px rgba(0, 82, 255, 0.1);
    animation: glow-pulse 4s ease-in-out infinite;
  }
  
  @keyframes glow-pulse {
    0%, 100% {
      text-shadow:
        0 0 10px rgba(0, 199, 255, 0.4),
        0 0 20px rgba(0, 199, 255, 0.3),
        0 0 30px rgba(0, 199, 255, 0.2),
        0 0 40px rgba(0, 199, 255, 0.1);
    }
    50% {
      text-shadow:
        0 0 15px rgba(0, 199, 255, 0.6),
        0 0 25px rgba(0, 199, 255, 0.4),
        0 0 35px rgba(0, 199, 255, 0.3),
        0 0 50px rgba(0, 199, 255, 0.2),
        0 0 80px rgba(0, 82, 255, 0.15);
    }
  }

  
  .premium-btn-enhanced {
    box-shadow:
      0 8px 32px -4px rgba(0, 20, 80, 0.4),
      0 4px 16px -2px rgba(0, 82, 255, 0.2),
      inset 0 1px 0 rgba(0, 199, 255, 0.1);
    position: relative;
    overflow: hidden;
  }
  
  .premium-btn-enhanced::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 199, 255, 0.1),
      transparent
    );
    transition: left 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .premium-btn-enhanced:hover::before {
    left: 100%;
  }

  
  .premium-btn-enhanced:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow:
      0 12px 48px -4px rgba(0, 199, 255, 0.7),
      0 8px 24px -2px rgba(0, 199, 255, 0.5),
      0 0 40px rgba(0, 199, 255, 0.6),
      inset 0 1px 0 rgba(0, 199, 255, 0.2);
    text-shadow:
      0 0 15px rgba(0, 199, 255, 0.6),
      0 0 25px rgba(0, 199, 255, 0.5),
      0 0 40px rgba(0, 199, 255, 0.4);
  }

  
  .glass-btn-enhanced {
    position: relative;
    overflow: hidden;
  }
  
  .glass-btn-enhanced::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 199, 255, 0.05),
      transparent
    );
    transition: left 0.5s ease;
  }
  
  .glass-btn-enhanced:hover::before {
    left: 100%;
  }
  
  .glass-btn-enhanced:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow:
      0 8px 40px -4px rgba(0, 82, 255, 0.3),
      0 6px 20px -2px rgba(0, 199, 255, 0.15),
      inset 0 0 20px rgba(0, 199, 255, 0.2);
  }


  .terminal-line {
    animation: pulse 3s infinite;
    transition: all 0.3s ease;
  }

  .terminal-line:hover {
    color: #00e5ff;
    padding-left: 0.5rem;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.95;
    }
    50% {
      opacity: 0.7;
    }
  }

  @keyframes glow {
    0%,
    100% {
      opacity: 0.3;
      transform: rotate(0deg) scale(0.8);
    }
    50% {
      opacity: 0.6;
      transform: rotate(180deg) scale(1.2);
    }
  }
  
  /* Advanced iOS-style Animations */
  @keyframes animate-gradient-x {
    0%, 100% {
      background-size: 200% 200%;
      background-position: left center;
    }
    50% {
      background-size: 200% 200%;
      background-position: right center;
    }
  }
  
  .animate-gradient-x {
    animation: animate-gradient-x 6s ease infinite;
  }
  
  .bg-size-300 {
    background-size: 300%;
  }
  
  @keyframes animate-float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }
  
  .animate-float {
    animation: animate-float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: animate-float 8s ease-in-out infinite;
    animation-delay: -2s;
  }
  
  .animate-float-reverse {
    animation: animate-float 7s ease-in-out infinite reverse;
  }
  
  @keyframes animate-pulse-slow {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.8;
    }
  }
  
  .animate-pulse-slow {
    animation: animate-pulse-slow 4s ease-in-out infinite;
  }
  
  @keyframes animate-bounce-slow {
    0%, 100% {
      transform: translateY(0) translateX(-50%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(-8px) translateX(-50%);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
  
  .animate-bounce-slow {
    animation: animate-bounce-slow 2s infinite;
  }
  
  @keyframes animate-fade-in-out {
    0%, 100% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.8;
    }
  }
  
  .animate-fade-in-out {
    animation: animate-fade-in-out 3s ease-in-out infinite;
  }

  .bg-gradient-radial {
    background: radial-gradient(
      circle at center,
      var(--tw-gradient-from) 0%,
      var(--tw-gradient-via) 50%,
      var(--tw-gradient-to) 100%
    );
  }

  :global(html) {
    scroll-behavior: smooth;
  }
</style>
