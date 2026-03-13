import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { createLayoutMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata: Metadata = createLayoutMetadata("en");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-stone-50 text-stone-900 min-h-screen flex flex-col">
        <SiteHeader locale="en" />
        <main className="flex-1">{children}</main>
        <SiteFooter locale="en" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
