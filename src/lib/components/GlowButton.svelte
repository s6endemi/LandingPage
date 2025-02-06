<script lang="ts">
  let isHovered = false;
  let mouseX = 0;
  let mouseY = 0;
  let buttonRect: DOMRect;

  function handleMouseMove(event: MouseEvent) {
    if (!buttonRect) return;
    mouseX = event.clientX - buttonRect.left;
    mouseY = event.clientY - buttonRect.top;
  }

  function handleMouseEnter(event: MouseEvent) {
    isHovered = true;
    const button = event.currentTarget as HTMLButtonElement;
    buttonRect = button.getBoundingClientRect();
  }

  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<button
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  class="text-white group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600
         to-purple-600 px-6 py-3 font-medium transition-all duration-300 hover:-translate-y-0.5"
>
  <!-- Glow effect -->
  {#if isHovered}
    <div
      class="absolute inset-0 opacity-50 transition-opacity duration-300"
      style="
        background: radial-gradient(
          circle at {mouseX}px {mouseY}px,
          rgba(255, 255, 255, 0.3) 0%,
          transparent 60%
        );
      "
    />
  {/if}

  <!-- Shine effect -->
  <div
    class="via-white/10 absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent
           opacity-0 transition-all duration-500 group-hover:translate-x-full group-hover:opacity-100"
  />

  <!-- Border glow -->
  <div class="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    <div class="absolute inset-0 animate-pulse rounded-xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur" />
  </div>

  <!-- Button content -->
  <span class="relative">
    <slot />
  </span>
</button>

<style>
  button {
    transform-style: preserve-3d;
    -webkit-tap-highlight-color: transparent;
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.2;
    }
  }
</style>
