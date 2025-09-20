// So integrierst du das Banner in dein RootLayout
// Füge die CryptoAnnouncement-Komponente zwischen Header und main ein:

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { CryptoAnnouncement } from "@/components/crypto-announcement";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SYNAPSE - Premium KI-Plattform",
  description: "Erlebe adaptive KI-Intelligenz mit SYNAPSE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black min-h-screen`}
      >
        {/* Premium Background mit AnimatedGridPattern */}
        <div className="fixed inset-0 bg-black -z-10">
          <AnimatedGridPattern
            className="absolute inset-0 opacity-30"
            speed={1.5}
            strokeWidth={0.5}
            width={40}
            height={40}
            gridSize={30}
            patternColor="rgba(120, 120, 130, 0.4)"
          />
        </div>
        
        <Header />
        
        {/* Crypto Announcement Banner */}
        <CryptoAnnouncement />
        
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}