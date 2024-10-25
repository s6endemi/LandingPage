<script lang="ts">
  import { TrainingGoal } from "$lib/types";

  interface Props {
    goal: TrainingGoal;
    furtherGoals: string[];
  }

  let { goal = $bindable(), furtherGoals = $bindable() }: Props = $props();

  let activeTags: string[] = $state([]);

  function toggleTag(tag: string) {
    if (activeTags.includes(tag)) {
      activeTags = activeTags.filter((t) => t !== tag);
    } else {
      activeTags = [...activeTags, tag];
    }
  }
</script>

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

      <input type="radio" id="strength" name="goal" value={TrainingGoal.Strength} class="radio" bind:group={goal} />
      <label for="strength">Kraft</label>

      <input type="radio" id="endurance" name="goal" value={TrainingGoal.Endurance} class="radio" bind:group={goal} />
      <label for="endurance">Ausdauer</label>
    </div>
  </div>
  <!-- Erweiterte Ziele: Mehrfachauswahl -->
  <div class="space-y-2">
    <label class="text-xl font-bold text-neutral-content" for="further-goals">
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
      {#each furtherGoals as goal (goal)}
        <button
          type="button"
          onclick={() => toggleTag(goal)}
          class="w-auto rounded-full px-4 py-2 text-sm font-semibold transition duration-300 {activeTags.includes(goal)
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
