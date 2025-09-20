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
  $: ({ profile } = data);

  let isDrawerOpen = false;
  let scrollY: number;
  let isScrolled = false;

  onMount(() => {
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
      window.removeEventListener("scroll", handleScroll);
    };
  });

  let modalState: AuthModal = null;
  let isHovered: string | null = null;

  function toggleModal() {
    modalState = modalState === null ? "signIn" : null;
  }

  function isActive(path: string) {
    return $page.url.pathname === path ? "active" : "";
  }


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
    <!-- Modern Glassmorphism Navbar Island -->
    <div class="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav class="glassmorphism-navbar relative">
        <!-- Main Navbar Container -->
        <div class="flex items-center justify-between w-full">
          <!-- Mobile Menu Button -->
          <div class="flex md:hidden">
            <label
              for="navbar-drawer"
              class="glass-button p-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Menu class="h-5 w-5 text-gray-300" />
            </label>
          </div>

          <!-- Logo Section -->
          <div class="flex items-center">
            <a href="/" class="group flex items-center gap-3 transition-all duration-300 hover:scale-105">
              <div class="relative">
                <img src={VigorIcon} alt="VIGOR Logo" class="h-12 drop-shadow-lg" />
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span class="glass-text text-xl font-bold tracking-tight">
                VIGOR
              </span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-2">
            <a
              class="glass-nav-item {isActive('/Roadmap')}"
              href="/Roadmap"
            >
              <Map class="h-4 w-4" />
              <span>Roadmap</span>
            </a>
            <a
              class="glass-nav-item {isActive('/Community')}"
              href="/Community"
            >
              <Users class="h-4 w-4" />
              <span>Community</span>
            </a>
            <a
              class="glass-nav-item {isActive('/Documentation')}"
              href="/Documentation"
            >
              <FileText class="h-4 w-4" />
              <span>Docs</span>
            </a>
          </div>

          <!-- Right Space (for future auth buttons) -->
          <div class="w-12 md:w-0"></div>
        </div>

        <!-- 3D Enhancement Elements -->
        <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-400/5 via-gray-300/10 to-gray-400/5 pointer-events-none"></div>
        <div class="absolute inset-[1px] rounded-2xl bg-gradient-to-b from-white/10 via-transparent to-black/10 pointer-events-none"></div>
      </nav>
    </div>

    <!-- Page Content -->
    <main class="container mx-auto flex-1 px-4 pt-32">
      <slot />
    </main>
  </div>

  <!-- Mobile Drawer -->
  <div class="drawer-side z-50">
    <label for="navbar-drawer" class="drawer-overlay bg-black/50 backdrop-blur-sm"></label>
    <div class="mobile-glass-drawer min-h-full w-80 p-6">
      <!-- Mobile Logo -->
      <div class="mb-8 flex items-center justify-center">
        <a href="/" class="group flex items-center gap-3" on:click={() => (isDrawerOpen = false)}>
          <div class="relative">
            <img src={VigorIcon} alt="VIGOR Logo" class="h-12 drop-shadow-lg" />
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span class="glass-text text-xl font-bold tracking-tight">
            VIGOR
          </span>
        </a>
      </div>

      <!-- Mobile Navigation -->
      <div class="flex flex-col gap-3">
        <a
          class="mobile-glass-nav-item {isActive('/Roadmap')}"
          href="/Roadmap"
          on:click={() => (isDrawerOpen = false)}
        >
          <Map class="h-5 w-5" />
          <span>Roadmap</span>
        </a>
        <a
          class="mobile-glass-nav-item {isActive('/Community')}"
          href="/Community"
          on:click={() => (isDrawerOpen = false)}
        >
          <Users class="h-5 w-5" />
          <span>Community</span>
        </a>
        <a
          class="mobile-glass-nav-item {isActive('/Documentation')}"
          href="/Documentation"
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
<AuthControllerModal bind:modalState />

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

  /* Modern Glassmorphism Navbar - Ultra Slim & Elegant */
  .glassmorphism-navbar {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(10, 10, 30, 0.9) 25%,
      rgba(0, 20, 40, 0.85) 50%,
      rgba(5, 15, 35, 0.9) 75%,
      rgba(0, 0, 0, 0.85) 100%
    );
    backdrop-filter: blur(8px) saturate(120%);
    -webkit-backdrop-filter: blur(8px) saturate(120%);
    border: 1px solid rgba(0, 199, 255, 0.15);
    border-radius: 20px;
    padding: 10px 20px;
    min-width: 280px;
    max-width: 800px;
    width: 85vw;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 2px 16px rgba(0, 82, 255, 0.15),
      0 0 40px rgba(0, 199, 255, 0.08),
      inset 0 1px 0 rgba(0, 199, 255, 0.1),
      inset 0 -1px 0 rgba(0, 0, 0, 0.2);
    transform: translateZ(0);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;
  }
  
  .glassmorphism-navbar::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 199, 255, 0.03),
      transparent
    );
    animation: shimmer 3s infinite;
  }

  .glassmorphism-navbar:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 5, 15, 0.9) 0%,
      rgba(15, 20, 40, 0.95) 25%,
      rgba(0, 30, 60, 0.9) 50%,
      rgba(10, 25, 50, 0.95) 75%,
      rgba(0, 5, 15, 0.9) 100%
    );
    border-color: rgba(0, 199, 255, 0.25);
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.5),
      0 4px 20px rgba(0, 82, 255, 0.2),
      0 0 60px rgba(0, 199, 255, 0.12),
      inset 0 1px 0 rgba(0, 199, 255, 0.15),
      inset 0 -1px 0 rgba(0, 0, 0, 0.3);
    transform: translateY(-3px) translateZ(0) scale(1.01);
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  /* Glass Text Effect */
  .glass-text {
    background: linear-gradient(
      135deg,
      #e5e7eb 0%,
      #f3f4f6 25%,
      #d1d5db 50%,
      #f9fafb 75%,
      #e5e7eb 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }

  /* Glass Navigation Items */
  .glass-nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 16px;
    font-weight: 500;
    color: #d1d5db;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .glass-nav-item:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  .glass-nav-item:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 82, 255, 0.15) 0%,
      rgba(0, 199, 255, 0.1) 100%
    );
    border-color: rgba(0, 199, 255, 0.3);
    color: #00c7ff;
    transform: translateY(-2px) scale(1.05);
    box-shadow:
      0 4px 16px rgba(0, 82, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .glass-nav-item:hover:before {
    left: 100%;
  }

  .glass-nav-item.active {
    background: linear-gradient(
      135deg,
      rgba(0, 82, 255, 0.2) 0%,
      rgba(0, 199, 255, 0.15) 100%
    );
    border-color: rgba(0, 199, 255, 0.4);
    color: #00c7ff;
    box-shadow:
      0 2px 8px rgba(0, 82, 255, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  /* Glass Button */
  .glass-button {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.04) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .glass-button:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 82, 255, 0.1) 0%,
      rgba(0, 199, 255, 0.05) 100%
    );
    border-color: rgba(0, 199, 255, 0.2);
    box-shadow:
      0 6px 20px rgba(0, 82, 255, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  /* Mobile Glass Drawer */
  .mobile-glass-drawer {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.95) 0%,
      rgba(20, 20, 30, 0.9) 50%,
      rgba(0, 0, 0, 0.95) 100%
    );
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }

  .mobile-glass-nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-radius: 16px;
    font-weight: 500;
    color: #d1d5db;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .mobile-glass-nav-item:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  .mobile-glass-nav-item:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 82, 255, 0.15) 0%,
      rgba(0, 199, 255, 0.1) 100%
    );
    border-color: rgba(0, 199, 255, 0.3);
    color: #00c7ff;
    transform: translateX(4px) scale(1.02);
    box-shadow:
      0 4px 16px rgba(0, 82, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .mobile-glass-nav-item:hover:before {
    left: 100%;
  }

  .mobile-glass-nav-item.active {
    background: linear-gradient(
      135deg,
      rgba(0, 82, 255, 0.2) 0%,
      rgba(0, 199, 255, 0.15) 100%
    );
    border-color: rgba(0, 199, 255, 0.4);
    color: #00c7ff;
    box-shadow:
      0 2px 8px rgba(0, 82, 255, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  /* iOS-style Micro Interactions */
  .glass-nav-item, .mobile-glass-nav-item {
    position: relative;
    overflow: hidden;
  }
  
  .glass-nav-item::after, .mobile-glass-nav-item::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(0, 199, 255, 0.1) 0%, transparent 70%);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  
  .glass-nav-item:active::after, .mobile-glass-nav-item:active::after {
    width: 300px;
    height: 300px;
  }
  
  /* Enhanced Glass Button with iOS-style feedback */
  .glass-button {
    position: relative;
    overflow: hidden;
  }
  
  .glass-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(0, 199, 255, 0.15) 0%, transparent 70%);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  
  .glass-button:active::before {
    width: 200px;
    height: 200px;
  }
  
  /* Mobile Responsive */
  @media (max-width: 768px) {
    .glassmorphism-navbar {
      padding: 8px 14px;
      min-width: 260px;
      width: 92vw;
      border-radius: 18px;
    }
  }
</style>
