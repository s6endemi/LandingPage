<script lang="ts">
  import type { Exercise } from "$lib/types";

  interface Props {
    exercise: Exercise;
    onclick?: (exercise: Exercise) => void;
  }

  let { exercise, onclick: clickCard }: Props = $props();
</script>

<button
  class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral-content text-left shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:shadow-2xl"
  onclick={() => clickCard?.(exercise)}
  onkeydown={(e) => e.key === "Enter" && clickCard?.(exercise)}
  aria-label={`View details for ${exercise.name}`}
>
  <div class="card-body">
    <h2 class="card-title">{exercise.name}</h2>
    <div class="flex flex-wrap space-x-1">
      <div class="badge badge-accent rounded-lg">{exercise.level}</div>
      <div class="badge badge-neutral rounded-lg">{exercise.category}</div>
    </div>
    <div class="flex flex-wrap space-x-1">
      <div class="badge badge-secondary rounded-lg">{exercise.equipment}</div>
    </div>
    <div class="flex space-x-2">
      <div class="flex h-52 w-52 items-center justify-center bg-base-200">
        <span>Loading...</span>
      </div>
    </div>
  </div>
</button>
