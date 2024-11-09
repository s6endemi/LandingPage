<script lang="ts">
  import { GalleryHorizontalEnd, LayoutList, Pencil, PencilOff, Plus, Trash2 } from "lucide-svelte";
  import CardSlider from "$lib/components/CardSlider.svelte";

  let { data } = $props();
  const split = data.split;
  let saved = $state(false);
  let editView = $state(false);
  let listView = $state(false);
  let activeCard: number | null = $state(null);

  function addToProfile() {}
</script>

<main class="container mx-auto p-6">
  <!-- Header -->
  <div class="mb-8 flex justify-end gap-4 max-sm:flex-col">
    <h1 class="text-3xl font-bold">Dein Trainingsplan</h1>

    <div class="flex items-center gap-2">
      <button class="btn btn-info btn-sm" title="List view" onclick={() => (listView = !listView)}>
        {#if listView}
          <LayoutList size={20} />
        {:else}
          <GalleryHorizontalEnd size={20} />
        {/if}
      </button>

      <button class="btn btn-primary btn-sm" title="Edit" onclick={() => (editView = !editView)}>
        {#if editView}
          <PencilOff size={20} />
        {:else}
          <Pencil size={20} />
        {/if}
      </button>

      {#if saved}
        <button class="btn btn-error btn-sm" title="Delete">
          <Trash2 size={20} />
        </button>
      {:else}
        <button class="btn btn-success btn-sm" title="Add to profile" onclick={addToProfile}>
          <Plus size={20} />
        </button>
      {/if}
    </div>
  </div>

  {#if activeCard !== null}
    <div class="fixed inset-0 bg-base-200/50 backdrop-blur-sm"></div>
  {/if}

  <div class="relative">
    {#each split as workoutSplit}
      <section class="mb-12">
        <header class="mb-6 border-b-2 border-base-300 pb-2">
          <h2 class="text-2xl font-bold">
            {workoutSplit.name} - {workoutSplit.frequency}x pro Woche
          </h2>
        </header>

        {#if listView}
          <!-- ... list view ... -->
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr class="text-base">
                  <th>Übung</th>
                  <th class="text-right">Volumen</th>
                </tr>
              </thead>
              <tbody>
                {#each workoutSplit.exercises as exercise}
                  <tr class="hover:bg-base-200">
                    <td class="font-medium">
                      {exercise.primaryExercise.name}
                      {#if exercise.warmupSet}
                        <span class="badge badge-primary badge-xs ml-2">Warm-up</span>
                      {/if}
                    </td>
                    <td class="text-right">
                      <span class="font-mono">
                        {exercise.sets} × {exercise.repetitions[0]}-{exercise.repetitions[1]}
                      </span>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {:else}
          <CardSlider cards={workoutSplit.exercises} />
        {/if}
      </section>
    {/each}
  </div>
</main>
