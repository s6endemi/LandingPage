import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  console.log("Layout server load function started");
  const { session } = await safeGetSession();

  return {
    session,
    cookies: cookies.getAll(),
  };
};
