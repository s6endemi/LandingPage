<script lang="ts">
  let { trainingLocation = $bindable() } = $props();
</script>

<div class="m-2 space-y-6">
  <div class="space-y-3">
    <label class="text-xl font-bold text-neutral-content" for="training-location">
      Wo möchtest du trainieren?
      <div class="tooltip tooltip-right" data-tip="Wähle deinen bevorzugten Trainingsort: Zuhause oder im Gym.">
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

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <button
        class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-center shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-primary hover:text-primary-content hover:shadow-2xl"
        onclick={() => (trainingLocation = "Zuhause")}
        aria-label="Zuhause"
      >
        <div class="card-body">
          <div class="flex justify-center">
            <img src="/path-to-home-image.jpg" alt="Zuhause Bild" class="h-40 w-full object-cover" />
          </div>
          <h2 class="mt-2 text-lg font-bold">Zuhause</h2>
        </div>
      </button>

      <button
        class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-center shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-secondary hover:text-secondary-content hover:shadow-2xl"
        onclick={() => (trainingLocation = "Gym")}
        aria-label="Gym"
      >
        <div class="card-body">
          <div class="flex justify-center">
            <img src="/path-to-gym-image.jpg" alt="Gym Bild" class="h-40 w-full object-cover" />
          </div>
          <h2 class="mt-2 text-lg font-bold">Gym</h2>
        </div>
      </button>
    </div>
  </div>
</div>
