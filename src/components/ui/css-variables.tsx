"use client";

export default function CssVariables() {
  return (
    <style jsx global>{`
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
    `}</style>
  );
}