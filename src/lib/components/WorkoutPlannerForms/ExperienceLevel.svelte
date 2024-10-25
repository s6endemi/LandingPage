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
  }

  const beginner: CardButtonProps = {
    level: Level.Beginner,
    title: "Anfänger",
    description: "Du trainierst seit weniger als einem Jahr oder startest gerade erst mit dem Krafttraining.",
    imageSrc: beginnerImg,
    color: "green",
  };

  const intermediate: CardButtonProps = {
    level: Level.Intermediate,
    title: "Fortgeschritten",
    description: "Du trainierst regelmäßig seit 1-3 Jahren und kennst die wichtigsten Grundübungen.",
    imageSrc: intermediateImg,
    color: "yellow",
  };

  const expert: CardButtonProps = {
    level: Level.Expert,
    title: "Experte",
    description: "Du trainierst seit mehr als 3 Jahren konsequent und kennst deinen Körper und deine Grenzen genau.",
    imageSrc: expertImg,
    color: "red",
  };

  let { level = $bindable() } = $props();

  function toggleLevel(newLevel: Level) {
    level = newLevel === level ? null : newLevel;
  }
</script>

{#snippet cardButton(properties: CardButtonProps)}
  <button
    class="card w-full bg-base-200 shadow-xl transition-all duration-300
           {level === properties.level
      ? `scale-105 bg-${properties.color}-500 text-primary-content shadow-2xl`
      : `hover:scale-105 hover:bg-${properties.color}-500 hover:text-primary-content hover:shadow-2xl`}"
    onclick={() => toggleLevel(properties.level)}
    aria-label={properties.title}
  >
    <figure class="px-4 pt-4">
      <img
        src={properties.imageSrc}
        alt={`${properties.level.toString()} image`}
        class="h-full w-full rounded-xl object-cover"
      />
    </figure>
    <div class="card-body items-center text-start">
      <h2 class="card-title">{properties.title}</h2>
      <p class="text-sm">{properties.description}</p>
    </div>
  </button>
{/snippet}

<div class="m-2 space-y-6">
  <div class="space-y-3">
    <label class="text-2xl font-bold text-neutral-content" for="experience-level">
      Wie erfahren bist du?
      <div
        class="tooltip tooltip-right top-1 align-top"
        data-tip="Wähle deine Erfahrungsstufe: Anfänger, Fortgeschritten oder Experte."
      >
        <Info />
      </div>
    </label>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {@render cardButton(beginner)}
      {@render cardButton(intermediate)}
      {@render cardButton(expert)}
    </div>
  </div>
</div>
