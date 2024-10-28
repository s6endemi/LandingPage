<script lang="ts">
  import { Gender } from "$lib/types";
  import maleImage from "$lib/assets/male.svg";
  import femaleImage from "$lib/assets/female.svg";
  import otherImage from "$lib/assets/genderless.svg"; // Füge hier das SVG für "Sonstiges" hinzu
  import { Info } from "lucide-svelte";

  interface CardButtonProps {
    gender: Gender;
    title: string;
    imageSrc: string;
    activeColor: string;
    hoverColor: string;
  }

  const maleCard: CardButtonProps = {
    gender: Gender.Male,
    title: "Männlich",
    imageSrc: maleImage,
    activeColor: "bg-blue-500/90 text-white",
    hoverColor: "hover:bg-blue-400/80 hover:text-white",
  };

  const femaleCard: CardButtonProps = {
    gender: Gender.Female,
    title: "Weiblich",
    imageSrc: femaleImage,
    activeColor: "bg-pink-500/90 text-white",
    hoverColor: "hover:bg-pink-400/80 hover:text-white",
  };

  const otherCard: CardButtonProps = {
    gender: Gender.Other, // Stelle sicher, dass "Other" in deinem Gender-Type definiert ist
    title: "Sonstiges",
    imageSrc: otherImage, // Das Bild für "Sonstiges"
    activeColor: "bg-green-400/90 text-white",
    hoverColor: "hover:bg-green-300 /80 hover:text-white",
  };

  let { gender = $bindable() } = $props();

  function toggleGender(newGender: Gender) {
    gender = newGender === gender ? null : newGender;
  }
</script>

{#snippet cardButton(properties: CardButtonProps)}
  <button
    class="card transform-gpu rounded-lg shadow-lg transition-all duration-200 ease-in-out hover:scale-105
           {gender === properties.gender
      ? `${properties.activeColor} scale-105 shadow-md ring ring-opacity-80 ring-offset-2 ring-offset-base-100`
      : `bg-base-200 ${properties.hoverColor}`} "
    onclick={() => toggleGender(properties.gender)}
    aria-label={properties.title}
  >
    <figure class="flex flex-col items-center justify-center space-y-3 p-4">
      <img
        src={properties.imageSrc}
        alt={`${properties.gender.toString()} icon`}
        class="h-24 w-24 rounded-full object-contain shadow-sm
              {gender === properties.gender ? 'brightness-100' : 'brightness-90'}"
      />
      <h2 class="text-lg font-semibold text-base-content">{properties.title}</h2>
    </figure>
  </button>
{/snippet}

<div class="container mx-auto max-w-2xl p-4">
  <div class="space-y-6">
    <h2 class="text-center text-xl font-semibold">
      Welches Geschlecht hast du?
      <span
        class="tooltip tooltip-right ml-2"
        data-tip="Wähle dein biologisches Geschlecht für personalisierte Ernährungsempfehlungen."
      >
        <Info class="inline-block h-5 w-5 cursor-pointer text-info opacity-80" />
      </span>
    </h2>
    <div class="flex justify-center gap-10">
      {@render cardButton(maleCard)}
      {@render cardButton(femaleCard)}
      {@render cardButton(otherCard)}
      <!-- Füge hier die neue Karte hinzu -->
    </div>
  </div>
</div>
