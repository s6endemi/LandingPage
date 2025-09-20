import type { Exercise, Profile } from "$lib/types";
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      profile: Profile | null;
      exercises: Exercise[];
    }
    interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
