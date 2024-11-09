<script lang="ts">
  import { Gender } from "$lib/types";
  import maleImage from "$lib/assets/male.svg";
  import femaleImage from "$lib/assets/female.svg";
  import otherImage from "$lib/assets/genderless.svg";
  import { fly } from "svelte/transition";

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

<div class="min-h-[500px] bg-gradient-to-b from-slate-50 to-blue-50/30 p-8">
  <div class="mx-auto max-w-3xl">
    <!-- Header Section -->
    <div class="mb-16 text-center" in:fly={{ y: 20, duration: 800, delay: 200 }}>
      <h2 class="mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-4xl font-bold text-transparent">
        Dein Geschlecht
      </h2>
      <p class="text-lg text-slate-600">Für ein optimal auf dich zugeschnittenes Trainingsprogramm</p>
    </div>

    <!-- Cards Container -->
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3" in:fly={{ y: 20, duration: 800, delay: 400 }}>
      {#each options as option, i}
        <button
          class="from-white group relative overflow-hidden rounded-3xl bg-gradient-to-b
                 to-slate-50/50 backdrop-blur-sm transition-all duration-500
                 {gender === option.gender
            ? 'scale-[1.02] shadow-2xl'
            : 'shadow-xl hover:scale-[1.01] hover:shadow-2xl'}"
          on:click={() => toggleGender(option.gender)}
          style="transition-delay: {i * 100}ms"
        >
          <!-- Card Content -->
          <div class="relative z-10 p-8">
            <!-- Image Container -->
            <div class="mb-8 flex justify-center">
              <div
                class="rounded-full p-6 transition-all duration-500 ease-out
                       {gender === option.gender
                  ? `bg-gradient-to-br ${option.gradient} shadow-lg`
                  : 'group-hover:bg-white bg-slate-100'}"
              >
                <img
                  src={option.imageSrc}
                  alt={option.title}
                  class="h-16 w-16 transition-all duration-500
                         {gender === option.gender ? 'scale-110 brightness-0 invert' : 'group-hover:scale-105'}"
                />
              </div>
            </div>

            <!-- Text Content -->
            <div class="space-y-3 text-center">
              <h3 class="text-xl font-semibold text-slate-800">
                {option.title}
              </h3>
              <p class="text-sm text-slate-600">
                {option.description}
              </p>
            </div>
          </div>

          <!-- Glass Effect Background -->
          <div
            class="absolute inset-0 transition-opacity duration-500
                   {gender === option.gender ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'}"
          >
            <div class="absolute inset-0 bg-gradient-to-br {option.gradient}"></div>
          </div>

          <!-- Subtle Border -->
          <div
            class="absolute inset-0 rounded-3xl border transition-all duration-500
                   {gender === option.gender
              ? `border-2 border-${option.gradient.split('-')[2]}-400 shadow-lg`
              : 'border-slate-200 group-hover:border-slate-300'}"
          ></div>
        </button>
      {/each}
    </div>

    <!-- Helper Text -->
    <div
      class="bg-white/50 mx-auto mt-12 max-w-lg rounded-2xl p-4 text-center text-slate-600
             shadow-sm backdrop-blur-sm"
      in:fly={{ y: 20, duration: 800, delay: 600 }}
    >
      Diese Information hilft uns, dein Training und deine Ernährung optimal anzupassen
    </div>
  </div>
</div>

<style>
  /* Add smooth transitions */
  button {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Add hover lift effect */
  button:hover {
    transform: translateY(-2px);
  }

  /* Add active press effect */
  button:active {
    transform: translateY(0);
  }
</style>
