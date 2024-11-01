<script lang="ts">
  import type { ExerciseWithAlternatives } from "$lib/types";
  import { randomId } from "$lib/utils";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { ChevronDown, ChevronUp } from "lucide-svelte";

  interface Props {
    exercise: ExerciseWithAlternatives;
    activeCard: number | null;
    class?: string;
  }

  let { exercise, activeCard = $bindable(), class: className = "" }: Props = $props();
  const id: number = randomId();
  let cardRef: HTMLDivElement;

  function toggleAlternatives(event: Event) {
    event.stopPropagation();
    activeCard = activeCard === id ? null : id;
  }

  // Handle click outside
  function handleClickOutside(event: MouseEvent) {
    if (activeCard === id && cardRef && !cardRef.contains(event.target as Node)) {
      activeCard = null;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<div bind:this={cardRef} class="relative snap-start {className}" style="z-index: {activeCard === id ? '50' : '0'};">
  <div class="relative w-full max-w-72">
    <!-- Main Exercise Card -->
    <div
      class="card h-full w-full transform cursor-pointer bg-neutral-content text-left shadow-md transition duration-200 ease-in-out hover:shadow-lg"
      class:z-50={activeCard === id}
      aria-label={`View details for ${exercise.primaryExercise.name}`}
    >
      <div class="card-body">
        <h2 class="card-title">{exercise.primaryExercise.name}</h2>

        <!-- Exercise metadata badges -->
        <div class="flex flex-wrap gap-1">
          <div class="badge badge-accent rounded-lg">
            {exercise.primaryExercise.category}
          </div>
          <div class="badge rounded-lg bg-accent/50">
            {exercise.primaryExercise.equipment}
          </div>
        </div>

        <!-- Image placeholder -->
        <div class="flex space-x-2">
          <div class="flex h-52 w-52 items-center justify-center bg-base-200">
            <span>Loading...</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-1">
          <div class="badge rounded-lg">
            {exercise.sets} × {exercise.repetitions[0]} - {exercise.repetitions[1]}
          </div>
          {#if exercise.warmupSet}
            <div class="badge badge-primary rounded-lg">Warm-up</div>
          {/if}
        </div>

        <!-- Alternatives button -->
        {#if exercise.alternatives.length > 0}
          <button
            class="mt-2 flex flex-col items-center text-sm hover:font-semibold"
            onclick={toggleAlternatives}
            aria-expanded={activeCard === id}
            aria-controls="alternatives-dropdown"
          >
            <span>Alternativen</span>
            {#if activeCard === id}
              <ChevronUp class="h-4 w-4 transition-transform duration-200" />
            {:else}
              <ChevronDown class="h-4 w-4 transition-transform duration-200" />
            {/if}
          </button>
        {/if}
      </div>
    </div>

    <!-- Alternatives Dropdown -->
    {#if activeCard === id}
      <div id="alternatives-dropdown" class="absolute z-[60] my-5 w-full" transition:slide={{ duration: 300 }}>
        <div class="space-y-2 rounded-lg bg-neutral-content">
          {#each exercise.alternatives as alternative (alternative.id)}
            <button
              class="card w-full transform cursor-pointer text-left shadow-md transition duration-200 ease-in-out hover:shadow-lg"
              onclick={toggleAlternatives}
            >
              <div class="card-body py-4">
                <h3 class="card-title text-lg">{alternative.name}</h3>
                <div class="flex flex-wrap gap-1">
                  <div class="badge badge-accent rounded-lg">
                    {alternative.category}
                  </div>
                  <div class="badge rounded-lg bg-accent/50">
                    {alternative.equipment}
                  </div>
                </div>
              </div>
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  {#if activeCard === id}
    <div
      tabindex="0"
      class="fixed inset-0 -z-10 bg-base-200/50 backdrop-blur-sm"
      onclick={() => (activeCard = null)}
    ></div>
  {/if}
</div>
