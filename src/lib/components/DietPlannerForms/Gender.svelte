<script lang="ts">
  import { Gender } from "$lib/types";
  import maleImage from "$lib/assets/male.svg";
  import femaleImage from "$lib/assets/female.svg";
  import otherImage from "$lib/assets/genderless.svg";

  interface CardButtonProps {
    gender: Gender;
    title: string;
    imageSrc: string;
    gradient: string;
    description: string;
  }

  const options: CardButtonProps[] = [
    {
      gender: Gender.Male,
      title: "Männlich",
      imageSrc: maleImage,
      gradient: "from-blue-500 to-blue-600",
      description: "Optimiert für männliche Körperstrukturen",
    },
    {
      gender: Gender.Female,
      title: "Weiblich",
      imageSrc: femaleImage,
      gradient: "from-rose-400 to-rose-500",
      description: "Angepasst an weibliche Physiologie",
    },
    {
      gender: Gender.Other,
      title: "Sonstiges",
      imageSrc: otherImage,
      gradient: "from-purple-400 to-purple-500",
      description: "Individuelle Anpassung möglich",
    },
  ];

  let { gender = $bindable() } = $props();

  function toggleGender(newGender: Gender) {
    gender = newGender === gender ? null : newGender;
  }
</script>

<div class="min-h-[500px] bg-gradient-to-b from-base-200/50 to-base-100 p-8">
  <div class="mx-auto max-w-3xl">
    <!-- Header Section -->
    <div class="mb-12 text-center">
      <h2 class="mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold text-transparent">
        Dein Geschlecht
      </h2>
      <p class="text-base-content/60">Für ein optimal auf dich zugeschnittenes Trainingsprogramm</p>
    </div>

    <!-- Cards Container -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      {#each options as option}
        <button
          class="group relative overflow-hidden rounded-2xl transition-all duration-300 ease-out
                 {gender === option.gender ? 'scale-[1.02] shadow-lg' : 'hover:scale-[1.01] hover:shadow-md'}"
          on:click={() => toggleGender(option.gender)}
        >
          <!-- Card Content -->
          <div class="relative z-10 p-6">
            <!-- Image Container -->
            <div class="mb-6 flex justify-center">
              <div
                class="rounded-full p-4
                         {gender === option.gender
                  ? `bg-gradient-to-br ${option.gradient}`
                  : 'bg-base-200 group-hover:bg-base-300'} 
                         transition-colors duration-300"
              >
                <img
                  src={option.imageSrc}
                  alt={option.title}
                  class="h-16 w-16 transition-transform duration-300
                         {gender === option.gender ? 'scale-110 brightness-0 invert' : 'group-hover:scale-105'}"
                />
              </div>
            </div>

            <!-- Text Content -->
            <div class="space-y-2 text-center">
              <h3 class="text-lg font-semibold">
                {option.title}
              </h3>
              <p class="text-sm text-base-content/60">
                {option.description}
              </p>
            </div>
          </div>

          <!-- Background Effect -->
          <div
            class="absolute inset-0 transition-opacity duration-300
                      {gender === option.gender ? 'opacity-100' : 'opacity-0 group-hover:opacity-5'}"
          >
            <div class="absolute inset-0 bg-gradient-to-br {option.gradient}"></div>
          </div>

          <!-- Border Effect -->
          <div
            class="absolute inset-0 rounded-2xl border-2 transition-colors duration-300
                      {gender === option.gender
              ? `border-${option.gradient.split('-')[2]}-500`
              : 'group-hover:border-base-400 border-base-300'}"
          ></div>
        </button>
      {/each}
    </div>

    <!-- Helper Text -->
    <div class="mt-8 text-center text-sm text-base-content/60">
      Diese Information hilft uns, dein Training und deine Ernährung optimal anzupassen
    </div>
  </div>
</div>

<style>
  /* Optional: Add any custom animations or styles here */
</style>
