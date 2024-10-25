<script lang="ts">
  import { Level, TrainingGoal, type Exercise, type ExercisePlan } from "$lib/types";
  import ExperienceLevel from "./ExperienceLevel.svelte";
  import WeeklyFrequency from "./WeeklyFrequency.svelte";
  import TrainingDuration from "./TrainingDuration.svelte";
  import Goals from "./Goals.svelte";
  import TrainingLocation from "./TrainingLocation.svelte";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import { ChevronLeft } from "lucide-svelte";

  interface ButtonsProps {
    variables: (string | Level | TrainingGoal | number | null)[];
    direction: "both" | "back" | "forward";
  }

  interface Props {
    exercises: Exercise[];
  }

  let frequency: number | null = $state(null);
  let duration: number | null = $state(null);
  let level: Level | null = $state(null);
  let progress: number | null = $state(null);
  let goal: TrainingGoal | null = $state(null);
  let furtherGoals: string[] = $state([]);
  let trainingLocation: "Home" | "Gym" | null = $state(null);

  let currentStep = $state(1);
  const totalSteps = 6;

  let customSplit: ExercisePlan[] = $state([]);
  let progressPercentage = $derived(((currentStep - 1) / (totalSteps - 1)) * 100);

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
</script>

{#snippet buttons(
  variables: string | number | Location | Level | TrainingGoal | null,
  direction: "forward" | "back" | "both"
)}
  <div class="pt-5 text-center">
    {#if direction === "both" || direction === "back"}
      <button type="button" onclick={handlePreviousStep} class="btn btn-neutral"> Zurück </button>
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
  {#if customSplit.length === 0}
    <form class="space-y-6">
      <h1 class="text-neutral-content-content mb-6 text-left text-3xl font-bold">Workout Planner</h1>

      <!-- Progress Bar mit Zurück-Button -->
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
          <ExperienceLevel bind:level />
          {@render buttons(level, "forward")}
        {/if}

        {#if currentStep === 2}
          <WeeklyFrequency bind:frequency />
          {@render buttons(frequency, "both")}
        {/if}

        {#if currentStep === 3}
          <TrainingDuration bind:duration />
          {@render buttons(duration, "both")}
        {/if}

        {#if currentStep === 4}
          <Goals bind:goal bind:furtherGoals />
          {@render buttons(goal, "both")}
        {/if}

        {#if currentStep === 5}
          <TrainingLocation bind:trainingLocation />
          {@render buttons(location, "both")}
        {/if}
      </div>

      {#if currentStep === 6}
        <div class="mt-6 justify-center text-center">
          <p>Generiere deinen Trainingsplan...</p>
          <span class="loading loading-spinner loading-lg mt-5"></span>
        </div>
      {/if}
    </form>
  {/if}
</main>
