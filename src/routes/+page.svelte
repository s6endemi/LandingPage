<script lang="ts">
  import { createDialog } from "@melt-ui/svelte";
  import { fade, slide, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let scrollY: number;
  let particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

  // Intersection Observer elements
  let featuresSection: HTMLElement;
  let isFeaturesVisible = false;

  const features = [
    {
      title: "Personalisierte KI-Anpassung",
      description:
        "Ihr Training entwickelt sich mit Ihnen. Unser KI-System analysiert Ihre Fortschritte und passt Ihren Plan in Echtzeit an.",
      stats: ["98% Zufriedenheit", "15% bessere Ergebnisse", "24/7 Verfügbar"],
      icon: "⚡",
    },
    {
      title: "Wissenschaftlich Fundiert",
      description: "Basierend auf neuesten Studien und bewährten Trainingsmethoden für optimale Resultate.",
      stats: ["200+ Übungen", "50+ Wissenschaftler", "1000+ Studien"],
      icon: "🎯",
    },
    {
      title: "Flexibles Training",
      description: "Trainieren Sie wo und wann Sie wollen. Ihr persönlicher Coach passt sich Ihrem Zeitplan an.",
      stats: ["Beliebiger Ort", "Flexible Zeit", "Adaptive Pläne"],
      icon: "🌟",
    },
  ];

  function initParticles() {
    particles = Array(50)
      .fill(null)
      .map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.2,
      }));
  }

  function animateParticles() {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.y -= particle.speed;
      if (particle.y < 0) particle.y = canvas.height;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }

  function handleResize() {
    if (canvas && window) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext("2d")!;
      handleResize();
      initParticles();
      animateParticles();

      window.addEventListener("resize", handleResize);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === featuresSection) {
            isFeaturesVisible = entry.isIntersecting;
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(featuresSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

<canvas bind:this={canvas} class="pointer-events-none fixed inset-0 z-0 h-full w-full" />

<div class="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
  <!-- Navigation blur effect -->
  <div
    class="bg-white/80 fixed left-0 right-0 top-0 z-30 h-20 backdrop-blur-xl transition-opacity duration-300"
    style="opacity: {Math.min(scrollY / 100, 1)}"
  />

  <!-- Hero Section -->
  <header class="container relative mx-auto px-6 pb-24 pt-32 text-center">
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
        class="mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-5xl font-bold
               tracking-tight text-transparent md:text-7xl"
        in:fly={{ y: 20, duration: 800, delay: 200 }}
      >
        Der intelligente Weg<br />zu Ihrem Fitnessziel
      </h1>

      <p
        class="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-600"
        in:fly={{ y: 20, duration: 800, delay: 400 }}
      >
        Erleben Sie die Zukunft des Personal Trainings mit unserem KI-gestützten Coach.
      </p>

      <div
        class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        in:fly={{ y: 20, duration: 800, delay: 600 }}
      >
        <button
          class="text-white group rounded-2xl bg-blue-600 px-8 py-4 font-medium
                 shadow-lg shadow-blue-200 transition-all duration-300
                 hover:-translate-y-0.5 hover:shadow-blue-300"
        >
          Kostenlos starten
          <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
        <button
          class="bg-white rounded-2xl px-8 py-4 font-medium text-gray-600 shadow-lg
                 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gray-200"
        >
          Demo ansehen
        </button>
      </div>

      <div class="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8">
        {#each [{ value: "10k+", label: "Aktive Nutzer" }, { value: "95%", label: "Zielerreichung" }, { value: "4.9★", label: "Bewertung" }] as stat}
          <div class="transform text-center transition-transform duration-300 hover:-translate-y-1">
            <div class="text-3xl font-bold text-blue-600">{stat.value}</div>
            <div class="mt-1 text-sm text-gray-600">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </header>

  <!-- Features Section -->
  <section bind:this={featuresSection} class="bg-white relative py-32">
    <div class="container mx-auto px-6">
      <h2
        class="mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-center text-4xl
                 font-bold text-transparent"
      >
        Ihr persönlicher KI-Coach
      </h2>

      <div class="grid gap-8 md:grid-cols-3">
        {#each features as feature, i}
          <div
            class="from-white rounded-3xl bg-gradient-to-b to-blue-50 p-8 shadow-xl
                   transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            class:translate-y-0={isFeaturesVisible}
            style="transition-delay: {i * 200}ms;"
            class:translate-y-20={!isFeaturesVisible}
          >
            <div class="mb-6 text-4xl">{feature.icon}</div>
            <h3 class="mb-4 text-xl font-semibold text-gray-800">{feature.title}</h3>
            <p class="mb-6 text-gray-600">{feature.description}</p>
            <div class="space-y-2">
              {#each feature.stats as stat}
                <div
                  class="bg-white/50 hover:bg-white rounded-xl px-4 py-2 text-center text-sm
                           text-gray-600 transition-colors duration-300"
                >
                  {stat}
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="to-white bg-gradient-to-b from-blue-50 py-24">
    <div class="container mx-auto max-w-3xl px-6 text-center">
      <h2 class="mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-4xl font-bold text-transparent">
        Bereit für Ihre Transformation?
      </h2>
      <p class="mb-12 text-xl text-gray-600">
        Starten Sie heute mit Ihrem persönlichen KI-Coach und erleben Sie den Unterschied.
      </p>
      <button
        class="text-white group rounded-2xl bg-blue-600 px-8 py-4 font-medium
               shadow-lg shadow-blue-200 transition-all duration-300
               hover:-translate-y-0.5 hover:shadow-blue-300"
      >
        14 Tage kostenlos testen
        <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </div>
  </section>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
