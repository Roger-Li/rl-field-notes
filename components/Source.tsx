export function Source({ name, url }: { name: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-600 underline decoration-dotted underline-offset-2"
    >
      {name} ↗
    </a>
  );
}
