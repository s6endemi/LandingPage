<script lang="ts">
  import "../app.css";
  import type { AuthModal } from "$lib/types";
  import { page } from "$app/stores";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import AuthControllerModal from "$lib/components/Authentication/AuthControllerModal.svelte";
  import { Menu, Moon, Sun, Dumbbell, Apple, Book } from "lucide-svelte";
  import { applyAction, enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import Logo from "$lib/components/Icons/Logo.svelte";

  export let data;
  $: ({ session, supabase, profile } = data);

  // Drawer state
  let isDrawerOpen = false;

  let scrollY: number;
  let isScrolled = false;

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

  let modalState: AuthModal = null;

  function invalidateAuth() {
    invalidate("supabase:auth");
  }

  function toggleModal() {
    modalState = modalState === null ? "signIn" : null;
  }

  function isActive(path: string) {
    return $page.url.pathname === path ? "bg-base-200" : "";
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

<!-- Drawer for mobile -->
<div class="drawer">
  <input id="navbar-drawer" type="checkbox" class="drawer-toggle" bind:checked={isDrawerOpen} />

  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="navbar fixed top-0 z-50 h-16 w-full bg-base-100/95 px-4 shadow-sm transition-all duration-300 lg:px-8">
      <div class="navbar-start">
        <!-- Mobile menu button -->
        <div class="flex-none md:hidden">
          <label for="navbar-drawer" class="btn btn-square btn-ghost">
            <Menu class="h-6 w-6" />
          </label>
        </div>

        <!-- Logo -->
        <div class="flex-1">
          <a href="/" class="flex items-center">
            <Logo className="mr-2 h-8 w-8 fill-base-content" />
            <span class="text-xl font-black">TrainTech</span>
          </a>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <div class="navbar-center hidden flex-none gap-2 md:flex">
        <a class="btn btn-ghost {isActive('/dietplanner')}" href="/dietplanner">
          <Apple class="h-5 w-5" />
          <span>Ernährung</span>
        </a>
        <a class="btn btn-ghost {isActive('/workout-planner')}" href="/workout-planner">
          <Dumbbell class="h-5 w-5" />
          <span>Training</span>
        </a>
        <a class="btn btn-ghost {isActive('/exercises')}" href="/exercises">
          <Book class="h-5 w-5" />
          <span>Übungen</span>
        </a>
      </div>

      <div class="navbar-end mr-2">
        <!-- Theme Toggle -->
        <label class="btn btn-ghost swap swap-rotate hidden sm:flex">
          <input type="checkbox" class="theme-controller" value="dark" />
          <Sun class="swap-on h-5 w-5" />
          <Moon class="swap-off h-5 w-5" />
        </label>

        <!-- Auth Button/Profile -->
        {#if profile}
          <div class="dropdown dropdown-end">
            <button class="btn btn-secondary">
              {profile.firstName}
            </button>
            <form method="POST" action="/auth?/logout" use:enhance={enhanceLogout}>
              <ul class="menu dropdown-content z-[1] mt-2 w-48 rounded-lg bg-base-100 p-2 shadow-lg">
                <li><a href="/private/profile">Profil</a></li>
                <li><a href="/private/settings">Einstellungen</a></li>
                <li><button type="submit" class="w-full text-left">Ausloggen</button></li>
              </ul>
            </form>
          </div>
        {:else}
          <button on:click={toggleModal} class="btn btn-secondary"> Anmelden </button>
        {/if}
      </div>
    </div>

    <!-- Page Content -->
    <div class="h-16" />
    <main class="container mx-auto flex-1 px-4 py-8">
      <slot />
    </main>
  </div>

  <!-- Drawer Side -->
  <div class="drawer-side z-50">
    <label for="navbar-drawer" class="drawer-overlay" />
    <div class="min-h-full w-80 bg-base-100 p-4">
      <div class="flex flex-col gap-2">
        <a
          class="btn btn-ghost justify-start {isActive('/dietplanner')}"
          href="/dietplanner"
          on:click={() => (isDrawerOpen = false)}
        >
          <Apple class="h-5 w-5" />
          <span>Ernährung</span>
        </a>
        <a
          class="btn btn-ghost justify-start {isActive('/workout-planner')}"
          href="/workout-planner"
          on:click={() => (isDrawerOpen = false)}
        >
          <Dumbbell class="h-5 w-5" />
          <span>Training</span>
        </a>
        <a
          class="btn btn-ghost justify-start {isActive('/exercises')}"
          href="/exercises"
          on:click={() => (isDrawerOpen = false)}
        >
          <Book class="h-5 w-5" />
          <span>Übungen</span>
        </a>

        <div class="divider" />

        <!-- Mobile Auth Controls -->
        <div class="flex items-center justify-between">
          <label class="btn btn-ghost swap swap-rotate">
            <input type="checkbox" class="theme-controller" value="dim" />
            <Sun class="swap-on h-5 w-5" />
            <Moon class="swap-off h-5 w-5" />
          </label>

          {#if profile}
            <div class="dropdown dropdown-end">
              <button class="btn btn-secondary">
                {profile.firstName}
              </button>
              <form method="POST" action="/auth?/logout" use:enhance={enhanceLogout}>
                <ul class="menu dropdown-content z-[1] mt-2 w-48 rounded-lg bg-base-100 p-2 shadow-lg">
                  <li><a href="/private/profile">Profil</a></li>
                  <li><a href="/private/settings">Einstellungen</a></li>
                  <li><button type="submit" class="w-full text-left">Ausloggen</button></li>
                </ul>
              </form>
            </div>
          {:else}
            <button on:click={toggleModal} class="btn btn-secondary"> Anmelden </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Auth Modal -->
<AuthControllerModal bind:modalState on:close={invalidateAuth} />

<!-- Footer -->
<footer class="footer items-center bg-neutral-content p-4 text-neutral">
  <aside class="grid-flow-col items-center">
    <Logo className="fill-base-content pt-1" width="28" />
    <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
  </aside>
  <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a href="/help/privacy-policy" class="link-hover link">Datenschutz</a>
    <a href="/help/terms-of-service" class="link-hover link">Nutzungsbedingungen</a>
  </nav>
</footer>
