<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { Rocket, Brain, Building } from "lucide-svelte";
  import CircuitBackground from "$lib/assets/circuit-background.svg?raw";

  type SectionId = "hero" | "ventures" | "intel" | "architect";

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

    return () => observer.disconnect();
  });

  const sectionData: Array<{
    id: SectionId;
    title: string;
    description: string;
    icon: any;
    stats: string[];
  }> = [
    {
      id: "ventures",
      title: "Ventures",
      description: "Strategic investments in groundbreaking Web3 projects.",
      icon: Rocket,
      stats: ["50+ Projects", "$100M+ Invested", "30+ Countries"],
    },
    {
      id: "intel",
      title: "Intel",
      description: "Deep market insights and technological innovation.",
      icon: Brain,
      stats: ["24/7 Analysis", "AI-Powered", "Real-time Data"],
    },
    {
      id: "architect",
      title: "Architect",
      description: "Building the foundation of next-gen Web3 infrastructure.",
      icon: Building,
      stats: ["Scalable", "Secure", "Future-proof"],
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
          class="text-white group relative overflow-hidden rounded-lg bg-[#0052ff] px-8 py-4 font-medium
                 transition-all duration-300 hover:-translate-y-0.5"
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
          class="text-white rounded-lg border border-[#0052ff]/20 bg-[#0052ff]/5 px-8 py-4 font-medium
                 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0052ff]/10"
        >
          Learn More
        </button>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="pointer-events-none absolute inset-0">
      {#each Array(3) as _, i}
        <div
          class="absolute h-px w-[200px] bg-gradient-to-r from-transparent via-[#0052ff]/30 to-transparent"
          style="
            left: {30 + i * 20}%;
            top: {20 + i * 30}%;
            transform: rotate({45 + i * 30}deg);
          "
        ></div>
      {/each}
    </div>
  </section>

  <!-- Main Sections -->
  {#each sectionData as { id, title, description, icon: Icon, stats }, i}
    <section bind:this={sections[id]} data-section={id} class="relative min-h-screen py-24" {id}>
      <div class="container mx-auto px-6">
        <div
          class="grid gap-12 lg:grid-cols-2"
          class:opacity-100={visibility[id]}
          class:translate-x-0={visibility[id]}
          class:opacity-0={!visibility[id]}
          class:translate-x-20={!visibility[id]}
          style="transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) {i * 0.2}s"
        >
          <!-- Content -->
          <div class="flex flex-col justify-center">
            <div class="mb-6 flex items-center space-x-4">
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
            <p class="mb-8 text-xl font-light leading-relaxed text-gray-300">{description}</p>

            <!-- Stats Grid -->
            <div class="grid grid-cols-3 gap-4">
              {#each stats as stat}
                <div
                  class="group rounded-lg border border-[#0052ff]/10 bg-[#0052ff]/5 p-4 backdrop-blur-sm
                         transition-all duration-300 hover:-translate-y-1 hover:border-[#0052ff]/20
                         hover:bg-[#0052ff]/10"
                >
                  <p class="group-hover:text-white text-center text-sm font-medium text-gray-300 transition-colors">
                    {stat}
                  </p>
                </div>
              {/each}
            </div>
          </div>

          <!-- Visual Element -->
          <div class="relative flex items-center justify-center lg:order-first">
            <div class="relative h-[400px] w-[400px]">
              <div
                class="bg-gradient-radial absolute inset-0 rounded-full from-[#0052ff]/10 via-transparent
                         to-transparent opacity-50"
              ></div>
              <!-- Animated lines -->
              {#each Array(5) as _, i}
                <div
                  class="absolute h-px w-full bg-gradient-to-r from-transparent via-[#0052ff]/30 to-transparent"
                  style="
                    top: {20 + i * 20}%;
                    transform: rotate({i * 30}deg);
                    animation: glow {2 + i * 0.5}s infinite ease-in-out;
                  "
                ></div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </section>
  {/each}
</div>

<style>
  :global(body) {
    font-family: "Space Grotesk", sans-serif;
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

  /* Neue Stile für den Neon-Glow-Effekt */
  .neon-glow {
    text-shadow:
      0 0 7px rgba(0, 199, 255, 0.3),
      0 0 10px rgba(0, 199, 255, 0.2),
      0 0 21px rgba(0, 199, 255, 0.1);
  }
</style>
