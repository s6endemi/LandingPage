import { supabase } from "@/lib/supabase";
import { CircleCheck, CircleX } from "lucide-react";

const errorPage = (
  <div className="flex flex-col items-center justify-center h-screen">
    <CircleX className="w-10 h-10 text-red-500" />
    <p className="text-red-500">Etwas ist schief gelaufen. Bitte versuche es später erneut.</p>
  </div>
);

export async function UnsubscribeEmail({ email }: { email: string | null }) {
  if (!email) {
    return errorPage;
  }

  const { error } = await supabase.from("waitlist_new").delete().eq("email", email);

  if (error) {
    console.error("Error unsubscribing:", error);
    return errorPage;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CircleCheck className="w-10 h-10 text-[#9bc539]" />
      <p className="text-[#9bc539]">Email erfolgreich abbestellt.</p>
    </div>
  );
}
