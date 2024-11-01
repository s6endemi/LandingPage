<script>
  import { Bell, Home, Dumbbell, Apple, TrendingUp, Users, Settings, ChevronRight, Search, User } from "lucide-svelte";

  // User data
  const user = {
    name: "Max",
    avatar: "/api/placeholder/32/32",
  };

  const stats = [
    { title: "Gesamtkalorienverbrauch", value: "2,345", unit: "kcal", trend: "+5%" },
    { title: "Trainingseinheiten", value: "12", total: "15", trend: "80%" },
    { title: "Fortschritt", value: "80", unit: "%", trend: "+2%" },
    { title: "Aktive Tage", value: "5", total: "7", trend: "71%" },
  ];

  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Dumbbell, label: "Trainingspläne" },
    { icon: Apple, label: "Ernährungspläne" },
    { icon: TrendingUp, label: "Fortschrittsverlauf" },
    { icon: Users, label: "Community" },
    { icon: Settings, label: "Einstellungen" },
  ];

  const workoutPlan = [
    { exercise: "Beinpresse", sets: 3, reps: 12, completed: true },
    { exercise: "Kniebeugen", sets: 4, reps: 10, completed: true },
    { exercise: "Wadenheben", sets: 3, reps: 15, completed: false },
  ];

  const mealPlan = [
    { meal: "Frühstück", calories: 450, completed: true },
    { meal: "Mittagessen", calories: 650, completed: true },
    { meal: "Abendessen", calories: 550, completed: false },
  ];
</script>

<div class="min-h-screen bg-base-200">
  <!-- Header -->
  <header class="navbar bg-base-100 px-4 shadow-sm">
    <div class="flex-1">
      <img src="/api/placeholder/32/32" alt="Logo" class="h-8 w-8 rounded-lg" />
    </div>

    <div class="flex-none gap-4">
      <button class="btn btn-circle btn-ghost">
        <Bell size={20} />
      </button>
      <div class="dropdown dropdown-end">
        <button class="avatar btn btn-circle btn-ghost">
          <div class="w-8 rounded-full">
            <img src={user.avatar} alt={user.name} />
          </div>
        </button>
      </div>
    </div>
  </header>

  <!-- Layout Container -->
  <div class="flex">
    <!-- Sidebar -->
    <aside class="min-h-screen w-64 bg-base-100 shadow-lg">
      <div class="flex h-full flex-col">
        <nav class="space-y-1 p-4">
          {#each menuItems as item}
            <button
              class="flex w-full items-center space-x-3 rounded-lg p-3 transition-colors hover:bg-base-200
                     {item.active ? 'bg-primary text-primary-content' : 'text-base-content'}"
            >
              <svelte:component this={item.icon} size={20} />
              <span class="font-medium">{item.label}</span>
              {#if item.active}
                <ChevronRight size={16} class="ml-auto" />
              {/if}
            </button>
          {/each}
        </nav>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 p-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold text-base-content">Willkommen zurück, {user.name}!</h1>
        <p class="text-base-content/70">Heute steht dein Beintraining an!</p>
      </div>

      <!-- Stats Grid -->
      <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {#each stats as stat}
          <div class="card bg-base-100 shadow-sm">
            <div class="card-body p-6">
              <h3 class="card-title text-sm text-base-content/70">{stat.title}</h3>
              <p class="text-2xl font-semibold">
                {stat.value}{stat.unit}
                {#if stat.total}
                  <span class="text-base font-normal text-base-content/70">/{stat.total}</span>
                {/if}
              </p>
              {#if stat.trend}
                <span class="text-sm text-success">↑ {stat.trend}</span>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <!-- Main Sections Grid -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- Training Section -->
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <h2 class="card-title mb-4">Tagesaktuelles Training</h2>
            <div class="space-y-4">
              {#each workoutPlan as exercise}
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <input type="checkbox" checked={exercise.completed} class="checkbox-primary checkbox" />
                    <span class={exercise.completed ? "text-base-content/70 line-through" : ""}>
                      {exercise.exercise}
                    </span>
                  </div>
                  <span class="text-sm text-base-content/70">
                    {exercise.sets} x {exercise.reps} Wdh
                  </span>
                </div>
              {/each}
              <!-- Progress Bar -->
              <progress class="progress progress-primary w-full" value="45" max="100"></progress>
            </div>
          </div>
        </div>

        <!-- Nutrition Section -->
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <h2 class="card-title mb-4">Ernährungsplan Heute</h2>
            <div class="space-y-4">
              {#each mealPlan as meal}
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <input type="checkbox" checked={meal.completed} class="checkbox-success checkbox" />
                    <span class={meal.completed ? "text-base-content/70 line-through" : ""}>
                      {meal.meal}
                    </span>
                  </div>
                  <span class="text-sm text-base-content/70">{meal.calories} kcal</span>
                </div>
              {/each}
              <!-- Calories Progress -->
              <progress class="progress progress-success w-full" value="75" max="100"></progress>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="card mt-8 bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title mb-4">Dein Fortschritt</h2>
          <div class="mb-4 flex items-center justify-between">
            <span>Gesamtfortschritt zu deinem Ziel</span>
            <span class="text-success">80% erreicht!</span>
          </div>
          <progress class="progress progress-success w-full" value="80" max="100"></progress>
        </div>
      </div>
    </main>
  </div>

  <!-- Footer -->
  <footer class="footer footer-center border-t bg-base-100 p-4 text-base-content">
    <div class="mx-auto flex w-full max-w-screen-xl flex-col justify-between px-4 md:flex-row">
      <div class="text-sm">© 2024 FitnessTracker</div>
      <div class="flex gap-4">
        <a href="/datenschutz" class="link-hover link text-sm">Datenschutz</a>
        <a href="/agb" class="link-hover link text-sm">AGB</a>
        <a href="/impressum" class="link-hover link text-sm">Impressum</a>
        <a href="/kontakt" class="link-hover link text-sm">Kontakt</a>
      </div>
    </div>
  </footer>
</div>

<style>
  /* Custom styles can be added here if needed */
</style>
