<script lang="ts">
  import { createDialog } from "@melt-ui/svelte";
  import { fade, slide, fly } from "svelte/transition";
  import { quintOut, cubicInOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

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
  let scrollY: number;
  let scrollProgress = 0;

  // Chat related state
  let userInput = "";
  let isTyping = false;
  let isDemoRunning = true;
  let demoInput = "";
  let isChatOpen = true;
  let messages = [
    {
      type: "ai",
      text: "Based on your recent progress, I suggest increasing your weight for bench press by 5kg. How does that feel?",
    },
  ];

  // Canvas and Nodes
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let nodes: { x: number; y: number; size: number; speed: number; color: string; hue: number }[] = [];

  // Intersection Observer elements
  let coachSection: HTMLElement;
  let isCoachVisible = false;
  let statsSection: HTMLElement;
  let isStatsVisible = false;
  let featuresSection: HTMLElement;
  let isFeaturesVisible = false;
  let chatContainer: HTMLElement;
  let isChatVisible = false;

  // Demo messages
  const demoUserMessage = "I've been feeling stronger lately, so that sounds good!";
  const demoAiResponse =
    "That's great to hear! I'll update your workout plan. Remember to maintain proper form and let me know if you need to adjust the weight during your session. Your safety and progress are my top priorities! 💪";

  // Add to your existing script section
  let activeFeatureIndex = 0;

  const futureFeatures = [
    {
      id: 1,
      title: "Neural Form Analysis",
      description: "Real-time AI-powered form correction with 99.9% accuracy",
      icon: "🧠",
      gradient: "from-indigo-600 to-purple-600",
      metrics: ["99.9% Accuracy", "0.1ms Response", "3D Analysis"],
    },
    {
      id: 2,
      title: "Quantum Performance",
      description: "Next-gen performance tracking using quantum computing algorithms",
      icon: "⚡",
      gradient: "from-purple-600 to-pink-600",
      metrics: ["100x Faster", "DNA Integration", "Predictive AI"],
    },
    {
      id: 3,
      title: "Holographic Training",
      description: "Immersive 3D holographic workout experience with your AI coach",
      icon: "✨",
      gradient: "from-pink-600 to-indigo-600",
      metrics: ["4K Resolution", "Zero Latency", "Full 3D"],
    },
  ];

  function initializeNodes() {
    if (!canvas || !ctx) return;

    // Create nodes with color properties
    nodes = [];
    for (let i = 0; i < 80; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.3 + 0.1,
        color: `rgba(150, 150, 150, 0.3)`,
        // Add hue for gradient connections
        hue: Math.random() * 360,
      });
    }

    function drawConnections() {
      if (!ctx || !canvas) return;

      ctx.lineCap = "round";
      ctx.lineWidth = 0.8;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            // Create gradient for each connection
            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);

            // Calculate opacity based on distance
            const opacity = 1 - distance / 120;

            // Create gradient with subtle color transitions
            gradient.addColorStop(0, `hsla(${nodes[i].hue}, 70%, 70%, ${opacity * 0.2})`);
            gradient.addColorStop(1, `hsla(${nodes[j].hue}, 70%, 70%, ${opacity * 0.2})`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Add subtle glow effect
            ctx.shadowBlur = 5;
            ctx.shadowColor = `hsla(${(nodes[i].hue + nodes[j].hue) / 2}, 70%, 70%, ${opacity * 0.3})`;
          }
        }
      }
      // Reset shadow effect
      ctx.shadowBlur = 0;
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      nodes.forEach((node) => {
        node.y -= node.speed;
        if (node.y < 0) {
          node.y = canvas.height;
          // Update hue when particle resets
          node.hue = (node.hue + 1) % 360;
        }
      });

      drawConnections();

      // Draw nodes with subtle glow
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

  function updateScrollProgress() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress = (winScroll / height) * 100;
  }

  async function runChatDemo() {
    if (!isChatVisible) return;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate typing
    const typingSpeed = 50; // ms per character
    for (let i = 0; i <= demoUserMessage.length; i++) {
      if (!isChatVisible) return;
      userInput = demoUserMessage.slice(0, i);
      await new Promise((resolve) => setTimeout(resolve, typingSpeed));
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    messages = [...messages, { type: "user", text: demoUserMessage }];
    userInput = "";

    isTyping = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));

    messages = [...messages, { type: "ai", text: demoAiResponse }];
    isTyping = false;
    isDemoRunning = false;
  }

  function closeChat() {
    isChatOpen = false;
  }

  async function handleUserMessage(e: Event) {
    e.preventDefault();
    if (!userInput.trim() || isDemoRunning) return;

    messages = [...messages, { type: "user", text: userInput }];
    const userQuestion = userInput;
    userInput = "";
    isTyping = true;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    messages = [
      ...messages,
      {
        type: "ai",
        text: "I've noted your response! Let's keep tracking your progress and adjust the plan as needed. Is there anything specific you'd like to focus on in your next session?",
      },
    ];
    isTyping = false;
  }

  async function handleSubmit() {
    submitting = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    submitting = false;
    earlyAccessOpen.set(false);
    email = "";
  }

  // Stats animation function
  function animateValue(start: number, end: number, duration: number) {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
      return value;
    };
    return step;
  }

  const features = [
    {
      icon: "⚡️",
      title: "Intelligent Coaching",
      description: "Personalized guidance that adapts to you",
    },
    {
      icon: "🎯",
      title: "Real-Time Analysis",
      description: "Instant feedback on your performance",
    },
    {
      icon: "✨",
      title: "Smart Progress",
      description: "Track your journey with precision",
    },
  ];

  const stats = [
    { value: "24/7", label: "AI Availability" },
    { value: "92%", label: "User Goal Achievement" },
    { value: "<2min", label: "Response Time" },
  ];

  onMount(() => {
    if (browser) {
      // Initialize canvas and nodes
      ctx = canvas?.getContext("2d")!;
      initializeNodes();

      // Set up intersection observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === coachSection) isCoachVisible = entry.isIntersecting;
            if (entry.target === statsSection) isStatsVisible = entry.isIntersecting;
            if (entry.target === featuresSection) isFeaturesVisible = entry.isIntersecting;
            if (entry.target === chatContainer) {
              isChatVisible = entry.isIntersecting;
              if (isChatVisible && isDemoRunning) {
                runChatDemo();
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(coachSection);
      observer.observe(statsSection);
      observer.observe(featuresSection);
      observer.observe(chatContainer);

      return () => {
        observer.disconnect();
      };
    }
  });
</script>

<!-- Particle Canvas -->
<canvas
  bind:this={canvas}
  class="pointer-events-none fixed inset-0 z-0 h-full w-full"
  width={window.innerWidth}
  height={window.innerHeight}
/>

<div class="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
  <!-- Hero Section -->
  <header class="container relative mx-auto px-6 pb-32 pt-24 text-center">
    <!-- Updated decorative elements with premium dark theme -->
    <div
      class="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2
                rounded-full bg-gradient-to-r from-indigo-600/10 to-pink-600/10 blur-3xl"
    />
    <div
      class="absolute left-1/3 top-1/3 h-[400px] w-[400px]
                rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-2xl"
    />

    <div class="relative">
      <h1
        class="mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-5xl
               font-bold tracking-tight text-transparent md:text-7xl"
        in:fly={{ y: 20, duration: 800, delay: 200 }}
      >
        Train Smarter<br />with AI
      </h1>

      <p
        class="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-300"
        in:fly={{ y: 20, duration: 800, delay: 400 }}
      >
        Experience a new era of personal fitness with intelligent coaching that understands and adapts to your unique
        journey.
      </p>
      <p
        class="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-300"
        in:fly={{ y: 20, duration: 850, delay: 450 }}
      >
        Powered by advanced neural networks and real-time biometric analysis, our platform combines cutting-edge AI
        technology with deep learning algorithms to revolutionize your fitness journey. Experience personalized coaching
        that adapts in real-time, backed by quantum computing capabilities and precise motion tracking that's trusted by
        professional athletes and sports scientists worldwide.
      </p>

      <div
        class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        in:fly={{ y: 20, duration: 800, delay: 600 }}
      >
        <button
          use:earlyAccessTrigger
          class="text-white group rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8
                 py-4 font-medium shadow-lg shadow-indigo-500/25 transition-all duration-300
                 hover:-translate-y-0.5 hover:shadow-indigo-500/40"
        >
          Get Started
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
    </div>
  </header>
  <!-- Features Section -->
  <section id="features" bind:this={featuresSection} class="relative mt-[50vh] overflow-hidden py-32">
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-800/30 to-gray-900/50"></div>

    <!-- Animated Background Elements -->
    {#each Array(8) as _, i}
      <div
        class="absolute rounded-full bg-gradient-to-r from-indigo-600/5 to-purple-600/5 blur-3xl"
        style="
          width: {200 + Math.random() * 300}px;
          height: {200 + Math.random() * 300}px;
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          transform: scale({0.8 + Math.random() * 0.5});
          animation: float-{i} {15 + Math.random() * 10}s infinite ease-in-out;
        "
      ></div>
    {/each}

    <div class="container relative mx-auto px-6">
      <!-- Section Header -->
      <div
        class="mb-20 transform text-center transition-all duration-700"
        class:translate-y-0={isFeaturesVisible}
        class:translate-y-20={!isFeaturesVisible}
        style="transition-delay: 100ms;"
      >
        <h2
          class="mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
        >
          Core Features
        </h2>
        <div class="mt-6 flex flex-wrap justify-center gap-4">
          <span class="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300"
            >Neural Networks</span
          >
          <span class="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300"
            >Quantum Processing</span
          >
          <span class="rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-300"
            >Motion Tracking</span
          >
          <span class="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300"
            >Biometric Analysis</span
          >
        </div>
      </div>

      <!-- Enhanced Features Grid -->
      <div class="relative z-10 grid gap-8 md:grid-cols-3">
        {#each [{ icon: "⚡️", title: "Advanced AI Coaching", description: "Harness the power of neural networks for personalized workout plans that evolve with your progress, ensuring optimal performance at every level.", metrics: ["98% Accuracy", "24/7 Availability", "Real-time Adaptation"], gradient: "from-indigo-600 to-blue-600" }, { icon: "🎯", title: "Precision Analytics", description: "Track every aspect of your performance with medical-grade accuracy and actionable insights, designed for athletes of all skill levels.", metrics: ["0.1% Margin of Error", "3D Motion Analysis", "Predictive Modeling"], gradient: "from-purple-600 to-pink-600" }, { icon: "✨", title: "Smart Progress Engine", description: "Our AI continuously optimizes your training based on thousands of data points and latest research, providing you with real-time feedback and form correction.", metrics: ["Adaptive Learning", "Bio-Feedback", "Goal Optimization"], gradient: "from-pink-600 to-indigo-600" }] as feature, i}
          <div
            class="group relative transform transition-all duration-700 hover:scale-105"
            class:translate-y-0={isFeaturesVisible}
            class:translate-y-20={!isFeaturesVisible}
            style="transition-delay: {i * 150}ms;"
          >
            <!-- Card Container -->
            <div class="relative h-full rounded-3xl p-1 transition-all duration-300">
              <!-- Gradient Border -->
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-r {feature.gradient} opacity-20 blur"></div>

              <!-- Glass Background -->
              <div class="relative h-full overflow-hidden rounded-3xl bg-gray-800/40 p-8 backdrop-blur-xl">
                <!-- Animated Background Gradient -->
                <div
                  class="absolute inset-0 bg-gradient-to-r {feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                ></div>

                <!-- Content -->
                <div class="relative z-10">
                  <!-- Icon with Glow -->
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

                  <!-- Hover Effect Decoration -->
                  <div
                    class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r {feature.gradient} scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Virtual Coach Section -->
  <section bind:this={coachSection} class="relative overflow-hidden py-32">
    <div class="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

    <!-- Animated circles background -->
    <div class="absolute inset-0 overflow-hidden">
      {#each Array(5) as _, i}
        <div
          class="absolute rounded-full bg-blue-400 opacity-10"
          style="
            width: {120 + i * 40}px;
            height: {120 + i * 40}px;
            left: {50 + Math.sin(i * 1.5) * 50}%;
            top: {50 + Math.cos(i * 1.5) * 50}%;
            transform: translate(-50%, -50%);
            animation: float-{i} {8 + i * 2}s infinite ease-in-out;
          "
        />
      {/each}
    </div>

    <div class="container relative mx-auto px-6">
      <div class="grid items-center gap-16 md:grid-cols-2">
        <!-- Coach Description -->
        <div class:translate-x-0={isCoachVisible} class="translate-x-full transition-transform delay-300 duration-1000">
          <h2 class="mb-6 text-4xl font-bold text-gray-100">Your 24/7 AI Fitness Partner</h2>

          <div class="space-y-6 text-gray-300">
            <p class="leading-relaxed">
              Meet your personal AI fitness coach that's always there when you need it. No more scheduling conflicts or
              waiting for responses.
            </p>

            <!-- Coach Features -->
            <div class="space-y-4">
              {#each [{ icon: "🤖", text: "Always available for instant guidance and support" }, { icon: "🧠", text: "Learns and adapts to your unique fitness style" }, { icon: "📱", text: "Accessible through any device, anywhere" }, { icon: "🎨", text: "Personalized workout plans that evolve with you" }] as feature}
                <div class="flex items-start space-x-3">
                  <span class="text-xl">{feature.icon}</span>
                  <span class="leading-tight">{feature.text}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Interactive Coach Visual -->
        <div class:opacity-100={isCoachVisible} class="opacity-0 transition-opacity delay-500 duration-1000">
          <div class="relative">
            <!-- Coach Interface Mockup -->
            <div
              bind:this={chatContainer}
              class="relative translate-y-4 transform opacity-0 transition-all duration-700"
              class:opacity-100={isChatVisible}
              class:translate-y-0={isChatVisible}
              class:hidden={!isChatOpen}
            >
              <div
                class="rotate-3 transform rounded-3xl bg-gray-800 p-6 shadow-2xl transition-transform duration-500 hover:rotate-0"
              >
                <!-- Add close button -->
                <button
                  on:click={closeChat}
                  class="absolute right-8 top-8 z-10 rounded-full p-2 text-gray-400
             transition-all duration-300 hover:bg-gray-700 hover:text-gray-200"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div class="mb-4 max-h-[300px] space-y-4 overflow-y-auto">
                  {#each messages as message}
                    <div
                      class="flex {message.type === 'ai' ? 'justify-start' : 'justify-end'}"
                      in:fly={{ y: 20, duration: 400 }}
                    >
                      <div
                        class="{message.type === 'ai' ? 'bg-indigo-600 text-gray-50' : 'bg-gray-700 text-gray-200'} 
              max-w-[80%] rounded-2xl p-4 shadow-sm"
                      >
                        {#if message.type === "ai"}
                          <div class="mb-2 text-sm opacity-80">AI Coach</div>
                        {/if}
                        <div class="font-medium">{message.text}</div>
                      </div>
                    </div>
                  {/each}

                  {#if isTyping}
                    <div class="flex justify-start" in:fly={{ y: 20, duration: 400 }}>
                      <div class="rounded-2xl bg-indigo-600 p-4 text-gray-50 shadow-sm">
                        <div class="mb-2 text-sm opacity-80">AI Coach</div>
                        <div class="flex space-x-2">
                          <span class="h-2 w-2 animate-bounce rounded-full bg-gray-50" style="animation-delay: 0ms" />
                          <span class="h-2 w-2 animate-bounce rounded-full bg-gray-50" style="animation-delay: 150ms" />
                          <span class="h-2 w-2 animate-bounce rounded-full bg-gray-50" style="animation-delay: 300ms" />
                        </div>
                      </div>
                    </div>
                  {/if}
                </div>

                <form on:submit={handleUserMessage} class="relative flex items-center space-x-3">
                  <input
                    type="text"
                    bind:value={userInput}
                    placeholder="Type your response..."
                    disabled={isDemoRunning}
                    class="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-4 py-3
               text-gray-200 placeholder-gray-500 transition-all duration-300
               focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20
               disabled:cursor-not-allowed disabled:opacity-80"
                  />
                  <button
                    type="submit"
                    class="group rounded-xl bg-indigo-600 p-3 text-gray-50 shadow-lg
               shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5
               hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isDemoRunning || !userInput.trim()}
                  >
                    <svg
                      class="h-6 w-6 transform transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
            {#if !isChatOpen}
              <button
                on:click={() => (isChatOpen = true)}
                class="fixed bottom-8 right-8 z-50 rounded-full bg-indigo-600 p-4 text-gray-50
           shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1
           hover:shadow-indigo-500/40"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z"
                  />
                </svg>
              </button>
            {/if}

            <!-- Decorative Elements -->
            <div class="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-indigo-600/20 blur-lg" />
            <div class="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-purple-600/20 blur-lg" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section bind:this={statsSection} class="relative bg-gray-900/50 py-24">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        {#each stats as stat, i}
          <div class="flex flex-col items-center justify-center">
            <div class="relative h-24 w-24">
              <!-- Background Circle -->
              <svg class="absolute inset-0 h-full w-full rotate-90 transform" viewBox="0 0 100 100">
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
                  stroke-dashoffset={isStatsVisible
                    ? 283 *
                      (1 - (stat.value === "24/7" ? 1 : stat.value === "<2min" ? 0.9 : parseFloat(stat.value) / 100))
                    : 283}
                  class:transition-all={isStatsVisible}
                  style="transition-duration: 1500ms; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); stroke-linecap: round;"
                />
              </svg>
              <!-- Gradient Definitions (inside the SVG) -->
              <svg class="absolute inset-0 h-full w-full">
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
              </svg>

              <!-- Value -->
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
    <div class="fixed inset-0 z-40 bg-gray-950/80 backdrop-blur-sm" transition:fade />

    <div use:earlyAccessContent class="fixed inset-0 z-50 flex items-center justify-center p-4" transition:fade>
      <div
        class="w-full max-w-md rounded-3xl border border-gray-800 bg-gray-900 p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
        in:slide={{ duration: 300, easing: quintOut }}
      >
        <h2 use:earlyAccessTitle class="mb-4 text-2xl font-bold text-gray-100">Join the Future of Fitness</h2>

        <p class="mb-6 leading-relaxed text-gray-300">
          Be among the first to experience our revolutionary AI fitness coach. Early members receive exclusive benefits
          and founding member pricing.
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
            {submitting ? "Joining..." : "Join the Waitlist"}
          </button>
        </form>

        <button
          use:earlyAccessClose
          class="absolute right-4 top-4 rounded-full p-2
                 text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-200"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  {/if}

  <!-- Add after the Features Section -->
  <section class="relative overflow-hidden py-32">
    <!-- Dynamic Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950">
      {#each Array(20) as _, i}
        <div
          class="absolute rounded-full bg-gradient-to-r from-indigo-600/10 to-purple-600/10 blur-3xl"
          style="
            width: {100 + Math.random() * 200}px;
            height: {100 + Math.random() * 200}px;
            left: {Math.random() * 100}%;
            top: {Math.random() * 100}%;
            transform: scale({0.5 + Math.random()});
            opacity: {0.1 + Math.random() * 0.1};
            animation: float-{i} {10 + Math.random() * 20}s infinite ease-in-out;
          "
        />
      {/each}
    </div>

    <div class="container relative mx-auto px-6">
      <div class="mb-16 text-center">
        <h2
          class="mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text
                 text-5xl font-bold text-transparent"
        >
          The Future of Fitness
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-gray-400">Experience tomorrow's training technology, today</p>
      </div>

      <div class="grid items-center gap-16 lg:grid-cols-2">
        <!-- Interactive Feature Cards -->
        <div class="space-y-6">
          {#each futureFeatures as feature, index}
            <div
              class="group relative cursor-pointer rounded-2xl p-8 transition-all duration-300 hover:bg-gray-800/50"
              on:mouseenter={() => (activeFeatureIndex = index)}
            >
              <!-- Static Gradient Background -->
              <div
                class="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 transition-opacity
                       duration-300 group-hover:opacity-10 {feature.gradient}"
              />

              <div class="relative">
                <!-- Header -->
                <div class="mb-4 flex items-center gap-4">
                  <span class="text-3xl">{feature.icon}</span>
                  <h3 class="text-xl font-semibold text-gray-100">{feature.title}</h3>
                </div>

                <!-- Description -->
                <p class="mb-4 text-gray-400">{feature.description}</p>

                <!-- Metrics -->
                <div class="flex gap-4">
                  {#each feature.metrics as metric}
                    <div
                      class="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300
                             transition-all duration-300 group-hover:bg-gradient-to-r
                             group-hover:{feature.gradient} group-hover:text-white"
                    >
                      {metric}
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Visual Preview -->
        <div class="relative aspect-square">
          <div
            class="absolute inset-0 transform overflow-hidden rounded-3xl bg-gradient-to-b
                   from-gray-800/50 to-gray-900/50 p-8 backdrop-blur-lg transition-transform
                   duration-500 hover:scale-105"
          >
            <!-- Animated Decoration -->
            {#each Array(3) as _, i}
              <div
                class="absolute rounded-full bg-gradient-to-r {futureFeatures[activeFeatureIndex].gradient}"
                style="
                  width: {200 + i * 100}px;
                  height: {200 + i * 100}px;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  opacity: {0.1 - i * 0.02};
                  animation: pulse {3 + i}s infinite ease-in-out;
                "
              />
            {/each}

            <!-- Feature Icon -->
            <div class="relative flex h-full items-center justify-center">
              <span class="animate-float text-8xl">
                {futureFeatures[activeFeatureIndex].icon}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .float-element {
    animation: float 6s ease-in-out infinite;
    transform-style: preserve-3d;
    perspective: 1000px;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) rotateX(0) rotateY(0);
    }
    25% {
      transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
    }
    75% {
      transform: translateY(10px) rotateX(-5deg) rotateY(-5deg);
    }
  }
  @keyframes chatAppear {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  :global(.animate-pulse) {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  :global(.scroll-smooth) {
    scroll-behavior: smooth;
  }
  :global(.animate-bounce) {
    animation: bounce 1s infinite;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-25%);
    }
  }

  @keyframes float-0 {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
  @keyframes float-1 {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1.1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  @keyframes float-2 {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
  @keyframes float-3 {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1.2);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
  @keyframes float-4 {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1.1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.3);
    }
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body[data-state="open"]) {
    overflow: hidden;
  }

  /* Add new gradient animation */
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

  :global(.gradient-animate) {
    background-size: 200% 200%;
    animation: gradientFlow 15s ease infinite;
  }

  /* Add these animations to your existing style section */
  @keyframes slide {
    0% {
      transform: translateY(100%) rotate(45deg);
    }
    100% {
      transform: translateY(-100%) rotate(45deg);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
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

  :global(.group:hover .blur) {
    animation: pulse 4s infinite;
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
</style>
