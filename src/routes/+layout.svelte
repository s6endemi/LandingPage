<script lang="ts">
  import "../app.css";
  import type { AuthModal } from "$lib/types";
  import { page } from "$app/stores";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import AuthControllerModal from "$lib/components/Authentication/AuthControllerModal.svelte";
  import { Moon, Sun } from "lucide-svelte";
  import { applyAction, enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import Logo from "$lib/components/Icons/Logo.svelte";

  export let data;
  $: ({ session, supabase, profile } = data);

  // Add scroll tracking
  let scrollY: number;
  let isScrolled = false;

  onMount(() => {
    // Auth listener
    const { data: authData } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    // Scroll listener with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          scrollY = window.scrollY;
          isScrolled = scrollY > 50; // Change navbar after 50px scroll
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
    return $page.url.pathname === path ? "font-bold border-b-2 border-neutral" : "";
  }

  const enhanceLogout: SubmitFunction = () => {
    return async ({ result, update }) => {
      await applyAction(result);
      if (result.type === "success") {
        invalidateAuth();
      }
    };
  };
</script>

<div class="flex min-h-screen flex-col">
  <!-- Navbar -->
  <div
    class="navbar fixed top-0 z-50 w-full transition-all duration-300 {isScrolled
      ? 'h-12 bg-base-100/95 shadow-lg'
      : 'h-16 bg-base-100 shadow-sm'} px-4 lg:px-20"
  >
    <div class="navbar-start">
      <a href="/" class="flex items-center">
        <Logo className="mr-2 fill-base-content transition-all {isScrolled ? 'w-6' : 'w-8'}" />
        <p class="font-black transition-all {isScrolled ? 'text-lg' : 'text-xl'}">TrainTech</p>
      </a>

      <div class="navbar-center hidden space-x-4 lg:flex">
        <a
          class="hover:bg-inherit btn btn-ghost rounded-md p-2 {isActive('/dietplanner')} {isScrolled ? 'btn-sm' : ''}"
          href="/dietplanner"
        >
          Ernährungsplan erstellen
        </a>
        <a
          class="hover:bg-inherit btn btn-ghost rounded-md p-2 {isActive('/workout-planner')} {isScrolled
            ? 'btn-sm'
            : ''}"
          href="/workout-planner"
        >
          Trainingsplan erstellen
        </a>
        <a
          class="hover:bg-inherit btn btn-ghost rounded-md p-2 {isActive('/exercises')} {isScrolled ? 'btn-sm' : ''}"
          href="/exercises"
        >
          Übungsübersicht
        </a>
      </div>
      <!-- Right Side Controls - adjusted sizing -->
      <div class="flex items-center gap-3">
        <label class="swap swap-rotate">
          <input type="checkbox" class="theme-controller" value="dim" />
          <Sun class="swap-on {isScrolled ? 'h-5 w-5' : 'h-7 w-7'}" aria-hidden="true" />
          <Moon class="swap-off {isScrolled ? 'h-5 w-5' : 'h-7 w-7'}" aria-hidden="true" />
        </label>

        {#if profile}
          <div class="dropdown dropdown-end">
            <button
              id="profile-dropdown"
              class="btn btn-secondary rounded-md transition-all {isScrolled ? 'btn-sm text-sm' : 'text-base'}"
            >
              {profile.firstName}
            </button>
            <form method="POST" action="/auth?/logout" use:enhance={enhanceLogout}>
              <ul
                class="menu dropdown-content z-[1] mt-1 w-48 rounded-lg bg-base-100 p-2 text-sm shadow-lg"
                aria-labelledby="profile-dropdown"
              >
                <li><a href="/private/profile">Profil</a></li>
                <li><a href="/private/settings">Einstellungen</a></li>
                <li>
                  <button type="submit" class="w-full text-left">Ausloggen</button>
                </li>
              </ul>
            </form>
          </div>
        {:else}
          <button
            on:click={toggleModal}
            class="btn btn-secondary rounded-md transition-all {isScrolled ? 'btn-sm text-sm' : 'text-sm'}"
          >
            Anmelden
          </button>
        {/if}
      </div>
    </div>
  </div>

  <!-- Spacer to prevent content from going under navbar -->
  <div class={isScrolled ? "h-12" : "h-16"} />

  <!-- Auth Modal -->
  <AuthControllerModal bind:modalState on:close={invalidateAuth} />

  <!-- Main Content with base font -->
  <main class="container mx-auto flex-1 px-4 py-8 font-sans">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="footer items-center bg-neutral-content p-4 text-neutral">
    <aside class="grid-flow-col items-center">
      <Logo className="fill-base-content pt-1" width="28" />
      <p class="font-sans text-sm">Copyright © {new Date().getFullYear()} - All rights reserved</p>
    </aside>
    <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a href="/help/privacy-policy" class="link-hover link text-sm">Datenschutz</a>
      <a href="/help/terms-of-service" class="link-hover link text-sm">Nutzungsbedingungen</a>
    </nav>
  </footer>
</div>
