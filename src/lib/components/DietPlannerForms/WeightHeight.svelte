<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Scale, Ruler, ChevronRight } from "lucide-svelte";

  const dispatch = createEventDispatcher();

  let weight: string = "";
  let height: string = "";
  let weightError: string | null = null;
  let heightError: string | null = null;
  let weightFocused = false;
  let heightFocused = false;

  $: isValid = weight && height && !weightError && !heightError;

  function validateWeight(value: string) {
    const numWeight = parseFloat(value);
    if (isNaN(numWeight)) {
      weightError = "Bitte geben Sie ein gültiges Gewicht ein";
      return false;
    }
    if (numWeight < 30 || numWeight > 250) {
      weightError = "Bitte geben Sie ein realistisches Gewicht ein (30-250 kg)";
      return false;
    }
    weightError = null;
    return true;
  }

  function validateHeight(value: string) {
    const numHeight = parseFloat(value);
    if (isNaN(numHeight)) {
      heightError = "Bitte geben Sie eine gültige Größe ein";
      return false;
    }
    if (numHeight < 100 || numHeight > 250) {
      heightError = "Bitte geben Sie eine realistische Größe ein (100-250 cm)";
      return false;
    }
    heightError = null;
    return true;
  }

  function handleWeightInput(event: Event) {
    const input = event.target as HTMLInputElement;
    weight = input.value;
    validateWeight(weight);
  }

  function handleHeightInput(event: Event) {
    const input = event.target as HTMLInputElement;
    height = input.value;
    validateHeight(height);
  }

  function handleSubmit() {
    if (isValid) {
      dispatch("submit", { weight: parseFloat(weight), height: parseFloat(height) });
    }
  }
</script>

<div class="container mx-auto max-w-2xl p-6">
  <div class="space-y-8">
    <!-- Header -->
    <div class="space-y-2">
      <h2 class="text-2xl font-light tracking-wide">Körpermaße</h2>
      <p class="text-sm text-base-content/60">Bitte geben Sie Ihr Gewicht und Ihre Größe ein</p>
    </div>

    <!-- Weight Input -->
    <div class="relative">
      <div
        class="group rounded-xl border p-4 transition-all duration-300 ease-in-out
          {weightFocused ? 'border-primary/30 bg-primary/5 shadow-lg' : 'border-base-content/10'}"
      >
        <div class="flex items-center gap-4">
          <div class="flex-shrink-0">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300
                {weightFocused ? 'bg-primary/10' : 'bg-base-200'}"
            >
              <Scale
                class="h-6 w-6 transition-colors duration-300
                  {weightFocused ? 'text-primary' : 'text-base-content/70'}"
              />
            </div>
          </div>
          <div class="flex-grow">
            <label for="weight" class="mb-1 block text-sm font-medium text-base-content/70">Gewicht (kg)</label>
            <div class="relative">
              <input
                type="number"
                id="weight"
                value={weight}
                on:input={handleWeightInput}
                on:focus={() => (weightFocused = true)}
                on:blur={() => (weightFocused = false)}
                placeholder="75"
                class="input input-ghost h-auto w-full bg-transparent p-0 text-lg font-medium
                  placeholder:text-base-content/30 focus:outline-none
                  {weightError ? 'text-error' : ''}"
              />
            </div>
          </div>
        </div>
        {#if weightError}
          <div class="mt-2 text-sm text-error">
            {weightError}
          </div>
        {/if}
      </div>
    </div>

    <!-- Height Input -->
    <div class="relative">
      <div
        class="group rounded-xl border p-4 transition-all duration-300 ease-in-out
          {heightFocused ? 'border-primary/30 bg-primary/5 shadow-lg' : 'border-base-content/10'}"
      >
        <div class="flex items-center gap-4">
          <div class="flex-shrink-0">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300
                {heightFocused ? 'bg-primary/10' : 'bg-base-200'}"
            >
              <Ruler
                class="h-6 w-6 transition-colors duration-300
                  {heightFocused ? 'text-primary' : 'text-base-content/70'}"
              />
            </div>
          </div>
          <div class="flex-grow">
            <label for="height" class="mb-1 block text-sm font-medium text-base-content/70">Größe (cm)</label>
            <div class="relative">
              <input
                type="number"
                id="height"
                value={height}
                on:input={handleHeightInput}
                on:focus={() => (heightFocused = true)}
                on:blur={() => (heightFocused = false)}
                placeholder="175"
                class="input input-ghost h-auto w-full bg-transparent p-0 text-lg font-medium
                  placeholder:text-base-content/30 focus:outline-none
                  {heightError ? 'text-error' : ''}"
              />
            </div>
          </div>
        </div>
        {#if heightError}
          <div class="mt-2 text-sm text-error">
            {heightError}
          </div>
        {/if}
      </div>
    </div>

    <!-- Submit Button -->
    <button
      type="button"
      class="btn btn-primary w-full {!isValid ? 'btn-disabled opacity-50' : ''}"
      on:click={handleSubmit}
      disabled={!isValid}
    >
      <span>Continue</span>
      <ChevronRight class="h-4 w-4" />
    </button>
  </div>
</div>
