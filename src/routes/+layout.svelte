<script lang="ts">
  import "../app.css";
  import type { AuthModal } from "$lib/types";
  import { page } from "$app/stores";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import AuthControllerModal from "$lib/components/Authentication/AuthControllerModal.svelte";
  import { Menu, Moon, Sun, Dumbbell, Apple, Users, Map, FileText } from "lucide-svelte";
  import { applyAction, enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import Logo from "$lib/components/Icons/NewLogo.svelte";
  import VigorIcon from "$lib/assets/vigoricon.svg";

  export let data;
  $: ({ session, supabase, profile } = data);

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
  let isHovered: string | null = null;

  function invalidateAuth() {
    invalidate("supabase:auth");
  }

  function toggleModal() {
    modalState = modalState === null ? "signIn" : null;
  }

  function isActive(path: string) {
    return $page.url.pathname === path ? "bg-[#0052ff]/20" : "";
  }

  const enhanceLogout: SubmitFunction = () => {
    return async ({ result }) => {
      await applyAction(result);
      if (result.type === "success") {
        invalidateAuth();
      }
    };
  };

  const socialLinks = [
    {
      name: "Twitter",
      url: "https://x.com/VigorFndn",
      icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
    },
  ];
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="bg-black font-space-grotesk drawer min-h-screen">
  <input id="navbar-drawer" type="checkbox" class="drawer-toggle" bind:checked={isDrawerOpen} />

  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="relative">
      <div
        class="bg-black/40 navbar fixed top-0 z-50 h-20 w-full border-b border-[#0052ff]/10
               px-4 backdrop-blur-xl transition-all duration-500
               lg:px-8 {isScrolled ? 'bg-black/60' : 'bg-transparent'}"
      >
        <div class="navbar-start">
          <!-- Mobile Menu Button -->
          <div class="flex-none md:hidden">
            <label for="navbar-drawer" class="btn btn-square btn-ghost text-gray-300 hover:bg-[#0052ff]/10">
              <Menu class="h-6 w-6" />
            </label>
          </div>

          <!-- Logo -->
          <div class="flex-1">
            <a href="/" class="group flex items-center">
              <img src={VigorIcon} alt="VIGOR Logo" class="h-16" />
              <span
                class="bg-gradient-to-r from-[#0052ff] to-[#00c7ff] bg-clip-text text-xl
                          font-bold tracking-tight text-transparent"
              >
                VIGOR
              </span>
            </a>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="navbar-center hidden flex-none gap-4 md:flex">
          <a
            class="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-300
                   transition-all duration-300 hover:scale-105 hover:bg-[#0052ff]/10
                   hover:text-[#00c7ff] {isActive('/roadmap')}"
            href="/Roadmap"
          >
            <Map class="h-5 w-5" />
            <span>Roadmap</span>
          </a>
          <a
            class="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-300
                   transition-all duration-300 hover:scale-105 hover:bg-[#0052ff]/10
                   hover:text-[#00c7ff] {isActive('/community')}"
            href="/Community"
          >
            <Users class="h-5 w-5" />
            <span>Community</span>
          </a>
          <a
            class="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-300
                   transition-all duration-300 hover:scale-105 hover:bg-[#0052ff]/10
                   hover:text-[#00c7ff] {isActive('/docs')}"
            href="/Documentation"
          >
            <FileText class="h-5 w-5" />
            <span>Docs</span>
          </a>
        </div>

        <!-- Auth Area -->
        <div class="navbar-end mr-2"></div>
      </div>

      <!-- Gradient Transition -->
      <div
        class="from-black/40 via-black/20 pointer-events-none fixed left-0 top-[79px] z-40
          h-8 w-full bg-gradient-to-b to-transparent"
      ></div>
    </div>

    <!-- Page Content -->
    <main class="container mx-auto flex-1 px-4 pt-32">
      <slot />
    </main>
  </div>

  <!-- Mobile Drawer -->
  <div class="drawer-side z-50">
    <label for="navbar-drawer" class="drawer-overlay"></label>
    <div class="bg-black min-h-full w-80 p-4">
      <div class="flex flex-col gap-2">
        <a
          class="flex items-center gap-2 rounded-lg px-4 py-3 text-gray-300 transition-colors
                 hover:bg-[#0052ff]/10 hover:text-[#00c7ff] {isActive('/dietplanner')}"
          href="/dietplanner"
          on:click={() => (isDrawerOpen = false)}
        >
          <Apple class="h-5 w-5" />
          <span>Diet</span>
        </a>
        <a
          class="flex items-center gap-2 rounded-lg px-4 py-3 text-gray-300 transition-colors
                 hover:bg-[#0052ff]/10 hover:text-[#00c7ff] {isActive('/workout-planner')}"
          href="/workout-planner"
          on:click={() => (isDrawerOpen = false)}
        >
          <Dumbbell class="h-5 w-5" />
          <span>Training</span>
        </a>
        <a
          class="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-300
                 transition-all duration-300 hover:scale-105 hover:bg-[#0052ff]/10
                 hover:text-[#00c7ff] {isActive('/roadmap')}"
          href="/roadmap"
          on:click={() => (isDrawerOpen = false)}
        >
          <Map class="h-5 w-5" />
          <span>Roadmap</span>
        </a>
        <a
          class="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-300
                 transition-all duration-300 hover:scale-105 hover:bg-[#0052ff]/10
                 hover:text-[#00c7ff] {isActive('/community')}"
          href="/community"
          on:click={() => (isDrawerOpen = false)}
        >
          <Users class="h-5 w-5" />
          <span>Community</span>
        </a>
        <a
          class="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-300
                 transition-all duration-300 hover:scale-105 hover:bg-[#0052ff]/10
                 hover:text-[#00c7ff] {isActive('/docs')}"
          href="/docs"
          on:click={() => (isDrawerOpen = false)}
        >
          <FileText class="h-5 w-5" />
          <span>Docs</span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Auth Modal -->
<AuthControllerModal bind:modalState on:close={invalidateAuth} />

<!-- Footer -->
<footer class="bg-black border-t border-[#0052ff]/10 p-6 text-gray-300">
  <div class="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
    <div class="flex items-center gap-2">
      <img src={VigorIcon} alt="VIGOR Logo" class="h-16" />
      <p class="text-sm">Copyright © {new Date().getFullYear()} - All rights reserved</p>
    </div>
    <nav class="flex gap-6">
      <a href="/help/privacy-policy" class="text-sm text-gray-400 transition-colors hover:text-[#00c7ff]">
        Privacy Policy
      </a>
      <a href="/help/terms-of-service" class="text-sm text-gray-400 transition-colors hover:text-[#00c7ff]">
        Terms of Use
      </a>
    </nav>
  </div>
</footer>

<!-- Social Links -->
<div class="fixed right-6 top-24 z-50 space-y-4">
  {#each socialLinks as link}
    <a
      href={link.url}
      target="_blank"
      rel="noopener"
      class="group relative flex items-center justify-center"
      aria-label={link.name}
      on:mouseenter={() => (isHovered = link.name)}
      on:mouseleave={() => (isHovered = null)}
    >
      <div
        class="absolute -inset-2 rounded-full bg-gradient-to-r from-[#0052ff] to-[#00c7ff]
              opacity-0 blur-lg transition-opacity duration-300"
        class:opacity-30={isHovered === link.name}
      ></div>
      <div
        class="bg-black/50 flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-xl
               transition-all duration-300 hover:bg-[#0052ff]/10 group-hover:-translate-y-1"
      >
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill={`url(#${link.name}-gradient)`}>
          <defs>
            <linearGradient id={`${link.name}-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#0052ff;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#00c7ff;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d={link.icon} />
        </svg>
      </div>
    </a>
  {/each}
</div>

<style>
  :global(body) {
    font-family: "Space Grotesk", sans-serif;
  }

  .drawer {
    min-height: 100vh;
  }
</style>
