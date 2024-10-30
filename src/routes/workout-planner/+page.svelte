<!-- WorkoutLanding.svelte -->
<script lang="ts">
  import { ArrowRight, Dumbbell, Brain, Settings2, Clock, ChevronRight, Shield, Star } from "lucide-svelte";
  import { goto } from "$app/navigation";
</script>

{#snippet stat(value: string, label: string)}
  <div class="flex flex-col items-center">
    <span class="font-mono text-4xl font-bold text-primary">{value}</span>
    <span class="text-sm text-base-content/70">{label}</span>
  </div>
{/snippet}

{#snippet featureCard(icon: any, title: string, description: string)}
  <div
    class="group relative overflow-hidden rounded-lg border border-base-300 bg-base-100 p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
  >
    <div class="absolute -right-4 -top-4 h-24 w-24 rotate-12 opacity-5 transition-transform group-hover:rotate-0">
      <svelte:component this={icon} class="h-full w-full" />
    </div>
    <svelte:component this={icon} class="mb-4 h-6 w-6 text-primary" />
    <h3 class="mb-2 font-bold">{title}</h3>
    <p class="text-sm text-base-content/70">{description}</p>
  </div>
{/snippet}

{#snippet processStep(number: number, title: string, description: string)}
  <div class="relative flex gap-4 pb-8 pl-6 last:pb-0">
    <div class="absolute left-0 top-0 h-full w-px bg-primary/20">
      <div class="absolute -left-1 top-1 h-2 w-2 rounded-full bg-primary"></div>
    </div>
    <div>
      <span class="mb-2 inline-block rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
        Schritt {number}
      </span>
      <h3 class="mb-1 font-bold">{title}</h3>
      <p class="text-sm text-base-content/70">{description}</p>
    </div>
  </div>
{/snippet}

{#snippet benefitItem(icon: any, text: string)}
  <div class="flex items-center gap-2">
    <div class="rounded-full bg-primary/10 p-1">
      <svelte:component this={icon} class="h-4 w-4 text-primary" />
    </div>
    <span class="text-sm">{text}</span>
  </div>
{/snippet}

<main class="min-h-screen">
  <!-- Hero Section -->
  <section class="relative overflow-hidden bg-base-100">
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0 bg-gradient-to-br from-primary to-transparent"></div>
      <div class="grid h-full w-full place-items-center">
        <Dumbbell class="h-96 w-96 rotate-12" />
      </div>
    </div>

    <div class="container relative mx-auto px-4 py-24">
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="mb-6 text-5xl font-black tracking-tight lg:text-6xl">
          Erreiche deine Fitness-Ziele mit
          <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> KI-Power </span>
        </h1>
        <p class="mx-auto mb-12 max-w-2xl text-lg text-base-content/80">
          Erstelle deinen wissenschaftlich fundierten Trainingsplan in wenigen Minuten. Personalisiert durch KI,
          optimiert für deinen Erfolg.
        </p>

        <div class="mb-16 flex justify-center">
          <button class="group btn btn-primary btn-lg relative" on:click={() => goto("/workout-planner/form")}>
            <span class="flex items-center gap-2">
              Starte jetzt
              <ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            <span class="absolute -inset-0.5 -z-10 rounded-lg bg-primary/20 blur-lg transition-all group-hover:blur-xl"
            ></span>
          </button>
        </div>

        <div class="flex justify-center gap-16">
          {@render stat("10K+", "Aktive Nutzer")}
          {@render stat("92%", "Erfolgsrate")}
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="border-y border-base-200 bg-base-100/50 py-24">
    <div class="container mx-auto px-4">
      <div class="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {@render featureCard(Dumbbell, "Personalisiert", "Trainingsplan perfekt auf deine Ziele abgestimmt")}
        {@render featureCard(Brain, "KI-Trainer", "24/7 Unterstützung durch KI-Assistenten")}
        {@render featureCard(Settings2, "Flexibel", "Passe deinen Plan jederzeit an")}
        {@render featureCard(Clock, "Schnell", "In weniger als 5 Minuten erstellt")}
      </div>
    </div>
  </section>

  <!-- Process Section -->
  <section class="py-24">
    <div class="container mx-auto px-4">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="mb-16 text-3xl font-bold">In 4 Schritten zu deinem Erfolg</h2>
        <div class="text-left">
          {@render processStep(1, "Beantworte kurze Fragen", "Teile uns deine Ziele und Präferenzen mit")}
          {@render processStep(2, "Erhalte deinen Plan", "KI-generierter, personalisierter Trainingsplan")}
          {@render processStep(3, "Optimiere & Starte", "Passe an und beginne sofort")}
          {@render processStep(4, "Wachse & Entwickle", "Kontinuierliche Verbesserung mit KI-Support")}
        </div>
      </div>
    </div>
  </section>

  <!-- Enhanced CTA Section -->
  <section class="relative border-t border-base-200 bg-base-100/50 py-24">
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-base-200/20"></div>
    </div>

    <div class="container relative mx-auto px-4">
      <div class="to-primary-focus mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-primary p-0.5 shadow-xl">
        <div class="relative overflow-hidden rounded-[23px] bg-base-100">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-[0.03]">
            <div class="absolute -right-24 -top-24 h-96 w-96">
              <Dumbbell class="h-full w-full" />
            </div>
          </div>

          <!-- Content -->
          <div class="relative px-8 py-16 sm:p-16">
            <div class="mx-auto max-w-2xl text-center">
              <h2 class="mb-6 text-4xl font-bold">Bereit für dein bestes Training?</h2>
              <p class="mb-8 text-lg text-base-content/80">
                Erstelle jetzt deinen kostenlosen, personalisierten Trainingsplan und starte deine
                Fitness-Transformation
              </p>

              <!-- Benefits List -->
              <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                {@render benefitItem(Shield, "100% kostenlos")}
                {@render benefitItem(Star, "Sofort nutzbar")}
                {@render benefitItem(Brain, "KI-optimiert")}
              </div>

              <!-- CTA Button -->
              <button
                class="group btn btn-primary btn-lg gap-2 shadow-lg"
                on:click={() => goto("/workout-planner/form")}
              >
                <span class="flex items-center gap-2">
                  Plan erstellen
                  <ChevronRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
