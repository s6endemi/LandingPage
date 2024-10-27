<script lang="ts">
  import { Info } from "lucide-svelte";

  interface Props {
    dietPreferences: string[];
  }

  let { dietPreferences = $bindable() }: Props = $props();

  // Optionen für Diäten
  const dietOptions = [
    { value: "Vegetarisch", label: "Vegetarisch" },
    { value: "Vegan", label: "Vegan" },
    { value: "Laktoseintolerant", label: "Laktoseintolerant" },
    { value: "Glutenallergie", label: "Glutenallergie" },
  ];

  // Lokaler Zustand für die markierten Diätpräferenzen
  let localDietPreferences = [...dietPreferences];

  function toggleDietPreference(value: string) {
    // Toggle-Logik für die Auswahl
    if (localDietPreferences.includes(value)) {
      localDietPreferences = localDietPreferences.filter((pref) => pref !== value);
    } else {
      localDietPreferences = [...localDietPreferences, value];
    }

    // Update der Haupt-Datenbindung
    dietPreferences = localDietPreferences;
  }

  // Variable für spezifische Allergien
  let specificAllergies = "";
</script>

<div class="container mx-auto p-6">
  <!-- Diät Auswahl -->
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <label class="text-2xl font-bold" for="dietOptions">Welche Diät hältst du ein?</label>
      <div id="dietOptions" class="tooltip tooltip-right" data-tip="Wähle deine Diätpräferenzen">
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {#each dietOptions as { value, label }}
        <button
          type="button"
          class="group relative overflow-hidden rounded-xl border-2 transition-all duration-300
            {localDietPreferences.includes(value)
            ? 'border-purple-500 bg-purple-500/10 shadow-lg'
            : 'border-base-content/10 hover:border-purple-500/50 hover:bg-base-200'}"
          onclick={() => toggleDietPreference(value)}
        >
          <div class="relative flex items-center justify-center p-4">
            <span class="text-lg font-semibold">{label}</span>
          </div>
          <div
            class="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/5 to-purple-500/10 opacity-0
              transition-opacity duration-300 group-hover:opacity-100"
          ></div>
        </button>
      {/each}
    </div>
  </div>

  <!-- Eingabefeld für spezifische Allergien -->
  <div class="mt-8 space-y-4">
    <label class="text-2xl font-bold" for="specificAllergies">
      Sonstige spezifische Allergien oder Einschränkungen:
    </label>
    <input
      id="specificAllergies"
      type="text"
      bind:value={specificAllergies}
      placeholder="Gib deine Allergien ein..."
      class="input input-bordered w-full"
    />
  </div>
</div>
