<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { type SubmitFunction } from "@sveltejs/kit";
  import { page } from "$app/stores";
  import { Eye, EyeOff } from "lucide-svelte";

  let email = "";
  let password = "";
  let isEmailValid = true;
  let errorMessage = "";
  let showPassword = false;
  let isLoading = false;

  const enhanceLogin: SubmitFunction = () => {
    isLoading = true;
    errorMessage = "";
    return async ({ result, update }) => {
      isLoading = false;
      await applyAction(result);
      if (result.type === "failure") {
        errorMessage = (result.data?.message as string) || "Login failed. Please check your credentials.";
        update();
      } else if (result.type === "success") {
        closeModal();
      }
    };
  };

  const dispatch = createEventDispatcher();

  function validateEmail(email: string) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email.toLowerCase()) && email.includes("@") && email.includes(".");
  }

  function handleEmailInput() {
    isEmailValid = validateEmail(email);
  }

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  function closeModal() {
    dispatch("close");
  }

  function switchToRegister() {
    dispatch("switchToRegister");
  }

  function handleForgotPassword() {
    dispatch("switchToForgotPassword");
  }

  const enhanceGoogleSignIn: SubmitFunction = () => {
    isLoading = true;
    errorMessage = "";
    return async ({ result, update }) => {
      isLoading = false;
      await applyAction(result);
      if (result.type === "failure") {
        errorMessage = (result.data?.message as string) || "Registration failed. Please try again.";
        update();
      } else if (result.type === "success") {
        window.location.href = result.data?.url;
      }
    };
  };
</script>

<h1 class="mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-center text-3xl font-bold text-transparent">
  Sign In
</h1>

{#if errorMessage}
  <div class="alert bg-red-900/50 text-red-200" transition:fade={{ duration: 200 }}>
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

<form method="POST" use:enhance={enhanceLogin} action="/auth?/login" class="space-y-4">
  <div>
    <div class="label">
      <span class="label-text text-gray-300">Email</span>
    </div>
    <label class="form-control w-full">
      <input
        name="email"
        type="email"
        bind:value={email}
        on:input={handleEmailInput}
        class="input w-full border-gray-700 bg-gray-800/50 text-gray-200 placeholder-gray-500 backdrop-blur-xl
               {!isEmailValid && email ? 'border-red-500' : 'focus:border-indigo-500'} transition-colors"
        placeholder="Enter your email"
        required
      />
      {#if !isEmailValid && email}
        <div class="label">
          <span class="label-text-alt text-red-400">Please enter a valid email address.</span>
        </div>
      {/if}
    </label>
  </div>

  <div>
    <div class="label flex justify-between">
      <span class="label-text text-gray-300">Password</span>
      <button 
        type="button" 
        on:click={handleForgotPassword} 
        class="label-text-alt text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        Forgot password?
      </button>
    </div>
    <label class="form-control w-full">
      <div class="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          bind:value={password}
          class="input w-full border-gray-700 bg-gray-800/50 pr-10 text-gray-200 placeholder-gray-500 backdrop-blur-xl
                 focus:border-indigo-500 transition-colors"
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          class="btn-ghost btn-sm absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
          on:click={togglePasswordVisibility}
        >
          {#if showPassword}
            <Eye size="20" />
          {:else}
            <EyeOff size="20" />
          {/if}
        </button>
      </div>
    </label>
  </div>

  <button
    type="submit"
    class="btn w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg 
           shadow-indigo-500/25 hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all duration-300"
    disabled={!isEmailValid || isLoading}
  >
    {#if isLoading}
      <span class="loading loading-spinner"></span>
    {:else}
      Sign In
    {/if}
  </button>
  <input name="redirectTo" type="hidden" value={$page.url.toString()} />
</form>

<div class="divider my-4 before:bg-gray-800 after:bg-gray-800">
  <span class="text-gray-400">OR</span>
</div>

<form method="POST" use:enhance={enhanceGoogleSignIn}>
  <button 
    formaction="/auth?/login&provider=google" 
    type="submit" 
    class="btn w-full border-gray-700 bg-gray-800/50 text-gray-200 hover:bg-gray-700/50"
  >
    <svg viewBox="0 0 24 24" class="mr-2 h-5 w-5">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
      <path fill="none" d="M1 1h22v22H1z" />
    </svg>
    Sign in with Google
  </button>
  <input name="redirectTo" type="hidden" value={$page.url.toString()} />
</form>

<div class="mt-4 text-center text-gray-300">
  <span>No account yet?</span>
  <button type="button" on:click={switchToRegister} class="ml-1 text-indigo-400 hover:text-indigo-300 transition-colors">
    Register
  </button>
</div>
