import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Athly",
  description: "Adaptive performance experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="light">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --white: #ffffff;
              --black: #000000;
              --transparent: transparent;
              --athly-green: #9bc539;
            }
          `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased min-h-screen bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
