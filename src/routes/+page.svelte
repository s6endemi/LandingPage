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

  // Terminal Command Simulation
  let terminalLines: string[] = [
    "Initializing system...",
    "Connecting to network...",
    "Starting analysis...",
    "AI models loaded...",
    "Web3 protocols active...",
  ];

  const commands = [
    // Zero-Knowledge Proofs
    "snarkjs verify -v verification_key.json public.json proof.json ✓",
    "circom circuit.circom --r1cs --wasm --sym --O1",
    "nova prove --steps 12 --instance params.bin → proof.bin",

    // Cryptography
    "openssl pkeyutl -derive -peerkey peer.pub -inkey key.pem | kzg commit",
    "libsnark generate_r1cs_constraints -c main.cpp -d constraints.txt",
    "milagro_bls sign --msg 0x8920..c43e7 --key priv.key → sig.bin",

    // Blockchain Core
    "geth --syncmode snap --gcmode archive --txlookuplimit 0",
    "erigon snapshot retry --block 142069 --datadir /chaindata",
    "lighthouse bn --network mainnet --checkpoint-sync-url https://beacon.eth",

    // Smart Contracts
    "cast send --rpc-url $RPC --private-key $PK 'func(uint256)' 42",
    "forge verify-contract --chain-id 1 --constructor-args $(cast abi-encode)",
    "hardhat node --fork-block-number 17328741 --fork-chain-id 1",

    // Networking
    "libp2p-relay --listen /ip4/0.0.0.0/tcp/4001 --announce /dns4/node.xyz",
    "gossipsub-tracer --topic /blocks/0x00 --metrics-port 9090",
    "discv5 discover --bootnodes enr:-KG4Q...",

    // Devops
    "ansible-playbook -i inventory.yml node.yml --tags consensus,validator",
    "docker-compose -f docker-compose-zk.yml up --scale prover=8 -d",
    "kubectl rollout restart sts/consensus-node --namespace eth-mainnet",

    // Monitoring
    "grafana-agent --config.file=agent.yaml --metrics.wal-directory=/wal",
    "promtail --config.file=promtail.yaml --client.external-labels=cluster=zk",
    "jaeger-agent --collector.host-port=14250 --processor.jaeger-compact.server-host-port=6831",

    // Consensus
    "tendermint show_node_id --home /tendermint/core | xargs -I {} jq '.persistent_peers += {}'",
    "nimbus_beacon_node metrics --metrics-address 0.0.0.0 --metrics-port 8008",
    "prysm validator accounts import --wallet-dir=/data --keys-dir=/keystore",

    // Advanced Transactions
    "mev-rs bundle send --block 17328742 --txs $(cat bundle.json) --signer flashbots",
    "cairo-sharp submit --program program.json --inputs inputs.json --proof_mode=full",
    "arbitrum_validator challenge --assertion-id 42 --log-level debug",
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
        Your strategic partner in the digital revolution, merging artificial intelligence with blockchain technology to
        create the next generation of decentralized finance.
      </p>
      <div class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <button
          on:click={() => scrollToSection("ventures")}
          class="premium-btn group relative overflow-hidden rounded-full border border-[#0a1a2f] bg-gradient-to-br
                 from-[#00132f] via-[#00193f] to-[#002050] px-8 py-3 font-light transition-all duration-300
                 hover:border-[#0044ff]/40 hover:via-[#002860] hover:to-[#001f4f]"
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
          class="glass-btn group relative overflow-hidden rounded-full border border-[#3a3a5a]/30
                 bg-[#0a0a1a]/50 px-8 py-3 font-light backdrop-blur-xl transition-all duration-300
                 hover:border-[#00c7ff]/40 hover:bg-[#151530]/30"
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

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown class="h-6 w-6 text-[#00c7ff]/60" />
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
              navigator.clipboard.writeText("");
              copiedAddress = "";
              setTimeout(() => (copiedAddress = null), 2000);
            }}
          >
            <span class="text-sm text-gray-400">CA:</span>
            <span class="font-mono text-sm text-[#00c7ff]"></span>
            <Link class="h-4 w-4 text-[#00c7ff] opacity-60 transition-opacity group-hover:opacity-100" />
            {#if copiedAddress === ""}
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

  .premium-btn {
    box-shadow:
      0 4px 24px -4px rgba(0, 20, 80, 0.3),
      0 2px 8px -2px rgba(0, 82, 255, 0.15);
  }

  .premium-btn:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow:
      0 6px 32px -4px rgba(0, 199, 255, 0.6),
      0 4px 16px -2px rgba(0, 199, 255, 0.4),
      0 0 24px rgba(0, 199, 255, 0.5);
    text-shadow:
      0 0 10px rgba(0, 199, 255, 0.5),
      0 0 15px rgba(0, 199, 255, 0.4),
      0 0 30px rgba(0, 199, 255, 0.3);
  }

  .glass-btn:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow:
      0 6px 32px -4px rgba(0, 82, 255, 0.2),
      0 4px 12px -2px rgba(0, 199, 255, 0.1),
      inset 0 0 12px rgba(0, 199, 255, 0.15);
  }

  .premium-btn:active {
    transform: translateY(1px) scale(0.98);
    box-shadow:
      0 2px 12px -4px rgba(0, 82, 255, 0.3),
      inset 0 0 8px rgba(0, 199, 255, 0.2);
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
