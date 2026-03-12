import { ReactNode } from "react";

const colors: Record<string, string> = {
  amber: "bg-amber-100 text-amber-800 border border-amber-200",
  red: "bg-red-100 text-red-800 border border-red-200",
  green: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  blue: "bg-sky-100 text-sky-800 border border-sky-200",
  purple: "bg-violet-100 text-violet-800 border border-violet-200",
};

export function Badge({
  children,
  color = "amber",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[color] ?? colors.amber}`}
    >
      {children}
    </span>
  );
}
