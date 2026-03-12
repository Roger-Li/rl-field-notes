import { ReactNode } from "react";

const styles: Record<string, string> = {
  info: "bg-sky-50 border-sky-300 text-sky-900",
  warn: "bg-amber-50 border-amber-300 text-amber-900",
  danger: "bg-red-50 border-red-300 text-red-900",
  tip: "bg-emerald-50 border-emerald-300 text-emerald-900",
};

const icons: Record<string, string> = {
  info: "\u2139\uFE0F",
  warn: "\u26A0\uFE0F",
  danger: "\uD83D\uDEA8",
  tip: "\uD83D\uDCA1",
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={`border-l-4 rounded-r-lg p-4 my-4 ${styles[type] ?? styles.info}`}>
      <div className="font-semibold flex items-center gap-2 mb-1">
        <span>{icons[type] ?? icons.info}</span> {title}
      </div>
      <div className="text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  );
}
