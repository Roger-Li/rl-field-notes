"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { type Locale, stripLocalePrefix, switchLocalePath, withLocalePath } from "@/lib/i18n";
import { siteCopy } from "@/lib/site-copy";

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = siteCopy[locale];
  const targetLocale: Locale = locale === "en" ? "zh" : "en";
  const normalizedPath = stripLocalePrefix(pathname);
  const languageHref = switchLocalePath(pathname, targetLocale);
  const links = [
    { href: withLocalePath(locale, "/guides"), label: copy.nav.guides },
    {
      href: withLocalePath(locale, "/reading-notes"),
      label: copy.nav.readingNotes,
    },
    { href: withLocalePath(locale, "/about"), label: copy.nav.about },
  ];

  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href={withLocalePath(locale, "/")}
          className="text-xl font-bold text-stone-900 tracking-tight"
        >
          {copy.site.brandName}
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                normalizedPath.startsWith(stripLocalePrefix(link.href))
                  ? "text-amber-700"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={languageHref}
            className="rounded-full border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900"
            aria-label={copy.header.switchToLabel[targetLocale]}
          >
            {copy.header.switchToShort[targetLocale]}
          </Link>
        </div>

        <button
          className="sm:hidden p-2 text-stone-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={copy.header.mobileMenuLabel}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="sm:hidden border-t border-stone-100 bg-white px-4 py-3 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm font-medium ${
                normalizedPath.startsWith(stripLocalePrefix(link.href))
                  ? "text-amber-700"
                  : "text-stone-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={languageHref}
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm font-medium text-stone-600"
          >
            {copy.header.switchToShort[targetLocale]}
          </Link>
        </div>
      )}
    </header>
  );
}
