<script lang="ts">
  import { TrainingGoal } from "$lib/types";
  import { Info, Zap, Timer, Heart, Trophy, Target, Brain, BicepsFlexed, Flame } from "lucide-svelte";
  import Move from "lucide-svelte/icons/move";
  import Shield from "lucide-svelte/icons/shield";

  interface Props {
    goal: TrainingGoal | null;
    furtherGoals: string[];
  }

  let { goal = $bindable(), furtherGoals: activeTags = $bindable() }: Props = $props();

  const mainGoals = [
    {
      value: TrainingGoal.Strength,
      title: "Kraft",
      description: "Maximale Kraftentwicklung und Leistung",
      icon: Zap,
      stats: "Schweres Gewicht • 4-8 Wiederholungen",
    },
    {
      value: TrainingGoal.Hypertrophy,
      title: "Muskeln",
      description: "Fokus auf Muskelaufbau und Definition",
      icon: BicepsFlexed,
      stats: "Moderates Gewicht • 8-12 Wiederholungen",
    },
    {
      value: TrainingGoal.Endurance,
      title: "Ausdauer",
      description: "Verbesserung der Muskelausdauer",
      icon: Timer,
      stats: "Leichtes Gewicht • 12+ Wiederholungen",
    },
  ];

  interface Goals {
    goal: string;
    icon: any;
  }

  const furtherGoals: Goals[] = [
    { goal: "Gesund bleiben", icon: Heart },
    { goal: "Verletzungsprävention", icon: Shield },
    { goal: "Athletischer werden", icon: Zap },
    { goal: "Beweglichkeit verbessern", icon: Move },
    { goal: "Wettkampf", icon: Trophy },
    { goal: "Muskeldefinition", icon: Target },
    { goal: "Stress abbauen", icon: Brain },
    { goal: "Leistung steigern", icon: Flame },
  ];

  function toggleTag(tag: string) {
    if (activeTags.includes(tag)) {
      activeTags = activeTags.filter((t) => t !== tag);
    } else {
      activeTags = [...activeTags, tag];
    }
  }
</script>

<div class="container mx-auto p-6">
  <!-- purple-500 Goals -->
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <label class="text-2xl font-bold" for="Goal">Was ist dein Ziel?</label>
      <div id="Goal" class="tooltip tooltip-right" data-tip="Wähle dein primäres Trainingsziel">
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {#each mainGoals as option}
        <button
          class="group relative overflow-hidden rounded-xl border-2 transition-all duration-300
            {goal === option.value
            ? 'border-purple-500 bg-purple-500/10 shadow-lg'
            : 'border-base-content/10 hover:border-purple-500/50 hover:bg-base-200'}"
          onclick={() => (goal = option.value)}
        >
          <div class="relative flex items-center gap-4 px-6 pt-2">
            <div
              class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/10
                transition-all duration-300 group-hover:scale-110
                {goal === option.value ? 'bg-purple-500/20' : ''}"
            >
              <option.icon size={32} class={goal === option.value ? "text-purple-500" : "text-base-content"} />
            </div>

            <div class="flex flex-col items-start text-left">
              <h3 class="text-xl font-semibold">{option.title}</h3>
              <p class="text-sm text-base-content/70">{option.description}</p>
            </div>
          </div>
          <div class="m-2 flex items-center gap-2 text-sm">
            <Info size={16} class="text-base-content/70" />
            <span class="text-base-content/70">{option.stats}</span>
          </div>
          <div
            class="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/5 to-secondary/5 opacity-0
              transition-opacity duration-300 group-hover:opacity-100"
          ></div>
        </button>
      {/each}
    </div>
  </div>

  <!-- Further Goals -->
  <div class="mt-8 space-y-6">
    <div class="flex items-center gap-2">
      <label class="text-2xl font-bold" for="furtherGoals">Erweiterte Ziele</label>
      <div id="furtherGoals" class="tooltip tooltip-right" data-tip="Wähle zusätzliche Trainingsziele (Optional)">
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {#each furtherGoals as { goal, icon: AltIcon }}
        <button
          type="button"
          onclick={() => toggleTag(goal)}
          class="group flex items-center gap-3 rounded-xl border-2 p-4 transition-all duration-300
            {activeTags.includes(goal)
            ? 'border-secondary bg-secondary/10 shadow-lg'
            : 'border-base-content/10 hover:border-secondary/50 hover:bg-base-200'}"
        >
          <div
            class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary/10
              transition-all duration-300 group-hover:scale-110
              {activeTags.includes(goal) ? 'bg-secondary/20' : ''}"
          >
            <AltIcon
              size={24}
              class="text-secondary {activeTags.includes(goal) ? 'text-secondary' : 'text-base-content'}"
            />
          </div>
          <span class="text-sm font-medium">{goal}</span>
        </button>
      {/each}
    </div>
  </div>
</div>
