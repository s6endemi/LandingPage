<script lang="ts">
  import type { Exercise, MediaItem } from "$lib/types";
  import MediaCarousel from "../MediaCarousel.svelte";

  export let exercise: Exercise;

  // TODO remove
  const mediaItems: MediaItem[] = [
    {
      type: "image",
      src: "https://training.fit/wp-content/uploads/2019/07/bankdruecken-kurzhantel-flachbank.png",
    },
    {
      type: "image",
      src: "https://s3.ap-south-1.amazonaws.com/litekart.in/img/untitled-360-190px-1500-380px-vzlc6ffmy4ej.png",
    },
    { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  ];
</script>

<div class="card modal-box max-w-4xl bg-neutral-content p-0 text-start">
  <div class="card-body space-y-6 p-8">
    <!-- Header Section -->
    <div class="space-y-4">
      <h2 class="card-title text-3xl font-bold">{exercise.name}</h2>

      <!-- Primary Exercise Info -->
      <div class="flex flex-wrap gap-2">
        <div class="badge badge-lg">{exercise.level}</div>
        <div class="badge badge-neutral badge-lg">{exercise.category}</div>
        <div class="badge badge-lg">{exercise.mechanic}</div>
        <div class="badge badge-neutral badge-lg">{exercise.equipment}</div>
      </div>
    </div>

    <!-- Media Section -->
    <div class="rounded-lg bg-base-200">
      <MediaCarousel {mediaItems} />
    </div>

    <!-- Instructions Section -->
    <div class="space-y-3">
      <h3 class="text-2xl font-bold">Beschreibung</h3>
      <div class="prose max-w-none">
        <ol>
          {#each exercise.instructions as instruction}
            <li class="text-base-content/80">{instruction}</li>
          {/each}
        </ol>
      </div>
    </div>

    <!-- Primary Muscles -->
    <div class="space-y-2">
      <h4 class="text-lg font-semibold text-base-content/70">Primäre Muskeln</h4>
      <div class="flex flex-wrap gap-2">
        {#each exercise.primaryMuscles as muscle}
          <div class="badge badge-accent badge-lg">{muscle}</div>
        {/each}
      </div>

      <!-- Secondary Muscles -->
      {#if exercise.secondaryMuscles.length > 0}
        <div class="space-y-2">
          <h4 class="text-lg font-semibold text-base-content/70">Sekundäre Muskeln</h4>
          <div class="flex flex-wrap gap-2">
            {#each exercise.secondaryMuscles as muscle}
              <div class="badge badge-ghost badge-lg">{muscle}</div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
