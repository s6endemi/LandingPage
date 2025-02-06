<script lang="ts">
  import { spring } from "svelte/motion";

  export let feature: {
    icon: string;
    title: string;
    description: string;
    gradient: string;
    delay: number;
  };

  export let visible = false;
  export let delay = 0;

  let card: HTMLElement;
  let isHovered = false;

  const rotation = spring(
    { x: 0, y: 0 },
    {
      stiffness: 0.1,
      damping: 0.8,
    }
  );

  function handleMouseMove(event: MouseEvent) {
    if (!card || !isHovered) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotation.set({
      x: (y - centerY) / 20,
      y: -(x - centerX) / 20,
    });
  }

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
    rotation.set({ x: 0, y: 0 });
  }

  $: transform = `perspective(1000px) rotateX(${$rotation.x}deg) rotateY(${$rotation.y}deg)`;
</script>

<div
  bind:this={card}
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  class="group transform rounded-3xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-8
         backdrop-blur-sm transition-all duration-500 hover:shadow-indigo-500/10"
  class:translate-y-0={visible}
  class:translate-y-20={!visible}
  style="
    transition-delay: {delay}ms;
    transform: {transform};
  "
>
  <!-- Icon with glow -->
  <div class="relative mb-6 text-4xl">
    <span class="relative z-10">{feature.icon}</span>
    <div
      class="absolute -inset-2 rounded-full bg-gradient-to-r {feature.gradient} opacity-0
             blur-lg transition-opacity duration-300 group-hover:opacity-20"
    />
  </div>

  <!-- Content -->
  <h3 class="mb-4 text-xl font-semibold text-gray-100">
    {feature.title}
  </h3>

  <p class="leading-relaxed text-gray-400">
    {feature.description}
  </p>

  <!-- Hover border effect -->
  <div
    class="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300
           group-hover:opacity-100"
  >
    <div
      class="absolute inset-0 rounded-3xl bg-gradient-to-r {feature.gradient} 
             opacity-20 blur-sm"
    />
  </div>
</div>

<style>
  div {
    transform-style: preserve-3d;
  }
</style>
