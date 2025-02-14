<script lang="ts">
  import { createDialog } from "@melt-ui/svelte";
  import { fade, slide, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import * as THREE from "three";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";

  // Dialog setup
  const {
    elements: {
      trigger: earlyAccessTrigger,
      content: earlyAccessContent,
      title: earlyAccessTitle,
      close: earlyAccessClose,
    },
    states: { open: earlyAccessOpen },
  } = createDialog();

  // Basic state
  let email = "";
  let submitting = false;
  let isCopied = false;

  // Canvas and Nodes
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let nodes: { x: number; y: number; size: number; speed: number; color: string; hue: number }[] = [];

  // Intersection Observer elements
  let heroSection: HTMLElement;
  let isHeroVisible = false;
  let statsSection: HTMLElement;
  let isStatsVisible = false;
  let featuresSection: HTMLElement;
  let isFeaturesVisible = false;

  let activeFeatureIndex = 0;

  const features = [
    {
      icon: "📊",
      title: "Market Analysis",
      description: "Real-time analysis of market trends and patterns",
      metrics: ["99.2% Accuracy", "24/7 Availability", "Real-time Adaptation"],
      gradient: "from-indigo-600 to-blue-600",
    },
    {
      icon: "🎯",
      title: "Precision Analytics",
      description: "Track every aspect of market movements with AI-powered accuracy",
      metrics: ["0.1ms Latency", "Pattern Recognition", "Risk Analysis"],
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: "⚡",
      title: "Smart Trading Engine",
      description: "Our AI continuously optimizes trading strategies based on real-time market data",
      metrics: ["Quantum Processing", "Neural Networks", "Adaptive Learning"],
      gradient: "from-pink-600 to-indigo-600",
    },
  ];

  const stats = [
    { value: "99.2%", label: "Prediction Accuracy" },
    { value: "0.1ms", label: "Signal Speed" },
    { value: "$2.4M", label: "Daily Volume" },
  ];

  function initializeNodes() {
    if (!canvas || !ctx) return;

    nodes = Array(80)
      .fill(null)
      .map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.3 + 0.1,
        color: `rgba(150, 150, 150, 0.3)`,
        hue: Math.random() * 360,
      }));

    function drawConnections() {
      if (!ctx || !canvas) return;

      ctx.lineCap = "round";
      ctx.lineWidth = 0.8;

      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
            const opacity = 1 - distance / 120;

            gradient.addColorStop(0, `hsla(${node.hue}, 70%, 70%, ${opacity * 0.4})`);
            gradient.addColorStop(1, `hsla(${otherNode.hue}, 70%, 70%, ${opacity * 0.4})`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        node.y -= node.speed;
        if (node.y < 0) {
          node.y = canvas.height;
          node.hue = (node.hue + 1) % 360;
        }
      });

      drawConnections();

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${node.hue}, 70%, 70%, 0.3)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${node.hue}, 70%, 70%, 0.5)`;
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  function generateChartPath(values) {
    // Vereinfachte generateChartPath Funktion
    const height = 400;
    const width = 800;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;

    return values
      .map((value, i) => {
        const x = (i / (values.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }

  // Clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("4umDRgZApiuynKEcqtxP9o9x4BwLwde8nTWaiRKppump");
      isCopied = true;
      setTimeout(() => {
        isCopied = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  async function handleSubmit() {
    submitting = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    submitting = false;
    earlyAccessOpen.set(false);
    email = "";
  }

  onMount(() => {
    if (browser) {
      const initCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (!canvas || !canvas.getContext) return;
        ctx = canvas.getContext("2d");
        if (!ctx) return;

        initializeNodes();
      };

      initCanvas();
      window.addEventListener("resize", initCanvas);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === heroSection) isHeroVisible = entry.isIntersecting;
            if (entry.target === statsSection) isStatsVisible = entry.isIntersecting;
            if (entry.target === featuresSection) isFeaturesVisible = entry.isIntersecting;
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(heroSection);
      observer.observe(statsSection);
      observer.observe(featuresSection);

      initThreeJS(); // Initialisiere Three.js hier

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", initCanvas);
        if (renderer) {
          // Stelle sicher, dass renderer existiert bevor du versuchst, das Element zu entfernen
          document.body.removeChild(renderer.domElement);
        }
      };
    }
  });

  // Trading Interface Section Script (INTEGRIERT)
  let selectedTimeframe = "5m";
  let showAIDetails = false;
  let currentPrice = 43567.89;
  let priceChange = 2.34;
  let aiConfidence = 94;

  // Realistische Marktdaten simulieren
  let prices = Array.from({ length: 100 }, (_, i) => ({
    time: new Date(Date.now() - (100 - i) * 60000),
    price: 43500 + Math.sin(i / 10) * 1000 + Math.random() * 200,
    volume: Math.random() * 1000000,
    prediction: 43500 + Math.sin((i + 2) / 10) * 1000 + Math.random() * 100,
  }));

  // Technische Indikatoren
  let indicators = [
    { name: "RSI", value: 67.8, trend: "neutral" },
    { name: "MACD", value: 245.6, trend: "bullish" },
    { name: "MA-50", value: 42890, trend: "bullish" },
  ];

  // Market Patterns
  let patterns = [
    { name: "Bull Flag", probability: 89, timeframe: "4H" },
    { name: "Double Bottom", probability: 76, timeframe: "1D" },
  ];

  $: aiAnalysis = {
    sentiment: 0.82,
    volumeProfile: "Accumulation",
    prediction: "Strong Uptrend",
    keyLevels: {
      support: [42800, 42400],
      resistance: [44200, 44800],
    },
  };

  let orderFlowData = Array(20)
    .fill(0)
    .map(() => ({
      size: Math.random() * 100,
      side: Math.random() > 0.5 ? "buy" : "sell",
      price: currentPrice + (Math.random() - 0.5) * 100,
    }));

  // Automatische Updates
  setInterval(() => {
    currentPrice += (Math.random() - 0.5) * 20;
    prices = [
      ...prices.slice(1),
      {
        time: new Date(),
        price: currentPrice,
        volume: Math.random() * 1000000,
        prediction: currentPrice + (Math.random() - 0.5) * 200,
      },
    ];
    orderFlowData = [
      ...orderFlowData.slice(1),
      {
        size: Math.random() * 100,
        side: Math.random() > 0.5 ? "buy" : "sell",
        price: currentPrice + (Math.random() - 0.5) * 100,
      },
    ];
  }, 1000);

  // Neue State Variablen für 3D & AI
  let aiResponse = "";
  let isAITyping = false;
  let hoveredFeature3D = -1;
  let mousePos = { x: 0, y: 0 };

  // 3D WebGL Initialisierung Variablen
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let neuralNetwork: THREE.Group;

  async function initThreeJS() {
    if (!browser) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.zIndex = "-1";
    document.body.appendChild(renderer.domElement);

    // Neural Network Structure
    neuralNetwork = new THREE.Group();

    // Create Neural Layers
    const layers = [4, 6, 8, 6, 4]; // Anzahl der Neuronen pro Layer
    layers.forEach((neurons, i) => {
      const layer = new THREE.Group();
      const radius = 0.3;
      const angleStep = (Math.PI * 2) / neurons;

      // Neurons
      for (let j = 0; j < neurons; j++) {
        const geometry = new THREE.SphereGeometry(0.1, 32, 32);
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(i / layers.length, 1, 0.6),
          emissive: new THREE.Color().setHSL(i / layers.length, 1, 0.2),
        });
        const neuron = new THREE.Mesh(geometry, material);

        const x = Math.cos(angleStep * j) * radius * (i + 1);
        const z = Math.sin(angleStep * j) * radius * (i + 1);
        neuron.position.set(x, 0, z);
        layer.add(neuron);
      }

      // Position Layers
      layer.position.x = i * 2 - (layers.length - 1);
      neuralNetwork.add(layer);
    });

    // Connections
    neuralNetwork.children.forEach((layer, i) => {
      if (i === 0) return;
      const prevLayer = neuralNetwork.children[i - 1];

      prevLayer.children.forEach((prevNeuron) => {
        layer.children.forEach((neuron) => {
          const lineGeometry = new THREE.BufferGeometry();
          const points = [prevNeuron.position.clone(), neuron.position.clone()];
          lineGeometry.setFromPoints(points);

          const line = new THREE.Line(
            lineGeometry,
            new THREE.LineBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.1,
            })
          );
          neuralNetwork.add(line);
        });
      });
    });

    scene.add(neuralNetwork);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Camera Position
    camera.position.z = 5;

    // Animation
    function animate() {
      requestAnimationFrame(animate);

      neuralNetwork.rotation.y += 0.002;
      neuralNetwork.children.forEach((layer, i) => {
        layer.children.forEach((neuron, j) => {
          if (neuron instanceof THREE.Mesh) {
            neuron.scale.set(
              1 + Math.sin(Date.now() * 0.001 + i + j) * 0.3,
              1 + Math.sin(Date.now() * 0.001 + i + j) * 0.3,
              1 + Math.sin(Date.now() * 0.001 + i + j) * 0.3
            );
          }
        });
      });

      renderer.render(scene, camera);
    }

    animate();
  }

  // AI Interaction
  async function generateAIResponse() {
    isAITyping = true;
    aiResponse = ""; // Reset AI response
    const responses = [
      "Analyzing market patterns...",
      "Processing real-time data...",
      "Optimizing trading strategy...",
      "Generating predictive model...",
    ];

    for (const text of responses) {
      aiResponse = "";
      for (const char of text) {
        aiResponse += char;
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    isAITyping = false;
  }
</script>

{#if browser}
  <canvas bind:this={canvas} class="pointer-events-none fixed inset-0 z-0 h-full w-full" />
{/if}

<div class="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
  <!-- Hero Section -->
  <header
    bind:this={heroSection}
    class="container relative mx-auto h-screen overflow-hidden px-6 pb-32 pt-24 text-center"
    class:is-visible={isHeroVisible}
    on:mousemove={(e) => {
      mousePos = { x: e.clientX, y: e.clientY };
    }}
  >
    <div
      class="absolute inset-0 z-0 opacity-30"
      style="background: radial-gradient(circle at {mousePos.x}px {mousePos.y}px,
             rgba(99, 102, 241, 0.1) 0%,
             rgba(0, 0, 0, 0) 70%)"
    />
    <!-- Decorative Elements -->
    <div
      class="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2
                rounded-full bg-gradient-to-r from-indigo-600/10 to-pink-600/10 blur-3xl"
    />
    <div
      class="absolute left-1/3 top-1/3 h-[400px] w-[400px]
                rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-2xl"
    />

    <div class="relative z-10">
      <h1
        class="mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text
                 font-['General_Sans'] text-5xl font-normal tracking-tight text-transparent md:text-7xl"
        in:fly={{ y: 20, duration: 800, delay: 200 }}
      >
        The Future of Trading is Here
      </h1>

      <p
        class="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-300"
        in:fly={{ y: 20, duration: 800, delay: 400 }}
      >
        Harness the power of advanced AI to predict market movements seconds before they happen. Our neural network
        processes millions of data points to give you the edge in crypto trading.
      </p>

      <div
        class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        in:fly={{ y: 20, duration: 800, delay: 600 }}
      >
        <button
          use:earlyAccessTrigger
          class="text-white group rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600
                       px-8 py-4 font-medium shadow-lg shadow-indigo-500/25 transition-all duration-300
                       hover:-translate-y-0.5 hover:shadow-indigo-500/40"
        >
          Get Early Access
          <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
        <a
          href="#features"
          class="hover:text-white rounded-2xl bg-gray-800/50 px-8 py-4 font-medium text-gray-300
                  shadow-lg backdrop-blur-sm transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-purple-500/20"
        >
          Learn More
        </a>
      </div>

      <!-- Contract Address -->
      <div class="mx-auto mt-16 max-w-3xl">
        <div class="group relative">
          <div
            class="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-indigo-500/20
                      to-purple-600/20 opacity-20 blur transition duration-300 group-hover:opacity-30"
          />
          <div
            class="border-white/5 relative flex cursor-pointer items-center justify-between
                      rounded-lg border bg-gray-900/30 px-4 py-3 backdrop-blur-sm
                      transition-all duration-300 hover:bg-gray-800/40"
            on:click={copyToClipboard}
          >
            <div class="flex flex-1 items-center space-x-2">
              <span class="text-sm font-medium text-gray-500">CA:</span>
              <span class="select-all font-mono text-sm text-gray-400">
                4umDRgZApiuynKEcqtxP9o9x4BwLwde8nTWaiRKppump
              </span>
            </div>
            <div class="flex items-center space-x-3 pl-2">
              {#if isCopied}
                <span
                  class="text-xs text-emerald-400 opacity-100 transition-all duration-200"
                  in:fade={{ duration: 200 }}
                >
                  Copied!
                </span>
              {:else}
                <span
                  class="text-xs text-gray-500 opacity-0 transition-all duration-200
                           group-hover:opacity-100"
                >
                  Click to copy
                </span>
              {/if}
              <svg
                class="h-4 w-4 text-gray-400 transition-colors duration-200
                         group-hover:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Features Section -->
  <section id="features" bind:this={featuresSection} class="relative mt-[50vh] overflow-hidden py-32">
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-800/30 to-gray-900/50"></div>

    <!-- Animated Background Elements -->
    {#if browser}
      {#each Array(8) as _, i}
        <div
          class="absolute rounded-full bg-gradient-to-r from-indigo-600/5 to-purple-600/5 blur-3xl"
          style="width: {200 + Math.random() * 300}px;
                    height: {200 + Math.random() * 300}px;
                    left: {Math.random() * 100}%;
                    top: {Math.random() * 100}%;
                    transform: scale({0.8 + Math.random() * 0.5});
                    animation: float-{i} {15 + Math.random() * 10}s infinite ease-in-out;"
        ></div>
      {/each}
    {/if}

    <div class="container relative mx-auto px-6">
      <!-- Features Header -->
      <div
        class="mb-20 transform text-center transition-all duration-700"
        class:translate-y-0={isFeaturesVisible}
        class:translate-y-20={!isFeaturesVisible}
        style="transition-delay: 100ms;"
      >
        <h2
          class="mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
                   bg-clip-text font-['General_Sans'] text-4xl font-light text-transparent md:text-5xl"
        >
          Advanced Trading Technology
        </h2>
        <div class="mt-6 flex flex-wrap justify-center gap-4">
          <span class="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            Real-time Analysis
          </span>
          <span class="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            Predictive AI
          </span>
          <span class="rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-300">
            Market Sentiment
          </span>
          <span class="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            On-chain Data
          </span>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="relative z-10 grid gap-8 md:grid-cols-3">
        {#each features as feature, i}
          <div
            class="feature-3d group relative transform transition-all duration-700 hover:scale-105"
            class:translate-y-0={isFeaturesVisible}
            class:translate-y-20={!isFeaturesVisible}
            on:mouseenter={() => (hoveredFeature3D = i)}
            on:mouseleave={() => (hoveredFeature3D = -1)}
            style={`
            transition-delay: ${i * 150}ms;
            transform:
              rotateX(${(mousePos.y - window.innerHeight / 2) * 0.1}deg)
              rotateY(${(mousePos.x - window.innerWidth / 2) * 0.1}deg)
              scale(${hoveredFeature3D === i ? 1.05 : 1});
          `}
          >
            <div class="relative h-full rounded-3xl p-1">
              <!-- Gradient Border -->
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-r {feature.gradient} opacity-20 blur"></div>
              <div class="hologram-effect" />

              <div class="relative h-full overflow-hidden rounded-3xl bg-gray-800/40 p-8 backdrop-blur-xl">
                <!-- Background Gradient -->
                <div
                  class="absolute inset-0 bg-gradient-to-r {feature.gradient} opacity-0
                            transition-opacity duration-300 group-hover:opacity-10"
                ></div>

                <div class="content relative z-10">
                  <!-- Icon -->
                  <div class="mb-6 transform text-5xl transition-transform duration-300 group-hover:scale-110">
                    <span class="relative">
                      {feature.icon}
                      <div class="bg-white/20 absolute inset-0 blur-lg"></div>
                    </span>
                  </div>

                  <!-- Title -->
                  <h3 class="mb-4 bg-gradient-to-r text-2xl font-bold {feature.gradient} bg-clip-text text-transparent">
                    {feature.title}
                  </h3>

                  <!-- Description -->
                  <p class="mb-6 leading-relaxed text-gray-300">
                    {feature.description}
                  </p>

                  <!-- Metrics -->
                  <div class="space-y-2">
                    {#each feature.metrics as metric}
                      <div class="flex items-center space-x-2">
                        <div class="h-1.5 w-1.5 rounded-full bg-gradient-to-r {feature.gradient}"></div>
                        <span class="text-sm text-gray-400">{metric}</span>
                      </div>
                    {/each}
                  </div>

                  <!-- Hover Effect -->
                  <div
                    class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r {feature.gradient}
                              scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- AI Interaction Section -->
  <section class="bg-black/50 relative py-32">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-2 gap-12">
        <!-- Live AI Terminal -->
        <div class="col-span-1">
          <div class="h-[600px] rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 p-6">
            <div class="font-mono text-sm">
              <div class="mb-4 flex items-center space-x-2">
                <div class="h-2 w-2 rounded-full bg-emerald-400" />
                <span class="text-emerald-400">AI_ACTIVE</span>
              </div>

              <div class="space-y-2">
                {#each Array(10) as _, i}
                  <div class="terminal-line" style="animation-delay: {i * 0.2}s">
                    > {[
                      "EXECUTE LONG BTC @ ${(currentPrice * 1.002).toFixed(2)}",
                      "ANALYZING ORDER FLOW...",
                      "DETECTED WHALE ACTIVITY: 2.4K ETH",
                      "UPDATING RISK PARAMETERS...",
                      "NEURAL NET ACCURACY: 99.23%",
                    ][i % 5]}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>

        <!-- AI Chat Interface -->
        <div class="col-span-1">
          <div class="h-[600px] rounded-3xl bg-gray-900/50 p-6 backdrop-blur-xl">
            <div class="mb-6 flex items-center space-x-3">
              <div class="h-8 w-8 animate-pulse rounded-full bg-gradient-to-r from-indigo-600 to-purple-600" />
              <h3 class="text-xl font-semibold">AI Trading Assistant</h3>
            </div>

            <div class="h-[500px] overflow-y-auto">
              {#if aiResponse}
                <div class="chat-message ai">
                  <div class="typing-indicator">
                    {#each Array(3) as _, i}
                      <div class="dot" style="animation-delay: {i * 0.2}s" />
                    {/each}
                  </div>
                  {aiResponse}
                </div>
              {/if}
              {#if isAITyping && !aiResponse}
                <div class="chat-message ai">
                  <div class="typing-indicator">
                    {#each Array(3) as _, i}
                      <div class="dot" style="animation-delay: {i * 0.2}s" />
                    {/each}
                  </div>
                </div>
              {/if}
            </div>

            <button
              on:click={generateAIResponse}
              class="mt-4 w-full rounded-xl bg-indigo-600/20 p-4 hover:bg-indigo-600/30"
            >
              Request Market Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3D Neural Network Section -->
  <section class="relative py-32">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-white mb-8 text-3xl font-bold">Our Neural Network in Action</h2>
      <p class="mb-16 text-gray-400">Visualizing the complex algorithms that drive our AI trading platform.</p>
      <!-- 3D Neural Network Canvas wird direkt im Body platziert (durch Three.js Initialisierung) -->
    </div>
  </section>

  <!-- Trading Interface Section (INTEGRIERT) -->
  <section class="relative overflow-hidden py-24">
    <div class="container mx-auto px-6">
      <!-- Trading Interface Grid -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Main Chart Area -->
        <div class="relative col-span-8 rounded-3xl bg-gray-900/50 p-6 backdrop-blur-xl">
          <!-- Floating AI Analysis Panel -->
          <div class="absolute right-4 top-4 z-10">
            <button
              class="group relative rounded-xl bg-indigo-600/20 p-4 backdrop-blur-xl
                     transition-all duration-300 hover:bg-indigo-600/30"
              on:click={() => (showAIDetails = !showAIDetails)}
            >
              <!-- Neural Network Animation -->
              <div class="absolute inset-0 overflow-hidden rounded-xl opacity-20">
                {#each Array(20) as _, i}
                  <div
                    class="bg-white/50 absolute rounded-full"
                    style="
                      width: {2 + Math.random() * 4}px;
                      height: {2 + Math.random() * 4}px;
                      left: {Math.random() * 100}%;
                      top: {Math.random() * 100}%;
                      animation: pulse {1 + Math.random() * 2}s infinite;
                    "
                  ></div>
                {/each}
              </div>

              <div class="flex items-center space-x-3">
                <div class="h-2 w-2 animate-pulse rounded-full bg-indigo-400"></div>
                <span class="font-medium text-indigo-300">AI Analysis Active</span>
              </div>

              {#if showAIDetails}
                <div
                  class="absolute right-0 top-full mt-2 w-72 rounded-xl border
                            border-indigo-500/20 bg-gray-900/95 p-4 shadow-2xl backdrop-blur-xl"
                  transition:slide
                >
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <span class="text-gray-400">AI Confidence</span>
                      <span class="font-bold text-indigo-400">{aiConfidence}%</span>
                    </div>
                    <div class="space-y-2">
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-400">Sentiment</span>
                        <span class="text-emerald-400">{(aiAnalysis.sentiment * 100).toFixed(1)}% Bullish</span>
                      </div>
                      <div class="h-1.5 overflow-hidden rounded-full bg-gray-800">
                        <div
                          class="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all"
                          style="width: {aiAnalysis.sentiment * 100}%"
                        ></div>
                      </div>
                    </div>
                    <!-- Pattern Recognition -->
                    <div class="space-y-2">
                      <span class="text-sm text-gray-400">Detected Patterns</span>
                      {#each patterns as pattern}
                        <div class="flex items-center justify-between rounded-lg bg-gray-800/50 p-2">
                          <span class="text-gray-300">{pattern.name}</span>
                          <div class="flex items-center space-x-2">
                            <span class="text-xs text-indigo-400">{pattern.timeframe}</span>
                            <span class="text-xs text-emerald-400">{pattern.probability}%</span>
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                </div>
              {/if}
            </button>
          </div>

          <!-- Main Chart -->
          <div class="relative h-[500px] overflow-hidden rounded-xl bg-gray-800/30">
            <!-- Price Chart SVG -->
            <svg class="h-full w-full">
              <!-- Definiere Gradienten für Chart-Linien -->
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="rgba(99, 102, 241, 0.2)" />
                  <stop offset="100%" stop-color="rgba(99, 102, 241, 0)" />
                </linearGradient>
                <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="rgba(168, 85, 247, 0.2)" />
                  <stop offset="100%" stop-color="rgba(168, 85, 247, 0)" />
                </linearGradient>
              </defs>

              <!-- Zeichne Chart-Linien -->
              <path
                d={generateChartPath(prices.map((p) => p.price))}
                class="stroke-indigo-500"
                fill="url(#priceGradient)"
                stroke-width="2"
              />
              <path
                d={generateChartPath(prices.map((p) => p.prediction))}
                class="stroke-purple-500"
                stroke-dasharray="5,5"
                fill="none"
                stroke-width="2"
              />
            </svg>

            <!-- Order Flow Visualization -->
            <div class="absolute bottom-0 right-0 top-0 w-16 bg-gray-900/30">
              {#each orderFlowData as order}
                <div
                  class="absolute h-1 rounded-full transition-all duration-300"
                  style="
                    width: {order.size}%;
                    background: {order.side === 'buy' ? '#34D399' : '#EF4444'};
                    opacity: 0.6;
                    right: 0;
                    top: {((order.price - currentPrice + 100) / 200) * 100}%
                  "
                ></div>
              {/each}
            </div>
          </div>

          <!-- Technical Indicators -->
          <div class="mt-4 grid grid-cols-3 gap-4">
            {#each indicators as indicator}
              <div class="rounded-xl bg-gray-800/40 p-4 backdrop-blur-sm">
                <div class="flex items-center justify-between">
                  <span class="text-gray-400">{indicator.name}</span>
                  <span
                    class={`text-sm ${
                      indicator.trend === "bullish"
                        ? "text-emerald-400"
                        : indicator.trend === "bearish"
                          ? "text-red-400"
                          : "text-gray-400"
                    }`}
                  >
                    {indicator.value}
                  </span>
                </div>
                <div class="mt-2 h-1 overflow-hidden rounded-full bg-gray-700">
                  <div
                    class={`h-full ${
                      indicator.trend === "bullish"
                        ? "bg-emerald-500"
                        : indicator.trend === "bearish"
                          ? "bg-red-500"
                          : "bg-gray-500"
                    }`}
                    style="width: {Math.random() * 100}%"
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="col-span-4 space-y-4">
          <!-- Trading Signals -->
          <div class="rounded-2xl bg-gray-900/50 p-6 backdrop-blur-xl">
            <h3 class="mb-4 text-lg font-semibold text-gray-100">AI Trading Signals</h3>
            <!-- Live Signals -->
            {#each Array(3) as _, i}
              <div class="relative mb-4 rounded-xl bg-gray-800/40 p-4">
                <div class="mb-2 flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></div>
                    <span class="font-medium text-emerald-400">Strong Buy</span>
                  </div>
                  <span class="text-sm text-gray-400">5m ago</span>
                </div>
                <p class="mb-2 text-sm text-gray-300">
                  Multiple indicators suggest strong upward momentum with high volume support.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="rounded-full bg-gray-700/50 px-2 py-1 text-xs text-gray-300"> RSI: 65.4 </span>
                  <span class="rounded-full bg-gray-700/50 px-2 py-1 text-xs text-gray-300"> MACD Crossover </span>
                  <span class="rounded-full bg-emerald-400/20 px-2 py-1 text-xs text-emerald-400">
                    94% Confidence
                  </span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Stats Section -->
  <!-- Stats Section -->
  <section bind:this={statsSection} class="relative bg-gray-900/50 py-24">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        {#each stats as stat, i}
          <div class="flex flex-col items-center justify-center">
            <div class="relative h-24 w-24">
              <!-- Background Circle -->
              <svg class="absolute inset-0 h-full w-full rotate-90 transform" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gradient-{i}" x1="0%" y1="0%" x2="100%" y2="0%">
                    {#if i === 0}
                      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#a855f7;stop-opacity:1" />
                    {:else if i === 1}
                      <stop offset="0%" style="stop-color:#a855f7;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                    {:else}
                      <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#6366f1;stop-opacity:1" />
                    {/if}
                  </linearGradient>
                </defs>
                <!-- Base Circle -->
                <circle cx="50" cy="50" r="45" fill="none" stroke="#292929" stroke-width="5" />
                <!-- Progress Circle -->
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient-{i})"
                  stroke-width="5"
                  stroke-dasharray="283"
                  stroke-dashoffset={isStatsVisible ? 0 : 283}
                  class:transition-all={isStatsVisible}
                  style="transition-duration: 1500ms; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); stroke-linecap: round;"
                />
              </svg>

              <!-- Value Display -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div
                  class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent"
                >
                  {stat.value}
                </div>
              </div>
            </div>
            <div class="mt-4 text-center text-gray-300">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>
  <!-- Early Access Dialog -->
  {#if $earlyAccessOpen}
    <div class="fixed inset-0 z-40 bg-gray-950/80 backdrop-blur-sm" transition:fade></div>

    <div use:earlyAccessContent class="fixed inset-0 z-50 flex items-center justify-center p-4" transition:fade>
      <div
        class="w-full max-w-md rounded-3xl border border-gray-800 bg-gray-900 p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
        in:slide={{ duration: 300, easing: quintOut }}
      >
        <h2 use:earlyAccessTitle class="mb-4 text-2xl font-bold text-gray-100">Get Early Access</h2>

        <p class="mb-6 leading-relaxed text-gray-300">
          Be among the first to experience our revolutionary AI trading platform. Early members receive exclusive
          benefits and founding member pricing.
        </p>

        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <input
            type="email"
            bind:value={email}
            placeholder="Enter your email"
            required
            class="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3.5
               text-gray-200 placeholder-gray-500 transition-all duration-300
               focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />

          <button
            type="submit"
            disabled={submitting}
            class="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5
               font-medium text-gray-50 shadow-lg shadow-indigo-500/25 transition-all duration-300
               hover:-translate-y-0.5 hover:shadow-indigo-500/40 disabled:cursor-not-allowed
               disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {submitting ? "Processing..." : "Join Now"}
          </button>
        </form>

        <button
          use:earlyAccessClose
          class="absolute right-4 top-4 rounded-full p-2 text-gray-400
             transition-colors hover:bg-gray-800 hover:text-gray-200"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  :root {
    --deep-space: #0a0a12;
    --quantum-blue: #2a34f5;
    --neural-purple: #7c3aed;
    --hologram-pink: #ec4899;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-20px) scale(1.05);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.3;
    }
  }

  @keyframes chartLine {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  .chart-line {
    animation: chartLine 2s ease-out forwards;
  }

  .prediction-glow {
    filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.4));
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  :global(.group:hover .blur) {
    animation: pulse 4s infinite;
  }

  :global(.scroll-smooth) {
    scroll-behavior: smooth;
  }

  :global(body[data-state="open"]) {
    overflow: hidden;
  }

  :global(.gradient-animate) {
    background-size: 200% 200%;
    animation: gradientFlow 15s ease infinite;
  }

  @keyframes gradientFlow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* Trading Interface Section Styles (INTEGRIERT) */
  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.5;
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Neue Animationen */
  @keyframes terminal-scroll {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }

  .terminal-line {
    animation: terminal-scroll 20s linear infinite;
    opacity: 0.8;
    &:hover {
      opacity: 1;
      color: #818cf8;
    }
  }

  .hologram-effect {
    background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.1));
    filter: blur(30px);
    opacity: 0.3;
    transition: opacity 0.3s;
  }

  .feature-3d {
    transform-style: preserve-3d;
    transition:
      transform 0.3s,
      box-shadow 0.3s;
    perspective: 1000px;
    &:hover {
      box-shadow: 0 0 50px rgba(99, 102, 241, 0.2);
      .hologram-effect {
        opacity: 0.6;
      }
    }
  }

  .typing-indicator .dot {
    animation: pulse 1.4s infinite;
  }

  @keyframes scanline {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }

  .terminal::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.02) 51%, transparent 51%);
    animation: scanline 6s linear infinite;
    pointer-events: none;
  }
</style>
