<script lang="ts">
  import { Info, Home, Building2, Dumbbell, Timer, Users, Clock, ShieldCheck, CheckCircle2 } from "lucide-svelte";

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
      stats: "Perfekt für flexibles Training von Zuhause oder im Park",
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
      stats: "Ideal bei bestehender oder geplanter Gym-Mitgliedschaft",
    },
  ];

  // Custom gold color classes
  const goldClasses = {
    border: "border-gold-500",
    bg: "bg-gold-500/10",
    hoverBorder: "hover:border-gold-500/50",
    text: "text-gold-500",
    bgHover: "bg-gold-500/20",
  };
</script>

<div class="container mx-auto flex flex-col items-center p-6">
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <h1 class="text-3xl font-bold">Wo möchtest du trainieren?</h1>
      <div class="tooltip tooltip-right" data-tip="Wähle deinen bevorzugten Trainingsort: Zuhause oder im Gym.">
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>

    <div class="flex w-full max-w-2xl flex-col gap-4">
      {#each locations as location}
        <button
          class="group relative overflow-hidden rounded-xl border-2 transition-all duration-300
            {trainingLocation === location.value
            ? `${goldClasses.border} ${goldClasses.bg} shadow-lg`
            : `border-base-content/10 ${goldClasses.hoverBorder} hover:bg-base-200`}"
          onclick={() => (trainingLocation = location.value)}
        >
          <div class="relative p-6">
            <!-- Header with Icon -->
            <div class="flex items-center gap-4">
              <div
                class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg ${goldClasses.bg}
                  transition-all duration-300 group-hover:scale-110
                  {trainingLocation === location.value ? goldClasses.bgHover : ''}"
              >
                <location.icon
                  size={32}
                  class="transition-colors duration-300 {trainingLocation === location.value
                    ? goldClasses.text
                    : 'text-base-content'}"
                />
              </div>
              <div class="flex flex-col">
                <h3 class="text-xl font-semibold">{location.title}</h3>
                <p class="text-sm text-base-content/70">{location.description}</p>
              </div>

              <!-- Check Icon (visible when selected) -->
              <div class="ml-auto">
                <CheckCircle2
                  size={24}
                  class="transition-all duration-300
                         {trainingLocation === location.value ? `${goldClasses.text} opacity-100` : 'opacity-0'}"
                />
              </div>
            </div>

            <!-- Benefits -->
            <div class="mt-4 flex flex-wrap gap-4">
              {#each location.benefits as benefit}
                <div class="flex items-center gap-2">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg {goldClasses.bg}">
                    <benefit.icon size={16} class={goldClasses.text} />
                  </div>
                  <span class="text-sm">{benefit.text}</span>
                </div>
              {/each}
            </div>

            <!-- Stats -->
            <div class="mt-4 flex items-center gap-2 text-sm">
              <Info size={16} class="text-base-content/70" />
              <span class="text-base-content/70">{location.stats}</span>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>
