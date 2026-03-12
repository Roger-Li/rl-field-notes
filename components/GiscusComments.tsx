"use client";

import Giscus from "@giscus/react";

// TODO: After creating the GitHub repo and enabling Discussions:
// 1. Go to https://giscus.app
// 2. Enter repo: Roger-Li/rl-field-notes
// 3. Copy the repoId and categoryId values
// 4. Paste them below to replace the empty strings

export function GiscusComments() {
  return (
    <div className="mt-12 pt-8 border-t border-stone-200">
      <h3 className="text-lg font-semibold text-stone-800 mb-4">Comments</h3>
      <Giscus
        repo="Roger-Li/rl-field-notes"
        repoId="R_kgDORlMGMQ"
        category="Comments"
        categoryId="DIC_kwDORlMGMc4C4OrO"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
