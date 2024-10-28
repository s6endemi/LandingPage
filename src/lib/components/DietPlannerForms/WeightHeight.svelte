<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let weight: number | null = null; // Variable für das Gewicht
  let height: number | null = null; // Variable für die Größe

  function handleSubmit() {
    if (weight !== null && height !== null) {
      dispatch("submit", { weight, height });
    }
  }
</script>

<div class="card mx-auto max-w-md rounded-lg bg-gray-700 p-6 shadow-lg">
  <h2 class="mb-4 text-xl font-semibold">Wie viel wiegst du und wie groß bist du?</h2>

  <div class="mb-4 flex items-center">
    <img src="src/lib/assets/weight.svg" alt="Gewicht Icon" class="mr-1 h-8 w-8" />
    <label for="weight" class="label">
      <span class="label-text text-lg">Gewicht (kg)</span>
    </label>
  </div>
  <input
    type="number"
    id="weight"
    bind:value={weight}
    placeholder="z.B. 70"
    class="input w-full border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
    required
  />

  <div class="mb-4 flex items-center">
    <img src="src/lib/assets/height.svg" alt="Höhe Icon" class="mr-1 h-8 w-8" />
    <label for="height" class="label">
      <span class="label-text text-lg">Größe (cm)</span>
    </label>
  </div>
  <input
    type="number"
    id="height"
    bind:value={height}
    placeholder="z.B. 175"
    class="input w-full border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
    required
  />

  <button type="button" class="btn btn-primary mt-4 w-full" on:click={handleSubmit}> Bestätigen </button>
</div>
