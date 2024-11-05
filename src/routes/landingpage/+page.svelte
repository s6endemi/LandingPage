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

  // Canvas and particles
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let particles: { x: number; y: number; size: number; speed: number }[] = [];

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

  function initializeParticles() {
    if (!canvas || !ctx) return;

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.y -= particle.speed;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.fillStyle = "rgba(59, 130, 246, 0.1)";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
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
      // Initialize canvas and particles
      ctx = canvas?.getContext("2d")!;
      initializeParticles();

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

<svelte:window bind:scrollY on:scroll={updateScrollProgress} />

<!-- Particle Canvas -->
<canvas
  bind:this={canvas}
  class="pointer-events-none fixed inset-0 z-0 h-full w-full"
  width={window.innerWidth}
  height={window.innerHeight}
/>

<div class="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
  <!-- Navigation blur effect -->
  <div
    class="fixed left-0 right-0 top-0 z-30 h-20 bg-slate-50/80 backdrop-blur-xl transition-opacity duration-300"
    style="opacity: {Math.min(scrollY / 100, 1)}"
  />

  <!-- Navigation -->
  <nav class="container relative z-40 mx-auto px-6 py-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <span class="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">
          FitAI
        </span>
      </div>

      <button
        use:earlyAccessTrigger
        class="rounded-2xl bg-blue-600 px-6 py-2.5 font-medium text-slate-50 shadow-lg shadow-blue-200
               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-300"
      >
        Early Access
      </button>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="container relative mx-auto px-6 pb-32 pt-24 text-center">
    <!-- Decorative elements -->
    <div
      class="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2
                rounded-full bg-gradient-to-r from-blue-300/10 to-purple-300/10 blur-3xl"
    />
    <div
      class="absolute left-1/3 top-1/3 h-[400px] w-[400px]
                rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-2xl"
    />

    <div class="relative">
      <h1
        class="gradient-text mb-8 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-5xl
               font-bold tracking-tight text-transparent md:text-7xl"
        in:fly={{ y: 20, duration: 800, delay: 200 }}
      >
        Train Smarter<br />with AI
      </h1>

      <p
        class="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-slate-600"
        in:fly={{ y: 20, duration: 800, delay: 400 }}
      >
        Experience a new era of personal fitness with intelligent coaching that understands and adapts to your unique
        journey.
      </p>

      <div
        class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        in:fly={{ y: 20, duration: 800, delay: 600 }}
      >
        <button
          use:earlyAccessTrigger
          class="group rounded-2xl bg-blue-600 px-8 py-4 font-medium text-slate-50
                 shadow-lg shadow-blue-200 transition-all duration-300
                 hover:-translate-y-0.5 hover:shadow-blue-300"
        >
          Get Started
          <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
        <a
          href="#features"
          class="rounded-2xl bg-slate-50 px-8 py-4 font-medium text-slate-600 shadow-lg
                 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-slate-200"
        >
          Learn More
        </a>
      </div>
    </div>
  </header>
  <!-- Features Section -->
  <section id="features" bind:this={featuresSection} class="relative bg-slate-50 py-32">
    <div class="container mx-auto px-6">
      <div class="grid gap-8 md:grid-cols-3">
        {#each features as feature, i}
          <div
            class="transform rounded-3xl bg-gradient-to-b from-slate-50 to-blue-50 p-8
                   shadow-xl shadow-blue-100/50 transition-all duration-500
                   hover:-translate-y-1 hover:shadow-blue-200/50"
            class:translate-y-0={isFeaturesVisible}
            style="transition-delay: {i * 100}ms;"
            class:translate-y-20={!isFeaturesVisible}
          >
            <div class="mb-6 text-4xl">{feature.icon}</div>
            <h3 class="mb-4 text-xl font-semibold text-slate-800">{feature.title}</h3>
            <p class="leading-relaxed text-slate-600">{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Virtual Coach Section -->
  <section bind:this={coachSection} class="relative overflow-hidden py-32">
    <div class="absolute inset-0 bg-gradient-to-b from-blue-50 to-slate-50" />

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
          <h2 class="mb-6 text-4xl font-bold text-slate-800">Your 24/7 AI Fitness Partner</h2>

          <div class="space-y-6 text-slate-600">
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
                class="rotate-3 transform rounded-3xl bg-slate-50 p-6 shadow-2xl transition-transform duration-500 hover:rotate-0"
              >
                <!-- Add close button -->
                <button
                  on:click={closeChat}
                  class="absolute right-8 top-8 z-10 rounded-full p-2 text-slate-400
             transition-all duration-300 hover:bg-slate-100 hover:text-slate-600"
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
                        class="{message.type === 'ai' ? 'bg-blue-600 text-slate-50' : 'bg-slate-100 text-slate-700'} 
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
                      <div class="rounded-2xl bg-blue-600 p-4 text-slate-50 shadow-sm">
                        <div class="mb-2 text-sm opacity-80">AI Coach</div>
                        <div class="flex space-x-2">
                          <span class="h-2 w-2 animate-bounce rounded-full bg-slate-50" style="animation-delay: 0ms" />
                          <span
                            class="h-2 w-2 animate-bounce rounded-full bg-slate-50"
                            style="animation-delay: 150ms"
                          />
                          <span
                            class="h-2 w-2 animate-bounce rounded-full bg-slate-50"
                            style="animation-delay: 300ms"
                          />
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
                    class="flex-1 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3
               text-slate-800 placeholder-slate-400 transition-all duration-300
               focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100
               disabled:cursor-not-allowed disabled:opacity-80"
                  />
                  <button
                    type="submit"
                    class="group rounded-xl bg-blue-600 p-3 text-slate-50 shadow-lg
               shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5
               hover:shadow-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
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
                class="text-white fixed bottom-8 right-8 z-50 rounded-full bg-blue-600 p-4
           shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
            <div class="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-blue-200 opacity-20" />
            <div class="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-purple-200 opacity-20" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section bind:this={statsSection} class="relative bg-slate-50 py-24">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        {#each stats as stat, i}
          <div
            class="transform text-center"
            class:translate-y-0={isStatsVisible}
            style="transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) {i * 200}ms;"
            class:translate-y-20={!isStatsVisible}
          >
            <div class="mb-2 text-4xl font-bold text-blue-600">{stat.value}</div>
            <div class="text-slate-600">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Early Access Dialog -->
  {#if $earlyAccessOpen}
    <div class="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm" transition:fade />

    <div use:earlyAccessContent class="fixed inset-0 z-50 flex items-center justify-center p-4" transition:fade>
      <div
        class="w-full max-w-md rounded-3xl bg-slate-50 p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
        in:slide={{ duration: 300, easing: quintOut }}
      >
        <h2 use:earlyAccessTitle class="mb-4 text-2xl font-bold text-slate-800">Join the Future of Fitness</h2>

        <p class="mb-6 leading-relaxed text-slate-600">
          Be among the first to experience our revolutionary AI fitness coach. Early members receive exclusive benefits
          and founding member pricing.
        </p>

        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <input
            type="email"
            bind:value={email}
            placeholder="Enter your email"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5
                   text-slate-800 placeholder-slate-400 transition-all duration-300
                   focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="submit"
            disabled={submitting}
            class="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-medium text-slate-50
                   shadow-lg shadow-blue-200 transition-all duration-300
                   hover:-translate-y-0.5 hover:shadow-blue-300 disabled:cursor-not-allowed
                   disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {submitting ? "Joining..." : "Join the Waitlist"}
          </button>
        </form>

        <button
          use:earlyAccessClose
          class="absolute right-4 top-4 rounded-full p-2
                 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
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

  :global(.animate-pulse) {
    animation: pulse 2s infinite;
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
</style>
