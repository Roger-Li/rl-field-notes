import type { ReactNode } from "react";

export function ReadingNoteArticle({ children }: { children: ReactNode }) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose prose-stone prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-amber-700 prose-a:underline-offset-2 hover:prose-a:text-amber-900 prose-table:text-sm prose-th:text-left prose-th:p-3 prose-th:bg-stone-50 prose-td:p-3 prose-td:border-t prose-td:border-stone-100 max-w-none">
      {children}
    </article>
  );
}
