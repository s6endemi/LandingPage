<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { Rocket, Brain, Building, Terminal, Cpu, Shield, TrendingUp } from "lucide-svelte";
  import CircuitBackground from "$lib/assets/circuit-background.svg?raw";

  type SectionId = "hero" | "ventures" | "intel" | "architect";

  // Stats für Live-Updates
  let stats = {
    activeProjects: 42,
    totalInvestment: 100,
    successRate: 94,
    marketSentiment: 78,
    networkNodes: 1337,
    transactionsPerSecond: 9842,
  };

  // Terminal Command Simulation
  let terminalLines: string[] = ["Initializing system...", "Connecting to network...", "Starting analysis..."];
  const commands = [
    "Analyzing market patterns... [✓]",
    "Processing blockchain data... [LIVE]",
    "Network status: Optimal ⚡",
    "Smart contracts validated ✓",
    "Gas optimization: 92% efficient",
    "Network health: 99.99% uptime",
    "AI models training: [===>] 87%",
    "Scanning new opportunities... [LIVE]",
    "Security protocols active 🛡️",
    "Market sentiment: Bullish 📈",
  ];

  function addTerminalLine() {
    const command = commands[Math.floor(Math.random() * commands.length)];
    terminalLines = [...terminalLines.slice(-5), command];
  }

  let sections: Record<SectionId, HTMLElement | null> = {
    hero: null,
    ventures: null,
    intel: null,
    architect: null,
  };

  let visibility: Record<SectionId, boolean> = {
    hero: false,
    ventures: false,
    intel: false,
    architect: false,
  };

  // Scrolling state
  let scrollY: number;
  let windowHeight: number;

  // Parallax effect
  $: parallaxOffset = scrollY * 0.5;

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

    // Start periodic updates
    const statsInterval = setInterval(() => {
      stats.activeProjects += Math.random() > 0.5 ? 1 : 0;
      stats.totalInvestment += Math.random() > 0.7 ? 1 : 0;
      stats.successRate = Math.min(99, stats.successRate + (Math.random() > 0.7 ? 1 : -1));
      stats.marketSentiment = Math.min(100, Math.max(0, stats.marketSentiment + (Math.random() > 0.5 ? 1 : -1)));
      stats.networkNodes += Math.floor(Math.random() * 10);
      stats.transactionsPerSecond = Math.floor(9000 + Math.random() * 2000);
      stats = stats; // Trigger reactivity
    }, 2000);

    const terminalInterval = setInterval(addTerminalLine, 1500);

    return () => {
      observer.disconnect();
      clearInterval(statsInterval);
      clearInterval(terminalInterval);
    };
  });

  const sectionData = [
    {
      id: "ventures" as const,
      title: "Ventures",
      description: "Strategic investments in groundbreaking Web3 projects.",
      icon: Rocket,
      stats: [
        { label: "Active Projects", value: () => stats.activeProjects, prefix: "", suffix: "" },
        { label: "Total Investment", value: () => stats.totalInvestment, prefix: "$", suffix: "M" },
        { label: "Success Rate", value: () => stats.successRate, prefix: "", suffix: "%" },
      ],
      features: [
        { icon: TrendingUp, label: "Portfolio Growth" },
        { icon: Shield, label: "Risk Management" },
        { icon: Cpu, label: "Tech Innovation" },
      ],
    },
    {
      id: "intel" as const,
      title: "Intel",
      description: "Deep market insights and technological innovation.",
      icon: Brain,
      stats: [
        { label: "Market Sentiment", value: () => stats.marketSentiment, prefix: "", suffix: "%" },
        { label: "Active Nodes", value: () => stats.networkNodes, prefix: "", suffix: "+" },
        { label: "Transactions/s", value: () => stats.transactionsPerSecond, prefix: "", suffix: "" },
      ],
      features: [
        { icon: Terminal, label: "Real-time Analysis" },
        { icon: Shield, label: "Secure Data" },
        { icon: Cpu, label: "AI Powered" },
      ],
    },
    {
      id: "architect" as const,
      title: "Architect",
      description: "Building the foundation of next-gen Web3 infrastructure.",
      icon: Building,
      stats: [
        { label: "Network Uptime", value: () => 99.99, prefix: "", suffix: "%" },
        { label: "Protocol Version", value: () => "3.0", prefix: "v", suffix: "" },
        { label: "Security Score", value: () => 98, prefix: "", suffix: "/100" },
      ],
      features: [
        { icon: Shield, label: "Enterprise Grade" },
        { icon: Cpu, label: "Scalable" },
        { icon: Terminal, label: "Developer Ready" },
      ],
    },
  ];
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
    <!-- Animated Background Gradient -->
    <div class="bg-gradient-radial absolute inset-0 from-[#0052ff]/10 via-transparent to-transparent opacity-50"></div>

    <!-- Hero Content -->
    <div
      class="relative z-10 max-w-4xl text-center"
      class:opacity-100={visibility.hero}
      class:translate-y-0={visibility.hero}
      class:opacity-0={!visibility.hero}
      class:translate-y-10={!visibility.hero}
      style="transition: all 1s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <h1
        class="neon-glow mb-6 bg-gradient-to-r from-[#0052ff] via-[#00c7ff] to-[#73e4ff] bg-clip-text text-6xl
               font-light tracking-tight text-transparent md:text-7xl"
      >
        Building the Future of Web3
      </h1>
      <p class="mb-8 text-xl font-light leading-relaxed text-gray-300 md:text-2xl">
        Your strategic partner in the digital revolution, crafting tomorrow's technology today.
      </p>
      <div class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <button
          class="neon-button text-white group relative overflow-hidden rounded-lg bg-[#0052ff] px-8 py-4
                 font-medium transition-all duration-300"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#0052ff] to-[#00c7ff] opacity-0
                   transition-opacity duration-300 group-hover:opacity-100"
          ></div>
          <span class="relative">
            Explore Our Vision
            <span class="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </button>
        <button
          class="neon-button-secondary text-white rounded-lg border border-[#0052ff]/20 bg-[#0052ff]/5 px-8
                 py-4 font-medium backdrop-blur-sm transition-all duration-300"
        >
          Learn More
        </button>
      </div>

      <!-- Terminal Preview -->
      <div class="bg-black/20 mt-12 overflow-hidden rounded-lg border border-[#0052ff]/20 backdrop-blur-sm">
        <div class="flex items-center justify-between border-b border-[#0052ff]/20 px-4 py-2">
          <div class="flex items-center space-x-2">
            <div class="h-3 w-3 rounded-full bg-red-500/20"></div>
            <div class="h-3 w-3 rounded-full bg-yellow-500/20"></div>
            <div class="h-3 w-3 rounded-full bg-green-500/20"></div>
          </div>
          <div class="text-xs text-[#0052ff]/60">terminal.web3</div>
        </div>
        <div class="p-4 font-mono text-sm">
          {#each terminalLines as line}
            <div class="terminal-line text-[#00c7ff] opacity-80" in:fade={{ duration: 150 }}>
              <span class="text-[#0052ff]">></span>
              {line}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Main Sections -->
  {#each sectionData as { id, title, description, icon: Icon, stats, features }, i}
    <section bind:this={sections[id]} data-section={id} class="relative min-h-screen py-24" {id}>
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
                  class="bg-gradient-radial absolute inset-0 rounded-full from-[#0052ff]/10 via-transparent
                           to-transparent opacity-50"
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
    </section>
  {/each}
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

  .neon-button {
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 0 10px rgba(0, 82, 255, 0.2),
      0 0 20px rgba(0, 82, 255, 0.1);
  }

  .neon-button:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      0 0 15px rgba(0, 199, 255, 0.4),
      0 0 30px rgba(0, 199, 255, 0.2),
      0 0 45px rgba(0, 199, 255, 0.1);
  }

  .neon-button:active {
    transform: translateY(1px) scale(0.98);
    box-shadow:
      0 0 20px rgba(0, 199, 255, 0.5),
      0 0 40px rgba(0, 199, 255, 0.3),
      0 0 60px rgba(0, 199, 255, 0.2);
  }

  .neon-button-secondary {
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 10px rgba(0, 82, 255, 0.1);
  }

  .neon-button-secondary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      0 0 15px rgba(0, 199, 255, 0.2),
      0 0 30px rgba(0, 199, 255, 0.1);
    border-color: rgba(0, 199, 255, 0.4);
  }

  .neon-button-secondary:active {
    transform: translateY(1px) scale(0.98);
    box-shadow:
      0 0 20px rgba(0, 199, 255, 0.3),
      0 0 40px rgba(0, 199, 255, 0.2);
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

  .terminal-line {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.4;
    }
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
