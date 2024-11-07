<script lang="ts">
  import { createDialog } from "@melt-ui/svelte";
  import { fade, slide, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { Brain, Activity, TrendingUp, Dumbbell, Calendar, GitCommit } from "lucide-svelte";

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
  let scrollY = 0;
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
  let width = 0;
  let height = 0;

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

    // Set canvas dimensions
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1 + 3,
        speed: Math.random() * 0.3 + 0.1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.y -= particle.speed;
        if (particle.y < 0) particle.y = height;

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

  const features = [
    {
      icon: Brain,
      title: "Intelligent Coaching",
      description: "AI-powered personal training that learns and adapts to your unique fitness journey",
    },
    {
      icon: Activity,
      title: "Real-Time Analysis",
      description: "Instant feedback on your form, performance, and progress to optimize every workout",
    },
    {
      icon: TrendingUp,
      title: "Smart Progress Tracking",
      description: "Advanced analytics and insights to help you reach your fitness goals faster",
    },
    {
      icon: Dumbbell,
      title: "Custom Workouts",
      description: "Personalized exercise plans that adjust based on your performance and recovery",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Workout plans that adapt to your schedule, not the other way around",
    },
    {
      icon: GitCommit,
      title: "Goal Setting",
      description: "Smart milestone tracking and achievement system to keep you motivated",
    },
  ];

  let windowWidth = 0;
  let windowHeight = 0;

  onMount(() => {
    // Initialize canvas and particles
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    ctx = canvas?.getContext("2d")!;
    initializeParticles();

    // Handle window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
        initializeParticles();
      }
    };
    window.addEventListener("resize", handleResize);

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
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

<svelte:window bind:scrollY on:scroll={updateScrollProgress} />

<!-- Rest of your HTML code remains exactly the same -->

<!-- Particle Canvas -->
<canvas
  bind:this={canvas}
  class="pointer-events-none fixed inset-0 z-0 h-full w-full"
  width={windowWidth}
  height={windowHeight}
/>

<div class="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
  <!-- Navigation blur effect -->
  <div
    class="fixed left-0 right-0 top-0 z-30 h-20 bg-slate-50/80 backdrop-blur-xl transition-opacity duration-300"
    style="opacity: {Math.min(scrollY / 100, 1)}"
  />

  <!-- Hero Section -->
  <header class="container relative mx-auto overflow-hidden px-4 pb-32 pt-24 text-center sm:px-6">
    <div
      class="absolute left-1/2 top-1/2 aspect-square h-full max-w-full -translate-x-1/2 -translate-y-1/2
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
  <section id="features" bind:this={featuresSection} class="relative py-32">
    <h2 class="mb-12 text-center text-4xl font-bold text-slate-800">Why Choose FitAI?</h2>
    <div class="container mx-auto px-6">
      <div class="grid gap-8 md:grid-cols-3">
        {#each features as feature}
          <div
            class="transform rounded-3xl bg-gradient-to-b from-slate-50 to-blue-50 p-8
                    shadow-xl shadow-blue-100/50 transition-all duration-500
                    hover:-translate-y-1 hover:shadow-blue-200/50"
          >
            <div class="mb-6">
              <svelte:component this={feature.icon} class="h-8 w-8 text-blue-500" strokeWidth={1.5} />
            </div>
            <h3 class="mb-4 text-xl font-semibold text-slate-800">{feature.title}</h3>
            <p class="leading-relaxed text-slate-600">{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Virtual Coach Section -->
  <section bind:this={coachSection} class="relative overflow-hidden py-32">
    <!-- Background transitions -->
    <div class="pointer-events-none absolute inset-0 z-0">
      <!-- Base color -->
      <div class="from-white to-white absolute inset-0 bg-gradient-to-b via-[#f8faff]"></div>
      <!-- Radial gradient for smooth edges -->
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(219,234,254,0.15)_0%,transparent_70%)]"
      ></div>
    </div>
    <div class="container relative z-10 mx-auto px-4 md:px-6">
      <div class="mx-auto mb-32 flex max-w-4xl flex-col items-center text-center md:mb-48">
        <!-- Coach Description -->
        <div
          class:translate-y-0={isCoachVisible}
          class="w-full translate-y-8 transition-transform delay-300 duration-1000"
        >
          <div class="mb-6 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
            Your 24/7 Companion
          </div>

          <h2 class="mb-6 text-3xl font-bold text-slate-800 md:text-4xl">
            Experience the Future of<br class="hidden md:block" />Personal Training
          </h2>

          <div class="space-y-8 text-slate-600">
            <p class="mx-auto max-w-2xl text-base leading-relaxed md:text-lg">
              Meet your AI fitness coach that combines the expertise of professional trainers with the convenience of
              modern technology. Available whenever, wherever you need guidance, motivation, or answers.
            </p>

            <!-- Coach Features -->
            <div class="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
              {#each [{ icon: "🤖", text: "Always available for instant guidance and support" }, { icon: "🧠", text: "Learns and adapts to your unique fitness style" }, { icon: "📱", text: "Accessible through any device, anywhere" }, { icon: "🥗", text: "Detailed meal plans and dietary advice tailored to your goals" }, { icon: "📊", text: "Real-time performance monitoring and goal adjustments" }, { icon: "🎨", text: "Personalized workout plans that evolve with you" }] as feature}
                <div class="bg-white/50 flex items-center space-x-4 rounded-xl p-4 shadow-sm">
                  <span class="flex-shrink-0 text-2xl md:text-3xl">{feature.icon}</span>
                  <span class="text-left text-sm leading-tight md:text-base">{feature.text}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Interactive Coach Visual -->
        <div
          class:opacity-100={isCoachVisible}
          class="relative z-30 opacity-0 transition-opacity delay-500 duration-1000"
        >
          <div class="relative z-30">
            <!-- Coach Interface Mockup -->
            <div
              bind:this={chatContainer}
              class="relative z-30 translate-y-4 transform opacity-0 transition-all duration-700"
              class:opacity-100={isChatVisible}
              class:translate-y-0={isChatVisible}
              class:hidden={!isChatOpen}
            >
              <div
                class="relative z-30 max-w-sm rotate-3 transform rounded-3xl bg-slate-50 p-6 shadow-2xl transition-transform duration-500 hover:rotate-0 md:max-w-md"
              >
                <!-- Add close button -->
                <button
                  on:click={closeChat}
                  class="absolute right-8 top-8 z-40 rounded-full p-2 text-slate-400
     transition-all duration-300 hover:bg-slate-100 hover:text-slate-600"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <!-- Chat Header -->
                <div class="relative z-30 mb-6 flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="h-10 w-10 rounded-full bg-blue-100 p-2">
                      <svg class="h-full w-full text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-slate-800">Coach</h3>
                      <div class="flex items-center space-x-1">
                        <span class="h-2 w-2 rounded-full bg-green-500"></span>
                        <span class="text-sm text-slate-500">Online</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="relative z-30 mb-4 max-h-[300px] space-y-4 overflow-y-auto">
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

                <form on:submit={handleUserMessage} class="relative z-40 flex items-center space-x-3">
                  <input
                    type="text"
                    bind:value={userInput}
                    placeholder="Type your response..."
                    disabled={isDemoRunning}
                    class="z-40 flex-1 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3
       text-slate-800 placeholder-slate-400 transition-all duration-300
       focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100
       disabled:cursor-not-allowed disabled:opacity-80"
                  />
                  <button
                    type="submit"
                    disabled={isDemoRunning || !userInput.trim()}
                    class="text-white group z-40 rounded-xl bg-blue-600 p-3 shadow-lg
               transition-all duration-300 hover:-translate-y-0.5
               disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg
                      class="h-6 w-6 transition-transform group-hover:translate-x-0.5"
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

            <!-- Chat Toggle Button (when chat is closed) -->
            {#if !isChatOpen}
              <button
                on:click={() => (isChatOpen = true)}
                class="text-white fixed bottom-8 right-8 z-50 flex items-center space-x-2 rounded-full bg-blue-600 px-6
         py-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z"
                  />
                </svg>
                <span class="font-medium">Chat with your Coach</span>
              </button>
            {/if}
            <!-- Decorative Elements -->
            <div class="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-blue-200 opacity-20" />
            <div class="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-purple-200 opacity-20" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="relative overflow-hidden py-16 md:py-24">
    <div class="container mx-auto px-4 md:px-6">
      <!-- iOS-style device frame -->
      <div class="relative mx-auto max-w-5xl">
        <!-- Glass morphism background -->
        <div
          class="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-blue-50/50 to-purple-50/50 shadow-2xl backdrop-blur-xl"
        ></div>

        <div class="relative grid gap-8 p-8 md:grid-cols-2 md:gap-12 md:p-12">
          <!-- Left Column: Feature Cards -->
          <div class="space-y-6">
            <!-- Feature Card 1 -->
            <div class="transform transition-all duration-300 hover:-translate-y-1">
              <div class="bg-white/70 border-white/20 rounded-2xl border p-6 shadow-lg backdrop-blur-lg">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 shadow-lg">
                    <svg class="text-white h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-slate-800">Smart Tracking</h3>
                    <p class="mt-1 text-sm text-slate-600">Automatic progress monitoring and milestone tracking</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Feature Card 2 -->
            <div class="transform transition-all duration-300 hover:-translate-y-1">
              <div class="bg-white/70 border-white/20 rounded-2xl border p-6 shadow-lg backdrop-blur-lg">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 shadow-lg">
                    <svg class="text-white h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-slate-800">Real-Time Insights</h3>
                    <p class="mt-1 text-sm text-slate-600">Instant feedback and performance analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: iOS Screen Preview -->
          <div class="relative flex items-center justify-center">
            <!-- iOS Device Frame -->
            <div class="relative h-[580px] w-[280px] rounded-[3rem] bg-slate-900 p-4 shadow-2xl">
              <!-- Screen Content -->
              <div class="bg-white relative h-full w-full overflow-hidden rounded-[2.3rem]">
                <!-- Status Bar -->
                <div class="absolute inset-x-0 top-0 flex h-6 items-center justify-between bg-slate-50 px-6">
                  <span class="text-xs font-medium">9:41</span>
                  <div class="flex items-center space-x-1">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm4-3a1 1 0 011-1h2a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1V8zm4-3a1 1 0 011-1h2a1 1 0 011 1v11a1 1 0 01-1 1h-2a1 1 0 01-1-1V5z"
                      />
                    </svg>
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                      />
                    </svg>
                  </div>
                </div>

                <!-- App Content -->
                <div class="absolute inset-0 pt-6">
                  <!-- Fitness Stats Cards -->
                  <div class="space-y-4 p-4">
                    <div class="text-white rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                      <div class="mb-4 flex items-center justify-between">
                        <h4 class="text-sm font-semibold">Today's Progress</h4>
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <div class="flex items-baseline space-x-2">
                        <span class="text-2xl font-bold">87%</span>
                        <span class="text-sm opacity-75">of daily goal</span>
                      </div>
                    </div>

                    <div class="text-white rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 p-4">
                      <div class="mb-4 flex items-center justify-between">
                        <h4 class="text-sm font-semibold">Activity Streak</h4>
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div class="flex items-baseline space-x-2">
                        <span class="text-2xl font-bold">14</span>
                        <span class="text-sm opacity-75">days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Home Indicator -->
                <div class="bg-black absolute bottom-1 left-1/2 h-1 w-32 -translate-x-1/2 transform rounded-full"></div>
              </div>
            </div>

            <!-- Decorative Elements -->
            <div class="absolute -z-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
            <div class="absolute -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Stats Section -->
  <section bind:this={statsSection} class="relative py-24">
    <!-- Background with very subtle gradient -->

    <div class="container relative mx-auto px-6">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        {#each [{ value: "24/7", label: "AI Availability" }, { value: "92%", label: "User Goal Achievement" }, { value: "<2min", label: "Response Time" }] as stat, i}
          <div
            class="transform text-center"
            class:translate-y-0={isStatsVisible}
            style="transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) {i * 200}ms;"
            class:translate-y-20={!isStatsVisible}
          >
            <div class="mb-2 text-4xl font-bold text-blue-500">{stat.value}</div>
            <div class="text-slate-700">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Call to Action Section -->
  <section class="relative py-24">
    <div class="container relative mx-auto px-6 text-center">
      <h2 class="mb-6 text-4xl font-bold text-blue-500">Start Your Fitness Journey Today</h2>
      <p class="mx-auto mb-8 max-w-2xl text-lg text-blue-500">
        Join thousands of users who have transformed their lives with FitAI. Your personal AI fitness coach is ready to
        help you achieve your goals.
      </p>
      <button
        use:earlyAccessTrigger
        class="rounded-xl bg-blue-100 px-8 py-4 font-semibold text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        Get Started Now
      </button>
    </div>
  </section>
</div>

<style>
  @keyframes float-hex-0 {
    0%,
    100% {
      transform: translate(-50%, -50%) rotate(0deg) scale(1);
    }
    50% {
      transform: translate(-50%, -60%) rotate(5deg) scale(1.05);
    }
  }

  @keyframes float-hex-1 {
    0%,
    100% {
      transform: translate(-50%, -50%) rotate(0deg) scale(1);
    }
    50% {
      transform: translate(-60%, -50%) rotate(-5deg) scale(1.1);
    }
  }

  @keyframes float-hex-2 {
    0%,
    100% {
      transform: translate(-50%, -50%) rotate(0deg) scale(1);
    }
    50% {
      transform: translate(-55%, -45%) rotate(3deg) scale(1.08);
    }
  }

  /* Wave Line Animations */
  @keyframes wave-line-0 {
    0%,
    100% {
      transform: scaleX(0.95);
    }
    50% {
      transform: scaleX(1.05);
    }
  }

  @keyframes wave-line-1 {
    0%,
    100% {
      transform: scaleX(1);
    }
    50% {
      transform: scaleX(0.9);
    }
  }

  @keyframes wave-line-2 {
    0%,
    100% {
      transform: scaleX(0.9);
    }
    50% {
      transform: scaleX(1.1);
    }
  }

  /* Orb Pulse Animations */
  @keyframes pulse-orb-0 {
    0%,
    100% {
      transform: translate(50%, 50%) scale(1);
      opacity: 0.07;
    }
    50% {
      transform: translate(45%, 45%) scale(1.1);
      opacity: 0.05;
    }
  }

  @keyframes pulse-orb-1 {
    0%,
    100% {
      transform: translate(50%, 50%) scale(1);
      opacity: 0.06;
    }
    50% {
      transform: translate(55%, 45%) scale(1.15);
      opacity: 0.04;
    }
  }

  @keyframes pulse-orb-2 {
    0%,
    100% {
      transform: translate(50%, 50%) scale(1);
      opacity: 0.08;
    }
    50% {
      transform: translate(45%, 55%) scale(1.05);
      opacity: 0.06;
    }
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
