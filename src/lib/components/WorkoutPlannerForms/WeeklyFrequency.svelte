<script lang="ts">
  import { Info, CheckCircle2, Trophy, Activity } from "lucide-svelte";
  import CalendarCheck from "lucide-svelte/icons/calendar-check";

  let { frequency = $bindable() } = $props();

  const options = [
    {
      value: 1,
      title: "Einstiegstraining",
      description: "Perfekt für Einsteiger oder zur Aufrechterhaltung",
      icon: Activity, // Alternative options: Activity, HeartPulse, Footprints
      stats: "Grundlegende Routine • Fokus auf Ganzkörperübungen",
      range: "1",
    },
    {
      value: 2,
      title: "Regelmäßiges Training",
      description: "Ideal für konstanten Fortschritt und ausgewogenes Training",
      icon: CalendarCheck, // Alternative options: Repeat, Timer, Activity
      stats: "Ausgewogene Routine • Fokus auf Hauptmuskelgruppen",
      range: "2-3",
    },
    {
      value: 3,
      title: "Häufiges Training",
      description: "Für fortgeschrittene Athleten mit hoher Trainingsbereitschaft",
      icon: Trophy, // Alternative options: Flame, Target, Crown
      stats: "Intensive Routine • Fokus auf einzelne Muskeln",
      range: "4+",
    },
  ];
</script>

<div class="container mx-auto flex flex-col items-center p-6">
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <h1 class="text-3xl font-bold">Wie oft möchtest du pro Woche trainieren?</h1>
      <div class="tooltip tooltip-right" data-tip="Wähle die Anzahl deiner wöchentlichen Trainingseinheiten.">
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>

    <div class="flex w-full max-w-2xl flex-col gap-4">
      {#each options as option}
        <button
          class="group relative overflow-hidden rounded-xl border-2 transition-all duration-300
              {frequency === option.value
            ? 'border-secondary bg-secondary/10 shadow-lg'
            : 'border-base-content/10 hover:border-secondary/50 hover:bg-base-200'}"
          onclick={() => (frequency = option.value)}
        >
          <div class="relative flex items-center gap-4 p-6">
            <!-- Icon Container -->
            <div
              class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-secondary/10
                  transition-all duration-300 group-hover:scale-110
                  {frequency === option.value ? 'bg-secondary/20' : ''}"
            >
              <option.icon
                size={32}
                class="text-secondary {frequency === option.value ? 'text-secondary' : 'text-base-content'}"
              />
            </div>

            <!-- Content -->
            <div class="flex flex-col items-start text-left">
              <div class="flex items-center gap-3">
                <h3 class="text-xl font-semibold">{option.title}</h3>
                <span class="text-sm font-medium text-base-content/70">{option.range} mal pro Woche</span>
              </div>
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
                       {frequency === option.value ? 'text-secondary opacity-100' : 'opacity-0'}"
              />
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>
