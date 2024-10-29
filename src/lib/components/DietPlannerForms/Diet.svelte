<script lang="ts">
  import { Info, Check } from "lucide-svelte";
  import vegetarianIcon from "$lib/assets/vegetarian.png";
  import veganIcon from "$lib/assets/vegan.svg";

  interface Props {
    dietPreferences: string[];
  }

  let { dietPreferences = $bindable() }: Props = $props();

  const dietOptions = [
    {
      value: "Vegetarisch",
      label: "Vegetarisch",
      icon: vegetarianIcon,
      isCustomIcon: true,
      description: "Keine Fleischprodukte",
    },
    {
      value: "Vegan",
      label: "Vegan",
      icon: veganIcon,
      isCustomIcon: true,
      description: "Keine tierischen Produkte",
    },
    {
      value: "Laktoseintolerant",
      label: "Laktoseintolerant",
      icon: "🥛",
      isCustomIcon: false,
      description: "Keine Milchprodukte",
    },
    {
      value: "Glutenallergie",
      label: "Glutenallergie",
      icon: "🌾",
      isCustomIcon: false,
      description: "Keine glutenhaltigen Produkte",
    },
  ];

  let localDietPreferences = $state([...dietPreferences]);
  let specificAllergies = $state("");
  let isInputFocused = $state(false);

  function toggleDietPreference(value: string) {
    if (localDietPreferences.includes(value)) {
      localDietPreferences = localDietPreferences.filter((pref) => pref !== value);
    } else {
      localDietPreferences = [...localDietPreferences, value];
    }
    dietPreferences = localDietPreferences;
  }
</script>

<div class="container mx-auto max-w-3xl p-4">
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="text-center">
      <h2 class="text-2xl font-bold">
        Welche Diät hältst du ein?
        <span class="tooltip tooltip-right ml-2" data-tip="Wähle alle Diätpräferenzen, die auf dich zutreffen">
          <Info class="inline-block h-5 w-5 cursor-pointer text-info opacity-80" />
        </span>
      </h2>
      <p class="mt-2 text-base-content/70">Wähle alle Optionen aus, die auf dich zutreffen</p>
    </div>

    <!-- Diet Options Grid -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      {#each dietOptions as { value, label, icon, isCustomIcon, description }}
        <button
          type="button"
          class="group relative flex items-start rounded-xl border-2 p-4 transition-all duration-300 ease-in-out
                 {localDietPreferences.includes(value)
            ? 'scale-[1.02] border-primary bg-primary/5 shadow-lg'
            : 'border-base-200 bg-base-100 hover:scale-[1.01] hover:border-primary/50 hover:bg-base-200/50'}"
          onclick={() => toggleDietPreference(value)}
        >
          <!-- Check icon for selected state -->
          {#if localDietPreferences.includes(value)}
            <div class="animate-fadeIn absolute right-2 top-2">
              <Check class="h-5 w-5 text-primary" />
            </div>
          {/if}

          <div class="flex w-full items-start space-x-4">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-full bg-base-200
                        transition-transform duration-300 group-hover:scale-110"
            >
              {#if isCustomIcon}
                <img src={icon} alt={label} class="h-10 w-10" />
              {:else}
                <span class="text-3xl">{icon}</span>
              {/if}
            </div>
            <div class="flex-1">
              <h3 class="font-semibold">{label}</h3>
              <p class="mt-1 text-sm text-base-content/70">
                {description}
              </p>
            </div>
          </div>

          <!-- Hover gradient effect -->
          <div
            class="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0
                   transition-opacity duration-300 group-hover:opacity-100"
          ></div>
        </button>
      {/each}
    </div>

    <!-- Specific Allergies Input -->
    <div class="relative space-y-3">
      <label class="text-lg font-semibold" for="specificAllergies"> Sonstige Allergien oder Einschränkungen </label>
      <div
        class="relative overflow-hidden rounded-lg shadow-sm
               {isInputFocused ? 'ring-1 ring-primary ring-offset-1 ring-offset-base-100' : ''}"
      >
        <input
          id="specificAllergies"
          type="text"
          bind:value={specificAllergies}
          onfocus={() => (isInputFocused = true)}
          onblur={() => (isInputFocused = false)}
          placeholder="z.B. Nussallergie, Fruktoseintoleranz..."
          class="input input-bordered w-full bg-base-100 pr-12 transition-all duration-300
                 focus:border-primary"
        />
        <div
          class="absolute right-3 top-1/2 -translate-y-1/2 text-xl opacity-50 transition-transform
                 duration-300 {isInputFocused ? 'translate-x-0' : 'translate-x-12'}"
        ></div>
      </div>
      <p class="text-sm text-base-content/70">
        Gib hier weitere Allergien oder Unverträglichkeiten ein, die wir berücksichtigen sollen
      </p>
    </div>
  </div>
</div>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
</style>
