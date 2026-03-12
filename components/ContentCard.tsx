import Link from "next/link";

export function ContentCard({
  href,
  icon,
  title,
  description,
  tag,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-stone-300"
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
            {tag}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-stone-900">{title}</h3>
          <p className="mt-1 text-sm text-stone-500 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
