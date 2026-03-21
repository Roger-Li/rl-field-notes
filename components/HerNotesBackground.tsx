import type { ReactNode } from "react";

export function HerNotesBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Soft violet wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50/80 via-fuchsia-50/30 to-transparent pointer-events-none" />

      {/* Top-right decorative blob */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-100/90 blur-3xl pointer-events-none" />

      {/* Left-side accent */}
      <div className="absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-fuchsia-100/40 blur-3xl pointer-events-none" />

      {/* Bottom-right accent */}
      <div className="absolute bottom-48 -right-16 w-64 h-64 rounded-full bg-violet-100/30 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
