<script lang="ts">
  import type { Exercise } from "$lib/types";
  import ExtendedCard from "./ExtendedCard.svelte";
  interface Props {
    exercise: Exercise;
    onclick?: (exercise: Exercise) => void;
  }
  let { exercise, onclick }: Props = $props();

  let showExtendedCard: boolean = $state(false);
  let extendedCardModal: HTMLDialogElement | null = $state(null);

  function handleCardClick() {
    if (onclick) onclick(exercise);
    else showExtendedCard = !showExtendedCard;
  }

  $effect(() => {
    if (extendedCardModal) showExtendedCard ? extendedCardModal.showModal() : extendedCardModal.close();
  });
</script>

<button
  class="card w-full transform cursor-pointer bg-neutral-content text-left shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:shadow-2xl sm:max-w-72"
  onclick={handleCardClick}
  onkeydown={(e) => e.key === "Enter" && handleCardClick}
  aria-label={`View details for ${exercise.name}`}
>
  <div class="card-body flex flex-row gap-4 sm:flex-col">
    <!-- Image container -->
    <div class="flex-shrink-0 sm:w-full">
      <div class="flex h-24 w-24 items-center justify-center bg-base-200 sm:h-52 sm:w-52">
        <span>Loading...</span>
      </div>
    </div>

    <!-- Content container -->
    <div class="flex flex-col justify-center">
      <h2 class="card-title mb-2">{exercise.name}</h2>
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap gap-1">
          <div class="badge badge-accent rounded-lg">{exercise.level}</div>
          <div class="badge badge-neutral rounded-lg">{exercise.category}</div>
        </div>
        <div class="flex flex-wrap gap-1">
          <div class="badge badge-secondary rounded-lg">{exercise.equipment}</div>
        </div>
      </div>
    </div>
  </div>
</button>

<dialog id="extendedCardModal" class="modal text-center" bind:this={extendedCardModal}>
  <ExtendedCard {exercise} />
  <form method="dialog" onsubmit={() => (showExtendedCard = false)} class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
