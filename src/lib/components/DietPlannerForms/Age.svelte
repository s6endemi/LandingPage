<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Calendar, ChevronRight } from "lucide-svelte";

  const dispatch = createEventDispatcher();

  let birthDate: string = "";
  let age: number | null = null;
  let isValid = true;
  let isFocused = false;
  let errorMessage: string | null = null;

  function validateAndFormatDate(input: string): string {
    // Remove non-digits
    let value = input.replace(/\D/g, "");

    // Add dots automatically
    if (value.length >= 2) value = value.slice(0, 2) + "." + value.slice(2);
    if (value.length >= 5) value = value.slice(0, 5) + "." + value.slice(5);

    // Validate date format
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;
    const isValidFormat = regex.test(value);

    if (isValidFormat) {
      const [day, month, year] = value.split(".");
      const date = new Date(+year, +month - 1, +day);
      const isValidDate = date.getDate() === +day && date.getMonth() + 1 === +month && date.getFullYear() === +year;

      if (isValidDate) {
        const today = new Date();
        let calculatedAge = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
          calculatedAge--;
        }

        if (calculatedAge < 0) {
          isValid = false;
          errorMessage = "Das Datum liegt in der Zukunft";
        } else if (calculatedAge > 120) {
          isValid = false;
          errorMessage = "Bitte überprüfen Sie das eingegebene Datum";
        } else {
          age = calculatedAge;
          isValid = true;
          errorMessage = null;
        }
      } else {
        isValid = false;
        errorMessage = "Ungültiges Datum";
        age = null;
      }
    } else if (value.length === 10) {
      isValid = false;
      errorMessage = "Bitte verwenden Sie das Format TT.MM.JJJJ";
      age = null;
    }

    return value;
  }

  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    birthDate = validateAndFormatDate(input.value);
  }

  function handleSubmit() {
    if (isValid && birthDate) {
      dispatch("submit", birthDate);
    }
  }
</script>

<div class="container mx-auto max-w-2xl p-6">
  <div class="space-y-8">
    <!-- Header -->
    <div class="space-y-2">
      <h2 class="text-2xl font-light tracking-wide">Age Information</h2>
      <p class="text-sm text-base-content/60">Please enter your birth date for age verification</p>
    </div>

    <!-- Age Input Form -->
    <div class="space-y-6">
      <div class="relative">
        <div
          class="group rounded-xl border p-4 transition-all duration-300 ease-in-out
            {isFocused ? 'border-primary/30 bg-primary/5 shadow-lg' : 'border-base-content/10'}"
        >
          <div class="flex items-center gap-4">
            <div class="flex-shrink-0">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300
                  {isFocused ? 'bg-primary/10' : 'bg-base-200'}"
              >
                <Calendar
                  class="h-6 w-6 transition-colors duration-300
                    {isFocused ? 'text-primary' : 'text-base-content/70'}"
                />
              </div>
            </div>
            <div class="flex-grow">
              <label for="birthdate" class="mb-1 block text-sm font-medium text-base-content/70"> Birth Date </label>
              <div class="relative">
                <input
                  type="text"
                  id="birthdate"
                  value={birthDate}
                  on:input={handleInput}
                  on:focus={() => (isFocused = true)}
                  on:blur={() => (isFocused = false)}
                  placeholder="TT.MM.JJJJ"
                  class="input input-ghost h-auto w-full bg-transparent p-0 text-lg font-medium
                    placeholder:text-base-content/30 focus:outline-none
                    {!isValid ? 'text-error' : ''}"
                  maxlength="10"
                />
              </div>
            </div>
          </div>

          {#if errorMessage}
            <div class="mt-2 text-sm text-error">
              {errorMessage}
            </div>
          {/if}

          {#if age !== null}
            <div class="mt-2 text-sm text-primary">
              Du bist {age} Jahre alt
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <button
      type="button"
      class="btn btn-primary w-full {!isValid || !birthDate ? 'btn-disabled opacity-50' : ''}"
      on:click={handleSubmit}
    >
      <span>Continue</span>
      <ChevronRight class="h-4 w-4" />
    </button>
  </div>
</div>
