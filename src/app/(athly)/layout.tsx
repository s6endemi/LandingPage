import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/footer/cookie-banner";

export default function AthlyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col bg-white text-slate-900">
      <Header />
      <main className="flex-grow pt-0 md:pt-20">{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
