<script lang="ts">
  import { Info, Move } from "lucide-svelte";

  interface Props {
    gymFrequency: string | null;
    dailyActivity: string | null;
  }

  let { gymFrequency = $bindable(), dailyActivity = $bindable() }: Props = $props();

  const gymOptions = [
    { value: "1x", title: "1 Mal pro Woche", description: "Gelegentliches Training." },
    { value: "2-3x", title: "2-3 Mal pro Woche", description: "Regelmäßiges Training." },
    { value: "4+", title: "4+ Mal pro Woche", description: "Intensives Training." },
  ];

  const dailyOptions = [
    { value: "Büro", title: "Büro sitzen", description: "Überwiegend sitzende Tätigkeit." },
    { value: "Aktiv", title: "Viel Bewegung", description: "Aktive Tätigkeit, z.B. Handwerker." },
    { value: "Sportlich", title: "Sportlich aktiv", description: "Aktiv im Alltag, z.B. Sportler." },
  ];

  function selectGymOption(optionValue: string) {
    gymFrequency = optionValue === gymFrequency ? null : optionValue;
  }

  function selectDailyOption(optionValue: string) {
    dailyActivity = optionValue === dailyActivity ? null : optionValue;
  }
</script>

<div class="container mx-auto p-6">
  <!-- Gym Activity Level -->
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <label class="text-2xl font-bold" for="gymFrequency">Wie oft trainierst du im Fitnessstudio?</label>
      <div id="gymFrequency" class="tooltip tooltip-right" data-tip="Wähle deine Trainingshäufigkeit im Fitnessstudio.">
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {#each gymOptions as option}
        <button
          class="group relative overflow-hidden rounded-xl border-2 transition-all duration-300
            {gymFrequency === option.value
            ? 'border-blue-500 bg-blue-500/10 shadow-lg'
            : 'border-base-content/10 hover:border-blue-500/50 hover:bg-base-200'}"
          onclick={() => selectGymOption(option.value)}
        >
          <div class="relative flex items-center gap-4 px-6 pt-2">
            <div
              class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10
                transition-all duration-300 group-hover:scale-110
                {gymFrequency === option.value ? 'bg-blue-500/20' : ''}"
            >
              <Move size={32} class={gymFrequency === option.value ? "text-blue-500" : "text-base-content"} />
            </div>

            <div class="flex flex-col items-start text-left">
              <h3 class="text-xl font-semibold">{option.title}</h3>
              <p class="text-sm text-base-content/70">{option.description}</p>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>

  <!-- Daily Activity Level -->
  <div class="mt-8 space-y-6">
    <div class="flex items-center gap-2">
      <label class="text-2xl font-bold" for="dailyActivity">Wie viel bewegst du dich sonst?</label>
      <div id="dailyActivity" class="tooltip tooltip-right" data-tip="Wähle deine berufliche Aktivität.">
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {#each dailyOptions as option}
        <button
          class="group relative overflow-hidden rounded-xl border-2 transition-all duration-300
            {dailyActivity === option.value
            ? 'border-green-500 bg-green-500/10 shadow-lg'
            : 'border-base-content/10 hover:border-green-500/50 hover:bg-base-200'}"
          onclick={() => selectDailyOption(option.value)}
        >
          <div class="relative flex items-center gap-4 px-6 pt-2">
            <div
              class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/10
                transition-all duration-300 group-hover:scale-110
                {dailyActivity === option.value ? 'bg-green-500/20' : ''}"
            >
              <Move size={32} class={dailyActivity === option.value ? "text-green-500" : "text-base-content"} />
            </div>

            <div class="flex flex-col items-start text-left">
              <h3 class="text-xl font-semibold">{option.title}</h3>
              <p class="text-sm text-base-content/70">{option.description}</p>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>
