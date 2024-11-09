<script lang="ts">
  import { Level } from "$lib/types";
  import { Info } from "lucide-svelte";

  interface CardButtonProps {
    level: Level;
    title: string;
    description: string;
    color: string;
    badge?: string;
  }

  const fatBeginner: CardButtonProps = {
    level: Level.Beginner,
    title: "Fettanteil Anfänger",
    description: "Fettanteil unter 25%. Du hast wenig Erfahrung mit dem Training.",
    color: "success",
    badge: "Neu",
  };

  const fatIntermediate: CardButtonProps = {
    level: Level.Intermediate,
    title: "Fettanteil Fortgeschritten",
    description: "Fettanteil zwischen 25% und 15%. Du trainierst regelmäßig.",
    color: "warning",
  };

  const fatExpert: CardButtonProps = {
    level: Level.Expert,
    title: "Fettanteil Experte",
    description: "Fettanteil unter 15%. Du bist sehr fit und trainierst konsequent.",
    color: "error",
  };

  const muscleBeginner: CardButtonProps = {
    level: Level.Beginner,
    title: "Muskelanteil Anfänger",
    description: "Geringer Muskelanteil. Du hast wenig Erfahrung mit dem Krafttraining.",
    color: "success",
    badge: "Neu",
  };

  const muscleIntermediate: CardButtonProps = {
    level: Level.Intermediate,
    title: "Muskelanteil Fortgeschritten",
    description: "Moderater Muskelanteil. Du trainierst regelmäßig.",
    color: "warning",
  };

  const muscleExpert: CardButtonProps = {
    level: Level.Expert,
    title: "Muskelanteil Experte",
    description: "Hoher Muskelanteil. Du bist sehr fit und trainierst konsequent.",
    color: "error",
  };

  let { levelFat = $bindable(), levelMuscle = $bindable() } = $props();

  function toggleLevelFat(newLevel: Level) {
    levelFat = newLevel === levelFat ? null : newLevel;
  }

  function toggleLevelMuscle(newLevel: Level) {
    levelMuscle = newLevel === levelMuscle ? null : newLevel;
  }
</script>

{#snippet cardButton(properties: CardButtonProps)}
  <button
    class="card w-4/5 transition-all duration-300 ease-in-out hover:shadow-lg
           {properties.title.includes('Fettanteil') && levelFat === properties.level
      ? `bg-${properties.color}/80 text-${properties.color}-content scale-105 shadow-xl`
      : properties.title.includes('Muskelanteil') && levelMuscle === properties.level
        ? `bg-${properties.color}/80 text-${properties.color}-content scale-105 shadow-xl`
        : `bg-base-200 hover:bg-${properties.color}/80 hover:text-${properties.color}-content hover:scale-102`} "
    onclick={() =>
      properties.title.includes("Fettanteil") ? toggleLevelFat(properties.level) : toggleLevelMuscle(properties.level)}
    aria-label={properties.title}
  >
    <figure class="relative px-6 pt-6">
      <div class="flex aspect-square w-full items-center justify-center rounded-xl bg-gray-300 shadow-md">
        <span class="text-gray-600">[Bild für {properties.title}]</span>
      </div>
    </figure>
    <div class="card-body items-start gap-2">
      <h2 class="card-title font-bold tracking-tight">
        {properties.title}
      </h2>
      <p class="text-start text-sm leading-relaxed opacity-90">
        {properties.description}
      </p>
    </div>
  </button>
{/snippet}

<div class="container mx-auto p-6">
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <label class="text-2xl font-bold" for="fat-level"> Wie ist dein Fettanteil? </label>
      <div class="tooltip tooltip-right" data-tip="Wähle deinen Fettanteil: Anfänger, Fortgeschritten oder Experte.">
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>
    <div class="grid grid-cols-1 gap-1 sm:grid-cols-3">
      {@render cardButton(fatBeginner)}
      {@render cardButton(fatIntermediate)}
      {@render cardButton(fatExpert)}
    </div>

    <div class="flex items-center gap-2">
      <label class="text-2xl font-bold" for="muscle-level"> Wie ist dein Muskelanteil? </label>
      <div class="tooltip tooltip-right" data-tip="Wähle deinen Muskelanteil: Anfänger, Fortgeschritten oder Experte.">
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {@render cardButton(muscleBeginner)}
      {@render cardButton(muscleIntermediate)}
      {@render cardButton(muscleExpert)}
    </div>
  </div>
</div>
