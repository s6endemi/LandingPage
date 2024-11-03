<script lang="ts">
  import type { ExerciseWithAlternatives } from "$lib/types";
  import ExerciseCardWithAlternatives from "./ExerciseCardWithAlternatives.svelte";
  import { ChevronLeft, ChevronRight } from "lucide-svelte";

  let { cards }: { cards: ExerciseWithAlternatives[] } = $props();
  let currentIndex = $state(1);
  let carouselRef: HTMLElement;

  function scrollToNext() {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      const items = carouselRef?.getElementsByClassName("carousel-item");
      if (items?.[currentIndex]) {
        items[currentIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }

  function scrollToPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      const items = carouselRef?.getElementsByClassName("carousel-item");
      if (items?.[currentIndex]) {
        items[currentIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }
</script>

<div class="relative">
  <div class="carousel carousel-center max-w-full space-x-3 p-4 max-sm:space-x-7" bind:this={carouselRef}>
    {#each cards as exercise}
      <ExerciseCardWithAlternatives {exercise} class="carousel-item" />
    {/each}
  </div>

  <!-- Navigation Buttons -->
  {#if currentIndex > 0}
    <div class="absolute inset-y-0 left-0 flex items-center">
      <button class="btn btn-circle btn-ghost -ml-6" onclick={scrollToPrev} aria-label="Previous card">
        <ChevronLeft class="h-6 w-6" />
      </button>
    </div>
  {/if}

  {#if currentIndex < cards.length - 1}
    <div class="absolute inset-y-0 right-0 flex items-center">
      <button class="btn btn-circle btn-ghost -mr-6" onclick={scrollToNext} aria-label="Next card">
        <ChevronRight class="h-6 w-6" />
      </button>
    </div>
  {/if}
</div>

<style>
  /* Hide scrollbar but keep functionality */
  .carousel::-webkit-scrollbar {
    display: none;
  }
  .carousel {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
