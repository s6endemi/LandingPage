<script lang="ts">
  import { onMount } from "svelte";
  import { Level, TrainingGoal, type Exercise, type ExercisePlan } from "$lib/types";
  import { createSplit } from "$lib/utils";
  import { assets } from "$app/paths";
  import ExperienceLevel from "./ExperienceLevel.svelte";
  import WeeklyFrequency from "./WeeklyFrequency.svelte";
  import TrainingDuration from "./TrainingDuration.svelte";
  import Goals from "./Goals.svelte";
  import TrainingLocation from "./TrainingLocation.svelte";

  interface Props {
    exercises: Exercise[];
  }

  let { exercises }: Props = $props();

  let frequency = $state(4); // Frequenz des Trainings
  let duration = $state(60); // Initialwert für die Dauer
  let level: Level = $state(Level.Beginner);
  let isLoading = $state(false);
  let progress: number = $state(0);
  let goal: TrainingGoal = $state(TrainingGoal.Hypertrophy);
  let customSplit: ExercisePlan[] = $state([]);
  let trainingLocation: "Zuhause" | "Gym" = $state("Zuhause");

  let currentStep = $state(1);
  const totalSteps = 6;
  let showInfo = false;

  let furtherGoals = $state([
    "Gesund sein",
    "Athletisch werden",
    "Flexibilität verbessern",
    "Gewicht verlieren",
    "Muskeldefinition",
    "Stress abbauen",
  ]);

  let progressPercentage = $derived(((currentStep - 1) / (totalSteps - 1)) * 100);

  onMount(() => {
    const restDayHint = document.getElementById("restDayHint");
    updateFrequency(frequency, restDayHint);
  });

  function updateFrequency(value: number, restDayHint: HTMLElement | null) {
    if (value === 7 && restDayHint) {
      restDayHint.classList.remove("hidden");
    } else if (restDayHint) {
      restDayHint.classList.add("hidden");
    }
  }

  function handleFrequencyChange(value: number) {
    frequency = value;
    handleNextStep(); // Weiter zum nächsten Schritt
  }

  function setDuration(value: number) {
    duration = value;
    handleNextStep();
  }

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

  function handleSubmit(event: Event) {
    event.preventDefault();
    isLoading = true;
    progress = 0;

    const interval = setInterval(
      () => {
        progress += Math.pow(20, Math.random()) - 1;
        if (progress >= 100) {
          clearInterval(interval);
          isLoading = false;
          customSplit = createSplit(exercises, frequency, duration, level, goal);
        }
      },
      ((Math.random() * 1000) % 300) + 100
    );
  }

  function toggleInfo() {
    showInfo = !showInfo;
  }
</script>

{#snippet buttons(direction: string)}
  <div class="mt-5 text-center">
    {#if direction === "both" || direction === "back"}
      <button
        type="button"
        onclick={handlePreviousStep}
        class="rounded bg-gray-400 px-4 py-2 text-white transition duration-300 hover:bg-gray-500"
      >
        Zurück
      </button>
    {/if}
    {#if direction === "both" || direction === "forward"}
      <button
        type="button"
        onclick={handleNextStep}
        class="ml-4 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
      >
        Weiter
      </button>
    {/if}
  </div>
{/snippet}

<main class="container mx-auto max-w-xl px-4">
  {#if customSplit.length === 0}
    <form onsubmit={handleSubmit} class="space-y-6">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L9.83 12z" />
            </svg>
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
          {@render buttons("forward")}
        {/if}

        {#if currentStep === 2}
          <WeeklyFrequency bind:frequency />
          {@render buttons("both")}
        {/if}

        {#if currentStep === 3}
          <TrainingDuration bind:duration />
          {@render buttons("both")}
        {/if}

        {#if currentStep === 4}
          <Goals bind:goal bind:furtherGoals />
          {@render buttons("both")}
        {/if}

        {#if currentStep === 5}
          <TrainingLocation bind:trainingLocation />
          {@render buttons("both")}
        {/if}
      </div>

      {#if isLoading}
        <div class="mt-6 justify-center text-center">
          <progress class="progress w-56" value={progress} max="100"></progress>
          <p>Generiere deinen Trainingsplan...</p>
        </div>
      {/if}
    </form>
  {/if}
</main>
