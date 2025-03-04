"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AthlyAurora = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <style jsx>{`
        @keyframes aurora {
          0% {
            background-position: 0% 50%, 0% 50%;
          }
          50% {
            background-position: 100% 50%, 100% 50%;
          }
          100% {
            background-position: 0% 50%, 0% 50%;
          }
        }

        .aurora-bg {
          background-image: 
            repeating-linear-gradient(100deg, #f4f2ec 0%, #f4f2ec 7%, transparent 10%, transparent 12%, #f4f2ec 16%),
            repeating-linear-gradient(100deg, rgba(138,174,57,0.5) 10%, rgba(152,196,83,0.4) 15%, rgba(168,210,100,0.3) 20%, rgba(180,224,120,0.2) 25%, rgba(152,196,83,0.4) 30%);
          background-size: 300% 200%, 300% 200%;
          background-position: 0% 50%, 0% 50%;
          animation: aurora 60s ease-in-out infinite; /* Langsamer und sanfter */
        }

        .aurora-after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(100deg, #f4f2ec 0%, #f4f2ec 7%, transparent 10%, transparent 12%, #f4f2ec 16%),
            repeating-linear-gradient(100deg, rgba(138,174,57,0.5) 10%, rgba(152,196,83,0.4) 15%, rgba(168,210,100,0.3) 20%, rgba(180,224,120,0.2) 25%, rgba(152,196,83,0.4) 30%);
          background-size: 300% 200%, 300% 200%;
          background-position: 0% 50%, 0% 50%;
          animation: aurora 80s ease-in-out infinite; /* Langsamer und leicht verzögert */
          background-attachment: fixed;
          mix-blend-mode: difference;
        }

        /* Kombiniere alle Stile in einem style-Tag */
        .mask-radial-gradient {
          mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
        }
      `}</style>

      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-[#f4f2ec] text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "aurora-bg filter blur-[10px] pointer-events-none absolute -inset-[10px] opacity-40 will-change-transform", // Reduzierte Opazität
              showRadialGradient && "mask-radial-gradient"
            )}
          >
            {/* Pseudo-Element für die zweite Animation */}
            <div className="aurora-after absolute inset-0"></div>
          </div>
        </div>

        {children}
      </div>
    </main>
  );
};