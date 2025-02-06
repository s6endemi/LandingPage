<script lang="ts">
  import {
    ArrowRight,
    Dumbbell,
    Brain,
    Settings2,
    Clock,
    ChevronRight,
    Shield,
    Star,
    Activity,
    Trophy,
    Target,
    BarChart2,
    Users,
    Zap,
    Heart,
    Flame,
  } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { quintOut, cubicInOut } from "svelte/easing";
  import { createDialog } from "@melt-ui/svelte";

  // Intersection observer states
  let isStatsVisible = false;
  let isFeaturesVisible = false;
  let isHeroVisible = false;
  let isProcessVisible = false;
  let isTestimonialsVisible = false;
  let isMetricsVisible = false;
  let isAIFeaturesVisible = false;

  // Element references with null initialization
  let statsSection: HTMLElement | null = null;
  let featuresSection: HTMLElement | null = null;
  let heroSection: HTMLElement | null = null;
  let processSection: HTMLElement | null = null;
  let testimonialsSection: HTMLElement | null = null;
  let metricsSection: HTMLElement | null = null;
  let aiFeaturesSection: HTMLElement | null = null;

  // Interactive demo state
  let selectedWorkoutType = "strength";
  let activeTestimonialIndex = 0;

  // Workout type options
  const workoutTypes = [
    { id: "strength", label: "Strength Training", icon: Dumbbell },
    { id: "cardio", label: "Cardio", icon: Activity },
    { id: "hiit", label: "HIIT", icon: Zap },
    { id: "flexibility", label: "Flexibility", icon: Heart },
  ];

  // Success metrics
  const metrics = [
    { value: "94%", label: "Goal Achievement", icon: Target },
    { value: "12K+", label: "Active Users", icon: Users },
    { value: "850K+", label: "Workouts Completed", icon: Trophy },
    { value: "4.9/5", label: "User Rating", icon: Star },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marathon Runner",
      quote:
        "The AI trainer adapted my plan perfectly around my marathon training schedule. It's like having a personal coach 24/7!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Powerlifter",
      quote:
        "Finally hit my PR goals thanks to the intelligent progression system. The form feedback is incredibly accurate.",
      rating: 5,
    },
    {
      name: "Emma Wilson",
      role: "Yoga Enthusiast",
      quote: "The flexibility training programs are amazing. The AI understands exactly how to progress my practice.",
      rating: 5,
    },
  ];

  // AI features showcase
  const aiFeatures = [
    {
      title: "Neural Form Analysis",
      description: "Real-time form correction with 99.9% accuracy using advanced computer vision",
      icon: Brain,
      metrics: ["99.9% Accuracy", "Real-time Feedback", "3D Analysis"],
    },
    {
      title: "Adaptive Programming",
      description: "Dynamic workout adjustments based on your performance and recovery data",
      icon: Settings2,
      metrics: ["Smart Recovery", "Auto-adjustment", "Progress Tracking"],
    },
    {
      title: "Performance Analytics",
      description: "Deep insights into your training patterns and improvement opportunities",
      icon: BarChart2,
      metrics: ["Trend Analysis", "Goal Tracking", "Predictive Insights"],
    },
  ];

  // Auto-rotate testimonials
  let testimonialInterval: number;

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

  // Form state
  let email = "";
  let submitting = false;

  // Form handling
  async function handleSubmit() {
    submitting = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    submitting = false;
    earlyAccessOpen.set(false);
    email = "";
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === statsSection) isStatsVisible = entry.isIntersecting;
          if (entry.target === featuresSection) isFeaturesVisible = entry.isIntersecting;
          if (entry.target === heroSection) isHeroVisible = entry.isIntersecting;
          if (entry.target === processSection) isProcessVisible = entry.isIntersecting;
          if (entry.target === testimonialsSection) isTestimonialsVisible = entry.isIntersecting;
          if (entry.target === metricsSection) isMetricsVisible = entry.isIntersecting;
          if (entry.target === aiFeaturesSection) isAIFeaturesVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.2 }
    );

    const sections = [
      statsSection,
      featuresSection,
      heroSection,
      processSection,
      testimonialsSection,
      metricsSection,
      aiFeaturesSection,
    ];

    sections.forEach((section) => {
      if (section instanceof HTMLElement) {
        observer.observe(section);
      }
    });

    // Start testimonial rotation
    testimonialInterval = setInterval(() => {
      activeTestimonialIndex = (activeTestimonialIndex + 1) % testimonials.length;
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(testimonialInterval);
    };
  });

  // Animated counter function
  function animateCounter(node: HTMLElement, { duration = 2000, value }: { duration?: number; value: string }) {
    const isPercentage = value.includes("%");
    const finalValue = parseFloat(value);
    const startValue = 0;

    return {
      duration,
      tick: (t: number) => {
        const currentValue = startValue + (finalValue - startValue) * t;
        node.textContent = isPercentage
          ? `${currentValue.toFixed(1)}%`
          : currentValue >= 1000
            ? `${(currentValue / 1000).toFixed(1)}K+`
            : currentValue.toFixed(1);
      },
    };
  }
</script>

<main class="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
  <!-- Hero Section -->
  <section bind:this={heroSection} class="relative overflow-hidden py-24">
    <!-- Decorative elements -->
    <div
      class="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-600/10 to-pink-600/10 blur-3xl"
    />
    <div
      class="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-2xl"
    />

    <!-- Animated background pattern -->
    <div class="absolute inset-0">
      {#each Array(5) as _, i}
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
        />
      {/each}
    </div>

    <div class="container relative mx-auto px-6">
      <div class="mx-auto max-w-3xl text-center">
        <h1
          class="mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl"
        >
          Transform Your Fitness with
          <span class="block">AI-Powered Training</span>
        </h1>

        <p class="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-300">
          Experience the future of fitness with our advanced AI training system. Personalized workouts, real-time form
          correction, and adaptive programming for optimal results.
        </p>

        <div class="mb-16 flex justify-center">
          <button
            use:earlyAccessTrigger
            class="text-white group rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8
                 py-4 font-medium shadow-lg shadow-indigo-500/25 transition-all duration-300
                 hover:-translate-y-0.5 hover:shadow-indigo-500/40"
          >
            Start your Journey
            <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

        <!-- Workout Type Selector -->
        <div class="mb-12">
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {#each workoutTypes as type}
              <button
                class="group relative overflow-hidden rounded-xl p-4 transition-all duration-300 {selectedWorkoutType ===
                type.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                  : 'bg-gray-800/40'}"
                on:click={() => (selectedWorkoutType = type.id)}
              >
                <div class="relative z-10">
                  <svelte:component
                    this={type.icon}
                    class="mx-auto mb-2 h-8 w-8 transition-transform duration-300 group-hover:scale-110 {selectedWorkoutType ===
                    type.id
                      ? 'text-white'
                      : 'text-gray-400'}"
                  />
                  <span class="text-sm {selectedWorkoutType === type.id ? 'text-white' : 'text-gray-400'}">
                    {type.label}
                  </span>
                </div>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </button>
            {/each}
          </div>
        </div>

        <!-- Key Metrics -->
        <div bind:this={metricsSection} class="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {#each metrics as metric, i}
            <div
              class="transform transition-all duration-700"
              class:translate-y-0={isMetricsVisible}
              class:translate-y-20={!isMetricsVisible}
              style="transition-delay: {i * 150}ms;"
            >
              <div class="flex flex-col items-center">
                <svelte:component this={metric.icon} class="mb-2 h-6 w-6 text-indigo-400" />
                {#if isMetricsVisible}
                  <div
                    class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent"
                    in:animateCounter={{ value: metric.value }}
                  >
                    {metric.value}
                  </div>
                {/if}
                <div class="text-sm text-gray-400">{metric.label}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- AI Features Showcase -->
  <section bind:this={aiFeaturesSection} class="relative py-32">
    <div class="container mx-auto px-6">
      <h2
        class="mb-16 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-center text-4xl font-bold text-transparent"
      >
        Powered by Advanced AI
      </h2>

      <div class="grid gap-8 md:grid-cols-3">
        {#each aiFeatures as feature, i}
          <div
            class="transform transition-all duration-700"
            class:translate-y-0={isAIFeaturesVisible}
            class:translate-y-20={!isAIFeaturesVisible}
            style="transition-delay: {i * 150}ms;"
          >
            <div class="group relative h-full rounded-3xl p-1">
              <div
                class="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur"
              ></div>
              <div class="relative h-full rounded-3xl bg-gray-800/40 p-8 backdrop-blur-xl">
                <div class="mb-6 transform text-4xl transition-transform duration-300 group-hover:scale-110">
                  <svelte:component this={feature.icon} class="text-indigo-400" />
                </div>
                <h3 class="mb-4 text-xl font-bold text-gray-100">{feature.title}</h3>
                <p class="mb-6 text-gray-400">{feature.description}</p>

                <!-- Feature Metrics -->
                <div class="space-y-2">
                  {#each feature.metrics as metric}
                    <div class="flex items-center space-x-2">
                      <div class="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                      <span class="text-sm text-gray-400">{metric}</span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section bind:this={featuresSection} class="relative py-32">
    <div class="container mx-auto px-6">
      <div class="grid gap-8 md:grid-cols-4">
        {#each [{ icon: Dumbbell, title: "Smart Programming", description: "AI-generated workouts that adapt to your progress and preferences", metrics: ["Dynamic Plans", "Progressive Load", "Recovery Focus"] }, { icon: Brain, title: "Form Analysis", description: "Real-time feedback on exercise technique", metrics: ["3D Analysis", "Instant Feedback", "Risk Prevention"] }, { icon: Settings2, title: "Dynamic Adaptation", description: "Automatic adjustments based on performance", metrics: ["Smart Scaling", "Auto-Adjust", "Fatigue Monitor"] }, { icon: Clock, title: "Time Optimization", description: "Efficient workouts tailored to your schedule", metrics: ["Smart Splits", "Time Management", "Peak Hours"] }] as feature, i}
          <div
            class="transform transition-all duration-700"
            class:translate-y-0={isFeaturesVisible}
            class:translate-y-20={!isFeaturesVisible}
            style="transition-delay: {i * 150}ms;"
          >
            <div class="group relative h-full rounded-3xl p-1 transition-all duration-300">
              <div
                class="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur"
              ></div>
              <div class="relative h-full rounded-3xl bg-gray-800/40 p-8 backdrop-blur-xl">
                <div class="mb-6 transform text-4xl transition-transform duration-300 group-hover:scale-110">
                  <svelte:component this={feature.icon} class="text-indigo-400" />
                </div>
                <h3 class="mb-4 text-xl font-bold text-gray-100">{feature.title}</h3>
                <p class="mb-6 text-gray-400">{feature.description}</p>

                <!-- Feature Metrics -->
                <div class="space-y-2">
                  {#each feature.metrics as metric}
                    <div class="flex items-center space-x-2">
                      <div class="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                      <span class="text-sm text-gray-400">{metric}</span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section bind:this={testimonialsSection} class="relative py-32">
    <div class="container mx-auto px-6">
      <h2
        class="mb-16 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-center text-4xl font-bold text-transparent"
      >
        Success Stories
      </h2>

      <div class="mx-auto max-w-4xl">
        <div class="relative">
          <!-- Testimonial Cards -->
          {#each [testimonials[activeTestimonialIndex]] as testimonial (activeTestimonialIndex)}
            <div class="rounded-3xl bg-gray-800/40 p-8 backdrop-blur-xl" in:fade={{ duration: 300 }}>
              <div class="flex items-start gap-6">
                <img src={testimonial.image} alt={testimonial.name} class="h-16 w-16 rounded-full object-cover" />
                <div>
                  <div class="mb-4 flex items-center gap-2">
                    {#each Array(testimonial.rating) as _}
                      <Star class="h-4 w-4 fill-current text-yellow-500" />
                    {/each}
                  </div>
                  <p class="mb-4 text-lg italic text-gray-300">"{testimonial.quote}"</p>
                  <div>
                    <div class="font-bold text-gray-200">{testimonial.name}</div>
                    <div class="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          {/each}

          <!-- Navigation Dots -->
          <div class="mt-8 flex justify-center gap-2">
            {#each testimonials as _, i}
              <button
                class="h-2 w-2 rounded-full transition-all duration-300"
                class:bg-indigo-600={i === activeTestimonialIndex}
                class:bg-gray-600={i !== activeTestimonialIndex}
                on:click={() => (activeTestimonialIndex = i)}
              ></button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Enhanced Progress Section -->
  <section bind:this={processSection} class="relative overflow-hidden py-32">
    <div class="container mx-auto px-6">
      <h2
        class="mb-16 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-center text-4xl font-bold text-transparent"
      >
        Your Journey to Peak Performance
      </h2>

      <div class="mx-auto max-w-5xl">
        <div class="grid gap-8 md:grid-cols-2">
          <!-- Progress Steps -->
          <div class="space-y-8">
            {#each [{ step: 1, title: "Quick Assessment", description: "Share your goals, experience, and preferences", icon: Target }, { step: 2, title: "AI Analysis", description: "Our AI creates your personalized training program", icon: Brain }, { step: 3, title: "Smart Training", description: "Begin your journey with real-time AI guidance", icon: Activity }, { step: 4, title: "Track Progress", description: "Monitor improvements and adapt automatically", icon: BarChart2 }] as step, i}
              <div
                class="transform transition-all duration-700"
                class:translate-x-0={isProcessVisible}
                class:translate-x-20={!isProcessVisible}
                style="transition-delay: {i * 150}ms;"
              >
                <div class="flex items-start gap-6">
                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600"
                  >
                    <svelte:component this={step.icon} class="text-white h-6 w-6" />
                  </div>
                  <div>
                    <div class="mb-2 font-mono text-sm text-indigo-400">Step {step.step}</div>
                    <h3 class="mb-2 text-xl font-bold text-gray-100">{step.title}</h3>
                    <p class="text-gray-400">{step.description}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Interactive Demo -->
          <div class="relative rounded-3xl bg-gray-800/40 p-8 backdrop-blur-xl">
            <div
              class="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-20 blur"
            ></div>
            <div class="relative">
              <h3 class="mb-6 text-2xl font-bold text-gray-100">Live Progress Tracking</h3>

              <!-- Sample Progress Chart -->
              <div class="mb-8 h-48 w-full rounded-lg bg-gray-900/50">
                <div class="h-full w-full rounded-lg bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-4">
                  <!-- Placeholder for actual chart -->
                  <div class="flex h-full items-end justify-between gap-2">
                    {#each Array(7) as _, i}
                      <div
                        class="w-full rounded-t bg-gradient-to-t from-indigo-600 to-purple-600"
                        style="height: {30 + Math.random() * 70}%;"
                      ></div>
                    {/each}
                  </div>
                </div>
              </div>

              <!-- Sample Metrics -->
              <div class="grid grid-cols-2 gap-4">
                {#each [{ label: "Workouts", value: "24", unit: "this month" }, { label: "Progress", value: "+15", unit: "% strength" }, { label: "Streak", value: "8", unit: "days" }, { label: "Form Score", value: "9.5", unit: "/10" }] as metric}
                  <div class="rounded-lg bg-gray-900/50 p-4">
                    <div class="text-sm text-gray-400">{metric.label}</div>
                    <div class="text-white text-2xl font-bold">{metric.value}</div>
                    <div class="text-xs text-gray-400">{metric.unit}</div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Enhanced CTA Section -->
  <section class="relative pb-32">
    <div class="container mx-auto px-6">
      <div class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <button
          use:earlyAccessTrigger
          class="text-white group rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8
                 py-4 font-medium shadow-lg shadow-indigo-500/25 transition-all duration-300
                 hover:-translate-y-0.5 hover:shadow-indigo-500/40"
        >
          Get Started
          <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
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
</main>

<style>
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

  @keyframes pulse {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
      opacity: 0.2;
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
</style>
