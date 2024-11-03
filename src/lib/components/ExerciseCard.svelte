<script lang="ts">
  import type { Exercise } from "$lib/types";
  interface Props {
    exercise: Exercise;
    onclick?: (exercise: Exercise) => void;
  }
  let { exercise, onclick: clickCard }: Props = $props();
</script>

<button
  class="card w-full transform cursor-pointer bg-neutral-content text-left shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:shadow-2xl sm:max-w-72"
  onclick={() => clickCard?.(exercise)}
  onkeydown={(e) => e.key === "Enter" && clickCard?.(exercise)}
  aria-label={`View details for ${exercise.name}`}
>
  <div class="card-body flex flex-row gap-4 sm:flex-col">
    <!-- Image container - small on left for mobile, full width for desktop -->
    <div class="flex-shrink-0 sm:w-full">
      <div class="h-24 w-24 bg-base-200 sm:h-52 sm:w-52">
        <span>Loading...</span>
      </div>
    </div>

    <!-- Content container -->
    <div class="flex flex-col justify-center">
      <h2 class="card-title mb-2">{exercise.name}</h2>

      <!-- Tags container -->
      <div class="space-y-2">
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
