<script lang="ts">
  import { ArrowRight, Apple, Brain, ChartLine, Utensils } from "lucide-svelte";
  import { goto } from "$app/navigation";
</script>

<main class="min-h-screen bg-base-100">
  <!-- Hero Section -->
  <div class="hero bg-base-200 py-12">
    <div class="hero-content max-w-4xl text-center">
      <div>
        <h1 class="mb-6 text-4xl font-bold lg:text-5xl">
          Dein persönlicher<br />
          <span class="text-primary">Ernährungsplan</span>
        </h1>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-base-content/80">
          Erstelle deinen wissenschaftlich fundierten Ernährungsplan, der perfekt zu deinem Lebensstil passt. Mit
          KI-Unterstützung und professioneller Beratung zu deinen Zielen.
        </p>
        <button class="btn btn-primary btn-lg gap-2" on:click={() => goto("/dietplanner/form")}>
          Plan erstellen
          <ArrowRight class="h-5 w-5" />
        </button>
        <div class="mt-6 flex justify-center gap-8">
          <div class="stat place-items-center">
            <div class="stat-title">Zufriedene Kunden</div>
            <div class="stat-value text-primary">8K+</div>
          </div>
          <div class="stat place-items-center">
            <div class="stat-title">Zielerreichung</div>
            <div class="stat-value text-primary">89%</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Grid -->
  <section class="container mx-auto px-4 py-12">
    <div class="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="card bg-base-200 transition-shadow duration-300 hover:shadow-lg">
        <div class="card-body items-center text-center">
          <Apple class="h-8 w-8 text-primary" />
          <h3 class="card-title text-base">Personalisiert</h3>
          <p class="text-sm">Maßgeschneiderter Plan basierend auf deinen Vorlieben</p>
        </div>
      </div>
      <div class="card bg-base-200 transition-shadow duration-300 hover:shadow-lg">
        <div class="card-body items-center text-center">
          <Brain class="h-8 w-8 text-primary" />
          <h3 class="card-title text-base">KI-Coach</h3>
          <p class="text-sm">24/7 Ernährungsberatung durch KI</p>
        </div>
      </div>
      <div class="card bg-base-200 transition-shadow duration-300 hover:shadow-lg">
        <div class="card-body items-center text-center">
          <ChartLine class="h-8 w-8 text-primary" />
          <h3 class="card-title text-base">Fortschritt</h3>
          <p class="text-sm">Tracke deine Erfolge einfach & effektiv</p>
        </div>
      </div>
      <div class="card bg-base-200 transition-shadow duration-300 hover:shadow-lg">
        <div class="card-body items-center text-center">
          <Utensils class="h-8 w-8 text-primary" />
          <h3 class="card-title text-base">Rezepte</h3>
          <p class="text-sm">Über 1000+ gesunde Rezeptvorschläge</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Benefits Section -->
  <section class="container mx-auto bg-base-200 px-4 py-12">
    <h2 class="mb-8 text-center text-2xl font-bold">Dein Weg zum Ernährungserfolg</h2>
    <div class="flex justify-center">
      <div class="w-full max-w-xl px-8">
        <ul class="steps steps-vertical w-full">
          <li data-content="1" class="step step-primary">
            <div class="text-left">
              <h3 class="font-bold">Analyse deiner Bedürfnisse</h3>
              <p class="text-sm text-base-content/70">Kurzer Quiz zu deinen Zielen und Ernährungsgewohnheiten</p>
            </div>
          </li>
          <li data-content="2" class="step step-primary">
            <div class="text-left">
              <h3 class="font-bold">KI-gestützter Plan</h3>
              <p class="text-sm text-base-content/70">Erhalte deinen personalisierten Ernährungsplan</p>
            </div>
          </li>
          <li data-content="3" class="step step-primary">
            <div class="text-left">
              <h3 class="font-bold">Einfache Umsetzung</h3>
              <p class="text-sm text-base-content/70">Wöchentliche Rezepte und Einkaufslisten</p>
            </div>
          </li>
          <li data-content="4" class="step step-primary">
            <div class="text-left">
              <h3 class="font-bold">Kontinuierliche Begleitung</h3>
              <p class="text-sm text-base-content/70">KI-Coach unterstützt dich bei jedem Schritt</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Testimonial Section -->
  <section class="container mx-auto px-4 py-12">
    <div class="card mx-auto max-w-lg bg-base-200">
      <div class="card-body items-center text-center">
        <div class="rating mb-4 gap-1">
          <input type="radio" name="rating-3" class="mask mask-star-2 bg-primary" checked />
          <input type="radio" name="rating-3" class="mask mask-star-2 bg-primary" checked />
          <input type="radio" name="rating-3" class="mask mask-star-2 bg-primary" checked />
          <input type="radio" name="rating-3" class="mask mask-star-2 bg-primary" checked />
          <input type="radio" name="rating-3" class="mask mask-star-2 bg-primary" checked />
        </div>
        <p class="italic">
          "Der KI-Ernährungsplan hat mir geholfen, meine Ziele zu erreichen und dabei Spaß am Essen zu haben!"
        </p>
        <p class="mt-2 font-bold">- Maria S.</p>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="container mx-auto px-4 py-12">
    <div class="card mx-auto max-w-lg bg-primary text-primary-content">
      <div class="card-body items-center text-center">
        <h2 class="card-title text-2xl">Bereit für deinen personalisierten Ernährungsplan?</h2>
        <p class="mb-4">Starte jetzt und erreiche deine Ziele mit professioneller KI-Unterstützung</p>
        <button class="btn glass btn-lg gap-2" on:click={() => goto("/dietplanner/form")}>
          Jetzt starten
          <ArrowRight class="h-5 w-5" />
        </button>
      </div>
    </div>
  </section>
</main>
