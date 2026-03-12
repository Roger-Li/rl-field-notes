import type { Locale } from "@/lib/i18n";
import { siteCopy } from "@/lib/site-copy";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];

  return (
    <footer className="border-t border-stone-200 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center text-sm text-stone-400">
        <p>{copy.site.brandName} — {copy.footerTagline}</p>
      </div>
    </footer>
  );
}
