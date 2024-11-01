<script lang="ts">
  import { GalleryHorizontalEnd, LayoutList, Pencil, PencilOff, Plus, Trash2 } from "lucide-svelte";
  import { onMount } from "svelte";
  import CardSlider from "$lib/components/CardSlider.svelte";

  let { data } = $props();
  const split = data.split;
  let saved = $state(false);
  let editView = $state(false);
  let listView = $state(false);
  let activeCard: number | null = $state(null);

  // Scroll handling
  onMount(() => {
    const setupHorizontalScroll = (container: HTMLElement) => {
      container.addEventListener(
        "wheel",
        (evt: WheelEvent) => {
          if (Math.abs(evt.deltaX) > Math.abs(evt.deltaY)) return;

          // Only prevent default if no card is expanded
          if (activeCard === null) {
            evt.preventDefault();
            const CARD_WIDTH = 256;
            const scrollAmount = Math.sign(evt.deltaY) * CARD_WIDTH;
            const maxScroll = container.scrollWidth - container.clientWidth;

            container.scrollTo({
              left: Math.max(0, Math.min(container.scrollLeft + scrollAmount, maxScroll)),
              behavior: "smooth",
            });
          }
        },
        { passive: false }
      );
    };

    document.querySelectorAll<HTMLElement>(".horizontal-scroll").forEach(setupHorizontalScroll);
  });

  function addToProfile() {}
</script>

<main class="container mx-auto p-6">
  <!-- Header -->
  <div class="navbar">
    <div class="navbar-end"></div>
    <div class="navbar-end">
      <h1 class="flex-none text-3xl font-bold">Dein Trainingsplan</h1>
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
          <button class="btn btn-success btn-sm flex-none" title="Add to profile" onclick={addToProfile}
            ><Plus /></button
          >
        {/if}
      </div>
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
        {:else}
          <CardSlider cards={workoutSplit.exercises} />
        {/if}
      </section>
    {/each}
  </div>
</main>
