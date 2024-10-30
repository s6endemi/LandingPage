<script lang="ts">
  import { CheckCircle2, Info } from "lucide-svelte";

  interface SplitOption {
    id: string;
    title: string;
    description: string;
    frequency: string;
    suits: string;
  }

  let { frequency, selectedSplit = $bindable<string | null>(null) } = $props<{
    frequency: number | null;
    selectedSplit: string | null;
  }>();

  const splitOptions: Record<number, SplitOption[]> = {
    1: [
      {
        id: "fullbody-1",
        title: "Ganzkörper Training",
        description: "Ein umfassendes Training, das alle wichtigen Muskelgruppen an einem Tag trainiert",
        frequency: "1x pro Woche",
        suits: "Ideal für Einsteiger oder Menschen mit begrenzter Trainingszeit",
      },
    ],
    2: [
      {
        id: "fullbody-2",
        title: "2x Ganzkörper",
        description: "Zweimal wöchentlich alle Muskelgruppen trainieren für optimale Entwicklung",
        frequency: "2x pro Woche",
        suits: "Perfekt für Anfänger und Fortgeschrittene mit begrenzter Zeit",
      },
      {
        id: "upper-lower-full-3",
        title: "Ober-/Unter-/Ganzkörper Split",
        description: "Separates Training für Ober- und Unterkörper für fokussiertes Training",
        frequency: "2-3x pro Woche",
        suits: "Gut für Fortgeschrittene, die gezielt Muskelgruppen trainieren möchten",
      },
      {
        id: "push-pull-legs",
        title: "Push/Pull/Legs",
        description: "Dreiteiliger Split nach Bewegungsmustern für optimale Regeneration",
        frequency: "3x pro Woche",
        suits: "Optimal für Fortgeschrittene mit Fokus auf Muskelaufbau",
      },
    ],
    3: [
      {
        id: "upper-lower-4",
        title: "2x Ober- / 2x Unterkörper",
        description: "Intensiver Split mit hoher Trainingsfrequenz pro Muskelgruppe",
        frequency: "4x pro Woche",
        suits: "Ideal für Fortgeschrittene mit Fokus auf Muskelaufbau und Kraft",
      },
      {
        id: "ppl-ul",
        title: "Push/Pull/Legs + Upper/Lower",
        description: "Kombinierter Split für maximales Trainingsvolumen",
        frequency: "5x pro Woche",
        suits: "Für sehr Fortgeschrittene mit guter Regenerationsfähigkeit",
      },
      {
        id: "ppl-2x",
        title: "Push/Pull/Legs 2x",
        description: "Klassischer Bodybuilding Split für maximale Muskelentwicklung",
        frequency: "6x pro Woche",
        suits: "Für sehr Erfahrene mit exzellentem Regenerationsvermögen",
      },
    ],
  };
</script>

<div class="container mx-auto flex flex-col items-center p-6">
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <h1 class="text-3xl font-bold">Wähle deinen Trainings-Split</h1>
      <div class="tooltip tooltip-right" data-tip="Wähle die Aufteilung deiner Trainingseinheiten über die Woche">
        <Info class="h-5 w-5 opacity-70" />
      </div>
    </div>

    <div class="flex w-full max-w-2xl flex-col gap-4">
      {#each splitOptions[frequency] as split}
        <button
          class="group relative overflow-hidden rounded-xl border-2 transition-all duration-300
              {selectedSplit === split.id
            ? 'border-secondary bg-secondary/10 shadow-lg'
            : 'border-base-content/10 hover:border-secondary/50 hover:bg-base-200'}"
          onclick={() => (selectedSplit = split.id)}
        >
          <div class="relative flex items-center gap-4 p-6">
            <!-- Content -->
            <div class="flex flex-col items-start text-left">
              <div class="flex items-center gap-3">
                <h3 class="text-xl font-semibold">{split.title}</h3>
                <span class="text-sm font-medium text-base-content/70">{split.frequency}</span>
              </div>
              <p class="mt-1 text-sm text-base-content/70">{split.description}</p>
              <div class="mt-2 flex items-center gap-2 text-sm">
                <Info size={16} class="text-base-content/70" />
                <span class="text-base-content/70">{split.suits}</span>
              </div>
            </div>

            <!-- Check Icon -->
            <div class="absolute right-6 top-1/2 -translate-y-1/2 transform">
              <CheckCircle2
                size={24}
                class="transition-all duration-300
                       {selectedSplit === split.id ? 'text-secondary opacity-100' : 'opacity-0'}"
              />
            </div>
          </div>

          <!-- Hover Effect Gradient -->
          <div
            class="absolute inset-0 -z-10 bg-gradient-to-r from-secondary/5 to-primary/5 opacity-0
                transition-opacity duration-300 group-hover:opacity-100"
          ></div>
        </button>
      {/each}
    </div>
  </div>
</div>
