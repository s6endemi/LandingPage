import type { PageServerLoad } from "../auth/$types";
export const load = (async () => {
  const dietaryGoals = ["Abnehmen", "Muskelaufbau", "Gewicht halten"];
  const restrictions = ["Vegan", "Vegetarisch", "Laktosefrei", "Glutenfrei"];
  const mealOptions = ["Frühstück", "Mittagessen", "Abendessen", "Snacks"];

  return {
    dietaryGoals,
    restrictions,
    mealOptions,
  };
}) satisfies PageServerLoad;
