<script lang="ts">
  import { CheckCircle2, Info, Clock, Hourglass, Timer } from "lucide-svelte";

  let { duration = $bindable() } = $props();

  const options = [
    {
      value: 45,
      title: "Kurz",
      description: "Ideal für ein effektives und zeitsparenden Workout",
      timeRange: "30-60 Minuten",
      icon: Hourglass,
      stats: "Effizientes Training • Fokus auf Hauptübungen",
    },
    {
      value: 60,
      title: "Normal",
      description: "Ausgewogene Zeit für ein vollständiges Training",
      timeRange: "60-90 Minuten",
      icon: Clock,
      stats: "Optimale Balance • Zeit für Warm-up & Cool-down",
    },
    {
      value: 90,
      title: "Lang",
      description: "Ausführliches Training mit Raum für Zusatzübungen",
      timeRange: "90-120 Minuten",
      icon: Timer,
      stats: "Umfangreiches Training • Zeit für Details",
    },
  ];
</script>

<div class="flex flex-col items-center justify-center p-4">
  <h1 class="mb-8 text-center text-3xl font-bold">Wie lange möchtest du trainieren?</h1>
  <div class="flex w-full max-w-2xl flex-col gap-4">
    {#each options as option}
      <button
        class="group relative overflow-hidden rounded-xl border-2 transition-all duration-300
            {duration === option.value
          ? 'border-primary bg-primary/10 shadow-lg'
          : 'border-base-content/10 hover:border-primary/50 hover:bg-base-200'}"
        onclick={() => (duration = option.value)}
      >
        <div class="relative flex items-center gap-4 p-6">
          <!-- Icon Container -->
          <div
            class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10
                transition-all duration-300 group-hover:scale-110
                {duration === option.value ? 'bg-primary/20' : ''}"
          >
            <option.icon
              size={32}
              class="text-primary {duration === option.value ? 'text-primary' : 'text-base-content'}"
            />
          </div>

          <!-- Content -->
          <div class="flex flex-col items-start text-left">
            <div class="flex items-center gap-3">
              <h3 class="text-xl font-semibold">{option.title}</h3>
              <span class="text-sm font-medium text-base-content/70">{option.timeRange}</span>
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
                     {duration === option.value ? 'text-primary opacity-100' : 'opacity-0'}"
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
