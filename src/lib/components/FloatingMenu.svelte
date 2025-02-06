<!-- src/lib/components/FloatingMenu.svelte -->
<script lang="ts">
  import { fade, scale } from "svelte/transition";

  const quickActions = [
    { icon: "⚡️", label: "Quick Workout", action: () => console.log("Quick workout") },
    { icon: "📊", label: "Progress", action: () => console.log("Progress") },
    { icon: "🎯", label: "Goals", action: () => console.log("Goals") },
    { icon: "💪", label: "Exercises", action: () => console.log("Exercises") },
  ];

  let isQuickMenuOpen = false;
</script>

<div class="fixed bottom-8 right-8 z-50">
  <!-- Main Menu Button -->
  <button
    on:click={() => (isQuickMenuOpen = !isQuickMenuOpen)}
    class="group relative h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600
           shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1
           hover:shadow-indigo-500/40"
  >
    <!-- Glow effect -->
    <div
      class="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600
             opacity-0 blur transition-opacity duration-300 group-hover:opacity-50"
    />

    <!-- Icon -->
    <div class="relative flex h-full w-full items-center justify-center">
      <div class="h-8 w-8 transition-transform duration-300" class:rotate-45={isQuickMenuOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="text-white h-full w-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </div>
  </button>

  <!-- Quick Actions Menu -->
  {#if isQuickMenuOpen}
    <div transition:fade={{ duration: 200 }} class="absolute bottom-20 right-0 flex flex-col gap-4">
      {#each quickActions as action, i}
        <div
          transition:scale={{
            duration: 200,
            delay: i * 50,
            start: 0.8,
            opacity: 0,
          }}
          class="group relative flex items-center justify-end gap-3"
        >
          <!-- Tooltip -->
          <span
            class="pointer-events-none absolute right-16 rounded-lg bg-gray-900 px-3 py-1
                   text-sm text-gray-100 opacity-0 transition-opacity duration-200
                   group-hover:opacity-100"
          >
            {action.label}
          </span>

          <!-- Action Button -->
          <button
            on:click={action.action}
            class="group relative h-12 w-12 rounded-full bg-gray-800 text-xl shadow-lg
                   transition-all duration-300 hover:-translate-y-1 hover:bg-gray-700"
          >
            <!-- Button glow effect -->
            <div
              class="absolute inset-0 rounded-full bg-indigo-500/20 opacity-0 blur-sm
                     transition-opacity duration-300 group-hover:opacity-100"
            />
            <span class="relative z-10">{action.icon}</span>
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .rotate-45 {
    transform: rotate(45deg);
  }

  button {
    -webkit-tap-highlight-color: transparent;
  }
</style>
