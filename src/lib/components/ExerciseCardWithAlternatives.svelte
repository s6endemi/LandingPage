<script lang="ts">
  import type { ExerciseWithAlternatives } from "$lib/types";
  import { ChevronDown } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import ExerciseCard from "./ExerciseCard.svelte";
  import { randomId } from "$lib/utils";

  interface Props {
    exercise: ExerciseWithAlternatives;
    activeCard: number | null;
  }

  let { exercise, activeCard = $bindable() }: Props = $props();
  const id: number = randomId();

  function toggleAlternatives(event: Event) {
    event.stopPropagation(); // Prevent main card click
    activeCard === id ? (activeCard = null) : (activeCard = id);
  }
</script>

<div class="relative w-full max-w-72">
  <!-- Main Exercise Card -->
  <div
    class="max-h-lg card w-full transform cursor-pointer bg-neutral-content text-left shadow-md transition duration-200 ease-in-out hover:shadow-lg"
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
      <button
        class="mt-2 flex flex-col items-center text-sm hover:font-semibold"
        onclick={toggleAlternatives}
        aria-expanded={activeCard === id}
        aria-controls="alternatives-dropdown"
      >
        <span>Alternativen</span>
        <ChevronDown class="h-4 w-4 transition-transform duration-200" />
      </button>
    </div>
  </div>

  <!-- Alternatives Dropdown -->
  {#if activeCard === id}
    <div
      id="alternatives-dropdown"
      class="absolute left-0 right-0 z-50 mt-2 w-max min-w-full"
      transition:slide={{ duration: 200 }}
    >
      <div class="flex gap-4 overflow-x-auto rounded-lg bg-base-100 p-4 pb-4 shadow-xl scrollbar-hidden">
        {#each exercise.alternatives as alternative (alternative.id)}
          <div class="shrink-0">
            <ExerciseCard exercise={alternative} on:click />
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
