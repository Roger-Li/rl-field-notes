import { ReadingNoteArticle } from "@/components/layout/ReadingNoteArticle";

export default function ReadingNoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReadingNoteArticle>{children}</ReadingNoteArticle>;
}
