<script lang="ts">
  let { duration = $bindable() } = $props();
</script>

<div class="m-2 mt-6 space-y-6">
  <div class="space-y-3">
    <label class="text-xl font-bold text-neutral-content" for="duration">
      Wie lange möchtest du trainieren?
      <div class="tooltip tooltip-right" data-tip="Wähle die ungefähre Trainingsdauer aus">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-info"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </div>
    </label>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <button
        class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-left shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-primary hover:text-primary-content hover:shadow-2xl"
        onclick={() => (duration = 45)}
        aria-label="Kurz (30-60 Minuten)"
      >
        <div class="card-body">
          <h2 class="card-title">Kurz</h2>
          <p class="text-sm text-neutral-content">30-60 Minuten</p>
        </div>
      </button>

      <button
        class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-left shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-secondary hover:text-secondary-content hover:shadow-2xl"
        onclick={() => (duration = 60)}
        aria-label="Normal (60-90 Minuten)"
      >
        <div class="card-body">
          <h2 class="card-title">Normal</h2>
          <p class="text-sm text-neutral-content">60-90 Minuten</p>
        </div>
      </button>

      <button
        class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-left shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-accent hover:text-accent-content hover:shadow-2xl"
        onclick={() => (duration = 90)}
        aria-label="Lang (90-120 Minuten)"
      >
        <div class="card-body">
          <h2 class="card-title">Lang</h2>
          <p class="text-sm text-neutral-content">90-120 Minuten</p>
        </div>
      </button>
    </div>
  </div>
</div>
