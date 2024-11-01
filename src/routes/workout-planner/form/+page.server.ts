import { getAllExercises } from "$lib/server/exerciseCache";
import { setRedisValue } from "$lib/server/redis";
import { Level, TrainingGoal } from "$lib/types";
import { createSplit } from "$lib/utils";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request }) => {
    const exercises = await getAllExercises(null);
    const data = await request.formData();
    const frequency = data.get("frequency") as number | null;
    const duration = data.get("duration") as number | null;
    const level = data.get("level") as Level | null;
    const goal = data.get("goal") as TrainingGoal | null;

    if (!frequency || !duration || !duration || !level || !goal) return fail(400, { error: "Missing required fields" });

    const split = createSplit(exercises || [], frequency, duration, level, goal);

    const uuid = crypto.randomUUID();
    setRedisValue(`split:${uuid}`, split, 5000);

    const uri = new URL("/workout-planner/result", request.url);
    uri.searchParams.append("id", uuid);
    await new Promise((r) => setTimeout(r, 2000));
    throw redirect(303, uri);
  },
};
