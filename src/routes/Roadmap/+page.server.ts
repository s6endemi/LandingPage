import type { PageServerLoad } from "../auth/$types";
export const load: PageServerLoad = async () => {
  // You can add server-side data loading here if needed
  // For example, fetching any initial data, user preferences, etc.
  return {
    // Add any data you want to pass to the page
  };
};
