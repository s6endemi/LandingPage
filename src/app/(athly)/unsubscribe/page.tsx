import { Suspense } from "react";
import { UnsubscribeEmail } from "@/components/UnsubscribeEmail";
import { Loader2 } from "lucide-react";

export const runtime = "edge";

export default function Unsubscribe({ searchParams }: { searchParams: { email?: string } }) {
  const email = searchParams.email || null;

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
          <Loader2 className="w-12 h-12 text-gray-700 animate-spin" />
        </div>
      }
    >
      <UnsubscribeEmail email={email} />
    </Suspense>
  );
}
