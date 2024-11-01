<script lang="ts">
  import { Split } from "$lib/types";
  import { Info, Users, ArrowUpDown, Repeat } from "lucide-svelte";
  import { onMount } from "svelte";

  interface CardButtonProps {
    split: Split;
    title: string;
    description: string;
    icon: typeof Users;
    stats: string;
    info: string;
  }

  const fullBody: CardButtonProps = {
    split: Split.FullBody,
    title: "Ganzkörper",
    description: "3x pro Woche Training mit Fokus auf den gesamten Körper pro Einheit",
    icon: Users,
    stats: "3x pro Woche • Ideal für Anfänger",
    info: "Der Ganzkörper-Split ist perfekt für Einsteiger und zeitlich eingeschränkte Trainierende. Jede Muskelgruppe wird 3x pro Woche trainiert, was optimal für Kraftaufbau und Muskelwachstum bei Anfängern ist.",
  };

  const upperLower: CardButtonProps = {
    split: Split.UpperLower,
    title: "Upper/Lower",
    description: "4x pro Woche Training, aufgeteilt in Ober- und Unterkörper",
    icon: ArrowUpDown,
    stats: "4x pro Woche • Gut für Fortgeschrittene",
    info: "Der Upper/Lower-Split ermöglicht eine höhere Trainingsfrequenz und Volumen pro Muskelgruppe. Durch die Aufteilung in Ober- und Unterkörper können die Muskeln zwischen den Einheiten optimal regenerieren.",
  };

  const ppl: CardButtonProps = {
    split: Split.PPL,
    title: "Push/Pull/Legs",
    description: "6x pro Woche Training, getrennt nach Bewegungsmustern",
    icon: Repeat,
    stats: "6x pro Woche • Optimal für Erfahrene",
    info: "Der Push/Pull/Legs-Split ist ein fortgeschrittenes Trainingssystem, das eine hohe Trainingsfrequenz ermöglicht. Die Aufteilung nach Bewegungsmustern erlaubt maximales Volumen und optimale Regeneration.",
  };

  let { split = $bindable() } = $props();
  let isLoading = $state(true);

  function toggleSplit(newSplit: Split) {
    split = newSplit === split ? null : newSplit;
  }

  const infoText = $derived(split ? [fullBody, upperLower, ppl].find((s) => s.split === split)?.info : null);

  onMount(() => {
    setTimeout(() => {
      isLoading = false;
    }, 1000);
  });
</script>

{#if isLoading}
  <div class="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
    <p class="text-xl">Passe deinen Trainingsplan an...</p>
    <span class="loading loading-spinner loading-lg text-secondary"></span>
  </div>
{:else}
  <div class="animate-slideDown container mx-auto p-6">
    <div class="space-y-6">
      <div class="flex items-center gap-2">
        <h1 class="text-3xl font-bold">Welchen Split bevorzugst du?</h1>
        <div class="tooltip tooltip-right" data-tip="Wähle deinen bevorzugten Trainings-Split aus.">
          <Info class="h-5 w-5 opacity-70" />
        </div>
      </div>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {#each [fullBody, upperLower, ppl] as option, i}
          <div class="animate-slideDown" style="animation-delay: {200 + i * 150}ms">
            {#if option.split === Split.FullBody}
              {@const classes = `group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${split === option.split ? "border-blue-500 bg-blue-500/10 shadow-lg" : "border-base-content/10 hover:border-blue-500/50 hover:bg-base-100"}`}
              {@render button(option, classes)}
            {:else if option.split === Split.UpperLower}
              {@const classes = `group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${split === option.split ? "border-purple-500 bg-purple-500/10 shadow-lg" : "border-base-content/10 hover:border-purple-500/50 hover:bg-base-100"}`}
              {@render button(option, classes)}
            {:else}
              {@const classes = `group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${split === option.split ? "border-orange-500 bg-orange-500/10 shadow-lg" : "border-base-content/10 hover:border-orange-500/50 hover:bg-base-100"}`}
              {@render button(option, classes)}
            {/if}
          </div>
        {/each}
      </div>

      {#if infoText}
        <div class="animate-fadeIn mt-8 rounded-xl bg-base-200 p-6 text-center">
          <p class="text-base-content/80">{infoText}</p>
        </div>
      {/if}
    </div>
  </div>
{/if}

{#snippet button(option: CardButtonProps, buttonClasses: string)}
  <button class={buttonClasses} onclick={() => toggleSplit(option.split)} aria-label={option.title}>
    <div class="relative p-6">
      <div class="mb-4 flex justify-center">
        <svelte:component
          this={option.icon}
          class="h-24 w-24 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

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
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

  .animate-slideDown {
    opacity: 0;
    animation: slideDown 0.5s ease-out forwards;
  }
</style>
