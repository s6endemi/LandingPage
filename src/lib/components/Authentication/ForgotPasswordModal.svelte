<script lang="ts">
  import { enhance } from "$app/forms";
  import { applyAction } from "$app/forms";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { page } from "$app/stores";

  let email = "";
  let isEmailValid = true;
  let errorMessage = "";
  let successMessage = "";
  let isLoading = false;

  const dispatch = createEventDispatcher();

  function validateEmail(email: string) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email.toLowerCase()) && email.includes("@") && email.includes(".");
  }

  function handleEmailInput() {
    isEmailValid = validateEmail(email);
    errorMessage = "";
  }

  function closeModal() {
    dispatch("close");
  }

  function switchToSignIn() {
    dispatch("switchToSignIn");
  }

  const enhanceResetPassword: SubmitFunction = ({ formData }) => {
    isLoading = true;
    errorMessage = "";
    successMessage = "";
    const redirectTo = new URL($page.url);
    redirectTo.searchParams.append("updatePassword", "false");
    formData.append("redirectTo", redirectTo.toString());
    return async ({ result, update }) => {
      isLoading = false;
      await applyAction(result);
      if (result.type === "failure") {
        errorMessage = result.data?.message || "Error sending the password reset email. Please try again.";
        update();
      } else if (result.type === "success") {
        successMessage = "A password reset email has been sent.";
        update();
      }
    };
  };
</script>

<h1 class="mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-center text-3xl font-bold text-transparent">
  Forgot passwords
</h1><form method="POST" action="/auth?/resetPassword" use:enhance={enhanceResetPassword} class="flex flex-col gap-4">
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text text-gray-600">Email</span>
    </div>
    <input
      name="email"
      type="email"
      bind:value={email}
      on:input={handleEmailInput}
      class="input input-bordered w-full {!isEmailValid && email ? 'input-error' : ''}"
      placeholder="Enter your email"
      required
    />
    {#if !isEmailValid && email}
      <div class="label">
        <span class="label-text-alt text-error">Please enter a valid email address.</span>
      </div>
    {/if}
  </label>
  <button type="submit" class="btn btn-primary w-full" disabled={!isEmailValid || isLoading}>
    {#if isLoading}
      <span class="loading loading-spinner"></span>
    {:else}
      Reset Password
    {/if}
  </button>
  {#if errorMessage}
    <div class="alert alert-error" transition:fade={{ duration: 200 }}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{errorMessage}</span>
    </div>
  {/if}
  {#if successMessage}
    <div class="alert alert-success" transition:fade={{ duration: 200 }}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{successMessage}</span>
    </div>
  {/if}
</form>
<div class="mt-4 text-center">
  <span class="text-gray-600">Remember your password?</span>
  <button type="button" on:click={switchToSignIn} class="link link-primary ml-1">Sign in here</button>
</div>
