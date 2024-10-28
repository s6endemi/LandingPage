<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let birthDate: string = "01.01.2024"; // Standardwert im gewünschten Format
  let ageMessage: string | null = null; // Nachricht, um das Alter anzuzeigen

  // Altersberechnung basierend auf dem eingegebenen Geburtsdatum
  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, ""); // Erlaubt nur Ziffern

    // Formatierung in DD.MM.JJJJ
    if (value.length >= 2) {
      value = value.slice(0, 2) + "." + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + "." + value.slice(5);
    }

    // Setze den Wert nur, wenn das Format korrekt ist
    if (validateDate(value)) {
      birthDate = value;

      // Altersberechnung
      const birth = new Date(birthDate.split(".").reverse().join("-")); // Umwandlung ins richtige Format
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      // Überprüfen, ob der Geburtstag in diesem Jahr schon war
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--; // Ein Jahr abziehen, wenn der Geburtstag noch nicht war
      }
      ageMessage = `Du bist ${age} Jahre alt!`; // Alter setzen
    }
  }

  // Funktion zur Überprüfung des Datumsformats
  function validateDate(dateString: string): boolean {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/; // Format DD.MM.JJJJ
    return regex.test(dateString);
  }

  function handleConfirm() {
    if (birthDate) {
      dispatch("submit", birthDate);
    }
  }
</script>

<div class="card mx-auto max-w-md rounded-lg bg-gray-700 p-6 shadow-lg">
  <h2 class="mb-4 text-xl font-semibold text-white">Wie alt bist du?</h2>

  <div class="mb-4">
    <label for="birthdate" class="label text-white">
      <span class="label-text">Geburtsdatum (DD.MM.JJJJ)</span>
    </label>
    <input
      type="text"
      id="birthdate"
      bind:value={birthDate}
      on:input={handleInput}
      class="input w-full border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
      maxlength="10"
      required
    />
  </div>

  {#if ageMessage}
    <p class="mt-4 text-lg font-medium text-green-400">{ageMessage}</p>
    <!-- Alter anzeigen -->
  {/if}

  <button type="button" class="btn btn-primary mt-4 w-full" on:click={handleConfirm} disabled={!birthDate}>
    Bestätigen
  </button>
</div>
