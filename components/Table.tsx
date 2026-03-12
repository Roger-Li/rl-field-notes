import { ReactNode } from "react";

export function DataTable({
  headers,
  rows,
  compact,
}: {
  headers: string[];
  rows: ReactNode[][];
  compact?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200 my-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-stone-50">
            {headers.map((h, i) => (
              <th
                key={i}
                className={`text-left ${compact ? "px-3 py-2" : "px-4 py-3"} font-semibold text-stone-700 border-b border-stone-200`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-white" : "bg-stone-50/50"}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`${compact ? "px-3 py-2" : "px-4 py-3"} text-stone-600 border-b border-stone-100`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
