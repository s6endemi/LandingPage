import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BioAI OS ? Adaptive Health Intelligence",
  description:
    "BioAI orchestrates biometric sensors, computer vision, and environmental intelligence into a predictive health operating system.",
};

export default function BioAILayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-950 text-white">{children}</div>;
}
