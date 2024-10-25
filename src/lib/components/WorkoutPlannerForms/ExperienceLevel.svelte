<script lang="ts">
  import { Level } from "$lib/types";

  let { level = $bindable() } = $props();
</script>

<div class="m-2 space-y-6">
  <div class="space-y-3">
    <label class="text-xl font-bold text-neutral-content" for="experience-level">
      Wie erfahren bist du?
      <div
        class="tooltip tooltip-right"
        data-tip="Wähle deine Erfahrungsstufe: Anfänger, Fortgeschritten oder Experte."
      >
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
        class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-center shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-primary hover:text-primary-content hover:shadow-2xl"
        onclick={() => (level = Level.Beginner)}
        aria-label="Anfänger"
      >
        <div class="card-body">
          <div class="flex justify-center"></div>
          <h2 class="mt-2 text-lg font-bold">Anfänger</h2>
        </div>
      </button>

      <button
        class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-center shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-secondary hover:text-secondary-content hover:shadow-2xl"
        onclick={() => (level = Level.Intermediate)}
        aria-label="Fortgeschritten"
      >
        <div class="card-body">
          <div class="flex justify-center">
            <img src="$" alt="Fortgeschritten Bild" class="h-40 w-full object-cover" />
          </div>
          <h2 class="mt-2 text-lg font-bold">Fortgeschritten</h2>
        </div>
      </button>

      <button
        class="max-h-lg card w-full max-w-72 transform cursor-pointer bg-neutral text-center shadow-xl transition duration-200 ease-in-out hover:scale-105 hover:bg-accent hover:text-accent-content hover:shadow-2xl"
        onclick={() => (level = Level.Expert)}
        aria-label="Experte"
      >
        <div class="card-body">
          <div class="flex justify-center">
            <img src="/path-to-expert-image.jpg" alt="Experte Bild" class="h-40 w-full object-cover" />
          </div>
          <h2 class="mt-2 text-lg font-bold">Experte</h2>
        </div>
      </button>
    </div>
  </div>
</div>
