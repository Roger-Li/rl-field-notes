import type { MetadataRoute } from "next";

import { publicPagePaths } from "@/lib/content";
import { siteUrl } from "@/lib/metadata";
import { withLocalePath } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicPagePaths.flatMap((pathname) => [
    {
      url: `${siteUrl}${withLocalePath("en", pathname)}`,
      lastModified,
      alternates: {
        languages: {
          "en-US": `${siteUrl}${withLocalePath("en", pathname)}`,
          "zh-CN": `${siteUrl}${withLocalePath("zh", pathname)}`,
        },
      },
    },
    {
      url: `${siteUrl}${withLocalePath("zh", pathname)}`,
      lastModified,
      alternates: {
        languages: {
          "en-US": `${siteUrl}${withLocalePath("en", pathname)}`,
          "zh-CN": `${siteUrl}${withLocalePath("zh", pathname)}`,
        },
      },
    },
  ]);
}
