import type { LayoutLoad } from "./$types";
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

injectSpeedInsights();

export const load: LayoutLoad = async ({ data }) => {
  const profile = data.profile;

  return { profile };
};
