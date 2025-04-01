// In /components/ui/phone-mockup.tsx
import React from "react";

type PhoneMockupProps = {
  children: React.ReactNode;
  className?: string;
};

export function PhoneMockup({ children, className = "" }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone Rahmen */}
      <div className="relative bg-black rounded-[55px] border-[14px] border-black shadow-xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-xl z-20"></div>

        {/* Bildschirminhalt */}
        <div className="relative rounded-[42px] bg-white overflow-hidden w-[375px] h-[812px]">{children}</div>

        {/* Buttons (optional) */}
        <div className="absolute left-[-3px] top-[120px] w-[3px] h-[30px] bg-gray-800 rounded-l-lg"></div>
        <div className="absolute left-[-3px] top-[170px] w-[3px] h-[60px] bg-gray-800 rounded-l-lg"></div>
        <div className="absolute right-[-3px] top-[200px] w-[3px] h-[100px] bg-gray-800 rounded-r-lg"></div>
      </div>
    </div>
  );
}
