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

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });
    return () => data.subscription.unsubscribe();
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
  <!-- Navbar - made slimmer with reduced padding and max-width -->
  <nav class="top-2 z-50 mt-2">
    <div
      class="mx-auto flex max-w-2xl items-center justify-between rounded-lg bg-neutral-content px-3 py-1.5 shadow-md"
    >
      <!-- Logo with display font -->
      <a href="/" class="flex items-center">
        <Logo className="mr-1.5 fill-base-content" width="28" />
        <p class="font-display text-lg font-bold tracking-tight">TrainTech</p>
      </a>

      <!-- Navigation Links - adjusted spacing -->
      <div class="hidden lg:flex">
        <a
          class="text-md px-3 py-1.5 font-sans text-neutral transition-colors hover:font-medium {isActive(
            '/dietplanner'
          )
            ? 'text-base-content'
            : ''}"
          href="/dietplanner"
        >
          Ernährungsplan
        </a>

        <a
          class="text-md px-3 py-1.5 font-sans text-neutral transition-colors hover:font-medium {isActive(
            '/workout-planner'
          )
            ? 'text-base-content'
            : ''}"
          href="/workout-planner"
        >
          Trainingsplan
        </a>

        <a
          class="text-md px-3 py-1.5 font-sans text-neutral transition-colors hover:font-medium {isActive('/exercises')
            ? 'text-base-content'
            : ''}"
          href="/exercises"
        >
          Übungen
        </a>
      </div>

      <!-- Right Side Controls - adjusted sizing -->
      <div class="flex items-center gap-3">
        <label class="swap swap-rotate">
          <input type="checkbox" class="theme-controller" value="dark" />
          <Sun class="swap-on" size="24" aria-hidden="true" />
          <Moon class="swap-off" size="24" aria-hidden="true" />
        </label>

        {#if profile}
          <div class="dropdown dropdown-end">
            <button id="profile-dropdown" class="btn btn-secondary btn-sm h-7 min-h-0 rounded-md px-2 text-sm">
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
          <button on:click={toggleModal} class="btn btn-primary btn-md h-7 min-h-0 px-3 text-sm"> Anmelden </button>
        {/if}
      </div>
    </div>
  </nav>

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
