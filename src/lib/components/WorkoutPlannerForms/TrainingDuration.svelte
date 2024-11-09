<script lang="ts">
  import { CheckCircle2, Info, Clock, Hourglass, Timer } from "lucide-svelte";

  let { duration = $bindable() } = $props();

  const options = [
    {
      value: 45,
      title: "Kurz",
      description: "Ideal für ein effektives und zeitsparendes Workout",
      icon: Hourglass,
      stats: "Effizientes Training • Fokus auf Hauptübungen",
      range: "30-60 Minuten",
    },
    {
      value: 60,
      title: "Normal",
      description: "Ausgewogene Zeit für ein vollständiges Training",
      icon: Clock,
      stats: "Optimale Balance • Zeit für Warm-up & Cool-down",
      range: "60-90 Minuten",
    },
    {
      value: 90,
      title: "Lang",
      description: "Ausführliches Training mit Raum für Zusatzübungen",
      icon: Timer,
      stats: "Umfangreiches Training • Zeit für Details",
      range: "90-120 Minuten",
    },
  ];
</script>

<div class="container mx-auto flex w-full flex-col items-center p-6">
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <h1 class="text-3xl font-bold">Wie lange möchtest du trainieren?</h1>
      <div class="tooltip tooltip-right" data-tip="Wähle deine bevorzugte Trainingsdauer pro Einheit.">
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>

    <div class="flex flex-col gap-4">
      {#each options as option}
        <button
          class="group relative overflow-hidden rounded-xl border-2 transition-all duration-300
              {duration === option.value
            ? 'border-secondary bg-secondary/10 shadow-lg'
            : 'border-base-content/10 hover:border-secondary/50 hover:bg-base-200'}"
          onclick={() => (duration = option.value)}
        >
          <div class="relative flex items-center gap-4 p-6">
            <!-- Icon Container -->
            <div
              class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-secondary/10
                  transition-all duration-300 group-hover:scale-110
                  {duration === option.value ? 'bg-secondary/20' : ''}"
            >
              <option.icon
                size={32}
                class="text-secondary {duration === option.value ? 'text-secondary' : 'text-base-content'}"
              />
            </div>

            <!-- Content -->
            <div class="flex flex-col items-start text-left">
              <div class="flex items-center gap-3">
                <h3 class="text-xl font-semibold">{option.title}</h3>
                <span class="text-sm font-medium text-base-content/70">{option.range}</span>
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
                       {duration === option.value ? 'text-secondary opacity-100' : 'opacity-0'}"
              />
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>
