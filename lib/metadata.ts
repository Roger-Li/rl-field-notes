import type { Metadata } from "next";

import { publicPagePaths } from "@/lib/content";
import { getLang, type Locale, withLocalePath } from "@/lib/i18n";
import { siteCopy } from "@/lib/site-copy";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rl-field-notes.vercel.app";

export function createLayoutMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteCopy[locale].site.brandName,
      template: siteCopy[locale].site.titleTemplate,
    },
    description: siteCopy[locale].site.defaultDescription,
  };
}

type CreatePageMetadataOptions = {
  description: string;
  locale: Locale;
  pathname: (typeof publicPagePaths)[number];
  title?: string;
};

export function createPageMetadata({
  description,
  locale,
  pathname,
  title,
}: CreatePageMetadataOptions): Metadata {
  const canonical = withLocalePath(locale, pathname);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
      languages: {
        "en-US": withLocalePath("en", pathname),
        "zh-CN": withLocalePath("zh", pathname),
      },
    },
    openGraph: {
      description,
      locale: getLang(locale).replace("-", "_"),
      siteName: siteCopy[locale].site.brandName,
      title: title ?? siteCopy[locale].site.brandName,
      url: canonical,
    },
  };
}
