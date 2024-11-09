import type { Exercise } from "$lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";

let cachedExercises: Exercise[] | null = null;

export async function getAllExercises(supabase: SupabaseClient | null): Promise<Exercise[] | null> {
  if (cachedExercises) {
    return cachedExercises;
  } else if (!supabase) return null;
  const { data, error } = await supabase.from("exercises").select("*");
  if (error) {
    console.error("Error fetching exercises:", error);
    return null;
  } else if (!data) return null;

  console.log("Successfully imported Exercises. Count:", data.length);
  // cache for one day
  console.log("Caching results...");
  cachedExercises = data as Exercise[];
  return cachedExercises;
}
