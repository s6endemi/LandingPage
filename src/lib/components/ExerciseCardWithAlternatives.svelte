<script lang="ts">
  import type { Exercise, ExerciseWithAlternatives } from "$lib/types";
  import ExerciseCard from "./ExerciseCard.svelte";

  interface Props {
    exercise: ExerciseWithAlternatives;
    class?: string;
  }

  let { exercise, class: className = "" }: Props = $props();
  let showAlternatives: boolean = $state(false);
  let dialog: HTMLDialogElement | null = $state(null);

  function toggleAlternatives(event: Event) {
    event.stopPropagation();
    showAlternatives = !showAlternatives;
  }

  function swapPrimaryExercise(alternative: Exercise) {
    const newAlternatives = exercise.alternatives.filter((alt) => alt !== alternative);
    newAlternatives.push(exercise.primaryExercise);
    exercise = {
      ...exercise,
      primaryExercise: alternative,
      alternatives: newAlternatives,
    };
    showAlternatives = false;
  }

  $effect(() => {
    if (dialog) showAlternatives ? dialog.showModal() : dialog.close();
  });
</script>

<div class="relative snap-start {className} z-0">
  <div class="relative w-full max-w-72">
    <!-- Main Exercise Card -->
    <div
      class="card h-full w-full transform cursor-pointer bg-neutral-content text-left shadow-md transition duration-200 ease-in-out hover:shadow-lg"
      class:z-50={showAlternatives}
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
          <button class="btn" onclick={toggleAlternatives}>open modal</button>
          <dialog id="alternatives_modal" class="modal text-center" bind:this={dialog}>
            <div
              class="modal-box rounded-lg bg-base-100 p-7"
              class:max-w-sm={exercise.alternatives.length === 1}
              class:max-w-2xl={exercise.alternatives.length === 2}
              class:max-w-5xl={exercise.alternatives.length === 3}
              class:max-w-7xl={exercise.alternatives.length === 4}
            >
              <h1 class="mb-6 text-2xl font-bold">Wähle eine Alternative</h1>
              <div class="flex flex-wrap justify-center gap-4">
                {#each exercise.alternatives as alternative}
                  <ExerciseCard exercise={alternative} onclick={swapPrimaryExercise} />
                {/each}
              </div>
            </div>
            <form method="dialog" onsubmit={() => (showAlternatives = false)} class="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        {/if}
      </div>
    </div>
  </div>
</div>
