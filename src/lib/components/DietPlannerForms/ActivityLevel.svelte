<script lang="ts">
  import { Activity, UserCircle2, Move } from "lucide-svelte";

  interface Props {
    gymFrequency: string | null;
    dailyActivity: string | null;
  }

  let { gymFrequency = $bindable(), dailyActivity = $bindable() }: Props = $props();

  const gymOptions = [
    {
      value: "1x",
      title: "Once Weekly",
      description: "Building foundations",
    },
    {
      value: "2-3x",
      title: "2-3 Times Weekly",
      description: "Regular training routine",
    },
    {
      value: "4+",
      title: "4+ Times Weekly",
      description: "Advanced commitment",
    },
  ];

  const dailyOptions = [
    {
      value: "office",
      title: "Office Work",
      description: "Predominantly seated position",
    },
    {
      value: "active",
      title: "Active Profession",
      description: "Regular physical activity",
    },
    {
      value: "dynamic",
      title: "Dynamic Lifestyle",
      description: "Constant movement required",
    },
  ];

  function selectGymOption(optionValue: string) {
    gymFrequency = optionValue === gymFrequency ? null : optionValue;
  }

  function selectDailyOption(optionValue: string) {
    dailyActivity = optionValue === dailyActivity ? null : optionValue;
  }
</script>

<div class="container mx-auto max-w-5xl space-y-12 p-6">
  <!-- Gym Activity Section -->
  <section class="space-y-6">
    <div class="flex items-center gap-3">
      <h2 class="text-2xl font-light tracking-wide">Exercise Frequency</h2>
      <div class="tooltip tooltip-right" data-tip="Select your typical weekly exercise routine">
        <Activity class="h-5 w-5 opacity-50" />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      {#each gymOptions as option}
        <button
          class="group relative overflow-hidden rounded-xl border transition-all duration-300 ease-in-out
            {gymFrequency === option.value
            ? 'border-primary/30 bg-primary/5 shadow-lg'
            : 'border-base-content/10 hover:border-primary/20 hover:bg-base-200/30'}"
          on:click={() => selectGymOption(option.value)}
        >
          <div class="p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-lg
                    transition-all duration-300 ease-in-out
                    {gymFrequency === option.value ? 'bg-primary/10' : 'bg-base-200 group-hover:bg-primary/5'}"
                >
                  <Move
                    class="h-6 w-6 transition-colors duration-300
                      {gymFrequency === option.value ? 'text-primary' : 'text-base-content/70'}"
                  />
                </div>
              </div>
              <div class="flex flex-col items-start text-left">
                <h3
                  class="text-lg font-medium tracking-wide
                  {gymFrequency === option.value ? 'text-primary' : ''}"
                >
                  {option.title}
                </h3>
                <p class="mt-1 text-sm text-base-content/60">{option.description}</p>
              </div>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </section>

  <!-- Daily Activity Section -->
  <section class="space-y-6">
    <div class="flex items-center gap-3">
      <h2 class="text-2xl font-light tracking-wide">Daily Activity Level</h2>
      <div class="tooltip tooltip-right" data-tip="Select your typical daily activity pattern">
        <UserCircle2 class="h-5 w-5 opacity-50" />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      {#each dailyOptions as option}
        <button
          class="group relative overflow-hidden rounded-xl border transition-all duration-300 ease-in-out
            {dailyActivity === option.value
            ? 'border-secondary/30 bg-secondary/5 shadow-lg'
            : 'border-base-content/10 hover:border-secondary/20 hover:bg-base-200/30'}"
          on:click={() => selectDailyOption(option.value)}
        >
          <div class="p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-lg
                    transition-all duration-300 ease-in-out
                    {dailyActivity === option.value ? 'bg-secondary/10' : 'bg-base-200 group-hover:bg-secondary/5'}"
                >
                  <UserCircle2
                    class="h-6 w-6 transition-colors duration-300
                      {dailyActivity === option.value ? 'text-secondary' : 'text-base-content/70'}"
                  />
                </div>
              </div>
              <div class="flex flex-col items-start text-left">
                <h3
                  class="text-lg font-medium tracking-wide
                  {dailyActivity === option.value ? 'text-secondary' : ''}"
                >
                  {option.title}
                </h3>
                <p class="mt-1 text-sm text-base-content/60">{option.description}</p>
              </div>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </section>
</div>
