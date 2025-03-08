import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { AuroraBackground } from "@/components/aceternity/aurora-background";
import { AthlyAurora } from "@/components/ui/athly-aurora";

// Moderne, gut lesbare Schriftarten für ein frisches Design
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
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
              --white: #f8f8f8;
              --black: #000000;
              --transparent: transparent;
              --blue-300: #93c5fd;
              --blue-400: #60a5fa;
              --blue-500: #3b82f6;
              --indigo-300: #a5b4fc;
              --violet-200: #ddd6fe;
            }
          `
        }} />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} font-sans antialiased min-h-screen relative`}
      >
        {/* Basis-Hintergrundebenen */}
        <div className="fixed inset-0 -z-30">
          <AuroraBackground>
            <div className="w-full h-full"></div>
          </AuroraBackground>
        </div>
        
        <div className="fixed inset-0 -z-20 bg-gradient-to-b from-[#F7F4ED]/90 to-[#F0E9DC]/90"></div>
        
        <div className="fixed inset-0 -z-10 overflow-hidden">

          
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%2340B383' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px'
            }}
          ></div>
          
          <div className="absolute top-0 left-0 right-0 h-[800px] w-full opacity-[0.04]">
            <svg
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full fill-emerald-600"
              preserveAspectRatio="none"
            >
              <path d="M0,800 C300,900 400,600 1000,800 L1000,0 L0,0 Z"></path>
            </svg>
          </div>
          
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-tl from-[#E5DBCA]/80 to-[#F2EAE1]/80 rounded-full blur-3xl opacity-30 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-[#E5DBCA]/80 to-[#F2EAE1]/80 rounded-full blur-3xl opacity-30 -translate-x-1/3"></div>
          
          <div className="absolute bottom-0 right-0 w-full h-full opacity-[0.03]" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0c.806 0 1.452.672 1.451 1.499l-.041 8.372a1.5 1.5 0 0 1-1.498 1.49h-7.241v7.21a1.5 1.5 0 0 1-1.498 1.49h-7.258l.018 7.232a1.5 1.5 0 0 1-1.498 1.51h-7.241v7.196a1.5 1.5 0 0 1-1.498 1.51h-7.241l.019 7.214a1.5 1.5 0 0 1-1.498 1.51h-7.24l.019 7.183a1.5 1.5 0 0 1-1.498 1.53l-7.45.02a1.5 1.5 0 0 1-1.498-1.517l.04-8.336a1.5 1.5 0 0 1 1.498-1.49h7.241v-7.22a1.5 1.5 0 0 1 1.498-1.49h7.258l-.018-7.219a1.5 1.5 0 0 1 1.498-1.51h7.241v-7.2a1.5 1.5 0 0 1 1.498-1.51h7.241l-.019-7.207a1.5 1.5 0 0 1 1.498-1.51h7.24l-.019-7.2a1.5 1.5 0 0 1 1.498-1.51l7.45-.02z' fill='%2340B383' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '120px 120px',
              backgroundPosition: 'bottom right'
            }}
          ></div>
        </div>
        
        {/* Aurora Effekt in der Hero-Section Ebene */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <AthlyAurora>
            <div className="w-full h-full"></div>
          </AthlyAurora>
        </div>
        
        {/* Der gesamte Content-Bereich inklusive Header und Main */}
        <div className="relative z-10 min-h-screen">
          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <main className="pt-24">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}