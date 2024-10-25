<script lang="ts">
  import { onMount } from "svelte";

  // Props
  export let dietaryGoals: string[];
  export let restrictions: string[];
  export let mealOptions: string[];

  let dietaryGoal = "Abnehmen"; // Default value
  let weight = 70; // Default weight in kg
  let height = 170; // Initial height in cm
  let dietaryRestrictions: string[] = [];
  let preferredMeals: string[] = [];
  let isLoading = false;
  let progress: number = 0;

  let currentStep = 1;
  const totalSteps = 5;

  // Calculate progress based on completed steps
  $: progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

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

  function toggleRestriction(restriction: string) {
    if (dietaryRestrictions.includes(restriction)) {
      dietaryRestrictions = dietaryRestrictions.filter((r) => r !== restriction);
    } else {
      dietaryRestrictions = [...dietaryRestrictions, restriction];
    }
  }

  function toggleMeal(meal: string) {
    if (preferredMeals.includes(meal)) {
      preferredMeals = preferredMeals.filter((m) => m !== meal);
    } else {
      preferredMeals = [...preferredMeals, meal];
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isLoading = true;
    progress = 0;

    const interval = setInterval(
      () => {
        progress += Math.pow(20, Math.random()) - 1;
        if (progress >= 100) {
          clearInterval(interval);
          isLoading = false;
        }
      },
      ((Math.random() * 1000) % 300) + 100
    );
  }
</script>

<main class="container mx-auto max-w-xl px-4">
  {#if currentStep <= totalSteps}
    <form on:submit={handleSubmit} class="space-y-6">
      <h1 class="mb-6 text-left text-3xl font-bold text-neutral-content">Ernährungsplan</h1>

      <!-- Progress bar with back button -->
      <div class="relative mx-auto mb-6 flex w-4/5 items-center">
        {#if currentStep > 1}
          <button
            type="button"
            on:click={handlePreviousStep}
            class="absolute -left-6 transform cursor-pointer text-2xl font-bold text-secondary transition hover:scale-110"
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
            class="h-1.5 rounded-full bg-primary transition-all duration-500 ease-in-out"
            style="width: {progressPercentage}%"
          ></div>
        </div>
      </div>

      {#if currentStep === 1}
        <div class="space-y-3">
          <label class="text-xl font-bold text-neutral-content">Was ist dein Ernährungsziel?</label>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {#each dietaryGoals as goal}
              <button
                class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-center shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-primary hover:text-primary-content hover:shadow-2xl"
                on:click={() => (dietaryGoal = goal)}
                aria-label={goal}
              >
                <div class="card-body">
                  <h2 class="mt-2 text-lg font-bold">{goal}</h2>
                </div>
              </button>
            {/each}
          </div>
        </div>

        <div class="mt-5 text-center">
          <button
            type="button"
            on:click={handleNextStep}
            class="rounded bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600"
          >
            Weiter
          </button>
        </div>
      {/if}

      {#if currentStep === 2}
        <div class="space-y-6">
          <div class="space-y-3">
            <label class="text-xl font-bold text-neutral-content">Wie viel wiegst du? (kg)</label>
            <input
              type="number"
              min="30"
              max="250"
              step="0.1"
              class="input input-bordered w-full"
              bind:value={weight}
            />
          </div>

          <div class="space-y-3">
            <label class="text-xl font-bold text-neutral-content">Wie groß bist du? (cm)</label>
            <input type="number" min="120" max="220" step="1" class="input input-bordered w-full" bind:value={height} />
          </div>
        </div>

        <div class="mt-5 text-center">
          <button
            type="button"
            on:click={handlePreviousStep}
            class="rounded bg-gray-400 px-4 py-2 text-white transition duration-300 hover:bg-gray-500"
          >
            Zurück
          </button>
          <button
            type="button"
            on:click={handleNextStep}
            class="ml-4 rounded bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600"
          >
            Weiter
          </button>
        </div>
      {/if}

      {#if currentStep === 3}
        <div class="space-y-3">
          <label class="text-xl font-bold text-neutral-content">Hast du diätetische Einschränkungen?</label>
          <div class="mt-5 flex flex-wrap gap-3">
            {#each restrictions as restriction}
              <button
                type="button"
                on:click={() => toggleRestriction(restriction)}
                class="w-auto rounded-full px-4 py-2 text-sm font-semibold transition duration-300 {dietaryRestrictions.includes(
                  restriction
                )
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-800 hover:bg-green-500 hover:text-white'}"
              >
                {restriction}
              </button>
            {/each}
          </div>
        </div>

        <div class="mt-5 text-center">
          <button
            type="button"
            on:click={handlePreviousStep}
            class="rounded bg-gray-400 px-4 py-2 text-white transition duration-300 hover:bg-gray-500"
          >
            Zurück
          </button>
          <button
            type="button"
            on:click={handleNextStep}
            class="ml-4 rounded bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600"
          >
            Weiter
          </button>
        </div>
      {/if}

      {#if currentStep === 4}
        <div class="space-y-3">
          <label class="text-xl font-bold text-neutral-content">Welche Mahlzeiten möchtest du planen?</label>
          <div class="mt-5 flex flex-wrap gap-3">
            {#each mealOptions as meal}
              <button
                type="button"
                on:click={() => toggleMeal(meal)}
                class="w-auto rounded-full px-4 py-2 text-sm font-semibold transition duration-300 {preferredMeals.includes(
                  meal
                )
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-800 hover:bg-green-500 hover:text-white'}"
              >
                {meal}
              </button>
            {/each}
          </div>
        </div>

        <div class="mt-5 text-center">
          <button
            type="button"
            on:click={handlePreviousStep}
            class="rounded bg-gray-400 px-4 py-2 text-white transition duration-300 hover:bg-gray-500"
          >
            Zurück
          </button>
          <button
            type="button"
            on:click={handleNextStep}
            class="ml-4 rounded bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600"
          >
            Weiter
          </button>
        </div>
      {/if}

      {#if currentStep === 5}
        <div class="text-center">
          <p class="text-lg">Bestätige deine Angaben, um den Ernährungsplan zu generieren.</p>
          <button
            type="submit"
            class="mt-5 rounded bg-green-500 px-6 py-3 text-white transition duration-300 hover:bg-green-600"
          >
            Ernährungsplan erstellen
          </button>
        </div>
      {/if}
    </form>
  {/if}

  {#if isLoading}
    <div class="mt-6 justify-center text-center">
      <progress class="progress w-56" value={progress} max="100"></progress>
      <p>Generiere deinen Ernährungsplan...</p>
    </div>
  {/if}
</main>
