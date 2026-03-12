"use client";

import Giscus from "@giscus/react";

import { getGiscusLang, type Locale } from "@/lib/i18n";
import { siteCopy } from "@/lib/site-copy";

export function GiscusComments({
  locale,
  term,
}: {
  locale: Locale;
  term: string;
}) {
  const copy = siteCopy[locale];

  return (
    <div className="mt-12 pt-8 border-t border-stone-200">
      <h3 className="text-lg font-semibold text-stone-800 mb-4">
        {copy.commentsHeading}
      </h3>
      <Giscus
        repo="Roger-Li/rl-field-notes"
        repoId="R_kgDORlMGMQ"
        category="Comments"
        categoryId="DIC_kwDORlMGMc4C4OrO"
        mapping="specific"
        term={term}
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang={getGiscusLang(locale)}
        loading="lazy"
      />
    </div>
  );
}
