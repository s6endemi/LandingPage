<!-- src/routes/+page.svelte -->
<script>
  const features = [
    {
      title: "Personalisierte KI-Anpassung",
      description:
        "Ihr Training entwickelt sich mit Ihnen. Unser KI-System analysiert Ihre Fortschritte und passt Ihren Plan in Echtzeit an.",
      stats: ["98% Zufriedenheit", "15% bessere Ergebnisse", "24/7 Verfügbar"],
      icon: "⚡",
    },
    {
      title: "Wissenschaftlich Fundiert",
      description: "Basierend auf neuesten Studien und bewährten Trainingsmethoden für optimale Resultate.",
      stats: ["200+ Übungen", "50+ Wissenschaftler", "1000+ Studien"],
      icon: "🎯",
    },
    {
      title: "Flexibles Training",
      description: "Trainieren Sie wo und wann Sie wollen. Ihr persönlicher Coach passt sich Ihrem Zeitplan an.",
      stats: ["Beliebiger Ort", "Flexible Zeit", "Adaptive Pläne"],
      icon: "🌟",
    },
  ];
</script>

<main class="bg-base-100">
  <!-- Hero Section -->
  <section class="flex min-h-[80vh] items-center bg-gradient-to-br from-primary/10 to-secondary/10 px-4 py-16">
    <div class="container mx-auto">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <div class="space-y-8">
          <h1 class="text-5xl font-bold leading-tight">Der intelligente Weg zu Ihrem Fitnessziel</h1>
          <p class="text-xl text-gray-600">
            Erleben Sie die Zukunft des Personal Trainings mit unserem KI-gestützten Coach, der sich perfekt an Ihre
            individuellen Bedürfnisse anpasst.
          </p>
          <div class="flex flex-wrap gap-4">
            <button class="btn btn-primary btn-lg">Kostenlos starten</button>
            <button class="btn btn-outline btn-lg">Demo ansehen</button>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">10k+</div>
              <div class="text-sm text-gray-600">Aktive Nutzer</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">95%</div>
              <div class="text-sm text-gray-600">Zielerreichung</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">4.9★</div>
              <div class="text-sm text-gray-600">Bewertung</div>
            </div>
          </div>
        </div>
        <div class="relative">
          <img
            src="/api/placeholder/600/800"
            alt="Fitness Training"
            class="mx-auto w-full max-w-lg rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="bg-base-200 px-4 py-24">
    <div class="container mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-4xl font-bold">Ihr persönlicher KI-Coach</h2>
        <p class="mx-auto max-w-2xl text-xl text-gray-600">
          Erleben Sie ein völlig neues Level an personaliertem Training
        </p>
      </div>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each features as feature}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="mb-4 text-4xl">{feature.icon}</div>
              <h3 class="card-title mb-4 text-2xl">{feature.title}</h3>
              <p class="mb-6 text-gray-600">{feature.description}</p>
              <div class="grid grid-cols-1 gap-2">
                {#each feature.stats as stat}
                  <div class="rounded-lg bg-base-200 p-2 text-center text-sm">
                    {stat}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="px-4 py-24">
    <div class="container mx-auto max-w-4xl">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-4xl font-bold">Wie es funktioniert</h2>
        <p class="text-xl text-gray-600">Ihr Weg zum persönlichen Erfolg in drei einfachen Schritten</p>
      </div>
      <div class="space-y-8">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex items-start gap-6">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-content"
              >
                1
              </div>
              <div>
                <h3 class="mb-2 text-2xl font-bold">Persönliches Profil erstellen</h3>
                <p class="text-gray-600">
                  Teilen Sie uns Ihre Ziele, Vorlieben und Einschränkungen mit. Unser KI-System analysiert Ihre Angaben
                  und erstellt ein individuelles Profil.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex items-start gap-6">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-content"
              >
                2
              </div>
              <div>
                <h3 class="mb-2 text-2xl font-bold">KI-Analyse & Planerstellung</h3>
                <p class="text-gray-600">
                  Basierend auf Ihrem Profil entwickelt unser System einen maßgeschneiderten Trainings- und
                  Ernährungsplan.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex items-start gap-6">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-content"
              >
                3
              </div>
              <div>
                <h3 class="mb-2 text-2xl font-bold">Dynamische Anpassung</h3>
                <p class="text-gray-600">
                  Ihr Plan entwickelt sich mit Ihnen. Das System lernt aus Ihren Fortschritten und passt sich
                  kontinuierlich an.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="bg-base-200 px-4 py-24">
    <div class="container mx-auto">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="mb-6 text-4xl font-bold">Bereit für Ihre Transformation?</h2>
        <p class="mb-8 text-xl text-gray-600">
          Starten Sie heute mit Ihrem persönlichen KI-Coach und erleben Sie den Unterschied intelligenten Trainings.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <button class="btn btn-primary btn-lg">14 Tage kostenlos testen</button>
          <button class="btn btn-outline btn-lg">Mehr erfahren</button>
        </div>
      </div>
    </div>
  </section>
</main>
