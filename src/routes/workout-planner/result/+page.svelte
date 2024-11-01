<script lang="ts">
  import CustomWorkout from "$lib/components/CustomWorkout.svelte";
  import { GalleryHorizontalEnd, LayoutList, Pencil, PencilOff, Plus, Trash2 } from "lucide-svelte";

  let { data } = $props();
  const split = data.split;
  let saved = $state(false);
  let editView = $state(false);
  let listView = $state(false);

  function addToProfile() {
    saved = true;
  }
</script>

<main class="container mx-auto p-6">
  <!-- Header -->
  <div class="navbar">
    <h1 class="flex-1 text-3xl font-bold">Dein Trainingsplan</h1>
    <div class="m-5 flex-none space-x-2">
      <button class="btn btn-info btn-sm flex-none" title="List view" onclick={() => (listView = !listView)}>
        {#if listView}
          <LayoutList />
        {:else}
          <GalleryHorizontalEnd />
        {/if}
      </button>
      <button class="btn btn-primary btn-sm flex-none" title="Edit" onclick={() => (editView = !editView)}>
        {#if editView}
          <PencilOff />
        {:else}
          <Pencil />
        {/if}
      </button>
      {#if saved}
        <button class="btn btn-error btn-sm flex-none" title="Delete"><Trash2 /></button>
      {:else}
        <button class="btn btn-success btn-sm flex-none" title="Add to profile" onclick={addToProfile}><Plus /></button>
      {/if}
    </div>
  </div>
</main>

<CustomWorkout {split} />
