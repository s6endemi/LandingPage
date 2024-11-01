<script lang="ts">
  import { onMount } from "svelte";
  import type { Exercise, ExercisePlan, ExerciseWithAlternatives } from "$lib/types";
  import ExerciseCardWithAlternatives from "./ExerciseCardWithAlternatives.svelte";

  // Props type definition
  interface Props {
    split: ExercisePlan[];
  }

  // Props binding
  let { split = $bindable() }: Props = $props();

  // State management
  let viewMode: string = $state("card");

  let activeCard: number | null = $state(null);

  // Horizontal scroll handling
  onMount(() => {
    const setupHorizontalScroll = (container: HTMLElement) => {
      container.addEventListener(
        "wheel",
        (evt: WheelEvent) => {
          if (Math.abs(evt.deltaX) > Math.abs(evt.deltaY)) return;

          evt.preventDefault();
          const CARD_WIDTH = 256;
          const scrollAmount = Math.sign(evt.deltaY) * CARD_WIDTH;
          const maxScroll = container.scrollWidth - container.clientWidth;

          container.scrollTo({
            left: Math.max(0, Math.min(container.scrollLeft + scrollAmount, maxScroll)),
            behavior: "smooth",
          });
        },
        { passive: false }
      );
    };

    document.querySelectorAll<HTMLElement>(".horizontal-scroll").forEach(setupHorizontalScroll);
  });
</script>

<main class="container relative mx-auto p-6">
  {#each split as workoutSplit}
    <header class="mb-6 border-b-2 border-base-300 pb-2">
      <h2 class="text-2xl font-bold">
        {workoutSplit.name} - {workoutSplit.frequency}x pro Woche
      </h2>
    </header>

    {#if viewMode === "card"}
      <!-- Added positioned wrapper -->
      <div class="relative">
        <!-- Changed overflow to visible -->
        <div class="horizontal-scroll snap-x snap-mandatory">
          <div class="flex gap-4 pb-20">
            {#each workoutSplit.exercises as exercise (exercise.primaryExercise.id)}
              <!-- Remove flex-item class as it might interfere -->
              <div class="snap-start" style="position: static;">
                <ExerciseCardWithAlternatives {exercise} bind:activeCard />
              </div>
            {/each}
            <div class="w-4 flex-none"></div>
          </div>
        </div>
      </div>
    {:else}
      <ol class="list-decimal space-y-2 pl-5">
        {#each workoutSplit.exercises as exercise (exercise.primaryExercise.id)}
          <li class="text-lg">
            <span class="font-medium">{exercise.primaryExercise.name}</span>
            <span class="text-base-content/70">
              - {exercise.sets}
              {exercise.sets === 1 ? "Satz" : "Sätze"},
              {exercise.repetitions.join("-")}
              {exercise.repetitions.length === 1 ? "Wiederholung" : "Wiederholungen"}
            </span>
          </li>
        {/each}
      </ol>
    {/if}
  {/each}

  <footer class="fixed bottom-4 left-0 right-0 z-[100] flex justify-center">
    <button class="btn btn-primary btn-lg shadow-lg"> Jetzt Speichern </button>
  </footer>
</main>

<style>
  /* Scrollbar hiding */
  .scrollbar-hidden {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }

  /* Snap scrolling */
  .snap-x {
    scroll-snap-type: x mandatory;
  }

  .snap-start {
    scroll-snap-align: start;
  }
</style>
