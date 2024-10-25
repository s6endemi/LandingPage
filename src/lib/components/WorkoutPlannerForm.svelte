<script lang="ts">
  import { onMount } from "svelte";
  import { Level, TrainingGoal, type Exercise, type ExercisePlan } from "$lib/types";
  import { createSplit } from "$lib/utils";
  import { assets } from "$app/paths";

  export let exercises: Exercise[];

  let frequency = 4; // Frequenz des Trainings
  let duration = 60; // Initialwert für die Dauer
  let level: Level = Level.Beginner;
  let isLoading = false;
  let progress: number = 0;
  let goal: TrainingGoal = TrainingGoal.Hypertrophy;
  let customSplit: ExercisePlan[] = [];
  let trainingLocation: "Zuhause" | "Gym" = "Zuhause";

  let currentStep = 1;
  const totalSteps = 6;
  let showInfo = false;

  let extendedGoals = [
    "Gesund sein",
    "Athletisch werden",
    "Flexibilität verbessern",
    "Gewicht verlieren",
    "Muskeldefinition",
    "Stress abbauen",
  ];
  let activeTags: string[] = [];

  $: progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  function toggleTag(tag: string) {
    if (activeTags.includes(tag)) {
      activeTags = activeTags.filter((t) => t !== tag);
    } else {
      activeTags = [...activeTags, tag];
    }
  }

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

<main class="container mx-auto max-w-xl px-4">
  {#if customSplit.length === 0}
    <form on:submit={handleSubmit} class="space-y-6">
      <h1 class="text-neutral-content-content mb-6 text-left text-3xl font-bold">Workout Planner</h1>

      <!-- Progress Bar mit Zurück-Button -->
      <div class="relative mx-auto mb-6 flex w-4/5 items-center">
        {#if currentStep > 1}
          <button
            type="button"
            on:click={handlePreviousStep}
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
          <div class="m-2 space-y-6">
            <div class="space-y-3">
              <label class="text-xl font-bold text-neutral-content" for="experience-level">
                Wie erfahren bist du?
                <div
                  class="tooltip tooltip-right"
                  data-tip="Wähle deine Erfahrungsstufe: Anfänger, Fortgeschritten oder Experte."
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-info"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
              </label>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <button
                  class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-center shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-primary hover:text-primary-content hover:shadow-2xl"
                  on:click={() => (level = Level.Beginner)}
                  aria-label="Anfänger"
                >
                  <div class="card-body">
                    <div class="flex justify-center"></div>
                    <h2 class="mt-2 text-lg font-bold">Anfänger</h2>
                  </div>
                </button>

                <button
                  class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-center shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-secondary hover:text-secondary-content hover:shadow-2xl"
                  on:click={() => (level = Level.Intermediate)}
                  aria-label="Fortgeschritten"
                >
                  <div class="card-body">
                    <div class="flex justify-center">
                      <img src="/src/assets/nerd.png" alt="Fortgeschritten Bild" class="h-40 w-full object-cover" />
                    </div>
                    <h2 class="mt-2 text-lg font-bold">Fortgeschritten</h2>
                  </div>
                </button>

                <button
                  class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-center shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-accent hover:text-accent-content hover:shadow-2xl"
                  on:click={() => (level = Level.Expert)}
                  aria-label="Experte"
                >
                  <div class="card-body">
                    <div class="flex justify-center">
                      <img src="/path-to-expert-image.jpg" alt="Experte Bild" class="h-40 w-full object-cover" />
                    </div>
                    <h2 class="mt-2 text-lg font-bold">Experte</h2>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="mt-5 text-center">
            <button
              type="button"
              on:click={handleNextStep}
              class="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            >
              Weiter
            </button>
          </div>
        {/if}

        {#if currentStep === 2}
          <div class="m-2 space-y-6">
            <div class="space-y-2">
              <label class="text-xl font-bold text-neutral-content" for="frequency">
                Wie oft möchtest du trainieren?
              </label>
              <div class="mt-3 space-y-5">
                <button
                  type="button"
                  on:click={() => handleFrequencyChange(1)}
                  class="w-full rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                >
                  1 Mal pro Woche
                </button>
                <button
                  type="button"
                  on:click={() => handleFrequencyChange(3)}
                  class="w-full rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                >
                  2-3 Mal pro Woche
                </button>
                <button
                  type="button"
                  on:click={() => handleFrequencyChange(4)}
                  class="w-full rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                >
                  4+ Mal pro Woche
                </button>
              </div>
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
              class="ml-4 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            >
              Weiter
            </button>
          </div>
        {/if}

        {#if currentStep === 3}
          <div class="m-2 mt-6 space-y-6">
            <div class="space-y-3">
              <label class="text-xl font-bold text-neutral-content" for="duration">
                Wie lange möchtest du trainieren?
                <div class="tooltip tooltip-right" data-tip="Wähle die ungefähre Trainingsdauer aus">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-info"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
              </label>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <button
                  class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-left shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-primary hover:text-primary-content hover:shadow-2xl"
                  on:click={() => setDuration(45)}
                  aria-label="Kurz (30-60 Minuten)"
                >
                  <div class="card-body">
                    <h2 class="card-title">Kurz</h2>
                    <p class="text-sm text-neutral-content">30-60 Minuten</p>
                  </div>
                </button>

                <button
                  class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-left shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-secondary hover:text-secondary-content hover:shadow-2xl"
                  on:click={() => setDuration(60)}
                  aria-label="Normal (60-90 Minuten)"
                >
                  <div class="card-body">
                    <h2 class="card-title">Normal</h2>
                    <p class="text-sm text-neutral-content">60-90 Minuten</p>
                  </div>
                </button>

                <button
                  class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-left shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-accent hover:text-accent-content hover:shadow-2xl"
                  on:click={() => setDuration(90)}
                  aria-label="Lang (90-120 Minuten)"
                >
                  <div class="card-body">
                    <h2 class="card-title">Lang</h2>
                    <p class="text-sm text-neutral-content">90-120 Minuten</p>
                  </div>
                </button>
              </div>
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
              class="ml-4 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            >
              Weiter
            </button>
          </div>
        {/if}

        {#if currentStep === 4}
          <div class="m-2 space-y-6">
            <div class="space-y-2">
              <label class="text-xl font-bold text-neutral-content" for="frequency">
                Wie lange möchtest du trainieren?
              </label>
              <div class="mt-3 space-y-5">
                <button
                  type="button"
                  on:click={() => handleFrequencyChange(1)}
                  class="w-full rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                >
                  Kurz (30-60min)
                </button>
                <button
                  type="button"
                  on:click={() => handleFrequencyChange(3)}
                  class="w-full rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                >
                  Normal (60-90min)
                </button>
                <button
                  type="button"
                  on:click={() => handleFrequencyChange(4)}
                  class="w-full rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                >
                  Lang (90-120min)
                </button>
              </div>
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
              class="ml-4 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            >
              Weiter
            </button>
          </div>
        {/if}

        {#if currentStep === 5}
          <div class="m-2 space-y-6">
            <div class="space-y-2">
              <label class="text-xl font-bold text-neutral-content" for="goal">Was ist dein Ziel?</label>
              <div class="mt-3 flex space-x-4">
                <input
                  type="radio"
                  id="hypertrophy"
                  name="goal"
                  value={TrainingGoal.Hypertrophy}
                  class="radio"
                  checked={true}
                  bind:group={goal}
                />
                <label for="hypertrophy">Muskeln</label>

                <input
                  type="radio"
                  id="strength"
                  name="goal"
                  value={TrainingGoal.Strength}
                  class="radio"
                  bind:group={goal}
                />
                <label for="strength">Kraft</label>

                <input
                  type="radio"
                  id="endurance"
                  name="goal"
                  value={TrainingGoal.Endurance}
                  class="radio"
                  bind:group={goal}
                />
                <label for="endurance">Ausdauer</label>
              </div>
            </div>
            <!-- Erweiterte Ziele: Mehrfachauswahl -->
            <div class="space-y-2">
              <label class="text-xl font-bold text-neutral-content" for="extended-goals">
                Erweiterte Ziele (Optional)
                <div class="tooltip tooltip-right" data-tip="Wähle mehrere Ziele, um dein Training anzupassen">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 23 23"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-info"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
              </label>
              <div class="mt-5 flex flex-wrap gap-3">
                {#each extendedGoals as goal (goal)}
                  <button
                    type="button"
                    on:click={() => toggleTag(goal)}
                    class="w-auto rounded-full px-4 py-2 text-sm font-semibold transition duration-300 {activeTags.includes(
                      goal
                    )
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white'}"
                  >
                    {#if goal === "Gesund sein"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-salad mr-2 inline-block"
                      >
                        <path d="M7 21h10" />
                        <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
                        <path
                          d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"
                        />
                        <path d="m13 12 4-4" />
                        <path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" />
                      </svg>
                    {/if}

                    {#if goal === "Athletisch werden"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-biceps-flexed"
                        ><path
                          d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1"
                        /><path d="M15 14a5 5 0 0 0-7.584 2" /><path d="M9.964 6.825C8.019 7.977 9.5 13 8 15" /></svg
                      >
                    {/if}
                    {goal}
                  </button>
                {/each}
              </div>
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
              class="ml-4 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            >
              Weiter
            </button>
          </div>
        {/if}

        {#if currentStep === 6}
          <div class="m-2 space-y-6">
            <div class="space-y-3">
              <label class="text-xl font-bold text-neutral-content" for="training-location">
                Wo möchtest du trainieren?
                <div
                  class="tooltip tooltip-right"
                  data-tip="Wähle deinen bevorzugten Trainingsort: Zuhause oder im Gym."
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-info"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
              </label>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-center shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-primary hover:text-primary-content hover:shadow-2xl"
                  on:click={() => (trainingLocation = "Zuhause")}
                  aria-label="Zuhause"
                >
                  <div class="card-body">
                    <div class="flex justify-center">
                      <img src="/path-to-home-image.jpg" alt="Zuhause Bild" class="h-40 w-full object-cover" />
                    </div>
                    <h2 class="mt-2 text-lg font-bold">Zuhause</h2>
                  </div>
                </button>

                <button
                  class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-center shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-secondary hover:text-secondary-content hover:shadow-2xl"
                  on:click={() => (trainingLocation = "Gym")}
                  aria-label="Gym"
                >
                  <div class="card-body">
                    <div class="flex justify-center">
                      <img src="/path-to-gym-image.jpg" alt="Gym Bild" class="h-40 w-full object-cover" />
                    </div>
                    <h2 class="mt-2 text-lg font-bold">Gym</h2>
                  </div>
                </button>
              </div>
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
              class="ml-4 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            >
              Weiter
            </button>
          </div>
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
