<script lang="ts">
  import type { PageData } from "./$types";
  import FilterMenu from "$lib/components/FilterMenu.svelte";
  import { page } from "$app/stores";
  import ExerciseCard from "$lib/components/ExerciseCards/ExerciseCard.svelte";

  export let data: PageData;
  $: ({ exercises, filters } = data);

  $: searchQuery = $page.url.searchParams.get("search") || "";
  $: filteredExercises = exercises.filter((ex) => ex.name.toLowerCase().includes(searchQuery));
</script>

<main class="container mx-auto p-4">
  <div class="mb-4 flex w-full flex-col space-y-4">
    <div class="flex-shrink-0">
      <FilterMenu
        {filters}
        on:search={(query) => {
          filteredExercises = exercises.filter((ex) => ex.name.toLowerCase().includes(query.detail.toLowerCase()));
        }}
      />
    </div>
  </div>

  <!-- Exercise Cards -->
  <div class="w-full">
    {#if filteredExercises.length === 0}
      <div class="alert alert-warning mt-2">
        <span>Keine Übungen gefunden, die mit Ihrer Suche übereinstimmen.</span>
      </div>
    {:else}
      <div class="grid grid-cols-auto-fill gap-4">
        {#each filteredExercises as exercise (exercise.id)}
          <ExerciseCard {exercise} />
        {/each}
      </div>
    {/if}
  </div>
</main>
