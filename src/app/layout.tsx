import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Montserrat mit verschiedenen Schriftstärken laden
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  // Wähle die benötigten Schriftstärken aus
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ATHLY - Dein KI-Personal Trainer",
  description: "Trainiere smarter mit deinem persönlichen KI-Coach, der dich rund um die Uhr begleitet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="light">
      <head>
        <style dangerouslySetInnerHTML={{ 
          __html: `
            :root {
              --white: #ffffff;
              --black: #000000;
              --transparent: transparent;
              --athly-green: #9bc539;
            }
          `
        }} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body
        className={`${montserrat.variable} font-sans antialiased min-h-screen relative`}
      >
        {/* Einheitlich weißer Hintergrund */}
        <div className="fixed inset-0 -z-20 bg-white"></div>
        
        {/* Der gesamte Inhalt */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <main className="pt-0 md:pt-20 flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}