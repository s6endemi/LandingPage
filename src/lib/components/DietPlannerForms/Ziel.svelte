<script lang="ts">
  import { TrainingGoal } from "$lib/types";
  import { Info } from "lucide-svelte";
  import { Check } from "lucide-svelte";

  interface GoalOption {
    id: TrainingGoal;
    title: string;
    description: string;
    icon: string;
  }

  const goals: GoalOption[] = [
    {
      id: TrainingGoal.BuildMuscle,
      title: "Muskeln aufbauen",
      description: "Kraft und Muskelmasse durch gezieltes Training steigern",
      icon: "💪",
    },
    {
      id: TrainingGoal.LoseWeight,
      title: "Abnehmen",
      description: "Gesund und nachhaltig Körperfett reduzieren",
      icon: "⚖️",
    },
    {
      id: TrainingGoal.GetDefined,
      title: "Definiert werden",
      description: "Muskeldefinition verbessern und Körperfett reduzieren",
      icon: "🎯",
    },
    {
      id: TrainingGoal.MaintainWeight,
      title: "Gewicht halten",
      description: "Aktuelles Gewicht und Fitness-Level beibehalten",
      icon: "🔄",
    },
  ];

  export let goal: TrainingGoal | null = null;

  function selectGoal(newGoal: TrainingGoal) {
    goal = newGoal === goal ? null : newGoal;
  }
</script>

<div class="container mx-auto max-w-3xl p-4">
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold">
        Was ist dein Ziel?
        <span
          class="tooltip tooltip-right ml-2"
          data-tip="Wähle dein primäres Fitnessziel für personalisierte Ernährungsempfehlungen."
        >
          <Info class="inline-block h-5 w-5 cursor-pointer text-info opacity-80" />
        </span>
      </h2>
      <p class="mt-2 text-base-content/70">Wähle das Ziel aus, das am besten zu deinen Fitnesszielen passt</p>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      {#each goals as goalOption}
        <button
          class="group relative flex items-start rounded-xl border-2 p-4 transition-all duration-200
                 {goal === goalOption.id
            ? 'border-primary bg-primary/5 shadow-lg'
            : 'border-base-200 bg-base-100 hover:border-primary/50 hover:bg-base-200/50'}"
          on:click={() => selectGoal(goalOption.id)}
        >
          {#if goal === goalOption.id}
            <div class="absolute right-2 top-2">
              <Check class="h-5 w-5 text-primary" />
            </div>
          {/if}

          <div class="flex w-full items-start space-x-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-base-200 text-2xl">
              {goalOption.icon}
            </div>
            <div class="flex-1">
              <h3 class="font-semibold">{goalOption.title}</h3>
              <p class="mt-1 text-sm text-base-content/70">
                {goalOption.description}
              </p>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>
