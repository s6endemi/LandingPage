<script lang="ts">
  import { ArrowRight, Dumbbell, Brain, Settings2, Clock } from "lucide-svelte";
  import { goto } from "$app/navigation";
</script>

<main class="min-h-screen bg-base-100">
  <!-- Hero Section with Card -->
  <div class="hero bg-base-200 py-12">
    <div class="hero-content max-w-4xl text-center">
      <div>
        <h1 class="mb-6 text-4xl font-bold lg:text-5xl">
          Dein KI-gesteuerter<br />
          <span class="text-primary">Fitness Journey</span>
        </h1>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-base-content/80">
          Erstelle deinen wissenschaftlich fundierten Trainingsplan in wenigen Minuten. Powered by KI, personalisiert
          für deine Ziele.
        </p>
        <button class="btn btn-primary btn-lg gap-2" on:click={() => goto("/workout-planner/form")}>
          Starte jetzt
          <ArrowRight class="h-5 w-5" />
        </button>
        <div class="mt-6 flex justify-center gap-8">
          <div class="stat place-items-center">
            <div class="stat-title">Nutzer</div>
            <div class="stat-value text-primary">10K+</div>
          </div>
          <div class="stat place-items-center">
            <div class="stat-title">Erfolgsrate</div>
            <div class="stat-value text-primary">92%</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Grid -->
  <section class="container mx-auto px-4 py-12">
    <div class="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="card bg-base-200">
        <div class="card-body items-center text-center">
          <Dumbbell class="h-8 w-8 text-primary" />
          <h3 class="card-title text-base">Personalisiert</h3>
          <p class="text-sm">Trainingsplan perfekt auf deine Ziele abgestimmt</p>
        </div>
      </div>
      <div class="card bg-base-200">
        <div class="card-body items-center text-center">
          <Brain class="h-8 w-8 text-primary" />
          <h3 class="card-title text-base">KI-Trainer</h3>
          <p class="text-sm">24/7 Unterstützung durch KI-Assistenten</p>
        </div>
      </div>
      <div class="card bg-base-200">
        <div class="card-body items-center text-center">
          <Settings2 class="h-8 w-8 text-primary" />
          <h3 class="card-title text-base">Flexibel</h3>
          <p class="text-sm">Passe deinen Plan jederzeit an</p>
        </div>
      </div>
      <div class="card bg-base-200">
        <div class="card-body items-center text-center">
          <Clock class="h-8 w-8 text-primary" />
          <h3 class="card-title text-base">Schnell</h3>
          <p class="text-sm">In weniger als 5 Minuten erstellt</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Process Steps Timeline -->
  <section class="container mx-auto px-4 py-12">
    <h2 class="mb-8 text-center text-2xl font-bold">Dein Weg zum perfekten Training</h2>
    <div class="flex justify-center">
      <div class="w-full max-w-xl px-8">
        <ul class="steps steps-vertical w-full">
          <li data-content="1" class="step step-primary">
            <div class="text-left">
              <h3 class="font-bold">Beantworte kurze Fragen</h3>
              <p class="text-sm text-base-content/70">Teile uns deine Ziele und Präferenzen mit</p>
            </div>
          </li>
          <li data-content="2" class="step step-primary">
            <div class="text-left">
              <h3 class="font-bold">Erhalte deinen Plan</h3>
              <p class="text-sm text-base-content/70">KI-generierter, personalisierter Trainingsplan</p>
            </div>
          </li>
          <li data-content="3" class="step step-primary">
            <div class="text-left">
              <h3 class="font-bold">Optimiere & Starte</h3>
              <p class="text-sm text-base-content/70">Passe an und beginne sofort</p>
            </div>
          </li>
          <li data-content="4" class="step step-primary">
            <div class="text-left">
              <h3 class="font-bold">Wachse & Entwickle</h3>
              <p class="text-sm text-base-content/70">Kontinuierliche Verbesserung mit KI-Support</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="container mx-auto px-4 py-12">
    <div class="card mx-auto max-w-lg bg-primary text-primary-content">
      <div class="card-body items-center text-center">
        <h2 class="card-title text-2xl">Bereit für dein bestes Training?</h2>
        <p class="mb-4">Erstelle jetzt deinen kostenlosen, personalisierten Trainingsplan</p>
        <button class="btn glass btn-lg gap-2" on:click={() => goto("/workout-planner/form")}>
          Plan erstellen
          <ArrowRight class="h-5 w-5" />
        </button>
      </div>
    </div>
  </section>
</main>
