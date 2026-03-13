"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { stripLocalePrefix } from "@/lib/i18n";

export function ViewCounter() {
  const pathname = usePathname();
  const slug = stripLocalePrefix(pathname);
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => {
        // Counter is non-critical; fail silently
      });
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="text-stone-400 text-sm">
      {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  );
}
