<script lang="ts">
  import { Level } from "$lib/types";
  import beginnerImg from "$lib/assets/beginner.png";
  import intermediateImg from "$lib/assets/intermediate.png";
  import expertImg from "$lib/assets/expert.png";
  import { Info } from "lucide-svelte";

  interface CardButtonProps {
    level: Level;
    title: string;
    description: string;
    imageSrc: string;
    stats: string;
  }

  const beginner: CardButtonProps = {
    level: Level.Beginner,
    title: "Anfänger",
    description: "Du trainierst seit weniger als einem Jahr oder startest gerade erst mit dem Krafttraining.",
    imageSrc: beginnerImg,
    stats: "Grundlegendes Training • Fokus auf Technik",
  };

  const intermediate: CardButtonProps = {
    level: Level.Intermediate,
    title: "Fortgeschritten",
    description: "Du trainierst regelmäßig seit 1-3 Jahren und kennst die wichtigsten Grundübungen.",
    imageSrc: intermediateImg,
    stats: "Fortgeschrittenes Training • Fokus auf Progression",
  };

  const expert: CardButtonProps = {
    level: Level.Expert,
    title: "Experte",
    description: "Du trainierst seit mehr als 3 Jahren konsequent und kennst deinen Körper und deine Grenzen genau.",
    imageSrc: expertImg,
    stats: "Spezialisiertes Training • Fokus auf Optimierung",
  };

  let { level = $bindable() }: { level: Level | null } = $props();

  function toggleLevel(newLevel: Level) {
    level = newLevel === level ? null : newLevel;
  }
</script>

<div class="animate-slideDown container mx-auto p-6">
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <h1 class="text-3xl font-bold">Wie erfahren bist du?</h1>
      <div
        class="tooltip tooltip-right"
        data-tip="Wähle deine Erfahrungsstufe: Anfänger, Fortgeschritten oder Experte."
      >
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {#each [beginner, intermediate, expert] as option, i}
        <div class="animate-slideDown" style="animation-delay: {100 + i * 100}ms">
          {#if option.level === Level.Beginner}
            {@const classes = `group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${level === option.level ? "border-green-500 bg-green-500/10 shadow-lg" : "border-base-content/10 hover:border-green-500/50 hover:bg-base-100"}`}
            {@render button(option, classes)}
          {:else if option.level === Level.Intermediate}
            {@const classes = `group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${level === option.level ? "border-yellow-500 bg-yellow-500/10 shadow-lg" : "border-base-content/10 hover:border-yellow-500/50 hover:bg-base-100"}`}
            {@render button(option, classes)}
          {:else}
            {@const classes = `group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${level === option.level ? "border-red-500 bg-red-500/10 shadow-lg" : "border-base-content/10 hover:border-red-500/50 hover:bg-base-100"}`}
            {@render button(option, classes)}
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

{#snippet button(option: CardButtonProps, buttonClasses: string)}
  <button class={buttonClasses} onclick={() => toggleLevel(option.level)} aria-label={option.title}>
    <div class="relative p-6">
      <figure class="mb-4">
        <img
          src={option.imageSrc}
          alt={`${option.level.toString()} image`}
          class="aspect-square w-full rounded-xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
        />
      </figure>

      <div class="flex flex-col items-start gap-2">
        <h3 class="text-xl font-semibold">{option.title}</h3>
        <p class="text-start text-sm text-base-content/70">{option.description}</p>
        <div class="mt-2 flex items-center gap-2 text-sm">
          <Info size={16} class="text-base-content/70" />
          <span class="text-base-content/70">{option.stats}</span>
        </div>
      </div>
    </div>
  </button>
{/snippet}

<style>
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slideDown {
    opacity: 0;
    animation: slideDown 0.3s ease-out forwards;
  }
</style>
