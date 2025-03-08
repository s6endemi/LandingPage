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
            repeating-linear-gradient(100deg, rgba(220,240,220,0.5) 10%, rgba(200,235,210,0.4) 15%, rgba(180,230,200,0.3) 20%, rgba(230,245,230,0.2) 25%, rgba(210,238,220,0.4) 30%);
          background-size: 300% 200%, 300% 200%;
          background-position: 0% 50%, 0% 50%;
          animation: aurora 60s ease-in-out infinite; /* Original speed */
        }

        .aurora-after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(100deg, #f4f2ec 0%, #f4f2ec 7%, transparent 10%, transparent 12%, #f4f2ec 16%),
            repeating-linear-gradient(100deg, rgba(220,240,220,0.5) 10%, rgba(200,235,210,0.4) 15%, rgba(180,230,200,0.3) 20%, rgba(230,245,230,0.2) 25%, rgba(210,238,220,0.4) 30%);
          background-size: 300% 200%, 300% 200%;
          background-position: 0% 50%, 0% 50%;
          animation: aurora 80s ease-in-out infinite; /* Original speed */
          background-attachment: fixed;
          mix-blend-mode: difference;
        }

        /* Combine all styles in one style tag */
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
              "aurora-bg filter blur-[10px] pointer-events-none absolute -inset-[10px] opacity-40 will-change-transform", // Original opacity
              showRadialGradient && "mask-radial-gradient"
            )}
          >
            {/* Pseudo-element for second animation */}
            <div className="aurora-after absolute inset-0"></div>
          </div>
        </div>

        {children}
      </div>
    </main>
  );
};