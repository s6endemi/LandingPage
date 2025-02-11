<script lang="ts">
  import SignInModal from "./SignInModal.svelte";
  import RegisterModal from "./RegisterModal.svelte";
  import ForgotPasswordModal from "./ForgotPasswordModal.svelte";
  import type { AuthModal } from "$lib/types";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import ResetPasswordModal from "./ResetPasswordModal.svelte";

  export let modalState: AuthModal;

  const dispatch = createEventDispatcher();

  function signIn() {
    modalState = "signIn";
  }

  function register() {
    modalState = "register";
  }

  function forgotPassword() {
    modalState = "forgotPassword";
  }

  function closeModal() {
    modalState = null;
    dispatch("close");
  }

  function handleOverlayKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeModal();
    }
  }
</script>

{#if modalState !== null}
  <div 
    class="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/80 backdrop-blur-sm" 
    transition:fade={{ duration: 200 }}
  >
    <button
      class="absolute inset-0 h-full w-full cursor-default"
      on:click={closeModal}
      on:keydown={handleOverlayKeydown}
      aria-label="Close modal"
    ></button>
    
    <div
      class="z-[101] w-96 rounded-3xl border border-gray-800 bg-gray-900/95 p-8 shadow-2xl backdrop-blur-xl"
      transition:fade={{ duration: 300 }}
    >
      <!-- Decorative Elements -->
      <div class="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-600/10 to-purple-600/10 blur-3xl"></div>
      <div class="absolute left-1/3 top-1/3 h-[100px] w-[100px] rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-2xl"></div>

      <!-- Modal Content -->
      <div class="relative">
        {#if modalState === "signIn"}
          <SignInModal on:close={closeModal} on:switchToRegister={register} on:switchToForgotPassword={forgotPassword} />
        {:else if modalState === "register"}
          <RegisterModal on:close={closeModal} on:switchToSignIn={signIn} />
        {:else if modalState === "forgotPassword"}
          <ForgotPasswordModal on:close={closeModal} on:switchToSignIn={signIn} />
        {:else if modalState === "resetPassword"}
          <ResetPasswordModal on:close={closeModal} />
        {/if}
      </div>
    </div>
  </div>
{/if}