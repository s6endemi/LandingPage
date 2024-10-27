<script lang="ts">
  import { Level } from "$lib/types";
  import beginnerImg from "$lib/assets/beginner.png";
  import intermediateImg from "$lib/assets/intermediate.png";
  import expertImg from "$lib/assets/expert.png";
  import { Info } from "lucide-svelte";

  interface CardButtonProps {
    level: Level;
    title: string;
    description: string;
    imageSrc: string;
    color: string;
    badge?: string;
  }

  const beginner: CardButtonProps = {
    level: Level.Beginner,
    title: "Anfänger",
    description: "Du trainierst seit weniger als einem Jahr oder startest gerade erst mit dem Krafttraining.",
    imageSrc: beginnerImg,
    color: "success",
    badge: "Neu",
  };

  const intermediate: CardButtonProps = {
    level: Level.Intermediate,
    title: "Fortgeschritten",
    description: "Du trainierst regelmäßig seit 1-3 Jahren und kennst die wichtigsten Grundübungen.",
    imageSrc: intermediateImg,
    color: "warning",
  };

  const expert: CardButtonProps = {
    level: Level.Expert,
    title: "Experte",
    description: "Du trainierst seit mehr als 3 Jahren konsequent und kennst deinen Körper und deine Grenzen genau.",
    imageSrc: expertImg,
    color: "error",
  };

  let { level = $bindable() } = $props();

  function toggleLevel(newLevel: Level) {
    level = newLevel === level ? null : newLevel;
  }

  // leave this in
  const _successClasses = "bg-success/80 text-success-content hover:bg-success/80 hover:text-success-content";
  const _warningClasses = "bg-warning/80 text-warning-content hover:bg-warning/80 hover:text-warning-content";
  const _errorClasses = "bg-error/80 text-error-content hover:bg-error/80 hover:text-error-content";
</script>

{#snippet cardButton(properties: CardButtonProps)}
  <button
    class="card w-full transition-all duration-300 ease-in-out hover:shadow-lg
           {level === properties.level
      ? `bg-${properties.color}/80 text-${properties.color}-content scale-105 shadow-xl`
      : `bg-base-200 hover:bg-${properties.color}/80 hover:text-${properties.color}-content hover:scale-102`}"
    onclick={() => toggleLevel(properties.level)}
    aria-label={properties.title}
  >
    <figure class="relative px-6 pt-6">
      <img
        src={properties.imageSrc}
        alt={`${properties.level.toString()} image`}
        class="aspect-square w-full rounded-xl object-cover shadow-md"
      />
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
      <label class="text-2xl font-bold" for="experience-level"> Wie erfahren bist du? </label>
      <div
        class="tooltip tooltip-right"
        data-tip="Wähle deine Erfahrungsstufe: Anfänger, Fortgeschritten oder Experte."
      >
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {@render cardButton(beginner)}
      {@render cardButton(intermediate)}
      {@render cardButton(expert)}
    </div>
  </div>
</div>
