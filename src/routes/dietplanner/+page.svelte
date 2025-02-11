<script lang="ts">
  import { ArrowRight, Apple, Brain, ChartLine, Utensils } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { createDialog } from "@melt-ui/svelte";

  let isStatsVisible = false;
  let isFeaturesVisible = false;
  let isHeroVisible = false;
  let statsSection: HTMLElement;
  let featuresSection: HTMLElement;
  let heroSection: HTMLElement;

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
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsSection);
    observer.observe(featuresSection);
    observer.observe(heroSection);

    return () => {
      observer.disconnect();
    };
  });
</script>

# file: +page.svelte
<main class="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
  <!-- Hero Section -->
  <div bind:this={heroSection} class="relative overflow-hidden py-24">
    <!-- Decorative elements -->
    <div
      class="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-600/10 to-pink-600/10 blur-3xl"
    />
    <div
      class="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-2xl"
    />

    <div class="container relative mx-auto px-6 text-center">
      <div class="relative">
        <h1
          class="mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl"
          in:fly={{ y: 20, duration: 800, delay: 200 }}
        >
          Your Personal<br />
          AI Nutrition Plan
        </h1>

        <p class="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-300"
          in:fly={{ y: 20, duration: 800, delay: 400 }}
        >
          Create your scientifically-backed nutrition plan that perfectly fits your lifestyle. Powered by AI assistance
          and professional guidance to reach your goals.
        </p>

        <div class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            use:earlyAccessTrigger
            class="text-white group rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8
                 py-4 font-medium shadow-lg shadow-indigo-500/25 transition-all duration-300
                 hover:-translate-y-0.5 hover:shadow-indigo-500/40"
          >
            Start your diet!
            <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

        <!-- Stats -->
        <div class="mt-12 flex flex-wrap justify-center gap-8">
          <div class="text-center">
            <div
              class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent"
            >
              8K+
            </div>
            <div class="text-gray-400">Satisfied Clients</div>
          </div>
          <div class="text-center">
            <div class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent">
              89%
            </div>
            <div class="text-gray-400">Goal Achievement</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Grid -->
  <section bind:this={featuresSection} class="relative py-32">
    <div class="container mx-auto px-6">
      <div class="grid gap-8 md:grid-cols-4">
        {#each [{ icon: Apple, title: "Personalized", description: "Tailored plan based on your preferences" }, { icon: Brain, title: "AI Coach", description: "24/7 nutrition guidance through AI" }, { icon: ChartLine, title: "Progress", description: "Track your success simply & effectively" }, { icon: Utensils, title: "Recipes", description: "Over 1000+ healthy recipe suggestions" }] as feature, i}
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
                <p class="text-gray-400">{feature.description}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Journey Section -->
  <section bind:this={statsSection} class="relative overflow-hidden py-32">
    <div class="container mx-auto px-6">
      <h2
        class="mb-16 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-center text-4xl font-bold text-transparent"
      >
        Your Path to Nutrition Success
      </h2>

      <div class="mx-auto max-w-3xl">
        {#each [{ step: 1, title: "Analyze Your Needs", description: "Quick quiz about your goals and eating habits" }, { step: 2, title: "AI-Powered Plan", description: "Receive your personalized nutrition plan" }, { step: 3, title: "Easy Implementation", description: "Weekly recipes and shopping lists" }, { step: 4, title: "Continuous Support", description: "AI Coach supports you every step of the way" }] as step, i}
          <div
            class="mb-12 flex transform items-start gap-8 transition-all duration-700"
            class:translate-x-0={isStatsVisible}
            class:translate-x-20={!isStatsVisible}
            style="transition-delay: {i * 150}ms;"
          >
            <div
              class="text-white flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-xl font-bold"
            >
              {step.step}
            </div>
            <div>
              <h3 class="mb-2 text-xl font-bold text-gray-100">{step.title}</h3>
              <p class="text-gray-400">{step.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Testimonial Section -->
  <section class="relative py-32">
    <div class="container mx-auto px-6">
      <div class="mx-auto max-w-2xl rounded-3xl bg-gray-800/40 p-12 backdrop-blur-xl">
        <div class="mb-6 flex justify-center gap-1">
          {#each Array(5) as _}
            <svg class="h-6 w-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          {/each}
        </div>
        <p class="mb-6 text-center text-xl italic text-gray-300">
          "The AI nutrition plan helped me reach my goals while keeping my love for food alive!"
        </p>
        <p class="text-center font-bold text-gray-400">- Sarah M.</p>
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
</main>

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

<style>
  /* Add any additional styles here */
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
</style>
