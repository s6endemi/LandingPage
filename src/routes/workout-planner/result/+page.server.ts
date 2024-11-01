import { getRedisValue } from "$lib/server/redis";
import type { ExercisePlan } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async ({ url }) => {
  const id = url.searchParams.get("id");
  const split: ExercisePlan[] | null = await getRedisValue(`split:${id}`);
  if (!split) {
    console.error("Could not retrieve ExercisePlan from cache");
    throw redirect(303, "/workout-planner");
  }
  return { split };
};
