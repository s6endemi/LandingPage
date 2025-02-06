<script lang="ts">
  import "../app.css";
  import type { AuthModal } from "$lib/types";
  import { page } from "$app/stores";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import AuthControllerModal from "$lib/components/Authentication/AuthControllerModal.svelte";
  import { Menu, Moon, Sun, Dumbbell, Apple } from "lucide-svelte";
  import { applyAction, enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import Logo from "$lib/components/Icons/NewLogo.svelte";

  export let data;
  $: ({ session, supabase, profile } = data);

  let isDrawerOpen = false;
  let scrollY: number;
  let isScrolled = false;

  // Previous mount logic remains the same
  onMount(() => {
    const { data: authData } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          scrollY = window.scrollY;
          isScrolled = scrollY > 50;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      authData.subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // Previous state management remains the same
  let modalState: AuthModal = null;

  function invalidateAuth() {
    invalidate("supabase:auth");
  }

  function toggleModal() {
    modalState = modalState === null ? "signIn" : null;
  }

  function isActive(path: string) {
    return $page.url.pathname === path ? "bg-indigo-900/30" : "";
  }

  const enhanceLogout: SubmitFunction = () => {
    return async ({ result }) => {
      await applyAction(result);
      if (result.type === "success") {
        invalidateAuth();
      }
    };
  };
</script>

<div class="drawer bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
  <input id="navbar-drawer" type="checkbox" class="drawer-toggle" bind:checked={isDrawerOpen} />

  <div class="drawer-content flex flex-col">
    <!-- Navbar with glass effect -->
    <div class="relative">
      <div
        class="navbar fixed top-0 z-50 h-20 w-full border-b border-gray-800/30 bg-gray-950/40
               px-4 backdrop-blur-xl transition-all duration-500
               lg:px-8 {isScrolled ? 'bg-gray-950/60' : 'bg-transparent'}"
      >
        <div class="navbar-start">
          <!-- Mobile menu button -->
          <div class="flex-none md:hidden">
            <label for="navbar-drawer" class="btn btn-square btn-ghost text-gray-300 hover:bg-gray-800/50">
              <Menu class="h-6 w-6" />
            </label>
          </div>

          <!-- Logo -->
          <div class="flex-1">
            <a href="/" class="group flex items-center">
              <span
                class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-2xl font-black text-transparent"
              >
                Trainalyze
              </span>
            </a>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="navbar-center hidden flex-none gap-4 md:flex">
          <a
            class="rounded-lg px-4 py-2 font-medium text-gray-300 transition-all duration-300
            hover:scale-105 hover:bg-indigo-600/20 hover:text-indigo-300 {isActive('/landingpage')}"
            href="/landingpage"
          >
            <span>Upcoming</span>
          </a>
          <a
            class="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-300
            transition-all duration-300 hover:scale-105 hover:bg-indigo-900/30 hover:text-indigo-300
            {isActive('/dietplanner')}"
            href="/dietplanner"
          >
            <Apple class="h-5 w-5" />
            <span>Diet</span>
          </a>
          <a
            class="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-300
            transition-all duration-300 hover:scale-105 hover:bg-indigo-900/30 hover:text-indigo-300
            {isActive('/workout-planner')}"
            href="/workout-planner"
          >
            <Dumbbell class="h-5 w-5" />
            <span>Training</span>
          </a>
        </div>

        <div class="navbar-end mr-2">
          <!-- Auth Button/Profile -->
          {#if profile}
            <div class="dropdown dropdown-end">
              <button
                class="text-white btn border-none bg-gradient-to-r from-indigo-600 to-purple-600 px-6
                shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40"
              >
                {profile.firstName}
              </button>
              <form method="POST" action="/auth?/logout" use:enhance={enhanceLogout}>
                <ul
                  class="menu dropdown-content z-[1] mt-2 w-48 rounded-lg border border-gray-700/50
                  bg-gray-800/80 p-2 shadow-xl backdrop-blur-lg"
                >
                  <li><a href="/private/profile" class="text-gray-300 hover:bg-indigo-900/30">Profil</a></li>
                  <li><a href="/private/settings" class="text-gray-300 hover:bg-indigo-900/30">Einstellungen</a></li>
                  <li>
                    <button type="submit" class="w-full text-left text-gray-300 hover:bg-indigo-900/30">
                      Sign out
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          {:else}
            <button
              on:click={toggleModal}
              class="text-white btn border-none bg-gradient-to-r from-indigo-600 to-purple-600 px-6
              shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40"
            >
              Register
            </button>
          {/if}
        </div>
      </div>

      <!-- Gradient Transition -->
      <div
        class="pointer-events-none fixed left-0 top-[79px] z-40 h-8 w-full
        bg-gradient-to-b from-gray-950/40 via-gray-950/20 to-transparent"
      />

      <!-- Additional Blur Shadow -->
      <div
        class="fixed top-0 z-30 h-20 w-full bg-gradient-to-b from-gray-950/60
        to-transparent opacity-0 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.4)]
        backdrop-blur-md transition-opacity duration-500
        {isScrolled ? 'opacity-100' : 'opacity-40'}"
      />
    </div>

    <!-- Page Content -->
    <main class="container mx-auto flex-1 px-4 py-8">
      <slot />
    </main>
  </div>

  <!-- Drawer Side -->
  <div class="drawer-side z-50">
    <label for="navbar-drawer" class="drawer-overlay" />
    <div class="min-h-full w-80 bg-gray-950 p-4">
      <div class="flex flex-col gap-2">
        <a
          class="btn btn-ghost justify-start text-gray-300 hover:bg-indigo-900/30 {isActive('/dietplanner')}"
          href="/dietplanner"
          on:click={() => (isDrawerOpen = false)}
        >
          <Apple class="h-5 w-5" />
          <span>Ernährung</span>
        </a>
        <a
          class="btn btn-ghost justify-start text-gray-300 hover:bg-indigo-900/30 {isActive('/workout-planner')}"
          href="/workout-planner"
          on:click={() => (isDrawerOpen = false)}
        >
          <Dumbbell class="h-5 w-5" />
          <span>Training</span>
        </a>

        <div class="divider before:bg-gray-800/30 after:bg-gray-800/30" />

        <!-- Mobile Auth Controls -->
        <div class="flex items-center justify-between">
          {#if profile}
            <div class="dropdown dropdown-end">
              <button class="text-white btn border-none bg-gradient-to-r from-indigo-600 to-purple-600">
                {profile.firstName}
              </button>
              <form method="POST" action="/auth?/logout" use:enhance={enhanceLogout}>
                <ul class="menu dropdown-content z-[1] mt-2 w-48 rounded-lg bg-gray-800 p-2 shadow-lg">
                  <li><a href="/private/profile" class="text-gray-300 hover:bg-indigo-900/30">Profil</a></li>
                  <li><a href="/private/settings" class="text-gray-300 hover:bg-indigo-900/30">Einstellungen</a></li>
                  <li>
                    <button type="submit" class="w-full text-left text-gray-300 hover:bg-indigo-900/30">
                      Ausloggen
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          {:else}
            <button
              on:click={toggleModal}
              class="text-white btn border-none bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              Anmelden
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Auth Modal -->
<AuthControllerModal bind:modalState on:close={invalidateAuth} />

<!-- Footer -->
<footer class="footer items-center border-t border-gray-800/30 bg-gray-950 p-4 text-gray-300">
  <aside class="grid-flow-col items-center">
    <Logo className="fill-gray-300 pt-1" width="28" />
    <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
  </aside>
  <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a href="/help/privacy-policy" class="link-hover link text-gray-400 hover:text-indigo-400">Data protection</a>
    <a href="/help/terms-of-service" class="link-hover link text-gray-400 hover:text-indigo-400">Terms of Use</a>
  </nav>
</footer>

<style>
  /* Add any additional styles here */
  :global(.gradient-text) {
    background-size: 200% auto;
    animation: textShine 5s ease infinite;
  }

  @keyframes textShine {
    to {
      background-position: 200% center;
    }
  }

  .drawer {
    min-height: 100vh;
  }
</style>
