import { getRedisValue } from "$lib/server/redis";
import type { ExercisePlan } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../form/$types";

export const load: PageServerLoad = async ({ url }) => {
  const id = url.searchParams.get("id");
  console.log(`split:${id}`);
  const split: ExercisePlan[] | null = await getRedisValue(`split:${id}`);
  console.log(split);
  if (!split) {
    console.error("Could not retrieve ExercisePlan from cache");
    throw redirect(303, "/workout-planner");
  }
  return { split: split };
};
