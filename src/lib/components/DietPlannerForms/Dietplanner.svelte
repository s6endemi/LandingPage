<script lang="ts">
  import { Gender, TrainingGoal } from "$lib/types";
  import GenderSelection from "./Gender.svelte";
  import Age from "./Age.svelte";
  import WeightHeight from "./WeightHeight.svelte";
  import Zustand from "./Zustand.svelte";
  import ActivityLevel from "./ActivityLevel.svelte";
  import Diet from "./Diet.svelte";
  import Ziel from "./Ziel.svelte";
  import { ChevronLeft } from "lucide-svelte";
  import ChevronRight from "lucide-svelte/icons/chevron-right";

  let gender: Gender | null = $state(null);
  let currentStep = $state(1);
  const totalSteps = 7;

  let progressPercentage = $derived(((currentStep - 1) / (totalSteps - 1)) * 100);
  let gymFrequency: string | null = $state(null);
  let dailyActivity: string | null = $state(null);
  let dietPreferences: string[] = $state([]);
  let goal: TrainingGoal | null = $state(null);

  function handleNextStep() {
    if (currentStep < totalSteps) {
      currentStep += 1;
    }
  }

  function handlePreviousStep() {
    if (currentStep > 1) {
      currentStep -= 1;
    }
  }

  function handleWeightHeightSubmit(event: CustomEvent) {
    console.log("Weight and Height submitted:", event.detail);
    handleNextStep();
  }
</script>

{#snippet buttons(variables: Gender | TrainingGoal | null, direction: "forward" | "back" | "both")}
  <div class="pt-5 text-center">
    {#if direction === "both" || direction === "back"}
      <button type="button" onclick={handlePreviousStep} class="btn btn-neutral">Zurück</button>
    {/if}

    {#if direction === "both" || direction === "forward"}
      <button
        type="button"
        onclick={handleNextStep}
        disabled={variables === null}
        class="btn {variables === null ? 'btn-disabled' : 'btn-secondary'} ml-4"
      >
        Weiter
        <ChevronRight />
      </button>
    {/if}
  </div>
{/snippet}

<main class="container mx-auto max-w-6xl px-4">
  <form class="space-y-6">
    <h1 class="text-neutral-content-content mb-6 text-left text-3xl font-bold">Ernährungsplan</h1>

    <div class="relative mx-auto mb-6 flex w-4/5 items-center">
      {#if currentStep > 1}
        <button
          type="button"
          onclick={handlePreviousStep}
          class="absolute -left-6 transform cursor-pointer text-2xl font-bold text-blue-800 transition hover:scale-110"
          aria-label="Zurück"
        >
          <ChevronLeft />
        </button>
      {/if}
      <div class="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          class="h-1.5 rounded-full bg-blue-600 transition-all duration-500 ease-in-out"
          style="width: {progressPercentage}%"
        ></div>
      </div>
    </div>

    <div class="w-full">
      {#if currentStep === 1}
        <GenderSelection bind:gender />
        {@render buttons(gender, "forward")}
      {/if}

      {#if currentStep === 2}
        <Age />
        {@render buttons(gender, "both")}
      {/if}

      {#if currentStep === 3}
        <WeightHeight on:submit={handleWeightHeightSubmit} />
        {@render buttons(gender, "both")}
      {/if}

      {#if currentStep === 4}
        <Zustand />
        {@render buttons(gender, "both")}
      {/if}

      {#if currentStep === 5}
        <ActivityLevel bind:gymFrequency bind:dailyActivity />
        {@render buttons(gender, "both")}
      {/if}

      {#if currentStep === 6}
        <Diet bind:dietPreferences />
        {@render buttons(gender, "both")}
      {/if}

      {#if currentStep === 7}
        <Ziel bind:goal />
        {@render buttons(goal, "both")}
      {/if}
    </div>
  </form>
</main>
