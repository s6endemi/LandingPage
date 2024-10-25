<script lang="ts">
  import { Info, CheckCircle2, Trophy } from "lucide-svelte";
  import Baby from "lucide-svelte/icons/baby";
  import CalendarCheck from "lucide-svelte/icons/calendar-check";

  let { frequency = $bindable() } = $props();

  const options = [
    {
      value: 1,
      title: "Einstiegstraining (1 mal)",
      description: "Perfekt für Einsteiger oder zur Aufrechterhaltung",
      icon: Baby, // Alternative options: Activity, HeartPulse, Footprints
      stats: "Grundlegende Routine • Fokus auf Ganzkörperübungen",
    },
    {
      value: 2,
      title: "Regelmäßiges Training (2-3 mal)",
      description: "Ideal für konstanten Fortschritt und ausgewogenes Training",
      icon: CalendarCheck, // Alternative options: Repeat, Timer, Activity
      stats: "Ausgewogene Routine • Fokus auf Hauptmuskelgruppen",
    },
    {
      value: 3,
      title: "Häufiges Training (4+ mal)",
      description: "Für fortgeschrittene Athleten mit hoher Trainingsbereitschaft",
      icon: Trophy, // Alternative options: Flame, Target, Crown
      stats: "Intensive Routine • Fokus auf einzelne Muskeln",
    },
  ];
</script>

<div class="flex flex-col items-center justify-center p-4">
  <h1 class="mb-8 text-center text-3xl font-bold">Wie oft möchtest du pro Woche trainieren?</h1>
  <div class="flex w-full max-w-2xl flex-col gap-4">
    {#each options as option}
      <button
        class="group relative overflow-hidden rounded-xl border-2 transition-all duration-300
               {frequency === option.value
          ? 'border-primary bg-primary/10 shadow-lg'
          : 'border-base-content/10 hover:border-primary/50 hover:bg-base-200'}"
        onclick={() => (frequency = option.value)}
      >
        <div class="relative flex items-center gap-4 p-6">
          <!-- Icon Container -->
          <div
            class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10
                      transition-all duration-300 group-hover:scale-110
                      {frequency === option.value ? 'bg-primary/20' : ''}"
          >
            <option.icon
              size={32}
              class="text-primary {frequency === option.value ? 'text-primary' : 'text-base-content'}"
            />
          </div>

          <!-- Content -->
          <div class="flex flex-col items-start text-left">
            <h3 class="text-xl font-semibold">{option.title}</h3>
            <p class="text-sm text-base-content/70">{option.description}</p>
            <div class="mt-2 flex items-center gap-2 text-sm">
              <Info size={16} class="text-base-content/70" />
              <span class="text-base-content/70">{option.stats}</span>
            </div>
          </div>

          <!-- Check Icon (visible when selected) -->
          <div class="absolute right-6 top-1/2 -translate-y-1/2 transform">
            <CheckCircle2
              size={24}
              class="transition-all duration-300
                     {frequency === option.value ? 'text-primary opacity-100' : 'opacity-0'}"
            />
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
