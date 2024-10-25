<script lang="ts">
  let { frequency = $bindable() } = $props();
</script>

<div class="m-2 space-y-6">
  <div class="space-y-2">
    <label class="text-xl font-bold text-neutral-content" for="frequency"> Wie oft möchtest du trainieren? </label>
    <div class="mt-3 space-y-5">
      <button
        type="button"
        onclick={() => (frequency = 1)}
        class="w-full rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
      >
        1 Mal pro Woche
      </button>
      <button
        type="button"
        onclick={() => (frequency = 2)}
        class="w-full rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
      >
        2-3 Mal pro Woche
      </button>
      <button
        type="button"
        onclick={() => (frequency = 3)}
        class="w-full rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
      >
        4+ Mal pro Woche
      </button>
    </div>
  </div>
</div>
