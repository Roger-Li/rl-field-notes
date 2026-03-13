import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createLayoutMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata: Metadata = createLayoutMetadata("zh");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-stone-50 text-stone-900 min-h-screen flex flex-col">
        <SiteHeader locale="zh" />
        <main className="flex-1">{children}</main>
        <SiteFooter locale="zh" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
