<script lang="ts">
  import { Level, TrainingGoal, type Exercise, type ExercisePlan } from "$lib/types";
  import ExperienceLevel from "./ExperienceLevel.svelte";
  import WeeklyFrequency from "./WeeklyFrequency.svelte";
  import TrainingDuration from "./TrainingDuration.svelte";
  import Goals from "./Goals.svelte";
  import TrainingLocation from "./TrainingLocation.svelte";
  import { ChevronLeft, ChevronRight } from "lucide-svelte";
  import SplitPreview from "./SplitPreview.svelte";
  import { enhance } from "$app/forms";

  type TrainingLocationType = "Home" | "Gym" | null;

  // State management
  let frequency = $state<number | null>(null);
  let duration = $state<number | null>(null);
  let level = $state<Level | null>(null);
  let goal = $state<TrainingGoal | null>(null);
  let furtherGoals = $state<string[]>([]);
  let trainingLocation = $state<TrainingLocationType>(null);
  let currentStep = $state(1);
  let customSplit = $state<ExercisePlan[]>([]);
  let selectedSplit = $state<string | null>(null);

  // Constants
  const TOTAL_STEPS = 7;

  // Computed values
  let progressPercentage = $derived(((currentStep - 1) / (TOTAL_STEPS - 1)) * 100);

  // Navigation functions
  function handleNextStep() {
    if (currentStep < TOTAL_STEPS) {
      currentStep++;
    }
  }

  function handlePreviousStep() {
    if (currentStep > 1) {
      currentStep--;
    }
  }

  const handleSubmit = () => {
    handleNextStep();
  };

  type Direction = "forward" | "both" | "finish";

  function isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return level !== null;
      case 2:
        return frequency !== null;
      case 3:
        return duration !== null;
      case 4:
        return goal !== null;
      case 5:
        return trainingLocation !== null;
      case 6:
        return selectedSplit !== null;
      default:
        return false;
    }
  }
</script>

{#snippet navigationButtons(direction: Direction)}
  <div class="flex justify-center gap-4 pt-5">
    {#if direction === "both" || direction === "finish"}
      <button type="button" onclick={handlePreviousStep} class="btn btn-neutral gap-2">
        <ChevronLeft size={20} />
        Zurück
      </button>
    {/if}

    {#if direction === "both" || direction === "forward"}
      <button
        type="button"
        onclick={handleNextStep}
        disabled={!isStepValid(currentStep)}
        class="btn gap-2 {!isStepValid(currentStep) ? 'btn-disabled' : 'btn-secondary'}"
      >
        Weiter
        <ChevronRight size={20} />
      </button>
    {:else if direction === "finish"}
      <form method="POST" use:enhance={handleSubmit}>
        <input name="frequency" value={frequency} hidden />
        <input name="duration" value={duration} hidden />
        <input name="level" value={level} hidden />
        <input name="goal" value={goal} hidden />
        <input name="furtherGoals" value={furtherGoals} hidden />
        <input name="location" value={level} hidden />
        <button
          type="submit"
          disabled={!isStepValid(currentStep)}
          class="btn gap-2 {!isStepValid(currentStep) ? 'btn-disabled' : 'btn-secondary'}"
        >
          Fertig
        </button>
      </form>
    {/if}
  </div>
{/snippet}

<main class="container mx-auto mt-0 max-w-6xl px-4 py-6 pt-0">
  {#if customSplit.length === 0}
    <form class="space-y-8">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Workout Planner</h1>
        <span class="text-sm text-base-content/70">Schritt {currentStep} von {TOTAL_STEPS}</span>
      </div>

      <!-- Progress Bar with Back Button -->
      <div class="relative mx-auto flex w-4/5 items-center">
        {#if currentStep > 1}
          <button
            type="button"
            onclick={handlePreviousStep}
            class="absolute -left-12 flex h-10 w-10 items-center justify-center rounded-full
                   transition-all hover:bg-base-300"
            aria-label="Zurück"
          >
            <ChevronLeft size={24} />
          </button>
        {/if}
        <div class="h-2 w-full overflow-hidden rounded-full bg-base-200">
          <div
            class="h-full rounded-full bg-secondary transition-all duration-500 ease-out"
            style:width="{progressPercentage}%"
          ></div>
        </div>
      </div>

      <!-- Form Steps -->
      <div class="min-h-[60vh] w-full">
        {#if currentStep === 1}
          <ExperienceLevel bind:level />
          {@render navigationButtons("forward")}
        {/if}

        {#if currentStep === 2}
          <WeeklyFrequency bind:frequency />
          {@render navigationButtons("both")}
        {/if}

        {#if currentStep === 3}
          <TrainingDuration bind:duration />
          {@render navigationButtons("both")}
        {/if}

        {#if currentStep === 4}
          <Goals bind:goal bind:furtherGoals />
          {@render navigationButtons("both")}
        {/if}

        {#if currentStep === 5}
          <TrainingLocation bind:trainingLocation />
          {@render navigationButtons("both")}
        {/if}

        {#if currentStep === 6}
          <SplitPreview {frequency} bind:selectedSplit />
          {@render navigationButtons("finish")}
        {/if}

        {#if currentStep === TOTAL_STEPS}
          <div class="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
            <p class="text-xl">Generiere deinen Trainingsplan...</p>
            <span class="loading loading-spinner loading-lg text-secondary"></span>
          </div>
        {/if}
      </div>
    </form>
  {/if}
</main>
