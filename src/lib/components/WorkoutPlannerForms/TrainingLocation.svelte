<script lang="ts">
  import { Info, Home, Building2, Dumbbell, Timer, Users, Clock, ShieldCheck } from "lucide-svelte";

  let { trainingLocation = $bindable() } = $props();

  const locations = [
    {
      value: "Home",
      title: "Zuhause",
      description: "Flexibles Training ohne Equipment",
      icon: Home,
      benefits: [
        {
          text: "Keine Anfahrt nötig",
          icon: Clock,
        },
        {
          text: "Maximale Flexibilität",
          icon: Timer,
        },
        {
          text: "Privatsphäre",
          icon: ShieldCheck,
        },
      ],
      advice: "Perfekt für flexibles Training von Zuhause oder im Park",
    },
    {
      value: "Gym",
      title: "Fitnessstudio",
      description: "Professionelles Equipment und motivierende Atmosphäre",
      icon: Building2,
      benefits: [
        {
          text: "Vielfältiges Equipment",
          icon: Dumbbell,
        },
        {
          text: "Community & Support",
          icon: Users,
        },
        {
          text: "Professionelle Umgebung",
          icon: ShieldCheck,
        },
      ],
      advice: "Ideal bei bestehender oder geplanter Gym-Mitgliedschaft",
    },
  ];
</script>

<div class="container mx-auto p-6">
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <label for="location" class="text-2xl font-bold">Wo möchtest du trainieren?</label>
      <div
        id="loaction"
        class="tooltip tooltip-right"
        data-tip="Wähle deinen bevorzugten Trainingsort: Zuhause oder im Gym."
      >
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {#each locations as location}
        <button
          class="group relative overflow-hidden rounded-xl border-2 transition-all duration-300
            {trainingLocation === location.value
            ? 'border-primary bg-primary/10 shadow-lg'
            : 'border-base-content/10 hover:border-primary/50 hover:bg-base-200'}"
          onclick={() => (trainingLocation = location.value)}
        >
          <div class="relative p-6">
            <!-- Header with Icon -->
            <div class="mb-4 flex items-center gap-4">
              <div
                class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10
                  transition-all duration-300 group-hover:scale-110
                  {trainingLocation === location.value ? 'bg-primary/20' : ''}"
              >
                <location.icon
                  size={32}
                  class="text-primary {trainingLocation === location.value ? 'text-primary' : 'text-base-content'}"
                />
              </div>
              <div class="flex flex-col">
                <h3 class="text-start text-xl font-semibold">{location.title}</h3>
                <p class="text-sm text-base-content/70">{location.description}</p>
              </div>
            </div>

            <!-- Benefits -->
            <div class="mb-4 flex flex-wrap gap-4">
              {#each location.benefits as benefit}
                <div class="flex items-center gap-2">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon size={16} class="text-primary" />
                  </div>
                  <span class="text-sm">{benefit.text}</span>
                </div>
              {/each}
            </div>

            <!-- Features -->
            <div class="mt-4 flex items-center gap-2 text-sm">
              <Info size={16} class="text-base-content/70" />
              <span class="text-base-content/70">{location.advice}</span>
            </div>
          </div>

          <!-- Hover Effect Gradient -->
          <div
            class="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0
              transition-opacity duration-300 group-hover:opacity-100"
          ></div>
        </button>
      {/each}
    </div>
  </div>
</div>
